
titles = "";
x = document.querySelectorAll('li.filterDiv');

generateArray();
displayCards();

function generateArray(length, max) {
  var arr = [];
  while(arr.length < length){
      var randomnumber = Math.floor(Math.random()*max) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr
}


function displayCards() {
  cards = generateArray(10, 261);
  corporations = generateArray(2, 30);
  preludes = generateArray(4, 35);

  //showing only the pointed cards
  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".number") != null) {
      if (cards.includes(x[i].querySelector(".number").textContent) || preludes.includes(x[i].querySelector(".number").textContent) ) {
        x[i].style.display = "block";
        titles = titles + x[i].querySelector(".title").textContent + "<br>";
      }
    }
  }
  document.getElementById("titles").innerHTML = titles;
}
