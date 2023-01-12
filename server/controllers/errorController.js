const errorController = (err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    err.message = "User is already registered";
    err.status = 403;
  }
  res.status(err.status || 500);
  res.send({ success: false, message: err.message });
};

module.exports = errorController;
