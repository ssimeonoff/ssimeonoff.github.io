/**
 * jQuery Slot Machine by Stefan Petre.
 * http://www.eyecon.ro/slotmachine/
 *
 * Modified.
 */

(function($){

    var slotMachine = function(){

        var credits = 15,
            spinning = 3,
            spin = [0,0,0],
            slotsTypes = {
                'cherry': [2,5,10],
                'orange': [0,15,30],
                'prune': [0,40,50],
                'bell': [0,50,80],
                'bar1': [0,0,100],
                'bar2': [0,0,150],
                'bar3': [0,0,250],
                'seven': [0,0,500],
                'anybar': [0,0,80]
            },
            slots = [
                ['orange','bell','orange','bar2','prune','orange',
                    'bar3','prune','orange','bar1','bell','cherry','orange',
                    'prune','bell','bar1','cherry','seven','orange','prune',
                    'orange','bell','orange'],
                ['cherry','prune','orange','bell','bar1','cherry','prune',
                    'bar3','cherry','bell','orange','bar1','seven','cherry',
                    'bar2','cherry','bell','prune','cherry','orange','cherry',
                    'prune','orange'],
                ['cherry','orange','bell','prune','bar2','cherry','prune',
                    'orange','bar3','cherry','bell','orange','cherry','orange',
                    'cherry','prune','bar1','seven','bell','cherry','cherry',
                    'orange','bell'],
            ],
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
            addCredit = function(incrementCredits){

                var currentCredits = credits;
                    credits += incrementCredits;

                blink($('#slot-credits'));

                $('#slot-credits')
                    .css('credit', 0)
                    .animate({
                        credit: incrementCredits
                    },{
                        duration: 400 + incrementCredits,
                        easing: 'easeOut',
                        step: function (now){

                            $(this).html(parseInt(currentCredits + now, 10));

                        },
                        complete: function(){

                            $(this).html(credits);
                            blink($('#slot-credits'));

                        }
                    });

            },
            spin = function(){

                this.blur();

                if(spinning == false){

                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    spinning = 3;
                    credits --;

                    $('#slot-credits').html(credits);

                    spin[0] = parseInt(Math.random() * 23);
                    spin[1] = parseInt(Math.random() * 23);
                    spin[2] = parseInt(Math.random() * 23);
                    spin[3] = parseInt(Math.random() * 23);
                    spin[4] = parseInt(Math.random() * 23);

                    spin[5] = parseInt(Math.random() * 23);
                    spin[6] = parseInt(Math.random() * 23);
                    spin[7] = parseInt(Math.random() * 23);
                    spin[8] = parseInt(Math.random() * 23);
                    spin[9] = parseInt(Math.random() * 23);



                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 44 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 44 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 44 + 16) + 'px');
                    $('#wheel4 img:first').css('top', - (spin[3] * 44 + 16) + 'px');
                    $('#wheel5 img:first').css('top', - (spin[4] * 44 + 16) + 'px');

                    $('#wheel6 img:first').css('top', - (spin[5] * 44 + 16) + 'px');
                    $('#wheel7 img:first').css('top', - (spin[6] * 44 + 16) + 'px');
                    $('#wheel8 img:first').css('top', - (spin[7] * 44 + 16) + 'px');
                    $('#wheel9 img:first').css('top', - (spin[8] * 44 + 16) + 'px');
                    $('#wheel10 img:first').css('top', - (spin[9] * 44 + 16) + 'px');

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
                        top: - spin[slot - 1] * 44
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

                var slotType = slots[0][spin[0]],
                    matches = 1,
                    barMatch = /bar/.test(slotType) ? 1 : 0,
                    winnedCredits = 0,
                    waitToSpin = 10;

                if(slotType == slots[1][spin[1]]){

                    matches ++;

                    if(slotType == slots[2][spin[2]]){
                        matches ++;
                    } else if(barMatch !=0 && /bar/.test(slots[2][spin[2]])){
                        barMatch ++;
                    }

                } else if(barMatch != 0 && /bar/.test(slots[1][spin[1]])){

                    barMatch ++;

                    if(/bar/.test(slots[2][spin[2]])){
                        barMatch ++;
                    }

                }

                if(matches != 3 && barMatch == 3){
                    slotType = 'anybar';
                    matches = 3;
                }

                var winnedCredits = slotsTypes[slotType][matches-1];

                if(winnedCredits > 0){
                    addCredit(winnedCredits);
                    waitToSpin = 410 + winnedCredits;
                }

                setTimeout(function(){

                    if(credits == 0){
                        endSlot();
                    } else {
                        $('#slot-trigger').removeClass('slot-triggerDisabled');
                        spinning = false;
                    }

                }, waitToSpin);
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

                $('#wheel1 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel2 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel3 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel4 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel5 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');

                $('#wheel6 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel7 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel8 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel9 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel10 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
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
