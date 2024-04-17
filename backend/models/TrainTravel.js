
const mongoose = require("mongoose");

const TrainTravelSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.ObjectId,
        required: true
    },

    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("TrainTrips", TrainTravelSchema);
