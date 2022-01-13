const { Model, DataTypes } = require('sequelize');
const sequelize = require('config/connection.js');

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,   
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true
    }
)

module.exports = User;