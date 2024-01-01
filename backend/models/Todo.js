const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the value is a number
        return !isNaN(value);
      },
      message: 'Price must be a number',
    },
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

const Todo = mongoose.model("One", todoSchema);
module.exports = Todo;
