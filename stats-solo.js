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
  pushData();

});

function filterFunction(id) {
  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}
  console.log(navigator.geolocation.getCurrentPosition(success, error, options))
  console.log("hi")











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
  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history2");

  for(i=0; i < gameSections.length ; i++) {

    //game timestamp in seconds
    timestamp = games[games.length-1-i]["timestamp"];
    if (timestamp == undefined) {time = "unknown"}
    else {time = now - timestamp;}
    gameSections[i].querySelector(".history-section-time-value").innerHTML = compareTime(time);

    //the corporations array
    corporationsSection = gameSections[i].querySelector(".history-section-corporation");
    scoreSection = gameSections[i].querySelector(".history-section-score");
    corporationsSection.innerHTML = games[games.length-1-i]["corporation"];

    result = games[games.length-1-i]["result"];
    if (result > 20) {scoreSection.innerHTML = result}
    else {scoreSection.innerHTML = "<span class='failed-number'>"+result+"</span>"}


    // the generations

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
    gameSections[i].querySelector(".history-section-expansions").innerHTML = expansionsHTML;

  }
}

function compareTime(time) {
  if (time < 120) {return "just now"}
  if (time >= 120 && time < 3600) {return Math.floor(time/60) + " minutes"}
  if (time >= 3600) {return Math.floor(time/3600) + " hours"}
}

function changeColours (id) {
  menu = document.getElementById(id);
  if (document.querySelector("option[value='NOT SELECTED']").selected) {menu.classList.remove("change-colours");}
  else {menu.classList.add("change-colours");}
}
