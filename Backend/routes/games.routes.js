// Backend/routes/games.routes.js
import express from 'express';
import Game from '../models/Game.js'; // ajusta la ruta si hace falta

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const gamesFromDb = await Game.find().lean();
    const mapped = (gamesFromDb || []).map(g => {
      return {
        id: g._id ? String(g._id) : (g.id ? String(g.id) : null),
        name: g.name ?? g.title ?? 'Untitled',
        description: g.description ?? '',
        image: g.image ?? g.coverUrl ?? '',
        genres: Array.isArray(g.genres) ? g.genres : [],
        chosenCount: typeof g.chosenCount === 'number' ? g.chosenCount : 0
      };
    });
    return res.json(mapped);
  } catch (err) {
    console.error('ERROR in GET /api/games ->', err.stack || err);
    return res.status(500).json({ error: 'Server error fetching games' });
  }
});

router.post('/:gameId/select', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    if (!gameId) return res.status(400).json({ error: 'Missing gameId' });

    const updated = await Game.findByIdAndUpdate(gameId, { $inc: { chosenCount: 1 } }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Game not found' });

    return res.json({ success: true, chosenCount: updated.chosenCount ?? 0 });
  } catch (err) {
    console.error('ERROR in POST /api/games/:gameId/select ->', err.stack || err);
    return res.status(500).json({ error: 'Server error incrementing chosenCount' });
  }
});

router.get('/ranking', async (req, res) => {
  try {
    const top = await Game.find().sort({ chosenCount: -1 }).limit(50).lean();
    const mapped = top.map(g => ({
      id: g._id ? String(g._id) : (g.id ? String(g.id) : null),
      name: g.name ?? g.title ?? 'Untitled',
      image: g.image ?? g.coverUrl ?? '',
      chosenCount: typeof g.chosenCount === 'number' ? g.chosenCount : 0
    }));
    return res.json(mapped);
  } catch (err) {
    console.error('ERROR in GET /api/games/ranking ->', err.stack || err);
    return res.status(500).json({ error: 'Server error fetching ranking' });
  }
});

export default router;
