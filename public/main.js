$(document).ready(function() {
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
    input.val('');
  });
});
