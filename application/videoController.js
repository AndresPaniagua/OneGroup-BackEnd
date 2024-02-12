const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Utils = require("./utils");

const Video = require("../domain/videoModel");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handler to handle loading video fragments
async function uploadChunks(req, res) {
  try {
    const videoTitle = req.body.title || "Video sin título";
    const videoDescription = req.body.description || "";
    const videoChunks = req.body.videoChunks;
    const videoChunkPart = req.body.chunkPart;
    const videoAppIdentifier = req.body.appVideoIdentifier;

    // Convertir el objeto videoChunks a una cadena JSON antes de comprimirlo
    const compressChunks = Utils.compressedChunks(videoChunks);

    const video = new Video({
      appIdentifier: videoAppIdentifier,
      title: videoTitle,
      description: videoDescription,
      chunkPart: videoChunkPart,
      chunks: compressChunks,
    });

    await video.save();

    return res.json({ success: true, video: video });
  } catch (error) {
    console.error("Error al procesar la carga del video:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
}

// Driver to get videos by app ID
async function getVideosByID(req, res) {
  try {
    const appIdentifier =
      req.body && req.body.AppIdentifier ? req.body.AppIdentifier : "";

    if (!appIdentifier) {
      return res
        .status(400)
        .json({ success: false, error: "AppIdentifier is required" });
    }

    const videos = await Video.find({ appIdentifier });

    if (!videos) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

    const responseData = [];
    videos.forEach(async (video) => {
      video.chunks[0] = Utils.uncompressedChunks(video.chunks[0]).toString();
      responseData.push(video);
    });

    res.json({ success: true, videos: responseData });
  } catch (error) {
    console.error("Error al obtener el vídeo por ID:", error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
}

// Driver to get videos by app ID and by parts
async function getVideosByIDAndPart(req, res) {
  try {
    const appIdentifier =
      req.body && req.body.AppIdentifier ? req.body.AppIdentifier : "";
    const part = req.body && req.body.part ? req.body.part : 0;

    if (!appIdentifier) {
      return res
        .status(400)
        .json({ success: false, error: "AppIdentifier is required" });
    }

    const videos = await Video.findOne({ appIdentifier, chunkPart: part });

    if (!videos) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

    videos.chunks[0] = Utils.uncompressedChunks(videos.chunks[0]).toString();

    res.json({ success: true, videos: videos });
  } catch (error) {
    console.error("Error al obtener el vídeo por ID:", error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
}

// Driver to get list of videos
async function getVideos(req, res) {
  try {
    const videos = await Video.aggregate([
      {
        $group: {
          _id: "$appIdentifier",
          title: { $first: "$title" },
          appIdentifier: { $first: "$appIdentifier" },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          appIdentifier: 1,
        },
      },
    ]);

    res.json({ success: true, videos });
  } catch (error) {
    console.error("Error al obtener la lista de videos:", error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
}

module.exports = {
  uploadChunks,
  getVideosByID,
  getVideos,
  getVideosByIDAndPart,
};
