// models/Game.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mode: { type: String, enum: ['single', '2v2'] },
  isPublic: Boolean,
  status: { type: String, enum: ['waiting', 'in-progress', 'completed'], default: 'waiting' },
  // Add additional fields as needed for rounds, cards, etc.
});

module.exports = mongoose.model('Game', GameSchema);