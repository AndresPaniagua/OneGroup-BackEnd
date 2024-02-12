const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://AndresPaniagua:vtEjNihQ2L9wryWx@videotracker.sgiydch.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión a MongoDB establecida");
});

module.exports = db;
