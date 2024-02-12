const zlib = require("zlib");

function compressedChunks(videoChunks) {
  try {
    const toText = JSON.stringify(videoChunks);
    return zlib.gzipSync(toText);
  } catch (error) {
    console.error("Error al comprimir chunks:", error);
    return [];
  }
}

function uncompressedChunks(compressedData) {
  try {
    return zlib.gunzipSync(compressedData.buffer);
  } catch (error) {
    console.error("Error al descomprimir chunks:", error);
    return [];
  }
}

module.exports = { compressedChunks, uncompressedChunks };
