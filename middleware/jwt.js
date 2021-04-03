let checkToken = (req, res, next) => {
  if (false) {
    return res.status(401).send({
      message: 'Le token est invalide'
    });
  } else {
    req.decoded = {email: true};
    next();
  }
};

module.exports = {
  checkToken: checkToken
};
