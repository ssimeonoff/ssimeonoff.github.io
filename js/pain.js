PAIN_VALUE = ["0 - No Pain", "1 - Minimal", "2 - Mild", "3 - Uncomfotable", "4 - Moderate", "5 - Distracting",
              "6 - Distressing", "7 - Unmanageable", "8 - Intense", "9 - Severe", "10 - Unable to Move"];

PAIN_DESCRIPTION = ['"I have no pain."',
                    '"My pain is hardly noticeable"',
                    '"I have a low level of pain. I am aware of my pain only when I pay attention to it."',
                    '"My pain bothers me but I can ignore it most of the time."',
                    '"I am constantly aware of my pain but I can continue most activities."',
                    '"I think about my pain most of the time. I cannot do some of the activities I need to do each day because of the pain."',
                    '"I think about my pain all the time. I give up many activities because of my pain."',
                    '"I am in pain all the time. It keeps me from doing most activities."',
                    '"My pain is so severe that it is hard to think of anything else. Moving is difficult."',
                    '"My pain is all that I can think about. I can barely move because of the pain."',
                    '"I am in bed and cannot move due to my pain."'
                  ]


function painDescription() {
  document.getElementById("text").innerHTML = PAIN_VALUE[document.getElementById("pain-input").value];
  document.getElementById("text-description").innerHTML = PAIN_DESCRIPTION[document.getElementById("pain-input").value];

}
