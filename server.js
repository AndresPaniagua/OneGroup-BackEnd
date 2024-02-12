const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./infrastructure/mongoDB");
const routes = require("./routes/routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(routes);

// start server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

