const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Username check went bad.' });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const aNewUser = new User({
      username: username,
      password: hashPass,
    });
    aNewUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Saving user to database went wrong.' });
        return;
      }
      res.status(200).json(aNewUser);
    });
  });
});
router.post('/login', (req, res) => {
  const {username, password} = req.body
console.log(req.body.username)
if (!username || !password) {
  res.render('auth/login', {
    errorMessage: 'Please enter both username and password'
  });
  return;
}

User.findOne({'username': username})
  .then((user) => {
    
   /* if(!user) {
      res.render('auth/login', {
        errorMessage: 'Invalid Login'
      })
    User doesn't exist on database
    
    }*/

    if (bcrypt.compareSync(password, user.password)) {
      //Logged in sucess
      //console.log('aqui', user)
      req.session.currentUser = user; //set user to the session!
      req.app.locals.loggedUser = req.session.currentUser;
      console.log(req.session.currentUser);
      res.json(user);
     //res.render('index', {user})
    } else {
      //Passwords don't match
      res.render('auth/login', {
        errorMessage: 'Invalid login'
      });
    }


  });

});

router.post('/logout', (req, res) => {
  req.logOut();
  res.status(200).json({ message: 'Log out success!' });
});
router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
    return;
  }
  res.json({ message: 'No user is looged in' });
});


module.exports = router;






