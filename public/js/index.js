  var socket = io();

     socket.on('connect', function() {
         console.log(' Connected to server')
     })



    socket.on('newMessage', function(message) {
        console.log('New Message', message)


      $("#messages").append(`<div class="flex mb-2">
        <div class="rounded py-2 px-3" style="background-color: #FFFF">
            <p class="text-md text-teal">
                ${message.from}
            </p>
            <p class="text-sm mt-1">
            ${message.text}
            </p>
            <p class="text-right text-xs text-grey-dark mt-1">
            ${message.createdAt}
            </p>
            </div>
        </div>`)
        
    })


    
     socket.on('disconnect', function() {
        console.log('Disconnected from server')
     })


     socket.on('newLocationMessage', function(message) { 
        $("#messages").append(`<div class="flex mb-2">
        <div class="rounded py-2 px-3" style="background-color: #FFE06F">
            <p class="text-sm text-teal">
                ${message.from}
            </p>
            <p class="text-sm mt-1">
            <a target="_blank" href=${message.url}> ${message.url}<a/> </li>
            </p>
            <p class="text-right text-xs text-grey-dark mt-1">
            ${message.createdAt}
            </p>
            </div>
        </div>`)
     })


    $('#send-message').on('click', function(e){
        e.preventDefault();
          
        var messageTextBox = $('#message')        
        if(messageTextBox.val() === '')  {
          return alert('Cannot send message with blank value')
        }
        socket.emit('createMessage', {
            from:'User',
            text:messageTextBox.val()
        },function(){
            messageTextBox.val('')
            console.log('got it')
        })
    })
    
    var locationButton = $('#send-location')

     locationButton.on('click', function(e){
       e.preventDefault();

       locationButton.attr('disabled', 'disabled').text('Sending Location.....')
       if(!navigator.geolocation) { 
         return alert('Geolocation not supported by your browser')
       }

       navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled', 'disabled').text('Send Location')

        socket.emit('createLocation', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
       }, function(){
        locationButton.removeAttr('disabled', 'disabled').text('Send Location')
           alert('Unable to fetch location')
       })

    
    })

