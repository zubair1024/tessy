var tessel = require('tessel');
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
  console.log('Connected to climate module');

  setImmediate(function loop() {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        let c = (5 / 9) * (temp - 32);
        console.log('Degrees:', c.toFixed(4) + 'C', 'Humidity:', humid.toFixed(4) + '%RH');
        setTimeout(loop, 300);
      });
    });
  });
});

climate.on('error', function (err) {
  console.log('error connecting module', err);
});