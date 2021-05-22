const db = require('../_support/db');
const jwt = require('../_support/jwt');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

module.exports = { register, login, update, getSubjects };

async function register (params) {    
    const user = await db.users.findOne({ 
                where: {
                    email: params.email
                }});

    if (user) { throw null };

    params.password = await bcrypt.hash(params.password, 10);
    createdUser = await db.users.create(params);

    return removeHash(createdUser.get());
}


async function login (params) {
    const user = await db.users.scope('withHash').findOne({
                where: { email: params.email },
                include: [{
                    model: db.user_invitations
                }]
            });

    if ( !user || !(await bcrypt.compare(params.password, user.password)) ) {
        throw null;
    }

    return jwt.signToken(removeHash(user.get())); 
}

async function update (params) {
    const user = await db.users.findByPk(params.id);
    
    if (user) {
        Object.assign(user, params);
        return await user.save();
    }
}

async function getSubjects (params) {
    const subjects = await db.users.findAll({
                      where: { id: params.userId },
                      attributes: [],
                      include: [{ 
                         model: db.subjects,
                         attributes: ['id', 'name', 'description'],
                         through: { attributes: [] },
                         include: [{
                            model: db.users,
                            attributes: ['id','email','firstname','lastname','profession','avatar'],
                            through: { attributes: ['role'] },
                         }]
                      }]
                   });
                   
    return subjects.length > 0 ? subjects : null;
}

function removeHash (user) {
    const { password, ...userWithoutHash } = user;

    return userWithoutHash;
}