var net=require("net");
var SerialPort = require('serialport');
var firebase   = require('firebase');
var admin = require("firebase-admin");

var veri;
var all = {


	valueTemp    : [],
	valueSpeed   : [],
	valueCurrent : [],
	valueVoltage : [],
	valueHor     : [],
	valueBattery : [],


};


var port = new SerialPort('/dev/ttyUSB0',
	{
		baudrate : 9600 ,
		parser: SerialPort.parsers.readline('\r\n')
	});

port.on('open',function()
{
	console.log('port is open..')
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
});

port.on('data',function (val) {
   veri = val.split("|");
  if(veri.length > 1)
  {
  	all["valueTemp" ]["value1"] =veri[0];
  	all["valueTemp" ]["value2"] =veri[1];
  	all["valueTemp" ]["value3"] =veri[2];
  	all["valueTemp" ]["value4"] =veri[3];
  	all["valueTemp" ]["value5"] =veri[4];
  	all["valueTemp" ]["value6"] =veri[5];
  	all["valueTemp" ]["value7"] =veri[6];

  	all["valueSpeed"]["LefMotor"]   =veri[7];
  	all["valueSpeed"]["RightMotor"] =veri[8];
  	
  	all["valueCurrent"]["MotorDriver1Input"]  =veri[9];
  	all["valueCurrent"]["MotorDriver1OUTPUT"] =veri[10];
  	all["valueCurrent"]["MotorDriver2INPUT"]  =veri[11];
  	all["valueCurrent"]["MotorDriver2OUTPUT"] =veri[12];
  	
  	all["valueVoltage"]["MotorDriver1INPUT"]  =veri[13];
  	all["valueVoltage"]["MotorDriver1OUTPUT"] =veri[14];
  	all["valueVoltage"]["MotorDriver2INPUT"]  =veri[15];
  	all["valueVoltage"]["MotorDriver2OUTPUT"] =veri[16];
	
	all["valueHor"]["status"]=veri[17];
	all["valueHor"]["ambientTemp"]=veri[18];
	all["valueHor"]["stackVoltage"]=veri[19];
	all["valueHor"]["H2Voltage"]=veri[20];
	all["valueHor"]["stackTemp"]=veri[21];
	all["valueHor"]["current"]=veri[22];
	all["valueHor"]["batteryVoltage"]=veri[23];

	all["valueBattery"]["cell0"]=veri[24];
	all["valueBattery"]["cell1"]=veri[25];
	all["valueBattery"]["cell2"]=veri[26];
	all["valueBattery"]["cell3"]=veri[27];
	all["valueBattery"]["cell4"]=veri[28];
	all["valueBattery"]["cell5"]=veri[29];
	all["valueBattery"]["cell6"]=veri[30];
	all["valueBattery"]["cell7"]=veri[31];
	all["valueBattery"]["cell8"]=veri[32];
	all["valueBattery"]["cell9"]=veri[33];
	all["valueBattery"]["cell10"]=veri[34];
	all["valueBattery"]["cell11"]=veri[35];
	all["valueBattery"]["cell12"]=veri[36];
	all["valueBattery"]["cell13"]=veri[37];
	all["valueBattery"]["cell14"]=veri[38];
	all["valueBattery"]["temp1"]=veri[39];
	all["valueBattery"]["temp2"]=veri[40];
	all["valueBattery"]["current"]=veri[41];

  	for(var i=0;i<=40;i++)
  	{
  		console.log(veri[i]);
  	}
  }
});

var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };
  
  firebase.initializeApp(config); 
  var database = firebase.database();

var dataRefHor = firebase.database().ref('/***HORİZON***');
var dataRefBattery = firebase.database().ref('***BATTERY***');
var dataRefTemp = firebase.database().ref('/***TEMP***');
var dataRefSpeed = firebase.database().ref('/***SPEED***');
var dataRefCurrent=firebase.database().ref('/***CURRENT***');
var dataRefVoltage=firebase.database().ref('/****VOLTAGE***');



setTimeout(function(){
setInterval(function (){

	dataRefTemp.set({

		temp1  : all["valueTemp" ]["value1"],
		temp2 : all["valueTemp" ]["value2"],
    });

	dataRefBattery.set({
		cell1 : all["valueBattery"]["cell0"],
		cell2 : all["valueBattery"]["cell1"],
		cell3 : all["valueBattery"]["cell2"],
		cell4 : all["valueBattery"]["cell3"],
		cell5 : all["valueBattery"]["cell4"],
		cell6 : all["valueBattery"]["cell5"],
		cell7 : all["valueBattery"]["cell6"],
		cell8 : all["valueBattery"]["cell7"],
		cell9 : all["valueBattery"]["cell8"],
		cell10 : all["valueBattery"]["cell9"],
		cell11 : all["valueBattery"]["cell10"],
		cell12 : all["valueBattery"]["cell11"],
		cell13 : all["valueBattery"]["cell12"],
		cell14 : all["valueBattery"]["cell13"],
		cell15 : all["valueBattery"]["cell14"],
		cell16 : all["valueBattery"]["temp1"],
		cell17 : all["valueBattery"]["temp2"],
		cell18 : all["valueBattery"]["current"],

    });

	dataRefHor.set({
		status : all["valueHor"]["status"],
		ambientTemp : all["valueHor"]["ambientTemp"],
		stackVoltage : all["valueHor"]["stackVoltage"],
		H2Voltage : all["valueHor"]["H2Voltage"],
	 	stackTemp : all["valueHor"]["stackTemp"],
		current : all["valueHor"]["current"],
		batteryVoltage : all["valueHor"]["batteryVoltage"],
		
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
	
}, 1000);
},3000);


//TCP SOCKET

var server=net.createServer(function(socket)
	{
			socket.write('Echo server\r\n');

	});

port.on("data",function(d)
{
server.on("connection",function(socket){

		socket.on('data',function(veri)
			{
				
				setInterval(function()
					{
						//console.log(d);
						socket.write(d);
					},100);
			});


	});

});


server.listen(8080,function()
{
	//console.log("TCP %j", server.address());
})var net=require("net");
var SerialPort = require('serialport');
var firebase   = require('firebase');
var admin = require("firebase-admin");

var veri;
var all = {


	valueTemp    : [],
	valueSpeed   : [],
	valueCurrent : [],
	valueVoltage : [],
	valueHor     : [],
	valueBattery : [],


};


var port = new SerialPort('/dev/ttyUSB0',
	{
		baudrate : 9600 ,
		parser: SerialPort.parsers.readline('\r\n')
	});

port.on('open',function()
{
	console.log('port is open..')
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
});

port.on('data',function (val) {
   veri = val.split("|");
  if(veri.length > 1)
  {
  	all["valueTemp" ]["value1"] =veri[0];
  	all["valueTemp" ]["value2"] =veri[1];
  	all["valueTemp" ]["value3"] =veri[2];
  	all["valueTemp" ]["value4"] =veri[3];
  	all["valueTemp" ]["value5"] =veri[4];
  	all["valueTemp" ]["value6"] =veri[5];
  	all["valueTemp" ]["value7"] =veri[6];

  	all["valueSpeed"]["LefMotor"]   =veri[7];
  	all["valueSpeed"]["RightMotor"] =veri[8];
  	
  	all["valueCurrent"]["MotorDriver1Input"]  =veri[9];
  	all["valueCurrent"]["MotorDriver1OUTPUT"] =veri[10];
  	all["valueCurrent"]["MotorDriver2INPUT"]  =veri[11];
  	all["valueCurrent"]["MotorDriver2OUTPUT"] =veri[12];
  	
  	all["valueVoltage"]["MotorDriver1INPUT"]  =veri[13];
  	all["valueVoltage"]["MotorDriver1OUTPUT"] =veri[14];
  	all["valueVoltage"]["MotorDriver2INPUT"]  =veri[15];
  	all["valueVoltage"]["MotorDriver2OUTPUT"] =veri[16];
	
	all["valueHor"]["status"]=veri[17];
	all["valueHor"]["ambientTemp"]=veri[18];
	all["valueHor"]["stackVoltage"]=veri[19];
	all["valueHor"]["H2Voltage"]=veri[20];
	all["valueHor"]["stackTemp"]=veri[21];
	all["valueHor"]["current"]=veri[22];
	all["valueHor"]["batteryVoltage"]=veri[23];

	all["valueBattery"]["cell0"]=veri[24];
	all["valueBattery"]["cell1"]=veri[25];
	all["valueBattery"]["cell2"]=veri[26];
	all["valueBattery"]["cell3"]=veri[27];
	all["valueBattery"]["cell4"]=veri[28];
	all["valueBattery"]["cell5"]=veri[29];
	all["valueBattery"]["cell6"]=veri[30];
	all["valueBattery"]["cell7"]=veri[31];
	all["valueBattery"]["cell8"]=veri[32];
	all["valueBattery"]["cell9"]=veri[33];
	all["valueBattery"]["cell10"]=veri[34];
	all["valueBattery"]["cell11"]=veri[35];
	all["valueBattery"]["cell12"]=veri[36];
	all["valueBattery"]["cell13"]=veri[37];
	all["valueBattery"]["cell14"]=veri[38];
	all["valueBattery"]["temp1"]=veri[39];
	all["valueBattery"]["temp2"]=veri[40];
	all["valueBattery"]["current"]=veri[41];

  	for(var i=0;i<=40;i++)
  	{
  		console.log(veri[i]);
  	}
  }
});

var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };
  
  firebase.initializeApp(config); 
  var database = firebase.database();

var dataRefHor = firebase.database().ref('/***HORİZON***');
var dataRefBattery = firebase.database().ref('***BATTERY***');
var dataRefTemp = firebase.database().ref('/***TEMP***');
var dataRefSpeed = firebase.database().ref('/***SPEED***');
var dataRefCurrent=firebase.database().ref('/***CURRENT***');
var dataRefVoltage=firebase.database().ref('/****VOLTAGE***');



setTimeout(function(){
setInterval(function (){

	dataRefTemp.set({

		temp1  : all["valueTemp" ]["value1"],
		temp2 : all["valueTemp" ]["value2"],
    });

	dataRefBattery.set({
		cell1 : all["valueBattery"]["cell0"],
		cell2 : all["valueBattery"]["cell1"],
		cell3 : all["valueBattery"]["cell2"],
		cell4 : all["valueBattery"]["cell3"],
		cell5 : all["valueBattery"]["cell4"],
		cell6 : all["valueBattery"]["cell5"],
		cell7 : all["valueBattery"]["cell6"],
		cell8 : all["valueBattery"]["cell7"],
		cell9 : all["valueBattery"]["cell8"],
		cell10 : all["valueBattery"]["cell9"],
		cell11 : all["valueBattery"]["cell10"],
		cell12 : all["valueBattery"]["cell11"],
		cell13 : all["valueBattery"]["cell12"],
		cell14 : all["valueBattery"]["cell13"],
		cell15 : all["valueBattery"]["cell14"],
		cell16 : all["valueBattery"]["temp1"],
		cell17 : all["valueBattery"]["temp2"],
		cell18 : all["valueBattery"]["current"],

    });

	dataRefHor.set({
		status : all["valueHor"]["status"],
		ambientTemp : all["valueHor"]["ambientTemp"],
		stackVoltage : all["valueHor"]["stackVoltage"],
		H2Voltage : all["valueHor"]["H2Voltage"],
	 	stackTemp : all["valueHor"]["stackTemp"],
		current : all["valueHor"]["current"],
		batteryVoltage : all["valueHor"]["batteryVoltage"],
		
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
	
}, 1000);
},3000);


//TCP SOCKET

var server=net.createServer(function(socket)
	{
			socket.write('Echo server\r\n');

	});

port.on("data",function(d)
{
server.on("connection",function(socket){

		socket.on('data',function(veri)
			{
				
				setInterval(function()
					{
						//console.log(d);
						socket.write(d);
					},100);
			});


	});

});


server.listen(8080,function()
{
	//console.log("TCP %j", server.address());
})
