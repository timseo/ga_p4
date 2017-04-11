var io = require('socket.io')()

io.on('connection', function (socket) {
  console.log('Client connected to socket.io!')

  // 2. Server broadcasts message to all clients
  socket.on('add-circle', function (data) {
  	io.emit('add-circle', data)
  })

  socket.on('clear-page', function (data) {
  	io.emit('clear-page', data)
  })

})

module.exports = io
