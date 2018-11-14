
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

function generateHand() {
  //clear all cards
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  //document.getElementById("link").classList.remove("disabled-link");

  displayCards();
}





function displayCards() {

  queryProjects = ".filterDiv.standard.automated, .filterDiv.standard.active, .filterDiv.standard.events";
  if (document.querySelectorAll(".active.corporate-icon").length > 0) {
    queryProjects = queryProjects + ", .filterDiv.corporate.automated, .filterDiv.corporate.active, .filterDiv.corporate.events"
  }
  if (document.querySelectorAll(".active.venus-icon").length > 0) {
    queryProjects = queryProjects + ", .filterDiv.venusNext.automated, .filterDiv.venusNext.active, .filterDiv.venusNext.events"
  }
  if (document.querySelectorAll(".active.prelude-icon").length > 0) {
    queryProjects = queryProjects + ", .filterDiv.prelude.automated, .filterDiv.prelude.active, .filterDiv.prelude.events"
  }
  if (document.querySelectorAll(".active.colonies-icon").length > 0) {
    queryProjects = queryProjects + ", .filterDiv.colonies.automated, .filterDiv.colonies.active, .filterDiv.colonies.events"
  }
  if (document.querySelectorAll(".active.promo-icon").length > 0) {
    queryProjects = queryProjects + ", .filterDiv.promo.automated, .filterDiv.promo.active, .filterDiv.promo.events"
  }

  projects = document.querySelectorAll(queryProjects);
  console.log(projects.length)

  projectsArray = generateArray(10, projects.length)


  for (i=0; i<10; i++) {
    //display the 10 projects
    projects[projectsArray[i]].style.display = "block"
  }

}






/////////////////////////////////////////////////////////////////////////////
function filterFunction(id) {
  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}
}

function generateArray(length, max) {
  var arr = [];
  while(arr.length < length){
      var randomnumber = Math.floor(Math.random()*max);
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr
}
