var db = firebase.firestore();
var unsubscribeMessage;
var selectedRoomId;

init();

function init() {
  $('#add-room-btn').on('click',function(){
    postRoom();
  });

  $('#add-message-btn').on('click',function(){
    postComment();
  });

  $(document).on("click", ".room-item", function(event){
    setRoomTitle($(event.target).text());
    setCommentLitener(event.target.id);
    selectedRoomId = event.target.id;
  });

  setRoomListener();
}

function setRoomTitle(roomName) {
  $('#room-title').text(roomName);
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

function setCommentLitener(roomId) {
  if(unsubscribeMessage) {
    unsubscribeMessage();
  }
  clearComment();
  unsubscribeMessage = db.collection("rooms").doc(roomId).collection("comments").orderBy("timestamp").onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {
      if (change.type === "added") {
        addCommentDom(change.doc.id, change.doc.data().comment);
      }
    });
  });
}

function clearComment() {
  $('#comments').empty();
}

function addCommentDom(id, comment) {
  var dom = '<div class="media border-bottom border-gray pb-2"><img class="mr-3" src="" alt=""><div class="media-body"><h5 class="mt-0">Tetsuya Negishi</h5>' + comment + '</div></div>';
  $('#comments').prepend(dom)
}

function postComment() {
  var comment = getCommentText();
  postCommentData(comment);
  clearInputComment();
}

function getCommentText() {
  return $('#input-comment').val();
}

function postCommentData(commentText) {
  if (!selectedRoomId) {
    return;
  }
  db.collection("rooms").doc(selectedRoomId).collection('comments').add({
    comment: commentText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function clearInputComment() {
  $('#input-comment').val('');
}
