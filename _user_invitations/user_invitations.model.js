const { DataTypes } = require('sequelize');
module.exports = sequelize => {
    const User_invitations = sequelize.define('user_invitations', 
        {
            from_user: {
                type: DataTypes.INTEGER,
            },
            to_subject: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'subjects',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            to_user: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }
        },
        {
            freezeTableName: true
        });
    return User_invitations;
}