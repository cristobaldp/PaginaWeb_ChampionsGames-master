// controllers/game.controller.js
import mongoose from "mongoose";
import GameDAO from "../dao/GameDao.js";

const gameDAO = new GameDAO();

// Crear juego
export const createGame = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.toString().trim().length) {
      return res.status(400).json({ error: "Faltan datos: name es obligatorio" });
    }
    const nameTrim = name.toString().trim();
    if (nameTrim.length > 100) {
      return res.status(400).json({ error: "El nombre no puede tener más de 100 caracteres" });
    }
    if (description && description.toString().length > 500) {
      return res.status(400).json({ error: "La descripción no puede tener más de 500 caracteres" });
    }

    // comprobar duplicado por name usando el DAO
    const existing = await gameDAO.findByName(nameTrim);
    if (existing) {
      return res.status(400).json({ error: "Ya existe un juego con ese nombre" });
    }

    const game = await gameDAO.create({ name: nameTrim, description: description ? description.toString().trim() : undefined });

    res.status(201).json({
      message: "Juego creado correctamente",
      game: game.toJSON ? game.toJSON() : game
    });
  } catch (error) {
    console.error("Error al crear el juego:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los juegos (con soporte opcional de ?page=&limit=&name=)
export const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const name = req.query.name; // opcional filter por nombre parcial/exacto
    const filter = {};

    if (name) {
      // búsqueda case-insensitive que contenga la cadena
      filter.name = { $regex: name.toString().trim(), $options: "i" };
    }

    const { data, total } = await gameDAO.findAll({ filter, page, limit, sort: { createdAt: -1 }});
    const gamesResp = data.map(g => (g.toJSON ? g.toJSON() : g));
    res.status(200).json({
      count: total,
      page,
      limit: limit || total,
      games: gamesResp
    });
  } catch (error) {
    console.error("Error al obtener todos los juegos:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener juego por id
export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const game = await gameDAO.findById(id);
    if (!game) return res.status(404).json({ error: "Juego no encontrado" });
    res.status(200).json({ game: game.toJSON ? game.toJSON() : game });
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar juego
export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.toString().trim().length) {
        return res.status(400).json({ error: "El name no puede estar vacío" });
      }
      if (updates.name.toString().length > 100) {
        return res.status(400).json({ error: "El nombre no puede tener más de 100 caracteres" });
      }
      const nameTrim = updates.name.toString().trim();
      const existing = await gameDAO.findByName(nameTrim);
      if (existing && existing._id && existing._id.toString() !== id) {
        return res.status(400).json({ error: "Ya existe otro juego con ese nombre" });
      }
      updates.name = nameTrim;
    }

    if (updates.description !== undefined) {
      if (updates.description && updates.description.toString().length > 500) {
        return res.status(400).json({ error: "La descripción no puede tener más de 500 caracteres" });
      }
      updates.description = updates.description ? updates.description.toString().trim() : updates.description;
    }

    const updated = await gameDAO.update(id, updates);
    if (!updated) return res.status(404).json({ error: "Juego no encontrado" });

    res.status(200).json({
      message: "Juego actualizado exitosamente",
      game: updated.toJSON ? updated.toJSON() : updated
    });
  } catch (error) {
    console.error("Error al actualizar el juego:", error);
    res.status(500).json({ error: error.message });
  }
};

// Borrar juego
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const deleted = await gameDAO.delete(id);
    if (!deleted) return res.status(404).json({ error: "Juego no encontrado" });
    res.status(200).json({
      message: "Juego eliminado exitosamente",
      game: deleted.toJSON ? deleted.toJSON() : deleted
    });
  } catch (error) {
    console.error("Error al eliminar el juego:", error);
    res.status(500).json({ error: error.message });
  }
};
