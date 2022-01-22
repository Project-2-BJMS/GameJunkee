const sequelize = require('../config/connection');
const { User, Post, Game, Comment } = require('../models');


const gameData = require('./gameData.json');
const commentData = require('./commentData.json')


const casual = require('casual')


const randomUserData =
    [
        {
            username: casual.username,
            email: casual.email,
            password: casual.password
        },
        {
            username: casual.username,
            email: casual.email,
            password: casual.password
        },
        {
            username: casual.username,
            email: casual.email,
            password: casual.password
        },
        {
            username: casual.username,
            email: casual.email,
            password: casual.password
        }
    ]


const randomPostData =
    [
        {
            post_body: casual.sentence,
            date_created: casual.date(format = 'YYYY-MM-DD')
        },
        {
            post_body: casual.sentence,
            date_created: casual.date(format = 'YYYY-MM-DD')
        },
        {
            post_body: casual.sentence,
            date_created: casual.date(format = 'YYYY-MM-DD')
        },
        {
            post_body: casual.sentence,
            date_created: casual.date(format = 'YYYY-MM-DD')
        }
    ]




const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    try {
        const users = await User.bulkCreate(randomUserData, {
            individualHooks: true,
            returning: true,
        });


        const games = await Game.bulkCreate(gameData, {
            // individualHooks: true,
            returning: true,
        });


        for (const post of randomPostData) {
            await Post.create({
                ...post,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                game_id: games[Math.floor(Math.random() * games.length)].id,

            });



        }

    }
    catch (error) {
        console.log(error)
    }
    process.exit(0);
};

seedDatabase();






