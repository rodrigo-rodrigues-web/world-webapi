var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!', title: 'Login' });
    else
        res.render('login', { message: null , title: 'Login'});
  });
  
  /* POST login page */
  router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
  );
  

module.exports = router;