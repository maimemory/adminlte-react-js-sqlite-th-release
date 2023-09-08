import express from 'express';
import mongoose from 'mongoose';
import userCollection from './models/account-db-instance.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

const url = 'mongodb://vsmqtt.space:2717'
//
// mongoose.set('debug', true);

mongoose.connect(url)
.then(() => {
    console.log('Database Connected!');
})
.catch(err => {
    console.log(err);
})

// Account API

app.get('/read', (req, res) => {
    userCollection.find()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/register', async (req, res) => {

    let newUser = req.body;

    if(await userCollection.findOne({username: req.body.username})){
        res.send({message: 'User was already registered'});
    }
    else{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        newUser = {...newUser, password: req.body.password};

        userCollection.create(newUser)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
})

app.post('/login', async (req, res) => {

    let {username, password} = req.body;

    let result = await userCollection.findOne({username: username})
    if(result !== null){
        if(bcrypt.compareSync(password, result.password)){
            console.log(result);
            res.send(result);
        }
        else{
            res.send({message: 'Incorrect Password'});
        }
    }
    else{
        res.send({message: 'Incorrect Username'});
    }
})

// Memo API

app.post('/readmemo', (req, res) => {

    let { username } = req.body

    userCollection.findOne({ username: username })
    .then(result => {
        console.log(result.record);
        res.send(result.record);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/creatememo', (req, res) => {

    let { username, newMemo } = req.body;

    userCollection.updateOne({ username: username }, { $push: { record: { memo: newMemo }}})
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/deletememo/:id', (req, res) => {

    const id = req.params.id;
    let { username } = req.body;

    userCollection.updateOne({ username: username }, { $pull: { record: { _id: id }}})
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.post('/updatememo/:id', (req, res) => {

    const id = req.params.id;
    let { username, oldIsDone } = req.body;

    userCollection.updateOne({ 
        username: username,
        record: { $elemMatch: { _id: id }}
     }, 
     { $set: { 'record.$.isDone': !oldIsDone}})
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.post('/editmemo/:id', (req, res) => {

    const id = req.params.id;
    let { username, newMemo } = req.body;

    userCollection.updateOne({
        username: username,
        record: { $elemMatch: { _id: id }}
    },
    { $set: { 'record.$.memo': newMemo }})
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})

app.listen(1000, () => {
    console.log('Server is running at http://localhost:1000')
})