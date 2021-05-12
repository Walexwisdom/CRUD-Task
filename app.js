const express = require('express');
const app = express();
app.use(express.json());

const connectionString = 'mongodb://localhost:27017/mydata'
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopolog: true
});


app.post('/data', (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        const db = connectedClient.db("mydata")
        db.collection("data").insertOne({
            name: req.body.name,
            email: req.body.email,
            country: req.body.country
        }, (err, result) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: "Data has been created"})
        })
    })
})


app.get('/data', (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) return res.status(500).json({message: err})
        const db = connectedClient.db("mydata")
        db.collection("data").find({}).toArray((err, result) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({data: result})
        })
    })
})

app.put('/data', (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) return res.status(500).json({message: err})
        const db = connectedClient.db("mydata")
        db.collection("data").updateOne({name: "Adewale"}, {$set: {name: "Noah"}}), ((err, result) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({data: result})
        })
    })
})

app.delete('/data', (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) return res.status(500).json({message: err})
        const db = connectedClient.db("mydata")
        db.collection("data").deleteOne({name: "Adewale"}), ((err, result) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({data: result})
        })
    })
})


app.listen(4000, () => {
    console.log("server is up and running")
})
