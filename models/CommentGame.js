const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CommentGame extends Model {}

CommentGame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `post`,
        key: `id`
      }
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: `game`,
        key: `id`
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment_game',
  }
);

module.exports = CommentGame;
