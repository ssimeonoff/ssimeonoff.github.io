
titles = "";
x = document.querySelectorAll('li.filterDiv');

generateArray();
displayCards();

function generateArray(length, max) {
  var arr = [];
  while(arr.length < length){
      var randomnumber = Math.floor(Math.random()*max) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr
}


function displayCards() {
  projects = generateArray(10, 261);
  corporations = generateArray(2, 30);
  preludes = generateArray(4, 35);

  for (i=0; i < projects.length; i++) {
    if (projects[i] < 10) {projects[i] = "00" + projects[i].toString()}
    else if (projects[i] < 100) {projects[i] = "0" + projects[i].toString()}
    else {projects[i] = projects[i].toString()}
  }

  for (i=0; i < preludes.length; i++) {
    if (preludes[i] < 10) {preludes[i] = "P0" + preludes[i].toString()}
    else {preludes[i] = "P" + preludes[i].toString()}
  }

  //showing only the pointed cards
  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (projects.includes(x[i].querySelector(".number").textContent)) {
        x[i].style.display = "block";
        titles = titles + x[i].querySelector(".title").textContent + "<br>";
      }
    }
  }

  titles = titles + "<br>"

  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (preludes.includes(x[i].querySelector(".number").textContent)) {
        x[i].style.display = "block";
        titles = titles + x[i].querySelector(".title").textContent + "<br>";
      }
    }
  }

  document.getElementById("titles").innerHTML = titles;
}
