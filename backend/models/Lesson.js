const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String
    },
    duration: {
        type: Number
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Section"
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;