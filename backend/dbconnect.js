// dbconnect.js
const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        const dbURI = "mongodb+srv://" +
                      process.env.DBUSERNAME + ":" +
                      process.env.DBPASSWORD + "@" +
                      process.env.CLUSTER + ".mongodb.net/" +
                      process.env.DB + "?retryWrites=true&w=majority";
        
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDB;