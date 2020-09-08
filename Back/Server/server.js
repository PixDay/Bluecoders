const app = require('express')();
const PORT = 4000;
const bodyParser = require('body-parser')
const connectDb = require("./src/connection");
const user = require("./model/User.model");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/users", (req, res) => {
    console.log(connectDb());
    user.find({}, (err, user) => {
        console.log("user : ");
        console.log(user);
        res.send("users");
    })
});

app.post("/user-create", async (req, res) => {
    console.log("body : ");
    console.log(req.body);
    if (req.body != undefined) {
        const givenUser = new user({firstname: req.body.firstname, name: req.body.name, password: req.body.password, mail: req.body.mail});

        try {
            await givenUser.save();
            res.redirect("/");
        } catch (err) {
            res.redirect("/")
        }
    }
    else
        console.log("No body");
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