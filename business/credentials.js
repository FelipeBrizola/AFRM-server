'use strict';

const mongojs = require('mongojs');

exports.login = (doc, cb) => {
    let query = {}, isGetOne = false;

    if (doc.credentialId && !doc.password) {
        query = {'_id': mongojs.ObjectId(doc.credentialId)};
        isGetOne = true;
    }
    else if (!doc.credentialId && doc.email && doc.password) {
        query = {'email': doc.email, 'password': doc.password};
        isGetOne = true;
    }

    global.db.credentials.find(query, (err, credentials) => {
        if (err)
            return cb(err);

        credentials = isGetOne ? credentials[0] : credentials;

        return cb(null, credentials);
    });

};

exports.getCredentials = (id, cb) => {
    const query = {
        '_id': mongojs.ObjectId(id)
    };

    global.db.credentials.findOne(query, (err, credentials) => {
        if (err)
            return cb(err);

        return cb(null, credentials);
    });

};

exports.saveCredential = (credential, cb) => {
    global.db.credentials.save(credential, (err, data) => {
        if (err)
            return cb(err)
        
        return cb(null, data)
    });
};