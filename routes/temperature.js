var express = require('express');
var router = express.Router();
var http = require('http')
var sensor = require("../controllers/SensorController.js");
var schema = require('../models/schema');
var db = require('../models/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('temperature',sensor.showtoweb('temperature'))
  var schema = db.model('temperature');
    schema.find({}).exec(function (err, result) {
        if (err){
          console.log(error);
        } else {
          // var data = JSON.stringify(result)
          res.render('temperature', {data:result})
        }
    })
});

module.exports = router;
