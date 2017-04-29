var SerialPort = require('serialport');
var firebase   = require('firebase');
var port = new SerialPort('/dev/ttyUSB1',
	{
		baudrate : 9600 ,
		parser: SerialPort.parsers.readline('\r\n')
	});

var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
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


port.on('data',function (val) {
  var veri = val.split("|");
  if(veri.length > 1)
  {
  	all["value"]["value1"]=veri[0];
  	all["value"]["value2"]=veri[1];
  	all["value"]["value3"]=veri[2];
  	for(var i=0;i<3;i++)
  	{
  		console.log(veri[i]);
  	}
  }
});


var dataRef = firebase.database().ref('/');

setTimeout(function()
{
setInterval(function (){
	dataRef.set({
		veri  :  all["value"]["value2"],
		veri1 :  all["value"]["value1"],
		veri2 :  all["value"]["value3"]
	});
}, 10);
},1500);
