const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require("./dbconnect");
require("dotenv").config(); // Loads environment variables from a .env file
const { MongoClient, ServerApiVersion } = require('mongodb');
// import URI from "./env.local.js"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDB()
    .then(() => {
        const PORT = process.env.PORT || 3080; // Setting the port for the Express server
        app.listen(PORT, () => console.log("Server listening on port " + PORT)); // Starting the Express server
    })
    .catch((err) => {
        console.error("Error starting server:", err); // Logging any errors that occur during server startup
    });

// Account module
const Account = require("./models/Account");
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

//Login route
app.post("/login", async (req, res) => {
  try {
      const { username, password } = req.body;
      console.log(username);
      // Find account with the given username
      const account = await Account.findOne({ username });
      
      // Check if account with the given username exists
      if (!account) {
          return res.status(404).json({ message: "Account not found" });
      }

      // Compare passwords
      if (password === account.password) {
          console.log("Passwords match");
          res.status(200).json({ message: "Login successful" });
      } else {
          console.log("Passwords do not match");
          res.status(401).json({ message: "Invalid username or password" });
      }

  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

//Register route route
app.post("/register", async (req, res) => {
  try {
      const { username, password } = req.body;

      // Check if username already exists
      const existingAccount = await Account.findOne({ username });
      if (existingAccount) {
          return res.status(400).json({ message: "Username already exists" });
      }

      // Create a new account
      const newAccount = new Account({ username, password });
      await newAccount.save();

      console.log("Account created successfully");
      res.status(201).json({ message: "Account created successfully" });

  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

