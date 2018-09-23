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
var gamesRef = firebase.database().ref("games-production");
//get the games as an array
var r1 = firebase.database().ref('games-production')
r1.on('value', (snap) => {
  const val = snap.val()
  const games = Object.keys(val)
    .map(key => val[key])

  games2p = games.filter(function(el) {
    return el.players == 2
  });

  gamesWithCorp = games.filter(function(el) {
    return el.corporations == ["APHRODITE", "CREDICOR"]
  });
  console.log(games);

  console.log(gamesWithCorp);

   console.log(games.find("ECOLINE"));

})

function generateGameStats (gamesPerPlayers, corporations) {
  //returning html formatted text


}
