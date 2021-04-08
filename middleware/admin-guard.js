const axios = require("axios");

// whitelist = ['wiig0', 'Zrewak'];
whitelist = process.env.WHITELIST;
const checkWhiteList = (db) => {
  return function (req, res, next) {
    checkTwitchAuth(db, req)
      .then((value) => {
        if (whitelist && whitelist.includes(value.data.login)) {
          next();
        } else {
          res.status(401).send({
            message: `L'utilisateur n'est pas habilité à faire cette opération`,
            error: null
          });
        }
      })
      .catch((err) => {
        console.log('error lors du check authorization', err);
        res.status(401).send({
          message: `Opération invalide`,
          error: err,
        });
      });
  }
};

const checkTwitchAuth = (db, req) => {
  return new Promise(async (resolve, reject) => {
    await axios.get('https://id.twitch.tv/oauth2/validate', {
      headers: {
        'authorization': req.headers.authorization
      }
    }).then(response => {
      resolve(response);
    }).catch((err) => {
      console.log('error ',  err);
      reject('Token non valid');
    })
  });
};

module.exports = {
  checkWhiteList: checkWhiteList,
  checkTwitchAuth: checkTwitchAuth
};
