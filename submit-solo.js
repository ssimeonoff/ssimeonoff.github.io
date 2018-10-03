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
  if (document.querySelectorAll("select[class='drop-down change-colours']").length < 1) {
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

  if (document.querySelectorAll("select[class='drop-down2 change-colours']").length < 1 && document.querySelectorAll(".loss:checked").length > 1 ) {
    enableSubmit = false;
    document.getElementById("steps").classList.add("red-outline");
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
      document.querySelector(".drop-down2").style.display ="inline-block";
      document.querySelector(".loss").style.backgroundPosition = "16px -10px";
  },200);
  setTimeout(function() {
      document.querySelector(".drop-down2").style.transform ="scale(1)";
  },300);

}

function disableSteps() {

  document.querySelector(".drop-down2").style.transform = "scale(0)";
    document.querySelector(".drop-down2").style.display = "none";
    document.querySelector(".loss").style.backgroundPosition = "16px 80px";
    document.querySelector("label[for='win']").style.width = "238px";
    document.getElementById("loss_text").style.marginLeft = "";
  setTimeout(function() {
    document.querySelector(".win").style.backgroundPosition = "144px 0px";
  }, 200)
}

function animateTakeOff() {
  el = document.getElementById("buttonsContainer")

  setTimeout(function(){
    el.style.transform = "perspective(700px) rotateX(80deg) scale(1)";
    el.style.boxShadow = "0 10px 50px darkorange";
  },500);
  setTimeout(function(){
    el.style.transition = "0.3s";
    el.style.transform = "perspective(700px) rotateX(89deg) scale(0)";
    el.style.marginTop = "-100px";
  },1500);
  setTimeout(function(){
    el.style.transition = "1s";
    el.style.display = "none";
    el.style.boxShadow = "";
  },2500);
  setTimeout(function(){
    el.style.marginTop = "-800px";
    el.style.transform = "perspective(700px) rotateX(0deg) scale(1)";
  },3000);
  setTimeout(function(){
    el.style.display = "block";
  },3100);
  setTimeout(function(){
    el.style.marginTop = "20px";
  },3500);

}

function resetAll () {
  //clear the selected colour
  setTimeout(function(){
  x = document.querySelectorAll(".change-colours");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours");
  }
    document.querySelector(".win").style.backgroundPosition = "144px 80px";
    document.querySelector(".loss").style.backgroundPosition = "16px 80px";
    document.querySelector("label[for='win']").style.width = "238px";
    document.getElementById("loss_text").style.marginLeft = "";
    document.querySelector(".drop-down2").style.display = "none";
    document.querySelector(".drop-down2").style.transform = "scale(0)";

  }, 3000)
}
