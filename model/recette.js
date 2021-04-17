const Joi = require('@hapi/joi');

const schemaCreation = Joi.object({
    idObjet: Joi.number().required().label(`L'id de l'objet est obligatoire`),
    nameObjet: Joi.string(),
    idCarte1: Joi.number().required().label(`L'id de la carte 1 est obligatoire`),
    nameCarte1: Joi.string(),
    idCarte2: Joi.number().required().label(`L'id de la carte 2 est obligatoire`),
    nameCarte2: Joi.string(),
    idCarte3: Joi.number().required().label(`L'id de la carte 3 est obligatoire`),
    nameCarte3: Joi.string(),
    idCarte4: Joi.number().required().label(`L'id de la carte 4 est obligatoire`),
    nameCarte4: Joi.string(),
    idCarte5: Joi.number().required().label(`L'id de la carte 5 est obligatoire`),
    nameCarte5: Joi.string(),
});

const schemaRecherche = Joi.object({
    idCartes:Joi.array().min(1).max(5).items(Joi.number())
});

const valider = (member) => {
    return schemaCreation.validate(member);
};
const validerRecherche = (body) => {
    return schemaRecherche.validate(body);
};

module.exports = {valider, validerRecherche};
