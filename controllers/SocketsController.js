const WebSocket = require('ws');

class SocketsController {
    constructor(wss) {
        this.wss = wss;
        this.init();
    }

    init() {
        this.wss.on('connection', function (ws, req) {

            ws.on('youtubeQuery', function incoming(message) {
                console.log('received: %s', message);
            });

            ws.send('something');
        })
    }

    send(data) {
        console.log('broadcasting results to client');
        this.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }
}

module.exports = SocketsController;