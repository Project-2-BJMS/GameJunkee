const Game = require('./Game')
const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')
const PostGame = require('./PostGame')
const CommentGame = require('./CommentGame')


Post.belongsTo(User, {
    foreignKey: 'user_id',
})
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})



Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})



Game.belongsToMany(Post, {
    through: PostGame
  })

  Post.belongsToMany(Game, {
    through: PostGame
  })


  Game.belongsToMany(Comment, {
    through: CommentGame
  })

  Comment.belongsToMany(Game, {
    through: CommentGame
  })






module.exports = {Game, User, Post, Comment, PostGame, CommentGame}

