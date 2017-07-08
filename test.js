function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
            console.log("baglı degil");
        } else {
            cb(true);
            console.log("baglı ");
            
        }
    })
}
/* İnternet Kontrol */


setInterval(function ()
{
checkInternet(function(isConnected) {
    if (isConnected) {
        console.log("baglaniyor");
        
    } else {
        // not connected to the internet
        console.log("internet yok");
        firebaseScan();
    	
    }
});
},1000);


var firebaseScan=function()
{

var SerialPort = require('serialport');
var firebase   = require('firebase');

var port = new SerialPort('/dev/ttyUSB0',
	{
		baudrate : 9600 ,
		parser: SerialPort.parsers.readline('\r\n')
	});

/*SerialPort.list(function(err,ports)
{
	ports.forEach(function(port)
	{
		console.log(port.comName);
		console.log(port.pnpId);
		
		if(port.comName){
		}
	});
}); */ 
	
/*	var serialport;
	setTimeout(connect = function(){
  serialPort = new com.SerialPort(serialportName, {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\r\n')
  }, true); */ 

var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


var all = {

	valueTemp    : [],
	valueSpeed   : [],
	valueCurrent : [],
	valueVoltage : [],

};

var veri;

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
   veri = val.split("|");
  if(veri.length > 1)
  {
  	all["valueTemp" ]["value1"] =veri[0];
  	all["valueTemp" ]["value2"] =veri[1];

  	all["valueSpeed"]["LefMotor"]   =veri[2];
  	all["valueSpeed"]["RightMotor"] =veri[3];
  	
  	all["valueCurrent"]["MotorDriver1Input"]  =veri[4];
  	all["valueCurrent"]["MotorDriver1OUTPUT"] =veri[5];
  	all["valueCurrent"]["MotorDriver2INPUT"]  =veri[6];
  	all["valueCurrent"]["MotorDriver2OUTPUT"] =veri[7];
  	
  	all["valueVoltage"]["MotorDriver1INPUT"]  =veri[8];
  	all["valueVoltage"]["MotorDriver1OUTPUT"] =veri[9];
  	all["valueVoltage"]["MotorDriver2INPUT"]  =veri[10];
  	all["valueVoltage"]["MotorDriver2OUTPUT"] =veri[11];

  	for(var i=0;i<=11;i++)
  	{
  		//console.log(veri[i]);
  	}
  }
});
	port.on('data',function(val){
		var veri=val.split("|");
		for(var i=0;i<11;i++)
			console.log(veri[i]);
	}


var dataRefTemp = firebase.database().ref('/***TEMP***');
var dataRefSpeed = firebase.database().ref('/***SPEED***');
var dataRefCurrent=firebase.database().ref('/***CURRENT***');
var dataRefVoltage=firebase.database().ref('/****VOLTAGE***');

setTimeout(function()
{
setInterval(function (){
	dataRefTemp.set({

		temp1  : all["valueTemp" ]["value1"],
		temp2 : all["valueTemp" ]["value2"],
    });


	dataRefSpeed.set({
		LeftMotorSpeed :all["valueSpeed"]["LefMotor"], 
		RightMotorSpeed :all["valueSpeed"]["RightMotor"],
	
	});

	dataRefCurrent.set({
		MotorDriver1INPUT :all["valueCurrent"]["MotorDriver1Input"],
		MotorDriver1OUTPUT :all["valueCurrent"]["MotorDriver1OUTPUT"],
		MotorDriver2INPUT :all["valueCurrent"]["MotorDriver2INPUT"],
		MotorDriver2OUTPUT :all["valueCurrent"]["MotorDriver2OUTPUT"],
	});

	dataRefVoltage.set({

		MotorDriverVoltage_1_INPUT :all["valueVoltage"]["MotorDriver1INPUT"] ,
		MotorDriverVoltage_1_OUTPUT :all["valueVoltage"]["MotorDriver1OUTPUT"],
		MotorDriverVoltage_2_INPUT :all["valueVoltage"]["MotorDriver2INPUT"] ,
		MotorDriverVoltage_2_OUTPUT :all["valueVoltage"]["MotorDriver2OUTPUT"],
	
	});
	
}, 10);
},2200);

/*
var firebaseScan=function()
{
var firebase   = require('firebase');
var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };

  firebase.initializeApp(config);
  //var database = firebase.database();
console.log("firebase e baglanmaya çalışıyor..");

} */


}
