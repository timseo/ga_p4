var io = require('socket.io')();
// io is the server and socket is the client
io.on('connection', function (socket) {


  // add-circle is a 'channel'
  socket.on('add-circle', function(data){
    io.emit('add-circle', data)
  })
//this is where the channel name is determined as far as code flow work flow
  socket.on('clear-circle', function(data){
    console.log('clear circle event trigger')
    io.emit('clear-circle', data)
  })
  console.log('Client connected to socket.io!')
})



module.exports = io
