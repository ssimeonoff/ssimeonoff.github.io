$("#form").keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
/////////////////////////////////////////////////////////////////////////////////////
outcome = "";
function checkForm () {
  //code executed when "submit" is clicked

  enableSubmit = true;
  //if corporation is not selected
  if (document.querySelectorAll("select[class='drop-down3 change-colours2']").length < 1) {
    enableSubmit = false;
    document.getElementById("corporation").classList.add("red-outline");
   };
   //if map is not selected
  if (document.querySelectorAll("input[name='map']:checked").length < 1 ) {
     x = document.querySelectorAll(".map");
     for (i = 0; i < x.length; i++) {
       x[i].classList.add("red-outline");
     }
     enableSubmit = false;
   }

   //if mode is not selected
  if (document.querySelectorAll("input[name='mode']:checked").length < 1 ) {
     x = document.querySelectorAll(".mode");
     for (i = 0; i < x.length; i++) {
       x[i].classList.add("red-outline");
     }
     enableSubmit = false;
   }
   //if win/loss are not selected
   if (outcome.length < 1){
     document.getElementById("winLabel").classList.add("red-outline");
     document.getElementById("lossLabel").classList.add("red-outline");
     enableSubmit = false;
   }
   //if loss is selected but not steps
   if (outcome == "loss" && document.querySelectorAll(".drop-down2.change-colours2").length <1) {
     document.getElementById("steps").classList.add("red-outline");
     enableSubmit = false;
   }
   //if win is selected but no score
   if (outcome == "win" && document.querySelectorAll(".corporation-score.change-colours2").length <1) {
     document.getElementById("corporation-score").classList.add("red-outline");
     enableSubmit = false;
   }


  //generates the modal text
  if (enableSubmit) {
    document.getElementById("confirm").style.display = "block";
    } else { document.getElementById("submit").disabled = true;}

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

function changeColours2 (id) {
  document.getElementById(id).classList.add("change-colours2");
  document.getElementById(id).classList.remove("not-filled");
}

function changeColours2a (id) {
  if (document.getElementById(id).value < 20 || document.getElementById(id).value > 200) {
    document.getElementById(id).classList.remove("change-colours2");
  }
  else {
    document.getElementById(id).classList.add("change-colours2");
  }
}

function generateConfirmationText () {

  var corporation = document.getElementById("corporation").value;
  var expansions = arrayExpansions();
  var map = document.querySelector('input[name="map"]:checked').value;
  var result = outcome.toUpperCase();
  var mode = document.querySelector('input[name="mode"]:checked').value;


  if (outcome == "win") {
    result = outcome.toUpperCase() + " - " + document.getElementById("corporation-score").value;
  } else {
    result = outcome.toUpperCase() + " by " + document.getElementById("steps").value + " STEPS";
  }


  document.getElementById("modalResult").innerHTML = result;
  document.getElementById("modalCorporation").innerHTML = corporation;
  document.getElementById("modalMap").innerHTML = map;
  document.getElementById("modalMode").innerHTML = mode;
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
}

function animateTakeOff() {
  console.log("hi")
  el = document.getElementById("submit-container")
  el.style.transform = "scale(0)";

  setTimeout(function(){
  el.style.transform = "scale(1)";
  },1000)
}

function resetAll () {
  //clear the selected colour
  setTimeout(function(){
  outcome = "";

  x = document.querySelectorAll(".change-colours2");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours2");
  }
  y = document.querySelectorAll(".change-colours3");
  for (j=0; j < y.length; j++) {
    y[j].classList.remove("change-colours3");
  }
    document.getElementById("winSection").style.backgroundPosition = "250px 0px";
    document.getElementById("winSection").style.width = "177px";
    document.getElementById("winLabel").innerHTML = "WIN";

    document.getElementById("lossSection").style.backgroundPosition = "-120px -9px";
    document.getElementById("lossSection").style.width = "177px";
    document.getElementById("lossLabel").innerHTML = "LOSS";

    document.getElementById("corporation-score").style.display = "none";
    document.getElementById("corporation-score").style.transform = "scale(0)";
    document.getElementById("steps").style.display = "none";
    document.getElementById("steps").style.transform = "scale(0)";

    document.getElementById("confirm").style.display = "none";
  }, 500)
}

function activateWin(id) {
  outcome ="win";
  el = document.getElementById(id);
  el2 = document.getElementById("lossSection");


  el.classList.add("change-colours3");
  document.getElementById("winLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "145px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "-120px";
  el2.classList.remove("change-colours3");
  document.getElementById("lossLabel").innerHTML = "LOSS";
  document.getElementById("steps").style.display ="none";
  document.getElementById("steps").style.transform = "scale(0)";
  document.getElementById("corporation-score").style.display = "block";
  setTimeout(function() {
    document.getElementById("corporation-score").style.transform = "scale(1)";
  }, 100)
}


function activateLoss(id) {
  outcome = "loss";
  el = document.getElementById(id);
  el2 = document.getElementById("winSection");


  el.classList.add("change-colours3");
  document.getElementById("lossLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "-15px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "250px";
  el2.classList.remove("change-colours3");
  document.getElementById("winLabel").innerHTML = "WIN";
  document.getElementById("steps").style.display ="block";
  document.getElementById("corporation-score").style.display = "none";
  document.getElementById("corporation-score").style.transform = "scale(0)";
  setTimeout(function() {
    document.getElementById("steps").style.transform = "scale(1)";
  }, 100)
}
