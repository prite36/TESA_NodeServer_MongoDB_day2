var express = require('express');
var router = express.Router();
var sensor = require("../controllers/SensorController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  // sensor.save(req, res)
  res.render('index')
});

module.exports = router;
