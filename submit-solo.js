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
  if (document.querySelectorAll("select[class='drop-down change-colours']").length < 1) {
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
   //if win/loss are not selected
   if (outcome.length < 1){
     document.getElementById("winLabel").classList.add("red-outline");
     document.getElementById("lossLabel").classList.add("red-outline");
     enableSubmit = false;
   }
   //if loss is selected but not steps
   if (outcome == "loss" && document.querySelectorAll(".drop-down2.change-colours").length <1) {
     document.getElementById("steps").classList.add("red-outline");
   }
   //if win is selected but no score
   if (outcome == "win" && document.querySelectorAll(".corporation-score.change-colours").length <1) {
     document.getElementById("corporation-score").classList.add("red-outline");
   }


  //generates the modal text
  if (enableSubmit) {
    generateConfirmationText();
    flipCard();
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

function changeColours (id) {
  document.getElementById(id).classList.add("change-colours");
  document.getElementById(id).classList.remove("not-filled");
}

function changeColours2 (id) {
  if (document.getElementById(id).value < 20 || document.getElementById(id).value > 200) {
    document.getElementById(id).classList.remove("change-colours");
  }
  else {
    document.getElementById(id).classList.add("change-colours");
  }
}

function generateConfirmationText () {

  var corporation = document.getElementById("corporation").value;
  var expansions = arrayExpansions();
  var map = document.querySelector('input[name="map"]:checked').value;
  var result = outcome.toUpperCase();

  if (outcome == "win") {
    result = outcome.toUpperCase() + " - " + document.getElementById("corporation-score").value;
  } else {
    result = outcome.toUpperCase() + " by " + document.getElementById("steps").value + " STEPS";
  }


  document.getElementById("modalResult").innerHTML = result;
  document.getElementById("modalCorporation").innerHTML = corporation;
  document.getElementById("modalMap").innerHTML = map;
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
}

function animateTakeOff() {
  el = document.querySelector(".flip-card")

  setTimeout(function(){
    el.style.transform = "perspective(1500px) rotateX(80deg) scale(1)";
    el.style.webkitTransform = "perspective(1500px) rotateX(80deg) scale(1)";

    el.style.boxShadow = "0 10px 50px darkorange";
  },100);
  setTimeout(function(){
    el.style.transition = "0.3s";
    el.style.transform = "perspective(700px) rotateX(89deg) scale(0)";
    el.style.webkitTransform = "perspective(700px) rotateX(89deg) scale(0)";

    el.style.marginTop = "-150px";
  },1500);
  setTimeout(function(){
    el.style.transition = "1s";
    el.style.webkitTransition = "1s";

    el.style.display = "none";
    el.style.boxShadow = "";
  },2500);
  setTimeout(function(){
    el.style.marginTop = "-800px";
    el.style.transform = "perspective(700px) rotateX(0deg) scale(1)";
    el.style.webkitTransform = "perspective(700px) rotateX(0deg) scale(1)";

  },3000);
  setTimeout(function(){
    el.style.display = "block";
  },3100);
  setTimeout(function(){
    el.style.marginTop = "100px";
  },3500);

}

function resetAll () {
  //clear the selected colour
  setTimeout(function(){
  x = document.querySelectorAll(".change-colours");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours");
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
    flipCardBack ();
  }, 3000)
}

function flipCard () {
  document.querySelector(".flip-card-inner").style.transform = "rotateY(-180deg)";
  document.querySelector(".flip-card-inner").style.webkitTransform = "rotateY(-180deg)";

  document.getElementById("confirm").disabled = false;
}

function flipCardBack () {
  document.querySelector(".flip-card-inner").style.transform = "rotateY(0deg)";
  document.querySelector(".flip-card-inner").style.webkitTransform = "rotateY(0deg)";
  document.getElementById("confirm").disabled = true;
}

function activateWin(id) {
  outcome ="win";
  el = document.getElementById(id);
  el2 = document.getElementById("lossSection");


  el.classList.add("change-colours");
  document.getElementById("winLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "145px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "-120px";
  el2.classList.remove("change-colours");
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


  el.classList.add("change-colours");
  document.getElementById("lossLabel").innerHTML = "&nbsp;";
  el.style.backgroundPositionX = "-15px";
  el.style.width = "253px";

  el2.style.width = "100px";
  el2.style.backgroundPositionX = "250px";
  el2.classList.remove("change-colours");
  document.getElementById("winLabel").innerHTML = "WIN";
  document.getElementById("steps").style.display ="block";
  document.getElementById("corporation-score").style.display = "none";
  document.getElementById("corporation-score").style.transform = "scale(0)";
  setTimeout(function() {
    document.getElementById("steps").style.transform = "scale(1)";
  }, 100)
}
