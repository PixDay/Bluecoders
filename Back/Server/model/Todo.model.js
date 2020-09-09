const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    reference: Number,
    title: String,
    description: String,
    state: String
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;