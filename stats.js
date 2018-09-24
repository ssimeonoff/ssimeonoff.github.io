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
document.getElementById("games2p-credicor").innerHTML = generateGameStats(2, "CREDICOR");
document.getElementById("games3p-credicor").innerHTML = generateGameStats(3, "CREDICOR");
document.getElementById("games4p-credicor").innerHTML = generateGameStats(4, "CREDICOR");
document.getElementById("games5p-credicor").innerHTML = generateGameStats(5, "CREDICOR");

document.getElementById("games2p-ecoline").innerHTML = generateGameStats(2, "ECOLINE");
document.getElementById("games3p-ecoline").innerHTML = generateGameStats(3, "ECOLINE");
document.getElementById("games4p-ecoline").innerHTML = generateGameStats(4, "ECOLINE");
document.getElementById("games5p-ecoline").innerHTML = generateGameStats(5, "ECOLINE");

document.getElementById("games2p-helion").innerHTML = generateGameStats(2, "HELION");
document.getElementById("games3p-helion").innerHTML = generateGameStats(3, "HELION");
document.getElementById("games4p-helion").innerHTML = generateGameStats(4, "HELION");
document.getElementById("games5p-helion").innerHTML = generateGameStats(5, "HELION");

document.getElementById("games2p-mining").innerHTML = generateGameStats(2, "MINING GUILD");
document.getElementById("games3p-mining").innerHTML = generateGameStats(3, "MINING GUILD");
document.getElementById("games4p-mining").innerHTML = generateGameStats(4, "MINING GUILD");
document.getElementById("games5p-mining").innerHTML = generateGameStats(5, "MINING GUILD");

document.getElementById("games2p-interplan").innerHTML = generateGameStats(2, "INTERPLAN. CINEMATICS");
document.getElementById("games3p-interplan").innerHTML = generateGameStats(3, "INTERPLAN. CINEMATICS");
document.getElementById("games4p-interplan").innerHTML = generateGameStats(4, "INTERPLAN. CINEMATICS");
document.getElementById("games5p-interplan").innerHTML = generateGameStats(5, "INTERPLAN. CINEMATICS");

document.getElementById("games2p-teractor").innerHTML = generateGameStats(2, "TERACTOR");
document.getElementById("games3p-teractor").innerHTML = generateGameStats(3, "TERACTOR");
document.getElementById("games4p-teractor").innerHTML = generateGameStats(4, "TERACTOR");
document.getElementById("games5p-teractor").innerHTML = generateGameStats(5, "TERACTOR");

document.getElementById("games2p-saturn").innerHTML = generateGameStats(2, "SATURN SYSTEMS");
document.getElementById("games3p-saturn").innerHTML = generateGameStats(3, "SATURN SYSTEMS");
document.getElementById("games4p-saturn").innerHTML = generateGameStats(4, "SATURN SYSTEMS");
document.getElementById("games5p-saturn").innerHTML = generateGameStats(5, "SATURN SYSTEMS");

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
  sum = 0;
  for (i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = playedGames[i]["corporations"];
    var scoresArray = playedGames[i]["scores"];
    corpIndex = corpsArray.indexOf(corporationName); //find the corporation index
    //findind the winning score index
    winnerIndex = indexOfMax(scoresArray);
    //counting a win if corporation and winning score indexes match
    if (winnerIndex == corpIndex) {totalWins++;}
    //calculating the average score
     if (parseInt(scoresArray[corpIndex])>0) {
     sum += parseInt(scoresArray[corpIndex]);
   }
  }
  //calculating the average score
  avg = sum/totalGames;

  if (totalWins==0 && totalGames==0) {
    //capturing division by 0
    return "<div class='ratio'>" + totalWins + "/" + totalGames + "</div><div>" + 0 +"<span style='font-size:12px;'>P</span>  " + 0 +"<span style='font-size:12px;'>%</span></div>"}
  else {
    return  "<div class='ratio'>" + totalWins + "/" + totalGames + "</div><div>"+ Math.round(avg) +"<span style='font-size:12px;'>P</span> " + Math.round(totalWins*100/totalGames) +"<span style='font-size:12px;'>%</span></div>";}
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
