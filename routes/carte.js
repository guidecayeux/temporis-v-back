const express = require('express');
const {valider} = require('../model/carte');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');
const cartes = require('../mock/cartes.json')

const router = express.Router();


router.get('/liste', async (req, res, next) => {
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
    res.status(200).send(cartes);
});

router.post('/add', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
    const result = valider(req.body);
    if (result.error === null) {
        const carte = req.body;
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
            res.status(200).send(carte);
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
