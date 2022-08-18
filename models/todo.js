const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  completedAt: {
    type: Date,
    required: false,
  },
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;
