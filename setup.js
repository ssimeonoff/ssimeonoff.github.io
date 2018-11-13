
titles = "";
x = document.querySelectorAll('li.filterDiv');
corporations_names = [
  "BEGINNER",
  "CREDICOR",
  "ECOLINE",
  "HELION",
  "MINING GUILD",
  "INTERPLAN. CINEMATICS",
  "INVENTRIX",
  "PHOBOLOG",
  "THARSIS REPUBLIC",
  "THORGATE",
  "U.N.M.I.",
  "TERACTOR",
  "SATURN SYSTEMS",
  "APHRODITE",
  "CELESTIC",
  "MANUTECH",
  "MORNING STAR",
  "VIRON",
  "CHEUNG SHING MARS",
  "POINT LUNA",
  "ROBINSON INDUSTRIES",
  "VALLEY TRUST",
  "VITOR",
  "ARIDOR",
  "ARKLIGHT",
  "POLYPHEMOS",
  "POSEIDON",
  "STORMCRAFT",
  "ARCADIAN COMMUNITIES",
  "RECYCLON",
  "SPLICE"
];
url = "https://ssimeonoff.github.io/";

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
  var titles_corporations = "";
  var titles_projects = "";
  var titles_preludes = "";


  for (i=0; i < corporations.length; i++) {
    titles_corporations = titles_corporations + corporations_names[corporations[i]] + "<br>";
    if (corporations[i] < 10) {corporations[i] = "CORP0" + corporations[i].toString()}
    else  {corporations[i] = "CORP" + corporations[i].toString()}
    url = url + "#" + corporations[i];
  }
  document.getElementById("titles_corporations").innerHTML = titles_corporations;

  for (i=0; i < projects.length; i++) {
    if (projects[i] < 10) {projects[i] = "00" + projects[i].toString()}
    else if (projects[i] < 100) {projects[i] = "0" + projects[i].toString()}
    else {projects[i] = projects[i].toString()}
    url = url + "#" + projects[i];
  }

  for (i=0; i < preludes.length; i++) {
    if (preludes[i] < 10) {preludes[i] = "P0" + preludes[i].toString()}
    else {preludes[i] = "P" + preludes[i].toString()}
    url = url + "#" + preludes[i];
  }

  //showing the url
  document.getElementById("link").href = url;

  //showing only the pointed cards
  for (i=0; i < corporations.length; i++) {
    document.getElementById(corporations[i]).style.display = "block";
  }

  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (projects.includes(x[i].querySelector(".number").textContent)) {
        x[i].style.display = "block";
        titles_projects = titles_projects + x[i].querySelector(".title").textContent + "<br>";
      }
    }
  }
  document.getElementById("titles_projects").innerHTML = titles_projects;

  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (preludes.includes(x[i].querySelector(".number").textContent)) {
        x[i].style.display = "block";
        titles_preludes = titles_preludes + x[i].querySelector(".title").textContent + "<br>";
      }
    }
  }
  document.getElementById("titles_preludes").innerHTML = titles_preludes;


}
