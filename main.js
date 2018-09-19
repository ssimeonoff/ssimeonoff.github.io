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
  const asArray = Object.keys(val)
    //.map(key => Object.assign({}, val[key], { key }))
    .map(key => val[key])
  console.log(asArray);
  console.log(asArray.length);
  setTimeout(function(){document.getElementById("title3").innerHTML = asArray.length;
}, 500)
  console.log(asArray[asArray.length-1]);
})


//listen for form SUBMIT
document.getElementById("form").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var players = document.querySelector('input[name="players"]:checked').value;
  var generations = document.getElementById("generations").value;
  var corporations = arrayCorporations();
  var scores = arrayScores();
  var expansions = arrayExpansions();
  var draft = document.querySelector('input[name="draft"]:checked').value;
  var map = document.querySelector('input[name="map"]:checked').value;
  var milestones = arrayMilestones();
  var awards = arrayAwards();

  // Save Game
  saveGame(players, generations, corporations, scores, expansions, draft, map, milestones, awards);

  //Show aleart
  setTimeout(function(){
    $(".alert").fadeIn(2000);
  }, 1000);

  //clear form
  document.getElementById("form").reset();
  resetAll();

  //hide alert after 3 seconds
  setTimeout(function(){
    $(".alert").fadeOut(1000);
  }, 6000);

}

// Save Game to firebasejs
function saveGame(players, generations, corporations, scores, expansions, draft, map, milestones, awards) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    players: players,
    generations: generations,
    corporations: corporations,
    scores: scores,
    expansions: expansions,
    draft: draft,
    map: map,
    milestones: milestones,
    awards: awards
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
  document.getElementById("submit").disabled = true;
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
}
