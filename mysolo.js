histogramCorporate();


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
      histogram: {bucketSize: 5, minValue: 70, maxValue: 130}
    };

    games = [
          ['Corporation', 'Score'],

          ['Ecoline', 88],
          ['Ecoline', 91],
          ['Ecoline', 99],
          ['Ecoline', 104],
          ['Ecoline', 108],
          ['Ecoline', 107],
          ['Ecoline', 77],
          ['Ecoline', 101],
          ['Ecoline', 106],
          ['Ecoline', 102],
          ['Ecoline', 94],
          ['Ecoline', 81],
          ['Ecoline', 99],
          ['Ecoline', 99],
          ['Ecoline', 97],
          ['Ecoline', 91],

          ['Helion', 97],
          ['Helion', 101],
          ['Helion', 94],
          ['Helion', 81],
          ['Helion', 91],
          ['Helion', 104],
          ['Helion', 98],
          ['Helion', 92],
          ['Helion', 96],
          ['Helion', 95],
          ['Helion', 96],
          ['Helion', 94],
          ['Helion', 89],
          ['Helion', 91],
          ['Helion', 82],

          ['Credicor', 108],
          ['Credicor', 94],
          ['Credicor', 87],
          ['Credicor', 89],
          ['Credicor', 95],
          ['Credicor', 82],
          ['Credicor', 89],
          ['Credicor', 107],
          ['Credicor', 106],
          ['Credicor', 106],
          ['Credicor', 113],
          ['Credicor', 110],

          ['Teractor', 96],
          ['Teractor', 77],
          ['Teractor', 102],
          ['Teractor', 84],
          ['Teractor', 122],
          ['Teractor', 101],

          ['Mining Guild', 84],
          ['Mining Guild', 92],
          ['Mining Guild', 85],
          ['Mining Guild', 80],

          ['Tharsis Republic', 108],
          ['Tharsis Republic', 96],
          ['Tharsis Republic', 94],

          ['Thorgate', 101],
          ['Thorgate', 91],
          ['Thorgate', 102],
          ['Thorgate', 104],

          ['Phobolog', 104],
          ['Phobolog', 106],
          ['Phobolog', 70],
          ['Phobolog', 78],
          ['Phobolog', 80],
          ['Phobolog', 105],
          ['Phobolog', 103],
          ['Phobolog', 76],

          ['Inventrix', 95],
          ['Inventrix', 87],
          ['Inventrix', 77],
          ['Inventrix', 75],
          ['Inventrix', 89],
          ['Inventrix', 83],

          ['Saturn Systems', 79],
          ['Saturn Systems', 94],
          ['Saturn Systems', 91],
          ['Saturn Systems', 89],
          ['Saturn Systems', 132],
          ['Saturn Systems', 99],
          ['Saturn Systems', 88],
          ['Saturn Systems', 91],
          ['Saturn Systems', 95],
          ['Saturn Systems', 81],

          ['Interplanetery', 102],
          ['Interplanetery', 99],
          ['Interplanetery', 97],
          ['Interplanetery', 107],
          ['Interplanetery', 97]
        ];


        var sum = 0;
        for( var i = 1; i < games.length; i++ ){
          sum += parseInt(games[i][1]); //don't forget to add the base
        }
        var avg = Math.round(parseFloat(sum/(games.length-1)));
        var fails = document.getElementsByClassName("background-failed").length;
        var winrate = Math.round(parseFloat(100*(games.length-1)/(games.length-1+fails)));


        document.getElementById("wins_corporate").innerHTML = games.length -1;
        document.getElementById("points_corporate").innerHTML = avg + "<span style='font-size:15px'>P</span>";
        document.getElementById("losses_corporate").innerHTML = fails;
        document.getElementById("windrate_corporate").innerHTML = winrate + "<span style='font-size:15px'>%</span>";

    var games = google.visualization.arrayToDataTable(games);
    var chart = new google.visualization.Histogram(document.getElementById('histogram_corporate'));
    chart.draw(games, options);
  }
}
