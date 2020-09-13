const app = require('express')();
const PORT = 4000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

/*import {User, Todo} from "./model/Schemas.model";
import * as bcrypt from "bcryptjs";
import {readFileSync} from "fs";
import * as jwt from "jsonwebtoken";
*/
const Model = require("./model/Schemas.model");
const bcrypt = require("bcryptjs");
const readFileSync = require("fs");
const jwt = require("jsonwebtoken");
const privateKey = "leandreleboss"

MongoClient.connect('mongodb://root:root@localhost:27017', {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('todolist')
    const userCollection = db.collection('User');
    const todoCollection = db.collection('Todo');
    const saltRound = 10;

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    /* USERS */
    app.post('/login', async (req, res) => {
        const mail = req.body.mail;
        const password = req.body.password;
        await userCollection.findOne({mail: mail}).then(result => {
            if (!result || !bcrypt.compareSync(password, result.password))
                res.status(400).send("Unknown user");
            const token = jwt.sign({id: result._id}, privateKey);
            res.status(200).send(token);
        });
    });

    app.post('/register', async (req, res) => {
        console.log("CREATEING USER");
        const firstname = req.body.firstname;
        const name = req.body.name;
        const mail = req.body.mail;
        const password = req.body.password;

        const user = new Model.User({firstname: firstname, name: name, mail: mail, password: bcrypt.hashSync(password, saltRound)});
        console.log(user);
        await userCollection.save(user);
        res.status(200).send("User created successfully");
    });

    /* TODO */
    app.post('/todo/create', async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const token = jwt.verify(req.headers["authorization"], privateKey);
        
        const todo = new Model.Todo({user: token.id, title: title, description: description, checked: false})
        await todoCollection.save(todo);
        res.status(200).send("Todo created successfully");
    });

    app.delete('/todo/delete', async (req, res) => {
        const todoId = req.body._id;
        const userId = jwt.verify(req.header.authorization, privateKey);

        await todoCollection.findOneAndDelete({_id: todoId, user: userId});
        res.status(200).send("Todo deleted");
    });

    app.post('/todo/update', async (req, res) => {
        const todoId = req.body._id;
        const title = req.body.title;
        const description = req.body.description;
        const checked = req.body.checked;
        const userId = jwt.verify(req.header.authorization, privateKey);
        const todo = new Model.Todo({user: userId, title: title, description: description, checked: checked});

        await todoCollection.findOneAndUpdate({_id: todoId, user: userId}, todo);
        res.status(200).send("Todo deleted");
    });

    app.post('/todo/toggle/', async (req, res) => {
        const todoId = req.body._id;
        const todo = todoCollection.findOne({_id: todoId, user: jwt.verify(req.header.authorization, privateKey)});

        await todoCollection.findOneAndUpdate({_id: todoId, user: jwt.verify(req.header.authorization, privateKey), checked: todo.checked});
        res.status(200).send(checked.checked);
    })

    app.get('/todo', async (req, res) => {
        await todoCollection.find({user: jwt.verify(req.header.authorization, privateKey)});
        res.status(200).send("Todo gotten");
    });

    app.listen(PORT, function() {
        console.log(`Listening on ${PORT}`);
    });
});