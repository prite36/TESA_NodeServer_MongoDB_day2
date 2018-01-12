var express = require('express');
var router = express.Router();
var request = require('request');
var sensor = require("../controllers/SensorController.js");
var http = require('http');
var schema = require('../models/schema');
var db = require('../models/db');

router.get('/getDataSensor', function(req, res) {
  sensor.save(req, res)
});
router.get('/allTeamSensor/:start/:stop', function(req, res) {
  sensor.allTeamSensor(req, res)
});
router.get('/allTeamSensor/:start/:stop', function(req, res) {
  sensor.allTeamSensor(req, res)
});
router.post('/alert', function(req, res) {
    var schema = db.model('alert');
    var data = new schema(req.body);
  data.save(function(err, result) {
    if (err){
      console.log(err);
    } else {
      res.send('success')
    }
  });
})
module.exports = router;
