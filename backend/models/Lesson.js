

const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sectionId:{
        type:  mongoose.Schema.Types.ObjectId,
        requied: true
    }
});

const Lesson = mongoose.model("Lesson",lessonSchema);

module.exports = Lesson;