const express = require('express');
const router = express.Router();

router.get('/Trapezoidal', (req, res) => {
    res.send('Get API');
});

router.post('/Trapezoidal', (req, res) => {
    console.log('Post to database')
      var a = parseFloat(req.body.a);
      var b = parseFloat(req.body.b);
      var n = parseFloat(req.body.n);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (Trapezoidal)"
    res.json({
      result: result
    })

});

module.exports = router;