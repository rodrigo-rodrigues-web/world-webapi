var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
//  const { route } = require('./users');
const SECRET = 'Welcome1234';
const passport = require('passport');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const results = await global.db.selectCountries();
    res.render('index', {results, title: 'World Dataset'})
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

router.get('/delete/:code', async (req, res) => {
  const code = req.params.code;
  try {
    await global.db.deleteCountry(code);
    res.redirect('/?delete=true');
  } catch (error) {
    res.redirect('/?error=' + error);
  }
});

module.exports = router;