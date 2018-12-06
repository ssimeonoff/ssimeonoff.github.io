playersButton = 0;


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
firebase.database().ref("games-production").on('value', function(snapshot) {
    GAMES_ALL = snapshotToArray(snapshot);
    GAMES_ALL_JSON = JSON.stringify(snapshot)
    games = snapshotToArray(snapshot);
    pushData();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.displayName)
    console.log(user.email)
    console.log("logged")
  } else {
    // No user is signed in.
    console.log("not logged")
  }
});



function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
};


function filterFunction(id) {
  // getting the constant GAMES_ALL
  // filter games from it and return/create new array "games"
  //toggling active buttons state
  games = GAMES_ALL;

  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}

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
  btnExpansion = document.querySelectorAll(".btn-expansion.active");
  if (document.getElementById("expansions_switch").checked) {
    //if the toggle EXCLUDE is on
    if (btnExpansion.length == 1 ) {
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) == -1 ||
               el.expansions == undefined
      });
    } else if (btnExpansion.length == 2 ){
      games = games.filter(function(el) {
          return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) == -1 &&
                 el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[1].id) == -1 ||
                 el.expansions == undefined
      });
    } else if (btnExpansion.length == 3 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) == -1 &&
               el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[1].id) == -1 &&
               el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[2].id) == -1 ||
               el.expansions == undefined
      });
    } else if (btnExpansion.length == 4 ){
      games = games.filter(function(el) {
        return el.expansions == undefined
      });
    }
  } else {
    //if the toggle INCLUDE is on
    if (btnExpansion.length == 1 ) {
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) > -1 && el.expansions.length == 1
      });
    } else if (btnExpansion.length == 2 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[1].id) > -1 && el.expansions.length == 2
      });
    } else if (btnExpansion.length == 3 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[2].id) > -1 && el.expansions.length == 3
      });
    } else if (btnExpansion.length == 4 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&  el.expansions.indexOf(btnExpansion[0].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[2].id) > -1 &&
        el.expansions != undefined  && el.expansions.indexOf(btnExpansion[3].id) > -1 && el.expansions.length == 4
      });
    }
  }

  //filter by draft
  btnDraft = document.querySelectorAll(".btn-draft.active")
  if (btnDraft.length == 1) {
    games = games.filter(function(el) {
      return el.draft ==  btnDraft[0].value
    });
  } else if (btnDraft.length == 2) {
    games = games.filter(function(el) {
      return el.draft ==  "YES" || el.draft ==  "NO"
    });
  }

  //filter by WGT
  btnWGT = document.querySelectorAll(".btn-wgt.active")
  if (btnWGT.length == 1) {
    games = games.filter(function(el) {
      return el.wgt != undefined && el.wgt ==  btnWGT[0].value
    });
  } else if (btnWGT.length == 2) {
    games = games.filter(function(el) {
      return el.wgt ==  "YES" || el.wgt ==  "NO"
    });
  }

  //pushing the new filtered data
  pushData();
  //to keep the corporations sorting
  if (playersButton > 1) {sortBy(playersButton)}
}


function pushData() {

  pushGeneralStats(); //for smoother animation
  pushCorporationsData();
  pushMapStats();
  pushAwardsStats();
  pushAverageGenerations();
  pushHistograms();
  pushHistory();
}

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
        //if the corporation is present in the corporations' arrayAwards
        //add this game to the played games
        playedGames.push(gamesPerPlayers[i]);
        }
      }
  }
  var totalGames = playedGames.length;
  var totalWins = 0;
  var sum = 0;
  for (i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = playedGames[i]["corporations"];
    var scoresArray = playedGames[i]["scores"];
    corpIndex = corpsArray.indexOf(corporationName); //find the corporation index
    //findind the winning score index
    winnerIndex = indexOfMax(scoresArray);
    winningScore = Math.max(...scoresArray);
    //counting a win if corporation and winning score indexes match
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

function pushGeneralStats() {
  //total games
  document.getElementById("total_games").innerHTML = games.length;
  document.getElementById("2p_games").innerHTML = games.filter(function(el) {return el.players == 2}).length;
  document.getElementById("3p_games").innerHTML = games.filter(function(el) {return el.players == 3}).length;
  document.getElementById("4p_games").innerHTML = games.filter(function(el) {return el.players == 4}).length;
  document.getElementById("5p_games").innerHTML = games.filter(function(el) {return el.players == 5}).length;


  //draft games
  var draftGames = games.filter(function(el) {
    return el.draft == "YES"
  });
  document.getElementById("draft_games").innerHTML = Math.round(draftGames.length*100/games.length) + "%" ;
  document.getElementById("corporate_games").innerHTML =  Math.round(checkForElement("expansions", "CORPORATE")*100/games.length) + "%"
  document.getElementById("venus_games").innerHTML =  Math.round(checkForElement("expansions", "VENUS")*100/games.length) + "%"
  document.getElementById("prelude_games").innerHTML =  Math.round(checkForElement("expansions", "PRELUDE")*100/games.length) + "%"
  document.getElementById("colonies_games").innerHTML =  Math.round(checkForElement("expansions", "COLONIES")*100/games.length) + "%"

}

function checkForElement (subArrayName, element) {
  //calculated played and won games per corporation
  var playedElement = 0
  for (i = 0; i < games.length; i++) {
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

function pushAwardsStats() {
  //THARSIS milestones and awards
  document.getElementById("terraformer").innerHTML =  Math.round(checkForElement("milestones", "TERRAFORMER")*100/games.length) + "%";
  document.getElementById("mayor").innerHTML =  Math.round(checkForElement("milestones", "MAYOR")*100/games.length) + "%";
  document.getElementById("gardener").innerHTML =  Math.round(checkForElement("milestones", "GARDENER")*100/games.length) + "%";
  document.getElementById("builder").innerHTML =  Math.round(checkForElement("milestones", "BUILDER")*100/games.length) + "%";
  document.getElementById("planner").innerHTML =  Math.round(checkForElement("milestones", "PLANNER")*100/games.length) + "%";
  document.getElementById("landlord").innerHTML =  Math.round(checkForElement("awards", "LANDLORD")*100/games.length) + "%";
  document.getElementById("banker").innerHTML =  Math.round(checkForElement("awards", "BANKER")*100/games.length) + "%";
  document.getElementById("scientist").innerHTML =  Math.round(checkForElement("awards", "SCIENTIST")*100/games.length) + "%";
  document.getElementById("thermalist").innerHTML =  Math.round(checkForElement("awards", "THERMALIST")*100/games.length) + "%";
  document.getElementById("miner").innerHTML =  Math.round(checkForElement("awards", "MINER")*100/games.length) + "%";

  document.getElementById("diversifier").innerHTML =  Math.round(checkForElement("milestones", "DIVERSIFIER")*100/games.length) + "%";
  document.getElementById("tactician").innerHTML =  Math.round(checkForElement("milestones", "TACTICIAN")*100/games.length) + "%";
  document.getElementById("polar_explorer").innerHTML =  Math.round(checkForElement("milestones", "POLAR EXPLORER")*100/games.length) + "%";
  document.getElementById("energizer").innerHTML =  Math.round(checkForElement("milestones", "ENERGIZER")*100/games.length) + "%";
  document.getElementById("rim_settler").innerHTML =  Math.round(checkForElement("milestones", "RIM SETTLER")*100/games.length) + "%";
  document.getElementById("cultivator").innerHTML =  Math.round(checkForElement("awards", "CULTIVATOR")*100/games.length) + "%";
  document.getElementById("magnate").innerHTML =  Math.round(checkForElement("awards", "MAGNATE")*100/games.length) + "%";
  document.getElementById("space_baron").innerHTML =  Math.round(checkForElement("awards", "SPACE BARON")*100/games.length) + "%";
  document.getElementById("excentric").innerHTML =  Math.round(checkForElement("awards", "EXCENTRIC")*100/games.length) + "%";
  document.getElementById("contractor").innerHTML =  Math.round(checkForElement("awards", "CONTRACTOR")*100/games.length) + "%";

  document.getElementById("generelast").innerHTML =  Math.round(checkForElement("milestones", "GENERALIST")*100/games.length) + "%";
  document.getElementById("specialist").innerHTML =  Math.round(checkForElement("milestones", "SPECIALIST")*100/games.length) + "%";
  document.getElementById("ecologist").innerHTML =  Math.round(checkForElement("milestones", "ECOLOGIST")*100/games.length) + "%";
  document.getElementById("tycoon").innerHTML =  Math.round(checkForElement("milestones", "TYCOON")*100/games.length) + "%";
  document.getElementById("legend").innerHTML =  Math.round(checkForElement("milestones", "LEGEND")*100/games.length) + "%";
  document.getElementById("celebrity").innerHTML =  Math.round(checkForElement("awards", "CELEBRITY")*100/games.length) + "%";
  document.getElementById("industrialist").innerHTML =  Math.round(checkForElement("awards", "INDUSTRIALIST")*100/games.length) + "%";
  document.getElementById("desert_settler").innerHTML =  Math.round(checkForElement("awards", "DESERT SETTLER")*100/games.length) + "%";
  document.getElementById("estate_dealer").innerHTML =  Math.round(checkForElement("awards", "ESTATE DEALER")*100/games.length) + "%";
  document.getElementById("benefactor").innerHTML =  Math.round(checkForElement("awards", "BENEFACTOR")*100/games.length) + "%";

  document.getElementById("hoverlord").innerHTML =  Math.round(checkForElement("milestones", "HOVERLORD")*100/Math.round(checkForElement("expansions", "VENUS"))) + "%";
  document.getElementById("venuphile").innerHTML =  Math.round(checkForElement("awards", "VENUPHILE")*100/Math.round(checkForElement("expansions", "VENUS"))) + "%";
}

function generateAverageScores (players) {
  gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  gamesWithoutPrelude = gamesPerPlayers.filter(function(el) {
    return  el.expansions != "PRELUDE"
  });

  gamesWithPrelude = gamesPerPlayers.filter(function(el) {
    return  el.expansions == "PRELUDE"
  });

  var totalSum = 0;
  var totalSumPrelude = 0;

  //calculating average generations

  for (i = 0; i < gamesWithoutPrelude.length; i++) {
    var generationsValue = gamesWithoutPrelude[i]["generations"]; //getting the generations value
    totalSum = totalSum + parseInt(generationsValue);
  }

  for (j = 0; j < gamesWithPrelude.length; j++) {
    var generationsValuePrelude = gamesWithPrelude[j]["generations"]; //getting the generations value
    totalSumPrelude = totalSumPrelude + parseInt(generationsValuePrelude);
  }
  average = (Math.round(totalSum*10/gamesWithoutPrelude.length)/10).toFixed(1)
  averagePrelude = (Math.round(totalSumPrelude*10/gamesWithPrelude.length)/10).toFixed(1)

  if (average == "NaN") {average = "--"}
  if (averagePrelude == "NaN") {averagePrelude = "--"}

  document.getElementById("generations_" + players).innerHTML = average;
  document.getElementById("generations_" + players + "_prelude").innerHTML = averagePrelude;

}

function pushAverageGenerations () {
  generateAverageScores(2);
  generateAverageScores(3);
  generateAverageScores(4);
  generateAverageScores(5);
}

function pushHistograms() {
  histogram(2);
  histogram(3);
  histogram(4);
  histogram(5);
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
      vAxis: { gridlines: { count: 5},maxValue:20 },
      hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
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
        vAxis: { gridlines: { count: 5}},
        hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
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
          vAxis: { gridlines: { count: 5} },
          hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
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
            vAxis: { gridlines: { count: 5}},
            hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
            bar: {gap: 1},
            chartArea:{left:0,bottom:20,top:0,width:460},
            colors: ['#444444','#888888'],
            histogram: {bucketSize: 5, minValue: 40, maxValue: 90}
          };}

    var chart = new google.visualization.Histogram(document.getElementById('histogram_' + players));
    chart.draw(data, options);
  }
}

function generateScoresArray (players) {
  //average scores calculation for the chart headers
  var totalScores = 0
  var totalGames = 0
  //Generating the array for the Google histograms
  var scores = [['Corporation', 'Score']];
  var gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  for (i = 0; i < gamesPerPlayers.length; i++) {
    var scoresArray = gamesPerPlayers[i]["scores"];
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
  //pushing the AVERAGE
  document.getElementById("chart_scores_" + players).innerHTML = Math.round(totalScores/totalGames);
  return scores;
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

    //highlight the criterion

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

function pushHistory() {

  //clear the sections
  var x = document.querySelectorAll(".flag-div,.history-section-time-value, .history-section-corporation, .history-section-score, .history-section-generation, .history-section-expansions")
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //remove the highlights
  var y = document.querySelectorAll(".highlight-winner")
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove("highlight-winner");
  }
  //remove dark background
  var z = document.querySelectorAll(".dark-background")
  for (i = 0; i < z.length; i++) {
    z[i].classList.remove("dark-background");
  }

  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history");

  for(i=0; i < gameSections.length && i < games.length ; i++) {

    if (games.length-i > 0) {
      //add dark background to the headers
      gameSections[i].querySelector(".history-section-time").classList.add("dark-background");
      gameSections[i].querySelector(".history-section-generation").classList.add("dark-background");
    }
    //game timestamp in seconds
    timestamp = games[games.length-1-i]["timestamp"];
    if (timestamp == undefined) {gameSections[i].querySelector(".history-section-time-value").innerHTML = "-- ----"}
    else {
      time = now - timestamp;
      gameSections[i].querySelector(".history-section-time-value").innerHTML = compareTime(time);

    }

    //the corporations array
    corporationsSections = gameSections[i].querySelectorAll(".history-section-corporation");
    scoresSections = gameSections[i].querySelectorAll(".history-section-score");
    var corporationsArray =  games[games.length-1-i]["corporations"];
    var scoresArray = games[games.length-1-i]["scores"];
    var winnerIndex = indexOfMax(scoresArray);
    var winningScore = scoresArray[winnerIndex];

    //highlight the winner
    for (j=0; j < scoresArray.length; j++) {
      corporationsSections[j].innerHTML = corporationsArray[j];
      scoresSections[j].innerHTML = scoresArray[j];
      if (scoresArray[j] == winningScore) {
        corporationsSections[j].classList.add("highlight-winner");
        scoresSections[j].classList.add("highlight-winner");
      }
    }

    // the generations
    var generations =  games[games.length-1-i]["generations"];
    gameSections[i].querySelector(".history-section-generation").innerHTML = "<div class='history-section-generation-value'>" + generations + "</div>";
    //the expansions
    var expansionsHTML = "";
    expansionsArray = games[games.length-1-i]["expansions"];
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
    gameSections[i].querySelector(".history-section-expansions").innerHTML = expansionsHTML;

    //display the flag
    country =  games[games.length-1-i]["country"];
    if (country != undefined && country.length > 1) {
      countryDivContent = '<img class="flag" src="flags/'+country+'.png" title="'+country+'">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    } else {
      countryDivContent = '<img class="flag" src="flags/EU.png" title="EU">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    }
    //add the key as title
    gameSections[i].title = games[games.length-1-i]["key"];
  }
}

function compareTime(time) {
  if (time >= 0 && time < 120) {return "now"}
  if (time >= 120 && time < 7200) {return Math.floor(time/60) + " mins"}
  if (time >= 7200 && time < 172800) {return Math.floor(time/3600) + " hours"}
  if (time >= 172800) {return Math.floor(time/86400) + " days"}
}

function changeColours (id) {
  menu = document.getElementById(id);
  if (menu.querySelector("option[value='NOT SELECTED']").selected) {menu.classList.remove("change-colours");}
  else {menu.classList.add("change-colours");}
}

function resetFilters() {
  var x = document.querySelectorAll(".active");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active")
  }
  y = document.querySelectorAll(".change-colours");
  if (y.length > 0) {
    for (i = 0; i < y.length; i++) {
    y[i].classList.remove("change-colours");
    }
  }
  filterFunction();
}

function download(data, filename, json) {
    var file = new Blob([GAMES_ALL_JSON], {type: "text/plain;charset=utf-8"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "TM Games - " + GAMES_ALL.length;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
