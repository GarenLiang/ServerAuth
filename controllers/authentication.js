const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }
  //See user exist or not
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }
    // if exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    //if not exist,create a new
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ success: true });
    });
  });
}
