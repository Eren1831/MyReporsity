var readlineSync=require("readline-sync");
var colors=require("colors");
var net=require("net");
var veri;
var HOST="127.0.0.1";
var PORT=8080;
var _data;
var client=null;
client = new net.Socket();
var _data;
client.connect(8080, '127.0.0.1', function() {
	client.write('Echo server\r\n');

	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});
function OpenConnection()
{

	if(client)
	{
		console.log("open");
	}
}


client.on('data', function(veri) {
		console.log("Veri: " + veri);
});


  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }