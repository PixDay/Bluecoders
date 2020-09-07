const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type: Number},
    firstname: {type: String},
    name: {type: String},
    mail: {type: String},
    password: {type: String}
});

const User = mongoose.model("User", userSchema);

module.exports = User;