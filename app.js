
// fonction qui permet en cliquant sur nouvelle liste de  créer une 
// nouvelle liste qui apparait dans la sidebar de gauche.
document.getElementById("newlist").addEventListener("click", function() {
  var newList = prompt("Entrez le nom de la liste : ");
  var listElt = document.createElement("li");
  var titreList = document.createElement("p");
  titreList.id = "titreListe";
  titreList.textContent = newList;
  listElt.appendChild(titreListe);
  document.getElementById("meslistes").appendChild(listElt);
  
});
// quand on clique sur une liste dans la sidebar de gauche,
// on fait apparaitre la page edition de lise
var liste = document.getElementById("titreListe");
liste.addEventListener("click", function() {
  var h2 = document.getElementsByTagName("h2");
  h2.textContent = liste.textContent;
  var boutonListe = document.createElement('div')
  boutonListe.className = "boutonliste";
  var bouton = document.createElement ('button');
  bouton.textContent = "Supprimer la liste";
  bouton.style.color = '#222222';
  bouton.style.backgroundColor = "red";
  var abouton = document.createElement('a');
  var svgBoutonListe = document.createElement('svg');
  svgBoutonListe.width = "24";
  svgBoutonListe.height= "24";
  svgBoutonListe.fill = "none";
  svgBoutonListe.xmlns="http://www.w3.org/2000/svg";
  var pathBoutonListe = document.createElement('path');
  pathBoutonListe. d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z";
  pathBoutonListe.fill="#fff";
  abouton.appendChild(svgBouton);
  abouton.appendChild(pathBoutonListe);
  bouton.appendChild(abouton);
  boutonListe.appendChild(bouton);
  var mainContent = document.getElementsByClassName("main_content");
  mainContent.appendChild(bouton);
  let tacheElt = document.createElement("div");
  tacheElt.className = 'tache';
  var aCroix = document.createElement('a');
  var svgCroix = document.createElement



  
});


// fonction qui permet de creer un element tache dans le dom
// mais ça c'est à partir du formulaire
function createTacheElement(tache) {
  let tacheElt = document.createElement("div");
  tacheElt.className = 'tache';
  tacheElt.id = post.id;
  let divChekd = document.createElement("div");
  divChekd.className = 'check';
  let aCheck = document.createElement('a');
  aCheck.className = 'svg';
  let svg = document.createElement('svg');
  svg.width = "30";
  svg.height="30";
  svg.fill="none";
  svg.xmlns="http://www.w3.org/2000/svg";
  let pathSvg = document.createElement("path");
  pathSvg.d = "M5.25 9.433L2.817 7l-.828.823 3.261 3.26 7-7-.822-.822L5.25 9.433z";
  pathSvg.fill = "#fff";
  aCheck.appendChild(svg);
  aCheck.appendChild(pathSvg);
  divChekd.appendChild(aCheck);
  let tacheContenu = document.createElement('div');
  tacheContenu.className = "tache_content";
  let titreTache = document.createElement('p');
  titreTache.textContent = post.taches.titreTache;
  var nbr1 = 0;
  var nbr2 = 0;
  var nbreTache = document.getElementsByClassName("tache");
  if( nbreTache === 0) {
      nbr1 = 1;
      nbr2 = 1;
  }else {
    nbr1 = nbreTache.length +1;
    nbr2 = nbreTache.length+1;
  }
  let numero = document.createElement('li');
  numero.textContent = nbr1+ " sur " + bnr2;
  let echeance = document.createElement('li');
  echeance.textContent = post.


}