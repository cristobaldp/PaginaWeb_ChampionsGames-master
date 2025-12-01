// models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  // Mongo DB crea automáticamente el campo de id
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 
  },
  description: {
    type: String,
    required: false, 
    trim: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exporta el modelo
const GameModel = mongoose.model('Game', gameSchema);
export default GameModel;
