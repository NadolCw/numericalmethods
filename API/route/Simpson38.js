const express = require('express');
const router = express.Router();

router.get('/Simpson38', (req, res) => {
    res.send('Get API');
});

router.post('/Simpson38', (req, res) => {
    console.log('Post to database')
        var a = parseFloat(req.body.a);
        var b = parseFloat(req.body.b);
        var n = parseFloat(req.body.n);
        var equation = req.body.equation;
      const result = "POST TO DATABSE (Simpson3/8)"
    res.json({
      result: result
    })

});

module.exports = router;