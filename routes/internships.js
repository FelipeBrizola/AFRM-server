'use strict';

const Boom = require('boom'),
      uuid = require('node-uuid'),
      Joi = require('joi'),
      internshipsBusiness = require('../business/internships');
Joi.objectId = require('joi-objectid')(Joi);

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
                    'credentialId' : Joi.string().optional(),
                    'name'         : Joi.string().optional(),
                    'status'       : Joi.string().optional()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/internships',
        handler: function (request, reply) {

            internshipsBusiness.update(request.payload, (err, internship) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(internship);
            });       
        },
        'config': {
            'validate': {
                'payload': {
                    '_id'     : Joi.objectId().required(),
                    'changer' : Joi.string().min(2).max(50).optional(),
                    'student' : Joi.object().required().keys({
                        'student_id' : Joi.objectId().optional(),
                        'name'       : Joi.string().optional()
                    }),
                    'company': Joi.object().required().keys({
                        'company_id' : Joi.objectId().optional(),
                        'name'       : Joi.string().optional(),
                        'responsable': Joi.object().required().keys({
                            'name' : Joi.string().optional(),
                            'email': Joi.string().optional()
                        })
                    }),
                    'class': Joi.object().required().keys({
                        'class_id' : Joi.objectId().optional(),
                        'name'     : Joi.string().optional()
                    }),
                    'begin' : Joi.string().optional().allow(''),
                    'end'   : Joi.string().optional().allow(''),
                    'status' : Joi.string().optional()

                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-internships'
};
