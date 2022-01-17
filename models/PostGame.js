const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PostGame extends Model {}

PostGame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: `post`,
        key: `id`
      }
    },
    game_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'post_game',
  }
);

module.exports = PostGame;