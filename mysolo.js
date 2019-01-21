histogramCorporate();
histogramVenus();
histogramPrelude();
histogramColonies();
addResultColours();



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
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //CORPORATE GAMES
    games = [
          ['Corporation', 'Score'],

          ['Ecoline', 88],['Ecoline', 91],['Ecoline', 99],['Ecoline', 104],['Ecoline', 108],['Ecoline', 107],['Ecoline', 77],['Ecoline', 101],
          ['Ecoline', 106],['Ecoline', 102],['Ecoline', 94],['Ecoline', 81],['Ecoline', 99],['Ecoline', 99],['Ecoline', 97],['Ecoline', 91],
          ['Helion', 97],['Helion', 101],['Helion', 94],['Helion', 81],['Helion', 91],['Helion', 104],['Helion', 98],['Helion', 92],['Helion', 96],
          ['Helion', 95],['Helion', 96],['Helion', 94],['Helion', 89],['Helion', 91],['Helion', 82],
          ['Credicor', 108],['Credicor', 94],['Credicor', 87],['Credicor', 89],['Credicor', 95],['Credicor', 82],['Credicor', 89],['Credicor', 107],['Credicor', 106],['Credicor', 106],['Credicor', 113],['Credicor', 110],
          ['Teractor', 96],['Teractor', 77],['Teractor', 102],['Teractor', 84],['Teractor', 122],['Teractor', 101],
          ['Mining Guild', 84],['Mining Guild', 92],['Mining Guild', 85],['Mining Guild', 80],
          ['Tharsis Republic', 108],['Tharsis Republic', 96],['Tharsis Republic', 94],
          ['Thorgate', 101],['Thorgate', 91],['Thorgate', 102],['Thorgate', 104],
          ['Phobolog', 104],['Phobolog', 106],['Phobolog', 70],['Phobolog', 78],['Phobolog', 80],['Phobolog', 105],['Phobolog', 103],['Phobolog', 76],
          ['Inventrix', 95],['Inventrix', 87],['Inventrix', 77],['Inventrix', 75],['Inventrix', 89],['Inventrix', 83],
          ['Saturn Systems', 79],['Saturn Systems', 94],['Saturn Systems', 91],['Saturn Systems', 89],['Saturn Systems', 132],['Saturn Systems', 99],['Saturn Systems', 88],
          ['Saturn Systems', 91],['Saturn Systems', 95],['Saturn Systems', 81],
          ['Interplanetery', 102],['Interplanetery', 99],['Interplanetery', 97],['Interplanetery', 107],['Interplanetery', 97]
        ];


        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        div = document.getElementById("corporate_div")
        var fails = div.querySelectorAll(".failed").length;
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+fails)));


        document.getElementById("wins_corporate").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_corporate").innerHTML = avg + " <span style='font-size:20px'>P</span>";
        document.getElementById("losses_corporate").innerHTML = fails + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("windrate_corporate").innerHTML = " " + winrate + " <span style='font-size:20px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_corporate'));
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
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //VENUS GAMES
    var games = [
        ['Corporation', 'Score'],

        ['Credicor', 77],['Credicor', 112],['Credicor', 97],['Credicor', 94],['Credicor', 108],['Credicor', 103],['Credicor', 99],['Credicor', 92],['Credicor', 92],
        ['Ecoline', 104],['Ecoline', 106],['Ecoline', 112],['Ecoline', 92],['Ecoline', 94],['Ecoline', 110],['Ecoline', 114],['Ecoline', 107],['Ecoline', 118],['Ecoline', 91],
        ['Helion', 82],['Helion', 87],['Helion', 123],['Helion', 95],['Helion', 92],['Helion', 95],['Helion', 92],['Helion', 113],
        ['Mining Guild', 79],['Mining Guild', 103],
        ['Interplanetery', 99],
        ['Inventrix', 87],['Inventrix', 89],['Inventrix', 103],['Inventrix', 92],['Inventrix', 95],['Inventrix', 96],
        ['Phobolog', 89],['Phobolog', 116],['Phobolog', 79],['Phobolog', 80],
        ['Tharsis Republic', 86],
        ['Thorgate', 96],['Thorgate', 85],['Thorgate', 75],['Thorgate', 85],['Thorgate', 82],
        ['Teractor', 90],['Teractor', 93],['Teractor', 73],['Teractor', 75],['Teractor', 86],['Teractor', 90],['Teractor', 100],['Teractor', 105],['Teractor', 105],
        ['Saturn Systems', 108],
        ['Aphrodite', 81],['Aphrodite', 110],['Aphrodite', 93],['Aphrodite', 79],['Aphrodite', 80],['Aphrodite', 77],['Aphrodite', 96],['Aphrodite', 100],['Aphrodite', 112],
        ['Celestic', 99],['Celestic', 106], ['Celestic', 111],
        ['Manutech', 72],['Manutech', 104],['Manutech', 98],['Manutech', 95],['Manutech', 71],
        ['Viron', 105],['Viron', 94],['Viron', 96],
        ['MSI', 93],['MSI', 106],['MSI', 101],['MSI', 94],['MSI', 104],['MSI', 104],['MSI', 108],['MSI', 91],

      ];


        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        div = document.getElementById("venus_div")
        var fails = div.querySelectorAll(".failed").length;
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+fails)));


        document.getElementById("wins_venus").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_venus").innerHTML = avg + " <span style='font-size:20px'>P</span>";
        document.getElementById("losses_venus").innerHTML = fails + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("windrate_venus").innerHTML = " " + winrate + " <span style='font-size:20px'>%</span>";

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
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //PRELUDE GAMES
    games = [
          ['Corporation', 'Score'],

          ['Credicor', 82],
          ['Ecoline', 111],['Ecoline', 96],['Ecoline', 99],['Ecoline', 109],['Ecoline', 102],['Ecoline', 96],['Ecoline', 114],['Ecoline', 93],['Ecoline', 98],['Ecoline', 117],
          ['Helion', 96],['Helion', 92],['Helion', 85],['Helion', 87],['Helion', 101],['Helion', 98],

          ['Interplanetery', 83],
          ['Inventrix', 88],['Inventrix', 85],['Inventrix', 88],['Inventrix', 105],
          ['Phobolog', 110],['Phobolog', 96],['Phobolog', 100],['Phobolog', 73],['Phobolog', 101],['Phobolog', 107],['Phobolog', 87],['Phobolog', 97],
          ['Tharsis Republic', 80],['Tharsis Republic', 112],['Tharsis Republic', 89],
          ['Thorgate', 88],
          ['U.N.M.I', 92],['U.N.M.I', 117],['U.N.M.I', 98],['U.N.M.I', 95],
          ['Teractor', 104],['Teractor', 100],
          ['Saturn Systems', 105],['Saturn Systems', 97],['Saturn Systems', 111],['Saturn Systems', 106],['Saturn Systems', 89],
          ['Aphrodite', 79],['Aphrodite', 96],
          ['Celestic', 88],['Celestic', 89],['Celestic', 115],['Celestic', 102],
          ['Manutech', 103],['Manutech', 100],
          ['MSI', 84],['MSI', 95],['MSI', 119],['MSI', 88],['MSI', 90],
          ['Viron', 88],['Viron', 106],['Viron', 91],['Viron', 107],
          ['Cheung Shing Mars', 92],['Cheung Shing Mars', 97],['Cheung Shing Mars', 103],['Cheung Shing Mars', 90],['Cheung Shing Mars', 87],['Cheung Shing Mars', 84],['Cheung Shing Mars', 98],['Cheung Shing Mars', 108],
          ['Point Luna', 106],
          ['Robison Industries', 107],['Robison Industries', 88], ['Robison Industries', 102],['Robison Industries', 95],['Robison Industries', 90],['Robison Industries', 104],
          ['Valley Trust', 100],['Valley Trust', 97],['Valley Trust', 118],['Valley Trust', 87],

        ];


        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        div = document.getElementById("prelude_div")
        var fails = div.querySelectorAll(".failed").length;
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+fails)));


        document.getElementById("wins_prelude").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_prelude").innerHTML = avg + " <span style='font-size:20px'>P</span>";
        document.getElementById("losses_prelude").innerHTML = fails + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("windrate_prelude").innerHTML = " " + winrate + " <span style='font-size:20px'>%</span>";

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
      HAxis: {textStyle : {fontSize: 7, fontName: 'Prototype'}},
      bar: {gap: 1},
      chartArea:{left:0,bottom:20,top:0,width:460},
      colors: ['#444444','#888888'],
      histogram: {bucketSize: 5, minValue: 70, maxValue: 135}
    };

    //COLONIES GAMES
    games = [
          ['Corporation', 'Score'],
          ['Credicor', 85],
          ['UNMI', 90],
          ['Helion', 102],
          ['Interplanetery', 97],
          ['Inventrix', 70],['UNMI', 109],
          ['Manutech', 97],
          ['Valley Trust', 90],
          ['Polyphemos', 99],['Polyphemos', 100],
        ];


        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        div = document.getElementById("colonies_div")
        var fails = div.querySelectorAll(".failed").length;
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+fails)));


        document.getElementById("wins_colonies").innerHTML = games.length -1 + " <span style='font-size:20px;font-weight:bold'>&#x2713;</span>";
        document.getElementById("points_colonies").innerHTML = avg + " <span style='font-size:20px'>P</span>";
        document.getElementById("losses_colonies").innerHTML = fails + " <span style='font-size:20px;'>&#x2717;</span>";
        document.getElementById("windrate_colonies").innerHTML = " " + winrate + " <span style='font-size:20px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_colonies'));
    chart.draw(games, options);
  }
}

function addResultColours() {
  divs = document.querySelectorAll(".result")
  for (i=0; i < divs.length;i++) {
    if (parseInt(divs[i].textContent) > 99) {divs[i].classList.add("background-gold")}
    if (parseInt(divs[i].textContent)  > 79 && parseInt(divs[i].textContent) < 100) {divs[i].classList.add("background-silver")}
    if (parseInt(divs[i].textContent) < 80) {divs[i].classList.add("background-bronze")}
  }
}
