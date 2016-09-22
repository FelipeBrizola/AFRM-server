'use strict';

    const mongojs =  require('mongojs');

exports.getCompanies = (cb) => {
    global.db.companies.find((err, companies) => {
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