 var socket = io();
  
  socket.on('connect', function() {
    console.log(' Connected to server')

    var params = $.deparam(window.location.search)

    socket.emit('join',params, function(err){
      if(err) {
         alert(err)
         window.location.href="/"
      }
      else {
         console.log('no error')
      }
    })
  })

  socket.on('updateUserList', function(users) {
      console.log('Users List', users)
      var usersList = $("#users-list")
      users.forEach(function(user){
          usersList.append(`<li>${user}</li>`)
      })
  })

function scrollToBottom(){
  var messages = $("#messages");
  var newMessage = messages.children('div:last-child')

  var clientHeight  = messages.prop('clientHeight')
  var scrollTop  = messages.prop('scrollTop')
  var scrollHeight  = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight)
  }

}

socket.on('newMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm a')

     var template = $("#message-template").html()
     var html = Mustache.render(template, {message:{
         text:message.text,
         from:message.from,
         createdAt:formattedTime
     }})
     $("#messages").append(html)
    
})



socket.on('disconnect', function() {
    console.log('Disconnected from server')
})


socket.on('newLocationMessage', function(message) { 

    console.log(message.url)
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $("#message-location-template").html()
    var html = Mustache.render(template, {message:{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    }})
    $("#messages").append(html)
   
})


$('#send-message').on('click', function(e){
    e.preventDefault();
    
    sendMessage()
})



$(document).on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage()
        
    }
});


function sendMessage() {
    scrollToBottom()
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
}



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



    // $("#message").keypress(function() {

    //     console.log('qweqeqe')
    //     // alert('qwewqeqe')
    //     // socket.emit('userIsTyping', {
    //     //     user:'LeonardoLouie'
    //     // })
    // })

    // $('#message').on('keydown',function(){
    //    alert('qweqeqe')
    // })

    socket.on("recieveUserTyping", function(user){
       console.log()
        var template = $("#typing-template").html()
        var html = Mustache.render(template)
        $("#messages").append(html)   
    });

    
    
})

