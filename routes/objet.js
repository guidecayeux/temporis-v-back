const express = require('express');
const {valider} = require('../model/objet');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const objets = require('../mock/objets.json')

const router = express.Router();


router.get('/autocomplete/:query', async (req, res, next) => {
    console.log('autocomplete objet', req.params.query);
    res.status(200).send(objets.slice(0, 100));
});

router.get('/search/:id', async (req, res, next) => {
    console.log('get on objet', req.params.id);
    res.status(200).send(objets[req.params.id]);
});

router.get('/liste', async (req, res, next) => {
    res.status(200).send(objets);
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const objet = req.body;
        objet.url = "TODO"
        try {
            res.status(200).send(objet);
        } catch (e) {
            next(e);
        }
    } else {
        res.status(400).send({
            message: 'Le formulaire contient des erreurs',
            error: result.error
        });
    }
});

module.exports = router;
