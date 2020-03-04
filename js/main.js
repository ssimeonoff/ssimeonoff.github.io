countryValue = "";

try {getCountry();}
catch (err) {console.log("cannot get country")}

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
//get the signed user
user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    GAMES_ALL = JSON.parse(localStorage.getItem("games"));
    games = GAMES_ALL.filter(function(el) {
      return el.email != undefined && el.email == user.email;
    });
    document.getElementById("title3").innerHTML = games.length; //for the odometer counter
    console.log("logged")
    document.getElementById("account-name").innerHTML = user.displayName + "<br>" + user.email
    pushHistory();
  } else {
    // No user is signed in.
    console.log("not logged")
    document.getElementById("account-name").innerHTML = "<a class='link-auth' href='https://ssimeonoff.github.io/login'>Sign in</a>Not Signed<br>Personal statistics are unavailable"
  }
});

// Reference Games collection
var gamesRef = firebase.database().ref("games-production");

//listen for form SUBMIT
document.getElementById("form").addEventListener("submit", submitForm);

//get user's country code
function getCountry() {
 $.getJSON('https://ipapi.co/json/', function(data) {
    geo = JSON.stringify(data, null, 2)
    geo = JSON.parse(geo)
    countryValue = geo["country"];
    console.log(countryValue);
  });
}

// Submit form
function submitForm(e) {
  e.preventDefault();

  email = "";
  name = "";
  if (user != null) {
    console.log(user.displayName)
    name = user.displayName;
    email = user.email;
  }
  var players = document.querySelector('input[name="players"]:checked').value;
  var rank = player1Rank;
  var generations = document.getElementById("generations").value;

  var expansions = arrayExpansions();
  var draft = getDraft();
  var wgt = getWGT();
  var map = document.querySelector('input[name="map"]:checked').value;
  var milestones = arrayMilestones();
  var awards = arrayAwards();
  var timestamp = firebase.database.ServerValue.TIMESTAMP;
  //ordering the two arrays by the scores values
  var corporations = newCorporations;
  var scores = newScores;
  var country = countryValue;
  var colonies = "";
  if (expansions.indexOf("COLONIES")>-1){colonies = arrayColonies();}



  // Save Game
  saveGame(name, email, players, rank,  generations, corporations, scores, expansions, draft, wgt, map, milestones, awards, timestamp, country, colonies);
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
function saveGame(name, email, players, rank, generations, corporations, scores, expansions, draft, wgt,  map, milestones, awards, timestamp, country, colonies) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    name: name,
    email: email,
    players: players,
    rank: rank,
    generations: generations,
    corporations: corporations,
    scores: scores,
    expansions: expansions,
    draft: draft,
    wgt: wgt,
    map: map,
    milestones: milestones,
    awards: awards,
    timestamp: timestamp,
    country: country,
    colonies: colonies
  })
  //increment firebase games count by 1
  firebase.database().ref("count").child("multi").transaction(function(games) {return games + 1});
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

function arrayColonies() {
  colonies = [];
  x = document.querySelectorAll('input[name="colonies"]:checked');
  for (i=0; i < x.length; i++) {
      colonies.push(x[i].value);
  }
  return colonies;
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
  //recover from colonies selection
  div = document.querySelector(".fieldset-colonies");
  div.classList.add("checkbox");

  mapsDiv = document.querySelector(".fieldset-maps");
  mapsDiv.classList.remove("fieldset-maps-resized");

  btnMap = document.querySelectorAll(".btn-map");
   for (i=0; i < btnMap.length; i++) {
     btnMap[i].classList.remove("btn-map-resized");
   }

  awardsDiv = document.querySelectorAll(".awards");
   for (i=0; i < awardsDiv.length; i++) {
     awardsDiv[i].classList.remove("fieldset-awards-resized");
   }

   btnAwards = document.querySelectorAll(".btn-awards");
   for (i=0; i < btnAwards.length; i++) {
     btnAwards[i].classList.remove("btn-awards-resized");
   }
}

///History functions
function pushHistory() {

  //clear the sections
  var x = document.querySelectorAll(".flag-div,.history-section-submitted,.history-section-map-value, .history-section-corporation, .history-section-time, .history-section-score, .history-section-generation, .history-section-expansions")
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  //remove the highlights
  var y = document.querySelectorAll(".highlight-winner,.highlight-owner")
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove("highlight-winner");
    y[i].classList.remove("highlight-owner");

  }
  //remove dark background
  var z = document.querySelectorAll(".dark-background")
  for (i = 0; i < z.length; i++) {
    z[i].classList.remove("dark-background");
  }

  //current time in seconds
  now = Math.floor((new Date()).getTime() / 1000);
  gameSections = document.querySelectorAll(".grid-cell-history-submit");

  for(i=0; i < gameSections.length && i < games.length ; i++) {

    if (games.length-i > 0) {
      //add dark background to the headers
      gameSections[i].querySelector(".history-section-header").classList.add("dark-background");
      gameSections[i].querySelector(".history-section-generation").classList.add("dark-background");
    }
    //game timestamp in seconds
    timestamp = games[games.length-1-i]["timestamp"];
    if (timestamp == undefined) {gameSections[i].querySelector(".history-section-time").innerHTML = "-- ----"}
    else {
      time = now - timestamp;
      gameSections[i].querySelector(".history-section-time").innerHTML = compareTime(time);

    }

    //the corporations array
    corporationsSections = gameSections[i].querySelectorAll(".history-section-corporation");
    scoresSections = gameSections[i].querySelectorAll(".history-section-score");
    var corporationsArray =  games[games.length-1-i]["corporations"];
    var scoresArray = games[games.length-1-i]["scores"];
    var rank = games[games.length-1-i]["rank"];
    var winnerIndex = indexOfMax(scoresArray);
    var winningScore = scoresArray[winnerIndex];

    //highlight the winner and the owner
    for (j=0; j < scoresArray.length; j++) {
      corporationsSections[j].innerHTML = corporationsArray[j];
      scoresSections[j].innerHTML = scoresArray[j];
      if (scoresArray[j] == winningScore) {
        corporationsSections[j].classList.add("highlight-winner");
        scoresSections[j].classList.add("highlight-winner");
      }
      if (j==rank) {
        corporationsSections[j].classList.add("highlight-owner");
        scoresSections[j].classList.add("highlight-owner");
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

    //the map
    var map = games[games.length-1-i]["map"]
    var el = gameSections[i].querySelector(".history-section-map")
    if (map == "THARSIS") {el.innerHTML = "<div class='history-section-map-value' style='background:#ee792b'>"+map+"</div>"}
    if (map == "HELLAS") {el.innerHTML = "<div class='history-section-map-value' style='background:#3b9ae3'>"+map+"</div>"}
    if (map == "ELYSIUM") {el.innerHTML = "<div class='history-section-map-value' style='background:#09aa09'>"+map+"</div>"}

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

    //add name of the submitter
    var el = gameSections[i].querySelector(".history-section-submitted")
    if (games[games.length-1-i]["name"] != undefined) {
      if (games[games.length-1-i]["name"].length < 2) {el.innerHTML = ""}
      else {el.innerHTML = games[games.length-1-i]["name"]}
    }

  }
}

function compareTime(time) {
  if (time >= 0 && time < 120) {return "now"}
  if (time >= 120 && time < 7200) {return Math.floor(time/60) + " m"}
  if (time >= 7200 && time < 172800) {return Math.floor(time/3600) + " h"}
  if (time >= 172800) {return Math.floor(time/86400) + " d"}
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

  player1Corporation = oldCorporations[0];

  for (var j = 0; j < oldScores.length;) {

    var maxValueIndex = indexOfMax(oldScores);
    //populating the new arrays
    newScores.push(oldScores[maxValueIndex])
    newCorporations.push(oldCorporations[maxValueIndex]);

    oldScores.splice(maxValueIndex, 1);
    oldCorporations.splice(maxValueIndex, 1);
  }

  player1Rank = newCorporations.indexOf(player1Corporation);
}

function getDraft() {
  var draft = "NO";
  try {draft = document.querySelector('input[name="draft"]:checked').value;}
  catch (err) {}
  return draft
}

function getWGT() {
  var wgt = "NO";
  try {wgt = document.querySelector('input[name="wgt"]:checked').value;}
  catch (err) {}
  return wgt
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
