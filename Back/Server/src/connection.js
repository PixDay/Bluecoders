const mongoose = require("mongoose");
const User = require("./User.model");
const mongoDB = 'mongodb://127.0.0.1/todolist'

const connectDb = () => {
    return mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
};

module.exports = connectDb;