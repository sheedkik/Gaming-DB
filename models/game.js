const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gameSchema = new Schema ({
    // reviews: [reviewSchema],
    image: {
        type: String,
        required: true
    },
    title: {type: String, required: true},
    releaseDate: {
        type: Date,
        required: true,
        unique: true,
        default: function() {
            return new Date().getFullYear();
        }
    },
    creator: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }
})

module.exports = mongoose.model("Game", gameSchema)