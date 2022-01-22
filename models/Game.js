const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');


class Game extends Model { }

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false,


        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    }
);

module.exports = Game;