const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/sat/contribuyentes", require("./routes/contribuyenteRoutes"));

// Importar y usar rutas FEL
const felRoutes = require("./routes/felRoutes");
app.use("/api/fel", felRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servicio de Simulación FEL - SAT Guatemala Activo",
    version: "1.0.0",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor de Simulación FEL corriendo en el puerto ${PORT}`);
});
