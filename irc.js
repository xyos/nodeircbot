var net = require('net');
var irc = {};

irc.socket = new net.Socket();
irc.socket.setEncoding('utf8');
irc.socket.setNoDelay();

irc.close = function(message){
  message = typeof message != 'undefined' ? message : "Quit";
  irc.raw('QUIT :' + message);
}

irc.socket.on('data', function(data){
  data = data.split("\n");
  data.forEach(logData);
});

irc.raw = function(data){
  if (irc.socket.write(data + '\n')){
    console.log("SENT - " + data);
  }
}

irc.listeners = [];
irc.on = function(data, callback){
  irc.listeners.push([data,callback,false]);
}

function logData(element){
  if (element != ""){
    console.log("RECV - " + element);
  }
}

function ircConnect(){
  console.log("connecting to " + irc.socket.remoteAddress);
  irc.on(/^PING :(.+)$/i, function(info){
    irc.raw('PONG :' + info[1]);
  });
  setTimeout(function(){
    irc.raw('NICK nodebot');
    irc.raw('USER nodebot * * :Jairo Suarez');
    setTimeout(function(){
      for (var i = 0; i < 5;i++){
        irc.close();
      }
    }, 2000);
  }, 1000);
}
irc.socket.connect(6667,'idsoftware.us.quakenet.org', ircConnect);
