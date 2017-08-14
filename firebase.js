var net=require("net");
var SerialPort = require('serialport');
var firebase   = require('firebase');
var admin = require("firebase-admin");

var veri;
var all = {


	valueTemp    : [],
	valueMotorRight  : [],
	valueMotorLeft : [],
	valueHor     : [],
	valueBattery : [],
	valueLight   : [],

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
  	all["valueTemp" ]["inTemp"] =veri[1];
  	all["valueTemp" ]["outTemp"] =veri[2];
  	
        all["valueMotorLeft" ]["motorLeftTemp"] =veri[3];
  	all["valueMotorLeft"]["LeftMotorSpeed"]   =veri[4];
  	all["valueMotorLeft"]["MotorDriver1Input"]  =veri[5];
  	all["valueMotorLeft"]["MotorDriver1OUTPUT"] =veri[6];
  	all["valueMotorLeft"]["MotorDriver2INPUT"]  =veri[7];
  	all["valueMotorLeft"]["MotorDriver2OUTPUT"] =veri[8];
  	
        all["valueMotorRight" ]["motorRightTemp"] =veri[9];
  	all["valueMotorRight"]["RightMotorSpeed"] =veri[10];
  	all["valueMotorRight"]["MotorDriver1INPUT"]  =veri[11];
  	all["valueMotorRight"]["MotorDriver1OUTPUT"] =veri[12];
  	all["valueMotorRight"]["MotorDriver2INPUT"]  =veri[13];
  	all["valueMotorRight"]["MotorDriver2OUTPUT"] =veri[14];
	
	all["valueHor"]["status"]=veri[15];
	all["valueHor"]["ambientTemp"]=veri[16];
	all["valueHor"]["stackVoltage"]=veri[17];
	all["valueHor"]["H2Voltage"]=veri[18];
	all["valueHor"]["stackTemp"]=veri[19];
	all["valueHor"]["current"]=veri[20];
	all["valueHor"]["batteryVoltage"]=veri[21];
        all["valueHor" ]["h2Temp"] =veri[22];

	all["valueBattery"]["cell0"]=veri[23];
	all["valueBattery"]["cell1"]=veri[24];
	all["valueBattery"]["cell2"]=veri[25];
	all["valueBattery"]["cell3"]=veri[26];
	all["valueBattery"]["cell4"]=veri[27];
	all["valueBattery"]["cell5"]=veri[28];
	all["valueBattery"]["cell6"]=veri[29];
	all["valueBattery"]["cell7"]=veri[30];
	all["valueBattery"]["cell8"]=veri[31];
	all["valueBattery"]["cell9"]=veri[32];
	all["valueBattery"]["cell10"]=veri[33];
	all["valueBattery"]["cell11"]=veri[34];
	all["valueBattery"]["cell12"]=veri[35];
	all["valueBattery"]["cell13"]=veri[36];
	all["valueBattery"]["cell14"]=veri[37];
	all["valueBattery"]["temp1"]=veri[38];
	all["valueBattery"]["temp2"]=veri[39];
        all["valueBattery" ]["batteryTemp"] =veri[40];
	all["valueBattery"]["current"]=veri[41];
	
	all["valueLight"]["flasher"]=veri[42];
	all["valueLight"]["kısa"]=veri[43];
	all["valueLight"]["uzun"]=veri[44];
	all["valueLight"]["sag"]=veri[45];
	all["valueLight"]["sol"]=veri[46];
	all["valueLight"]["neoSol"]=veri[47];
	all["valueLight"]["neoSag"]=veri[48];
        all["valueLight"]["silecek"]=veri[49];
	all["valueLight"]["tavan"]=veri[50];
	all["valueLİght"]["solKapı"]=veri[51];
	all["valueLight"]["sagKapı"]=veri[52];
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
var dataRefLeftMotor = firebase.database().ref('/***LEFTMOTOR***');
var dataRefRightMotor=firebase.database().ref('/***RİGHTMOTOR***');
var dataRefLight=firebase.database().ref('/****LİGHT***');



setTimeout(function(){
setInterval(function (){

	dataRefTemp.set({

		temp1  : all["valueTemp" ]["inTemp"],
		temp2 : all["valueTemp" ]["outTemp"],
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
		temp1 : all["valueBattery"]["temp1"],
		temp2 : all["valueBattery"]["temp2"],
		current : all["valueBattery"]["current"],
		batteryTemp : all["valueBattery" ]["batteryTemp"],

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
	dataRefMotorRight.set({
		 
		RightMotorSpeed :all["valueSpeed"]["RightMotor"],
                MotorDriver2INPUT :all["valueCurrent"]["MotorDriver2INPUT"],
		MotorDriver2OUTPUT :all["valueCurrent"]["MotorDriver2OUTPUT"],
                MotorDriverVoltage_2_INPUT :all["valueVoltage"]["MotorDriver2INPUT"] ,
		MotorDriverVoltage_2_OUTPUT :all["valueVoltage"]["MotorDriver2OUTPUT"],
		MotorRight : all["valueTemp" ]["motorRightTemp"]
	
	});

	dataRefMotorLeft.set({
                LeftMotorSpeed :all["valueSpeed"]["LefMotor"],
		MotorDriver1INPUT :all["valueCurrent"]["MotorDriver1Input"],
		MotorDriver1OUTPUT :all["valueCurrent"]["MotorDriver1OUTPUT"],
                MotorDriverVoltage_1_INPUT :all["valueVoltage"]["MotorDriver1INPUT"] ,
		MotorDriverVoltage_1_OUTPUT :all["valueVoltage"]["MotorDriver1OUTPUT"],
                MotorLeftTemp : all["valueTemp" ]["motorLeftTemp"],
		
	});
        dataRefLight.set({
                Flasher :all["valueLight"]["flasher"],
		Kısa :all["valueLight"]["kısa"],
		Uzun :all["valueLight"]["uzun"],
                Sag :all["valueLight"]["sag"] ,
		Sol :all["valueLight"]["sol"],
                NeoSag : all["valueTemp" ]["neoSag"],
                NeoSol : all["valueTemp" ]["neoSol"],
		Silecek : all["valueTemp" ]["motorLeftTemp"],
		Tavan   : all["valueTemp" ]["silecek"],
		SolKapı : all["valueTemp" ]["solKapı"],
		SagKapı : all["valueTemp" ]["sagKapı"],
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
