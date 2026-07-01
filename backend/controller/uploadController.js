const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const Lesson = require("../models/Lesson");

const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "lms/lessons",
                        resource_type: "video"
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload();

        // Find and update lesson if lessonId is provided
        const { lessonId, title, description } = req.body;
        if (lessonId) {
            const updateData = {
                videoUrl: result.secure_url,
                duration: result.duration ? Math.round(result.duration) : undefined
            };
            if (title) updateData.title = title;
            if (description) updateData.description = description;

            const lessonInfo = await Lesson.findByIdAndUpdate(lessonId, updateData);
        }

        res.json({
            videoUrl: result.secure_url,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = { uploadVideo };