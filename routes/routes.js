const express = require("express");
const multer = require("multer");
const router = express.Router();
const videoController = require("../application/videoController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/uploadChunks", videoController.uploadChunks);
router.post("/api/videoID", upload.none(), videoController.getVideosByID);
router.post("/api/getVideosByIDAndPart", upload.none(), videoController.getVideosByIDAndPart);
router.get("/api/videos", videoController.getVideos);

module.exports = router;
