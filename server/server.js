const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const socketIO = require('socket.io')
const http = require('http')
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New User connected')

   
  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })

  socket.emit('newMessage', {
    from:'Admin', 
    text:'welcome to chat app'
  })

  socket.broadcast.emit('newMEssage', {
    from:'Admin',
    text:'New user joined'
  })
      


  socket.on('createMessage', (message) => {
    console.log('New message', message)
      io.emit('newMessage',{message})
  })

})
 



server.listen(port, ()=>{
    console.log('listening on port ', port)
})