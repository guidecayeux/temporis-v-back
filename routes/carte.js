const express = require('express');
const {valider} = require('../model/carte');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const db = require('../db')
const {sanitizeString, CREATE} = require('../model/util');

const router = express.Router();


router.get('/liste', async (req, res, next) => {
    db.query('SELECT * FROM carte ORDER BY name', undefined , (err, response) => {
        if (err) {
            if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                console.log('Erreur lors de la récupération des cartes', err);
            }
            return next(err);
        }
        res.status(200).send(response.rows);
    })
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory(CREATE.CARTE), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error) {
        if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
            console.log(`Le formulaire d'ajout de carte contient des erreurs`, req.body, result.error);
        }
        res.status(400).send({
            message: 'Le formulaire contient des erreurs',
            error: result.error
        });
    } else {
        const carte = result.value;
        try {
            db.query('INSERT INTO carte(name) ' +
                'VALUES ($1) RETURNING id, name', [sanitizeString(carte.name)] , (err, response) => {
                if (err) {
                    if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                        console.log(`Erreur lors de l'ajout d'une carte`, req.body, err);
                    }
                    return next(err);
                }
                res.status(200).send(response.rows[0]);
            })
        } catch (e) {
            next(e);
        }
    }
});

module.exports = router;
