const express = require('express');
const passport = require('passport');
const authController = express.Router();

authController.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

authController.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

authController.get('/auth/google/callback',
  passport.authenticate('google'), // complete the authenticate using the google strategy
  (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
    if (err) {
      console.log('ERROR', err)
     res.redirect('/auth/google'); // redirect them back to the login page
    } else {
     // Handle other errors here
    }
  },
  (req, res) => { // On success, redirect back to '/'
    res.redirect('/dashboard');
  }
);

authController.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authController;
