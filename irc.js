var net = require('net');
var irc = {};

irc.socket = new net.Socket();

irc.socket.on('data', funtion(data) {
    data = data.split('\n');
    data.forEach(logData);
});

function logData(element) {  
    console.log("RECV -" + element);
    if( element != "") {
        irc.handle(element.slice(0,-1);
    }
}

irc.socket.on('connect', function(){
    irc.on(/^PING :(.+)$/i, function(info) {
            irc.raw('PONG' + info[1]);
    });
});