const { DataTypes } = require('sequelize');
module.exports = sequelize => {
    const Users = sequelize.define('users', 
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profession: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            },
            avatar: {
                type: DataTypes.TEXT('long'),
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            scopes: {
                withHash: { attributes: {} }
            }
        });
    return Users;
}