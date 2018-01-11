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
        if (err){
          console.log(error);
        } else {
          console.log('Pass');
        }
    });
}
function checkData(data) {
  if (data.statusCode == '00') {
    return data.data
  } else {
    return 'no data'
  }
}
schemaController.save = function(req, res) {
  var teamNumber = [11,12,13,14,15,16,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,40,43,44,46,47,48,49,50,52,53,54,60,61]
  var allTeam = {}
  allTeam.data = {}
  teamNumber.forEach((number) => {
    allTeam.data['team'+number] = {}
    request('http://10.0.0.10/api/temperature/'+number+'/all', function(error, response, body) {
      var data = JSON.parse(body);
        allTeam.data['team'+number].temp = checkData(data)
      request('http://10.0.0.10/api/accelerometer/'+number+'/all', function(error, response, body) {
        var data = JSON.parse(body);
        allTeam.data['team'+number].accelerometer = checkData(data)
        request('http://10.0.0.10/api/din1/'+number+'/all', function(error, response, body) {
          var data = JSON.parse(body);
          allTeam.data['team'+number].din1 = checkData(data)
          if (teamNumber[teamNumber.length-1] === number) {
          // insert_to_db('allTeam', allTeam)
          res.send(allTeam)
          }
        })
      })
    })
  })
}
module.exports = schemaController;
