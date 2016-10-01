'use strict';

const mongojs             = require('mongojs'),
      credentialsBusiness = require('./credentials');


exports.getInternships = (credentialId, cb) => {
    credentialsBusiness.getCredentials(credentialId, (err, credential) => {
        if (err)
            return (err)

        exports.getInternshipsByRole(credential, (err, data) => {
            if (err)
                return cb(err)
            return cb(null, data);
        });
        
    });
};

exports.getInternshipsByRole = (credential, cb) => {
    let query = {};

    if (credential.role === 'student') {
        query = {
            'student.student_id': credential._id
        };
    }

    global.db.internships.find(query, (err, data) => {
            if (err)
                return cb(err);

            return cb(null, data);
        });
};