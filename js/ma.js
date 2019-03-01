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

                    setTimeout(function(){
                      document.getElementById("note").style.display = "none"
                    },1500)


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
                    combinationsText = "";
                    sumsText = "";
                    //TERRAFORMER and GARDENER
                    if (spin_m.indexOf(0) > -1 && spin_m.indexOf(2) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "TERRAFORMER and GARDENER<br>"; }
                    //TERRAFORMER and LANDLORD
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TERRAFORMER and LANDLORD<br>"; }
                    //TERRAFORMER and THERMALIST
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TERRAFORMER and THERMALIST<br>"; }
                    //TERRAFORMER and DESERT SETTLER
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TERRAFORMER and DESERT SETTLER<br>"; }
                    //TERRAFORMER and ESTATE DEALER
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TERRAFORMER and ESTATE DEALER<br>"; }
                    //TERRAFORMER and BENEFACTOR
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 9; sumsText += "9<br>"; combinationsText += "TERRAFORMER and BENEFACTOR<br>"; }
                    //TERRAFORMER and CULTIVATOR
                    if (spin_m.indexOf(0) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "TERRAFORMER and CULTIVATOR<br>"; }
                    //MAYOR and GARDENER
                    if (spin_m.indexOf(1) > -1 && spin_m.indexOf(2) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "MAYOR and GARDENER<br>"; }
                    //MAYOR and POLAR EXPLORER
                    if (spin_m.indexOf(1) > -1 && spin_m.indexOf(12) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "MAYOR and POLAR EXPLORER<br>"; }
                    //MAYOR and LANDLORD
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 6; sumsText += "6<br>"; combinationsText += "MAYOR and LANDLORD<br>"; }
                    //MAYOR and DESERT SETTLER
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "MAYOR and DESERT SETTLER<br>"; }
                    //MAYOR and ESTATE DEALER
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "MAYOR and ESTATE DEALER<br>"; }
                    //MAYOR and CULTIVATOR
                    if (spin_m.indexOf(1) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 6; sumsText += "6<br>"; combinationsText += "MAYOR and CULTIVATOR<br>"; }
                    //GARDENER and ECOLOGIST
                    if (spin_m.indexOf(2) > -1 && spin_m.indexOf(7) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "GARDENER and ECOLOGIST<br>"; }
                    //GARDENER and POLAR EXPLORER
                    if (spin_m.indexOf(2) > -1 && spin_m.indexOf(12) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "GARDENER and POLAR EXPLORER<br>"; }
                    //GARDENER and LANDLORD
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 6; sumsText += "6<br>"; combinationsText += "GARDENER and LANDLORD<br>"; }
                    //GARDENER and DESERT SETTLER
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "GARDENER and DESERT SETTLER<br>"; }
                    //GARDENER and ESTATE DEALER
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "GARDENER and ESTATE DEALER<br>"; }
                    //GARDENER and BENEFACTOR
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "GARDENER and BENEFACTOR<br>"; }
                    //GARDENER and CULTIVATOR
                    if (spin_m.indexOf(2) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 9; sumsText += "9<br>"; combinationsText += "GARDENER and CULTIVATOR<br>"; }
                    //BUILDER and TYCOON
                    if (spin_m.indexOf(3) > -1 && spin_m.indexOf(8) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "BUILDER and TYCOON<br>"; }
                    //BUILDER and MINER
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "BUILDER and MINER<br>"; }
                    //BUILDER and INDUSTRIALIST
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "BUILDER and INDUSTRIALIST<br>"; }
                    //BUILDER and MAGNATE
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "BUILDER and MAGNATE<br>"; }
                    //BUILDER and CONTRACTOR
                    if (spin_m.indexOf(3) > -1 && spin_a.indexOf(14) > -1 ) {conflictSUM += 9; sumsText += "9<br>"; combinationsText += "BUILDER and CONTRACTOR<br>"; }
                    //PLANNER and SCIENTIST
                    if (spin_m.indexOf(4) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "PLANNER and SCIENTIST<br>"; }
                    //GENERALIST and MINER
                    if (spin_m.indexOf(5) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "GENERALIST and MINER<br>"; }
                    //SPECIALIST and ENERGIZER
                    if (spin_m.indexOf(6) > -1 && spin_m.indexOf(13) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "SPECIALIST and ENERGIZER<br>"; }
                    //SPECIALIST and BANKER
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(2) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "SPECIALIST and BANKER<br>"; }
                    //SPECIALIST and THERMALIST
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "SPECIALIST and THERMALIST<br>"; }
                    //SPECIALIST and MINER
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(4) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "SPECIALIST and MINER<br>"; }
                    //SPECIALIST and INDUSTRIALIST
                    if (spin_m.indexOf(6) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "SPECIALIST and INDUSTRIALIST<br>"; }
                    //ECOLOGIST and TYCOON
                    if (spin_m.indexOf(7) > -1 && spin_m.indexOf(8) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "ECOLOGIST and TYCOON<br>"; }
                    //ECOLOGIST and DIVERSIFIER
                    if (spin_m.indexOf(7) > -1 && spin_m.indexOf(10) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "ECOLOGIST and DIVERSIFIER<br>"; }
                    //ECOLOGIST and CULTIVATOR
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "ECOLOGIST and CULTIVATOR<br>"; }
                    //ECOLOGIST and MAGNATE
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "ECOLOGIST and MAGNATE<br>"; }
                    //ECOLOGIST and EXCENTRIC
                    if (spin_m.indexOf(7) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "ECOLOGIST and EXCENTRIC<br>"; }
                    //TYCOON and DIVERSIFIER
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(10) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TYCOON and DIVERSIFIER<br>"; }
                    //TYCOON and TACTICIAN
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TYCOON and TACTICIAN<br>"; }
                    //TYCOON and RIM SETTLER
                    if (spin_m.indexOf(8) > -1 && spin_m.indexOf(14) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TYCOON and RIM SETTLER<br>"; }
                    //TYCOON and SCIENTIST
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "TYCOON and SCIENTIST<br>"; }
                    //TYCOON and MAGNATE
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "TYCOON and MAGNATE<br>"; }
                    //TYCOON and SPACE BARON
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TYCOON and SPACE BARON<br>"; }
                    //TYCOON and EXCENTRIC
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "TYCOON and EXCENTRIC<br>"; }
                    //TYCOON and CONTRACTOR
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(14) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "TYCOON and CONTRACTOR<br>"; }
                    //TYCOON and VENUPHILE
                    if (spin_m.indexOf(8) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "TYCOON and VENUPHILE<br>"; }
                    //DIVERSIFIER and MAGNATE
                    if (spin_m.indexOf(10) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "DIVERSIFIER and MAGNATE<br>"; }
                    //TACTICIAN and SCIENTIST
                    if (spin_m.indexOf(11) > -1 && spin_a.indexOf(1) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TACTICIAN and SCIENTIST<br>"; }
                    //TACTICIAN and MAGNATE
                    if (spin_m.indexOf(11) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "TACTICIAN and MAGNATE<br>"; }
                    //POLAR EXPLORER and LANDLORD
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(0) > -1 ) {conflictSUM += 4; sumsText += "4<br>"; combinationsText += "POLAR EXPLORER and LANDLORD<br>"; }
                    //POLAR EXPLORER and DESERT SETTLER
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "POLAR EXPLORER and DESERT SETTLER<br>"; }
                    //POLAR EXPLORER and ESTATE DEALER
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "POLAR EXPLORER and ESTATE DEALER<br>"; }
                    //POLAR EXPLORER and CULTIVATOR
                    if (spin_m.indexOf(12) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "POLAR EXPLORER and CULTIVATOR<br>"; }
                    //ENERGIZER and THERMALIST
                    if (spin_m.indexOf(13) > -1 && spin_a.indexOf(3) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "ENERGIZER and THERMALIST<br>"; }
                    //ENERGIZER and INDUSTRIALIST
                    if (spin_m.indexOf(13) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 6; sumsText += "6<br>"; combinationsText += "ENERGIZER and INDUSTRIALIST<br>"; }
                    //RIM SETTLER and CELEBRITY
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(5) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "RIM SETTLER and CELEBRITY<br>"; }
                    //RIM SETTLER and MAGNATE
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "RIM SETTLER and MAGNATE<br>"; }
                    //RIM SETTLER and SPACE BARON
                    if (spin_m.indexOf(14) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "RIM SETTLER and SPACE BARON<br>"; }
                    //HOVERLORD and EXCENTRIC
                    if (spin_m.indexOf(15) > -1 && spin_a.indexOf(13) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "HOVERLORD and EXCENTRIC<br>"; }
                    //HOVERLORD and VENUPHILE
                    if (spin_m.indexOf(15) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "HOVERLORD and VENUPHILE<br>"; }
                    //LANDLORD and DESERT SETTLER
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(7) > -1 ) {conflictSUM += 7; sumsText += "7<br>"; combinationsText += "LANDLORD and DESERT SETTLER<br>"; }
                    //LANDLORD and ESTATE DEALER
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 7; sumsText += "7<br>"; combinationsText += "LANDLORD and ESTATE DEALER<br>"; }
                    //LANDLORD and CULTIVATOR
                    if (spin_a.indexOf(0) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 8; sumsText += "8<br>"; combinationsText += "LANDLORD and CULTIVATOR<br>"; }
                    //SCIENTIST and MAGNATE
                    if (spin_a.indexOf(1) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "SCIENTIST and MAGNATE<br>"; }
                    //THERMALIST and BENEFACTOR
                    if (spin_a.indexOf(3) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "THERMALIST and BENEFACTOR<br>"; }
                    //MINER and INDUSTRIALIST
                    if (spin_a.indexOf(4) > -1 && spin_a.indexOf(6) > -1 ) {conflictSUM += 7; sumsText += "7<br>"; combinationsText += "MINER and INDUSTRIALIST<br>"; }
                    //CELEBRITY and MAGNATE
                    if (spin_a.indexOf(5) > -1 && spin_a.indexOf(11) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "CELEBRITY and MAGNATE<br>"; }
                    //CELEBRITY and SPACE BARON
                    if (spin_a.indexOf(5) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "CELEBRITY and SPACE BARON<br>"; }
                    //DESERT SETTLER and ESTATE DEALER
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(8) > -1 ) {conflictSUM += 5; sumsText += "5<br>"; combinationsText += "DESERT SETTLER and ESTATE DEALER<br>"; }
                    //DESERT SETTLER and BENEFACTOR
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "DESERT SETTLER and BENEFACTOR<br>"; }
                    //DESERT SETTLER and CULTIVATOR
                    if (spin_a.indexOf(7) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 7; sumsText += "7<br>"; combinationsText += "DESERT SETTLER and CULTIVATOR<br>"; }
                    //ESTATE DEALER and BENEFACTOR
                    if (spin_a.indexOf(8) > -1 && spin_a.indexOf(9) > -1 ) {conflictSUM += 1; sumsText += "1<br>"; combinationsText += "ESTATE DEALER and BENEFACTOR<br>"; }
                    //ESTATE DEALER and CULTIVATOR
                    if (spin_a.indexOf(8) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 8; sumsText += "8<br>"; combinationsText += "ESTATE DEALER and CULTIVATOR<br>"; }
                    //BENEFACTOR and CULTIVATOR
                    if (spin_a.indexOf(9) > -1 && spin_a.indexOf(10) > -1 ) {conflictSUM += 3; sumsText += "3<br>"; combinationsText += "BENEFACTOR and CULTIVATOR<br>"; }
                    //MAGNATE and SPACE BARON
                    if (spin_a.indexOf(11) > -1 && spin_a.indexOf(12) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "MAGNATE and SPACE BARON<br>"; }
                    //EXCENTRIC and VENUPHILE
                    if (spin_a.indexOf(13) > -1 && spin_a.indexOf(15) > -1 ) {conflictSUM += 2; sumsText += "2<br>"; combinationsText += "EXCENTRIC and VENUPHILE<br>"; }

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

                      document.getElementById("note").style.display = "block";

                    },3500)



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
