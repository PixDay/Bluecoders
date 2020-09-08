const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    name: String,
    mail: String,
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;