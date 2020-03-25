const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors());

//routes
app.get('/',(req, res) => {

});

const Bisection = require('./route/Bisection')
const FalsePosition = require('./route/FalsePosition')
const OnePoint = require('./route/OnePoint')
const NewtonRaphson = require('./route/NewtonRaphson')
const Secant = require('./route/Secant')
const Trapezoidal = require('./route/Trapezoidal')
const Simpson13 = require('./route/Simpson13')
const Simpson38 = require('./route/Simpson38')
const FWOH = require('./route/FWOH')
const BWOH = require('./route/BWOH')
const OH2 = require('./route/OH2')
const OH4 = require('./route/OH4')
const FWOH2 = require('./route/FWOH2')
const BWOH2 = require('./route/BWOH2')



app.use('/Bisection',Bisection);
app.use('/FalsePosition',FalsePosition);
app.use('/OnePoint',OnePoint);
app.use('/NewtonRaphson',NewtonRaphson);
app.use('/Secant',Secant);
app.use('/Trapezoidal',Trapezoidal);
app.use('/Simpson13',Simpson13);
app.use('/Simpson38',Simpson38);
app.use('/FWOH',FWOH);
app.use('/BWOH',BWOH);
app.use('/OH2',OH2);
app.use('/OH4',OH4);
app.use('/FWOH2',FWOH2);
app.use('/BWOH2',BWOH2);

mongoose.connect('mongodb+srv://Thanadol:@iEiy5hG@cKxV2a@cluster0-hkj5t.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('Connected Database')

app.listen(8000);