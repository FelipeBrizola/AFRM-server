'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const companiesBusiness = require('../business/companies');

exports.register = function (server, options, next) {

     server.route({
        method: 'GET',
        path: '/companies',
        handler: function (request, reply) {

            companiesBusiness.getCompanies((err, companies) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(companies);
            });       
        }
    });

    server.route({
        method: 'POST',
        path: '/companies',
        handler: function (request, reply) {

            companiesBusiness.saveCompany(request.payload, (err, company) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(company);
            });       
        },
        config: {
            validate: {
                payload: {
                    name     : Joi.string().min(2).max(50).required(),
                    cnpj     : Joi.string().min(12).max(14).required(),
                    email    : Joi.string().min(3).max(50).required(),
                    phone    : Joi.string().min(10).max(12).required(),
                    isActive : Joi.boolean()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/companies',
        handler: function (request, reply) {

            companiesBusiness.updateCompany(request.payload, (err, company) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(company);
            });       
        },
        config: {
            validate: {
                payload: {
                    _id      : Joi.string().optional(),
                    name     : Joi.string().min(2).max(50).optional(),
                    cnpj     : Joi.string().min(12).max(14).optional(),
                    email    : Joi.string().min(3).max(50).optional(),
                    phone    : Joi.string().min(10).max(12).optional(),
                    isActive : Joi.boolean().optional()
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-companies'
};
