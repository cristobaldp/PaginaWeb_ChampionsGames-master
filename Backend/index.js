require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

// Conectar a MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend funcionando y conectado a MongoDB Atlas!" });
});

app.listen(3000, () =>
  console.log("Servidor activo en http://localhost:3000")
);
