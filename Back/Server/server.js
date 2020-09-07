const app = require('express')();
const connectDb = require("./src/connection");
const PORT = 8080;
const user = require("./model/User.model");

app.get("/user", (req, res) => {
    user.find({}, (err, user) => {
        console.log(user)
        res.send("test" );
    })
});

app.post("/user-create", async (req, res) => {
    const user = user({firstname: req.body.firstname, name: req.body.name, password: req.body.password, mail: req.body.mail});

    try {
        await user.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/")
    }
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
    console.log(connectDb())
});