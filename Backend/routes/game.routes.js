// routes/game.routes.js
import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
} from '../controllers/game.controller.js';

const router = express.Router();

router.post('/', createGame);
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;
