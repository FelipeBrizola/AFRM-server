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
    const changer =  newCompany.changer;

    delete newCompany.changer;

    global.db.companies.save(newCompany, (err, companies) => {
        if (err)
            return cb(err);

        logger.save(changer, 'Empresa de ID ' + credential._id + ' foi criada.');

        return cb(null, newCompany);
    });
};

exports.updateCompany = (company, cb) => {
    const id = company._id,
        changer = company.changer;
 
    delete company._id;
    delete company.changer;

    global.db.companies.update({'_id': mongojs.ObjectId(id)}, company, (err, companies) => {
        if (err)
            return cb(err);

        logger.save(changer, 'Empresa de ID ' + company._id + ' foi alterada.');

        return cb(null, company);
    });
};