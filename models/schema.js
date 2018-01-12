var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alert = new Schema({
    teamID: {
        type: Number
    },
    description: {
        type: String
    }
});

var pressure = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var temperature = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var humidity = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var gyroscope = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val_x: {
        type: String
    },
    val_y: {
        type: String
    },
    val_z: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var accelerometer = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val_x: {
        type: String
    },
    val_y: {
        type: String
    },
    val_z: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var magnetometer = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val_x: {
        type: String
    },
    val_y: {
        type: String
    },
    val_z: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var leds = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var din = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

var allTeam = new Schema({
    teamID : Array
})

module.exports = mongoose.model('pressure', pressure);
module.exports = mongoose.model('temperature', temperature);
module.exports = mongoose.model('humidity', humidity);
module.exports = mongoose.model('gyroscope', gyroscope);
module.exports = mongoose.model('accelerometer', accelerometer);
module.exports = mongoose.model('magnetometer', magnetometer);
module.exports = mongoose.model('leds', leds);
module.exports = mongoose.model('din1', din);
module.exports = mongoose.model('din2', din);
module.exports = mongoose.model('din3', din);
module.exports = mongoose.model('din4', din);
module.exports = mongoose.model('din5', din);
module.exports = mongoose.model('allTeam', allTeam);
module.exports = mongoose.model('alert', alert);
