var popup = document.getElementById("popup");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

var leftBtnCat1 = document.getElementById("left-btn-category-1")
var rightBtnCat1 = document.getElementById("right-btn-category-1")

var leftBtnBest = document.getElementById("left-btn-best_movie")
var rightBtnBest = document.getElementById("right-btn-best_movie")

var page_fantasy = 1
var page_best = 1
var max_page_fantasy
var max_page_best

btn.onclick = function() {
  popup.style.display = "block";
}

leftBtnCat1.onclick = function() {
  if(page_fantasy > 1){
    page_fantasy -= 1;
    logMoviesFantasy(page_fantasy);
  }
}

rightBtnCat1.onclick = function() {
  if(page_fantasy < max_page_fantasy){
    page_fantasy += 1
    logMoviesFantasy(page_fantasy);
  }
}

leftBtnBest.onclick = function() {
  if(page_best > 1){
    page_best -= 1;
    logMoviesBest(page_best);
  }
}

rightBtnBest.onclick = function() {
  if(page_best < max_page_best){
    page_best += 1
    logMoviesBest(page_best);
  }
}

span.onclick = function() {
    popup.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

async function logMoviesFantasy(nbPage) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: 'Fantasy',
    page: nbPage,
}));

  const movies = await response.json();
  max_page_fantasy = Math.trunc(movies.count/5);

  var films = document.getElementsByClassName("film-cat1");
  films = Array.from(films)
  films.forEach((element, index) => {
    element.textContent = movies.results[index].title;
    element.src = movies.results[index].image_url;
  });

}

logMoviesFantasy(page_fantasy)

async function logMoviesBest(nbPage) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    page: nbPage,
    sort_by: "-imdb_score"
}));


const movies = await response.json();
max_page_best = Math.trunc(movies.count/5);

var films = document.getElementsByClassName("film-best");
films = Array.from(films)
films.forEach((element, index) => {
  element.textContent = movies.results[index].title;
  element.src = movies.results[index].image_url;
});

}

logMoviesBest(page_best)


/* Quand on cliquera sur une image on est censé afficher la popup avec le film dedans,
mais comment se souvenir pour une image donnée des infos associé ? Solution une array
de 5 elements avec les données stoqués dedans ? donc 4 array de 5 chargés à chaque fois
mais comment faire pour les click listener ?*/

let positions = {
  categories: 1,
  categories: 1,
  categories: 1,
  categories: 1,
  categories: 1
}

if (positions[category] == 1) {
  document.querySelector("#" + category +  " .left").classList.add("");   
} else if (positions[category] > (nb_total_elt - nb_visible_elt)) {
  document.querySelector("#" + category +  " .right").classList.add("");
}