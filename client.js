var net = require('net');

var client = new net.Socket();
  // setInterval(function () {
     client.connect(6101, '138.68.78.117', function () {
        console.log('Connected');
        setInterval(function () {
            client.write('$CANP 21 353161076760316,06:30:52,15.12.2016,25.0894530,55.1504929,1,160.45,0,704660,178.0,27.014,4.152,1,0,2.8,7,54,1501,50,131,407,235,51,9601EB00FFFF3800,9701EA00FFFF3C00,9801EB00FFFF2500,C0FF00000000FFFF,500,18611,17,733396,*24');
        }, 1);
    });
  // }, 500);

client.on('data', function (data) {
    console.log('Received: ' + data);
    //   client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});