var express = require('express');
var router = express.Router();
var request = require('request');
var sensor = require("../controllers/SensorController.js");
var http = require('http');
router.get('/', function(req, res) {
  res.send('ssss')
});
router.get('/demo/:item', function(req, res) {
  res.send(valueDemo[req.params.item])
});
router.get('/test', function(req, res) {
  sensor.test(req, res)
});
router.get('/sensor', function(req, res) {
  res.render('../views/sensor/index')
});
router.get('/getDataSensor', function(req, res) {
  sensor.save(req, res)
});
router.get('/allTeamSensor/:start/:stop', function(req, res) {
  sensor.allTeamSensor(req, res)
});
module.exports = router;
