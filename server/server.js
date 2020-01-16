const express = require('express')
const app = express()
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
var server = http.createServer(app)
var io = socketIO(server)

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New User connected')

  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })

  socket.emit('newMessage', generateMessage('admin', 'Welcome to chat app'))

  socket.on('createMessage', (message, callback) => {
      io.emit('newMessage',generateMessage(message.from, message.text))
      callback('This is from server')
  })
    
   socket.on('createLocation', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ))
   })
})
 

server.listen(port, ()=>{
    console.log('listening on port ', port)
})