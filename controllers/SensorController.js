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
function find_from_db(table){
    var schema = db.model(table);
    return new Promise(resolve => {
      schema.find({}).exec(function (err, result) {
          if (err){
            console.log(error);
          } else {
            resolve(result)
          }
      })
    })
}
function checkData(data) {
  if (data.statusCode == '00') {
    return data.data
  } else {
    return 'no data'
  }
}
async function mixData() {
  let data = {}
  let temperature = await find_from_db('temperature')
  let accelerometer = await find_from_db('accelerometer')
  let din1 = await find_from_db('din1')
  data.temperature = temperature
  data.accelerometer = accelerometer
  data.din1 = din1
  return data
}
schemaController.save = function(req, res) {
  var teamNumber = [11,12,13,14,15,16,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,40,43,44,46,47,48,49,50,52,53,54,60,61]
  // var teamNumber = [5]
  teamNumber.forEach((number) => {
    console.log(number);
    request('http://10.0.0.10/api/temperature/'+number+'/all', function(error, response, body) {
      let getdata = JSON.parse(body)
      if (getdata.statusCode === '00') {
        getdata.data.forEach((value) => {
          let data = {
            teamID: number,
            sensID: value.sensID,
            val: value.val,
            date: value.date
          }
          console.log(data)
          insert_to_db('temperature', data)
        })
      }
    })
    request('http://10.0.0.10/api/accelerometer/'+number+'/all', function(error, response, body) {
      let getdata = JSON.parse(body)
      if (getdata.statusCode === '00') {
        getdata.data.forEach((value) => {
          var data = {
            teamID: number,
            sensID: value.sensID,
            val_x: value.val_x,
            val_y: value.val_y,
            val_z: value.val_z,
            date: value.date
          }
          insert_to_db('accelerometer', data)
        })
      }
    })
    request('http://10.0.0.10/api/din1/'+number+'/all', function(error, response, body) {
      let getdata = JSON.parse(body)
      if (getdata.statusCode === '00') {
        getdata.data.forEach((value) => {
          var data = {
            teamID: number,
            sensID: value.sensID,
            val: value.val,
            date: value.date
          }
          insert_to_db('din1', data)
        })
      }
    })

  })
}

schemaController.allTeamSensor = function(req, res) {
  mixData().then(value => {
    res.send(value)
  })

}
module.exports = schemaController;
