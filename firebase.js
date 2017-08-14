var net=require("net");
var SerialPort = require('serialport');
var firebase   = require('firebase');
var admin = require("firebase-admin");

var veri;
var all = {


	valueCabin    : [],
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
  	all["valueCabin" ]["inTemp"] =veri[1];
  	all["valueCabin" ]["outTemp"] =veri[2];
  	all["valueCabin"]["solKapı"]  = veri[3];
  	all["valueCabin"]["sagKapı"]  = veri[4];
  	all["valueCabin"]["flasher"]  = veri[5];
  	all["valueCabin"]["tavan"]    =veri[6];
  	all["valueCabin"]["h2Sens"]   =veri[7];

    all["valueMotorLeft" ]["motorLeftTemp"] =veri[8];
  	all["valueMotorLeft"]["LeftMotorSpeed"]   =veri[9];
  	all["valueMotorLeft"]["MotorDriver1Input"]  =veri[10];
  	all["valueMotorLeft"]["MotorDriver1OUTPUT"] =veri[11];
  	all["valueMotorLeft"]["MotorDriver2INPUT"]  =veri[12];
  	all["valueMotorLeft"]["MotorDriver2OUTPUT"] =veri[13];
  	
    all["valueMotorRight" ]["motorRightTemp"] =veri[14];
  	all["valueMotorRight"]["RightMotorSpeed"] =veri[15];
  	all["valueMotorRight"]["MotorDriver1INPUT"]  =veri[16];
  	all["valueMotorRight"]["MotorDriver1OUTPUT"] =veri[17];
  	all["valueMotorRight"]["MotorDriver2INPUT"]  =veri[18];
  	all["valueMotorRight"]["MotorDriver2OUTPUT"] =veri[19];
	
	all["valueHor"]["status"]=veri[20];
	all["valueHor"]["ambientTemp"]=veri[21];
	all["valueHor"]["stackVoltage"]=veri[22];
	all["valueHor"]["H2Voltage"]=veri[23];
	all["valueHor"]["stackTemp"]=veri[24];
	all["valueHor"]["current"]=veri[25];
	all["valueHor"]["batteryVoltage"]=veri[26];
    all["valueHor" ]["h2Temp"] =veri[27];

	all["valueBattery"]["cell0"]=veri[28];
	all["valueBattery"]["cell1"]=veri[29];
	all["valueBattery"]["cell2"]=veri[30];
	all["valueBattery"]["cell3"]=veri[31];
	all["valueBattery"]["cell4"]=veri[32];
	all["valueBattery"]["cell5"]=veri[33];
	all["valueBattery"]["cell6"]=veri[34];
	all["valueBattery"]["cell7"]=veri[35];
	all["valueBattery"]["cell8"]=veri[36];
	all["valueBattery"]["cell9"]=veri[37];
	all["valueBattery"]["cell10"]=veri[38];
	all["valueBattery"]["cell11"]=veri[39];
	all["valueBattery"]["cell12"]=veri[40];
	all["valueBattery"]["cell13"]=veri[41];
	all["valueBattery"]["cell14"]=veri[42];
	all["valueBattery"]["temp1"]=veri[43];
	all["valueBattery"]["temp2"]=veri[44];
    all["valueBattery" ]["batteryTemp"] =veri[45];
	all["valueBattery"]["current"]=veri[46];
	
	all["valueLight"]["kısa"]=veri[47];
	all["valueLight"]["uzun"]=veri[48];
	all["valueLight"]["sag"]=veri[49];
	all["valueLight"]["sol"]=veri[50];
	all["valueLight"]["neoSol"]=veri[51];
	all["valueLight"]["neoSag"]=veri[52];
    all["valueLight"]["silecek"]=veri[53];

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
var dataRefCabin = firebase.database().ref('/***CABİN***');
var dataRefLeftMotor = firebase.database().ref('/***LEFTMOTOR***');
var dataRefRightMotor=firebase.database().ref('/***RİGHTMOTOR***');
var dataRefLight=firebase.database().ref('/****LİGHT***');



setTimeout(function(){
setInterval(function (){

	dataRefCabin.set({

		inTemp  : all["valueCabin" ]["inTemp"],
		outTemp : all["valueCabin" ]["outTemp"],
		SolKapı : all["valueCabin" ]["solKapı"],
		SagKapı : all["valueCabin" ]["sagKapı"],
		Flasher :all["valueCabin"]["flasher"],
		Tavan   : all["valueCabin" ]["tavan"],
		h2Sens  : all["valueCabin"]["h2Sens"],

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
		MotorRight : all["valueTemp" ]["motorRightTemp"],
	
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
		Kısa :all["valueLight"]["kısa"],
		Uzun :all["valueLight"]["uzun"],
        Sag :all["valueLight"]["sag"] ,
		Sol :all["valueLight"]["sol"],
        NeoSag : all["valueLight" ]["neoSag"],
        NeoSol : all["valueLight" ]["neoSol"],
		Silecek : all["valueLight" ]["silecek"],
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
