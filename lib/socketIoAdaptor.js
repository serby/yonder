module.exports.createAdaptor = function(io, yonder) {

  io.sockets.on('connection', function (socket) {

    socket.on('register', function (data) {
      var yindow = yonder.find(data.name)

      yindow.panes.forEach(function(pane, index) {

        pane.on('set', setPane)

      })

      function setPane(setData) {
        setData.index = index
        socket.emit('setPane', setData)
      }

      yindow.on('update', function(updateData) {
        socket.emit('update', updateData)
      })

      yindow.on('pane-added', setPane)

      socket.emit('setup', yindow)
    })

  })

}