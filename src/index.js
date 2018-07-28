var db = firebase.firestore();

init();

function init() {
  $('#add-room-btn').on('click',function(){
    postRoom();
  });

  $('#add-message-btn').on('click',function(){
    postMessage();
  });

  $(document).on("click", ".room-item", function(event){
    console.log(event.target.id);
  });

  setRoomListener();
}

function setRoomListener() {
  db.collection("rooms").orderBy("timestamp").onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {
      if (change.type === "added") {
        addRoomDom(change.doc.id, change.doc.data().name);
      }
    });
  });
}

function addRoomDom(id, roomName) {
  $('#rooms').prepend('<li id="' + id +'" class="room-item list-group-item">' + roomName + '</li>');
}

function postRoom() {
  var roomName = getRoomName();
  postRoomData(roomName);
}

function getRoomName() {
  return $('#input-room-name').val();
}

function postRoomData(roomName) {
  db.collection("rooms").add({
    name: roomName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
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
