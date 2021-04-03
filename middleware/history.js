
const saveInHistory = (action, db) => {
  return async function (req, res, next) {
    getUserFromToken(db, req.decoded)
      .then((user) => {
        const userInHistory = Object.assign({}, user);
        const bodyInHistory = Object.assign({}, req.body);
        // db.collection('history')
        //   .insertOne({
        //     action,
        //     user: userInHistory,
        //     date: new Date(),
        //     context: {
        //       params: req.params,
        //       body: bodyInHistory,
        //     }
        //   }, () => {
        //   });
          next();
      })
      .catch(() => next());

  }
};

const getUserFromToken = (db, jwtDecoded) => {
  return new Promise(async (resolve, reject) => {
    // if (jwtDecoded && jwtDecoded.email) {
    //   await db.collection('members').findOne({ email: jwtDecoded.email }, (err, m) => {
    //     if (!err) {
    //       resolve(m);
    //     } else {
    //       reject(err);
    //     }
    //   });
    // } else {
    //   reject();
    // }
      resolve({})
  });
};

module.exports = {
  saveInHistory: saveInHistory
};
