function setupListeners() {
  // let deck=Array();
  // let nbcard=52;
  // let j=0;
  // let scoreplayer=0;
  // let scoredealer=0;
  cardlist();
  scoredealer=deal(scoredealer,"Dealer's","dealerarea");
  var carddeal = document.getElementById("cardbutton");
  carddeal.addEventListener("click",player);
  var staybutton = document.getElementById("staybutton");
  staybutton.addEventListener("click",dealer);
  var startagainbutton = document.getElementById("startagainbutton");
  startagainbutton.addEventListener("click",function(){location.reload()});
}
var cardlist=function() {
  for (let i=1; i<=nbcard; i++){
    let name_image="./Images/"+i+".BMP";
    if (i%13<=10 && i%13!=0) {
      j=i%13;
    }
    else if (i%13>10 || i%13==0) {
      j=10;
    }
    deck.push([name_image,j]);
  }
}
var dealer=function(){
  if (endgame==0){
    for (let i=0; i<6; i++){
      if (scoredealer<scoreplayer && scoredealer<=42) {
        scoredealer = deal(scoredealer, "Dealer's","dealerarea");
      }
      endgame=1;
    }
  }
  else {
    window.alert("La banque a déjà joué !");
  }
  resultats();
}
var resultats=function(){
  if ((scoreplayer<=42 && scoredealer<scoreplayer) || (scoreplayer<=42 && scoredealer>42)){
    window.alert("Le joueur a un score de " + scoreplayer + "La banque a un score de "+scoredealer+" Le joueur a gagné !");
  }
  else {
    window.alert("Le joueur a un score de " + scoreplayer + "La banque a un score de "+scoredealer+" Le joueur a perdu !");
  }
}
var player=function(){
  if (scoreplayer<=42){
    scoreplayer = deal(scoreplayer,"Your","yourarea");
  }
  if (scoreplayer>42){
    window.alert("GAME OVER !");
  }
}

function createImg(path) {
  var img = document.createElement('img');
  img.src = path;
  return img;
}
function addImgInDiv(path,area) {
  var newImg = createImg(path);
  var divJS = document.getElementById(area);
  divJS.appendChild(newImg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var deal=function(score,challenger,area){
  let random_index=getRandomInt(nbcard);
  addImgInDiv(deck[random_index][0],area);
  score+=deck[random_index][1];
  deck.splice(random_index,1);
  nbcard--;
  document.getElementById(challenger).innerHTML = challenger+" score : "+ score;
  return score;
  // console.log(random_index);
  // console.log(deck);
}

let endgame=0;
let deck=Array();
let nbcard=52;
let j=0;
let scoreplayer=0;
let scoredealer=0;
setupListeners();
