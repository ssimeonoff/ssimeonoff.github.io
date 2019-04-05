
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

data_ce_vn_pr = [
  ['Credicor', 82],
  ['Ecoline', 111,96,0,99,109,102,96,114,93,98,117],
  ['Helion', 96,92,0,85,87,101,98],
  ['Interplanetary', 83,0],
  ['Inventrix', 88,85,88,0,105],
  ['Phobolog', 110,96,100,73,101,107,0,87,97],
  ['Tharsis Republic', 80,112,89,0],
  ['Thorgate', 0,88],
  ['UNMI', 92,117,98,95],
  ['Teractor', 104,100],
  ['Saturn Systems', 105,97,111,106,89],
  ['Aphrodite', 79,96],
  ['Celestic', 0,88,89,115,102,0],
  ['Manutech', 103,0,100],
  ['MSI', 0,84,0,0,95,119,88,0,90],
  ['Viron', 88,106,91,107],
  ['Cheung Shing Mars', 92,0,97,103,90,87,84,98,108],
  ['Point Luna', 106],
  ['Robinson Industries', 107,88,102,0,95,90,104],
  ['Valley Trust', 100,0,97,118,87],
  ['Vitor', 0,0]
];

data_ce_vn_pr_co = [
  ['Credicor', 85,104,103,105],
  ['Ecoline', 0],
  ['Helion', 0,102],
  ['Mining Guild', 0],
  ['Interplanetary', 97,99,98,114],
  ['Inventrix', 70,109],
  ['Phobolog', 0],
  ['Tharsis Republic'],
  ['Thorgate'],
  ['UNMI', 90,108,101],
  ['Teractor'],
  ['Celestic', 80,99,0,106,0],
  ['Manutech', 97,0],
  ['MSI', 95,99,97],
  ['Viron', 104],
  ['Cheung Shing Mars', 99],
  ['Point Luna'],
  ['Robinson Industries', 88,90,90],
  ['Valley Trust', 90,107,110],
  ['Vitor', 91],
  ['Aridor', 114,116,110],
  ['Polyphemos', 99,80,100],
  ['Poseidon', 87,108],
  ['Polyphemos'],
  ['Stormcraft', 90,113]
];

histogram("div_ce", data_ce);
histogram("div_ce_vn", data_ce_vn);
histogram("div_ce_vn_pr", data_ce_vn_pr);
histogram("div_ce_vn_pr_co", data_ce_vn_pr_co);

/////////////////////////////////////////////////////
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
      chartArea:{left:0,bottom:26,top:0,width:380},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 75, maxValue: 135}
    };

    var games = [
      ['Corporation', 'Score'],
    ];

    pushGamesData(games, data)
    generateHTML(div_id, games);
    div = document.getElementById(div_id)

    var losses = removeLosses(games);
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

///////////////////////////////////////////////////
function removeLosses(games) {
  var losses = 0
  for (i=0; i < games.length;i++ ) {
    //score under 70 is counted as a loss
    if (parseInt(games[i][1]) < 70) {
      games.splice(i,1);
      i--;
      losses++;
    }
  }
  return losses
}

function pushGamesData (main_arr, data_arr) {
  for (i=0; i< data_arr.length; i++) {
    for (j=1; j <data_arr[i].length; j++) {
      main_arr.push([data_arr[i][0],data_arr[i][j]])
    }
  }
}

////////////////////////////////////////////////////////////
function generateHTML(expansions,games) {

  expansionsDiv = document.getElementById(expansions);
  for (i=1; i < games.length; i++ ) {
    var el = expansionsDiv.querySelector("div[title='"+games[i][0]+"']");
    if (games[i][1] > 99) {
      el.innerHTML += "<div class='result background-gold'>"+games[i][1]+"</div>";
    }
    if (games[i][1] > 79 && games[i][1] < 100) {
      el.innerHTML += "<div class='result background-silver'>"+games[i][1]+"</div>";
    }
    if (games[i][1] > 0 && games[i][1] < 80) {
      el.innerHTML += "<div class='result background-bronze'>"+games[i][1]+"</div>";
    }
    if (games[i][1] == 0 ) {
      el.innerHTML += "<div class='failed'></div>";
    }
  }
}
