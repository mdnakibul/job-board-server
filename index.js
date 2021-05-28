const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ataur39n:superSecret@cluster0.hhwqe.mongodb.net/jobsBoard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const userList = client.db("jobsBoard").collection("userList");

    app.post("/register", (req, res) => {
        console.log(req.body);
        userList.insertOne(req.body)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/login', (req, res) => {
        console.log(req.query.email);
        console.log(req.body);
        userList.find({ email: req.query.email })
            .toArray((error, result) => {
                console.log(error);
                console.log(result);
                res.send(result)
            })
    })
});

app.get('/', (req, res) => {
    res.send('hello boss')
})

app.listen(process.env.PORT || 5000);