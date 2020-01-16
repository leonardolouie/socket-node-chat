  var socket = io();

     socket.on('connect', function() {
         console.log(' Connected to server')
     })



    socket.on('newMessage', function(message) {
        console.log('New Message', message)


      $("#messages").append(`<li>${message.from}: ${message.text} </li>`)
        
    })


    
     socket.on('disconnect', function() {
        console.log('Disconnected from server')
     })


    $('#message-form').on('submit', function(e){
        e.preventDefault();
          
        socket.emit('createMessage', {
            from:'User',
            text:jQuery('#message').val()
        },function(){
            console.log('got it')
        })
    })


