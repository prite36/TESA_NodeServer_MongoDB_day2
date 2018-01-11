var mongoose = require("mongoose");
var request = require('request');
var http = require('http');
var schema = require('../models/schema');
var db = require('../models/db');
var schemaController = {};
// Show list of employees

function insert_to_db(table, row){
    var schema = db.model(table);
    var data = new schema(row);
    data.save(function(err, result){
        if (err) throw(err);
    });
}

schemaController.save = function(req, res) {
  var agent = new http.Agent({
        host: 'localhost',
        port: '3000',
        path: '/',
        rejectUnauthorized: false
    });
  var options = ({
        method: 'GET',
        agent: agent,
        header: { 'Content-Type': 'aaplication/json'}
    });
  // request('http://10.0.0.10/api/temperature/5/all', function(error, response, body) {
  options.url = 'http://localhost:3000/api/demo/temperature'
  request(options, function(error, response, body) {
  var getdata = JSON.parse(body).data
    getdata.forEach((value) => {
      var data = {
        teamID: req.params.id,
        sensID: value.sensID,
        val: value.val,
        date: value.date
      }
      insert_to_db('temperature', data);
    })
  })
  options.url = 'http://localhost:3000/api/demo/accelerometer'
  request(options, function(error, response, body) {
  var getdata = JSON.parse(body).data
    getdata.forEach((value) => {
      var data = {
        teamID: req.params.id,
        sensID: value.sensID,
        val_x: value.val_x,
        val_y: value.val_y,
        val_z: value.val_z,
        date: value.date
      }
      insert_to_db('accelerometer', data);
    })
  })
}
module.exports = schemaController;
