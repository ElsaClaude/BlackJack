
let deck=Array();
let nbcard=52;
let j=0;
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

function createImg(path) {
  var img = document.createElement('img');
  img.src = path;
  return img;
}
function addImgInDiv(path) {
  var newImg = createImg(path);
  var divJS = document.getElementById('yourarea');
  divJS.appendChild(newImg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var deal=function(){
  let random_index=getRandomInt(nbcard);
  addImgInDiv(deck[random_index][0]);
  console.log(deck[random_index][0]);
  console.log(deck[random_index][1]);
  deck.splice(random_index,1);
  nbcard--;
  // console.log(random_index);
  // console.log(deck);
}

function setupListeners() {
  var carddeal = document.getElementById("cardbutton");
  carddeal.addEventListener("click",deal);
}
setupListeners();
