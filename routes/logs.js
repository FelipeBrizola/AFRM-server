'use strict';

const Boom = require('boom'),
      logsBusiness = require('../business/logs');

exports.register = function (server, options, next) {

     server.route({
        method: 'GET',
        path: '/logs',
        handler: function (request, reply) {

            logsBusiness.getLogs((err, logs) => {
                if (err)
                    return reply(Boom.wrap(err));

                return reply(logs);
            });       
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-logs'
};
