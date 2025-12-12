// Backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import gamesRoutes from './routes/games.routes.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Base de datos conectada');

    app.use('/api/games', gamesRoutes);

    // ✅ LA CORRECCIÓN IMPORTANTE
    app.use('/api/users', userRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error arrancando servidor:', err);
    process.exit(1);
  }
})();
