
//event listeners to change clicked elements designs
document.getElementById("generations").addEventListener("input", changeColours);
document.getElementById("corporation1").addEventListener("input", changeColours);
document.getElementById("corporation1-score").addEventListener("input", changeColours2);
document.getElementById("corporation2").addEventListener("input", changeColours);
document.getElementById("corporation2-score").addEventListener("input", changeColours2);
document.getElementById("corporation3").addEventListener("input", changeColours);
document.getElementById("corporation3-score").addEventListener("input", changeColours2);
document.getElementById("corporation4").addEventListener("input", changeColours);
document.getElementById("corporation4-score").addEventListener("input", changeColours2);
document.getElementById("corporation5").addEventListener("input", changeColours);
document.getElementById("corporation5-score").addEventListener("input", changeColours2);
document.getElementById("venus").addEventListener("input", displayVenusAwards);
/////////////////////////////////////////////////////////////////////////////////////
function checkForm () {
  //code executed every time there is an input in the form
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
  if (document.querySelectorAll("input[name='draft']:checked").length < 1 ) {
    //if draft is selected
    x = document.querySelectorAll("label[for*='draft']");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("red-outline");
    }
    enableSubmit = false;
  }
  if (document.querySelectorAll("input[name='map']:checked").length < 1 ) {
    //if map is selected
    x = document.querySelectorAll(".btn-map");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("red-outline");
    }
    enableSubmit = false;
  }

  //generates the modal t
  if (enableSubmit) {
    generateConfirmationText();
    document.getElementById("modalOne").style.display = "block";
    setTimeout(function() {document.querySelector(".modal-window").style.transform = "scale(1)";}, 100);
    }

  //remove the red outlines after 3 seconds
  setTimeout(function(){
    x = document.querySelectorAll(".red-outline");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("red-outline");
    }
  }, 2000);
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

function changeColours () {
  this.classList.add("change-colours");
  this.classList.remove("not-filled");

}

function changeColours2 () {
  if (this.value < 20) {
    this.classList.remove("change-colours");
  }
  else {
    this.classList.add("change-colours");
  }
}

function enableCorporations() {
  var players = document.querySelector("input[name='players']:checked").value;
  var corps = document.querySelectorAll(".drop-down");
  var scores = document.querySelectorAll("input[name='scores']");
  for (i = 0; i < 5; i++) {
    corps[i].disabled = true;
    corps[i].classList.remove("not-filled");
    scores[i].disabled = true;
    scores[i].classList.remove("not-filled");
  }
  for (i = 0; i < players; i++) {
    corps[i].disabled = false;
    corps[i].classList.add("not-filled");
    scores[i].disabled = false;
    scores[i].classList.add("not-filled");
  }

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
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    document.querySelector(".modal-window").style.transform = "scale(0)";
    setTimeout(function(){
      event.target.style.display = "none";
    }, 300); //waiting for the animation duration of closing the modal
  }
}

function generateConfirmationText () {
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


  document.getElementById("modalPlayers").innerHTML = players;
  document.getElementById("modalGeneraions").innerHTML = generations;
  document.getElementById("modalCorporations").innerHTML = corporations.toString().replace(/,/g, " - ");
  document.getElementById("modalScores").innerHTML = scores.toString().replace(/,/g, " - ");
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
  document.getElementById("modalDraft").innerHTML = draft;
  document.getElementById("modalMap").innerHTML = map;
  document.getElementById("modalMilestones").innerHTML = milestones.toString().replace(/,/g, " - ");
  document.getElementById("modalAwards").innerHTML = awards.toString().replace(/,/g, " - ");
}

function closeModal () {
  document.getElementById("modalOne").style.display = "none";
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
    y[3].checked = false;}, 300);}
}
