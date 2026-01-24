const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const Role = require("../../models/Role");
require("dotenv").config();
const crypto = require("crypto");
const { sendEmail } = require("../../services/gmailService");
const { createEmailTemplate } = require("../../services/emailTemplates");

// =======================
// ✅ Register User
// =======================
// in controllers/auth-controller/index.js
const registerUser = async (req, res) => {
  const { userName, userEmail, password, roles } = req.body;

  // If none provided, default to learner=1
  const provided = Array.isArray(roles) && roles.length ? roles : [1];

  // Ensure all provided roleIds exist
  const found = await Role.find({ roleId: { $in: provided } });
  if (found.length !== provided.length) {
    return res.status(400).json({ success: false, message: "Invalid role(s)" });
  }

  // Hash password & save numeric IDs
  const hash = await bcrypt.hash(password, 10);

  // Determine initial status
  let initialStatus = 'active';
  if (provided.includes(2)) { // 2 is Instructor
    initialStatus = 'pending_enrollment';
  }

  await User.create({
    userName,
    userEmail: userEmail.toLowerCase(),
    password: hash,
    roles: provided, // store e.g. [1,2]
    status: initialStatus
  });

  res.status(201).json({ success: true, message: "Registered" });
};

// =======================
// ✅ Submit Enrollment
// =======================
const submitEnrollment = async (req, res) => {
  try {
    const { bio, experience, expertise, linkedin, website } = req.body;
    const userId = req.user._id;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Update enrollment data and status
    user.enrollmentData = {
      bio, experience, expertise, linkedin, website,
      submittedAt: new Date()
    };
    user.status = 'pending_approval';
    await user.save();

    res.json({ success: true, message: "Enrollment submitted", user });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// ✅ Admin Approve Instructor
// =======================
const adminApproveInstructor = async (req, res) => {
  try {
    const { userId, action } = req.body; // action: 'approve' or 'reject'

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (action === 'approve') {
      user.status = 'approved';
    } else if (action === 'reject') {
      user.status = 'rejected';
    }

    await user.save();
    res.json({ success: true, message: `Instructor ${action}d successfully`, user });
  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// ✅ Login User
// =======================

const loginUser = async (req, res) => {
  try {
    const { userEmail, password: userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    // Find the user (roles is already an array of numbers)
    const user = await User.findOne({ userEmail: userEmail.toLowerCase() });
    if (!user || !(await bcrypt.compare(userPassword, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Extract their numeric role IDs
    const roleIds = user.roles; // e.g. [1,2]

    // 1) Create an access token (includes both _id and roles)
    const accessToken = jwt.sign(
      { _id: user._id, roles: roleIds },
      process.env.JWT_SECRET,
      { expiresIn: "100d" }//still in  testing phase  don't need to reduce the days 
    );

    // 2) Create a refresh token (only _id)
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "100d" }
    );

    // 3) Hash & store the refresh token in the database
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    // 4) Send the refresh token as an HttpOnly cookie, and return the access token and user (excluding sensitive fields)
    // 4) Send the refresh token as an HttpOnly cookie, and return the access token and user (excluding sensitive fields)
    const {
      password: pw,
      refreshToken: rt,
      resetPasswordToken,
      resetPasswordExpires,
      ...safeUser
    } = user.toObject();

    // Fetch Role Names for frontend compatibility
    const rolesDocs = await Role.find({ roleId: { $in: user.roles } });
    const roleNames = rolesDocs.map(r => r.roleName);

    // Determine primary role for UI (admin > instructor > student)
    let uiRole = 'student';
    if (roleNames.includes('admin')) uiRole = 'admin';
    else if (roleNames.includes('instructor')) uiRole = 'instructor';

    // Add computed role to response
    safeUser.role = uiRole;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        accessToken,
        user: safeUser,
      });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================
// ✅ Refresh Access Token
// ===========================
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.user_id).populate("roles");

    if (!user || !user.refreshToken) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      return res
        .status(403)
        .json({ success: false, message: "Token mismatch" });
    }

    const roleIds = user.roles.map((role) => role.roleId);

    const newAccessToken = jwt.sign(
      { user_id: user._id, role_id: roleIds },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error("Token Refresh Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// ===========================
//  Become Instructor
// ===========================
const becomeInstructor = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "userEmail is required" });
    }
    const user = await User.findOne({ userEmail: userEmail.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const instructor = await Role.findOne({ roleName: "instructor" });
    if (!instructor) {
      return res
        .status(500)
        .json({ success: false, message: "Instructor role not found" });
    }

    // Add role if not present
    if (!user.roles.includes(instructor.roleId)) {
      user.roles.push(instructor.roleId); // store `2`
      // Check current status. If active (learner), move to pending_enrollment
      // If already pending or approved, leave it? 
      // Actually, if they are becoming an instructor, we want to force enrollment.
      // But if they were 'rejected' previously? 
      // Let's force pending_enrollment to trigger the flow.
      user.status = 'pending_enrollment';

      await user.save();
    } else {
      // If they already have the role, we might want to remind them of their status?
      // For now, just return success so frontend can redirect.
    }

    res.json({ success: true, message: "Upgraded", user });
  } catch (error) {
    console.error("Become Instructor Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================
// ✅ Logout User
// ===========================
const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .clearCookie("refreshToken")
        .status(200)
        .json({ success: true, message: "Logged out" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.user_id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Request Password Reset ──────────────────────────────────────────────────
const requestPasswordReset = async (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  const user = await User.findOne({ userEmail: userEmail.toLowerCase() });
  if (!user) {
    // don't reveal if user exists
    return res.status(200).json({
      success: true,
      message: "If that email is registered, you’ll receive a reset link.",
    });
  }

  // Generate a token and expiry (e.g. 1 hour)
  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600_000; // 1h
  await user.save();

  // Send email
  const resetUrl = `https://kattraan.com/reset-password?token=${token}`;
  const message = `
      <p>Hi ${user.userName},</p>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    `;

  await sendEmail({
    to: user.userEmail,
    subject: "Kattraan Password Reset",
    message: createEmailTemplate("Reset Your Password", message),
  });

  return res
    .status(200)
    .json({ success: true, message: "Password reset email sent" });
};

// ─── Perform Password Reset ──────────────────────────────────────────────────
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Token and new password required" });
  }

  // Find user by token and ensure token not expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }

  // Hash new password and clear token fields
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  // (Optionally) log the user in by issuing tokens
  return res
    .status(200)
    .json({ success: true, message: "Password has been reset" });
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  becomeInstructor,
  logoutUser,
  requestPasswordReset,
  resetPassword,
  submitEnrollment,
  adminApproveInstructor
};
