const app = require('express')();
const PORT = 4000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const User = require("./model/User.model");
const mongoDB = require("./src/connection");
const connectDb = require('./src/connection');


MongoClient.connect('mongodb://root:root@127.0.0.1/todolist', {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('todolist')
    const userCollection = db.collection('User');
    const todoCollection = db.collection('Todo');

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.post("/connect", async (req, res) => {
        console.log("connecting")
        
    });
    
    app.post("/usercreate", async (req, res) => {
        const givenUser = new User({firstname: req.body.firstname, name: req.body.name, password: req.body.password, mail: req.body.mail});

        userCollection.insertOne(givenUser).then(result => {
            console.log(result)
        }).catch(error => console.error(error));
        res.redirect("/");
    });
    
    app.get("/userdelete", (req, res) => {
        res.send("User deleted \n");
    });
    
    app.get("/usermodify", (req, res) => {
        res.send("User modified \n");
    });

    app.listen(PORT, function() {
        console.log(`Listening on ${PORT}`);
    });
});