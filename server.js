'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    'port': process.env.PORT || 3000,
    'routes': {
        'cors': true
    }
});

//Connect to db
server.app.db = mongojs('mongodb://afrm-admin:1qaz2wsx@ds019806.mlab.com:19806/dev-sistemas',
        ['credentials', 'companies', 'internships', 'logs']);
global.db = server.app.db;

//Load plugins and start server
server.register([
    require('./routes/credentials'),
    require('./routes/companies'),
    require('./routes/internships'),
    require('./routes/logs')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
