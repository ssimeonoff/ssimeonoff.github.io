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
  console.log(games.length)

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

  console.log(games.length)
  //pushing the new filtered data
  pushData();
}

function pushData() {
  setTimeout(function() {pushGeneralStats()}, 500); //for smoother animation
  pushHistory();

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

  for(i=0; i < gameSections.length ; i++) {

    //game timestamp in seconds
    try {
      timestamp = games[games.length-1-i]["timestamp"];
      time = now - timestamp;
      gameSections[i].querySelector(".history-section-time-value2").innerHTML = compareTime(time);
    } catch (err) {}


    //the corporations array
    corporationsSection = gameSections[i].querySelector(".history-section-corporation2");
    scoreSection = gameSections[i].querySelector(".history-section-score2");
    try {corporationsSection.innerHTML = games[games.length-1-i]["corporation"];}
    catch (err) {}

    result = games[games.length-1-i]["result"];
    if (result > 20) {scoreSection.innerHTML = result}
    else {scoreSection.innerHTML = "<span class='failed-number'>"+result+"</span>"}


    //the expansions
    var expansionsHTML = "";
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
