const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    learnings:{
        type: [String],
        default: []
    },
    price:{
        type: Number,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        default: "https://unsplash.com/photos/a-computer-screen-with-a-logo-on-it-xkBaqlcqeb4"     
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps: true});

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;