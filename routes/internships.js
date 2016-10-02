'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const internshipsBusiness = require('../business/internships');

exports.register = function (server, options, next) {

     server.route({
        method: 'GET',
        path: '/internships/{query?}',
        handler: function (request, reply) {

            internshipsBusiness.getInternships(request.query, (err, internships) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(internships);
            });       
        },
        'config': {
            'validate': {
                'query': {
                    'credentialId': Joi.string().optional(),
                    'name': Joi.string().optional(),
                    'status': Joi.string().optional()
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-internships'
};
