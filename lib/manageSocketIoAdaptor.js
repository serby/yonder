module.exports.createAdaptor = function(io, yonder) {

  io.sockets.on('connection', function (socket) {

    socket.on('register-manage', function () {
      socket.emit('update', yonder);
    });

  });

};