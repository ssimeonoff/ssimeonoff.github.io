// Initialize Firebase
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
  games = Object.keys(val)
    //.map(key => Object.assign({}, val[key], { key }))
    .map(key => val[key])
    document.getElementById("title3").innerHTML = games.length; //for the odometer counter
    pushHistory();
})



//listen for form SUBMIT
document.getElementById("form").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var players = document.querySelector('input[name="players"]:checked').value;
  var generations = document.getElementById("generations").value;

  var expansions = arrayExpansions();
  var draft = document.querySelector('input[name="draft"]:checked').value;
  var wgt = document.querySelector('input[name="wgt"]:checked').value;
  var map = document.querySelector('input[name="map"]:checked').value;
  var milestones = arrayMilestones();
  var awards = arrayAwards();
  var timestamp = Math.floor((new Date()).getTime() / 1000);
  //ordering the two arrays by the scores values
  var corporations = newCorporations;
  var scores = newScores;


  // Save Game
  saveGame(players, generations, corporations, scores, expansions, draft, wgt, map, milestones, awards, timestamp);
  clearInputs(); //to clear the drop-downs and inputs after the submission

  //Show aleart
    document.getElementById("submit").style.opacity = 0;
    setTimeout(function(){
      document.getElementById("submit").style.display = "none";
      document.querySelector(".alert").style.display = "block";
    }, 300);
  setTimeout(function(){
    document.querySelector(".alert").style.opacity = 1;
  },600);
  setTimeout(function(){
  document.querySelector(".alert").style.backgroundPosition = "90% 2px";
},1100);


  //clear form
  document.getElementById("form").reset();
  resetAll();

  //hide alert after 3 seconds

  setTimeout(function(){
    document.querySelector(".alert").style.backgroundPosition = "90% 60px";
    setTimeout(function(){
      document.querySelector(".alert").style.opacity = 0;
    },500);
    setTimeout(function(){
    document.querySelector(".alert").style.display = "none";
    document.getElementById("submit").style.display = "block";
  }, 800);
  setTimeout(function(){
  document.getElementById("submit").style.opacity = 1;
}, 1100);
}, 5000);

}

// Save Game to firebasejs
function saveGame(players, generations, corporations, scores, expansions, draft, wgt,  map, milestones, awards, timestamp) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    players: players,
    generations: generations,
    corporations: corporations,
    scores: scores,
    expansions: expansions,
    draft: draft,
    wgt: wgt,
    map: map,
    milestones: milestones,
    awards: awards,
    timestamp: timestamp
  })
}

//getting form values
function arrayCorporations () {
  corporations = [];
  x = document.querySelectorAll(".drop-down");
  for (i=0; i < x.length; i++) {
    if (x[i].value.length > 1) {
      corporations.push(x[i].value);
    } else {
      break
    }
  }
  return corporations;
}

function arrayScores () {
  scores = [];
  x = document.querySelectorAll(".corporation-score");
  for (i=0; i < x.length; i++) {
    if (x[i].value.length > 1) {
      scores.push(x[i].value);
    } else {
      break
    }
  }
  return scores;
}

function arrayExpansions() {
  expansions = [];
  x = document.querySelectorAll('input[name="expansions"]:checked');
  for (i=0; i < x.length; i++) {
      expansions.push(x[i].value);
  }
  return expansions;
}

function arrayMilestones() {
  milestones = [];
  x = document.querySelectorAll('input[name="milestones"]:checked');
  for (i=0; i < x.length; i++) {
      milestones.push(x[i].value);
  }
  return milestones;
}

function arrayAwards() {
  awards = [];
  x = document.querySelectorAll('input[name="awards"]:checked');
  for (i=0; i < x.length; i++) {
      awards.push(x[i].value);
  }
  return awards;
}

function resetAll () {
  //clear the selected colour
  x = document.querySelectorAll(".change-colours");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours");
  }
  x = document.querySelectorAll(".drop-down, .corporation-score");
  for (i=0; i < x.length; i++) {
    x[i].disabled = true;
  }
  x = document.querySelectorAll(".awards");
  for (i=0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("no-milestones").style.display="inline-block";
  document.getElementById("no-awards").style.display="inline-block";

  //enabling all disabled options
  disabled = document.querySelectorAll("option:disabled");
  for (i = 0; i < disabled.length; i++) {
    if (disabled[i].value.length > 1) {
      disabled[i].disabled = false;
    }
  }
}

///History functions
function pushHistory() {
  //clear the sections
  var x = document.querySelectorAll(".history-section-time-value, .history-section-corporation, .history-section-score, .history-section-generation, .history-section-expansions")
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //remove the highlights
  var y = document.querySelectorAll(".highlight-winner")
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove("highlight-winner");
  }

  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history");

  for(i=0; i < gameSections.length ; i++) {

    //game timestamp in seconds
    timestamp = games[games.length-1-i]["timestamp"];
    time = now - timestamp;
    gameSections[i].querySelector(".history-section-time-value").innerHTML = compareTime(time);

    //the corporations array
    corporationsSections = gameSections[i].querySelectorAll(".history-section-corporation");
    scoresSections = gameSections[i].querySelectorAll(".history-section-score");
    var corporationsArray =  games[games.length-1-i]["corporations"];
    var scoresArray = games[games.length-1-i]["scores"];
    var winnerIndex = indexOfMax(scoresArray);
    var winningScore = scoresArray[winnerIndex];

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
  }
}

function compareTime(time) {
  if (time < 120) {return "Just now"}
  if (time >= 120 && time < 3600) {return Math.floor(time/60) + " minutes"}
  if (time >= 3600) {return  Math.floor(time/3600) + " hours"}
}

function indexOfMax(arr) {
    if (arr.length < 1) {
        return 0;
    } else {

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
}

function orderScoresandCorporations() {

  //sorting scores and corporations and generating two new arrays
  //newScores and newCorporations
  oldScores = arrayScores();
  oldCorporations = arrayCorporations();
  newScores = [];
  newCorporations = [];

  for (var j = 0; j < oldScores.length;) {

    var maxValueIndex = indexOfMax(oldScores);
    //populating the new arrays
    newScores.push(oldScores[maxValueIndex])
    newCorporations.push(oldCorporations[maxValueIndex]);

    oldScores.splice(maxValueIndex, 1);
    oldCorporations.splice(maxValueIndex, 1);
  }
}
