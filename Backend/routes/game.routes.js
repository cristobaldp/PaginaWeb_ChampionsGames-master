import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
} from '../controllers/gameController.js'; 

const router = express.Router();

// POST /api/games - Crear juego
router.post('/', createGame);

// GET /api/games - Obtener todos los juegos
router.get('/', getAllGames);

// GET /api/games/:id - Obtener juego por ID
router.get('/:id', getGameById);

// PUT /api/games/:id - Actualizar juego
router.put('/:id', updateGame);

// DELETE /api/games/:id - Eliminar juego
router.delete('/:id', deleteGame);

export default router;
