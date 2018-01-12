var express = require('express');
var router = express.Router();
var sensor = require("../controllers/SensorController.js");
var schema = require('../models/schema');
var db = require('../models/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  // sensor.save(req, res)
  var schema = db.model('alert');
    schema.find({}).exec(function (err, result) {
        if (err){
          console.log(error);
        } else {
          res.render('index',{data:result})
        }
    })
});

module.exports = router;
