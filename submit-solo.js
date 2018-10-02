$("#form").keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
/////////////////////////////////////////////////////////////////////////////////////
function checkForm () {
  //code executed when "submit" is clicked
  enableSubmit = true;
  //if corporation is not selected
  if (document.querySelectorAll("select[class*='change-colour']").length < 1) {
    enableSubmit = false;
    document.getElementById("corporation").classList.add("red-outline");
   };
  //if score is not selected
  if (document.querySelectorAll("input[class*='change-colour']").length < 1) {
    enableSubmit = false;
    document.getElementById("corporation-score").classList.add("red-outline");
  };
  //if result is not selected
  if (document.querySelectorAll("input[name='result']:checked").length < 1 ) {
    x = document.querySelectorAll(".btn-result");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("red-outline");
    }
    enableSubmit = false;
  };


  //generates the modal text
  if (enableSubmit) {
    generateConfirmationText();
    document.getElementById("modalOne").style.display = "block";
    setTimeout(function() {document.querySelector(".modal-window").style.transform = "scale(1)";}, 200);
    } else { document.getElementById("submit").disabled = true;}

  //remove the red outlines after 3 seconds
  setTimeout(function(){
    x = document.querySelectorAll(".red-outline");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("red-outline");
    }
    document.getElementById("submit").disabled = false;
  }, 2000);
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

  var corporation = document.getElementById("corporation").value;
  var score = document.getElementById("corporation-score").value;
  var expansions = arrayExpansions();
  var result = document.querySelector("input[name='result']:checked").value;

  document.getElementById("modalCorporation").innerHTML = corporation;
  document.getElementById("modalScore").innerHTML = score;
  document.getElementById("modalExpansions").innerHTML = expansions.toString().replace(/,/g, " - ");
  document.getElementById("modalResult").innerHTML = result;
}

function closeModal () {
  document.querySelector(".modal-window").style.transform = "scale(0)";
  setTimeout(function(){
    document.getElementById("modalOne").style.display = "none";
  }, 300); //waiting during the animation duration of closing the modal
}

function enableSteps() {
  document.querySelector(".win").style.backgroundPosition = "144px 80px";
  document.querySelector("label[for='win']").style.width = "118px";
  document.getElementById("loss_text").style.marginLeft = "-50px";
  setTimeout(function() {
      document.querySelector(".loss").style.backgroundPosition = "16px -10px";
  },300);

}


function disableSteps() {
  document.querySelector(".loss").style.backgroundPosition = "16px 80px";
  document.querySelector("label[for='win']").style.width = "238px";
  document.getElementById("loss_text").style.marginLeft = "";
  setTimeout(function() {
    document.querySelector(".win").style.backgroundPosition = "144px 0px";
  }, 300)
}
