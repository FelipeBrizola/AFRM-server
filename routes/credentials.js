'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const credentialsBusiness = require('../business/credentials');

exports.register = function (server, options, next) {

     server.route({
        method: 'GET',
        path: '/credentials/{query?}',
        handler: function (request, reply) {
            credentialsBusiness.login(request.query, (err, credentials) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(credentials);
            });       
        },
        config: {
            validate: {
                query : Joi.object().required().keys({
                    credentialId : Joi.string().optional(),
                    email        : Joi.string().optional(),
                    password     : Joi.string().optional()
                })
            }
        }

    });

    server.route({
        method: 'POST',
        path: '/credentials',
        handler: function (request, reply) {

            credentialsBusiness.saveCredential(request.payload, (err, company) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(company);
            });       
        },
        config: {
            validate: {
                payload: {
                    name     : Joi.string().required(),
                    email    : Joi.string().required(),
                    isActive : Joi.boolean().required(),
                    password : Joi.string().required(),
                    role     : Joi.string().required(),
                    class    : Joi.object().keys({
                        class_id : Joi.string().required(),
                        name     : Joi.string().required(),

                    })
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-credentials'
};
