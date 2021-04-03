const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaCreation = Joi.object().keys({
    idObjet: Joi.number().required().label(`L'id de l'objet est obligatoire`),
    idCarte1: Joi.number().required().label(`L'id de la carte 1 est obligatoire`),
    idCarte2: Joi.number().required().label(`L'id de la carte 2 est obligatoire`),
    idCarte3: Joi.number().required().label(`L'id de la carte 3 est obligatoire`),
    idCarte4: Joi.number().required().label(`L'id de la carte 4 est obligatoire`),
    idCarte5: Joi.number().required().label(`L'id de la carte 5 est obligatoire`),
});

const valider = (member) => {
    return Joi.validate(member, schemaCreation);
};

module.exports = {valider};
