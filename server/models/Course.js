const mongoose = require("mongoose");
const AuditFields = require("./shared/AuditFields");
const SoftDelete = require("./shared/SoftDelete");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String },
  description: { type: String },
  thumbnail: { type: String }, // course cover image
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  language: { type: String, default: "en" },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  chapters: { type: Array, default: [] },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseReview" }],
  versions: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseVersion" }],
  ...AuditFields,
  ...SoftDelete,
});

module.exports = mongoose.model("Course", CourseSchema);
