$(function() {

  var log = function() { console.log(arguments); }
    //, $el = $('#app')
    , socket = window.io.connect(document.location.origin);

  socket.emit('register-manage');

  socket.on('update', function(yonder) {
    log('Update', yonder);
  });

});