// Import the interface to Tessel hardware
var tessel = require('tessel'),
    router = require('tiny-router'),
    ws = require("nodejs-websocket"),
    fs = require('fs'),
    path = require('path');

//LED lights
var lights = {
    green: tessel.led[2],
    blue: tessel.led[3]
};

// Turn one of the LEDs on to start.
lights.green.off();
lights.blue.off();

// The router should use our static folder for client HTML/JS
router
    .use('static', { path: './static' })
    // Use the onboard file system (as opposed to microsd)
    .use('fs', fs)
    // Listen on port 8080
    .listen(8080);

//Setting a public folder 
router.use('static', { path: __dirname + '/public' });
//Creating a URL logger 
router.use(function (req, res, next) {
    console.log('URL: ', req.url);
    next();
});


var page = `<html>

<head>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
</head>

<body>
    <button id='green-on'>
        Green ON
    </button>
    <button id='green-off'>
        Green OFF
    </button>
    <button id='blue-on'>
        Blue ON
    </button>
    <button id='blue-off'>
        Blue OFF
    </button>
</body>

<script>
    $('#green-on').click(function () {
        $.ajax({
            url: './green/on', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#green-off').click(function () {
        $.ajax({
            url: './green/off', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#blue-on').click(function () {
        $.ajax({
            url: './blue/on', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#green-off').click(function () {
        $.ajax({
            url: './blue/off', success: function (result) {
                console.log('done');
            }
        });
    });
</script>


</html>`;


router.addMethod('TRACE');

router.trace('/logs', function (req, res) {
    res.send('this are traces');
});


//home route
router.get('/', function (req, res) {
    res.send(`<html>

<head>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
</head>

<body>
    <button id='green-on'>
        Green ON
    </button>
    <button id='green-off'>
        Green OFF
    </button>
    <button id='blue-on'>
        Blue ON
    </button>
    <button id='blue-off'>
        Blue OFF
    </button>
</body>

<script>
    $('#green-on').click(function () {
        $.ajax({
            url: './green/on', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#green-off').click(function () {
        $.ajax({
            url: './green/off', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#blue-on').click(function () {
        $.ajax({
            url: './blue/on', success: function (result) {
                console.log('done');
            }
        });
    });

    $('#green-off').click(function () {
        $.ajax({
            url: './blue/off', success: function (result) {
                console.log('done');
            }
        });
    });
</script>


</html>`);
});

tessel.led[0].off();

router.get('/blue', function (req, res) {
    var state = lights.blue.read();
    res.send({ status: state });
});


router.get('/green', function (req, res) {
    var state = lights.green.read();
    res.send({ status: state });
});


router.get('/blue/on', function (req, res) {
    lights.blue.on();
    res.send(200);
});

router.get('/blue/off', function (req, res) {
    lights.blue.off();
    res.send(200);
});

router.get('/green/on', function (req, res) {
    lights.green.on();
    res.send(200);
});

router.get('/green/off', function (req, res) {
    lights.green.off();
    res.send(200);
});


// Create a websocket server on port 8001
ws.createServer(function (conn) {
    console.log("New connection")
    // When we get a packet from a connection
    conn.on("text", function (str) {

        console.log("Received " + str)
        // Parse it as JSON
        var command = JSON.parse(str);
        // Actually set the LED state
        tessel.led[command.led].output(command.on)
        // Echo it back to confirm
        conn.sendText(JSON.stringify(command));
    });
    // Notify the console when the connection closes
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8081)

console.log("I'm listening! (Press CTRL + C to stop)");

