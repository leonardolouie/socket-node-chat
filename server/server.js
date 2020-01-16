const express = require('express')
const app = express()
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
var server = http.createServer(app)
var io = socketIO(server)

const { Users } = require('./utils/users')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const { isRealString } = require('./utils/validation')
const port = process.env.PORT || 3000
var users = new Users()


app.use(express.static(publicPath))


io.on('connection', (socket) => {

 socket.on('join', (params, callback) => { 
      
    if(!isRealString(params.name) || !isRealString(params.room)) { 
        return callback('Name and Room name are required')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    io.to(params.room).emit('newMessage', generateMessage('admin', `Welcome to the chat app ${params.room}`))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`))


 })

 
  socket.on('createMessage', (message, callback) => {

      var user = users.getUser(socket.id)
      if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name, message.text))
      }
    
  })
    
  socket.on('createLocation', (coords) => {
      var user = users.getUser(socket.id)
      if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude ))
      }    
 })

 
 socket.on('userIsTyping', function(user) { 
      console.log(user)
      io.emit('recieveUserTyping', user)
 })


 socket.on('disconnect', () => {
  console.log('Disconnected from client')
    var user = users.removeUser(socket.id)
     
    if(user) { 
        io.to(user.room).emit('updateUserList', users.getUserList(user.room))
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} user has left`))
    }

 })
  
})




server.listen(port, ()=>{
    console.log('listening on port ', port)
})