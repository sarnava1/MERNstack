const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile');

//Load users model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg : 'profiles test'}));

const errors = {};

router.get('/', passport.authenticate('jwt', {session : false}), (req, res) => {
    Profile.findOne( { user: req.user.id })
      .then(profile => {
         if(!profile) {
             errors.noprofile = 'There is no profile for this user';
             return res.status(404).json(errors);
         }
         res.json(profile);

      })
      .catch(err => res.status(404).json(err));
});

module.exports = router;
