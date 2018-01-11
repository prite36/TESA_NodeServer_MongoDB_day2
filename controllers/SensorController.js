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
  schema.findOne({sensID: row.sensID, teamID: row.teamID}).exec(function (err, result) {
    if (err){
      console.log(err);
    } else {
      if (result == null) {
        data.save(function(err, result){
            if (err){
              console.log(err);
            } else {
              console.log('add Data');
            }
        });
      }
    }
  })

}
function find_from_db(table, start, stop){
    var schema = db.model(table);
    var query = { date: { $gte:'2018-01-11 ' + start + ':00', $lte:'2018-01-11 ' + stop + ':00',} }
    return new Promise(resolve => {
      schema.find(query,null,{sort: {sensID: 1}}).exec(function (err, result) {
          if (err){
            console.log(error);
          } else {
            resolve(result)
          }
      })
    })
}
// function find_from_db_Showweb(table){
//     var schema = db.model(table);
//     return new Promise(resolve => {
//       schema.find({}).exec(function (err, result) {
//           if (err){
//             console.log(error);
//           } else {
//             resolve(result)
//           }
//       })
//     })
// }
function checkData(data) {
  if (data.statusCode == '00') {
    return data.data
  } else {
    return 'no data'
  }
}
async function mixData(start, stop) {
  let data = {}
  let temperature = await find_from_db('temperature', start, stop)
  let accelerometer = await find_from_db('accelerometer', start, stop)
  let din1 = await find_from_db('din1', start, stop)
  data.temperature = temperature
  data.accelerometer = accelerometer
  data.din1 = din1
  return data
}
// async function mixDaTaweb(sensor) {
//   let data = {}
//   let datasensor = await find_from_db_Showweb(sensor)
//   data = datasensor
//   return data
// }

schemaController.save = function(req, res) {
  var teamNumber = [11,12,13,14,15,16,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,40,43,44,46,47,48,49,50,52,53,54,60,61]
  // var teamNumber = [5]
  teamNumber.forEach((number) => {
    request('http://10.0.0.10/api/temperature/'+number+'/all', function(error, response, body) {
      console.log('request temperature');
      try {
        if (!body.includes("502 Bad Gateway")) {
          let getdata = JSON.parse(body)
          if (getdata.statusCode === '00') {
            getdata.data.forEach((value) => {
              let data = {
                teamID: number,
                sensID: value.sensID,
                val: value.val,
                date: value.date
              }
              insert_to_db('temperature', data)
            })
          }
        } else {
          console.log('temperature Bad Gateway');
        }
      } catch (err) { console.error('includes error', err.message) }

    })
    request('http://10.0.0.10/api/accelerometer/'+number+'/all', function(error, response, body) {
      console.log('request accelerometer');
      try {
        if (!body.includes("502 Bad Gateway")) {
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
        } else {
          console.log('temperature Bad Gateway');
        }
      } catch (err) { console.error('includes error', err.message) }

    })
    request('http://10.0.0.10/api/din1/'+number+'/all', function(error, response, body) {
      console.log('request din1');
      try {
        if (!body.includes("502 Bad Gateway")) {
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
        } else {
          console.log('temperature Bad Gateway');
        }
      } catch (err) { console.error('includes error', err.message) }
    })

  })
}

schemaController.allTeamSensor = function(req, res) {
  let start = req.params.start.slice(0, 2) + ":" + req.params.start.slice(2)
  let stop = req.params.stop.slice(0, 2) + ":" + req.params.stop.slice(2)
  mixData(start, stop).then(value => {
    res.send(value)
  })
}
// schemaController.showtoweb = function(sensor) {
//   mixDaTaweb(sensor).then(value => {
//     return (value)
//   })
// }
module.exports = schemaController;
