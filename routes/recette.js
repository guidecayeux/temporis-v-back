const express = require('express');
const {valider} = require('../model/recette');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const recettes = require('../mock/recettes.json')

const router = express.Router();


router.get('/liste', async (req, res, next) => {

    res.status(200).send(recettes);
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const recette = req.body;
        try {
            res.status(200).send(recette);
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
