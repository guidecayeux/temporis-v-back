const express = require('express');
const {valider, validerRecherche} = require('../model/recette');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const db = require('../db')
const {buildCarteList} = require("../model/util");

const router = express.Router();

let query = '';

router.post('/liste', async (req, res, next) => {
    const result = validerRecherche(req.body);
    if (result.error === null) {
        query = `SELECT objet.id, objet.name, objet.img, objet.type, objet.lvl, string_agg(c1.name || ';' || c2.name || ';' || c3.name || ';' || c4.name || ';' || c5.name, ', ') FROM recette
           INNER JOIN objet
                      ON objet.id = recette.id_objet
           INNER JOIN carte c1
                      ON c1.id = recette.id_carte1
           INNER JOIN carte c2
                      ON c2.id = recette.id_carte2
           INNER JOIN carte c3
                      ON c3.id = recette.id_carte3
           INNER JOIN carte c4
                      ON c4.id = recette.id_carte4
           INNER JOIN carte c5
                      ON c5.id = recette.id_carte5 `
        req.body.idCartes.forEach((id, index) => {
            if (index === 0) {
                query += `WHERE (id_carte1 = ${id} OR id_carte2 = ${id} OR id_carte3 = ${id} OR id_carte4 = ${id} OR id_carte5 = ${id}) `
            } else {
                query += `AND (id_carte1 = ${id} OR id_carte2 = ${id} OR id_carte3 = ${id} OR id_carte4 = ${id} OR id_carte5 = ${id}) `
            }
        })
        query += `GROUP BY objet.id;`
        db.query(query, undefined , (err, response) => {
            if (err) {
                return next(err);
            }
            buildCarteList(response.rows)
            res.status(200).send(response.rows);
        })
    } else {
        res.status(400).send({
            message: `La liste d'id n'est pas bonne`,
            error: result.error
        });
    }
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const recette = req.body;
        try {
            db.query('INSERT INTO recette(id_objet, id_carte1, id_carte2, id_carte3, id_carte4, id_carte5)  ' +
                'VALUES ($1, $2, $3, $4, $5, $6)', [recette.idObjet, recette.idCarte1, recette.idCarte2, recette.idCarte3, recette.idCarte4, recette.idCarte5] , (err, response) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(recette);
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
