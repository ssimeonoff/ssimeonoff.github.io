
function init() {
 Tabletop.init( { key: '1kJG6JEcDoLQ8JbU7Lvbkiajuf1689jZvCKcz5YWG81Q',
 callback: showInfo,
 simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init);

function showInfo (data,tabletop) {
  console.log(data);
  console.log(JSON.stringify(data));
}


//event listeners to change clicked elements designs
document.getElementById("generations").addEventListener("input", changeColours);
document.getElementById("corporation1").addEventListener("input", changeColours);
document.getElementById("corporation1-points").addEventListener("input", changeColours2);
document.getElementById("corporation2").addEventListener("input", changeColours);
document.getElementById("corporation2-points").addEventListener("input", changeColours2);
document.getElementById("corporation3").addEventListener("input", changeColours);
document.getElementById("corporation3-points").addEventListener("input", changeColours2);
document.getElementById("corporation4").addEventListener("input", changeColours);
document.getElementById("corporation4-points").addEventListener("input", changeColours2);
document.getElementById("corporation5").addEventListener("input", changeColours);
document.getElementById("corporation5-points").addEventListener("input", changeColours2);
document.getElementById("venus").addEventListener("input", displayVenusAwards);
/////////////////////////////////////////////////////////////////////////////////////
function checkForm () {
  enableSubmit = true;
  if (document.querySelectorAll("input[name='players']:checked").length < 1 ) {
    //if players button is not clicked
    enableSubmit = false;
  }
  else {
    if (document.querySelectorAll("select[name='corporations'][class*='change-colours']").length < document.querySelector("input[name='players']:checked").value) {
      //if not all* corporation are selected
      enableSubmit = false;
    }
    if (document.querySelectorAll("input[name='scores'][class*='change-colours']").length < document.querySelector("input[name='players']:checked").value) {
      //if not all* scores are selected
      enableSubmit = false;
    }
  }
  if (document.querySelectorAll("select[name='generations'][class*='change-colours']").length < 1) {
    //if generations are selected
    enableSubmit = false;
  }
  if (document.querySelectorAll("input[name='draft']:checked").length < 1 ) {
    //if draft is selected
    enableSubmit = false;
  }
  if (document.querySelectorAll("input[name='map']:checked").length < 1 ) {
    //if map is selected
    enableSubmit = false;
  }

  //letting max 3 awards/milestones to be clicked


  //enables or disables the submit button
  if (enableSubmit) {document.getElementById("submit").disabled = false;}
  else {document.getElementById("submit").disabled = true;}
  console.log(JSON.stringify($("form").serializeArray()));
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
}

function changeColours2 () {
  if (this.value < 20) {
    this.classList.remove("change-colours");
  }
  else {
    this.classList.add("change-colours");
  }
}


function submitForm () {
      console.log("ok");
}

function clickedButton (id) {
  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}
  console.log(clickedElementID);
}

function enableTwoCorporations() {
  document.getElementById("corporation1").disabled = false;
  document.getElementById("corporation1-points").disabled = false;
  document.getElementById("corporation2").disabled = false;
  document.getElementById("corporation2-points").disabled = false;
  document.getElementById("corporation3").disabled = true;
  document.getElementById("corporation3-points").disabled = true;
  document.getElementById("corporation4").disabled = true;
  document.getElementById("corporation4-points").disabled = true;
  document.getElementById("corporation5").disabled = true;
  document.getElementById("corporation5-points").disabled = true;
}

function enableThreeCorporations() {
  document.getElementById("corporation1").disabled = false;
  document.getElementById("corporation1-points").disabled = false;
  document.getElementById("corporation2").disabled = false;
  document.getElementById("corporation2-points").disabled = false;
  document.getElementById("corporation3").disabled = false;
  document.getElementById("corporation3-points").disabled = false;
  document.getElementById("corporation4").disabled = true;
  document.getElementById("corporation4-points").disabled = true;
  document.getElementById("corporation5").disabled = true;
  document.getElementById("corporation5-points").disabled = true;
}

function enableFourCorporations() {
  document.getElementById("corporation1").disabled = false;
  document.getElementById("corporation1-points").disabled = false;
  document.getElementById("corporation2").disabled = false;
  document.getElementById("corporation2-points").disabled = false;
  document.getElementById("corporation3").disabled = false;
  document.getElementById("corporation3-points").disabled = false;
  document.getElementById("corporation4").disabled = false;
  document.getElementById("corporation4-points").disabled = false;
  document.getElementById("corporation5").disabled = true;
  document.getElementById("corporation5-points").disabled = true;
}

function enableFiveCorporations() {
  document.getElementById("corporation1").disabled = false;
  document.getElementById("corporation1-points").disabled = false;
  document.getElementById("corporation2").disabled = false;
  document.getElementById("corporation2-points").disabled = false;
  document.getElementById("corporation3").disabled = false;
  document.getElementById("corporation3-points").disabled = false;
  document.getElementById("corporation4").disabled = false;
  document.getElementById("corporation4-points").disabled = false;
  document.getElementById("corporation5").disabled = false;
  document.getElementById("corporation5-points").disabled = false;
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
}

//modal functions
var modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = "block";
  }
});

var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}
