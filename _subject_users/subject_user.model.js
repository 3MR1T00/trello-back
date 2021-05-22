const { DataTypes } = require('sequelize');
module.exports = sequelize => {
    const Subjects_users = sequelize.define('subject_users', 
        {
            subjectId: {
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
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true
        });
    return Subjects_users;
}