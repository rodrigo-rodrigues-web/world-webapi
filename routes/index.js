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
    res.status(500).json({error:error.message});
  }
});

router.get('/api/country/:code', async (req, res) => {
  const code = req.params.code;
  
  try {
    const results = await global.db.selectCountry(code);
    res.json(results);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

router.post('/api/country', async (req, res) => {
  
  const body = req.body;
  try {
    const results = await global.db.insertCountry(body);
    res.json(results);

  } catch (error) {
    res.status(500).json({error:error.message});
  }
  
});

router.patch('/api/country/:code', async (req, res) => {
  const code = req.params.code;
  const country = {};

  if(req.body.hasOwnProperty("name")) country.name = req.body.name;
  if(req.body.hasOwnProperty("Region")) country.Region = req.body.Region;
  if(req.body.hasOwnProperty("Population")) country.Population = req.body.Population;
  if(req.body.hasOwnProperty("HeadOfState")) country.HeadOfState = req.body.HeadOfState;

  try {
    await global.db.updateCountry(code, country);
    res.json({message: 'Cliente atualizado com sucesso!'});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:error});
  }
});

router.delete('/api/country/:code', async (req, res) => {
  const code = req.params.code;
  try {
    await global.db.deleteCountry(code);

    res.json({message: `Country ${code} has been excluded successfully`});

  } catch (error) {
    res.status(500).json({error:error.message});
  }
});
module.exports = router;
