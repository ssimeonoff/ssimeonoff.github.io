
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

  document.getElementById("link").classList.remove("disabled-link");

  displayCards();
}


function displayCards() {
  titles_corporations = "";
  titles_projects = "";
  titles_preludes = "";


  //corporations
  query_corporations = ".corporation.standard"
  if (document.querySelectorAll(".active.corporate-icon").length > 0) {
    query_corporations = query_corporations + ", .corporation.corporate"
  }
  if (document.querySelectorAll(".active.venus-icon").length > 0) {
    query_corporations = query_corporations + ", .corporation.venusNext"
  }
  if (document.querySelectorAll(".active.prelude-icon").length > 0) {
    query_corporations = query_corporations + ", .corporation.prelude"
  }
  if (document.querySelectorAll(".active.colonies-icon").length > 0) {
    query_corporations = query_corporations + ", .corporation.colonies"
  }
  if (document.querySelectorAll(".active.promo-icon").length > 0) {
    query_corporations = query_corporations + ", .corporation.promo"
  }
  corporations = document.querySelectorAll(query_corporations);
  corporations_numbers = generateArray(2, corporations.length)
  for (i=0; i<2; i++) {
    //display the 2 corporations
    $(corporations[corporations_numbers[i]]).fadeIn(0);
    //append the ids to the url
    url = url + "#" +  corporations[corporations_numbers[i]].id;
    corporation_id = corporations[corporations_numbers[i]].id.substring(4,6);
    titles_corporations = titles_corporations + corporations_names[parseInt(corporation_id)] + "<br>";
  }

  // projects
  query_projects = ".filterDiv.standard.automated, .filterDiv.standard.active, .filterDiv.standard.events";
  if (document.querySelectorAll(".active.corporate-icon").length > 0) {
    query_projects = query_projects + ", .filterDiv.corporate.automated, .filterDiv.corporate.active, .filterDiv.corporate.events"
  }
  if (document.querySelectorAll(".active.venus-icon").length > 0) {
    query_projects = query_projects + ", .filterDiv.venusNext.automated, .filterDiv.venusNext.active, .filterDiv.venusNext.events"
  }
  if (document.querySelectorAll(".active.prelude-icon").length > 0) {
    query_projects = query_projects + ", .filterDiv.prelude.automated, .filterDiv.prelude.active, .filterDiv.prelude.events"
    //preludes
    preludes = document.querySelectorAll(".preludeCards")
    preludes_numbers = generateArray(4, preludes.length)
    for (i=0; i<4; i++) {
      //display the 4 preludes
      $(preludes[preludes_numbers[i]]).fadeIn(0);
      //append the ids to the url
      url = url + "#" +  preludes[preludes_numbers[i]].querySelector(".number").textContent;
      titles_preludes = titles_preludes + preludes[preludes_numbers[i]].querySelector(".title").textContent + "<br>";
    }
  }
  if (document.querySelectorAll(".active.colonies-icon").length > 0) {
    query_projects = query_projects + ", .filterDiv.colonies.automated, .filterDiv.colonies.active, .filterDiv.colonies.events"
  }
  if (document.querySelectorAll(".active.promo-icon").length > 0) {
    query_projects = query_projects + ", .filterDiv.promo.automated, .filterDiv.promo.active, .filterDiv.promo.events"
  }

  projects = document.querySelectorAll(query_projects);
  projects_numbers = generateArray(10, projects.length)

  for (i=0; i<10; i++) {
    //display the 10 projects
    $(projects[projects_numbers[i]]).fadeIn(0);
    //append the ids to the url
    url = url + "#" +  projects[projects_numbers[i]].querySelector(".number").textContent;
    titles_projects = titles_projects + projects[projects_numbers[i]].querySelector(".title").textContent + "<br>"
  }

  //updating the link and the titles
  document.getElementById("titles_corporations").innerHTML = titles_corporations;
  document.getElementById("titles_projects").innerHTML = titles_projects;
  document.getElementById("titles_preludes").innerHTML = titles_preludes;
  document.getElementById("link").href = url;
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
