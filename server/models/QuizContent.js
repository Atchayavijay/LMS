const mongoose = require("mongoose");
const Content = require("./Content");

const QuizContentSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true }, // index of correct option
    },
  ],
});

module.exports = Content.discriminator("QuizContent", QuizContentSchema);
