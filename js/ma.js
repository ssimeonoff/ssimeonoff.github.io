/**
 * jQuery Slot Machine by Stefan Petre.
 * http://www.eyecon.ro/slotmachine/
 *
 * Modified.
 */

 NAMES = ["TERRAFORMER", "MAYOR", "GARDENER", "BUILDER", "PLANNER",
         "GENERALIST", "SPECIALIST", "ECOLOGIST", "TYCOON", "LEGEND",
         "DIVERSIFIER", "TACTICIAN", "POLAR EXPLORER", "ENERGIZER", "RIM SETTLER",
         "HOVERLORD",
         "LANDLORD", "SCIENTIST", "BANKER", "THERMALIST", "MINER",
         "CELEBRITY", "INDUSTRIALIST", "DESERT SETTLER", "ESTATE DEALER", "BENEFACTOR",
         "CULTIVATOR", "MAGNATE", "SPACE BARON", "EXCENTRIC", "CONTRACTOR",
         "VENUPHILE"]

 SYNERGIES = [
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,  1,0,0,1,0,0,0,1,1,9,2,0,0,0,0,0],
   [0,0,3,0,0,0,0,0,0,0,0,0,4,0,0,0,  6,0,0,0,0,0,0,4,4,0,6,0,0,0,0,0],
   [0,0,0,0,0,0,0,1,0,0,0,0,4,0,0,0,  6,0,0,0,0,0,0,4,5,2,9,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,  0,0,0,0,1,0,1,0,0,0,0,5,0,0,9,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,  0,0,2,1,1,0,1,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,1,1,0,4,0,0],
   [0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,  0,2,0,0,0,0,0,0,0,0,0,5,1,3,2,2],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  4,0,0,0,0,0,0,5,2,0,3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,3,0,0,6,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,2,0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,5],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,7,7,0,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,5,1,7,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,1,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 ];

previousSUM = 0;
limit = 60;
gauge(0,0);
(function($){

    var slotMachine = function(){

            startSlot = function(){

                spinning = false;

                $('#slot-trigger').removeClass('slot-triggerDisabled');

                this.blur();

                return false;

            },
            endSlot = function(){

                $('#slot-block').show();
            },
            spin = function(){

                this.blur();

                if(spinning == false){

                    setTimeout(function(){
                      document.getElementById("note").style.transform = "scaleY(0)"
                    },1000)


                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    conflictSUM = 0;
                    spinsArray = [];
                    combinationsText = "";
                    sumsText = "";
                    //generate the spins
                    spinsArray = generateSpins();

                    //display the conflict SUM
                    setTimeout(function(){
                        gauge(previousSUM, conflictSUM);
                        previousSUM = conflictSUM;
                    }, 2500);

                    //trigger the red lamp
                    setTimeout(function(){
                      if (conflictSUM > 45 ) {document.getElementById("lamp-body").classList.add("red-light");}
                      else if (conflictSUM > 29 && conflictSUM < 45) {document.getElementById("lamp-body").classList.add("orange-light");}
                      else {document.getElementById("lamp-body").classList.remove("red-light", "orange-light");}

                      document.getElementById("total-sum").innerHTML = conflictSUM;
                      document.getElementById("combinations").innerHTML = combinationsText;
                      document.getElementById("sums").innerHTML = sumsText;
                      document.getElementById("note").style.transform = "scaleY(1)";

                    },3500);



                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 100 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 100 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 100 + 16) + 'px');
                    $('#wheel4 img:first').css('top', - (spin[3] * 100 + 16) + 'px');
                    $('#wheel5 img:first').css('top', - (spin[4] * 100 + 16) + 'px');

                    $('#wheel6 img:first').css('top', - (spin[5] * 100 + 16) + 1600 + 'px');
                    $('#wheel7 img:first').css('top', - (spin[6] * 100 + 16) + 1600 + 'px');
                    $('#wheel8 img:first').css('top', - (spin[7] * 100 + 16) + 1600 + 'px');
                    $('#wheel9 img:first').css('top', - (spin[8] * 100 + 16) + 1600 + 'px');
                    $('#wheel10 img:first').css('top', - (spin[9] * 100 + 16) + 1600 + 'px');

                    setTimeout(function(){
                        $('#slot-machine .arm').animate({ top: '-25px', height: '50%', overflow: 'visible' });
                        $('#slot-machine .arm .knob').animate({ top: '-15px', height: '16px' });
                        $('#slot-machine .arm-shadow').animate({ top: '13px' });
                        $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '0', opacity: 0 });
                    }, 500);

                    setTimeout(function(){
                        stopSpin(1);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(2);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(3);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(4);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(5);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(6);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(7);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(8);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(9);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(10);
                    }, 1500 + parseInt(1500 * Math.random()));

                }

                return false;

            },
            stopSpin = function(slot){

                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },
            stopSpin2 = function(slot){

                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100 + 1600
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },
            endSpin = function(){

                setTimeout(function(){

                        $('#slot-trigger').removeClass('slot-triggerDisabled');
                        spinning = false;

                }, 10);
            };
        return {

            init: function(){

                startSlot();

                $('#slot-trigger')
                    .bind('mousedown', function(){
                        $(this).addClass('slot-triggerDown');
                    })
                    .bind('click', spin);

                $(document).bind('mouseup', function(){
                    $('#slot-trigger').removeClass('slot-triggerDown');
                });

                $('#wheel1 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel2 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel3 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel4 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel5 img:first').css('top', - (16 * 100) + 'px');

                $('#wheel6 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel7 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel8 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel9 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel10 img:first').css('top', - (16 * 100) + 'px');
            }

        };
    }();

    $.extend($.easing,{
        bounceOut: function (x, t, b, c, d){
            if((t/=d) < (1/2.75)){
                return c*(7.5625*t*t) + b;
            } else if(t < (2/2.75)){
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if(t < (2.5/2.75)){
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeOut: function (x, t, b, c, d){
            return -c *(t/=d)*(t-2) + b;
        },
        elasticOut: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }
    });

    $(document).ready(slotMachine.init);

})(jQuery);

function gauge (previousSUM, conflictSUM) {
  google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['SYNERGY', previousSUM]
        ]);

        var options = {
          width: 600, height: 180,
          redFrom: 45, redTo: 60, min: 0, max: 60,
          yellowFrom:30, yellowTo: 45,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, conflictSUM);
          chart.draw(data, options);
        }, 1000);
      }
}

function generateSpins() {

  while(conflictSUM == 0 || conflictSUM > limit) {
    conflictSUM = 0;
    spinsArray = [];
    combinationsText = "";
    sumsText = "";
    //////// Calculating the conflict SUM /////////////

    spin[0] = parseInt(Math.random() * 16);
    spinsArray.push(spin[0]);

    spin[1] = parseInt(Math.random() * 16);
    while (spinsArray.indexOf(spin[1]) > -1) { spin[1] = parseInt(Math.random() * 16);}
    spinsArray.push(spin[1]);

    spin[2] = parseInt(Math.random() * 16);
    while (spinsArray.indexOf(spin[2]) > -1) { spin[2] = parseInt(Math.random() * 16);}
    spinsArray.push(spin[2]);

    spin[3] = parseInt(Math.random() * 16);
    while (spinsArray.indexOf(spin[3]) > -1) { spin[3] = parseInt(Math.random() * 16);}
    spinsArray.push(spin[3]);

    spin[4] = parseInt(Math.random() * 16);
    while (spinsArray.indexOf(spin[4]) > -1) { spin[4] = parseInt(Math.random() * 16);}
    spinsArray.push(spin[4]);

    //adding offset of 16 for the awards
    spin[5] = parseInt(Math.random() * 16) + 16;
    spinsArray.push(spin[5]);

    spin[6] = parseInt(Math.random() * 16) + 16;
    while (spinsArray.indexOf(spin[6]) > -1) { spin[6] = parseInt(Math.random() * 16) + 16;}
    spinsArray.push(spin[6]);

    spin[7] = parseInt(Math.random() * 16) + 16;
    while (spinsArray.indexOf(spin[7]) > -1) { spin[7] = parseInt(Math.random() * 16) + 16;}
    spinsArray.push(spin[7]);

    spin[8] = parseInt(Math.random() * 16) + 16;
    while (spinsArray.indexOf(spin[8]) > -1) { spin[8] = parseInt(Math.random() * 16) + 16;}
    spinsArray.push(spin[8]);

    spin[9] = parseInt(Math.random() * 16) + 16;
    while (spinsArray.indexOf(spin[9]) > -1) { spin[9] = parseInt(Math.random() * 16) + 16;}
    spinsArray.push(spin[9]);

    //loop through the matrix interconnections
    for (i=0; i<9; i++) {
      for (j=i+1; j<10; j++) {
        if (SYNERGIES[spinsArray[i]][spinsArray[j]] > 0) {
          conflictSUM += SYNERGIES[spinsArray[i]][spinsArray[j]];
          sumsText += SYNERGIES[spinsArray[i]][spinsArray[j]] + "<br>";
          combinationsText += NAMES[i] + " & " + NAMES[j] + "<br>"; }
      }
    }
    console.log(conflictSUM)
  }

  return spinsArray.sort(function(a, b){return a - b});
}

function changeLimit (x) {
  if (x < 0 && limit > 20) {
    limit -=5;
    document.getElementById("limit-image").style.marginLeft = 200 + (-10 * limit) + "px";
  }
  if (x > 0 && limit < 60) {
    limit +=5;
    document.getElementById("limit-image").style.marginLeft = 200 + (-10 * limit) + "px";
  }
}
