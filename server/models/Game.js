const { Schema, model } = require('mongoose');

const gameSchema = new Schema({

});

const Game = model('Game', gameSchema);

module.exports = Game;