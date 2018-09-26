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
///////////////////////////////////////////////////////////////////////////////

//push data to the html
  pushTheData();
});

function generateGameStats (players, corporationName) {
  //returning html formatted text
  console.log("hi");
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
    return  "<div class='points'>--</div>"+
            " <div class='winrate'>- <span style='font-size:12px;'>%</span></div>" +
            "<div class='ratio'> -/- </div>"
            ;}
  else {
    return  "<div class='points'>"+ Math.round(avg) +"</div>"+
            " <div class='winrate'>" + Math.round(totalWins*100/totalGames) +"<span style='font-size:12px;'>%</span></div>" +
            "<div class='ratio'>" + totalWins + "/" + totalGames + "</div>"
            ;}
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




function pushTheData() {
  //standard
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

  document.getElementById("games2p-inventrix").innerHTML = generateGameStats(2, "INVENTRIX");
  document.getElementById("games3p-inventrix").innerHTML = generateGameStats(3, "INVENTRIX");
  document.getElementById("games4p-inventrix").innerHTML = generateGameStats(4, "INVENTRIX");
  document.getElementById("games5p-inventrix").innerHTML = generateGameStats(5, "INVENTRIX");

  document.getElementById("games2p-phobolog").innerHTML = generateGameStats(2, "PHOBOLOG");
  document.getElementById("games3p-phobolog").innerHTML = generateGameStats(3, "PHOBOLOG");
  document.getElementById("games4p-phobolog").innerHTML = generateGameStats(4, "PHOBOLOG");
  document.getElementById("games5p-phobolog").innerHTML = generateGameStats(5, "PHOBOLOG");

  document.getElementById("games2p-tharsis").innerHTML = generateGameStats(2, "THARSIS REPUBLIC");
  document.getElementById("games3p-tharsis").innerHTML = generateGameStats(3, "THARSIS REPUBLIC");
  document.getElementById("games4p-tharsis").innerHTML = generateGameStats(4, "THARSIS REPUBLIC");
  document.getElementById("games5p-tharsis").innerHTML = generateGameStats(5, "THARSIS REPUBLIC");

  document.getElementById("games2p-thorgate").innerHTML = generateGameStats(2, "THORGATE");
  document.getElementById("games3p-thorgate").innerHTML = generateGameStats(3, "THORGATE");
  document.getElementById("games4p-thorgate").innerHTML = generateGameStats(4, "THORGATE");
  document.getElementById("games5p-thorgate").innerHTML = generateGameStats(5, "THORGATE");

  document.getElementById("games2p-unmi").innerHTML = generateGameStats(2, "UNMI");
  document.getElementById("games3p-unmi").innerHTML = generateGameStats(3, "UNMI");
  document.getElementById("games4p-unmi").innerHTML = generateGameStats(4, "UNMI");
  document.getElementById("games5p-unmi").innerHTML = generateGameStats(5, "UNMI");

  //corporate
  document.getElementById("games2p-teractor").innerHTML = generateGameStats(2, "TERACTOR");
  document.getElementById("games3p-teractor").innerHTML = generateGameStats(3, "TERACTOR");
  document.getElementById("games4p-teractor").innerHTML = generateGameStats(4, "TERACTOR");
  document.getElementById("games5p-teractor").innerHTML = generateGameStats(5, "TERACTOR");

  document.getElementById("games2p-saturn").innerHTML = generateGameStats(2, "SATURN SYSTEMS");
  document.getElementById("games3p-saturn").innerHTML = generateGameStats(3, "SATURN SYSTEMS");
  document.getElementById("games4p-saturn").innerHTML = generateGameStats(4, "SATURN SYSTEMS");
  document.getElementById("games5p-saturn").innerHTML = generateGameStats(5, "SATURN SYSTEMS");

  //venus
  document.getElementById("games2p-aphrodite").innerHTML = generateGameStats(2, "APHRODITE");
  document.getElementById("games3p-aphrodite").innerHTML = generateGameStats(3, "APHRODITE");
  document.getElementById("games4p-aphrodite").innerHTML = generateGameStats(4, "APHRODITE");
  document.getElementById("games5p-aphrodite").innerHTML = generateGameStats(5, "APHRODITE");

  document.getElementById("games2p-celestic").innerHTML = generateGameStats(2, "CELESTIC");
  document.getElementById("games3p-celestic").innerHTML = generateGameStats(3, "CELESTIC");
  document.getElementById("games4p-celestic").innerHTML = generateGameStats(4, "CELESTIC");
  document.getElementById("games5p-celestic").innerHTML = generateGameStats(5, "CELESTIC");

  document.getElementById("games2p-manutech").innerHTML = generateGameStats(2, "MANUTECH");
  document.getElementById("games3p-manutech").innerHTML = generateGameStats(3, "MANUTECH");
  document.getElementById("games4p-manutech").innerHTML = generateGameStats(4, "MANUTECH");
  document.getElementById("games5p-manutech").innerHTML = generateGameStats(5, "MANUTECH");

  document.getElementById("games2p-morning").innerHTML = generateGameStats(2, "MORNING STAR");
  document.getElementById("games3p-morning").innerHTML = generateGameStats(3, "MORNING STAR");
  document.getElementById("games4p-morning").innerHTML = generateGameStats(4, "MORNING STAR");
  document.getElementById("games5p-morning").innerHTML = generateGameStats(5, "MORNING STAR");

  document.getElementById("games2p-viron").innerHTML = generateGameStats(2, "VIRON");
  document.getElementById("games3p-viron").innerHTML = generateGameStats(3, "VIRON");
  document.getElementById("games4p-viron").innerHTML = generateGameStats(4, "VIRON");
  document.getElementById("games5p-viron").innerHTML = generateGameStats(5, "VIRON");

  document.getElementById("games2p-cheung").innerHTML = generateGameStats(2, "CHEUNG SHING MARS");
  document.getElementById("games3p-cheung").innerHTML = generateGameStats(3, "CHEUNG SHING MARS");
  document.getElementById("games4p-cheung").innerHTML = generateGameStats(4, "CHEUNG SHING MARS");
  document.getElementById("games5p-cheung").innerHTML = generateGameStats(5, "CHEUNG SHING MARS");

  document.getElementById("games2p-luna").innerHTML = generateGameStats(2, "POINT LUNA");
  document.getElementById("games3p-luna").innerHTML = generateGameStats(3, "POINT LUNA");
  document.getElementById("games4p-luna").innerHTML = generateGameStats(4, "POINT LUNA");
  document.getElementById("games5p-luna").innerHTML = generateGameStats(5, "POINT LUNA");

  document.getElementById("games2p-robinson").innerHTML = generateGameStats(2, "ROBINSON INDUSTRIES");
  document.getElementById("games3p-robinson").innerHTML = generateGameStats(3, "ROBINSON INDUSTRIES");
  document.getElementById("games4p-robinson").innerHTML = generateGameStats(4, "ROBINSON INDUSTRIES");
  document.getElementById("games5p-robinson").innerHTML = generateGameStats(5, "ROBINSON INDUSTRIES");

  document.getElementById("games2p-valley").innerHTML = generateGameStats(2, "VALLEY TRUST");
  document.getElementById("games3p-valley").innerHTML = generateGameStats(3, "VALLEY TRUST");
  document.getElementById("games4p-valley").innerHTML = generateGameStats(4, "VALLEY TRUST");
  document.getElementById("games5p-valley").innerHTML = generateGameStats(5, "VALLEY TRUST");

  document.getElementById("games2p-vitor").innerHTML = generateGameStats(2, "VITOR");
  document.getElementById("games3p-vitor").innerHTML = generateGameStats(3, "VITOR");
  document.getElementById("games4p-vitor").innerHTML = generateGameStats(4, "VITOR");
  document.getElementById("games5p-vitor").innerHTML = generateGameStats(5, "VITOR");

  document.getElementById("games2p-recyclon").innerHTML = generateGameStats(2, "RECYCLON");
  document.getElementById("games3p-recyclon").innerHTML = generateGameStats(3, "RECYCLON");
  document.getElementById("games4p-recyclon").innerHTML = generateGameStats(4, "RECYCLON");
  document.getElementById("games5p-recyclon").innerHTML = generateGameStats(5, "RECYCLON");

  document.getElementById("games2p-splice").innerHTML = generateGameStats(2, "SPLICE");
  document.getElementById("games3p-splice").innerHTML = generateGameStats(3, "SPLICE");
  document.getElementById("games4p-splice").innerHTML = generateGameStats(4, "SPLICE");
  document.getElementById("games5p-splice").innerHTML = generateGameStats(5, "SPLICE");

  //colonies
  document.getElementById("games2p-arklight").innerHTML = generateGameStats(2, "ARKLIGHT");
  document.getElementById("games3p-arklight").innerHTML = generateGameStats(3, "ARKLIGHT");
  document.getElementById("games4p-arklight").innerHTML = generateGameStats(4, "ARKLIGHT");
  document.getElementById("games5p-arklight").innerHTML = generateGameStats(5, "ARKLIGHT");

  //promo
  document.getElementById("games2p-arcadian").innerHTML = generateGameStats(2, "ARCADIAN COMMUNITIES");
  document.getElementById("games3p-arcadian").innerHTML = generateGameStats(3, "ARCADIAN COMMUNITIES");
  document.getElementById("games4p-arcadian").innerHTML = generateGameStats(4, "ARCADIAN COMMUNITIES");
  document.getElementById("games5p-arcadian").innerHTML = generateGameStats(5, "ARCADIAN COMMUNITIES");

  //fanmade
  document.getElementById("games2p-kuiper").innerHTML = generateGameStats(2, "KUIPER BELT COOP.");
  document.getElementById("games3p-kuiper").innerHTML = generateGameStats(3, "KUIPER BELT COOP.");
  document.getElementById("games4p-kuiper").innerHTML = generateGameStats(4, "KUIPER BELT COOP.");
  document.getElementById("games5p-kuiper").innerHTML = generateGameStats(5, "KUIPER BELT COOP.");

}
