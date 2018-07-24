function init() {
  $('#add-room-btn').on('click',function(){
    addRoom();
  });

  $('#add-message-btn').on('click',function(){
    console.log('add-message');
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