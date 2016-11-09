'use strict';

const mongojs =  require('mongojs'),
       logger = require('./logs');

exports.getCompanies = (name, cb) => {
    let query = {};

    if (name) {
        query = {
            'name': {
                '$regex': name || '',
                '$options':'$i'
            }
        };

    }
    global.db.companies.find(query, (err, companies) => {
        if (err)
            return cb(err);

        return cb(null, companies);
    });
};

exports.saveCompany = (newCompany, cb) => {
    global.db.companies.save(newCompany, (err, companies) => {
        if (err)
            return cb(err);

        logger.save('Empresa de ID ' + credential._id + ' foi criada.');

        return cb(null, newCompany);
    });
};

exports.updateCompany = (company, cb) => {
    const id = company._id;
 
    delete company._id;

    global.db.companies.update({'_id': mongojs.ObjectId(id)}, company, (err, companies) => {
        if (err)
            return cb(err);

        logger.save(company.changer, 'Empresa de ID ' + company._id + ' foi alterada.');

        return cb(null, company);
    });
};