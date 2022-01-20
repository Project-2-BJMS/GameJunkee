// const Game = require('./Game')
// const User = require('./User')
// const Post = require('./Post')
// // const Comment = require('./Comment')



// Post.belongsTo(User, {
//     foreignKey: 'user_id',
// })
// User.hasMany(Post, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })


// Post.belongsTo(Game, {
//   foreignKey: 'game_id',
// })

// Game.hasMany(Post, {
//   foreignKey: 'game_id',
//   })


//   Post.belongsTo(Game, {
//     foreignKey: 'game_id',
//   })
  
//   Game.hasMany(Post, {
//     foreignKey: 'game_id',
//     })

// module.exports = {Game, User, Post, }



const sequelize = require('../config/connection');
const { User, Post, Game, Comment } = require('../models');

// const userData = require('./userData.json');
// const postData = require('./postData.json');
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


// const randomCommentData = [
//     {
//         comment_body: casual.sentence,
//         date_created: casual.date(format = 'YYYY-MM-DD')
//     },
//     {
//         comment_body: casual.sentence,
//         date_created: casual.date(format = 'YYYY-MM-DD')
//     },
//     {
//         comment_body: casual.sentence,
//         date_created: casual.date(format = 'YYYY-MM-DD')
//     },
//     {
//         comment_body: casual.sentence,
//         date_created: casual.date(format = 'YYYY-MM-DD')
//     }
// ]





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
          

        //////////////////////////////////////////////////////////////////////////////////////////

        // for (const comment of commentData) {
        //     await Comment.create({
        //         ...comment,
        //         user_id: users[Math.floor(Math.random() * users.length)].id,
        //         post_id: post[Math.floor(Math.random() * post.length)].id,
        //     });
        // }
    
        // const comment = await Comment.bulkCreate(commentData, {
        //     returning: true,
        //     user_id: users[Math.floor(Math.random() * users.length)].id,
        //     post_id: post[Math.floor(Math.random() * post.length)].id,
        // })
    }
        //////////////////////////////////////////////////////////////////////////////////////////
    }
    catch (error) {
        console.log(error)
    }
    process.exit(0);
};

seedDatabase();