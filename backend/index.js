const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require("./dbconnect");
require("dotenv").config(); // Loads environment variables from a .env file
const { MongoClient, ServerApiVersion } = require('mongodb');
// import URI from "./env.local.js"
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// TrainTrips module
const TrainTrips = require('./models/TrainTravel')

//Login route
app.post("/login", async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = {name: username};

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
            user.id = account._id
          // Authentication
          // save secret access token related to the user
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);


          // Create cookie
          res.cookie('jwt', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });

            // Return message and access token
          res.status(200).json({ message: "Login successful" , accessToken: accessToken, username});


      } else {
          console.log("Passwords do not match");
          res.status(401).json({ message: "Invalid username or password" });
      }

  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});



// Middleware
function authenticateToken(req,res, next){
    
    const authHeader = req.headers['authorization'];
    

    // if we have and authHeader then return the token portion
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token, "Stringy quALQUEr");
    console.log(authHeader);

    // Check if token is null
    if (token == null) return res.sendStatus(401);

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Check for token verification error
    if (err) {
        console.error('Token Verification Error:', err);
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Token is valid, attach user data to the request object
    console.log('Decoded User:', user);
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
    });

}






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

      // Create token related to the new account
      const token = createToken(newAccount._id);


      // place token in a cookie as part of response
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});


      console.log("Account created successfully");
      res.status(201).json({ message: "Account created successfully", newAccount: newAccount._id });

  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Determine when token expires
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) =>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    });


    //const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    
}




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


// Save favorite destinations 
app.post("/savefavorite", authenticateToken , async (req, res) => {
    try {
        const {departure, destination} = req.body;
        const UserId = req.user.id;

        // Find account with the given username
        const travel = new TrainTrips({ UserId, departure, destination });
        await travel.save();
      
   

        console.log("Trips saved successfully");
        res.status(200).json({ message: "Trip saved successfully" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

);