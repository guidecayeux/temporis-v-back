const express = require('express');
const adminGuard = require('../middleware/admin-guard');
const router = express.Router();
const db = require('../db')


router.get('/liste', adminGuard.checkWhiteList(), async (req, res, next) => {
    db.query(`SELECT * FROM logs`, (err, response) => {
        if (err) {
            if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                console.log('Erreur lors de la récupération des logs', err);
            }
            return next(err);
        }
        res.status(200).send(response.rows);
    })
});

module.exports = router;
