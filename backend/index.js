const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// import URI from "./env.local.js"

app.use(cors());
app.use(express.json());



app.listen(3080);

app.post("/login", (req, res) => {
    const {username, password} = req.body
    console.log(username,password)
    res.status(200).json({})
});

//