'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    'address': 'localhost',
    'port': process.env.PORT || 3000,
    'routes': {
        'cors': true
    }
});

//Connect to db
server.app.db = mongojs('mongodb://afrm-admin:1qaz2wsx@ds019806.mlab.com:19806/dev-sistemas', ['credentials']);

//Load plugins and start server
server.register([
    require('./routes/credentials')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
