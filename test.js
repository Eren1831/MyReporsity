var SerialPort = require('serialport');
var firebase   = require('firebase');
var port = new SerialPort('/dev/ttyACM0',
	{
		baudrate : 115200 ,
		parser: SerialPort.parsers.readline('\r\n')
	});
var veri="";
  var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    projectId: "eren123-fcd90",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };
  firebase.initializeApp(config);
 
var all={value: []}; 

var database = firebase.database();

port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });
});
 

port.on('open',function()
{
	console.log('port is open..')
});


port.on('error', function(err) {
  console.log('Error: ', err.message);
});

port.on('disconnet',function()
{
	console.log("port is closing..")
});
port.on('data',function(data)
{
console.log(data);
});

