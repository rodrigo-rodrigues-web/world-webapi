var express = require('express');
var router = express.Router();

/* GET new page. */
router.get('/', async (req, res, next) => {
    res.render('new', {title: 'Register', result: {}, action: '/new/'});
    
  });

router.post('/', async (req, res) => {
let country = req.body;

    if(!parseInt(country.Population)) {
    res.send("Population must be a number");
    return
    }
    try {
    const result = await global.db.insertCountry(country);
    res.redirect('/?new=true');

    } catch (error) {
    res.status(500).json({error:error.message});
    }
});

module.exports = router;