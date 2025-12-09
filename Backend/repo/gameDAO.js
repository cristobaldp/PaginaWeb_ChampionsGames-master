import mongoose from "mongoose";
import Game from "../models/Game.js";

export default class GameDAO {
  constructor() {}

  // Crear juego
  async create(gameData) {
    try {
      const game = new Game(gameData);
      return await game.save();
    } catch (err) {
      throw err;
    }
  }

  /**
   * findAll(opciones)
   * opciones: {
   *   filter: Object,        // { name: /foo/i } etc.
   *   page: Number,          // 1-based
   *   limit: Number,         // items por pagina
   *   sort: Object           // { creadoEn: -1 } etc.
   * }
   * Devuelve: { data: [...], total: Number, page: Number, limit: Number }
   */
  async findAll(opciones = {}) {
    try {
      const { filter = {}, page = 1, limit = 0, sort = { creadoEn: -1 } } = opciones;

      if (limit && limit > 0) {
        const skip = (Math.max(page, 1) - 1) * limit;
        const [data, total] = await Promise.all([
          Game.find(filter).sort(sort).skip(skip).limit(limit),
          Game.countDocuments(filter)
        ]);
        return { data, total, page: Math.max(page, 1), limit };
      } else {
        const data = await Game.find(filter).sort(sort);
        const total = Array.isArray(data) ? data.length : 0;
        return { data, total, page: 1, limit: total };
      }
    } catch (err) {
      throw err;
    }
  }

  // Buscar juego por ID
  async findById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      return await Game.findById(id);
    } catch (err) {
      throw err;
    }
  }

  // Buscar por nombre (exacto). Puedes cambiar a case-insensitive si lo deseas.
  async findByName(name) {
    try {
      if (!name) return null;
      // búsqueda case-insensitive y trim
      const nameTrim = name.toString().trim();
      return await Game.findOne({ name: { $regex: `^${this._escapeRegex(nameTrim)}$`, $options: "i" } });
    } catch (err) {
      throw err;
    }
  }

  // Actualizar por ID
  async update(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      return await Game.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (err) {
      throw err;
    }
  }

  // Borrar por ID
  async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      return await Game.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
