var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};
firebase.initializeApp(config);
// Reference Games collection
var gamesRef = firebase.database().ref("games-production");
//get the games as an array
gamesRef.on('value', (snap) => {
  const val = snap.val()
  games = Object.keys(val)
    .map(key => val[key])
///////////////////////////////////////////////////////////////////////////////

//push data to the Players stats
  pushTheData();
  pushGeneralStats();
  pushMapStats();
  pushAwardsStats();
  pushAverageGenerations();
  pushHistograms();
  getUTCtime();
});

function generateGameStats (players, corporationName) {
  //returning html formatted text

  //filtering the games per players' count
  gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  //calculated played and won games per corporation
  playedGames = [];
  for (i = 0; i < gamesPerPlayers.length; i++) {
    var corpsArray = gamesPerPlayers[i]["corporations"]; //getting the corporations array
    if (corpsArray == undefined) {} //to chatch firebase errors if the array is undefined
    else {
      if (corpsArray.indexOf(corporationName) > -1) {
        //if the corporation is present in the corporations' arrayAwards
        //add this game to the played games
        playedGames.push(gamesPerPlayers[i]);
        }
      }
  }
  var totalGames = playedGames.length;
  var totalWins = 0;
  var sum = 0;
  for (i = 0; i < totalGames; i++) {
    //checking if that corporation is the winner
    var corpsArray = playedGames[i]["corporations"];
    var scoresArray = playedGames[i]["scores"];
    corpIndex = corpsArray.indexOf(corporationName); //find the corporation index
    //findind the winning score index
    winnerIndex = indexOfMax(scoresArray);
    //counting a win if corporation and winning score indexes match
    if (winnerIndex == corpIndex) {totalWins++;}
    //calculating the average score
     if (parseInt(scoresArray[corpIndex])>0) {
     sum += parseInt(scoresArray[corpIndex]);
   }
  }
  //calculating the average score
  avg = sum/totalGames;

  if (totalWins==0 && totalGames==0) {
    //capturing division by 0
    return  "<div class='points'>--</div>"
            ;}
  else {
    return  "<div class='points'>"+ Math.round(totalWins*100/totalGames) +"<span style='font-size:12px'>%</span></div>" +
            "<div class='winrate'>"+ Math.round(avg) + "<span style='font-size:12px'>P</span></div>" +
            "<div class='ratio'>" + " " + totalGames + "</div>"
            ;}
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = parseInt(arr[0]);
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (parseInt(arr[i]) > max) {
            maxIndex = i;
            max = parseInt(arr[i]);
        }
    }
    return maxIndex;
}




function pushTheData() {
  //standard
  document.getElementById("games2p-credicor").innerHTML = generateGameStats(2, "CREDICOR");
  document.getElementById("games3p-credicor").innerHTML = generateGameStats(3, "CREDICOR");
  document.getElementById("games4p-credicor").innerHTML = generateGameStats(4, "CREDICOR");
  document.getElementById("games5p-credicor").innerHTML = generateGameStats(5, "CREDICOR");

  document.getElementById("games2p-ecoline").innerHTML = generateGameStats(2, "ECOLINE");
  document.getElementById("games3p-ecoline").innerHTML = generateGameStats(3, "ECOLINE");
  document.getElementById("games4p-ecoline").innerHTML = generateGameStats(4, "ECOLINE");
  document.getElementById("games5p-ecoline").innerHTML = generateGameStats(5, "ECOLINE");

  document.getElementById("games2p-helion").innerHTML = generateGameStats(2, "HELION");
  document.getElementById("games3p-helion").innerHTML = generateGameStats(3, "HELION");
  document.getElementById("games4p-helion").innerHTML = generateGameStats(4, "HELION");
  document.getElementById("games5p-helion").innerHTML = generateGameStats(5, "HELION");

  document.getElementById("games2p-mining").innerHTML = generateGameStats(2, "MINING GUILD");
  document.getElementById("games3p-mining").innerHTML = generateGameStats(3, "MINING GUILD");
  document.getElementById("games4p-mining").innerHTML = generateGameStats(4, "MINING GUILD");
  document.getElementById("games5p-mining").innerHTML = generateGameStats(5, "MINING GUILD");

  document.getElementById("games2p-interplan").innerHTML = generateGameStats(2, "INTERPLAN. CINEMATICS");
  document.getElementById("games3p-interplan").innerHTML = generateGameStats(3, "INTERPLAN. CINEMATICS");
  document.getElementById("games4p-interplan").innerHTML = generateGameStats(4, "INTERPLAN. CINEMATICS");
  document.getElementById("games5p-interplan").innerHTML = generateGameStats(5, "INTERPLAN. CINEMATICS");

  document.getElementById("games2p-inventrix").innerHTML = generateGameStats(2, "INVENTRIX");
  document.getElementById("games3p-inventrix").innerHTML = generateGameStats(3, "INVENTRIX");
  document.getElementById("games4p-inventrix").innerHTML = generateGameStats(4, "INVENTRIX");
  document.getElementById("games5p-inventrix").innerHTML = generateGameStats(5, "INVENTRIX");

  document.getElementById("games2p-phobolog").innerHTML = generateGameStats(2, "PHOBOLOG");
  document.getElementById("games3p-phobolog").innerHTML = generateGameStats(3, "PHOBOLOG");
  document.getElementById("games4p-phobolog").innerHTML = generateGameStats(4, "PHOBOLOG");
  document.getElementById("games5p-phobolog").innerHTML = generateGameStats(5, "PHOBOLOG");

  document.getElementById("games2p-tharsis").innerHTML = generateGameStats(2, "THARSIS REPUBLIC");
  document.getElementById("games3p-tharsis").innerHTML = generateGameStats(3, "THARSIS REPUBLIC");
  document.getElementById("games4p-tharsis").innerHTML = generateGameStats(4, "THARSIS REPUBLIC");
  document.getElementById("games5p-tharsis").innerHTML = generateGameStats(5, "THARSIS REPUBLIC");

  document.getElementById("games2p-thorgate").innerHTML = generateGameStats(2, "THORGATE");
  document.getElementById("games3p-thorgate").innerHTML = generateGameStats(3, "THORGATE");
  document.getElementById("games4p-thorgate").innerHTML = generateGameStats(4, "THORGATE");
  document.getElementById("games5p-thorgate").innerHTML = generateGameStats(5, "THORGATE");

  document.getElementById("games2p-unmi").innerHTML = generateGameStats(2, "UNMI");
  document.getElementById("games3p-unmi").innerHTML = generateGameStats(3, "UNMI");
  document.getElementById("games4p-unmi").innerHTML = generateGameStats(4, "UNMI");
  document.getElementById("games5p-unmi").innerHTML = generateGameStats(5, "UNMI");

  //corporate
  document.getElementById("games2p-teractor").innerHTML = generateGameStats(2, "TERACTOR");
  document.getElementById("games3p-teractor").innerHTML = generateGameStats(3, "TERACTOR");
  document.getElementById("games4p-teractor").innerHTML = generateGameStats(4, "TERACTOR");
  document.getElementById("games5p-teractor").innerHTML = generateGameStats(5, "TERACTOR");

  document.getElementById("games2p-saturn").innerHTML = generateGameStats(2, "SATURN SYSTEMS");
  document.getElementById("games3p-saturn").innerHTML = generateGameStats(3, "SATURN SYSTEMS");
  document.getElementById("games4p-saturn").innerHTML = generateGameStats(4, "SATURN SYSTEMS");
  document.getElementById("games5p-saturn").innerHTML = generateGameStats(5, "SATURN SYSTEMS");

  //venus
  document.getElementById("games2p-aphrodite").innerHTML = generateGameStats(2, "APHRODITE");
  document.getElementById("games3p-aphrodite").innerHTML = generateGameStats(3, "APHRODITE");
  document.getElementById("games4p-aphrodite").innerHTML = generateGameStats(4, "APHRODITE");
  document.getElementById("games5p-aphrodite").innerHTML = generateGameStats(5, "APHRODITE");

  document.getElementById("games2p-celestic").innerHTML = generateGameStats(2, "CELESTIC");
  document.getElementById("games3p-celestic").innerHTML = generateGameStats(3, "CELESTIC");
  document.getElementById("games4p-celestic").innerHTML = generateGameStats(4, "CELESTIC");
  document.getElementById("games5p-celestic").innerHTML = generateGameStats(5, "CELESTIC");

  document.getElementById("games2p-manutech").innerHTML = generateGameStats(2, "MANUTECH");
  document.getElementById("games3p-manutech").innerHTML = generateGameStats(3, "MANUTECH");
  document.getElementById("games4p-manutech").innerHTML = generateGameStats(4, "MANUTECH");
  document.getElementById("games5p-manutech").innerHTML = generateGameStats(5, "MANUTECH");

  document.getElementById("games2p-morning").innerHTML = generateGameStats(2, "MORNING STAR");
  document.getElementById("games3p-morning").innerHTML = generateGameStats(3, "MORNING STAR");
  document.getElementById("games4p-morning").innerHTML = generateGameStats(4, "MORNING STAR");
  document.getElementById("games5p-morning").innerHTML = generateGameStats(5, "MORNING STAR");

  document.getElementById("games2p-viron").innerHTML = generateGameStats(2, "VIRON");
  document.getElementById("games3p-viron").innerHTML = generateGameStats(3, "VIRON");
  document.getElementById("games4p-viron").innerHTML = generateGameStats(4, "VIRON");
  document.getElementById("games5p-viron").innerHTML = generateGameStats(5, "VIRON");

  document.getElementById("games2p-cheung").innerHTML = generateGameStats(2, "CHEUNG SHING MARS");
  document.getElementById("games3p-cheung").innerHTML = generateGameStats(3, "CHEUNG SHING MARS");
  document.getElementById("games4p-cheung").innerHTML = generateGameStats(4, "CHEUNG SHING MARS");
  document.getElementById("games5p-cheung").innerHTML = generateGameStats(5, "CHEUNG SHING MARS");

  document.getElementById("games2p-luna").innerHTML = generateGameStats(2, "POINT LUNA");
  document.getElementById("games3p-luna").innerHTML = generateGameStats(3, "POINT LUNA");
  document.getElementById("games4p-luna").innerHTML = generateGameStats(4, "POINT LUNA");
  document.getElementById("games5p-luna").innerHTML = generateGameStats(5, "POINT LUNA");

  document.getElementById("games2p-robinson").innerHTML = generateGameStats(2, "ROBINSON INDUSTRIES");
  document.getElementById("games3p-robinson").innerHTML = generateGameStats(3, "ROBINSON INDUSTRIES");
  document.getElementById("games4p-robinson").innerHTML = generateGameStats(4, "ROBINSON INDUSTRIES");
  document.getElementById("games5p-robinson").innerHTML = generateGameStats(5, "ROBINSON INDUSTRIES");

  document.getElementById("games2p-valley").innerHTML = generateGameStats(2, "VALLEY TRUST");
  document.getElementById("games3p-valley").innerHTML = generateGameStats(3, "VALLEY TRUST");
  document.getElementById("games4p-valley").innerHTML = generateGameStats(4, "VALLEY TRUST");
  document.getElementById("games5p-valley").innerHTML = generateGameStats(5, "VALLEY TRUST");

  document.getElementById("games2p-vitor").innerHTML = generateGameStats(2, "VITOR");
  document.getElementById("games3p-vitor").innerHTML = generateGameStats(3, "VITOR");
  document.getElementById("games4p-vitor").innerHTML = generateGameStats(4, "VITOR");
  document.getElementById("games5p-vitor").innerHTML = generateGameStats(5, "VITOR");

  document.getElementById("games2p-recyclon").innerHTML = generateGameStats(2, "RECYCLON");
  document.getElementById("games3p-recyclon").innerHTML = generateGameStats(3, "RECYCLON");
  document.getElementById("games4p-recyclon").innerHTML = generateGameStats(4, "RECYCLON");
  document.getElementById("games5p-recyclon").innerHTML = generateGameStats(5, "RECYCLON");

  document.getElementById("games2p-splice").innerHTML = generateGameStats(2, "SPLICE");
  document.getElementById("games3p-splice").innerHTML = generateGameStats(3, "SPLICE");
  document.getElementById("games4p-splice").innerHTML = generateGameStats(4, "SPLICE");
  document.getElementById("games5p-splice").innerHTML = generateGameStats(5, "SPLICE");

  //colonies
  document.getElementById("games2p-arklight").innerHTML = generateGameStats(2, "ARKLIGHT");
  document.getElementById("games3p-arklight").innerHTML = generateGameStats(3, "ARKLIGHT");
  document.getElementById("games4p-arklight").innerHTML = generateGameStats(4, "ARKLIGHT");
  document.getElementById("games5p-arklight").innerHTML = generateGameStats(5, "ARKLIGHT");

  //promo
  document.getElementById("games2p-arcadian").innerHTML = generateGameStats(2, "ARCADIAN COMMUNITIES");
  document.getElementById("games3p-arcadian").innerHTML = generateGameStats(3, "ARCADIAN COMMUNITIES");
  document.getElementById("games4p-arcadian").innerHTML = generateGameStats(4, "ARCADIAN COMMUNITIES");
  document.getElementById("games5p-arcadian").innerHTML = generateGameStats(5, "ARCADIAN COMMUNITIES");

  //fanmade
  document.getElementById("games2p-kuiper").innerHTML = generateGameStats(2, "KUIPER BELT COOP.");
  document.getElementById("games3p-kuiper").innerHTML = generateGameStats(3, "KUIPER BELT COOP.");
  document.getElementById("games4p-kuiper").innerHTML = generateGameStats(4, "KUIPER BELT COOP.");
  document.getElementById("games5p-kuiper").innerHTML = generateGameStats(5, "KUIPER BELT COOP.");

}

function pushGeneralStats() {
  //total games
  document.getElementById("total_games").innerHTML = games.length;
  document.getElementById("2p_games").innerHTML = games.filter(function(el) {return el.players == 2}).length;
  document.getElementById("3p_games").innerHTML = games.filter(function(el) {return el.players == 3}).length;
  document.getElementById("4p_games").innerHTML = games.filter(function(el) {return el.players == 4}).length;
  document.getElementById("5p_games").innerHTML = games.filter(function(el) {return el.players == 5}).length;


  //draft games
  var draftGames = games.filter(function(el) {
    return el.draft == "YES"
  });
  document.getElementById("draft_games").innerHTML = Math.round(draftGames.length*100/games.length) + "%" ;
  document.getElementById("corporate_games").innerHTML =  Math.round(checkForElement("expansions", "CORPORATE")*100/games.length) + "%"
  document.getElementById("venus_games").innerHTML =  Math.round(checkForElement("expansions", "VENUS")*100/games.length) + "%"
  document.getElementById("prelude_games").innerHTML =  Math.round(checkForElement("expansions", "PRELUDE")*100/games.length) + "%"
}

function checkForElement (subArrayName, element) {
  //calculated played and won games per corporation
  var playedElement = 0
  for (i = 0; i < games.length; i++) {
    var subArray = games[i][subArrayName]; //getting the expansions array
    if (subArray == undefined) {} //to chatch firebase errors if the array is undefined
    else {
      if (subArray.indexOf(element) > -1) {
        //if the expansion is present in the corporations' arrayAwards
        //add +1 to the counter
        playedElement++;
        }
      }
  }
  return playedElement;
}

function pushMapStats() {
  var tharsisGames = games.filter(function(el) {
    return el.map == "THARSIS"
  });
  var hellasGames = games.filter(function(el) {
    return el.map == "HELLAS"
  });
  var elysiumGames = games.filter(function(el) {
    return el.map == "ELYSIUM"
  });
  document.getElementById("map_tharsis").innerHTML = Math.round(tharsisGames.length*100/games.length) + "%" ;
  document.getElementById("map_hellas").innerHTML = Math.round(hellasGames.length*100/games.length) + "%" ;
  document.getElementById("map_elysium").innerHTML = Math.round(elysiumGames.length*100/games.length) + "%" ;
}

function pushAwardsStats() {
  //THARSIS milestones and awards
  document.getElementById("terraformer").innerHTML =  Math.round(checkForElement("milestones", "TERRAFORMER")*100/games.length) + "%";
  document.getElementById("mayor").innerHTML =  Math.round(checkForElement("milestones", "MAYOR")*100/games.length) + "%";
  document.getElementById("gardener").innerHTML =  Math.round(checkForElement("milestones", "GARDENER")*100/games.length) + "%";
  document.getElementById("builder").innerHTML =  Math.round(checkForElement("milestones", "BUILDER")*100/games.length) + "%";
  document.getElementById("planner").innerHTML =  Math.round(checkForElement("milestones", "PLANNER")*100/games.length) + "%";
  document.getElementById("landlord").innerHTML =  Math.round(checkForElement("awards", "LANDLORD")*100/games.length) + "%";
  document.getElementById("banker").innerHTML =  Math.round(checkForElement("awards", "BANKER")*100/games.length) + "%";
  document.getElementById("scientist").innerHTML =  Math.round(checkForElement("awards", "SCIENTIST")*100/games.length) + "%";
  document.getElementById("thermalist").innerHTML =  Math.round(checkForElement("awards", "THERMALIST")*100/games.length) + "%";
  document.getElementById("miner").innerHTML =  Math.round(checkForElement("awards", "MINER")*100/games.length) + "%";

  document.getElementById("diversifier").innerHTML =  Math.round(checkForElement("milestones", "DIVERSIFIER")*100/games.length) + "%";
  document.getElementById("tactician").innerHTML =  Math.round(checkForElement("milestones", "TACTICIAN")*100/games.length) + "%";
  document.getElementById("polar_explorer").innerHTML =  Math.round(checkForElement("milestones", "POLAR EXPLORER")*100/games.length) + "%";
  document.getElementById("energizer").innerHTML =  Math.round(checkForElement("milestones", "ENERGIZER")*100/games.length) + "%";
  document.getElementById("rim_settler").innerHTML =  Math.round(checkForElement("milestones", "RIM SETTLER")*100/games.length) + "%";
  document.getElementById("cultivator").innerHTML =  Math.round(checkForElement("awards", "CULTIVATOR")*100/games.length) + "%";
  document.getElementById("magnate").innerHTML =  Math.round(checkForElement("awards", "MAGNATE")*100/games.length) + "%";
  document.getElementById("space_baron").innerHTML =  Math.round(checkForElement("awards", "SPACE BARON")*100/games.length) + "%";
  document.getElementById("excentric").innerHTML =  Math.round(checkForElement("awards", "EXCENTRIC")*100/games.length) + "%";
  document.getElementById("contractor").innerHTML =  Math.round(checkForElement("awards", "CONTRACTOR")*100/games.length) + "%";

  document.getElementById("generelast").innerHTML =  Math.round(checkForElement("milestones", "GENERALIST")*100/games.length) + "%";
  document.getElementById("specialist").innerHTML =  Math.round(checkForElement("milestones", "SPECIALIST")*100/games.length) + "%";
  document.getElementById("ecologist").innerHTML =  Math.round(checkForElement("milestones", "ECOLOGIST")*100/games.length) + "%";
  document.getElementById("tycoon").innerHTML =  Math.round(checkForElement("milestones", "TYCOON")*100/games.length) + "%";
  document.getElementById("legend").innerHTML =  Math.round(checkForElement("milestones", "LEGEND")*100/games.length) + "%";
  document.getElementById("celebrity").innerHTML =  Math.round(checkForElement("awards", "CELEBRITY")*100/games.length) + "%";
  document.getElementById("industrialist").innerHTML =  Math.round(checkForElement("awards", "INDUSTRIALIST")*100/games.length) + "%";
  document.getElementById("desert_settler").innerHTML =  Math.round(checkForElement("awards", "DESERT SETTLER")*100/games.length) + "%";
  document.getElementById("estate_dealer").innerHTML =  Math.round(checkForElement("awards", "ESTATE DEALER")*100/games.length) + "%";
  document.getElementById("benefactor").innerHTML =  Math.round(checkForElement("awards", "BENEFACTOR")*100/games.length) + "%";

  document.getElementById("hoverlord").innerHTML =  Math.round(checkForElement("milestones", "HOVERLORD")*100/Math.round(checkForElement("expansions", "VENUS"))) + "%";
  document.getElementById("venuphile").innerHTML =  Math.round(checkForElement("awards", "VENUPHILE")*100/Math.round(checkForElement("expansions", "VENUS"))) + "%";
}

function generateAverageScores (players) {
  gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  //calculating average generations
  var preludeGames = 0;
  var preludeSum = 0;
  var totalSum = 0;

  for (i = 0; i < gamesPerPlayers.length; i++) {
    var generationsValue = gamesPerPlayers[i]["generations"]; //getting the generations value
    var expansionsArray = gamesPerPlayers[i]["expansions"]; //getting the generations value
    if (expansionsArray == undefined) { var expansionsArray = [];} //capturing errors if there are no expansions selected


    if (expansionsArray.indexOf("PRELUDE") > -1) {
      //if the expansion PRELUDE is present
      preludeGames++;   //add +1 to the counter
      preludeSum = preludeSum + parseInt(generationsValue);
    } else {totalSum = totalSum + parseInt(generationsValue);}
  }

  var totalGames = gamesPerPlayers.length - preludeGames;
  document.getElementById("generations_" + players).innerHTML = (Math.round(totalSum*10/totalGames)/10).toFixed(1);
  document.getElementById("generations_" + players + "_prelude").innerHTML = (Math.round(preludeSum*10/preludeGames)/10).toFixed(1);

}

function pushAverageGenerations () {
  generateAverageScores(2);
  generateAverageScores(3);
  generateAverageScores(4);
  generateAverageScores(5);
}

function pushHistograms() {
  histogram(2);
  histogram(3);
  histogram(4);
  histogram(5);
}


/// charts and their functions

function histogram (players) {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var data = google.visualization.arrayToDataTable(generateScoresArray(players));
  if (players == 2) {
    var options = {
      animation: {"startup": true},
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444", },
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 5},maxValue:20 },
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 10, minValue: 60, maxValue: 200}
    };}

    if (players == 3) {
      var options = {
        animation: {"startup": true},
        title: '',
        titleTextStyle: {fontSize:20, color:"#444444", },
        legend: { position: 'none' },
        fontSize: 12,
        backgroundColor: "transparent",
        vAxis: { gridlines: { count: 5},maxValue:20 },
        HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
        bar: {gap: 1},
        chartArea:{left:0,bottom:20,top:0,width:460},
        colors: ['#444444','#888888'],
        histogram: {bucketSize: 10, minValue: 40, maxValue: 150}
      };}

      if (players == 4) {
        var options = {
          animation: {"startup": true},
          title: '',
          titleTextStyle: {fontSize:20, color:"#444444", },
          legend: { position: 'none' },
          fontSize: 12,
          backgroundColor: "transparent",
          vAxis: { gridlines: { count: 5},maxValue:20 },
          HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
          bar: {gap: 1},
          chartArea:{left:0,bottom:20,top:0,width:460},
          colors: ['#444444','#888888'],
          histogram: {bucketSize: 10, minValue: 40, maxValue: 150}
        };}

        if (players == 5) {
          var options = {
            animation: {"startup": true},
            title: '',
            titleTextStyle: {fontSize:20, color:"#444444", },
            legend: { position: 'none' },
            fontSize: 12,
            backgroundColor: "transparent",
            vAxis: { gridlines: { count: 5},maxValue:20 },
            HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
            bar: {gap: 1},
            chartArea:{left:0,bottom:20,top:0,width:460},
            colors: ['#444444','#888888'],
            histogram: {bucketSize: 5, minValue: 35, maxValue: 90}
          };}

    var chart = new google.visualization.Histogram(document.getElementById('histogram_' + players));
    chart.draw(data, options);
  }
}

function generateScoresArray (players) {
  //average scores calculation for the chart headers
  var totalScores = 0
  var totalGames = 0
  //Generating the array for the Google histograms
  var scores = [['Corporation', 'Score']];
  var gamesPerPlayers = games.filter(function(el) {
    return el.players == players
  });

  for (i = 0; i < gamesPerPlayers.length; i++) {
    var scoresArray = gamesPerPlayers[i]["scores"];
    var corporationsArray = gamesPerPlayers[i]["corporations"];
    for (j = 0; j < scoresArray.length; j++) {
      //['Ecoline', 88]
      var arr = [corporationsArray[j], parseInt(scoresArray[j])];
      scores.push(arr);
      //average scores calculation for the chart headers
      totalGames++;
      totalScores = totalScores + parseInt(scoresArray[j]);
    }
  }
  //pushing the AVERAGE
  document.getElementById("chart_scores_" + players).innerHTML = Math.round(totalScores/totalGames);
  return scores;
}

function getUTCtime() {

}

function sortByPoints(players) {
  // get array of elements
    var myArray = document.querySelectorAll('.corporation-row');
    var count = 0;
    // sort based on timestamp attribute
    myArray = [].slice.call(myArray);
    myArray.sort(function (a, b) {
    // convert to integers from strings
    a = parseInt($(a).find("div[id*='games" + players +"p'] > div[class='points']").text(), 10);
    if (a == null || isNaN(a)) {a = 0}
    b = parseInt($(b).find("div[id*='games" + players +"p'] > div[class='points']").text(), 10);
    if (b == null || isNaN(b)) {b = 0}
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
  $("#playerStats").append(myArray);
  var y = document.querySelectorAll(".corporation-stats");
  for (j=0; j < y.length; j++) {
    y[j].style.opacity = 0.3;
  }

  var x = document.querySelectorAll("div[id*='games" + players +"p']");
  for (i=0; i < x.length; i++) {
    x[i].style.opacity = 1;
  }
}
