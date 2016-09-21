'use strict';

exports.getCredentials = (cb) => {
    global.db.credentials.find((err, data) => {
        if (err)
            return cb(err);

        return cb(null, data);
    });
};