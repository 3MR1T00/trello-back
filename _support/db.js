const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { decodeBase64 } = require('bcryptjs');

module.exports =  db = {};


initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;

    /*------------check db connection---------------
    const connection = mysql.createConnection({ host, port, user, password, database });
    ----------------------------------------------*/


    /*------------connect to db------------*/
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    

    /*------------init models------------*/
    db.users = require('../_users/user.model')(sequelize);
    db.subjects = require('../_subjects/subject.model')(sequelize);
    db.subject_users = require('../_subject_users/subject_user.model')(sequelize);
    db.user_invitations = require('../_user_invitations/user_invitations.model')(sequelize);

    /*------------set sequelize connection in db variable, in case costume query has to be created--------------*/
    db.sequelize = sequelize;
    
    /*---------------------------creates n:m association between users and subjects----------------------------*/
    db.users.belongsToMany(db.subjects, { through: 'subject_users'} );
    db.subjects.belongsToMany(db.users, { through: 'subject_users'} );

    /*---------------------------create 1:n association between users / subjects and user_invitation---------------------*/
    db.users.hasMany(db.user_invitations,  { foreignKey: 'to_user'});
    db.user_invitations.belongsTo(db.users,  { foreignKey: 'to_user'});

    /*------------sync models with db------------*/
    sequelize.sync();
}
