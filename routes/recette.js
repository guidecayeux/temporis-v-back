const express = require('express');
const {valider} = require('../model/recette');
const jwt = require('../middleware/jwt');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const recettes = require('../mock/recettes.json')

const router = express.Router();


router.get('/recettes', async (req, res, next) => {
    // await db.collection('members').find({}).toArray((err, members) => {
    //     if (err) {
    //         next(err);
    //     } else {
    //         members.forEach((member) => {
    //             sanitize(member);
    //         });
    //         res.status(200).send(members);
    //     }
    // });
    res.status(200).send(recettes);
});

router.post('/recette', jwt.checkToken, adminGuard.checkIsAdmin('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const recette = req.body;
        try {
            // await security.encrypt(member.password, (err, hash) => {
            //     member.password = hash;
            //     db.collection('members').insertOne(member, (err) => {
            //         if (err) {
            //             next(err);
            //         } else {
            //             res.status(200).send();
            //         }
            //     });
            // });
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
