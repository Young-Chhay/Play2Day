const db = require('../config/connection');
const { Game } = require('../models');

const gameData = require('./gameSeeds.json');

db.once('open', async () => {
  await Game.deleteMany({});

  const gamesdb = await Game.insertMany(gameData);

  console.log('games seeded!');
  process.exit(0);
});
