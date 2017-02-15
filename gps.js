var tessel = require('tessel');
var gpsLib = require('gps-a2235h');

var gps = gpsLib.use(tessel.port['B']);

gps.on('ready', function () {
  console.log('GPS module powered and ready. Waiting for satellites...');
  gps.on('coordinates', function (coords) {
    console.log('Lat:', coords.lat, '\tLon:', coords.lon, '\tTimestamp:', coords.timestamp);
  });

  gps.on('altitude', function (alt) {
    console.log('Got an altitude of', alt.alt, 'meters (timestamp: ' + alt.timestamp + ')');
  });

  gps.on('fix', function (data) {
    console.log(data.numSat, 'fixed.');
  });

  gps.on('dropped', function(){
    console.log("gps signal dropped");
  });
});

gps.on('error', function(err){
  console.log("got this error", err);
});