const express = require('express');
const {valider} = require('../model/carte');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const db = require('../db')
const {sanitizeString} = require('../model/util');

const router = express.Router();


router.get('/liste', async (req, res, next) => {
    db.query('SELECT * FROM carte', undefined , (err, response) => {
        if (err) {
            return next(err);
        }
        res.status(200).send(response.rows);
    })
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const carte = req.body;
        try {
            db.query('INSERT INTO carte(name) ' +
                'VALUES ($1) RETURNING id, name', [sanitizeString(carte.name)] , (err, response) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(response.rows[0]);
            })
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
