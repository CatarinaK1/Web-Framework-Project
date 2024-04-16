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
app.post("/signup", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check if username already exists
      const existingAccount = await Account.findOne({ username });
      if (existingAccount) {
          return res.status(400).json({ message: "Username already exists" });
      }

      // Create a new account
      const newAccount = new Account({ username, email, password });
      await newAccount.save();

      console.log("Account created successfully");
      res.status(201).json({ message: "Account created successfully" });

  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// usernamechange route
app.post("/newusername", async (req, res) => {
    try {
        const { username, newusername, email, password } = req.body;

        // Find account with the given username
        const account = await Account.findOne({ username });
      
        // Check if account exists
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Compare passwords and email
        if (password !== account.password || email !== account.email) {
            console.log("Passwords or email do not match");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the new username already exists
        const existingAccount = await Account.findOne({ username: newusername });
        if (existingAccount) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Update the username
        account.username = newusername;
        await account.save();

        console.log("Username changed successfully");
        res.status(200).json({ message: "Username changed successfully" });

    } catch (error) {
        console.error("Error during username change:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// password change route
app.post("/newpassword", async (req, res) => {
    try {
        const { username, email, password, newpassword} = req.body;

        // Find account with the given username
        const account = await Account.findOne({ username });
      
        // Check if account exists
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        console.log(password + " " + email)
        // Compare passwords and email
        if (password !== account.password || email !== account.email) {
            console.log("Passwords or email do not match");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Update the password
        account.password = newpassword;
        await account.save();

        console.log("Password changed successfully");
        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error("Error while changing password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

