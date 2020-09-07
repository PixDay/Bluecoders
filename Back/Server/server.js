const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const PORT = 8080;

app.get("/users", (req, res) => {
 res.send("Get users \n");
});

app.get("/user-create", (req, res) => {
 res.send("User created \n");
});

app.get("/user-delete", (req, res) => {
    res.send("User deleted \n");
});

app.get("/user-modify", (req, res) => {
    res.send("User modified \n");
});

app.get("/todo", (req, res) => {
    res.send("todo list \n");
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
});