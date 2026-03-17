const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    scene: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Diary", diarySchema);