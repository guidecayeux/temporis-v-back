const Joi = require('@hapi/joi');
const {regexName} = require('./util');

const schemaCreation = Joi.object({
    name: Joi.string().pattern(regexName).required().label(`Le nom est obligatoire`)
});

const valider = (member) => {
    return schemaCreation.validate(member);
};

module.exports = {valider};
