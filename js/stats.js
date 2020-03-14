//import pushAwardsStats from "./milestonesAndAwards.js";


var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};
let playersButton = 0;
let enableCorporationData = false;
let enableMapData = false;
let enableHistogramData = false;
let games;
let games_2;
let games_3;
let games_4;
let games_5;


firebase.initializeApp(config);
let GAMES_ALL = JSON.parse(localStorage.getItem("games"));
hideSecondaryStats();

firebase.database().ref("games-production").on('value', function(snapshot) {
    console.log(snapshot.numChildren())
    triggerRefreshButton(snapshot.numChildren())
});

if (GAMES_ALL == undefined) {
  getFirebaseGames(games);
} else {
  displayGames(GAMES_ALL);
}

firebase.auth().onAuthStateChanged(function(user) {
  const urlString = window.location.href;
  let email_guest = parseURLParams(urlString);
  if (email_guest == "ALL") {
    if (user) {
      // User is signed in.
      console.log("logged")
      document.getElementById("account-name").innerHTML = user.displayName + "<br>" + user.email
      document.getElementById("mygames").disabled = false;
    } else {
      // No user is signed in.
      console.log("not logged")
      document.getElementById("account-name").innerHTML = "<a class='link-auth' href='https://ssimeonoff.github.io/login'>Sign in</a>Not Signed<br>Personal statistics are unavailable"
    }
  }
});

function displayGames() {
  games = GAMES_ALL;
  let email_guest = parseURLParams(window.location.href);
  if (email_guest != "ALL" && email_guest != undefined)  {
    document.getElementById("account-name").innerHTML = "Games submitted by<br>" + email_guest + "****"
    GAMES_ALL = games.filter(function(el) {
      return el.email != undefined && el.email.search(email_guest) > -1;
    });
    games = GAMES_ALL;
  }
  pushData(games);
}

function getFirebaseGames() {
  //downloads all games and saves them in the local storage
  firebase.database().ref("games-production").on('value', function(snapshot) {
      GAMES_ALL = snapshotToArray(snapshot);
      let games = GAMES_ALL;
      localStorage.setItem("games", JSON.stringify(games));
      let el = document.getElementById("btn_refresh");
      el.innerHTML = "No New Games";
      el.disabled = true;
      displayGames(games);
  });
  //firebase.database().ref("count").update({ multi: GAMES_ALL.length });
}

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
};

function pushData(games) {
  //displaying and updating the tableaus
  calculateGamesPerPlayerCount(games);
  pushHistory(games);
  pushRanking(games);

  if (enableCorporationData) {pushCorporationsData(games);}
  if (enableMapData) {pushMapStats(games);pushAwardsStats(games);}
  if (enableHistogramData) {pushHistograms(games);}

}

function calculateGamesPerPlayerCount(games) {
  //splitting all games in 4 arrays based on player count
  games_2 = games.filter(function(el) {return el.players == 2});
  games_3 = games.filter(function(el) {return el.players == 3});
  games_4 = games.filter(function(el) {return el.players == 4});
  games_5 = games.filter(function(el) {return el.players == 5});

  //total games
  document.getElementById("total_games").innerHTML = games.length;
  document.getElementById("2p_games").innerHTML = games_2.length;
  document.getElementById("3p_games").innerHTML = games_3.length;
  document.getElementById("4p_games").innerHTML = games_4.length;
  document.getElementById("5p_games").innerHTML = games_5.length;
}


function toggleButton (id) {
  //toggling active buttons state
  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}
}

function toggleMyGamesButtons (id) {
  if (id == "mygames") {document.getElementById("mygames-group").classList.remove("active");}
  if (id == "mygames-group") {document.getElementById("mygames").classList.remove("active");}
}


function filterFunction() {
  // getting the constant GAMES_ALL
  // filter games from it and return/create new array "games"
  games = GAMES_ALL;

  //filtering by Maps
  btnMap = document.querySelectorAll(".btn-map.active");
  if (btnMap.length == 1 ) {
    games = games.filter(function(el) {
      return el.map == btnMap[0].id;
    });
  } else if (btnMap.length == 2 ){
    games = games.filter(function(el) {
      return el.map == btnMap[0].id || el.map == btnMap[1].id;
    });
  } else if (btnMap.length == 3 ){
    games = games.filter(function(el) {
      return el.map == btnMap[0].id || el.map == btnMap[1].id || el.map == btnMap[2].id;
    });
  }

  //filter by corporation
  selectedCorporation = document.querySelectorAll(".drop-down.change-colours")
  if (selectedCorporation.length > 0) {
    games = games.filter(function(el) {
      return el.corporations.indexOf(selectedCorporation[0].value) > -1 ;
    });
  }
  if (selectedCorporation.length > 1) {
    games = games.filter(function(el) {
      return el.corporations.indexOf(selectedCorporation[1].value) > -1 ;
    });
  }

  //filter by generations
  selectedGenerations = document.querySelectorAll(".drop-down-generation.change-colours")
  if (selectedGenerations.length > 0) {
    generation1 = document.getElementById("generation1").value;
    generation2 = document.getElementById("generation2").value;
    if (generation1 == "NOT SELECTED") {generation1 = 4}
    if (generation2 == "NOT SELECTED") {generation2 = 16}
    if (parseInt(generation2) < parseInt(generation1)) {
      if (id == "generation2") {
        generation1 = generation2;
        document.querySelector("select[id='generation1'] > option[value='"+generation2+"']").selected = true
      }
      if (id == "generation1") {
        generation2 = generation1;
        document.querySelector("select[id='generation2'] > option[value='"+generation2+"']").selected = true
      }
    }
    games = games.filter(function(el) {
      return el.generations >= parseInt(generation1) && el.generations <= parseInt(generation2)
    });
  }


  //filter by expansions
  filter_corporate = document.getElementById("filter_corporate").value;
  filter_venus = document.getElementById("filter_venus").value;
  filter_prelude = document.getElementById("filter_prelude").value;
  filter_colonies = document.getElementById("filter_colonies").value;
  filter_turmoil = document.getElementById("filter_turmoil").value;

  if (filter_corporate == -1) {
    games = games.filter(function(el) {
      return el.expansions == undefined || el.expansions.indexOf("CORPORATE") == -1
    });
  }
  if (filter_venus == -1) {
    games = games.filter(function(el) {
      return el.expansions == undefined || el.expansions.indexOf("VENUS") == -1

    });
  }
  if (filter_prelude == -1) {
    games = games.filter(function(el) {
      return el.expansions == undefined || el.expansions.indexOf("PRELUDE") == -1
    });
  }
  if (filter_colonies == -1) {
    games = games.filter(function(el) {
      return el.expansions == undefined || el.expansions.indexOf("COLONIES") == -1
    });
  }
  if (filter_turmoil == -1) {
    games = games.filter(function(el) {
      return el.expansions == undefined || el.expansions.indexOf("TURMOIL") == -1
    });
  }

  if (filter_corporate == 1) {
    games = games.filter(function(el) {
      return el.expansions != undefined && el.expansions.indexOf("CORPORATE") > -1
    });
  }
  if (filter_venus == 1) {
    games = games.filter(function(el) {
      return el.expansions != undefined && el.expansions.indexOf("VENUS") > -1
    });
  }
  if (filter_prelude == 1) {
    games = games.filter(function(el) {
      return el.expansions != undefined && el.expansions.indexOf("PRELUDE") > -1
    });
  }
  if (filter_colonies == 1) {
    games = games.filter(function(el) {
      return el.expansions != undefined && el.expansions.indexOf("COLONIES") > -1
    });
  }
  if (filter_turmoil == 1) {
    games = games.filter(function(el) {
      return el.expansions != undefined && el.expansions.indexOf("TURMOIL") > -1
    });
  }

  //filter by draft
  filter_draft = document.getElementById("filter_draft").value;
  if (filter_draft == -1) {
    games = games.filter(function(el) {
      return el.draft == undefined || el.draft == "NO"
    });
  }
  if (filter_draft == 1) {
    games = games.filter(function(el) {
      return el.draft != undefined && el.draft == "YES"
    });
  }

  //filter by WGT
  filter_wgt = document.getElementById("filter_wgt").value;
  if (filter_wgt == -1) {
    games = games.filter(function(el) {
      return el.wgt == undefined || el.wgt == "NO"
    });
  }
  if (filter_wgt == 1) {
    games = games.filter(function(el) {
      return el.wgt != undefined && el.wgt == "YES"
    });
  }

  //filter by user email (my games only)
  btnMyGames = document.querySelectorAll(".btn-mygames-solo.active");
  if (btnMyGames.length == 1 ) {
    var user = firebase.auth().currentUser;
    games = games.filter(function(el) {
      return el.email == user.email;
    });
  }
  //pushing the new filtered data
  pushData(games);
  //to keep the corporations sorting
  if (playersButton > 1) {sortBy(playersButton)}
}

function generateGameStats (players, corporationName) {
  //returning html formatted text

  //getting the games per players' count
  if (players == 2) {gamesPerPlayers = games_2}
  if (players == 3) {gamesPerPlayers = games_3}
  if (players == 4) {gamesPerPlayers = games_4}
  if (players == 5) {gamesPerPlayers = games_5}

  //calculated played and won games per corporation
  playedGames = [];
  for (let i = 0; i < gamesPerPlayers.length; i++) {
    var corpsArray = gamesPerPlayers[i]["corporations"]; //getting the corporations array
    if (corpsArray == undefined) {} //to chatch firebase errors if the array is undefined
    else {
      //check if onlyplayers button filter is clicked
      if (document.getElementById("mygames").classList.contains("active")) {
        try {var position = gamesPerPlayers[i]["rank"]} catch(er) {}
        if (corpsArray.indexOf(corporationName) == position) {
            //if the corporation is present in the corporations' arrayAwards
            //add this game to the played games
            playedGames.push(gamesPerPlayers[i]);
          }
      } else {
        if (corpsArray.indexOf(corporationName) > -1) {
            //if the corporation is present in the corporations' arrayAwards
            //add this game to the played games
            playedGames.push(gamesPerPlayers[i]);
          }
        }
      }
  }
  var totalGames = playedGames.length;
  var totalWins = 0;
  var sum = 0;


  for (let i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = playedGames[i]["corporations"];
    try {var scoresArray = playedGames[i]["scores"];}
    catch (err) {scoresArray = []}

    corpIndex = corpsArray.indexOf(corporationName); //find the corporation index
    //findind the max score
    winningScore = Math.max(...scoresArray);
    //counting a win if corporation's score matches the max score
    if (scoresArray[corpIndex] == winningScore) {totalWins++;}
    //calculating the average score
     if (parseInt(scoresArray[corpIndex])>0) {
     sum += parseInt(scoresArray[corpIndex]);
   }
  }

  //calculating the average score
  avg = sum/totalGames;

  if (totalWins==0 && totalGames==0) {
    //capturing division by 0
    return  "<div class='winrate'>--</div>"
            ;}
  else {
    return  "<div class='winrate'><span class='winrateValue'>"+ Math.round(totalWins*100/totalGames) +"</span><span style='font-size:12px'>%</span></div>" +
            "<div class='points'><span class='scoreValue'>"+ Math.round(avg) + "</span><span style='font-size:12px'>P</span></div>" +
            "<div class='ratio'><span class='gamesValue'>" + " " + totalGames + "</span></div>"
            ;}
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = parseInt(arr[0]);
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (parseInt(arr[i]) > max) {
            maxIndex = i;
            max = parseInt(arr[i]);
        }
    }
    return maxIndex;
}

function pushCorporationsData() {
  //standard
  document.getElementById("games2p-beginner").innerHTML = generateGameStats(2, "BEGINNER");
  document.getElementById("games3p-beginner").innerHTML = generateGameStats(3, "BEGINNER");
  document.getElementById("games4p-beginner").innerHTML = generateGameStats(4, "BEGINNER");
  document.getElementById("games5p-beginner").innerHTML = generateGameStats(5, "BEGINNER");

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
  document.getElementById("games2p-aridor").innerHTML = generateGameStats(2, "ARIDOR");
  document.getElementById("games3p-aridor").innerHTML = generateGameStats(3, "ARIDOR");
  document.getElementById("games4p-aridor").innerHTML = generateGameStats(4, "ARIDOR");
  document.getElementById("games5p-aridor").innerHTML = generateGameStats(5, "ARIDOR");

  document.getElementById("games2p-arklight").innerHTML = generateGameStats(2, "ARKLIGHT");
  document.getElementById("games3p-arklight").innerHTML = generateGameStats(3, "ARKLIGHT");
  document.getElementById("games4p-arklight").innerHTML = generateGameStats(4, "ARKLIGHT");
  document.getElementById("games5p-arklight").innerHTML = generateGameStats(5, "ARKLIGHT");

  document.getElementById("games2p-polyphemos").innerHTML = generateGameStats(2, "POLYPHEMOS");
  document.getElementById("games3p-polyphemos").innerHTML = generateGameStats(3, "POLYPHEMOS");
  document.getElementById("games4p-polyphemos").innerHTML = generateGameStats(4, "POLYPHEMOS");
  document.getElementById("games5p-polyphemos").innerHTML = generateGameStats(5, "POLYPHEMOS");

  document.getElementById("games2p-poseidon").innerHTML = generateGameStats(2, "POSEIDON");
  document.getElementById("games3p-poseidon").innerHTML = generateGameStats(3, "POSEIDON");
  document.getElementById("games4p-poseidon").innerHTML = generateGameStats(4, "POSEIDON");
  document.getElementById("games5p-poseidon").innerHTML = generateGameStats(5, "POSEIDON");

  document.getElementById("games2p-stormcraft").innerHTML = generateGameStats(2, "STORMCRAFT");
  document.getElementById("games3p-stormcraft").innerHTML = generateGameStats(3, "STORMCRAFT");
  document.getElementById("games4p-stormcraft").innerHTML = generateGameStats(4, "STORMCRAFT");
  document.getElementById("games5p-stormcraft").innerHTML = generateGameStats(5, "STORMCRAFT");

  document.getElementById("games2p-arcadian").innerHTML = generateGameStats(2, "ARCADIAN COMMUNITIES");
  document.getElementById("games3p-arcadian").innerHTML = generateGameStats(3, "ARCADIAN COMMUNITIES");
  document.getElementById("games4p-arcadian").innerHTML = generateGameStats(4, "ARCADIAN COMMUNITIES");
  document.getElementById("games5p-arcadian").innerHTML = generateGameStats(5, "ARCADIAN COMMUNITIES");

  document.getElementById("games2p-factorum").innerHTML = generateGameStats(2, "FACTORUM");
  document.getElementById("games3p-factorum").innerHTML = generateGameStats(3, "FACTORUM");
  document.getElementById("games4p-factorum").innerHTML = generateGameStats(4, "FACTORUM");
  document.getElementById("games5p-factorum").innerHTML = generateGameStats(5, "FACTORUM");

  document.getElementById("games2p-lakefront").innerHTML = generateGameStats(2, "LAKEFRONT RESORTS");
  document.getElementById("games3p-lakefront").innerHTML = generateGameStats(3, "LAKEFRONT RESORTS");
  document.getElementById("games4p-lakefront").innerHTML = generateGameStats(4, "LAKEFRONT RESORTS");
  document.getElementById("games5p-lakefront").innerHTML = generateGameStats(5, "LAKEFRONT RESORTS");

  document.getElementById("games2p-mons").innerHTML = generateGameStats(2, "MONS INSURANCE");
  document.getElementById("games3p-mons").innerHTML = generateGameStats(3, "MONS INSURANCE");
  document.getElementById("games4p-mons").innerHTML = generateGameStats(4, "MONS INSURANCE");
  document.getElementById("games5p-mons").innerHTML = generateGameStats(5, "MONS INSURANCE");

  document.getElementById("games2p-philares").innerHTML = generateGameStats(2, "PHILARES");
  document.getElementById("games3p-philares").innerHTML = generateGameStats(3, "PHILARES");
  document.getElementById("games4p-philares").innerHTML = generateGameStats(4, "PHILARES");
  document.getElementById("games5p-philares").innerHTML = generateGameStats(5, "PHILARES");

  document.getElementById("games2p-pristar").innerHTML = generateGameStats(2, "PRISTAR");
  document.getElementById("games3p-pristar").innerHTML = generateGameStats(3, "PRISTAR");
  document.getElementById("games4p-pristar").innerHTML = generateGameStats(4, "PRISTAR");
  document.getElementById("games5p-pristar").innerHTML = generateGameStats(5, "PRISTAR");

  document.getElementById("games2p-septem").innerHTML = generateGameStats(2, "SEPTEM TRIBUS");
  document.getElementById("games3p-septem").innerHTML = generateGameStats(3, "SEPTEM TRIBUS");
  document.getElementById("games4p-septem").innerHTML = generateGameStats(4, "SEPTEM TRIBUS");
  document.getElementById("games5p-septem").innerHTML = generateGameStats(5, "SEPTEM TRIBUS");

  document.getElementById("games2p-utopia").innerHTML = generateGameStats(2, "UTOPIA");
  document.getElementById("games3p-utopia").innerHTML = generateGameStats(3, "UTOPIA");
  document.getElementById("games4p-utopia").innerHTML = generateGameStats(4, "UTOPIA");
  document.getElementById("games5p-utopia").innerHTML = generateGameStats(5, "UTOPIA");

  document.getElementById("games2p-teralabs").innerHTML = generateGameStats(2, "TERALABS");
  document.getElementById("games3p-teralabs").innerHTML = generateGameStats(3, "TERALABS");
  document.getElementById("games4p-teralabs").innerHTML = generateGameStats(4, "TERALABS");
  document.getElementById("games5p-teralabs").innerHTML = generateGameStats(5, "TERALABS");

  //fanmade
  document.getElementById("games2p-kuiper").innerHTML = generateGameStats(2, "KUIPER BELT COOP.");
  document.getElementById("games3p-kuiper").innerHTML = generateGameStats(3, "KUIPER BELT COOP.");
  document.getElementById("games4p-kuiper").innerHTML = generateGameStats(4, "KUIPER BELT COOP.");
  document.getElementById("games5p-kuiper").innerHTML = generateGameStats(5, "KUIPER BELT COOP.");

  //hide cells with no games
  winrate_cells = document.querySelectorAll(".winrate")
  for (i=0; i < winrate_cells.length; i++) {
    if (winrate_cells[i].innerHTML == "--") {
      winrate_cells[i].style.opacity = 0;
    } else {winrate_cells[i].style.opacity = 1;}
  }

}

function checkForElement (subArrayName, element) {
  //calculated played and won games per corporation
  var playedElement = 0
  for (let i = 0; i < games.length; i++) {
    var subArray = games[i][subArrayName]; //getting the expansions array
    if (subArray == undefined) {} //to chatch firebase errors if the array is undefined
    else {
      if (subArray.indexOf(element) > -1) {
        //if the expansion is present in the corporations' arrayAwards
        //add +1 to the counter
        playedElement++;
        }
      }
  }
  return playedElement;
}

function pushMapStats() {
  var tharsisGames = games.filter(function(el) {
    return el.map == "THARSIS"
  });
  var hellasGames = games.filter(function(el) {
    return el.map == "HELLAS"
  });
  var elysiumGames = games.filter(function(el) {
    return el.map == "ELYSIUM"
  });
  document.getElementById("map_tharsis").innerHTML = Math.round(tharsisGames.length*100/games.length) + "%" ;
  document.getElementById("map_hellas").innerHTML = Math.round(hellasGames.length*100/games.length) + "%" ;
  document.getElementById("map_elysium").innerHTML = Math.round(elysiumGames.length*100/games.length) + "%" ;
}

function generateAverageGenerationsValue (players, games, id) {
  games_NO = games.filter(function(el) {return el.wgt == "NO" });
  games_YES = games.filter(function(el) {return el.wgt == "YES" });


  var totalSum = 0;
  var totalSumYes = 0;

  //calculating average generations
  for (let i = 0; i < games_NO.length; i++) {
    var generationsValue = games_NO[i]["generations"]; //getting the generations value
    totalSum = totalSum + parseInt(generationsValue);
  }
  for (let i = 0; i < games_YES.length; i++) {
    var generationsValue = games_YES[i]["generations"]; //getting the generations value
    totalSumYes = totalSumYes + parseInt(generationsValue);
  }

  if (games_NO.length > 0) {
    averageNO = (Math.round(totalSum*10/games_NO.length)/10).toFixed(1)
  } else {
    averageNO = "--"
  }

  if (games_YES.length > 0) {
    averageYES = (Math.round(totalSumYes*10/games_YES.length)/10).toFixed(1)
  } else {
    averageYES = "--"
  }
  document.getElementById("generations_" + players + id).innerHTML = averageNO + " <span style='font-size:14px;'>[" + averageYES + "]</span>";
}

function pushHistograms() {
  histogram(2);
  histogram(3);
  histogram(4);
  histogram(5);
  histogram_generations(2);
  histogram_generations(3);
  histogram_generations(4);
  histogram_generations(5);

}

/// charts and their functions

function histogram (players) {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var data = google.visualization.arrayToDataTable(generateScoresArray(players));
  if (players == 2) {
    var options = {
      animation: {"startup": true},
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444", },
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 1},maxValue:15 },
      hAxis: {textStyle : {fontSize: 8, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 10, minValue: 70, maxValue: 190}
    };}

    if (players == 3) {
      var options = {
        animation: {"startup": true},
        title: '',
        titleTextStyle: {fontSize:20, color:"#444444", },
        legend: { position: 'none' },
        fontSize: 12,
        backgroundColor: "transparent",
        vAxis: { gridlines: { count: 1},maxValue:15 },
        hAxis: {textStyle : {fontSize: 8, fontName: 'Prototype'}},
        bar: {gap: 1},
        chartArea:{left:0,bottom:20,top:0,width:460},
        colors: ['#444444','#888888'],
        histogram: {bucketSize: 10, minValue: 40, maxValue: 150}
      };}

      if (players == 4) {
        var options = {
          animation: {"startup": true},
          title: '',
          titleTextStyle: {fontSize:20, color:"#444444", },
          legend: { position: 'none' },
          fontSize: 12,
          backgroundColor: "transparent",
          vAxis: { gridlines: { count: 1}, maxValue:15 },
          hAxis: {textStyle : {fontSize: 8, fontName: 'Prototype'}},
          bar: {gap: 1},
          chartArea:{left:0,bottom:20,top:0,width:460},
          colors: ['#444444','#888888'],
          histogram: {bucketSize: 10, minValue: 40, maxValue: 150}
        };}

        if (players == 5) {
          var options = {
            animation: {"startup": true},
            title: '',
            titleTextStyle: {fontSize:20, color:"#444444", },
            legend: { position: 'none' },
            fontSize: 12,
            backgroundColor: "transparent",
            vAxis: { gridlines: { count: 1},maxValue:15 },
            hAxis: {textStyle : {fontSize: 8, fontName: 'Prototype'}},
            bar: {gap: 1},
            chartArea:{left:0,bottom:20,top:0,width:460},
            colors: ['#444444','#888888'],
            histogram: {bucketSize: 5, minValue: 40, maxValue: 90}
          };}

    var chart = new google.visualization.Histogram(document.getElementById('histogram_' + players));
    chart.draw(data, options);
  }
}

function histogram_generations (players) {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(generateGenerationsArray(players));
    var options = {
        animation: {"startup": true},
        title: '',
        titleTextStyle: {fontSize:20, color:"#444444"},
        legend: { position: 'none' },
        fontSize: 12,
        backgroundColor: "transparent",
        vAxis: { gridlines: { count: 1},maxValue:15 },
        hAxis: {textStyle : {fontSize: 8, fontName: 'Prototype'}},
        bar: {gap: 1},
        chartArea:{left:0,bottom:20,top:0,width:220},
        colors: ['#eee','#888888'],
        histogram: {bucketSize: 1, minValue: 8, maxValue: 14}
      };
    var chart = new google.visualization.Histogram(document.getElementById('histogram_' + players + '_generations'));
    chart.draw(data, options);
  }
}

function pushAwardsStats(games) {

  var tharsisGames = games.filter(function(el) {
    return el.map == "THARSIS"
  }).length+1;
  var hellasGames = games.filter(function(el) {
    return el.map == "HELLAS"
  }).length+1;
  var elysiumGames = games.filter(function(el) {
    return el.map == "ELYSIUM"
  }).length+1;


  //THARSIS milestones and awards
  document.getElementById("terraformer").innerHTML =  Math.round(checkForElement("milestones", "TERRAFORMER")*100/tharsisGames) + "%";
  document.getElementById("mayor").innerHTML =  Math.round(checkForElement("milestones", "MAYOR")*100/tharsisGames) + "%";
  document.getElementById("gardener").innerHTML =  Math.round(checkForElement("milestones", "GARDENER")*100/tharsisGames) + "%";
  document.getElementById("builder").innerHTML =  Math.round(checkForElement("milestones", "BUILDER")*100/tharsisGames) + "%";
  document.getElementById("planner").innerHTML =  Math.round(checkForElement("milestones", "PLANNER")*100/tharsisGames) + "%";
  document.getElementById("landlord").innerHTML =  Math.round(checkForElement("awards", "LANDLORD")*100/tharsisGames) + "%";
  document.getElementById("banker").innerHTML =  Math.round(checkForElement("awards", "BANKER")*100/tharsisGames) + "%";
  document.getElementById("scientist").innerHTML =  Math.round(checkForElement("awards", "SCIENTIST")*100/tharsisGames) + "%";
  document.getElementById("thermalist").innerHTML =  Math.round(checkForElement("awards", "THERMALIST")*100/tharsisGames) + "%";
  document.getElementById("miner").innerHTML =  Math.round(checkForElement("awards", "MINER")*100/tharsisGames) + "%";
  //HELLAS milestones and awards
  document.getElementById("diversifier").innerHTML =  Math.round(checkForElement("milestones", "DIVERSIFIER")*100/hellasGames) + "%";
  document.getElementById("tactician").innerHTML =  Math.round(checkForElement("milestones", "TACTICIAN")*100/hellasGames) + "%";
  document.getElementById("polar_explorer").innerHTML =  Math.round(checkForElement("milestones", "POLAR EXPLORER")*100/hellasGames) + "%";
  document.getElementById("energizer").innerHTML =  Math.round(checkForElement("milestones", "ENERGIZER")*100/hellasGames) + "%";
  document.getElementById("rim_settler").innerHTML =  Math.round(checkForElement("milestones", "RIM SETTLER")*100/hellasGames) + "%";
  document.getElementById("cultivator").innerHTML =  Math.round(checkForElement("awards", "CULTIVATOR")*100/hellasGames) + "%";
  document.getElementById("magnate").innerHTML =  Math.round(checkForElement("awards", "MAGNATE")*100/hellasGames) + "%";
  document.getElementById("space_baron").innerHTML =  Math.round(checkForElement("awards", "SPACE BARON")*100/hellasGames) + "%";
  document.getElementById("excentric").innerHTML =  Math.round(checkForElement("awards", "EXCENTRIC")*100/hellasGames) + "%";
  document.getElementById("contractor").innerHTML =  Math.round(checkForElement("awards", "CONTRACTOR")*100/hellasGames) + "%";
  //ELYSIUM milestones and awards
  document.getElementById("generelast").innerHTML =  Math.round(checkForElement("milestones", "GENERALIST")*100/elysiumGames) + "%";
  document.getElementById("specialist").innerHTML =  Math.round(checkForElement("milestones", "SPECIALIST")*100/elysiumGames) + "%";
  document.getElementById("ecologist").innerHTML =  Math.round(checkForElement("milestones", "ECOLOGIST")*100/elysiumGames) + "%";
  document.getElementById("tycoon").innerHTML =  Math.round(checkForElement("milestones", "TYCOON")*100/elysiumGames) + "%";
  document.getElementById("legend").innerHTML =  Math.round(checkForElement("milestones", "LEGEND")*100/elysiumGames) + "%";
  document.getElementById("celebrity").innerHTML =  Math.round(checkForElement("awards", "CELEBRITY")*100/elysiumGames) + "%";
  document.getElementById("industrialist").innerHTML =  Math.round(checkForElement("awards", "INDUSTRIALIST")*100/elysiumGames) + "%";
  document.getElementById("desert_settler").innerHTML =  Math.round(checkForElement("awards", "DESERT SETTLER")*100/elysiumGames) + "%";
  document.getElementById("estate_dealer").innerHTML =  Math.round(checkForElement("awards", "ESTATE DEALER")*100/elysiumGames) + "%";
  document.getElementById("benefactor").innerHTML =  Math.round(checkForElement("awards", "BENEFACTOR")*100/elysiumGames) + "%";

  document.getElementById("hoverlord").innerHTML =  Math.round(checkForElement("milestones", "HOVERLORD")*100/(1+Math.round(checkForElement("expansions", "VENUS")))) + "%";
  document.getElementById("venuphile").innerHTML =  Math.round(checkForElement("awards", "VENUPHILE")*100/(1+Math.round(checkForElement("expansions", "VENUS")))) + "%";
}

function generateScoresArray (players) {
  //average scores calculation for the chart headers
  var totalScores = 0
  var totalGames = 0
  //Generating the array for the Google histograms
  var scores = [['Corporation', 'Score']];

  //getting the games per players' count
  if (players == 2) {gamesPerPlayers = games_2}
  if (players == 3) {gamesPerPlayers = games_3}
  if (players == 4) {gamesPerPlayers = games_4}
  if (players == 5) {gamesPerPlayers = games_5}

  btnMyGames = document.querySelectorAll(".btn-mygames-solo.active");
  if (document.getElementById("mygames").classList.contains("active")) {
    for (let i = 0; i < gamesPerPlayers.length; i++) {
      try {var position = gamesPerPlayers[i]["rank"]} catch(er) {}
      try {var scoresArray = gamesPerPlayers[i]["scores"];}catch(err) {}
      if (scoresArray == undefined) {scoresArray = [];}

      var corporationsArray = gamesPerPlayers[i]["corporations"];
      //['Ecoline', 88]
      var arr = [corporationsArray[parseInt(position)], parseInt(scoresArray[parseInt(position)])];
      scores.push(arr);
      //average scores calculation for the chart headers
      totalGames++;
      totalScores = totalScores + parseInt(scoresArray[parseInt(position)]);
    }
  } else {
    for (let i = 0; i < gamesPerPlayers.length; i++) {
      try {var scoresArray = gamesPerPlayers[i]["scores"];} catch(err) {}
      if (scoresArray == undefined) {scoresArray = [];}
      var corporationsArray = gamesPerPlayers[i]["corporations"];
      for (j = 0; j < scoresArray.length; j++) {
        //['Ecoline', 88]
        var arr = [corporationsArray[j], parseInt(scoresArray[j])];
        scores.push(arr);
        //average scores calculation for the chart headers
        totalGames++;
        totalScores = totalScores + parseInt(scoresArray[j]);
      }
    }
  }
  //pushing the AVERAGE
  if (totalGames == 0) {totalGames++}
  document.getElementById("chart_scores_" + players).innerHTML = Math.round(totalScores/totalGames);
  return scores;
}

function generateGenerationsArray (players) {
  //Generating the array for the Google histograms
  var generationsArr = [["Generations", "GenerationsValue"]]

  //getting the games per players' count
  if (players == 2) {gamesPerPlayers = games_2}
  if (players == 3) {gamesPerPlayers = games_3}
  if (players == 4) {gamesPerPlayers = games_4}
  if (players == 5) {gamesPerPlayers = games_5}

  for (let i = 0; i < gamesPerPlayers.length; i++) {
      var generations = gamesPerPlayers[i]["generations"];
      var arr = ["Generations", parseInt(generations)];
      generationsArr.push(arr);
  }
  return generationsArr;
}

function sortBy(players) {
  var sortRule = document.getElementById("sorting").value;
  sortByRule (players, sortRule);
  playersButton = players;
}

function sortByRule(players, sortRule) {
   //get the sort rule
  // get array of elements
    var myArray = document.querySelectorAll('.corporation-row');
    var count = 0;
    // sort based on timestamp attribute
    myArray = [].slice.call(myArray);
    myArray.sort(function (a, b) {
    // convert to integers from strings
      a = parseInt($(a).find("div[id*='games" + players +"p'] > div > span[class*='"+ sortRule +"Value']").text(), 10);
      if (a == null || isNaN(a)) {a = 0}
      b = parseInt($(b).find("div[id*='games" + players +"p'] > div > span[class*='"+ sortRule +"Value']").text(), 10);
      if (b == null || isNaN(b)) {b = 0}
      count += 2;
      // compare
      if(a < b) {
          return 1;
      } else if(a > b) {
          return -1;
      } else {
          return 0;
      }
    });

    //remove highlight of previous criterion

    var y = document.querySelectorAll(".highlighed-sorting");
    for (j=0; j < y.length ; j++) {
      y[j].classList.remove("highlighed-sorting");
    }

    //highlight the criterion
    var x = document.querySelectorAll("div[id*='games" + players +"p'] > div > span[class='"+ sortRule +"Value']");
    for (i=0; i < x.length ; i++) {
      x[i].classList.add("highlighed-sorting");
    }


    // put sorted results back on page
    $("#playerStats").append(myArray);
    var y = document.querySelectorAll(".corporation-stats");
    for (j=0; j < y.length; j++) {
      y[j].style.opacity = 0.3;
    }

    var x = document.querySelectorAll("div[id*='games" + players +"p']");
    for (i=0; i < x.length; i++) {
      x[i].style.opacity = 1;
    }
}

function pushHistory(games) {

  //clear the sections
  var x = document.querySelectorAll(".flag-div,.history-section-submitted,.history-section-map-value, .history-section-corporation, .history-section-time, .history-section-score, .history-section-generation, .history-section-expansions")
  for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //remove the highlights
  var y = document.querySelectorAll(".highlight-winner")
  for (let i = 0; i < y.length; i++) {
    y[i].classList.remove("highlight-winner");
  }
  //remove dark background
  var z = document.querySelectorAll(".dark-background")
  for (let i = 0; i < z.length; i++) {
    z[i].classList.remove("dark-background");
  }

  //current time in seconds
  let now = Math.floor((new Date()).getTime() / 1000);
  let gameSections = document.querySelectorAll(".grid-cell-history");

  for (let i=0; i < gameSections.length && i < games.length ; i++) {

    if (games.length-i > 0) {
      //add dark background to the headers
      gameSections[i].querySelector(".history-section-header").classList.add("dark-background");
      gameSections[i].querySelector(".history-section-generation").classList.add("dark-background");
    }
    //game timestamp in seconds
    let timestamp = games[games.length-1-i]["timestamp"];
    if (timestamp == undefined) {gameSections[i].querySelector(".history-section-time").innerHTML = "-- ----"}
    else {
      if (timestamp.toString().length > 12) {timestamp = Math.round(timestamp/1000)};
      let time = now - timestamp;
      gameSections[i].querySelector(".history-section-time").innerHTML = compareTime(time);

    }

    //the corporations array
    let corporationsSections = gameSections[i].querySelectorAll(".history-section-corporation");
    let scoresSections = gameSections[i].querySelectorAll(".history-section-score");
    let corporationsArray =  games[games.length-1-i]["corporations"];
    let scoresArray = games[games.length-1-i]["scores"];

    if (scoresArray == undefined) {scoresArray = [];}
    let winnerIndex = indexOfMax(scoresArray);
    let winningScore = scoresArray[winnerIndex];

    //highlight the winner
    for (let j=0; j < scoresArray.length; j++) {
      corporationsSections[j].innerHTML = corporationsArray[j];
      scoresSections[j].innerHTML = scoresArray[j];
      if (scoresArray[j] == winningScore) {
        corporationsSections[j].classList.add("highlight-winner");
        scoresSections[j].classList.add("highlight-winner");
      }
    }

    // the generations
    let generations =  games[games.length-1-i]["generations"];
    gameSections[i].querySelector(".history-section-generation").innerHTML = "<div class='history-section-generation-value'>" + generations + "</div>";
    //the expansions
    let expansionsHTML = "";
    let expansionsArray = games[games.length-1-i]["expansions"];
    if (expansionsArray == undefined) {expansionsArray = []}
    if (expansionsArray.indexOf("CORPORATE") > -1) {
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon corporate-era-icon icon-align2"></div></div>'
    }
    if (expansionsArray.indexOf("VENUS") > -1) {
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon venus-icon icon-align2"></div></div>'
    }
    if (expansionsArray.indexOf("PRELUDE") > -1) {
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon prelude-icon icon-align2"></div></div>'
    }
    if (expansionsArray.indexOf("COLONIES") > -1) {
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon colonies-icon icon-align2"></div></div>'
    }
    if (expansionsArray.indexOf("TURMOIL") > -1) {
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon turmoil-icon icon-align2"></div></div>'
    }
    gameSections[i].querySelector(".history-section-expansions").innerHTML = expansionsHTML;

    //the map
    var map = games[games.length-1-i]["map"]
    var el = gameSections[i].querySelector(".history-section-map")
    if (map == "THARSIS") {el.innerHTML = "<div class='history-section-map-value' style='background:#ee792b'>"+map+"</div>"}
    if (map == "HELLAS") {el.innerHTML = "<div class='history-section-map-value' style='background:#3b9ae3'>"+map+"</div>"}
    if (map == "ELYSIUM") {el.innerHTML = "<div class='history-section-map-value' style='background:#09aa09'>"+map+"</div>"}

    //display the flag
    let country =  games[games.length-1-i]["country"];
    if (country != undefined && country.length > 1) {
      let countryDivContent = '<img class="flag" src="flags/'+country+'.png" title="'+country+'">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    } else {
      let countryDivContent = '<img class="flag" src="flags/TM.png" title="TM">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    }
    //add the key as title
    gameSections[i].title = games[games.length-1-i]["key"];

    //add name of the submitter
    var el = gameSections[i].querySelector(".history-section-submitted")
    if (games[games.length-1-i]["name"] != undefined) {
      if (games[games.length-1-i]["name"].length < 2) {el.innerHTML = ""}
      else {el.innerHTML = games[games.length-1-i]["name"]}
    }

  }
}

function pushRanking () {
  var user = firebase.auth().currentUser;
  if (user) {
    email = user.email;
    games_player = games.filter(function(el) {
      return el.email == email;
    });
   pushRankingPerPlayers(2, games_player);
   pushRankingPerPlayers(3, games_player);
   pushRankingPerPlayers(4, games_player);
   pushRankingPerPlayers(5, games_player);
 }
}

function pushRankingPerPlayers (players, games_players) {
  games_per_player_count = games_player.filter(function(el) {
    return el.players == players;
  });
  var first = 0;
  var second = 0;
  var third = 0;
  var fourth = 0;
  var fifth = 0;

  for (i=0; i < games_per_player_count.length; i++) {
    var position = games_per_player_count[i]["rank"]
    if (position == 0) {first++}
    if (position == 1) {second++}
    if (position == 2) {third++}
    if (position == 3) {fourth++}
    if (position == 4) {fifth++}
  }
  if (players == 2) {document.getElementById("rank_2").innerHTML = "<span class='ranking-winner'>" + first + "</span> /" + second}
  if (players == 3) {document.getElementById("rank_3").innerHTML = "<span class='ranking-winner'>" + first + "</span> /" + second + "/" + third}
  if (players == 4) {document.getElementById("rank_4").innerHTML = "<span class='ranking-winner'>" + first + "</span> /" + second + "/" + third + "/" + fourth}
  if (players == 5) {document.getElementById("rank_5").innerHTML = "<span class='ranking-winner'>" + first + "</span> /" + second + "/" + third + "/" + fourth + "/" + fifth}
}


function compareTime(time) {
  if (time >= 0 && time < 120) {return "now"}
  if (time >= 120 && time < 7200) {return Math.floor(time/60) + "'"}
  if (time >= 7200 && time < 172800) {return Math.floor(time/3600) + "h"}
  if (time >= 172800) {return Math.floor(time/86400) + "d"}
}

function changeColours (id) {
  menu = document.getElementById(id);
  if (menu.value == "NOT SELECTED") {menu.classList.remove("change-colours");}
  else {menu.classList.add("change-colours");}
}

function download(data, filename, json) {
    var data_scubbed = scrubData(GAMES_ALL);
    var games_as_text = JSON.stringify(GAMES_ALL); //for the download file

    var file = new Blob([games_as_text], {type: "text/plain;charset=utf-8"});

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "Games - " + GAMES_ALL.length;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function scrubData(data) {
  //remove names and emails upon download
  for(i=0; i < data.length; i++) {
    delete data[i]["name"];
    delete data[i]["email"];
  }
}

function parseURLParams(url) {
    let queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("%") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1)
    let cards = query.replace(/\#/g, " ").split(" ");
    if (query === url || query === "") return "ALL";
    return cards;
}

function copyGameID () {
  var clickedGame;
  $(document).click(function(event) {
    clickedGame = event.target.closest(".grid-cell-history");
    navigator.clipboard.writeText(clickedGame.title);
  });
}

function changeSliderColour (id) {
  el = document.getElementById(id);
  if (el.value == -1) {
      el.classList.remove("track-background-include");
      el.classList.add("track-background-exclude");
  }
  if (el.value == 0) {
      el.classList.remove("track-background-include");
      el.classList.remove("track-background-exclude");
  }
  if (el.value == 1) {
      el.classList.add("track-background-include");
      el.classList.remove("track-background-exclude");
  }
}

function triggerRefreshButton(count) {
  let el = document.getElementById("btn_refresh");
  try {
    if (count > GAMES_ALL.length) {
      value = count - GAMES_ALL.length;
      el.innerHTML = "New Games: " + value;
      el.disabled = false;
    }   else {
        el.innerHTML = "No New Games";
        el.disabled = true;
      }
  }
  catch(err) {console.log("GAMES_ALL is null")}
}

function enableStats(id) {
  let el = document.getElementById(id);
  setTimeout(function() {
    el.style.transform = "scale(0)";
    if (id === "show-corporations") {
      enableCorporationData = true;
      document.getElementById("data-corporations").style = "opacity:1";
    };
    if (id === "show-histograms") {
      enableHistogramData = true;
      document.getElementById("data-histograms").style = "opacity:1";
    };
    if (id === "show-maps") {
      enableMapData = true;
      document.getElementById("data-maps").style = "opacity:1";
    };
  }, 200);
  setTimeout(function() {
      pushData(games);
  }, 400);
}

function hideSecondaryStats() {
  document.querySelectorAll(".btn-stats-activation").forEach((item, i) => {
    item.style.transform = "scale(1)";
  });
}
