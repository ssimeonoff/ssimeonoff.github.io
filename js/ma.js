/**
 * jQuery Slot Machine by Stefan Petre.
 * http://www.eyecon.ro/slotmachine/
 *
 * Modified.
 */

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
                $('#slot-credits').text('VERLOREN!!!');

                setInterval(blink($('#slot-credits')), 1000);

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

function blink(element){

    element.animate({ opacity: 0 }, 200, 'linear', function(){
        $(this).animate({ opacity: 1 }, 200);
    });

}
