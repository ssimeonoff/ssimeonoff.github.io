showAll();

function showAll() {
  var x, i;
  x = document.querySelectorAll('.filterDiv');
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf("") > -1) {
      w3AddClass(x[i], "show");
    }
  }
  y = document.querySelectorAll('button.active');
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove("active");
  }
}

function filterSelection(id) {
  var x, i;

  clickedElementID = document.getElementById(id);
  clickedElementID.classList.toggle("active");

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
        if (show == true) {w3AddClass(x[i], "show");}
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
