var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};
firebase.initializeApp(config);
// Reference Games collection
var gamesRef = firebase.database().ref("games-solo");
//get the games as an array
gamesRef.on('value', (snap) => {
  const val = snap.val()
  games = Object.keys(val)
    .map(key => val[key])
///////////////////////////////////////////////////////////////////////////////

  compareTime()

});

function getUTCtime() {
  now = Math.floor((new Date()).getTime() / 1000)
}

function compareTime() {
  now = Math.floor((new Date()).getTime() / 1000);
  timestamp = parseInt(games[games.length-1]["timestamp"]);
  time = Math.floor((now - timestamp)/60); //get the minutes
  if (time < 2) {console.log("NOW")}
  if (time >= 2) {console.log(time + " minutes ago")}
  if (time >= 60) {
     hours = Math.floor(time/60)
     console.log(hours + " hours ago")}
}
