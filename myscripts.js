
showAll();

function showAll() {
    var x, i,id;

    x = document.querySelectorAll('.filterDiv');
    id = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(id) > -1) {
            w3AddClass(x[i], "show");
        }
    }

}

function filterSelection(id) {
    var x, i, clickedElement,currentActive;

    clickedElementID = document.getElementById(id);
    currentActive = document.getElementsByClassName("active");

    if (currentActive[0].id == clickedElementID.id) {
      clickedElementID.classList.toggle("active");
      id = "";
    }
    else {
      currentActive[0].classList.remove("active");
      clickedElementID.classList.toggle("active");
    }

    x = document.querySelectorAll('.filterDiv');
    if (id == "all") id = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(id) > -1) {
            w3AddClass(x[i], "show");
        }
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
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
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
