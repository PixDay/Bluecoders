const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    name: String,
    mail: {type: String, unique: true},
    password: String
});

const todoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Todo"},
    title: String,
    description: String,
    checked: Boolean
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {User, Todo};