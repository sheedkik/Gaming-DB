const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 10
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    username: String,
    userAvatar: String
}, {
    timestamps: true
})

const gameSchema = new Schema ({
    reviews: [reviewSchema],
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
    }
})

gameSchema.pre("save", function(next) {
    if (this.reviews.length === 0) {
        this.rating = null
    } else {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
        this.rating = totalRating / this.reviews.length
    }
    next()
})

module.exports = mongoose.model("Game", gameSchema)