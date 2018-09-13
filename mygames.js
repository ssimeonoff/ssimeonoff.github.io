
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

function changeColours () {
  this.style.background = "#444";
  this.style.color = "white";
  this.style.boxShadow = "none";
  this.style.border = "2px solid rgb(221,221,221)";
  this.style.borderTop = "2px solid rgb(137,137,137)";
  this.style.borderLeft = "2px solid rgb(137,137,137)";
}

function changeColours2 () {
  if (this.value < 20) {
  this.style.background = "";
  this.style.color = "";
  this.style.border = "";
  this.style.boxShadow = "";
  }
  else {
    this.style.background = "#444";
    this.style.color = "white";
    this.style.boxShadow = "none";
    this.style.border = "2px solid rgb(221,221,221)";
    this.style.borderTop = "2px solid rgb(137,137,137)";
    this.style.borderLeft = "2px solid rgb(137,137,137)";
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
