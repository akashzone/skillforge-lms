const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    order:{
        type: Number,
        required: true
    }
},{timestamps: true});

const Section = mongoose.model("Section",sectionSchema);

module.exports = Section;