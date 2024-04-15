const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// import URI from "./env.local.js"

app.use(cors());
app.use(express.json());



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
      // Connect the client to the server	(optional starting in v4.7)
      // await client.connect();
      // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
    //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // } finally {
      // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
  // }
  // run().catch(console.dir);

app.listen(3080);

app.post("/login", (req, res) => {
    const {username, password} = req.body
    console.log(username,password)
    res.status(200).json({})
});

//