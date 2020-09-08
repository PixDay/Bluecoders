const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    firstname: String,
    name: String,
    mail: {type: String, unique: true},
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;