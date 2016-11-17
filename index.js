'use static';

import express from "express";
import http from "http";
import socket_io from "socket.io";

const app = express();
app.use(express.static('public'));

const server = http.Server(app);
const io = socket_io(server);

const STATE = {
  currentUsersConnected: 0,
  userConnects: function() {this.currentUsersConnected++;},
  userDisconnects: function() {this.currentUsersConnected--}
};

io.on('connection', socket => {
  STATE.userConnects();
  console.log(`Current users: ${STATE.currentUsersConnected}`);
  socket.broadcast.emit('update', STATE.currentUsersConnected);
  socket.broadcast.emit('message', 'A new user has connected!!');
  console.log('Client Connected');

  socket.on('disconnect', () => {
    STATE.userDisconnects();
    console.log(`Current users: ${STATE.currentUsersConnected}`);
    socket.broadcast.emit('update', STATE.currentUsersConnected);
    console.log('User disconnected...');
    socket.broadcast.emit('message', 'A user has left us :(');
  })

  socket.on('message', message => {
    console.log(`Received message: ${message}`);
    socket.broadcast.emit('message', message);
  });
});

server.listen(process.env.PORT || 8080, () => {
  let port = process.env.PORT || 8080;
  console.log('Listening on ' + port);
});
