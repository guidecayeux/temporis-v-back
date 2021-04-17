const db = require('../db')
const {CREATE} = require("../model/util");

const saveInHistory = (action) => {
  return function (req, res, next) {
      if (req.userLogin) {
          let msg = '';

          switch (action) {
              case CREATE.OBJET:
                  msg += `Création de l'objet ¤${req.body && req.body.name ? req.body.name : '{NOM INCONNU}'}¤`;
                  break;
              case CREATE.CARTE:
                  msg += `Création de la carte ¤${req.body && req.body.name ? req.body.name : '{NOM INCONNU}'}¤`;
                  break;
              case CREATE.RECETTE:
                  if (!req.body) {
                      msg += 'Création de la recette ¤{RECETTE INCONNU}¤';
                  } else {
                      msg += `Création de la recette ¤objet ${req.body.idObjet} et cartes ${req.body.idCarte1} + ${req.body.idCarte2} + ${req.body.idCarte3} + ${req.body.idCarte4} + ${req.body.idCarte5}¤`;
                  }
                  break;
          }

          msg += ` par ¤${req.userLogin}¤ le ¤${new Date().getTime()}¤.`

          db.query('INSERT INTO logs(log) ' +
              'VALUES ($1)', [msg] , (err) => {
              if (err && (process.env.LOG_LVL === 'DEBUG' || process.env.LOG_LVL === 'ERROR')) {
                  console.log('error lors du check authorization', err);
              }
              next()
          })
      } else {
          next();
      }
  }
};

module.exports = {
  saveInHistory: saveInHistory
};
