//var adaRef = firebase.database().refFromURL("https://runs-with-scissors.firebaseio.com/player1");
//DOM shortcuts 
var namePlate = document.getElementById('namePlate');
var box1 = document.getElementById('user1');
var box2 = document.getElementById('arena');
var box3 = document.getElementById('user2');
var messageArea = document.getElementById('messageBox');
var messageInput = document.getElementById('message');

var origin = "";
var name = "";
var handler;
var isUserSet = false;
var json = "";
$(document).ready(function () {
  console.log("ready!");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIIwXS7fpxWKqDCnyRaImA6MOTE4NreC0",
    authDomain: "runs-with-scissors.firebaseapp.com",
    databaseURL: "https://runs-with-scissors.firebaseio.com",
    projectId: "runs-with-scissors",
    storageBucket: "runs-with-scissors.appspot.com",
    messagingSenderId: "39797552888"
  };
  firebase.initializeApp(config);
  origin = firebase.database();

  Initialize();
  //starts a constant update of our locally stored JSON array
  origin.ref().on('value', function (snapshot) {
    UpdateSnapshot(snapshot);
  });
});

// This function updates a localy stored info in JSON and updates whenever anything changes
function UpdateSnapshot(snapshot) {
  json = snapshot.toJSON();
}

//On submition of our name
$(document).on('submit', '#nameForm', function (e) {
  e.preventDefault();
  PlayerSet();
  x = $("#nameText").val();
  console.log(x);
  $("#nameText").val("");

})

//wow this one does a lot......
function PlayerSet() {
  //if lobby is filled then oh well
  if (json.player1.joined && json.player2.joined) {
    return console.log("Lobby Filled");
  } else if (json.player1.joined == false) {
    //if player1 isnt selected then set everything to blank and assign this player player 1
    player = 1;
    origin.ref('player1/').set({
      //assign user player1 and reset wins/losses
      joined: true,
      wins: 0,
      losses: 0,
    })
    origin.ref('player1/').onDisconnect().set({
      //when closing window set joined to false and reset wins and losses
      joined: false,
      wins: 0,
      losses: 0,
    })
  } else if (json.player2.joined == false) {
    //if player one is taken and player2 isnt then assign to player2 and reset wins/losses
    player = 2;
    origin.ref('player2/').set({
      joined: true,
      wins: 0,
      losses: 0,
    })
    origin.ref('player1/').onDisconnect().set({
      //when closing window set joined to false and reset wins and losses
      joined: false,
      wins: 0,
      losses: 0,
    })
  }
}

//okay next up we need to make the game checks

function Disconect(params) {
  console.log();
}

function Initialize(cloud) {
  var ref = origin.ref();
  ref.once("value").then(function (snapshot) {

  })
}