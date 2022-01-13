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



Post.hasOne(Game, {
    foreignKey: 'game_id'
})
Game.belongsToMany(Post, {
    foreignKey: 'post_id'
})


Comment.hasOne(Game, {
    foreignKey: 'game_id'
})
Game.belongsToMany(Comment, {
    foreignKey: 'comment_id'
})






module.exports = {Game, User, Post, Comment}

