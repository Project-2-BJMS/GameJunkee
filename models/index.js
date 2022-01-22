const Game = require('./Game')
const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')



Post.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Game.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})


Post.belongsTo(Game, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE'
})

Game.hasMany(Post, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE'
})


Comment.belongsTo(User, {
  foreignKey: 'user_id',
})


User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})


Comment.belongsTo(Post, {
  foreignKey: 'post_id',
})


Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})





module.exports = { Game, User, Post, Comment }














