import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


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
app.use('/api', require('./routes/userRoutes'));
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);


});