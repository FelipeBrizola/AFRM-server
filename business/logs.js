'use strict';

const mongojs =  require('mongojs');

exports.getLogs = (cb) => {

    global.db.logs.find({}, (err, logs) => {
        if (err)
            return cb(err);

        return cb(null, logs);
    });
};

exports.save = (credentialId, text) => {
    let doc = {};

    global.db.credentials.find({'_id': mongojs.ObjectId(credentialId)}, (err, credentials) => {
        if (err)
            return cb(err);

        doc = {
            'user': {
                'id': credentials[0]._id.toString(),
                'name': credentials[0].name
            },
            'date': new Date(),
            'change': text
        };
        return global.db.logs.save(doc);
    });
};