var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const results = await global.db.selectCountries();
    res.render('index', {results, title: 'World Dataset'})
  } catch (error) {
    res.status(500).json({error:error.message});
  }
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
    const result = await global.db.deleteCountry(code);
    
    if(result[0].affectedRows){
      res.json({message: `Country ${code} has been excluded successfully`});
    }
    else{
      res.status(404).json({message: "Country not registered"});
    }

  } catch (error) {
    res.status(500).json({error:error.message});
  }
});
module.exports = router;
