$(document).ready(function() {
  const socket = io();
  const input = $('input');
  const messages = $('#messages');
  const currentUsers = $('.current-users')

  const addMessage = function(message) {
    messages.append('<div>' + message + '</div>');
  }

  const updateUserCount = function(count) {
    console.log(`Current users: ${count}`);
    currentUsers.empty().append(count);
  }

  input.on('keydown', event => {
    if (event.keyCode != 13) {
      return; // exit the function
    }

    let message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
  });

  socket.on('message', addMessage);

  socket.on('arrival', message => {
    console.log(message);
  });

  socket.on('update', updateUserCount);

});
