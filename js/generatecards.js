arr = document.querySelectorAll('li.automated, li.events, li.active');
var cardString = "[";
for (i=0; i < arr.length; i++) {

  const cardName = arr[i].querySelector(".title").innerHTML;
  const cardNumber = arr[i].querySelector(".number").innerHTML;
  const cardPrice = arr[i].querySelector(".price").innerHTML;
  const cardTitle = arr[i].querySelector(".title").innerHTML;
  const cardContent = arr[i].querySelector(".content").innerHTML;
  if (arr[i].classList.contains("automated")) {cardType = "type-automated"}
  if (arr[i].classList.contains("active")) {cardType = "type-active"}
  if (arr[i].classList.contains("events")) {cardType = "type-event"}
  cardTags = [];
  if (arr[i].classList.contains("buildingTag")) {cardTags.push('"tag-building"')}
  if (arr[i].classList.contains("spaceTag")) {cardTags.push('"tag-space"')}
  if (arr[i].classList.contains("scienceTag")) {cardTags.push('"tag-science"')}
  if (arr[i].classList.contains("plantTag")) {cardTags.push('"tag-plant"')}
  if (arr[i].classList.contains("microbeTag")) {cardTags.push('"tag-microbe"')}
  if (arr[i].classList.contains("animalTag")) {cardTags.push('"tag-animal"')}
  if (arr[i].classList.contains("powerTag")) {cardTags.push('"tag-power"')}
  if (arr[i].classList.contains("jovianTag")) {cardTags.push('"tag-jovian"')}
  if (arr[i].classList.contains("earthTag")) {cardTags.push('"tag-earth"')}
  if (arr[i].classList.contains("cityTag")) {cardTags.push('"tag-city"')}
  if (arr[i].classList.contains("eventTag")) {cardTags.push('"tag-event"')}
  if (arr[i].classList.contains("venusTag")) {cardTags.push('"tag-venus"')}
  if (arr[i].classList.contains("wildTag")) {cardTags.push('"tag-wild"')}


  cardString = cardString + '{'
  cardString = cardString + 'key: "' + cardNumber + '", ';
  cardString = cardString + 'active : false, ';
  cardString = cardString + 'price: "' + cardPrice + '", ';
  cardString = cardString + 'title: "' + cardTitle + '", ';
  cardString = cardString + 'tags: [' + cardTags + '], ';
  cardString = cardString + 'type: "' + cardType + '", ';
  cardString = cardString + 'content:`<div class="content ">' + cardContent + '</div>`, ';
  cardString = cardString + '},'
}
cardString = cardString + "]"


function download(data, filename, json) {

    var file = new Blob([cardString], {type: "text/plain;charset=utf-8"});

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "cards";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
