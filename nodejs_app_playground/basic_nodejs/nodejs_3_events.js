'use strict'

var events = require('events')

var eventEmitter = new events.EventEmitter()

/**
 * Events Module, EventEmitter Object
 */
// Create an event handler:
var myEventHandler = () => {
  console.log('I hear a scream!')
}

// Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler)

// Fire the 'scream' event:
eventEmitter.emit('scream')




var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('tested_file.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
