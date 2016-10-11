'use strict';

const mongojs =  require('mongojs');

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

        return cb(null, newCompany);
    });
};

exports.updateCompany = (company, cb) => {
    const id = company._id;
 
    delete company._id;

    global.db.companies.update({'_id': mongojs.ObjectId(id)}, company, (err, companies) => {
        if (err)
            return cb(err);

        return cb(null, company);
    });
};