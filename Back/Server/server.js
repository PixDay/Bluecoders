const app = require('express')();
const PORT = 4000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const User = require("./model/User.model");
const Todo = require("./model/Todo.model");


MongoClient.connect('mongodb://root:root@localhost:27017', {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('todolist')
    const userCollection = db.collection('User');
    const todoCollection = db.collection('Todo');

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    /* USERS */
    app.post("/connect", async (req, res) => {
        userCollection.findOne({}).then(result => {
            console.log(result)
        }).catch(error => console.error(error));
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

    /* TODO */
    app.get("/todolist", (req, res) => {
        todoCollection.find({}, {title: 1, description: 1}).toArray().then(result => {
            console.log(result);
        });
        res.send("Todolist");
    })

    app.post("/todocreate", async (req, res) => {
        const givenTodo = new Todo({ reference: req.body.reference, title: req.body.title, description: req.body.description, state: "todo"});

        todoCollection.insertOne(givenTodo).then(result => {
            console.log(result)
        }).catch(error => console.error(error));
        res.redirect("/");
    });

    app.post("/tododelete", async (req, res) => {
        const givenTodo = new Todo({reference: req.body.reference, title: req.body.title, description: req.body.description, state: "todo"});

        todoCollection.deleteOne(givenTodo).then(result => {
            console.log(result);
        }).catch(error => console.error(error));
        res.redirect("/");
    })

    app.post("/todoupdate", async (req, res) => {
        const givenTodo = new Todo({ title: req.body.title, description: req.body.description, state: "todo"});

        console.log(givenTodo);
        todoCollection.findOneAndUpdate({ title: "Bluecoders"}, givenTodo).then(result => {
            console.log(result);
        }).catch(error => console.error(error));
        res.redirect("/");
    })

    app.listen(PORT, function() {
        console.log(`Listening on ${PORT}`);
    });
});