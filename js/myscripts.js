// Default counts 
PROJECTS = 389;
CORPORATIONS = 40;
PRELUDES = 40;
COLONIES = 11;
GLOBALS = 36; 

CONTAINER = 200; //the default height of the buttons container
CONTENT_FILTERS = 125 //the default height of the Content filters area
var containerHeight = CONTAINER; //the current height of the buttons container
var contentFiltersCurrent = CONTENT_FILTERS;
var selectedCards = "";
var selectedCardsAmount = 0;

//parse the url
urlString = window.location.href;
cards = parseURLParams(urlString);

//display all card or only few ones if pointed
if (cards == "ALL") {showAll();}
else {
  displayCardsOnly(cards);
  zoomSingleCard();}

function showAll() {
  var x, i;
  document.getElementById("buttonsContainer").style.display = "block";

  var elements = document.querySelectorAll('.ul-title');
  for (i=0; i<elements.length; i++){elements[i].style.display = "block";}
  document.getElementById("totalProjects").innerHTML = PROJECTS;
  document.getElementById("totalCorporations").innerHTML = CORPORATIONS;
  document.getElementById("totalPreludes").innerHTML = PRELUDES;
  document.getElementById("totalColonies").innerHTML = COLONIES;
  document.getElementById("totalGlobals").innerHTML = GLOBALS;


  //making all buttons inactive
  y = document.querySelectorAll('button.active');
  if (y.length > 0) {
      for (i = 0; i < y.length; i++) {
          y[i].classList.toggle("active");
      }
  }
  //showing all cards
  x = document.querySelectorAll('.filterDiv');
  for (i = 0; i < x.length; i++) {w3AddClass(x[i], "show");}

  //displaying first 48 cards that have "show"
  displayCards();
}

function displayCards() {
  button_load_more = document.getElementById("button-load-more");

  arr = document.querySelectorAll('li.show');
  if (arr.length > 48) {
    display_length = 48
    button_load_more.style.display = "block"
  }
  else {
    display_length = arr.length
    button_load_more.style.display = "none"
  }

  for (i=0; i < display_length; i++) {
    w3AddClass(arr[i], "display");
    w3RemoveClass(arr[i], "show");
  }
}

//////////////////////PARSE function ////////////////////////////////
function parseURLParams(url) {
    var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("%") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1)
    cards = "#" + query.replace(/\#/g, " #").toUpperCase().split(" ");
    if (query === url || query === "") return "ALL";
    return cards;
}

////////////////////// Display only pointed cards ///////////////////
function displayCardsOnly() {

  //showing only the pointed cards
  x = document.querySelectorAll('li.filterDiv');
  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (cards.includes(x[i].querySelector(".number").textContent)) {
        w3AddClass(x[i], "display");
      }
    }
    else {
      if (cards.includes(x[i].id)) {
        w3AddClass(x[i], "display");
      }
    }

  }
}
////////////////////// FILTER FUCTION ///////////////////////////////
function filterFunction(id) {
  var input, filter, ul, li, a, i, x;

  clickedElementID = document.getElementById(id);
  if (clickedElementID != null) {clickedElementID.classList.toggle("active");}

  x = document.querySelectorAll('.filterDiv');
  for (i = 0; i < x.length; i++) {w3AddClass(x[i], "show");}

  //filtering by Type + Tag + Deck + Reqs
  btnType = document.querySelectorAll('button.active.btn1');
  btnTag = document.querySelectorAll('button.active.btn2');
  btnDeck = document.querySelectorAll('button.active.btn3');
  btnReq = document.getElementById('reqs');
  btnVP = document.getElementById('vp');
  btnTile = document.querySelectorAll('button.active.btn-tile');


  btnProduction = document.querySelectorAll('button.active.btn-production');

  //filter by Card type
  if (btnType.length > 0) {
    for (i = 0; i < x.length; i++) {
      show = false;
      for (j = 0; j < btnType.length; j++) {
        if (x[i].className.indexOf(btnType[j].id) > -1) {
          show = true;
        }
        if (show == true) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    }
    x = document.querySelectorAll('li.show');
  }

  //filter by Tag
  if (btnTag.length > 0) {
    for (i = 0; i < x.length; i++) {
      show = false;
      for (j = 0; j < btnTag.length; j++) {
        if (x[i].className.indexOf(btnTag[j].id) > -1) {
          show = true;
        }
        if (show == true) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    }
    x = document.querySelectorAll('li.show');
  }

  //filter by Deck type
  if (btnDeck.length > 0) {
    for (i = 0; i < x.length; i++) {
      show = false;
      for (j = 0; j < btnDeck.length; j++) {
        if (x[i].className.indexOf(btnDeck[j].id) > -1) {
          show = true;
        }
        if (show == true) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    }
    x = document.querySelectorAll('li.show');
  }

  //filter by Requirements
  if (btnReq.classList.contains("active")) {
    for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf(btnReq.id) > -1) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    x = document.querySelectorAll('li.show');
  } else {
    document.getElementById("subfilterReqs").classList.add("subfilterReqs-disabled"); //to disble the subfilters
  }

  //filter by VP
  if (btnVP.classList.contains("active")) {
    for (i = 0; i < x.length; i++) {
        if (x[i].querySelectorAll(".points").length > 0) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
      }
    x = document.querySelectorAll('li.show');
  }

  //filter by tiles
  if (btnTile.length > 0)  {
    for (i = 0; i < x.length; i++) {
      show = false;
      for (j = 0; j < btnTile.length; j++) {
        if (x[i].querySelectorAll(".tile." + btnTile[j].id).length > 0) {
          show = true;
        }
        if (show == true) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    }
    x = document.querySelectorAll('li.show');
  }


  //filter by production
  if (btnProduction.length > 0)  {
    for (i = 0; i < x.length; i++) {
      show = false;
      for (j = 0; j < btnProduction.length; j++) {
        if (x[i].querySelectorAll(btnProduction[j].id).length > 0) {
          show = true;
        }
        if (show == true) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
        }
    }
    x = document.querySelectorAll('li.show');
  }


  //filter by price
  priceValue = document.getElementById("price").value;
  if (priceValue < 0) {document.getElementById("price").value = 0;}
  if (priceValue > 50) {document.getElementById("price").value = 50;}
  if (priceValue > 0) {
    for (i = 0; i < x.length; i++) {
        if (x[i].querySelector(".price") == null) {cardValue = 0;}
        else {cardValue = parseInt(x[i].querySelector(".price").textContent);}
        if (cardValue >= priceValue) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show"); }
      }
    x = document.querySelectorAll('li.show');
  }

  //Filtering for the Requirements inputs
  if (document.getElementById("reqs").classList.contains("active")) {
    document.getElementById("subfilterReqs").classList.remove("subfilterReqs-disabled"); //enabling the subfilters

    //Requirements input filtering
    temperatureValue = document.getElementById("slider1").value;
    oxygenValue = document.getElementById("slider2").value;
    oceansValue = document.getElementById("slider3").value;
    venusValue = document.getElementById("slider4").value;
    scienceValue = document.getElementById("slider5").value;
    jovianValue = document.getElementById("slider6").value;
    venusTagValue = document.getElementById("slider7").value;
    earthValue = document.getElementById("slider8").value;

    if ( temperatureValue > -30 || oxygenValue > 0 || oceansValue > 0 || venusValue > 0 || scienceValue > 0
      || jovianValue > 0 || venusTagValue > 0 || earthValue > 0) {
      for (i = 0; i < x.length; i++) {

        //obtaining the data without writing over it
        temperatureData = parseInt(x[i].dataset.temperature);
        oxygenData = parseInt(x[i].dataset.oxygen);
        oceansData = parseInt(x[i].dataset.oceans);
        venusData = parseInt(x[i].dataset.venus);
        scienceData = parseInt(x[i].dataset.science);
        jovianData = parseInt(x[i].dataset.jovian);
        venusTagData = parseInt(x[i].dataset.venustag);
        earthData = parseInt(x[i].dataset.earth);



        show = false;
        if (temperatureValue > -30) {
          if ( temperatureValue <= temperatureData ) { show = true;}
        }
        if (oxygenValue > 0 && oxygenData > 0) {
          if ( oxygenValue <= oxygenData ) { show = true;}
        }
        if (oceansValue > 0) {
          if ( oceansValue <= oceansData ) { show = true }
        }
        if (venusValue > 0 ) {
          if ( venusValue <= venusData ) { show = true }
        }
        if (scienceValue > 0 ) {
          if ( scienceValue <= scienceData ) { show = true }
        }
        if (jovianValue > 0 ) {
          if ( jovianValue <= jovianData ) { show = true }
        }
        if (venusTagValue > 0 ) {
          if ( venusTagValue <= venusTagData ) { show = true }
        }
        if (earthValue > 0 ) {
          if ( earthValue <= earthData ) { show = true }
        }

        //the check
        if (show) {w3AddClass(x[i], "show");}
        else {w3RemoveClass(x[i], "show");}
      }
    }
  } else {
    //to clear the inputs when the Requirements button is canceled
    document.getElementById("slider1").value = -30;
    document.getElementById("output1").innerHTML = -30;
    document.getElementById("slider2").value = 0;
    document.getElementById("output2").innerHTML = 0;
    document.getElementById("slider3").value = 0;
    document.getElementById("output3").innerHTML = 0;
    document.getElementById("slider4").value = 0;
    document.getElementById("output4").innerHTML = 0;
    document.getElementById("slider5").value = 0;
    document.getElementById("output5").innerHTML = 0;
    document.getElementById("slider6").value = 0;
    document.getElementById("output6").innerHTML = 0;
  }

///////////////////////////////////////////////////////////////////////////////

  //Text input filtering
  li = document.querySelectorAll('li.show');   //obtaining the new visible list after the subfilters check
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

  //Display Cards Numbers
  displayedCards = document.querySelectorAll('li.show').length;
  CORPORATIONS = document.querySelectorAll('li.show.corporation').length;
  PRELUDES = document.querySelectorAll('li.show.prelude-card').length;
  COLONIES = document.querySelectorAll('li.show.colony-card').length;
  GLOBALS = document.querySelectorAll('li.show.global-card').length;

  PROJECTS = displayedCards - CORPORATIONS - PRELUDES - COLONIES - GLOBALS;
  document.getElementById("totalProjects").innerHTML = PROJECTS;
  document.getElementById("totalCorporations").innerHTML = CORPORATIONS;
  document.getElementById("totalPreludes").innerHTML = PRELUDES;
  document.getElementById("totalColonies").innerHTML = COLONIES;
  document.getElementById("totalGlobals").innerHTML = GLOBALS;


 //clearing all displayed cards
 y = document.querySelectorAll('.display');
 for (i = 0; i < y.length; i++) {w3RemoveClass(y[i], "display");}
 //displaying the first N cards that have class "show"
  displayCards();

}


function clearInput() {
  document.getElementById("myInput").value = ""; //resets the text input
  document.getElementById("price").value = 0;
  document.getElementById("contentFilters").style.display = "none"; //hides the range inputs div
  document.getElementById("subfilterReqs").style.display = "none"; //hides the range inputs div
  document.getElementById("btn-selectedCards").classList.add("disabled") //hide the selected cards button


  //resets the range inputs
  document.getElementById("slider1").value = -30;
  document.getElementById("output1").innerHTML = -30;
  document.getElementById("slider2").value = 0;
  document.getElementById("output2").innerHTML = 0;
  document.getElementById("slider3").value = 0;
  document.getElementById("output3").innerHTML = 0;
  document.getElementById("slider4").value = 0;
  document.getElementById("output4").innerHTML = 0;
  document.getElementById("slider5").value = 0;
  document.getElementById("output5").innerHTML = 0;
  document.getElementById("slider6").value = 0;
  document.getElementById("output6").innerHTML = 0;
  document.getElementById("slider7").value = 0;
  document.getElementById("output7").innerHTML = 0;
  document.getElementById("slider8").value = 0;
  document.getElementById("output8").innerHTML = 0;

  //shrinks any expanded AREAS
  document.getElementById("buttonsContainer-body").style.height = CONTAINER + "px";
  document.getElementById("contentFilters").style.height = CONTENT_FILTERS + "px";
  containerHeight = CONTAINER;
  contentFiltersCurrent = CONTENT_FILTERS;

  // clear any selected cards
  selectedCardsAmount = 0;
  x = document.querySelectorAll(".clicked-card");
  for (i = 0; i < x.length; i++) {w3RemoveClass(x[i], "clicked-card");}
  selectedCards = "";

  //scroll to the top
  window.scrollTo({ top: 0, behavior: 'smooth' });
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


//toggle Content filters
function toggleContentDiv() {
  document.getElementById("content").classList.toggle("active");
  if (document.getElementById("content").classList.contains("active")) {
    containerHeight = containerHeight + contentFiltersCurrent +30; //30 for the margins
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
    setTimeout(function(){$("#contentFilters").fadeIn(200);}, 100);
  }
  else {
    containerHeight = containerHeight - contentFiltersCurrent -30;
    document.getElementById("contentFilters").style.display = "none"; //hides the range inputs div
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
  }
}
//toggle Footer
function toggleFooterDiv() {
  if ($('#footer:visible').length == 0) {
    containerHeight = containerHeight + 100;
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
    setTimeout(function(){$("#footer").fadeIn(200);}, 100);
  }
  else {
    containerHeight = containerHeight - 100;
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
  }
}

//toggle Requerements filters
function toggleRequirementsFilters() {
  document.getElementById("subfilterReqs").classList.toggle("active");
  if ($('#subfilterReqs:visible').length == 0) {
    contentFiltersCurrent = contentFiltersCurrent + 105;
    containerHeight = containerHeight + 105;
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
    document.getElementById("contentFilters").style.height = contentFiltersCurrent + "px";
    setTimeout(function(){$("#subfilterReqs").fadeIn(200);}, 100);
  }
  else {
    containerHeight = containerHeight -105;
    contentFiltersCurrent = contentFiltersCurrent -105;
    document.getElementById("subfilterReqs").style.display = "none";
    document.getElementById("contentFilters").style.height = CONTENT_FILTERS + "px";
    document.getElementById("buttonsContainer-body").style.height = containerHeight + "px";
  }
}

function reduceOne() {
  price = document.getElementById("price");
  priceValue = document.getElementById("price").value;
  if (priceValue > 0) {
    priceValue--;
    price.value = priceValue;
    filterFunction();
  }
}

function increaseOne() {
  price = document.getElementById("price");
  priceValue = document.getElementById("price").value;
  if (priceValue<50) {
    priceValue++;
    price.value = priceValue;
    filterFunction();
  }
}

function sortByPriceUp() {
  // get array of elements
    var myArray = document.querySelectorAll('li.automated, li.events, li.active');
    var count = 0;
    // sort based on timestamp attribute
    myArray = [].slice.call(myArray);
    myArray.sort(function (a, b) {
    // convert to integers from strings
    a = parseInt($(a).find(".price").text(), 10);
    if (a == null) {a = 0}
    b = parseInt($(b).find(".price").text(), 10);
    if (b == null) {b = 0}
    count += 2;
    // compare
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  // put sorted results back on page
  $("#projectCards").append(myArray);
  filterFunction(null);
}

function sortByPriceDown() {
  // get array of elements
    var myArray = document.querySelectorAll('li.automated, li.events, li.active');
    var count = 0;
    // sort based on timestamp attribute
    myArray = [].slice.call(myArray);
    myArray.sort(function (a, b) {
    // convert to integers from strings
    a = parseInt($(a).find(".price").text(), 10);
    if (a == null) {a = 0}
    b = parseInt($(b).find(".price").text(), 10);
    if (b == null) {b = 0}
    count += 2;
    // compare
    if(a < b) {
        return 1;
    } else if(a > b) {
        return -1;
    } else {
        return 0;
    }
  });
  // put sorted results back on page
  $("#projectCards").append(myArray);
  filterFunction(null);
}

function sortByID() {
  // get array of elements
    var myArray = document.querySelectorAll('li.automated, li.events, li.active');
    var count = 0;
    // sort based on timestamp attribute
    myArray = [].slice.call(myArray);
    myArray.sort(function (a, b) {
    // convert to integers from strings
    a = $(a).find(".number").text();
    if (a == null) {a = 0}
    b = $(b).find(".number").text();
    if (b == null) {b = 0}
    count += 2;
    // compare
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  // put sorted results back on page
  $("#projectCards").append(myArray);
  filterFunction(null);
}

function toggleActive(id) {
  clickedElementID = document.getElementById(id);
  clickedElementID.classList.toggle("button2-active");
  setTimeout(function(){clickedElementID.classList.toggle("button2-active");}, 300);
}


function getClickedCard() {
  var clickedCard;
  $(document).click(function(event) {
    clickedCard = event.target.closest("li");
  });
  setTimeout(function(){selectCard(clickedCard), 100;});
}

function selectCard (clickedCard) {
  //works only if the controller is visible
  if ($('#buttonsContainer:visible').length > 0) {
    //change the shadow of the clicked card
    clickedCard.classList.toggle("clicked-card");

    //adding or removing the clicked card number or id to the string
    if (clickedCard.querySelector(".number") != null) {
      selectedCardNumber = clickedCard.querySelector(".number").textContent;
    }
    else {
      selectedCardNumber = clickedCard.id;
    }

    if (selectedCards.indexOf(selectedCardNumber) >= 0) {
      selectedCards = selectedCards.replace(selectedCardNumber, "");
      selectedCardsAmount--;
    }
    else {
      selectedCards = selectedCards + selectedCardNumber;
      selectedCardsAmount++;
    }

    //showing or removing the CTA button and updating its url
    if (selectedCards.length > 0) {
      document.getElementById("btn-selectedCards").href = "https://ssimeonoff.github.io/cards-list" + selectedCards;
      document.getElementById("selectedCardsAmount").innerHTML = selectedCardsAmount;
      document.getElementById("btn-selectedCards").classList.remove("disabled");
      document.getElementById("btn-selectedCards").disabled = false;
    }
    else {
      document.getElementById("btn-selectedCards").classList.add("disabled");
      document.getElementById("btn-selectedCards").disabled = true;
      document.getElementById("selectedCardsAmount").innerHTML = selectedCardsAmount;
    }

  }
}

function zoomSingleCard() {
  if (cards.length == 1) {
    document.getElementById(cards[0]).style.transform = "scale(0)";
    document.getElementById(cards[0]).style.transition = "0.3s";
    document.getElementById(cards[0]).style.marginLeft = "32%";
    document.getElementById(cards[0]).style.marginTop = "200px";
    setTimeout(function() {document.getElementById(cards[0]).style.transform = "scale(2)";}, 500);

  }
}
