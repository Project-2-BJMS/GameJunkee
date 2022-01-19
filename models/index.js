const Game = require('./Game')
const User = require('./User')
const Post = require('./Post')
// const Comment = require('./Comment')



Post.belongsTo(User, {
    foreignKey: 'user_id',
})
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


Post.belongsTo(Game, {
  foreignKey: 'game_id',
})

Game.hasMany(Post, {
  foreignKey: 'game_id',
  })


  Post.belongsTo(Game, {
    foreignKey: 'game_id',
  })
  
  Game.hasMany(Post, {
    foreignKey: 'game_id',
    })










module.exports = {Game, User, Post, }