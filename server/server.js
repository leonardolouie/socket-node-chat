const express = require('express')
const app = express()
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
var server = http.createServer(app)
var io = socketIO(server)

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New User connected')

   
  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })

  socket.emit('newMessage', generateMessage('admin', 'Welcome to chat app'))

  socket.broadcast.emit('newMEssage', generateMessage('admin', 'new user Join'))
      


  socket.on('createMessage', (message) => {
    console.log('New message', message)
      io.emit('newMessage',generateMessage(message.from, message.text))
  })

})
 



server.listen(port, ()=>{
    console.log('listening on port ', port)
})