const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userService = require('./user.service');
const validateRequest = require('../_middleware/validate-request');


router.post('/register', registerSchema, register);
router.post('/login', loginSchema, login);
router.post('/update', updateSchema, update);
router.post('/subjects', getSubjectsSchema, getSubjects);


module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        profession: Joi.string().allow('', null).empty(['', null]).default(''),
        avatar: Joi.string().allow('', null).empty(['', null]).default('assets/img/default_user.png')
    });
    validateRequest(req, next, schema);
}

function loginSchema (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema (req, res, next) {
    const schema = Joi.object({
        id: Joi.number().integer().required(),
        email: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        profession: Joi.string().allow('', null).empty(['', null]).default(''),
        avatar: Joi.string().allow('', null).empty(['', null]).default('assets/img/default_user.png')
    });
    validateRequest(req, next, schema);
}

function getSubjectsSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}

function register (req, res, next) {  
    userService.register(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next);
}

function login (req, res, next) {
    userService.login(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next);
}

function update (req, res, next) {
    userService.update(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next);
}

function getSubjects (req, res, next) {
    userService.getSubjects(req.body)
        .then(value => {res.json( value )},
              err => {res.json( err )})
        .catch(next);
}

