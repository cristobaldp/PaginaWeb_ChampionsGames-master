// routes/game.routes.js
import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
  fetchExternalGame,
  importExternalGame,
  importBatch,
  getRandomGame,
  pickGame,
  resetPicks
} from '../controllers/game.controller.js';

const router = express.Router();

router.post('/', createGame);
router.get('/', getAllGames);

// import / external (antes de '/:id')
router.get('/external/:id', fetchExternalGame);
router.post('/import/:id', importExternalGame);
router.post('/import', importBatch);

// random / pick flow
router.get('/random', getRandomGame);
router.post('/pick/:id', pickGame);
router.post('/reset-picks', resetPicks);

// rutas con :id al final
router.get('/:id', getGameById);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;
