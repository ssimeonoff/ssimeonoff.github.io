showAll();

function showAll() {
  var x, i;
  displayedProjects = 261;
  displayedCorporations = 22;
  displayedPreludes = 3;
  document.getElementById("totalProjects").innerHTML = displayedProjects;
  document.getElementById("totalCorporations").innerHTML = displayedCorporations;
  document.getElementById("totalPreludes").innerHTML = displayedPreludes;


  //making all buttons inactive
  y = document.querySelectorAll('button.active');
  if (y.length > 0) {
    y = document.querySelectorAll('button.active');
    if (y.length > 0) {
      for (i = 0; i < y.length; i++) {
          y[i].classList.toggle("active");
      }
    }
  }
  //showing all cards
  x = document.querySelectorAll('.filterDiv');
  for (i = 0; i < x.length; i++) {w3AddClass(x[i], "show");}

}


function filterSelection(id) {
  var x, i;

  clickedElementID = document.getElementById(id);
  clickedElementID.classList.toggle("active");

  //only one btn1 can be active at a time
  activeButtons1 = document.querySelectorAll('.btn1');
  if (clickedElementID.classList.contains("btn1")) {
    for (i = 0; i < activeButtons1.length; i++) {
      if (activeButtons1[i].id != clickedElementID.id) {
        activeButtons1[i].classList.remove("active");
      }
    }
  }

  //only one btn3 can be active at a time
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
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      show = true;
      for (j = 0; j < y.length; j++) {
        if (x[i].className.indexOf(y[j].id) > -1) {
            } else {show = false;}
        }
        if (show == true) {
          w3AddClass(x[i], "show");
        }

    }
  } else {
    showAll();
  }
  myFunction();
}
////////////////////// INPUTS FUCTION ///////////////////////////////
function myFunction() {
  var input, filter, ul, li, a, i;

  //obtaining the list of displayed cards from buttons filters
  x = document.querySelectorAll('.filterDiv');
  y = document.querySelectorAll('button.active');

  //shows all cards
  for (i = 0; i < x.length; i++) {w3AddClass(x[i], "show");}

  //checks if there are clicked filter buttons and filter cards accordingly
  if (y.length > 0) {
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      show = true;
      for (j = 0; j < y.length; j++) {
        if (x[i].className.indexOf(y[j].id) > -1) {
            } else {show = false;}
        }
        if (show == true) {
          w3AddClass(x[i], "show");
        }

    }
  }

  //return the list of only visible cards
  li = document.querySelectorAll('li.show');
  //Requirements input filtering
  temperatureValue = document.getElementById("slider1").value;
  oxygenValue = document.getElementById("slider2").value;
  oceansValue = document.getElementById("slider3").value;
  venusValue = document.getElementById("slider4").value;
  if ( temperatureValue > -30 || oxygenValue > 0 || oceansValue > 0 || venusValue > 0 ) {
    for (i = 0; i < li.length; i++) {
      //obtaining the data without writing over it
      temperatureData = li[i].dataset.temperature;
      oxygenData = li[i].dataset.oxygen;
      oceansData = li[i].dataset.oceans;
      venusData = li[i].dataset.venus;

      //check for max requirements
      //max requirements are marked by adding "100" to its value
      //the check is done by removing that 100 and making the data and value NEGATIVE
      // and thus keeping the ">=" check



      if (oxygenData > 50) {
        oxygenData = oxygenData - 100;
        oxygenData = -Math.abs(oxygenData);
        oxygenValue = -Math.abs(oxygenValue);
      }

      if (oceansData > 50) {
        oceansData = oceansData - 100;
        oceansData = -Math.abs(oceansData);
        oceansValue = -Math.abs(oceansValue);
      }

      if (venusData > 50) {
        venusData = venusData - 100;
        venusData = -Math.abs(venusData);
        venusValue = -Math.abs(venusValue);
      }

      //the check
      show = false;
      if (temperatureValue !== -32) {
        if ( temperatureValue >= temperatureData ) { show=true;}
      }
      if (oxygenValue !== 0) {
        if ( oxygenValue >= oxygenData ) { show=true }
      }
      if (oceansValue !== 0) {
        if ( oceansValue >= oceansData ) { show=true }
      }
      if (venusValue !== 0) {
        if ( venusValue >= venusData ) { show=true }
      }

      //the check
      if (!show) {w3RemoveClass(li[i], "show");}
    }
  }

  //obtaining the new visible list after the subfilters check
  li = document.querySelectorAll('li.show');

  //Text input filtering
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  filter = filter.split(" ");
  for (i = 0;  i < li.length; i++) {
    display = true;
    for (j = 0;  j < filter.length; j++) {
      if (li[i].innerHTML.toUpperCase().indexOf(filter[j]) > -1) {}
      else {display = false;}
        }
    if (display) {
        li[i].classList.add("show");
      } else { li[i].classList.remove("show");}
  }

  //Displayed Cards Numbers
  displayedCards = document.querySelectorAll('li.show').length;
  displayedCorporations = document.querySelectorAll('li.show.corporation').length;
  displayedPreludes = document.querySelectorAll('li.show.preludeCards').length;
  document.getElementById("totalProjects").innerHTML = displayedCards - displayedCorporations - displayedPreludes;
  document.getElementById("totalCorporations").innerHTML = displayedCorporations;
  document.getElementById("totalPreludes").innerHTML = displayedPreludes;
}


function clearInput() {
  document.getElementById("myInput").value = ""; //resets the text input
  document.getElementById("subfilters").style.display = "none"; //hides the range inputs div
  //resets the range inputs
  document.getElementById("slider1").value = -30;
  document.getElementById("output1").innerHTML = -30;
  document.getElementById("slider2").value = 0;
  document.getElementById("output2").innerHTML = 0;
  document.getElementById("slider3").value = 0;
  document.getElementById("output3").innerHTML = 0;
  document.getElementById("slider4").value = 0;
  document.getElementById("output4").innerHTML = 0;

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

//toggle subfilters div
function toggleSubfiltersDiv() {
    var x = document.getElementById("subfilters");
    var btn = document.getElementById("reqs");
    if (btn.classList.contains("active")) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
