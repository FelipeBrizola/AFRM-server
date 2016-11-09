'use strict';

const mongojs             = require('mongojs'),
      credentialsBusiness = require('./credentials'),
      logger              = require('../business/logs');


exports.getInternships = (query, cb) => {
    credentialsBusiness.getCredentials(query.credentialId, (err, credential) => {
        if (err)
            return (err)

        exports.getInternshipsByRole(credential, query, (err, data) => {
            if (err)
                return cb(err)
            return cb(null, data);
        });
        
    });
};

exports.getInternshipsByRole = (credential, query, cb) => {
    let filter = {};

    if (credential.role === 'student') {
        filter = {
            'student.student_id': credential._id
        };
        if (query.status)
            filter.status = query.status;
    }

    // coordenador ou funcionario
    else {
        if (query.name)
            filter = {
            'student.name': {
                    '$regex': query.name || '',
                    '$options':'$i'
                }
        };

        if (query.status)
            filter.status = query.status;
    }
    global.db.internships.find(filter, (err, data) => {
            if (err)
                return cb(err);

            return cb(null, data);
        });
};

exports.update = (internship, cb) => {
    const query = {'_id': mongojs.ObjectId(internship._id)};
    let credentialId;

    internship.student.student_id = mongojs.ObjectId(internship.student.student_id);

    credentialId = internship._id;
    delete internship._id;

    global.db.internships.update(query, internship, (err, data) => {
        if (err)
            return cb(err);

        logger.save(internship.changer, 'Estágio de ID ' + credentialId + ' foi alterado.');
        
        return cb(null, data);
    });
};