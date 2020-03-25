const express = require('express');
const router = express.Router();

router.get('/Secant', (req, res) => {
    res.send('Get API');
});

router.post('/Secant', (req, res) => {
    console.log('Post to database')
      var x0 = parseFloat(req.body.x0);
      var x1 = parseFloat(req.body.x1);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (Secant)"
    res.json({
      result: result
    })

});

module.exports = router;