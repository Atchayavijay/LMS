require("dotenv").config();
const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
  // Try to get token from Authorization header (Bearer) or accessToken cookie
  let token = null;
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Normalize user fields for compatibility with both login and refresh flows
    req.user = {
      _id: payload._id || payload.user_id,
      roles: payload.roles || payload.role_id,
      iat: payload.iat,
      exp: payload.exp,
    };
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticate;
