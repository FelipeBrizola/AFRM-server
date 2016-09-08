'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function (server, options, next) {

    const db = server.app.db;

     server.route({
        method: 'GET',
        path: '/credentials',
        handler: function (request, reply) {
            return reply('API - dev-sistemas OK');       
        }
    });

   
    server.route({
        method: 'POST',
        path: '/credentials',
        handler: function (request, reply) {

            db.credentials.findOne({
                'email': request.payload.email,
                'password': request.payload.password
            }, function(err, doc) {
                if (err)
                    return reply(Boom.wrap(err));

                if (!doc)
                    return reply(Boom.notFound());

                return reply('token');
            })

        },
        config: {
            validate: {
                payload: {
                    email: Joi.string().min(10).max(50).required(),
                    password: Joi.string().min(3).max(50).required()
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-credentials'
};
