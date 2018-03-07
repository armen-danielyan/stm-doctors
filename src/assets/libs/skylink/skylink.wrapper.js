var SkylinkWrapper = {
  skylink: undefined,

  /**
   * Initializes the SkylinkWrapper. Internally, it executes
   * a command of queries to initialize the Skylink events.
   *
   * @param options Attributes to initialize Skylink framework.
   */
  init: function (options) {
    window.endCallPacient = true;
    this.initWindowConfigs(options);
    this.instantiateSkylinkFramework();
    this.initOnMediaAccessSuccessEvent();
    this.initIncomingStreamEvent();
    this.initStreamEndedEvent();
    this.initPeerLeftEvent();
    this.initPeerJoinEvent();
    this.start();
    this.initIncomingMessage();
    this.initGetMessage();

  },

  /**
   * It adds the options to the window. This is needed
   * by the Skylink framework.
   *
   * @params options Options to initialize Skylink framework.
   */
  initWindowConfigs: function (options) {
    console.log('Room ID', options.defaultRoom);
    window.config = {
      appKey: options.appKey || "",
      defaultRoom: options.defaultRoom || "default_room",
      enableDataChannel: options.enableDataChannel || true,
      enableIceTrickle: options.enableDataChannel || true,
      audioFallback: options.audioFallback || true,
      forceSSL: options.forceSSL || true,
      audio: options.audio || true,
      video: options.video || true,
      localVideoEl: options.localVideoEl || "localVideoEl",
      remoteVideoEl: options.remoteVideoEl || "remoteVideoEl",
      credentials: {
        duration: options.duration,
        startDateTime: options.startDateTimeStamp,
        credentials: options.credentials
      }
    };
  },

  instantiateSkylinkFramework: function () {
    skylink = new Skylink();
  },

  /**
   * It initializes the "mediaAccessSuccess" event.
   */
  initOnMediaAccessSuccessEvent: function () {
    skylink.on('mediaAccessSuccess', function (stream) {
      attachMediaStream(document.getElementById(window.config.localVideoEl), stream);
      console.log("mediaAccessSuccess");
    });
  },

  /**
   * It initializes the "incomingStream" event.
   */
  initIncomingStreamEvent: function () {
    skylink.on('incomingStream', function (peerId, stream, isSelf, peerInfo) {

      console.log("incomingStream isSelf=" + isSelf);

      var currentEl = isSelf ? window.config.localVideoEl : window.config.remoteVideoEl;

      var DOMVideo = document.getElementById(currentEl);

      DOMVideo.autoplay = true;
      DOMVideo.controls = false;
      DOMVideo.muted = isSelf;
      DOMVideo.setAttribute('playsinline', true);

      setTimeout(function () {
        DOMVideo.removeAttribute('controls');
        if (!isSelf) {
          skylink.refreshConnection(peerId);
          DOMVideo.onclick = function () {
            skylink.refreshConnection(peerId);
          };
          console.log('attachMediaStream *********************' + peerId);
          attachMediaStream(DOMVideo, stream);
        }
      }, 100);

    });
  },

  /**
   * It initializes the "streamEnded" event.
   */
  initStreamEndedEvent: function () {
    skylink.on('streamEnded', function (peerID, peerInfo, isSelf) {
      if (!isSelf) {
        console.log("streamEnded");
        var DOMvideo = document.getElementById(window.config.remoteVideoEl);

        try {
          DOMvideo.src = '';
        } catch (error) {
          console.log(error);
        }
      }
    });
  },

  /**
   * It initializes the "peerLeft" event.
   */
  initPeerLeftEvent: function () {
    skylink.on('peerLeft', function (peerID) {
      console.log("peerLeft");
      var DOMvideo = document.getElementById(window.config.remoteVideoEl);
      try {
        DOMvideo.src = '';
        window.endCallPacient = false;
      } catch (error) {
        console.log(error);
      }
    });
  },

  /**
   * It initializes the "peerJoined" event.
   */
  initPeerJoinEvent: function () {
    skylink.on('peerJoined', function (peerId, peerInfo, isSelf) {
      console.log("Peer Joined");
    });
  },

  /**
   * It initializes the "incomingMessage" event.
   */
  initIncomingMessage: function () {
    var that = this;
    skylink.on('incomingMessage', function (message, peerId, peerInfo, isSelf) {
      var Name = peerInfo.userData + ((isSelf) ? " (You)" : "");
      userName = Name;
      var InputFileChat = document.getElementById("ChatFile").value;

      if (InputFileChat !== '') {
        document.getElementById("MessageInput").value = InputFileChat;
        document.getElementById("ChatFile").value = "";
        that.addFile(Name, that.textDecode(message.content), isSelf);
      } else {
        that.addMessage(Name, that.textDecode(message.content), isSelf);
      }

    });
  },

  /**
   * It executes the init function of instance of Skylink framework.
   */
  start: function () {
    skylink.init(window.config, function (error, success) {
      console.log('windows**********');
      console.log(window.config);
      console.log(config + 'config**********');
      console.log(config);
      if (success)
        skylink.joinRoom({
          audio: window.config.audio,
          video: window.config.video
        });
    });
  },


  initGetMessage: function () {
    var that = this;
    var userInputMessage = document.getElementById("MessageInput");
    var userInputMessageButton = document.getElementById("MessageInputButton");

    $(document).ready(function () {
      $(document).on('click', "#name", function () {
        var self = $(this);
        console.log(self);
        var img = self.find('div.pic-file').css('background-image');
        console.log('ImG****');
        console.log(img);
        img = img.replace(/url|[\(\)"']/ig, '');
        console.log("**************/");
        console.log(img);
        $('#openPhoto').find('img').attr('src', img);
      });

      $(document).on('click', "#name_recive", function () {
        var self = $(this);
        var img = self.find('div.pic-file').css('background-image');
        console.log(img);
        img = img.replace(/url|[\(\)"']/ig, '');
        $('#openPhoto2').find('img').attr('src', img);
      });
    });

    userInputMessage.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        if (userInputMessage.value !== '') {
          that.sendMessage(userInputMessage.value);
          userInputMessage.value = '';
        }
      }

    });
    userInputMessageButton.addEventListener("click", function (event) {
      if (userInputMessage.value !== '') {
        that.sendMessage(userInputMessage.value);
        userInputMessage.value = '';
      }
    });

    userInputMessage.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        that.getTextAndSend();
      }
    });
    userInputMessageButton.addEventListener("click", function (event) {
      that.getTextAndSend();
    });


  },

  sendMessage: function (message) {
    skylink.sendP2PMessage(this.textEncode(message));
  },

  getTextAndSend: function () {
    var userInputMessage = document.getElementById("MessageInput");
    var filePath = document.getElementById("filemy");

    if (filePath.hasAttribute('value')) {
      if (filePath.value !== '') {
        userInputMessage.value = filePath.value;
        filePath.value = '';
        document.getElementsByClassName('show_file')[0].style.display = 'none';
        this.sendMessage(userInputMessage.value);
      }

    }
    userInputMessage.value = '';
  },

  addMessage: function (user, message, isSelf) {
    var messageList = document.getElementById("MessageList");
    var DoctorInfo = document.getElementById('DoctorInfo').innerHTML;
    var PatientImg = document.getElementById('PatientImg').innerHTML;
    var PatientInfo = document.getElementById('PatientInfo').innerHTML;
    var userImage = document.getElementById('userImg').innerHTML;
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
      this.addFile(userName, message, isSelf);
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
  },

  addFile: function (user, message, isSelf) {
    var messageList = document.getElementById("MessageList");
    var DoctorInfo = document.getElementById('DoctorInfo').innerHTML;
    var PatientImg = document.getElementById('PatientImg').innerHTML;
    var PatientInfo = document.getElementById('PatientInfo').innerHTML;
    var userImage = document.getElementById('userImg').innerHTML;

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
  },



  textDecode: function(message) {
    var decodedMessage = '';
    var msg = message.split('\\u');
    for (var i = 1; i < msg.length; i++) {
      decodedMessage += String.fromCharCode(msg[i]);
    }
    return decodedMessage;
  },

  textEncode: function(message) {
    var encodedMessage = '';
    for (var i = 0; i < message.length; i++) {
      encodedMessage += '\\u' + message[i].charCodeAt(0);
    }
    return encodedMessage;
  }

};

