$(document).ready(function() {
  let socket = io();
  let input = $('input');
  let messages = $('#messages');

  const addMessage = function(message) {
    messages.append('<div>' + message + '</div>');
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

});
