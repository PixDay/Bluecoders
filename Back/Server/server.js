const app = require('express')();
const PORT = 4000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
import {User, Todo} from "./model/Schemas.model";
import * as bcrypt from "bcryptjs";
import {readFileSync} from "fs";
import * as jwt from "jsonwebtoken";

const privateKey = readFileSync(__dirname + "/.privatekey");

MongoClient.connect('mongodb://root:root@localhost:27017', {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('todolist')
    const userCollection = db.collection('User');
    const todoCollection = db.collection('Todo');
    const saltRound = 10;

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.post('/login', (req, res) => {
        const mail = req.body.mail;
        const password = req.body.password;
        const user = await userCollection.findOne({mail: mail});
        
        if (!user || !bcrypt.compareSync(password, user.password))
            res.status(400).send("Unknown user");
        const token = jwt.sign({id: user._id}, privateKey);
        res.status(200).send(token);
    });

    app.post('/register', async (req, res) => {
        const firstname = req.body.firstname;
        const name = req.body.name;
        const mail = req.body.mail;
        const password = req.body.password;

        const user = new User({firstname: firstname, name: name, mail: mail, password: bcrypt.hashSync(password, saltRound)});
        await userCollection.save(user);
        res.status(200).send("User created successfully");
    });

    app.listen(PORT, function() {
        console.log(`Listening on ${PORT}`);
    });
});