
import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
    dest: "uploads/"
});
const express = require("express");
const router = express.Router();

const uploadVideo = async (req,res)=>{
    res.send("Uploaded Succesfully.")
}

router.post(
    "/",
    upload.single('file'),
    uploadVideo
)


module.exports = router;