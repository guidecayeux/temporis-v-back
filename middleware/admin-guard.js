const checkIsAdmin = (db) => {
  return function (req, res, next) {
    checkAuthorization(db, req.decoded)
      .then((value) => {
        if (value) {
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

const checkAuthorization = (db, jwtDecoded) => {
  return new Promise(async (resolve, reject) => {
    console.log('jwt', jwtDecoded);
    if (jwtDecoded && jwtDecoded.email) {
      resolve(true)
    } else {
      reject('utilisateur non connu');
    }
  });
};

module.exports = {
  checkIsAdmin: checkIsAdmin,
  checkAuthorization: checkAuthorization
};
