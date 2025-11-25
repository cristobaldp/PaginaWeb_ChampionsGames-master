import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB(process.env.MONGO_URI);

const app = express();

// Middleware para parsear JSON (¡importante si usas POST!)
app.use(express.json());

// 🟢 Ruta de prueba GET
app.get('/', (req, res) => {
  res.json({ message: '¡Hola desde el backend! 🚀' });
});

// 🟡 Ruta de prueba POST (opcional, para probar envío de datos)
app.post('/test', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.json({
    message: '¡Datos recibidos!',
    data: req.body
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});