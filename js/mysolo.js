histogramPrelude();
histogramColonies();

data_ce = [
  ["Credicor", 108,94,87,89,0,95,82,89,107,106,106,113,110],
  ["Ecoline", 88,91,99,104,108,107,77,101,106,102,94,81,99,99,97,91],
  ["Helion", 97,101,94,81,91,104,98,92,96,95,96,94,89,91,0,82],
  ["Mining Guild", 84,92,0,85,80],
  ["Interplanetary", 102,99,97,107,0,97],
  ["Inventrix", 95,87,77,75,0,89,0,83],
  ["Phobolog", 104,106,0,70,0,78,80,105,103,76],
  ["Tharsis Republic", 108,96,94],
  ["Thorgate", 101,91,102,104],
  ["UNMI"],
  ["Teractor", 96,77,102,84,122,101],
  ["Saturn Systems", 79,94,0,91,89,132,99,88,91,0,0,95,81]

];
histogram("div_ce", data_ce);

data_ce_vn = [
  ["Credicor", 0,77,112,97,0,94,108,103,99,92,0,92],
  ["Ecoline", 104,106,112,92,94,110,114,107,118,91],
  ["Helion", 82,87,123,0,95,92,95,92,113],
  ["Mining Guild", 79,0,103],
  ["Interplanetary", 99],
  ["Inventrix", 0,87,89,103,92,95,96,0],
  ["Phobolog", 89,116,0,0,79,80],
  ["Tharsis Republic", 86,0,0],
  ["Thorgate", 96,0,0,85,0,75,85,0,82],
  ["UNMI"],
  ["Teractor", 90,93,73,75,86,90,100,105,105],
  ["Saturn Systems", 0,108],
  ['Aphrodite', 81,110,93,79,80,77,96,100,112],
  ['Celestic', 99,106,111],
  ['Manutech', 72,104,98,95,71],
  ['Viron', 105,94,96],
  ['MSI', 93,106,101,94,104,104,108,91]
];
histogram("div_ce_vn", data_ce_vn);


function histogram (div_id, data) {
  
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

        var games = [
          ['Corporation', 'Score'],
        ];

        pushGamesData(games, data)
        generateHTML(div_id, games);
        div = document.getElementById(div_id)

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
