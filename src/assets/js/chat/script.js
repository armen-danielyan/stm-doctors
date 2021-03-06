// Create our Skylink object
var SkylinkDemo = new Skylink();
var userList;
var messageList;
var check = false;
var userName = '';


$( document ).ready(function() {

  if(document.getElementById('xx') !== null){
    console.log(document.getElementById('xx') !== null);
    check = true;
//Get Object by ID
userList = document.getElementById("UserList");
messageList = document.getElementById("MessageList");
var userInputName = document.getElementById("UserNameInput");
var userInputRoom = document.getElementById("RoomNameInput");
var userInputMessage = document.getElementById("MessageInput");
var userInputMessageButton = document.getElementById("MessageInputButton");




//Input Events
userInputName.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    setName(userInputName.value);
    userInputName.value = '';
  }
});
userInputRoom.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    setRoom(userInputRoom.value);
    userInputRoom.value = '';

  }
});

function getTextAndSend() {
  sendMessage(userInputMessage.value);
  userInputMessage.value = '';
}
userInputMessage.addEventListener("keypress", function(event) {
  if (event.keyCode == 13)
    getTextAndSend();
});
userInputMessageButton.addEventListener("click", function(event) {
  getTextAndSend();
});
  }

});


SkylinkDemo.init(config, function (error, success) {
  if (success) {
    var displayName = 'User_' + Math.floor((Math.random() * 1000) + 1);
    SkylinkDemo.joinRoom({
      userData: displayName,
      audio: false,
      video: false
    });
    // var div = document.createElement('div');
    // div.className = "alert alert-info msg-date";
    // div.innerHTML = '<strong>Join Room "' + success.selectedRoom + '"</strong>';

    // messageList.appendChild(div);

  } else {
    for (var errorCode in SkylinkDemo.READY_STATE_CHANGE_ERROR) {
      if (SkylinkDemo.READY_STATE_CHANGE_ERROR[errorCode] === error.errorCode) {
        var div = document.createElement('div');
        div.className = "alert alert-danger msg-date";
        div.innerHTML = '<strong>Impossible to connect to Skylink: ' + errorCode + '</strong>';
        messageList.appendChild(div);
        break;
      }
    }
  }
});

//New User in the room, we add it to the user list
SkylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
  console.log("Peer Joined");
  var div = document.createElement('div');
  div.className = "media conversation";
  div.id = "User_" + peerId;
  div.innerHTML = '<div class="media-body">' +
    '<h5 id="UserTitle_' + peerId + '" class="media-heading">' + peerInfo.userData + ((isSelf) ? " (You)" : "") + '</h5>' +
    '<small>' + peerId + '</small>' +
    '</div>';
  userList.appendChild(div);
});


//User in the room changed his name
SkylinkDemo.on('peerUpdated', function(peerId, peerInfo, isSelf) {
  document.getElementById("UserTitle_" + peerId).innerHTML = peerInfo.userData + ((isSelf) ? " (You)" : "");
});

//User in the room left
SkylinkDemo.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var elm = document.getElementById("User_" + peerId);
  if (elm) {
    elm.remove();
  } else {
    console.error('Peer "' + peerId + '" DOM element does not exists');
  }
});

//User in the room (including us) sent a message
SkylinkDemo.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {

  var Name = peerInfo.userData + ((isSelf) ? " (You)" : "");
  userName = Name;
  var InputFileChat =  document.getElementById("ChatFile").value;
  if(InputFileChat !== ''){
    document.getElementById("MessageInput").value = InputFileChat;
    document.getElementById("ChatFile").value = "";
    // document.getElementById("MessageInputButton").click();
    addFile(Name,InputFileChat,isSelf);
  }else{
    addMessage(Name, message.content,isSelf);
  }

});



  function setName(newName) {
    if (newName != undefined) {
      newName = newName.trim(); //Protection for empty user name
      if (newName != '') {
        console.log("Change User Name to " + newName);
        SkylinkDemo.setUserData(newName);
      }
    }
  }

  function setRoom(newRoom) {
    if (newRoom != undefined) {
      newRoom = newRoom.trim(); //Protection for joining room with empty name
      if (newRoom != '') {
        console.log("Change Room To " + newRoom);
        SkylinkDemo.joinRoom(newRoom);
        var div = document.createElement('div');
        div.className = "alert alert-info msg-date";
        div.innerHTML = '<strong>Join Room "' + newRoom + '"</strong>';
        messageList.appendChild(div);
      }
    }

  }

  function sendMessage(message) {
    if (message != undefined) {
      message = message.trim(); //Protection for empty message
      if (message != '') {
        SkylinkDemo.sendP2PMessage(message);
      }
    }
  }

function addMessage(user, message,isSelf) {

  var filename = message.split("/");

  if(filename[0] === 'https:'  && filename[1] === "" && filename[3] !=='stm.doctor'){
    var timestamp = new Date();
    if (isSelf) {
      var div = document.createElement('div');
      div.className = "video-chat-item ";
      div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p><div class="chat-row"><div class="pic-container"></div><div class="message-box writer"><div class="file-container"><a href=' + message + ' target="_blank">' + message + '</a></div></div></div>';
      messageList.appendChild(div);
      messageList.scrollTop = messageList.scrollHeight;
    }
    else {
      var div = document.createElement('div');
      div.className = "video-chat-item ";
      div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p><div class="chat-row"><div class="pic-container"></div><div class="message-box receiver"><div class="file-container"><a href=' + message + ' target="_blank">' + message + '</a></div></div></div>';
      messageList.appendChild(div);
      messageList.scrollTop = messageList.scrollHeight;

    }
    return;
  }

  if (filename[0] === 'https:' && filename[1] === "" && filename[3] ==='stm.doctor') {
    addFile(userName, message, isSelf);
    return;
  } else {

  var InputFileChat = document.getElementById("ChatFile").value;
  var timestamp = new Date();
  if (isSelf) {
    var div = document.createElement('div');
    div.className = "video-chat-item ";
    div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p><div class="chat-row"><div class="pic-container"></div><div class="message-box writer">' + message + '</div></div>';
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  }
  else {
    var div = document.createElement('div');
    div.className = "video-chat-item ";
    div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p><div class="chat-row"><div class="pic-container"></div><div class="message-box receiver">' + message + '</div></div>';
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  }
}

  }


function addFile(user, message,isSelf) {

  var filename =  message.split("/");

  var timestamp = new Date();
  if(isSelf){

    var div = document.createElement('div');
    div.className = "video-chat-item ";
    div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p> <div class="chat-row"><div class="pic-container"></div><a data-toggle="modal" data-target="#openPhoto" ><div class="pic-file" style="background-image: url('+ message +')"><img src="assets/img/icons/search.svg" class="search-icon"></div></a></div>';
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  }
  else{
    var div = document.createElement('div');
    div.className = "video-chat-item ";
    div.innerHTML = '<p class="time-info">'+ timestamp.getDate()+ '.'+ timestamp.getMonth()+1 + '.'+ timestamp.getFullYear() + ' ' + '-' + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + '</p>  <div class="chat-row"><div class="pic-container"></div><a data-toggle="modal" data-target="#openPhoto" ><div class="pic-file" style="background-image: url('+ message +')"><img src="assets/img/icons/search.svg" class="search-icon"></div></a></div>';
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  }
}



