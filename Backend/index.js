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

app.listen(3000, () => {
  console.log("Servidor activo en mongodb+srv://Cristobal_9:lobo@cluster0.upprxmo.mongodb.net/ChampionsGames?retryWrites=true&w=majority&appName=Cluster0");
});

//Prueba POST
const Game = require('mongodb+srv://Cristobal_9:lobo@cluster0.upprxmo.mongodb.net/ChampionsGames?retryWrites=true&w=majority&appName=Cluster0');

app.post('/api/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});