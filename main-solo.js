countryValue = "";
try {getCountry();}
catch (err) {console.log("cannot get country")}

// Reference Games collection
var gamesRef = firebase.database().ref("games-solo");
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

  //Get values
  var corporation = document.getElementById("corporation").value;
  var expansions = arrayExpansions();
  var map = document.querySelector('input[name="map"]:checked').value;
  var mode = document.querySelector('input[name="mode"]:checked').value;
  var timestamp = Math.floor((new Date()).getTime() / 1000);
  var country = countryValue;

  //win and loss saves data in result - losses keeps values under 10
  if (outcome == "win") {
    result = document.getElementById("corporation-score").value
  } else { result = document.getElementById("steps").value }


  // Save Game
  saveGame(corporation, expansions, result, mode, map, timestamp, country);

  //clear form
  document.getElementById("form").reset();
  resetAll();
}

// Save Game to firebasejs
function saveGame(corporation, expansions, result, mode, map, timestamp, country) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    corporation: corporation,
    expansions: expansions,
    result: result,
    mode: mode,
    map: map,
    timestamp: timestamp,
    country: country
  })
}

//getting form values

function arrayExpansions() {
  expansions = [];
  x = document.querySelectorAll('input[name="expansions"]:checked');
  for (i=0; i < x.length; i++) {
      expansions.push(x[i].value);
  }
  return expansions;
}
