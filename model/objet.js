const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaCreation = Joi.object().keys({
    name: Joi.string().required().label(`Le nom est obligatoire`),
    lvl: Joi.number().required().label(`Le lvl est obligatoire`),
    type: Joi.string().required()
        .valid(
            'Arme',
            'Amulette',
            'Anneau',
            'Bottes',
            'Bouclier',
            'Cape',
            'Ceinture',
            'Chapeau',
            'Dofus',
            'Sac à dos',
            'Trophée',
            'Idole',
            'Consommable',
            'Level Up',
            'Autre').required().label(`Le type est obligatoire et doit faire parti de la liste valide`),
    img: Joi.string()
});

const valider = (member) => {
    return Joi.validate(member, schemaCreation);
};

module.exports = {valider};
