const express = require('express');
const router = express.Router();
const Joi = require('joi');
const subjectService = require('./subject.service');
const validateRequest = require('../_middleware/validate-request');


router.post('/create', createSubjecSchema, createSubject);
router.post('/remove', removeSubjectSchema, removeSubject);
router.post('/invite', inviteUserSchema, inviteUser);


module.exports = router;

function createSubjecSchema(req, res, next) {
    const schema = Joi.object({
        subject: {
            name: Joi.string().required(),
            description: Joi.string().required(),
        },
        userId: Joi.number().integer().required(),
        role: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function removeSubjectSchema(req, res, next) {
    const schema = Joi.object({
        subjectId: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}

function inviteUserSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        subjectId: Joi.number().integer().required(),
        email: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function createSubject(req, res, next) {
    subjectService.create(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next)
}

function removeSubject(req, res, next) {
    subjectService.remove(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next)
}

function inviteUser(req, res, next) {
    subjectService.invite(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next)
}







