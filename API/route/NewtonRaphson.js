const express = require('express');
const router = express.Router();

router.get('/NewtonRaphson', (req, res) => {
    res.send('Get API');
});

router.post('/NewtonRaphson', (req, res) => {
    console.log('Post to database')
      var xl = parseFloat(req.body.xl);
      var equation = req.body.equation;
      const result = "POST TO DATABSE (NewtonRaphson)"
    res.json({
      result: result
    })

});

module.exports = router;