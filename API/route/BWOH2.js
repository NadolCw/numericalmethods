const express = require('express');
const router = express.Router();

router.get('/BWOH2', (req, res) => {
    res.send('Get API');
});

router.post('/BWOH2', (req, res) => {
    console.log('Post to database')
      var x = parseFloat(req.body.x);
      var h = parseFloat(req.body.h);
      var n = parseFloat(req.body.n);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (BWOH2)"
    res.json({
      result: result
    })

});

module.exports = router;