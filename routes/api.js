const express = require('express');
const router = express.Router();
const objetRouter = require('./objet');
const carteRouter = require('./carte');
const recetteRouter = require('./recette');
const adminGuard = require('../middleware/admin-guard');
const history = require('../middleware/history');

router.use('/objets', objetRouter);
router.use('/cartes', carteRouter);
router.use('/recettes', recetteRouter);

/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send({
    "version": "v1"
  });
});

router.get('/authorization', adminGuard.checkWhiteList('db'), history.saveInHistory('Créer utilisateur', 'db'), async (req, res, next) => {
  res.status(204).send();

})

module.exports = router;
