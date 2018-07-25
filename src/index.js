function init() {
  $('#add-room-btn').on('click',function(){
    addRoom();
  });

  $('#add-message-btn').on('click',function(){
    postMessage();
  });
}

function addRoom() {
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
