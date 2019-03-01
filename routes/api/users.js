const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys =  require('../../config/keys');

const User = require('../../models/User');

//TEST ROUTE
router.get('/test', (req, res) => res.json({ msg : 'users test'}));

//REGISTER ROUTE
router.post('/register', (req, res) => {
      
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        
        return res.status(400).json({ email: 'Email already exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => { 
            //if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
  });
  
router.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   //Find user by email
   User.findOne({email})
     .then(user => {
        //check for user
        if(!user){
          return res.status(404).json({email: 'User not found'});

        }

        //Check password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
             if(isMatch){
                //User Matched

                //Create the payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar
                }

                //Sign token
                jwt.sign(payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer' + token
                  });
                });
                
                //res.json({msg: 'Success'});

             } else{
                return res.status(400).json({password: 'Password Incorrect'});
             }
          })
     });

});
 

module.exports = router;
