import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import gameRoutes from './routes/game.routes.js';

dotenv.config();

connectDB(process.env.MONGO_URI);

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors(
    {
    origin: 'http://localhost:5173',
    credentials: true
  }
));

app.use(express.json());

await connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.json({ message: 'Api de usuarios funcionando correctamente' });
});
app.use('/api/users',userRoutes);
app.use('/api/games',gameRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   👤 Usuarios: http://localhost:${PORT}/api/users`);
  console.log(`   🎮 Juegos:   http://localhost:${PORT}/api/games`);

});