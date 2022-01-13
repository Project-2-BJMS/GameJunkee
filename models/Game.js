const { Model, DataTypes } = require('sequelize');
const sequelize = require('config/connection.js');


class Game extends Model {}

Game.init(
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true
    }
);

module.exports = Game;