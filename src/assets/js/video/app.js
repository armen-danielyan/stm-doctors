var skylink = new Skylink();
var userName = '';
var minute;
window.endCallPacient = true;

skylink.on('mediaAccessSuccess', function (stream) {
  console.log("mediaAccessSuccess");
  attachMediaStream(document.getElementById("myVideo"), stream);
});

skylink.on('incomingStream', function (peerId, stream, isSelf, peerInfo) {
  if (!isSelf) {
    console.log("addPeerStream");
    var DOMRemoteVideo = document.getElementById("remote_" + peerId);

    if (!DOMRemoteVideo) {
      DOMRemoteVideo = document.createElement('video');
      DOMRemoteVideo.setAttribute("style", "width: 100%; height: 100%;");
      DOMRemoteVideo.autoplay = true;
      DOMRemoteVideo.controls = false;
      DOMRemoteVideo.muted = false;
      DOMRemoteVideo.setAttribute("playsinline", true);
      DOMRemoteVideo.setAttribute("id", "remote_" + peerId);

      var DOMcontainer = document.getElementById("remoteContainer");
      DOMcontainer.appendChild(DOMRemoteVideo);
      skylink.refreshConnection(peerId);
    }
    attachMediaStream(DOMRemoteVideo, stream);
  }
});

skylink.on('streamEnded', function (peerID, peerInfo, isSelf) {
  if (!isSelf) {
    console.log("streamEnded");
    var DOMvideo = document.getElementById("remote_" + peerID);
    if (DOMvideo) {
      var DOMcontainer = document.getElementById("remoteContainer");
      DOMvideo.src = '';
      DOMcontainer.removeChild(DOMvideo);
    }
  }
});

skylink.on('peerLeft', function (peerID) {
  console.log("peerLeft");
  console.log("aaaaaa");
  window.endCallPacient = false;
  console.log(window);
});

// Create our Skylink object
var userList;
var messageList;
var check = false;
var userImage = document.getElementById('userImg').innerHTML;

$(document).ready(function () {
  $(document).on('click', "#name", function () {
    var self = $(this);
    var img = self.find('div.pic-file').css('background-image');
    console.log(img);
    img = img.split('url').join('').split('(').join('').split(')').join().split('"').join('').split(',').join('');
    $('#openPhoto').find('img').attr('src', img);
  });
  $(document).on('click', "#name_recive", function () {
    var self = $(this);
    var img = self.find('div.pic-file').css('background-image');
    console.log(img);
    img = img.split('url').join('').split('(').join('').split(')').join().split('"').join('').split(',').join('');
    $('#openPhoto2').find('img').attr('src', img);
  });

  if (document.getElementById('xx') !== null) {
    console.log(document.getElementById('xx') !== null);
    check = true;
//Get Object by ID
    userList = document.getElementById("UserList");
    messageList = document.getElementById("MessageList");
    var userInputName = document.getElementById("UserNameInput");
    var userInputRoom = document.getElementById("RoomNameInput");
    var userInputMessage = document.getElementById("MessageInput");
    var userInputMessageButton = document.getElementById("MessageInputButton");
    var filePath = document.getElementById("filemy");


//Input Events
    userInputName.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        setName(userInputName.value);
        userInputName.value = '';
      }
    });
    userInputRoom.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        setRoom(userInputRoom.value);
        userInputRoom.value = '';
      }
    });

    function getTextAndSend() {
      if (filePath.hasAttribute('value')) {
        if (filePath.value !== '') {
          userInputMessage.value = filePath.value;
          filePath.value = '';
          document.getElementsByClassName('show_file')[0].style.display = 'none';
        }
      }

      sendMessage(userInputMessage.value);
      userInputMessage.value = '';
    }

    userInputMessage.addEventListener("keypress", function (event) {
      if (event.keyCode === 13)
        getTextAndSend();
    });
    userInputMessageButton.addEventListener("click", function (event) {
      getTextAndSend();
    });
  }

});


skylink.init(config, function (error, success) {
  if (success) {
    var displayName = 'User_' + Math.floor((Math.random() * 1000) + 1);
    skylink.joinRoom({
      userData: displayName,
      audio: true,
      video: true
    });
  } else {
    for (var errorCode in skylink.READY_STATE_CHANGE_ERROR) {
      if (skylink.READY_STATE_CHANGE_ERROR[errorCode] === error.errorCode) {
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
skylink.on('peerJoined', function (peerId, peerInfo, isSelf) {
  console.log("Peer Joined");
});


//User in the room changed his name
skylink.on('peerUpdated', function (peerId, peerInfo, isSelf) {
  console.log("Peer Updated");
});

//User in the room (including us) sent a message
skylink.on('incomingMessage', function (message, peerId, peerInfo, isSelf) {
  var Name = peerInfo.userData + ((isSelf) ? " (You)" : "");
  userName = Name;
  var InputFileChat = document.getElementById("ChatFile").value;
  if (InputFileChat !== '') {
    document.getElementById("MessageInput").value = InputFileChat;
    document.getElementById("ChatFile").value = "";
    addFile(Name, InputFileChat, isSelf);
  } else {
    addMessage(Name, message.content, isSelf);
  }
});


function setName(newName) {
  if (typeof newName !== 'undefined') {
    newName = newName.trim(); //Protection for empty user name
    if (newName !== '') {
      console.log("Change User Name to " + newName);
      skylink.setUserData(newName);
    }
  }
}

function setRoom(newRoom) {
  if (typeof newRoom !== 'undefined') {
    newRoom = newRoom.trim(); //Protection for joining room with empty name
    if (newRoom !== '') {
      console.log("Change Room To " + newRoom);
      skylink.joinRoom(newRoom);
      var div = document.createElement('div');
      div.className = "alert alert-info msg-date";
      div.innerHTML = '<strong>Join Room "' + newRoom + '"</strong>';
      messageList.appendChild(div);
    }
  }
}

function sendMessage(message) {
  if (typeof message !== 'undefined') {
    message = message.trim(); //Protection for empty message
    if (message !== '') {
      skylink.sendP2PMessage(message);
    }
  }
}

function addMessage(user, message, isSelf) {
  var DoctorInfo = document.getElementById('DoctorInfo').innerHTML;
  var PatientImg = document.getElementById('PatientImg').innerHTML;
  var PatientInfo = document.getElementById('PatientInfo').innerHTML;
  var filename = message.split("/");
  var timestamp = new Date();
  minute = timestamp.getMinutes() <= 9 ? '0' + timestamp.getMinutes() : timestamp.getMinutes();
  console.log(filename);

  if (filename[0] === 'https:' && filename[1] === "" && (filename[3] !== 'stm.patient' && filename[3] !== 'stm.doctor')) {
    var div = document.createElement('div');
    div.className = "video-chat-item";
    if (isSelf) {
      div.innerHTML = '<p class="time-info">'
        + '<p class="doctorInfoInCHat">' + DoctorInfo + '</p>' + ' '
        + '<p class="timeInfoInClassChat">' + timestamp.getHours() + ':' + minute + '</p> ' + ' '
        + '</p> ' + ' ' +
        ' <div class="chat-row"><div class="pic-container" style="background-image: url(' + userImage + '); background-size: cover;"></div><div class="message-box writer"><div class="file-container"><a href=' + message + ' target="_blank">' + ' ' + message + '</a></div></div></div>';
    } else {
      div.innerHTML = '<p class="time-info">'
        + '<p class="pacientInfoInCHat">' + PatientInfo + '<p/> ' + ' '
        + '<p class="timeInfoInClassChat">' + timestamp.getHours() + ':' + minute + '</p> ' + ' '
        + '</p> ' + ' ' +
        ' <div class="chat-row"><div class="pic-container" style="background-image: url(' + PatientImg + '); background-size: cover;"></div><div class="message-box receiver"><div class="file-container"><a href=' + message + ' target="_blank">' + ' ' + message + '</a></div></div></div>';
    }
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  } else if (filename[0] === 'https:' && filename[1] === "" && (filename[3] === 'stm.patient' || filename[3] === 'stm.doctor')) {
    addFile(userName, message, isSelf);
  } else {
    var div = document.createElement('div');
    div.className = "video-chat-item";
    if (isSelf) {
      div.innerHTML = '<p class="time-info">' + '<p>' + DoctorInfo + '</p> ' + timestamp.getHours() + ':' + minute + ' </p>' +
        '<div class="chat-row"><div class="pic-container" style="background-image: url(' + userImage + '); background-size: cover;"></div><div class="message-box writer">' + ' ' + message + '</div></div>';
    } else {
      div.innerHTML = '<p class="time-info">' + '<p>' + PatientInfo + '</p> ' + timestamp.getHours() + ':' + minute + ' </p>' +
        '<div class="chat-row"><div class="pic-container"  style="background-image: url(' + PatientImg + '); background-size: cover;"></div><div class="message-box receiver"> ' + '  ' + message + '</div></div>';
    }
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
  }
}

function addFile(user, message, isSelf) {
  var DoctorInfo = document.getElementById('DoctorInfo').innerHTML;
  var PatientImg = document.getElementById('PatientImg').innerHTML;
  var PatientInfo = document.getElementById('PatientInfo').innerHTML;

  var timestamp = new Date();
  minute = timestamp.getMinutes() <= 9 ? '0' + timestamp.getMinutes() : timestamp.getMinutes();

  var div = document.createElement('div');
  div.className = "video-chat-item";
  if (isSelf) {
    div.innerHTML = '<p class="time-info">' + '<p>' + DoctorInfo + '</p>' + timestamp.getHours() + ':' + minute + '</p> <div class="chat-row"><div class="pic-container"style="background-image: url(' + userImage + '); background-size: cover;"></div><a id="name"  data-toggle="modal" data-target="#openPhoto" ><div class="pic-file" style="background-image: url(' + message + '); font-size: 0">Отправлено фото - ' + message + '<img src="assets/img/icons/search.svg" class="search-icon"></div></a></div>';
  }
  else {
    div.innerHTML = '<p class="time-info">' + '<p>' + PatientInfo + '</p>' + timestamp.getHours() + ':' + minute + '</p>  <div class="chat-row"><div class="pic-container"style="background-image: url(' + PatientImg + '); background-size: cover;"></div><a id="name_recive"  data-toggle="modal" data-target="#openPhoto2" ><div class="pic-file" style="background-image: url(' + message + '); font-size: 0">Отправлено фото - ' + message + '<img src="assets/img/icons/search.svg" class="search-icon"></div></a></div>';
  }
  messageList.appendChild(div);
  messageList.scrollTop = messageList.scrollHeight;
}
