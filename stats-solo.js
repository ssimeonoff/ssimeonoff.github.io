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
firebase.database().ref("games-solo").on('value', function(snapshot) {
    GAMES_ALL = snapshotToArray(snapshot);
    GAMES_ALL_JSON = JSON.stringify(snapshot)
    games = snapshotToArray(snapshot);
    pushData();
});

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
      return el.corporation.indexOf(selectedCorporation[0].value) > -1 ;
    });
  }

  //filter by expansions
  btnExpansion = document.querySelectorAll(".btn-expansion.active");

  if (btnExpansion.length == 2 ){
    games = games.filter(function(el) {
      return el.expansions != undefined &&
       el.expansions.indexOf(btnExpansion[1].id) > -1 && el.expansions.length == 1
    });
  } else if (btnExpansion.length == 3 ){
    games = games.filter(function(el) {
      return el.expansions != undefined &&
        el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions.indexOf(btnExpansion[2].id) > -1 && el.expansions.length == 2
    });
  } else if (btnExpansion.length == 4 ){
      games = games.filter(function(el) {
        return el.expansions != undefined  &&
        el.expansions.indexOf(btnExpansion[1].id) > -1 &&
        el.expansions.indexOf(btnExpansion[2].id) > -1 &&
        el.expansions.indexOf(btnExpansion[3].id) > -1 && el.expansions.length == 3
    });
  }

  //pushing the new filtered data
  pushData();
}

function pushData() {
  setTimeout(function() {pushGeneralStats()}, 500); //for smoother animation
  pushHistory();
  pushCorporationsData();

}

function pushGeneralStats() {
  //total games
  document.getElementById("total_games").innerHTML = games.length;
}

function pushHistory() {
  //clear the sections
  var x = document.querySelectorAll(".flag-div,.history-section-time-value2, .history-section-corporation2, .history-section-score2, .history-section-generation2, .history-section-expansions2")
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history2");

  for(i=0; i < gameSections.length && i < games.length; i++) {

    //display the flag
    try {country =  games[games.length-1-i]["country"];}
    catch (err) {}
    if (country != undefined && country.length > 1) {
      countryDivContent = '<img class="flag" src="flags/'+country+'.png" title="'+country+'">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    } else {
      countryDivContent = '<img class="flag" src="flags/EU.png" title="EU">';
      gameSections[i].querySelector(".flag-div").innerHTML = countryDivContent;
    }

    //game timestamp in seconds
    try {
      timestamp = games[games.length-1-i]["timestamp"];
      time = now - timestamp;
      gameSections[i].querySelector(".history-section-time-value2").innerHTML = compareTime(time);
    } catch (err) {}


    //the corporations array
    try {
      corporationsSection = gameSections[i].querySelector(".history-section-corporation2");
      scoreSection = gameSections[i].querySelector(".history-section-score2");
      corporationsSection.innerHTML = games[games.length-1-i]["corporation"];}
    catch (err) {}

    try {result = games[games.length-1-i]["result"];
    if (result > 20) {scoreSection.innerHTML = result}
    else {scoreSection.innerHTML = "<span class='failed-number'>"+result+"</span>"}}
    catch (err) {}


    //the expansions
    var expansionsHTML = "";
    try {
      expansionsArray = games[games.length-1-i]["expansions"];
      if (expansionsArray == undefined) {expansionsArray = []}
      expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon corporate-era-icon icon-align2"></div></div>'
      if (expansionsArray.indexOf("VENUS") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon venus-icon icon-align2"></div></div>'
      }
      if (expansionsArray.indexOf("PRELUDE") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon prelude-icon icon-align2"></div></div>'
      }
      if (expansionsArray.indexOf("COLONIES") > -1) {
        expansionsHTML = expansionsHTML + '<div class="history-section-expansion-ribbon"><div class="icon colonies-icon icon-align2"></div></div>'
      }
      gameSections[i].querySelector(".history-section-expansions2").innerHTML = expansionsHTML;
    }   catch (err) {}

  }
}



function changeColours (id) {
  menu = document.getElementById(id);
  if (document.querySelector("option[value='NOT SELECTED']").selected) {menu.classList.remove("change-colours");}
  else {menu.classList.add("change-colours");}
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

function compareTime(time) {
  if (time >= 0 && time < 120) {return "now"}
  if (time >= 120 && time < 7200) {return Math.floor(time/60) + " mins"}
  if (time >= 7200 && time < 172800) {return Math.floor(time/3600) + " hours"}
  if (time >= 172800) {return Math.floor(time/86400) + " days"}
}

function download(data, filename, json) {
    var file = new Blob([GAMES_ALL_JSON], {type: "text/plain;charset=utf-8"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "Solo Games - " + GAMES_ALL.length;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function corporationWinrate(corporationGamesArray) {
  wins = 0;
  for (i=0; i < corporationGamesArray.length; i++) {
    result = parseInt(corporationGamesArray[i]["result"]);
    if (result > 20) {wins++}
  }
  return Math.round(wins*100/corporationGamesArray.length) + "<span style='font-size:12px'>%</span>"
}

function corporationScore(corporationGamesArray) {
  var corp_score = 0;
  var corp_games = 0;
  for (i=0; i < corporationGamesArray.length; i++) {
    result = parseInt(corporationGamesArray[i]["result"]);
    if (result > 20) {
      corp_score = corp_score + result;
      corp_games++;
    }
  }
  return Math.round(corp_score/corp_games)
}

function pushCorporationsData(corporation) {
  //CRIDICOR
  games_credicor = games.filter(function(el) {return el.corporation == "CREDICOR"});
  document.getElementById("games-credicor").innerHTML = games_credicor.length;
  document.getElementById("winrate-credicor").innerHTML =  corporationWinrate(games_credicor);
  document.getElementById("score-credicor").innerHTML =  corporationScore(games_credicor);

}
