/**
 * jQuery Slot Machine by Stefan Petre.
 * http://www.eyecon.ro/slotmachine/
 *
 * Modified.
 */
previousSUM = 0;
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

                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    spin_m = [];

                    spin[0] = parseInt(Math.random() * 16);
                    spin_m.push(spin[0]);

                    spin[1] = parseInt(Math.random() * 16);
                    while (spin_m.indexOf(spin[1]) > -1) { spin[1] = parseInt(Math.random() * 16);}
                    spin_m.push(spin[1]);

                    spin[2] = parseInt(Math.random() * 16);
                    while (spin_m.indexOf(spin[2]) > -1) { spin[2] = parseInt(Math.random() * 16);}
                    spin_m.push(spin[2]);

                    spin[3] = parseInt(Math.random() * 16);
                    while (spin_m.indexOf(spin[3]) > -1) { spin[3] = parseInt(Math.random() * 16);}
                    spin_m.push(spin[3]);

                    spin[4] = parseInt(Math.random() * 16);
                    while (spin_m.indexOf(spin[4]) > -1) { spin[4] = parseInt(Math.random() * 16);}
                    spin_m.push(spin[4]);

                    spin_a = [];

                    spin[5] = parseInt(Math.random() * 16);
                    spin_a.push(spin[5]);

                    spin[6] = parseInt(Math.random() * 16);
                    while (spin_a.indexOf(spin[6]) > -1) { spin[6] = parseInt(Math.random() * 16);}
                    spin_a.push(spin[6]);

                    spin[7] = parseInt(Math.random() * 16);
                    while (spin_a.indexOf(spin[7]) > -1) { spin[7] = parseInt(Math.random() * 16);}
                    spin_a.push(spin[7]);

                    spin[8] = parseInt(Math.random() * 16);
                    while (spin_a.indexOf(spin[8]) > -1) { spin[8] = parseInt(Math.random() * 16);}
                    spin_a.push(spin[8]);

                    spin[9] = parseInt(Math.random() * 16);
                    while (spin_a.indexOf(spin[9]) > -1) { spin[9] = parseInt(Math.random() * 16);}
                    spin_a.push(spin[9]);

                    //////// Calculating the conflict SUM /////////////
                    conflictSUM = 0;
                    //TERRAFORMER and GARDENER
                    if (spin_m.indexOf(0) > -1 && spin_m.indexOf(2) > -1 ) {conflictSUM += 2}
                    //TERRAFORMER and LANDLORD
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 1}
                    //TERRAFORMER and THERMALIST
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 1}
                    //TERRAFORMER and DESERT SETTLER
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 1}
                    //TERRAFORMER and ESTATE DEALER
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 1}
                    //TERRAFORMER and BENEFACTOR
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 9}
                    //TERRAFORMER and CULTIVATOR
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 2}
                    //MAYOR and GARDENER
                    if (spin_m.indexOf(1) > -1 && spin_m.indexOf(2) > -1 ) {conflictSUM += 3}
                    //MAYOR and POLAR EXPLORER
                    if (spin_m.indexOf(1) > -1 && spin_m.indexOf(12) > -1 ) {conflictSUM += 4}
                    //MAYOR and LANDLORD
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 6}
                    //MAYOR and DESERT SETTLER
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 4}
                    //MAYOR and ESTATE DEALER
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 4}
                    //MAYOR and CULTIVATOR
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 6}
                    //GARDENER and ECOLOGIST
                    if (spin_m.indexOf(2) > -1 && spin_m.indexOf(7) > -1 ) {conflictSUM += 1}
                    //GARDENER and POLAR EXPLORER
                    if (spin_m.indexOf(2) > -1 && spin_m.indexOf(12) > -1 ) {conflictSUM += 4}
                    //GARDENER and LANDLORD
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 6}
                    //GARDENER and DESERT SETTLER
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 4}
                    //GARDENER and ESTATE DEALER
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 5}
                    //GARDENER and BENEFACTOR
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 2}
                    //GARDENER and CULTIVATOR
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 9}
                    //BUILDER and TYCOON
                    if (spin_m.indexOf(3) > -1 && spin_m.indexOf(8) > -1 ) {conflictSUM += 4}
                    //BUILDER and MINER
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1}
                    //BUILDER and INDUSTRIALIST
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 1}
                    //BUILDER and MAGNATE
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 5}
                    //BUILDER and CONTRACTOR
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(14) > -1 ) {conflictSUM += 9}
                    //PLANNER and SCIENTIST
                    if (spin_m.indexOf(4) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 1}
                    //GENERALIST and MINER
                    if (spin_m.indexOf(5) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1}
                    //SPECIALIST and ENERGIZER
                    if (spin_m.indexOf(6) > -1 && spin_m.indexOf(13) > -1 ) {conflictSUM += 4}
                    //SPECIALIST and BANKER
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(2) > -1 ) {conflictSUM += 2}
                    //SPECIALIST and THERMALIST
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 1}
                    //SPECIALIST and MINER
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1}
                    //SPECIALIST and INDUSTRIALIST
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 1}
                    //ECOLOGIST and TYCOON
                    if (spin_m.indexOf(7) > -1 && spin_m.indexOf(8) > -1 ) {conflictSUM += 2}
                    //ECOLOGIST and DIVERSIFIER
                    if (spin_m.indexOf(7) > -1 && spin_m.indexOf(10) > -1 ) {conflictSUM += 2}
                    //ECOLOGIST and CULTIVATOR
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 1}
                    //ECOLOGIST and MAGNATE
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1}
                    //ECOLOGIST and EXCENTRIC
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 4}
                    //TYCOON and DIVERSIFIER
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(10) > -1 ) {conflictSUM += 1}
                    //TYCOON and TACTICIAN
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(11) > -1 ) {conflictSUM += 1}
                    //TYCOON and RIM SETTLER
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(14) > -1 ) {conflictSUM += 1}
                    //TYCOON and SCIENTIST
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 2}
                    //TYCOON and MAGNATE
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 5}
                    //TYCOON and SPACE BARON
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 1}
                    //TYCOON and EXCENTRIC
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 3}
                    //TYCOON and CONTRACTOR
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(14) > -1 ) {conflictSUM += 2}
                    //TYCOON and VENUPHILE
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 2}
                    //DIVERSIFIER and MAGNATE
                    if (spin_m.indexOf(10) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1}
                    //TACTICIAN and SCIENTIST
                    if (spin_m.indexOf(11) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 1}
                    //TACTICIAN and MAGNATE
                    if (spin_m.indexOf(11) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1}
                    //POLAR EXPLORER and LANDLORD
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 4}
                    //POLAR EXPLORER and DESERT SETTLER
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 5}
                    //POLAR EXPLORER and ESTATE DEALER
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 2}
                    //POLAR EXPLORER and CULTIVATOR
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 3}
                    //ENERGIZER and THERMALIST
                    if (spin_m.indexOf(13) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 3}
                    //ENERGIZER and INDUSTRIALIST
                    if (spin_m.indexOf(13) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 6}
                    //RIM SETTLER and CELEBRITY
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(5) > -1 ) {conflictSUM += 2}
                    //RIM SETTLER and MAGNATE
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1}
                    //RIM SETTLER and SPACE BARON
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 3}
                    //HOVERLORD and EXCENTRIC
                    if (spin_m.indexOf(15) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 5}
                    //HOVERLORD and VENUPHILE
                    if (spin_m.indexOf(15) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 5}
                    //LANDLORD and DESERT SETTLER
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 7}
                    //LANDLORD and ESTATE DEALER
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 7}
                    //LANDLORD and CULTIVATOR
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 8}
                    //SCIENTIST and MAGNATE
                    if (spin_a.indexOf(1) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 2}
                    //THERMALIST and BENEFACTOR
                    if (spin_a.indexOf(3) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1}
                    //MINER and INDUSTRIALIST
                    if (spin_a.indexOf(4) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 7}
                    //CELEBRITY and MAGNATE
                    if (spin_a.indexOf(5) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1}
                    //CELEBRITY and SPACE BARON
                    if (spin_a.indexOf(5) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 3}
                    //DESERT SETTLER and ESTATE DEALER
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 5}
                    //DESERT SETTLER and BENEFACTOR
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1}
                    //DESERT SETTLER and CULTIVATOR
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 7}
                    //ESTATE DEALER and BENEFACTOR
                    if (spin_a.indexOf(8) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1}
                    //ESTATE DEALER and CULTIVATOR
                    if (spin_a.indexOf(8) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 8}
                    //BENEFACTOR and CULTIVATOR
                    if (spin_a.indexOf(9) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 3}
                    //MAGNATE and SPACE BARON
                    if (spin_a.indexOf(11) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 2}
                    //EXCENTRIC and VENUPHILE
                    if (spin_a.indexOf(13) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 2}

                    //display the conflict SUM
                    setTimeout(function(){
                        gauge(previousSUM, conflictSUM);
                        previousSUM = conflictSUM;
                    }, 2500);


                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 100 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 100 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 100 + 16) + 'px');
                    $('#wheel4 img:first').css('top', - (spin[3] * 100 + 16) + 'px');
                    $('#wheel5 img:first').css('top', - (spin[4] * 100 + 16) + 'px');

                    $('#wheel6 img:first').css('top', - (spin[5] * 100 + 16) + 'px');
                    $('#wheel7 img:first').css('top', - (spin[6] * 100 + 16) + 'px');
                    $('#wheel8 img:first').css('top', - (spin[7] * 100 + 16) + 'px');
                    $('#wheel9 img:first').css('top', - (spin[8] * 100 + 16) + 'px');
                    $('#wheel10 img:first').css('top', - (spin[9] * 100 + 16) + 'px');

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
                        stopSpin(6);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(7);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(8);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(9);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(10);
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
          ['SUM', previousSUM]
        ]);

        var options = {
          width: 600, height: 180,
          redFrom: 40, redTo: 50, min: 0, max: 50,
          yellowFrom:25, yellowTo: 40,
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
