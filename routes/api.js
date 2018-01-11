var express = require('express');
var router = express.Router();
var request = require('request');
var sensor = require("../controllers/SensorController.js");
var valueDemo = require("./value.js");
var http = require('http');
router.get('/', function(req, res) {
  res.send('ssss')
});
router.get('/demo/:item', function(req, res) {
  res.send(valueDemo[req.params.item])
});
router.get('/sensor', function(req, res) {
  res.render('../views/sensor/index')
});
router.get('/getDataSensor/:id', function(req, res) {
  sensor.save(req, res)

});

module.exports = router;
