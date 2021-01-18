var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:  'Web Api working!'});
});

/* GET Countries page. */
router.get('/api/countries', async (req, res) => {
  try {
    const results = await global.db.selectCountries();
    res.json(results);
  } catch (error) {
    res.status(500).json({error:error});
  }
});
module.exports = router;
