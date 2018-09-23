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

  gamesMap = games.filter(function(el) {
    return el.map == "THARSIS"
  });

  console.log("ok");
  newArray2 = generateGameStats(games2p, "APHRODITE");
})

function generateGameStats (gamesPerPlayers, corporationName) {
  //returning html formatted text
  newArray = [];
  for (i = 0; i < gamesPerPlayers.length; i++) {
    var corpsArray = gamesPerPlayers[i]["corporations"];
    if (corpsArray == undefined) {} //to chatch firebase errors
    else {
      if (corpsArray.indexOf(corporationName) > -1) {newArray.push(games2p[i]);}
      }
    }
  totalGames = newArray.length;
  totalWins = 0;
  console.log(newArray);
  for (i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = newArray[i]["corporations"];
    var scoresArray = newArray[i]["scores"];
    winCorpIndex = corpsArray.indexOf(corporationName);
    winScoreIndex = 0;
    previousScore = 0;
    //findind the winning score index
    //for (j = 0; 0 < scoresArray.length; j++) {
      //if (scoresArray[j] > previousScore) {winScoreIndex = j; previousScore = scoresArray[j]; console.log(j);}
    //}
  }
}
