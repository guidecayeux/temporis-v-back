const express = require('express');
const {valider} = require('../model/objet');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const { check } = require('express-validator');
const db = require('../db')
const {buildCarteList, CREATE} = require("../model/util");

const router = express.Router();


router.get('/autocomplete/:query', check(), async (req, res, next) => {
    db.query(`SELECT * FROM objet WHERE UPPER(name) LIKE '%' || UPPER($1) || '%'`, [req.params.query], (err, response) => {
        if (err) {
            if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                console.log(`Erreur lors de l'autocomplete objet`, req.params, err);
            }
            return next(err);
        }
        res.status(200).send(response.rows);
    })
});

router.get('/search/:id', async (req, res, next) => {
    db.query(`SELECT objet.id, objet.name, objet.img, objet.type, objet.lvl, string_agg(c1.name || ';' || c2.name || ';' || c3.name || ';' || c4.name || ';' || c5.name, ', ') FROM objet
                    LEFT OUTER JOIN recette
                                    ON objet.id = recette.id_objet
                    LEFT OUTER JOIN carte c1
                                    ON c1.id = recette.id_carte1
                    LEFT OUTER JOIN carte c2
                                    ON c2.id = recette.id_carte2
                    LEFT OUTER JOIN carte c3
                                    ON c3.id = recette.id_carte3
                    LEFT OUTER JOIN carte c4
                                    ON c4.id = recette.id_carte4
                    LEFT OUTER JOIN carte c5
                                    ON c5.id = recette.id_carte5
              WHERE objet.id = $1
                    GROUP BY objet.id`, [req.params.id], (err, response) => {
        if (err) {
            if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                console.log(`Erreur lors de la recherche d'un objet`, req.params, err);
            }
            return next(err);
        }
        buildCarteList(response.rows)
        res.status(200).send(response.rows);
    })
});

router.get('/liste', async (req, res, next) => {
    db.query(`SELECT objet.id, objet.name, objet.type, objet.lvl FROM objet 
                    INNER JOIN recette
                    ON objet.id = recette.id_objet
                    GROUP BY objet.id`, undefined , (err, response) => {
        if (err) {
            if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                console.log(`Erreur lors de la récupération des objets`, err);
            }
            return next(err);
        }
        res.status(200).send(response.rows);
    })
});

router.post('/add', adminGuard.checkWhiteList(), history.saveInHistory(CREATE.OBJET), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error) {
        if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
            console.log(`Le formulaire d'ajout d'objet contient des erreurs`, req.body, result.error);
        }
        res.status(400).send({
            message: 'Le formulaire contient des erreurs',
            error: result.error
        });
    } else {
        const objet = result.value;
        objet.url = "TODO"
        try {
            db.query('INSERT INTO objet(name, img, type, lvl) ' +
                'VALUES ($1, $2, $3, $4) RETURNING id, name, type, lvl', [objet.name, objet.img, objet.type, objet.lvl] , (err, response) => {
                if (err) {
                    if (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR') {
                        console.log(`Erreur lors de l'ajout d'un objet`, req.body, err);
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
