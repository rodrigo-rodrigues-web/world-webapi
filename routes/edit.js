var express = require('express');
var router = express.Router();

router.get('/:code', async (req, res, next) => {
    const code = req.params.code;
    
    try {
      const result = await global.db.selectCountry(code);
      res.render('new', { title: 'Edit a Country', result, action: '/edit/' + code });
    } catch (error) {
      res.redirect('/?error=' + error);
    }
    
  });
  
  router.post('/:code', async (req, res) => {
    const name = req.body.name;
    const code = req.params.code;
    const region = req.body.region;
    const population = parseInt(req.body.population);
    const HeadOfState = req.body.HeadOfState;
    // console.log('OBJECT ', {name, region, population, HeadOfState}.HeadOfState);
    try {
      await global.db.updateCountry(code, {name, region, population, HeadOfState});
      res.redirect('/?edit=true');
    } catch (error) {
      res.redirect('/?error=' + error);
    }
  });
  module.exports = router;