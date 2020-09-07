const mongoose = require("mongoose");
const User = require("./User.model");

mongoose.Promise = global.Promise;

const connectDb = () => {
    return mongoose.connect('mongodb://root:root@db:27017/todolist', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log('error connecting to the database');
        process.exit();
    });
};

module.exports = connectDb;