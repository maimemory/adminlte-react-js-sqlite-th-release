import express from 'express';
import account from './models/account.js';
import memoTable from './models/memo.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

// Account API

app.get('/read', async (req, res) => {
    await account.findAll()
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

    if(await account.findOne({where: {username: req.body.username}})){
        res.send({message: 'User was already registered'});
    }
    else{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        newUser = {...newUser, password: req.body.password};

        await account.create(newUser)
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

    let result = await account.findOne({where: {username: username}})
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

app.post('/readmemo', async (req, res) => {

    let { username } = req.body

    const currentUser = await account.findOne({where: { username: username }});
    await memoTable.findAll({where: { accountId: currentUser.id }})
    .then(result => {
        console.log(result);
        res.send(result);
    })
    // memoTable.findAll({include: account, where: {accountId: 1}})
    // .then(result => {
    //     console.log(result);
    //     res.send(result);
    // })
    .catch(err => {
        console.log(err);
    })
})

app.post('/creatememo', async (req, res) => {

    let { username, newMemo } = req.body;

    const currentUser = await account.findOne({where: { username: username }});
    await memoTable.create({ 
        memo: newMemo, 
        isDone : false, 
        accountId: currentUser.id
    })
    .then(account => {
        console.log(account);
        res.send(account);
    })
    .catch(err => {
        console.log(err);
    })
})

app.delete('/deletememo/:id', async (req, res) => {
    
    const id = req.params.id;

    const result = await memoTable.destroy({where: { id: id }});
    if(result.affectedRows === 0){
        return res.status(404).json({ message: 'No memo with that ID'});
    }
    return res.status(200).json({ message: result});
})

app.post('/updatememo/:id', async (req, res) => {

    const id = req.params.id;
    let { oldIsDone } = req.body;

    const result = await memoTable.update({isDone: !oldIsDone}, {where: {id: id}});
    return res.status(200).json({ message: result});
})

app.post('/editmemo/:id', async (req, res) => {

    const id = req.params.id;
    let { newMemo } = req.body;

    const result = await memoTable.update({memo: newMemo}, {where: {id: id}});
    return res.status(200).json({ message: result});
})

app.listen(1000, () => {
    console.log('Server is running at http://localhost:1000')
})