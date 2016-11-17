'use static';

import express from "express";
import http from "http";
import socket_io from "socket.io";

const app = express();
app.use(express.static('public'));

const server = http.Server(app);
const io = socket_io(server);

io.on('connection', socket => {
  socket.broadcast.emit('arrival', 'Thanks for stopping by!');
  console.log('Client Connected');

  socket.on('disconnect', () => {
    console.log('User disconnected...');
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
