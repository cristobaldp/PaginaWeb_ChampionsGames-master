// controllers/game.controller.js
import axios from "axios";
import mongoose from "mongoose";
import GameDAO from "../repo/GameDao.js";

const gameDAO = new GameDAO();

/* Basic CRUD */

// POST /api/games
export const createGame = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.toString().trim().length) return res.status(400).json({ error: "Faltan datos: name" });
    const nameTrim = name.toString().trim();
    if (nameTrim.length > 100) return res.status(400).json({ error: "El nombre no puede tener más de 100 caracteres" });
    if (description && description.toString().length > 1000) return res.status(400).json({ error: "La descripción es demasiado larga" });

    const existing = await gameDAO.findByName(nameTrim);
    if (existing) return res.status(400).json({ error: "Ya existe un juego con ese nombre" });

    const created = await gameDAO.create({ name: nameTrim, description: description ? description.toString().trim() : undefined });
    return res.status(201).json({ message: "Juego creado correctamente", game: created.toJSON ? created.toJSON() : created });
  } catch (err) {
    console.error("createGame:", err);
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/games
export const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const name = req.query.name;
    const filter = {};
    if (name) filter.name = { $regex: name.toString().trim(), $options: "i" };
    const { data, total } = await gameDAO.findAll({ filter, page, limit, sort: { createdAt: -1 }});
    const gamesResp = data.map(g => (g.toJSON ? g.toJSON() : g));
    return res.status(200).json({ count: total, page, limit: limit || total, games: gamesResp });
  } catch (err) {
    console.error("getAllGames:", err);
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/games/:id
export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
    const game = await gameDAO.findById(id);
    if (!game) return res.status(404).json({ error: "Juego no encontrado" });
    return res.status(200).json({ game: game.toJSON ? game.toJSON() : game });
  } catch (err) {
    console.error("getGameById:", err);
    return res.status(500).json({ error: err.message });
  }
};

// PUT /api/games/:id
export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });

    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.toString().trim().length) return res.status(400).json({ error: "El name no puede estar vacío" });
      if (updates.name.toString().length > 100) return res.status(400).json({ error: "El nombre es demasiado largo" });
      const nameTrim = updates.name.toString().trim();
      const existing = await gameDAO.findByName(nameTrim);
      if (existing && existing._id && existing._id.toString() !== id) return res.status(400).json({ error: "Ya existe otro juego con ese nombre" });
      updates.name = nameTrim;
    }

    if (updates.description !== undefined) {
      if (updates.description && updates.description.toString().length > 1000) return res.status(400).json({ error: "La descripción es demasiado larga" });
      updates.description = updates.description ? updates.description.toString().trim() : updates.description;
    }

    const updated = await gameDAO.update(id, updates);
    if (!updated) return res.status(404).json({ error: "Juego no encontrado" });
    return res.status(200).json({ message: "Juego actualizado exitosamente", game: updated.toJSON ? updated.toJSON() : updated });
  } catch (err) {
    console.error("updateGame:", err);
    return res.status(500).json({ error: err.message });
  }
};

// DELETE /api/games/:id
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
    const deleted = await gameDAO.delete(id);
    if (!deleted) return res.status(404).json({ error: "Juego no encontrado" });
    return res.status(200).json({ message: "Juego eliminado exitosamente", game: deleted.toJSON ? deleted.toJSON() : deleted });
  } catch (err) {
    console.error("deleteGame:", err);
    return res.status(500).json({ error: err.message });
  }
};

/* -------------------
   FreeToGame integration
   ------------------- */

// GET /api/games/external/:id  -> trae datos externos (no guarda)
export const fetchExternalGame = async (req, res) => {
  try {
    const extId = req.params.id;
    if (!extId || isNaN(Number(extId))) return res.status(400).json({ error: "ID externo inválido" });
    const url = `https://www.freetogame.com/api/game?id=${encodeURIComponent(extId)}`;
    const response = await axios.get(url, { timeout: 8000 });
    return res.status(200).json({ external: response.data });
  } catch (err) {
    if (err.response) return res.status(err.response.status).json({ error: err.response.data || "Error API externa" });
    console.error("fetchExternalGame:", err.message);
    return res.status(500).json({ error: "Error al obtener datos externos" });
  }
};

// POST /api/games/import/:id  -> importar 1 juego externo a BD
export const importExternalGame = async (req, res) => {
  try {
    const extId = req.params.id;
    if (!extId || isNaN(Number(extId))) return res.status(400).json({ error: "ID externo inválido" });
    const url = `https://www.freetogame.com/api/game?id=${encodeURIComponent(extId)}`;
    const response = await axios.get(url, { timeout: 8000 });
    const external = response.data;

    const name = (external.title || "").toString().trim();
    const description = (external.short_description || "").toString().trim();
    if (!name) return res.status(400).json({ error: "Recurso externo sin título" });

    // Evitar duplicados por externalId o name
    const existingByExternal = external.id ? await GameDAO.prototype.findByName.call(gameDAO, name) : null;
    const existing = await gameDAO.findByName(name);
    if (existing) return res.status(400).json({ error: "Ya existe un juego con ese nombre en la BD", game: existing.toJSON ? existing.toJSON() : existing });

    const gameData = {
      name,
      description: description || undefined,
      externalId: external.id ? String(external.id) : undefined,
      thumbnail: external.thumbnail || undefined,
      genre: external.genre || undefined,
      platform: external.platform || undefined
    };

    const created = await gameDAO.create(gameData);
    return res.status(201).json({ message: "Juego importado correctamente", game: created.toJSON ? created.toJSON() : created });
  } catch (err) {
    if (err.response) return res.status(err.response.status).json({ error: err.response.data || "Error API externa" });
    console.error("importExternalGame:", err);
    return res.status(500).json({ error: "Error al importar el juego" });
  }
};

// POST /api/games/import  -> importar en batch (body: { ids: [452,123,...] })
export const importBatch = async (req, res) => {
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids : null;
    if (!ids || !ids.length) return res.status(400).json({ error: "Debes enviar un array 'ids' en el body" });
    if (ids.length > 50) return res.status(400).json({ error: "Máximo 50 ids por petición" });

    const results = await Promise.allSettled(ids.map(async (extId) => {
      if (!extId || isNaN(Number(extId))) return { id: extId, status: "invalid" };
      try {
        const url = `https://www.freetogame.com/api/game?id=${encodeURIComponent(extId)}`;
        const r = await axios.get(url, { timeout: 8000 });
        const external = r.data;
        const name = (external.title || "").toString().trim();
        if (!name) return { id: extId, status: "no-title" };

        const existing = await gameDAO.findByName(name);
        if (existing) return { id: extId, status: "exists", game: existing.toJSON ? existing.toJSON() : existing };

        const gameData = {
          name,
          description: external.short_description || undefined,
          externalId: external.id ? String(external.id) : undefined,
          thumbnail: external.thumbnail || undefined,
          genre: external.genre || undefined,
          platform: external.platform || undefined
        };
        const created = await gameDAO.create(gameData);
        return { id: extId, status: "imported", game: created.toJSON ? created.toJSON() : created };
      } catch (e) {
        return { id: extId, status: "error", error: e.response ? e.response.data : e.message };
      }
    }));

    return res.status(200).json({ results });
  } catch (err) {
    console.error("importBatch:", err);
    return res.status(500).json({ error: "Error en importBatch" });
  }
};

/* -------------------
   Random / Pick flow
   ------------------- */

// GET /api/games/random -> juego aleatorio no-picked
export const getRandomGame = async (req, res) => {
  try {
    const doc = await gameDAO.getRandomUnpicked();
    if (!doc) return res.status(404).json({ error: "No quedan juegos sin elegir" });
    return res.status(200).json({ game: doc });
  } catch (err) {
    console.error("getRandomGame:", err);
    return res.status(500).json({ error: err.message });
  }
};

// POST /api/games/pick/:id -> marca juego como elegido (picked = true)
export const pickGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
    const updated = await gameDAO.markPicked(id);
    if (!updated) return res.status(404).json({ error: "Juego no encontrado" });
    return res.status(200).json({ message: "Juego marcado como elegido", game: updated.toJSON ? updated.toJSON() : updated });
  } catch (err) {
    console.error("pickGame:", err);
    return res.status(500).json({ error: err.message });
  }
};

// POST /api/games/reset-picks -> resetea picked = false para todos
export const resetPicks = async (req, res) => {
  try {
    const result = await gameDAO.resetAllPicked();
    return res.status(200).json({ message: "Reseteadas las elecciones", modifiedCount: result.nModified ?? result.modifiedCount ?? result.modifiedCount });
  } catch (err) {
    console.error("resetPicks:", err);
    return res.status(500).json({ error: err.message });
  }
};
