const express = require('express');
const router = express.Router();
const objetRouter = require('./objet');
const carteRouter = require('./carte');
const recetteRouter = require('./recette');

router.use('/objets', objetRouter);
router.use('/cartes', carteRouter);
router.use('/recettes', recetteRouter);

/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send({
    "version": "v1"
  });
});

module.exports = router;
