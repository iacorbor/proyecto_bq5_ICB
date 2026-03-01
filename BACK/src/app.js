const express = require("express");
const cors = require("cors");
const path = require("path");
const mortifagosRoutes = require("./routes/mortifagos.routes");

const app = express();

app.use(cors()); 

app.use(express.json());

app.use("/img", express.static(path.join(__dirname, "../public/img")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/mortifagos", mortifagosRoutes);

module.exports = app;