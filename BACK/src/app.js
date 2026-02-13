const express = require("express");
const cors = require("cors");
const mortifagosRoutes = require("./routes/mortifagos.routes");
const app = express();
app.use("/img",express.static("public/img"));
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/mortifagos", mortifagosRoutes);
module.exports = app;

