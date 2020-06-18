const express = require('express')
const app = express();
var indexRoute= require('./api/index');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


mongoose.connect("mongodb://kumol:kumol254@ds231758.mlab.com:31758/demo",(err)=>{
    if(!err){
        console.log('Database connect successfully');
    }else{
        console.log(err);
    }
});

app.use("/uploads",express.static("uploads"));
app.use('/index',indexRoute);