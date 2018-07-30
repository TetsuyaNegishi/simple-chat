var db = firebase.firestore();
var auth = firebase.auth();
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

  $(document).on("click", "#sign-in", function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  })

  $(document).on("click", "#sign-out", function() {
    auth.signOut();
  })

  setRoomListener();
  setAuthChangeListener();
}

// postRoom
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

// postComment
function postComment() {
  if (!selectedRoomId || !auth.currentUser) {
    return;
  }
  var comment = getCommentText();
  postCommentData(comment);
  clearInputComment();
}

function getCommentText() {
  return $('#input-comment').val();
}

function postCommentData(commentText) {
  var currentUser = auth.currentUser;
  db.collection("rooms").doc(selectedRoomId).collection('comments').add({
    comment: commentText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    user: {
      name: currentUser.displayName,
      photoUrl: currentUser.photoURL
    }
  });
}

function clearInputComment() {
  $('#input-comment').val('');
}

// setRoomTitle
function setRoomTitle(roomName) {
  $('#room-title').text(roomName);
}

// setCommentLitener
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

// setRoomListener
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

function setAuthChangeListener() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      $('#sign-in').attr('hidden', true);
      $('#sign-out').attr('hidden', false);
    } else {
      $('#sign-in').attr('hidden', false);
      $('#sign-out').attr('hidden', true);
    }
  });
}
