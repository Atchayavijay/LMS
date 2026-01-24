const mongoose = require("mongoose");
const AuditFields = require("./shared/AuditFields");

const CourseReviewSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  ...AuditFields,
});

module.exports = mongoose.model("CourseReview", CourseReviewSchema);
