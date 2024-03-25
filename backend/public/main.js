var socket = io('http://localhost:3000');
var username;

$(document).ready(function () {
    // Gebruik displaymessage om voorgestuurde berichten te laten zien
    socket.on('load messages', function (messages) { 
        messages.forEach(function (msg) {
            displayMessage(msg.username, msg.message);
        });
    });

    function displayMessage(username, message) {
        $('#chat-window').append(username + ': ' + message + '</div>');
        $('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
    }

    $('#username-submit').click(function () {
        var inputUsername = $('#username-input').val().trim();
        if (inputUsername !== '') {
            username = inputUsername;
            $('#username-input').prop('disabled', true);
            $('#username-submit').prop('disabled', true);
        }
    });

    $('#send-button').click(function () {
        sendMessage();
    });

    $('#message-input').keypress(function (e) {
        if (e.which == 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        var message = $('#message-input').val().trim();
        if (message !== '') {
            if (username) {
                socket.emit('chat message', { username: username, message: message });
                $('#message-input').val('');
            } else {
                alert('Je hebt geen username ingesteld.');
            }
        }
    }


    socket.on('chat message', function (data) {
        displayMessage(data.username, data.message);
    });

    socket.emit('get messages');
});
