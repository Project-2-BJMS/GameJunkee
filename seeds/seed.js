const sequelize = require('../config/connection');
const { User, Post, Game, } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const gameData = require('./gameData.json');
const seedPostGame = require('./post-game-seed')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    const games = await Game.bulkCreate(gameData, {
        // individualHooks: true,
        returning: true,
    });



    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            // game_id: games.id
        });
    }

    await seedPostGame()

    process.exit(0);
};

seedDatabase();
