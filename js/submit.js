

//disable enter to submit the form
$("#form").keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

/////////////////////////////////////////////////////////////////////////////////////
function checkForm () {
  //code executed when "submit" is clicked
  enableSubmit = true;
  if (document.querySelectorAll("input[name='players']:checked").length < 1 ) {
    //if players button is not clicked
    x = document.querySelectorAll(".btn-players");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("red-outline");
    }
    enableSubmit = false;
  }
  else {
      //if not all* corporation are selected
      //if not all* scores are selected
      x = document.querySelectorAll("select[class='drop-down not-filled'], input[class='corporation-score not-filled']");
      if (x.length > 0) {enableSubmit = false;}
      for (i = 0; i < x.length; i++) {
        x[i].classList.add("red-outline");
      }
  }
  if (document.querySelectorAll("select[name='generations'][class*='change-colours']").length < 1) {
    //if generations are not selected
    document.querySelector(".btn-generations").classList.add("red-outline");
    enableSubmit = false;
  }
  if (document.querySelectorAll("input[name='map']:checked").length < 1 ) {
    //if map is not selected
    x = document.querySelectorAll(".btn-map");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("red-outline");
    }
    enableSubmit = false;
  }

  //generates the modal text
  if (enableSubmit) {
    generateConfirmationText();
    document.getElementById("modalOne").style.display = "block";
    setTimeout(function() {document.querySelector(".modal-window").style.transform = "scale(1)";}, 200);
    }

    else {document.getElementById("submit").disabled = true;}

  //remove the red outlines after 3 seconds
  setTimeout(function(){
    x = document.querySelectorAll(".red-outline");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("red-outline");
    }
    document.getElementById("submit").disabled = false;
  }, 500);
}
/////////////////////////////////////////////////////////////////////////////////////
function displayVenusAwards () {
  x = document.querySelectorAll(".btn-awards");
  v = document.querySelectorAll(".awards-venus");
  if (document.querySelector("input[id='venus']:checked") != null) {
    for (i = 0; i < x.length; i++) {
      x[i].style.height = "30px";
      x[i].style.lineHeight = "30px";
    }
    for (i = 0; i < v.length; i++) {
      v[i].style.display = "inline-block";
    }

  } else {
    for (i = 0; i < x.length; i++) {
      x[i].style.height = "";
      x[i].style.lineHeight = "";
    }
    for (i = 0; i < v.length; i++) {
      v[i].style.display = "none";
    }

  }
}

function changeColours (id) {
  document.getElementById(id).classList.add("change-colours");
  document.getElementById(id).classList.remove("not-filled");
}

function changeColours2 (id) {
  if (document.getElementById(id).value < 20 || document.getElementById(id).value > 300) {
    document.getElementById(id).classList.remove("change-colours");
  }
  else {
    document.getElementById(id).classList.add("change-colours");
  }
}

function enableCorporations() {
  var players = document.querySelector("input[name='players']:checked").value;
  var corps = document.querySelectorAll(".drop-down");
  var scores = document.querySelectorAll("input[name='scores']");
  var options = document.querySelectorAll(".drop-down > option[class='selected-option']");
  for (i = players; i < 5; i++) {
    corps[i].disabled = true;
    corps[i].classList.remove("not-filled");
    corps[i].classList.remove("change-colours");
    options[i].selected = true;
    options[i].innerHTML = "";

    scores[i].disabled = true;
    scores[i].classList.remove("not-filled");
    scores[i].classList.remove("change-colours");
    scores[i].value = "";
    scores[i].placeholder = "";
  }
  for (i = 0; i < players; i++) {
    corps[i].disabled = false;
    corps[i].classList.add("not-filled");
    if (i==0) {
      options[i].innerHTML = "PLAYER 1 < that is you";
    } else {
      options[i].innerHTML = "PLAYER " + parseInt(i+1);
    }
    scores[i].disabled = false;
    scores[i].classList.add("not-filled");
    scores[i].placeholder = "--";
  }
  disableSelectedCorporation();
}

function tharsisAwards() {
  document.getElementById("no-milestones").style.display = "none";
  document.getElementById("no-awards").style.display = "none";
  document.getElementById("tharsis-milestones").style.display = "inline-block";
  document.getElementById("tharsis-awards").style.display = "inline-block";
  document.getElementById("hellas-milestones").style.display = "none";
  document.getElementById("hellas-awards").style.display = "none";
  document.getElementById("elysium-milestones").style.display = "none";
  document.getElementById("elysium-awards").style.display = "none";
  resetAwards();
}

function hellasAwards() {
  document.getElementById("no-milestones").style.display = "none";
  document.getElementById("no-awards").style.display = "none";
  document.getElementById("tharsis-milestones").style.display = "none";
  document.getElementById("tharsis-awards").style.display = "none";
  document.getElementById("hellas-milestones").style.display = "inline-block";
  document.getElementById("hellas-awards").style.display = "inline-block";
  document.getElementById("elysium-milestones").style.display = "none";
  document.getElementById("elysium-awards").style.display = "none";
  resetAwards();
}

function elysiumAwards() {
  document.getElementById("no-milestones").style.display = "none";
  document.getElementById("no-awards").style.display = "none";
  document.getElementById("tharsis-milestones").style.display = "none";
  document.getElementById("tharsis-awards").style.display = "none";
  document.getElementById("hellas-milestones").style.display = "none";
  document.getElementById("hellas-awards").style.display = "none";
  document.getElementById("elysium-milestones").style.display = "inline-block";
  document.getElementById("elysium-awards").style.display = "inline-block";
  resetAwards();
}



//modal functions

var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    document.querySelector(".modal-window").style.transform = "scale(0)";
    setTimeout(function(){
      modal.style.display = "none";
    }, 300); //waiting during the animation duration of closing the modal

  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    document.querySelector(".modal-window").style.transform = "scale(0)";
    setTimeout(function(){
      event.target.style.display = "none";
    }, 300); //waiting during the animation duration of closing the modal
  }
}

function generateConfirmationText () {
  //Get values
  var players = document.querySelector('input[name="players"]:checked').value;
  var generations = document.getElementById("generations").value;
  var expansions = arrayExpansions();
  try {var draft = document.querySelector('input[name="draft"]:checked').value;}
  catch (err) {draft = " "}
  var map = document.querySelector('input[name="map"]:checked').value;
  var milestones = arrayMilestones();
  var awards = arrayAwards();
  //ordering and obtaining the scores and corporations arrays
  orderScoresandCorporations();

  document.getElementById("modalPlayers").innerHTML = players;
  document.getElementById("modalGeneraions").innerHTML = generations;
  document.getElementById("modalCorporations").innerHTML = newCorporations.toString().replace(/,/g, "<br>");
  document.getElementById("modalScores").innerHTML = newScores.toString().replace(/,/g, "<br>");
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
  document.getElementById("modalDraft").innerHTML = draft;
  document.getElementById("modalMap").innerHTML = map;
  document.getElementById("modalMilestones").innerHTML = milestones.toString().replace(/,/g, "<br>");
  document.getElementById("modalAwards").innerHTML = awards.toString().replace(/,/g, "<br>");
}

function closeModal () {
  document.querySelector(".modal-window").style.transform = "scale(0)";
  setTimeout(function(){
    document.getElementById("modalOne").style.display = "none";
  }, 300); //waiting during the animation duration of closing the modal
}

function clearInputs() {
  var corps = document.querySelectorAll(".drop-down");
  var scores = document.querySelectorAll("input[name='scores']");
  var options = document.querySelectorAll(".drop-down > option[class='selected-option']");
  for (i = 0; i < 5; i++) {
    options[i].selected = true;
    options[i].innerHTML = "";
    scores[i].value = "";
    scores[i].placeholder = "";
  }
}
//////////////////////////////////////////////////////////////////////////////
function resetAwards() {
  x = document.querySelectorAll("input[name='milestones']:checked,input[name='awards']:checked ");
  for (i = 0; i < x.length; i++) {
    x[i].checked = false;
  }
}

function limitAwards() {
  const x = document.querySelectorAll("input[name='milestones']:checked");
  if (x.length > 3) { setTimeout(function(){
    x[3].checked = false;
  }, 300);}
  const y = document.querySelectorAll("input[name='awards']:checked");
  if (y.length > 3) { setTimeout(function(){
    y[3].checked = false;}, 500);}
}

function limitColonies() {
  //calculating the max colonies count
  try {playersCount = parseInt(document.querySelector("input[name='players']:checked").value)}
  catch (err) {playersCount = 0}
  coloniesMax = 2 + playersCount;
  if (document.querySelectorAll("option[value='ARIDOR']:checked").length > 0) {coloniesMax++} //add 1 if Aridor is in play
  if (playersCount == 2) {coloniesMax++}

  const coloniesChecked = document.querySelectorAll("input[name='colonies']:checked");
  if (coloniesChecked.length > coloniesMax) { setTimeout(function(){
    for (i=0; i < coloniesChecked.length - coloniesMax; i++) {
      coloniesChecked[coloniesChecked.length-i-1].checked = false;
    }
  }, 300);}
}

function disableSelectedCorporation() {
  //disabling corporations options when that corporation is alreaydy chosen
  //enabling all disabled options
  disabled = document.querySelectorAll("option:disabled");
  for (i = 0; i < disabled.length; i++) {
    if (disabled[i].value.length > 1) {
      disabled[i].disabled = false;
    }
  }
  //disabling the current selections
  var x = document.querySelectorAll("select[name='corporations']");
  for (i = 0; i < x.length; i++) {
    if (x[i].value.length > 1) {
      var y = document.querySelectorAll("option[value='"+ x[i].value +"']");
      if (x[i].value != "BEGINNER") {
        for (j = 0; j < y.length; j++) {
          y[j].disabled =true;
        }
      }
    }
  }
}

function toggleColoniesDiv() {
  div = document.querySelector(".fieldset-colonies");
  div.classList.toggle("checkbox");
}

function resizeDivs() {
 mapsDiv = document.querySelector(".fieldset-maps");
 mapsDiv.classList.toggle("fieldset-maps-resized");

 btnMap = document.querySelectorAll(".btn-map");
 for (i=0; i < btnMap.length; i++) {
   btnMap[i].classList.toggle("btn-map-resized");
 }

 awardsDiv = document.querySelectorAll(".awards");
 for (i=0; i < awardsDiv.length; i++) {
   awardsDiv[i].classList.toggle("fieldset-awards-resized");
 }

 btnAwards = document.querySelectorAll(".btn-awards");
 for (i=0; i < btnAwards.length; i++) {
   btnAwards[i].classList.toggle("btn-awards-resized");
 }
}
