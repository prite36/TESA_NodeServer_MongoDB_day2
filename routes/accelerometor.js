var express = require('express');
var router = express.Router();
var http = require('http')
var sensor = require("../controllers/SensorController.js");
var schema = require('../models/schema');
var db = require('../models/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('accelerometer',sensor.showtoweb('accelerometer'))
  var schema = db.model('accelerometer');
    schema.find({}).exec(function (err, result) {
        if (err){
          console.log(error);
        } else {
          res.render('accelerometer',{data:result})
        }
    })
});

module.exports = router;
