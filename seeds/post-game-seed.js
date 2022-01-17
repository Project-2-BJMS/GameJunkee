const { PostGame } = require('../models');

const postGameData = [
  {
    post_id: 1,
    game_id: 1,
  },
  {
    post_id: 2,
    game_id: 2,
  },
  {
    post_id: 3,
    game_id: 4,
  },
  {
    post_id: 4,
    game_id: 3,
  }
];

const seedPostGame = () => PostGame.bulkCreate(postGameData);

module.exports = seedPostGame;