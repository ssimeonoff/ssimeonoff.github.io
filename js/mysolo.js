histogramCorporate();
histogramVenus();
histogramPrelude();
histogramColonies();




function histogramCorporate () {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var options = {
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444"},
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 1}, maxValue:20 },
      hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:380},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 75, maxValue: 135}
    };

    //CORPORATE GAMES
        var games = [
          ['Corporation', 'Score'],
        ];

        data = [
          ["Credicor", 108,94,87,89,0,95,82,89,107,106,106,113,110],
          ["Ecoline", 88,91,99,104,108,107,77,101,106,102,94,81,99,99,97,91],
          ["Helion", 97,101,94,81,91,104,98,92,96,95,96,94,89,91,0,82],
          ["Mining Guild", 84,92,0,85,80],
          ["Teractor", 96,77,102,84,122,101],
          ["Tharsis Republic", 108,96,94],
          ["Thorgate", 101,91,102,104],
          ["Phobolog", 104,106,0,70,0,78,80,105,103,76],
          ["Inventrix", 95,87,77,75,0,89,0,83],
          ["Saturn Systems", 79,94,0,91,89,132,99,88,91,0,0,95,81],
          ["Interplanetary", 102,99,97,107,0,97]
        ];

        pushGamesData(games, data)
        generateHTML("corporate_div",games);
        div = document.getElementById("corporate_div")


        var losses = removeZeros(games);
        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+losses)));


        div.querySelector(".wins-mysolo").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        div.querySelector(".points-mysolo").innerHTML = avg + " <span style='font-size:14px'>P</span>";
        div.querySelector(".losses-mysolo").innerHTML = losses + " <span style='font-size:20px;'>&#x2717;</span>";
        div.querySelector(".winrate-mysolo").innerHTML = " " + winrate + " <span style='font-size:14px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(div.querySelector(".chart-div-mysolo"));
    chart.draw(games, options);
  }
}

function histogramVenus () {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var options = {
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444"},
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 1}, maxValue:20 },
      hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:380},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //VENUS GAMES
    var games = [
        ['Corporation', 'Score'],

        ['Credicor', 0], ['Credicor', 77],['Credicor', 112],['Credicor', 97],['Credicor', 0],['Credicor', 94],['Credicor', 108],['Credicor', 103],['Credicor', 99],['Credicor', 92],['Credicor', 0],['Credicor', 92],
        ['Ecoline', 104],['Ecoline', 106],['Ecoline', 112],['Ecoline', 92],['Ecoline', 94],['Ecoline', 110],['Ecoline', 114],['Ecoline', 107],['Ecoline', 118],['Ecoline', 91],
        ['Helion', 82],['Helion', 87],['Helion', 123],['Helion', 0],['Helion', 95],['Helion', 92],['Helion', 95],['Helion', 92],['Helion', 113],
        ['Mining Guild', 79],['Mining Guild', 0],['Mining Guild', 103],
        ['Interplanetary', 99],
        ['Inventrix', 0], ['Inventrix', 87],['Inventrix', 89],['Inventrix', 103],['Inventrix', 92],['Inventrix', 95],['Inventrix', 96],['Inventrix', 0],
        ['Phobolog', 89],['Phobolog', 116],['Phobolog', 0],['Phobolog', 0],['Phobolog', 79],['Phobolog', 80],
        ['Tharsis Republic', 86],['Tharsis Republic', 0],['Tharsis Republic', 0],
        ['Thorgate', 96],['Thorgate', 0],['Thorgate', 0],['Thorgate', 85],['Thorgate', 0],['Thorgate', 75],['Thorgate', 85],['Thorgate', 0],['Thorgate', 82],
        ['Teractor', 90],['Teractor', 93],['Teractor', 73],['Teractor', 75],['Teractor', 86],['Teractor', 90],['Teractor', 100],['Teractor', 105],['Teractor', 105],
        ['Saturn Systems', 0],['Saturn Systems', 108],
        ['Aphrodite', 81],['Aphrodite', 110],['Aphrodite', 93],['Aphrodite', 79],['Aphrodite', 80],['Aphrodite', 77],['Aphrodite', 96],['Aphrodite', 100],['Aphrodite', 112],
        ['Celestic', 99],['Celestic', 106], ['Celestic', 111],
        ['Manutech', 72],['Manutech', 104],['Manutech', 98],['Manutech', 95],['Manutech', 71],
        ['Viron', 105],['Viron', 94],['Viron', 96],
        ['MSI', 93],['MSI', 106],['MSI', 101],['MSI', 94],['MSI', 104],['MSI', 104],['MSI', 108],['MSI', 91],

      ];


      generateHTML("venus_div",games);

      var losses = removeZeros(games);
      var sum = 0;
      for( var i = 1; i < games.length; i++ ){
        sum += parseInt(games[i][1]); //don't forget to add the base
      }
      var avg = Math.round(parseFloat(sum/(games.length-1)));
      var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+losses)));


      document.getElementById("wins_venus").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
      document.getElementById("points_venus").innerHTML = avg + " <span style='font-size:14px'>P</span>";
      document.getElementById("losses_venus").innerHTML = losses + " <span style='font-size:20px;'>&#x2717;</span>";
      document.getElementById("winrate_venus").innerHTML = " " + winrate + " <span style='font-size:14px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_venus'));
    chart.draw(games, options);
  }
}

function histogramPrelude () {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var options = {
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444"},
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 1}, maxValue:20 },
      hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:380},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //PRELUDE GAMES
    games = [
          ['Corporation', 'Score'],

          ['Credicor', 82],
          ['Ecoline', 111],['Ecoline', 96],['Ecoline', 0],['Ecoline', 99],['Ecoline', 109],['Ecoline', 102],['Ecoline', 96],['Ecoline', 114],['Ecoline', 93],['Ecoline', 98],['Ecoline', 117],
          ['Helion', 96],['Helion', 92],['Helion', 0],['Helion', 85],['Helion', 87],['Helion', 101],['Helion', 98],

          ['Interplanetary', 83], ['Interplanetary', 0],
          ['Inventrix', 88],['Inventrix', 85],['Inventrix', 88],['Inventrix', 0],['Inventrix', 105],
          ['Phobolog', 110],['Phobolog', 96],['Phobolog', 100],['Phobolog', 73],['Phobolog', 101],['Phobolog', 107],['Phobolog', 0],['Phobolog', 87],['Phobolog', 97],
          ['Tharsis Republic', 80],['Tharsis Republic', 112],['Tharsis Republic', 89],['Tharsis Republic', 0],
          ['Thorgate', 0],['Thorgate', 88],
          ['UNMI', 92],['UNMI', 117],['UNMI', 98],['UNMI', 95],
          ['Teractor', 104],['Teractor', 100],
          ['Saturn Systems', 105],['Saturn Systems', 97],['Saturn Systems', 111],['Saturn Systems', 106],['Saturn Systems', 89],
          ['Aphrodite', 79],['Aphrodite', 96],
          ['Celestic', 0],['Celestic', 88],['Celestic', 89],['Celestic', 115],['Celestic', 102],['Celestic', 0],
          ['Manutech', 103],['Manutech', 0],['Manutech', 100],
          ['MSI', 0],['MSI', 84],['MSI', 0],['MSI', 0],['MSI', 95],['MSI', 119],['MSI', 88],['MSI', 0],['MSI', 90],
          ['Viron', 88],['Viron', 106],['Viron', 91],['Viron', 107],
          ['Cheung Shing Mars', 92],['Cheung Shing Mars', 0],['Cheung Shing Mars', 97],['Cheung Shing Mars', 103],['Cheung Shing Mars', 90],['Cheung Shing Mars', 87],['Cheung Shing Mars', 84],['Cheung Shing Mars', 98],['Cheung Shing Mars', 108],
          ['Point Luna', 106],
          ['Robinson Industries', 107],['Robinson Industries', 88], ['Robinson Industries', 102],['Robinson Industries', 0],['Robinson Industries', 95],['Robinson Industries', 90],['Robinson Industries', 104],
          ['Valley Trust', 100],['Valley Trust', 0],['Valley Trust', 97],['Valley Trust', 118],['Valley Trust', 87],
          ['Vitor', 0],['Vitor', 0]

        ];


        generateHTML("prelude_div",games);

        var losses = removeZeros(games);
        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+losses)));


        document.getElementById("wins_prelude").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_prelude").innerHTML = avg + " <span style='font-size:14px'>P</span>";
        document.getElementById("losses_prelude").innerHTML = losses + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("winrate_prelude").innerHTML = " " + winrate + " <span style='font-size:14px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_prelude'));
    chart.draw(games, options);
  }
}

function histogramColonies () {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var options = {
      title: '',
      titleTextStyle: {fontSize:20, color:"#444444"},
      legend: { position: 'none' },
      fontSize: 12,
      backgroundColor: "transparent",
      vAxis: { gridlines: { count: 1}, maxValue:20 },
      hAxis: {textStyle : {fontSize: 10, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:380},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //COLONIES GAMES
    games = [
          ['Corporation', 'Score'],

          ['Credicor', 85],['Credicor', 104],['Credicor', 103],['Credicor', 105],
          ['Ecoline', 0],
          ['Helion', 0], ['Helion', 102],
          ['Mining Guild', 0],
          ['Interplanetary', 97],['Interplanetary', 99],['Interplanetary', 98],['Interplanetary', 114],
          ['Inventrix', 70],['Inventrix', 109],
          ['Phobolog', 0],


          ['UNMI', 90],['UNMI', 108],['UNMI', 101],

          ['Celestic', 80],['Celestic', 99],['Celestic', 0],['Celestic', 106],['Celestic', 0],
          ['Manutech', 97],['Manutech', 0],
          ['MSI', 95], ['MSI', 99],['MSI', 97],
          ['Viron', 104],
          ['Cheung Shing Mars', 99],

          ['Robinson Industries', 88], ['Robinson Industries', 90],['Robinson Industries', 90],
          ['Valley Trust', 90], ['Valley Trust', 107],['Valley Trust', 110],
          ['Vitor', 91],
          ['Aridor', 114], ['Aridor', 116],['Aridor', 110],
          ['Polyphemos', 99],['Polyphemos', 80],['Polyphemos', 100],
          ['Poseidon', 87], ['Poseidon', 108],

          ['Stormcraft', 90],['Stormcraft', 113]
        ];

        generateHTML("colonies_div",games);

        var losses = removeZeros(games);
        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+losses)));


        document.getElementById("wins_colonies").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_colonies").innerHTML = avg + " <span style='font-size:14px'>P</span>";
        document.getElementById("losses_colonies").innerHTML = losses + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("winrate_colonies").innerHTML = " " + winrate + " <span style='font-size:14px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_colonies'));
    chart.draw(games, options);
  }
}

function removeZeros(games) {
  var losses = 0
  for (i=0; i < games.length;i++ ) {
    if (parseInt(games[i][1]) == 0) {
      games.splice(i,1);
      i--;
      losses++;
    }
  }
  return losses
}

function generateHTML(expansions,games) {
  expansionsDiv = document.getElementById(expansions)
  for (i=1; i < games.length; i++ ) {
    var el = expansionsDiv.querySelector("div[title='"+games[ i][0]+"'] > div[class='empty']")
    if (games[i][1] > 99) {
      el.innerHTML = games[i][1];
      el.classList.add("result");
      el.classList.add("background-gold");
    }
    if (games[i][1] > 79 && games[i][1] < 100) {
      el.innerHTML = games[i][1];
      el.classList.add("result");
      el.classList.add("background-silver");
    }
    if (games[i][1] > 0 && games[i][1] < 80) {
      el.innerHTML = games[i][1];
      el.classList.add("result");
      el.classList.add("background-bronze");
    }
    if (games[i][1] == 0 ) {
      el.classList.add("failed");
    }

    el.classList.remove("empty");
  }
}

function pushGamesData (main_arr, data_arr) {
  for (i=0; i< data_arr.length; i++) {
    for (j=1; j <data_arr[i].length; j++) {
      main_arr.push([data_arr[i][0],data_arr[i][j]])
    }
  }
}
