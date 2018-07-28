var db = firebase.firestore();

init();

function init() {
  $('#add-room-btn').on('click',function(){
    postRoom();
  });

  $('#add-message-btn').on('click',function(){
    postMessage();
  });

  setRoomListener();
}

function setRoomListener() {
  db.collection("rooms").onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {
      if (change.type === "added") {
        addRoomDom(change.doc.data().name);
      }
    });
  });
}

function addRoomDom(roomName) {
  $('#rooms').prepend('<li class="list-group-item">' + roomName + '</li>');
}

function postRoom() {
  getRoomName();
  postRoomData();
}

function getRoomName() {
  console.log('room name');
}

function postRoomData(roomName) {
  console.log('post room')
}

function addMessage() {
  getMessageText();
  postMessage();
}

function getMessageText() {
  console.log('room name');
}

function postMessage(messageText) {
  console.log('post room')
}
