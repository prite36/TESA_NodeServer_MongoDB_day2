var express = require('express');
var router = express.Router();
var request = require('request');
var sensor = require("../controllers/SensorController.js");
var http = require('http');
router.get('/getDataSensor', function(req, res) {
  sensor.save(req, res)
});
router.get('/allTeamSensor/:start/:stop', function(req, res) {
  sensor.allTeamSensor(req, res)
});
module.exports = router;
