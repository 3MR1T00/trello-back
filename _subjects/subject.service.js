const db = require('../_support/db');
const { Op } = require("sequelize");

module.exports = { create, remove, invite };

async function create (params) {
    const subject = await db.subjects.create(params.subject);

    const subject_user = {
        subjectId: subject.get().id,
        userId: params.userId,
        role: params.role
    };

    return await db.subject_users.create(subject_user);
}

async function remove (params) {
    const subject = await db.subjects.destroy({
        where: {id: params.subjectId}
    });
    
    return subject;
}

async function invite (params) {
    const { userId, subjectId, email } = params;

    const user = await db.users.findOne({ where: { email: email } });
    const subject = await db.subjects.findOne({ where: { id: subjectId } });
    
    if ( !user || !subject ) { throw null; }

    const inv_params = {
        from_user: userId,
        to_subject: subject.get().id,
        to_user: user.get().id
    }

    return await db.user_invitations.create(
        { from_user: userId, to_subject: subject.get().id, to_user: user.get().id },
        { fields: ["from_user", "to_subject", "to_user"] }
    );
}