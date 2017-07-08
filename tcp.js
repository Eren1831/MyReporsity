var net=require("net");
var SerialPort = require('serialport');
var firebase   = require('firebase');
var veri;
var all = {

	valueTemp    : [],
	valueSpeed   : [],
	valueCurrent : [],
	valueVoltage : [],

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
  if(veri.length > 0)
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

var config = {
    apiKey: "AIzaSyAXF5h18tVPGqO3o1iZsU2x3qIVpGq5E0I",
    authDomain: "eren123-fcd90.firebaseapp.com",
    databaseURL: "https://eren123-fcd90.firebaseio.com",
    storageBucket: "eren123-fcd90.appspot.com",
    messagingSenderId: "35420556126"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

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
	
}, 1);
},2200);

//TCP SOCKET
var data_

var server=net.createServer(function(socket)
	{
			socket.write('Echo server\r\n');

	});
port.on("data",function(d)
{
//data_=d.split("|");
server.on("connection",function(socket){

		//r remoteaddress=socket.remoteAddess + ":" + socket.remotePort;
		//console.log("server is open ");

		socket.on('data',function(veri)
			{
				
				//var sendData=data_[0]+"|"+data_[1]+"|"+data_[2]+"|"+data_[3]+"|"+data_[4]+"|"+data_[5]+"|"+data_[6]+"|"+data_[7]+"|"+data_[8]+"|"+data_[9]+"|"+data_[10]+"|"+data_[11];
				// console.log("veri : %s ",d);

				
				setInterval(function()
					{
						console.log(d);
						socket.write(d);
					});
			});


	});

});


server.listen(8080,function()
{
	console.log("EREN %j", server.address());
})
