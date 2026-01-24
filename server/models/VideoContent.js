const mongoose = require("mongoose");
const Content = require("./Content");

const VideoContentSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  duration: { type: Number }, // in seconds
  thumbnail: { type: String }, // video preview image URL
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = Content.discriminator("VideoContent", VideoContentSchema);
