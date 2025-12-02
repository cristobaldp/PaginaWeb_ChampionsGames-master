// dao/GameDao.js
import Game from '../models/Game.js';

// CRUD sencillo
// Crear juego
export const create = async (gameData) => {
  const game = new Game(gameData);
  return await game.save();
};

// Buscar juegos
export const findAll = async () => {
  return await Game.find();
};

// Buscar juego por ID
export const findById = async (id) => {
  return await Game.findById(id);
};

// Actualizar juego por ID
export const updateById = async (id, data) => {
  return await Game.findByIdAndUpdate(id, data, { new: true });
};

// Borrar juego por ID
export const deleteById = async (id) => {
  return await Game.findByIdAndDelete(id);
};