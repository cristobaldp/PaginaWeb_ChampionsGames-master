// Backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import gamesRoutes from './routes/games.routes.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Crear app primero
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rutas que no tocan BD (opcionales) pueden ir antes
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Conectar BD y arrancar servidor en IIFE para control de errores
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Base de datos conectada');

    // IMPORTANTE: montar rutas específicas ANTES que las rutas genéricas
    // Esto evita que "/api/games" sea capturado por una ruta genérica tipo "/api/:id"
    app.use('/api/games', gamesRoutes);

    // Opción recomendada y más explícita: montar rutas de usuario en /api/users
    // Descomenta la línea de abajo y actualiza frontend si prefieres esta forma:
    // app.use('/api/users', userRoutes);

    // Si mantienes userRoutes montadas en /api (forma antigua), ponlas *después* de /api/games
    app.use('/api', userRoutes);

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error arrancando servidor:', err);
    process.exit(1);
  }
})();
