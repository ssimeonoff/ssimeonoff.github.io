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
gamesRef.on('value', (snap) => {
  const val = snap.val()
  games = Object.keys(val)
    .map(key => val[key])


//push data to the html
document.getElementById("games2p-aphrodite").innerHTML = generateGameStats(2, "APHRODITE");
document.getElementById("games3p-aphrodite").innerHTML = generateGameStats(3, "APHRODITE");
document.getElementById("games4p-aphrodite").innerHTML = generateGameStats(4, "APHRODITE");
document.getElementById("games5p-aphrodite").innerHTML = generateGameStats(5, "APHRODITE");

document.getElementById("games2p-arcadian").innerHTML = generateGameStats(2, "ARCADIAN COMMUNITIES");
document.getElementById("games3p-arcadian").innerHTML = generateGameStats(3, "ARCADIAN COMMUNITIES");
document.getElementById("games4p-arcadian").innerHTML = generateGameStats(4, "ARCADIAN COMMUNITIES");
document.getElementById("games5p-arcadian").innerHTML = generateGameStats(5, "ARCADIAN COMMUNITIES");

document.getElementById("games2p-arklight").innerHTML = generateGameStats(2, "ARKLIGHT");
document.getElementById("games3p-arklight").innerHTML = generateGameStats(3, "ARKLIGHT");
document.getElementById("games4p-arklight").innerHTML = generateGameStats(4, "ARKLIGHT");
document.getElementById("games5p-arklight").innerHTML = generateGameStats(5, "ARKLIGHT");

});

function generateGameStats (players, corporationName) {
  //returning html formatted text

  //filtering the games per players' count
  gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  //calculated played and won games per corporation
  playedGames = [];
  for (i = 0; i < gamesPerPlayers.length; i++) {
    var corpsArray = gamesPerPlayers[i]["corporations"]; //getting the corporations array
    if (corpsArray == undefined) {} //to chatch firebase errors if the array is undefined
    else {
      if (corpsArray.indexOf(corporationName) > -1) {
        //if the corporation is present in the corporatins' arrayAwards
        //add this game to the played games
        playedGames.push(gamesPerPlayers[i]);
        }
      }
    }
  totalGames = playedGames.length;
  totalWins = 0;

  for (i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = playedGames[i]["corporations"];
    var scoresArray = playedGames[i]["scores"];
    corpIndex = corpsArray.indexOf(corporationName); //find the corporation index
    //findind the winning score index
    winnerIndex = indexOfMax(scoresArray);
    //counting a win if corporation and winning score indexes match
    if (winnerIndex == corpIndex) {totalWins++;}
  }

  if (totalWins==0 && totalGames==0) {
    //capturing division by 0
    return "<div class='ratio'>" + totalWins + "/" + totalGames + "</div>" + 0 +"<span style='font-size:12px;'>%</span>"}
  else {
    return  "<div class='ratio'>" + totalWins + "/" + totalGames + "</div>" + Math.round(totalWins*100/totalGames) +"<span style='font-size:12px;'>%</span>";}
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
