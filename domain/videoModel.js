const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  appIdentifier: String,
  title: String,
  description: String,
  url: String,
  chunkPart: Number,
  chunks: Array,
});

module.exports = mongoose.model("Video", videoSchema);
