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

  socket.emit('newEmail', {
    from:'mike.com',
    text:'Hey what is going on',
    createdAt: 123
  });

   
  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })
      


  socket.on('createMessage', (message) => {
    console.log('New message', message)
  })

  socket.emit('newMessage', {
    from:'Jon', 
    text:'See you then',
    createdAt: new Date().getTime().toString()
  })

})
 





server.listen(port, ()=>{
    console.log('listening on port ', port)
})