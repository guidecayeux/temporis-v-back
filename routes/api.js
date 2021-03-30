var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/version', function(req, res, next) {
  res.send({
    "version": "v1"
  });
});

module.exports = router;
