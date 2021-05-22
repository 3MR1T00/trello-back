const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const Subjects = sequelize.define('subjects', 
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
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
            freezeTableName: true
        });
    return Subjects;
}