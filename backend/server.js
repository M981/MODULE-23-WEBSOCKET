// Init
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let messages = [];

app.use(express.static('public'));  // Gebruik public directory

io.on('connection', (socket) => {
  console.log('A user connected'); // Socket connection

  socket.on('chat message', (msg) => {
    console.log('message from ' + msg.username + ': ' + msg.message); // Stuur naar console
    messages.push(msg); // Msg storen
    io.emit('chat message', msg);
});

// Handler voor bestaande berichten krijgen
socket.on('get messages', () => {
    socket.emit('load messages', messages);
});

  // Socket disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(port, () => {
  console.log('Server listening on port: ' + port);
});
