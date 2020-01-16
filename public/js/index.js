  var socket = io();

     socket.on('connect', function() {
         console.log(' Connected to server')

         
         
         socket.emit('createMessage', {
             from:'Leo',
             text:'Wassap mga tanga'
         })

         socket.on('newMessage', function(message) {
             console.log(message)
         })
         
     })


    
     socket.on('disconnect', function() {
        console.log('Disconnected from server')
     })


