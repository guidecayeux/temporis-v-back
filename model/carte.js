const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaCreation = Joi.object().keys({
    name: Joi.string().required().label(`Le nom est obligatoire`)
});

const valider = (member) => {
    return Joi.validate(member, schemaCreation);
};

module.exports = {valider};
