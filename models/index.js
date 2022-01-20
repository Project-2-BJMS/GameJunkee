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


Post.belongsTo(Game, {
  foreignKey: 'game_id',
})

Game.hasMany(Post, {
  foreignKey: 'game_id',
  })


//////////////////////////////////////////////////////////////////////////////////////////

//comment to user is 1 to 1 with fkey defined in source model
Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

//user to comment is a 1 to many with fkey defined in target model
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

//comment to post is a 1 to 1 with fkey defined in source model
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
})

// post to comment is a 1 to many fkey defined in target model 
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})
//////////////////////////////////////////////////////////////////////////////////////////





module.exports = {Game, User, Post, Comment}