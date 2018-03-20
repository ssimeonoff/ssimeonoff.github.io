showAll();

function showAll() {
  var x, i;
  displayedProjects = 128;
  displayedCorporations = 22;
  displayedPreludes = 4;
  myFunction("");
  document.getElementById("totalProjects").innerHTML = displayedProjects;
  document.getElementById("totalCorporations").innerHTML = displayedCorporations;
  document.getElementById("totalPreludes").innerHTML = displayedPreludes;
  x = document.querySelectorAll('.filterDiv');
  y = document.querySelectorAll('button.active');
  if (y.length > 0) {
    y = document.querySelectorAll('button.active');
    if (y.length > 0) {
      for (i = 0; i < y.length; i++) {
          y[i].classList.toggle("active");
      }
    }
  }
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf("") > -1) {
      w3AddClass(x[i], "show");
    }
  }
}


function filterSelection(id) {
  var x, i;

  clickedElementID = document.getElementById(id);
  clickedElementID.classList.toggle("active");

  activeButtons1 = document.querySelectorAll('.btn1');
  if (clickedElementID.classList.contains("btn1")) {
    for (i = 0; i < activeButtons1.length; i++) {
      if (activeButtons1[i].id != clickedElementID.id) {
        activeButtons1[i].classList.remove("active");
      }
    }
  }

  activeButtons3 = document.querySelectorAll('.btn3');
  if (clickedElementID.classList.contains("btn3")) {
    for (i = 0; i < activeButtons3.length; i++) {
      if (activeButtons3[i].id != clickedElementID.id) {
        activeButtons3[i].classList.remove("active");
      }
    }
  }

  x = document.querySelectorAll('.filterDiv');
  y = document.querySelectorAll('button.active');
  if (y.length > 0) {
    displayedCorporations = 0;
    displayedCards = 0;
    displayedPreludes=0;
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      show = true;
      for (j = 0; j < y.length; j++) {
        if (x[i].className.indexOf(y[j].id) > -1) {
            } else {show = false;}
        }
        if (show == true) {
          w3AddClass(x[i], "show");
          if (x[i].classList.contains("corporation")) {
            displayedCorporations++;
          }
          if (x[i].classList.contains("preludeCards")) {
            displayedPreludes++;
          }
          displayedCards++;
        }
        document.getElementById("totalProjects").innerHTML = displayedCards - displayedCorporations - displayedPreludes;
        document.getElementById("totalCorporations").innerHTML = displayedCorporations;
        document.getElementById("totalPreludes").innerHTML = displayedPreludes;

    }
  } else {
    showAll();
  }
}

function myFunction(id) {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


function clearInput() {
  document.getElementById("myInput").value = "";
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("info");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
