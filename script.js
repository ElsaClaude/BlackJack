function setupListeners() {
  cardlist();
  let tmp3=[];
  tmp3=deal(ScoreEnnemie,"Ennemie","ZoneEnnemie",as_dealer);
  ScoreEnnemie=tmp3[0];
  as_dealer=tmp3[1];
  document.getElementById("Ennemie").innerHTML ="Ressources ennemies : "+ (42-ScoreEnnemie) +"titane(s)";
  var carddeal = document.getElementById("cardbutton");
  carddeal.addEventListener("click",player);
  var staybutton = document.getElementById("staybutton");
  staybutton.addEventListener("click",dealer);
  var startagainbutton = document.getElementById("startagainbutton");
  startagainbutton.addEventListener("click",function(){location.reload()});
}
var cardlist=function() {
  for (let i=1; i<=nbcard; i++){
    let name_image="./vaisseaux_png_Copie/"+i+".png";
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
  if (flag_end==0){
    flag_end=1;
    if (endgame==0){
      for (let i=0; i<6; i++){
        if (ScoreEnnemie<ScoreJoueur && ScoreEnnemie<=42) {
          tmp2 = deal(ScoreEnnemie, "Ennemie","ZoneEnnemie",as_dealer);
          ScoreEnnemie=tmp2[0];
          as_dealer=tmp2[1];
          document.getElementById("Ennemie").innerHTML ="Ressources ennemies : "+ (42-ScoreEnnemie) +"titane(s)";
          if (ScoreEnnemie>42 && as_dealer>0) {
            ScoreEnnemie-=10;
            as_dealer-=1;
            tmp2 = deal(ScoreEnnemie, "Ennemie","ZoneEnnemie",as_dealer);
            ScoreEnnemie=tmp2[0];
            as_dealer=tmp2[1];
            window.alert("Un des vaisseaux Commander ennemi a vendu des artéfacts et la flotte récupère 10titanes ! ")
            if (ScoreEnnemie>42 && as_dealer>0) {
              ScoreEnnemie-=10;
              as_dealer-=1;
            }
            document.getElementById("Ennemie").innerHTML = "Ressources ennemies : "+ (42-ScoreEnnemie) +"titane(s)";
          }
        }
        endgame=1;
      }
    }
    else {
      window.alert("La flotte ennemie a déjà contre attaqué !");
    }
    resultats();
  }
  else {
    window.alert ("La partie est déjà terminée !");
    resultats();
  }
}
var resultats=function(){
  if (ScoreJoueur<=42 && ScoreEnnemie<ScoreJoueur){
    addImgInDiv("./giphy2.gif","explosion");
    window.alert("La flotte du joueur a une puissance de " + ScoreJoueur + "\nLa flotte ennemie a une puissance de "+ScoreEnnemie+"\nLe joueur a gagné !");
  }
  else if (ScoreJoueur<=42 && ScoreEnnemie>42) {
    addImgInDiv("./giphy2.gif","explosion");
    window.alert("L'ennemie n'a plus de quoi payer ses mercenaires et ils se mutinent contre lui !\nLe joueur a gagné !")
  }
  else if (ScoreJoueur<=42 && ScoreEnnemie>=ScoreJoueur) {
    addImgInDiv("./3iCN.gif","explosion");
    window.alert("La flotte du joueur a une puissance de " + ScoreJoueur + "\nLa flotte ennemie a une puissance de "+ScoreEnnemie+"\nLe joueur a perdu !");
  }
  else {
    addImgInDiv("./3iCN.gif","explosion");
    window.alert("Vous n'avez plus de quoi payer vos mercenaires ! Ils rejoignent le camp adverse !\nVous avez perdu ! ")
  }
}
var player=function(){
  let tmp=[];
  if (flag_end==0){
    if (ScoreJoueur<=42){
      tmp = deal(ScoreJoueur,"Joueur","ZoneJoueur",as_player);
      ScoreJoueur=tmp[0];
      as_player=tmp[1];
      if (ScoreJoueur>42 && as_player>0){
        ScoreJoueur-=10;
        as_player-=1;
        document.getElementById("Joueur").innerHTML = "Vos ressources : "+ (42-ScoreJoueur)+"titane(s)";
        window.alert("Un de vos vaisseaux Commander a vendu des artéfacts et vous récupèrez 10titanes ! ")
      }
    }
    if (ScoreJoueur>42){
      document.getElementById("Joueur").innerHTML = "Vos ressources : "+ (42-ScoreJoueur)+"titane(s)";
      addImgInDiv("./3iCN.gif","explosion");
      window.alert("Vous n'avez plus de quoi payer vos mercenaires ! Ils rejoignent le camp adverse !");
      flag_end=1;
    }
    document.getElementById("Joueur").innerHTML = "Vos ressources : "+ (42-ScoreJoueur)+"titane(s)";
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
  return [score,count_as];
}

let as_player=0;
let as_dealer=0;
let flag_end=0;
let endgame=0;
let deck=Array();
let nbcard=52;
let j=0;
let ScoreJoueur=0;
let ScoreEnnemie=0;
setupListeners();
