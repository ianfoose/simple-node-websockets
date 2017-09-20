#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
process.stdin.resume();
process.stdin.setEncoding('utf8');

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    process.stdin.on('data', function(message) {
        message = message.trim();
        connection.sendUTF(message);
        console.log('Sent: ',message);
    });
});
 
client.connect('ws://localhost:5050/', 'echo-protocol');