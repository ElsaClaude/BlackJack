function setupListeners() {
  // let deck=Array();
  // let nbcard=52;
  // let j=0;
  // let scoreplayer=0;
  // let scoredealer=0;
  cardlist();
  let tmp3=[];
  tmp3=deal(scoredealer,"Dealer's","dealerarea",as_dealer);
  scoredealer=tmp3[0];
  as_dealer=tmp3[1];
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
    if (i%13<=10 && i%13!=0 && i%13!=1) {
      j=i%13;
    }
    else if (i%13>10 || i%13==0) {
      j=10;
    }
    else if (i%13==1) {
      j=11;
    }
    deck.push([name_image,j]);
  }
}
var dealer=function(){
  let tmp2=[];
  flag_end=1;
  if (endgame==0){
    for (let i=0; i<6; i++){
      if (scoredealer<scoreplayer && scoredealer<=42) {
        tmp2 = deal(scoredealer, "Dealer's","dealerarea",as_dealer);
        scoredealer=tmp2[0];
        as_dealer=tmp2[1];
        if (scoredealer>42 && as_dealer>0) {
          scoredealer-=10;
          as_dealer-=1;
          // console.log(tmp2);
          tmp2 = deal(scoredealer, "Dealer's","dealerarea",as_dealer);
          // console.log(tmp2);
          scoredealer=tmp2[0];
          as_dealer=tmp2[1];
          document.getElementById("Dealer's").innerHTML = "Dealer's score : "+ scoredealer;
        }
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
    window.alert("Le joueur a un score de " + scoreplayer + "\nLa banque a un score de "+scoredealer+"\nLe joueur a gagné !");
  }
  else {
    window.alert("Le joueur a un score de " + scoreplayer + "\nLa banque a un score de "+scoredealer+"\nLe joueur a perdu !");
  }
}
var player=function(){
  let tmp=[];
  if (flag_end==0){
    if (scoreplayer<=42){
      tmp = deal(scoreplayer,"Your","yourarea",as_player);
      scoreplayer=tmp[0];
      as_player=tmp[1];
      if (scoreplayer>42 && as_player>0){
        scoreplayer-=10;
        as_player-=1;
        document.getElementById("Your").innerHTML = "Your score : "+ scoreplayer;
      }
    }
    if (scoreplayer>42){
      window.alert("GAME OVER !");
    }
  }
  else {
    window.alert ("La partie est déjà terminée !");
    resultats();
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

var deal=function(score,challenger,area,count_as){
  let random_index=getRandomInt(nbcard);
  addImgInDiv(deck[random_index][0],area);
  if (deck[random_index][1]==11){
    count_as++;
  }
  score+=deck[random_index][1];
  deck.splice(random_index,1);
  nbcard--;
  document.getElementById(challenger).innerHTML = challenger+" score : "+ score;
  return [score,count_as];
  // console.log(random_index);
  // console.log(deck);
}

let as_player=0;
let as_dealer=0;
let flag_end=0;
let endgame=0;
let deck=Array();
let nbcard=52;
let j=0;
let scoreplayer=0;
let scoredealer=0;
setupListeners();
