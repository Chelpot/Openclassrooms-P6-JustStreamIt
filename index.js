/* retrieve elements from html document */
var popup = document.getElementById("popup");
var span = document.getElementsByClassName("close")[0];

var leftBtnCat1 = document.getElementById("left-btn-category-1")
var rightBtnCat1 = document.getElementById("right-btn-category-1")

var leftBtnCat2 = document.getElementById("left-btn-category-2")
var rightBtnCat2 = document.getElementById("right-btn-category-2")

var leftBtnCat3 = document.getElementById("left-btn-category-3")
var rightBtnCat3 = document.getElementById("right-btn-category-3")

var leftBtnBest = document.getElementById("left-btn-best_movie")
var rightBtnBest = document.getElementById("right-btn-best_movie")


/* init pages */
var page_fantasy = 1
var page_history = 1
var page_action = 1
var page_best = 1

var max_page_fantasy
var max_page_history
var max_page_action
var max_page_best

/* fantasy listener */
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

/* history listener */
leftBtnCat2.onclick = function() {
  if(page_history > 1){
    page_history -= 1;
    logMoviesHistory(page_history);
  }
}

rightBtnCat2.onclick = function() {
  if(page_history < max_page_history){
    page_history += 1
    logMoviesHistory(page_history);
  }
}

/* action listener */
leftBtnCat3.onclick = function() {
  if(page_action > 1){
    page_action -= 1;
    logMoviesAction(page_action);
  }
}

rightBtnCat3.onclick = function() {
  if(page_action < max_page_action){
    page_action += 1
    logMoviesAction(page_action);
  }
}

/* best movies listener */
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

/* close popup listeners */
span.onclick = function() {
    popup.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}



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

async function logMoviesHistory(nbPage) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: 'History',
    page: nbPage,
}));

  const movies = await response.json();
  max_page_history = Math.trunc(movies.count/5);

  var films = document.getElementsByClassName("film-cat2");
  films = Array.from(films)
  films.forEach((element, index) => {
    element.textContent = movies.results[index].title;
    element.src = movies.results[index].image_url;
  });

}

logMoviesHistory(page_history)

async function logMoviesAction(nbPage) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: 'Action',
    page: nbPage,
}));

  const movies = await response.json();
  max_page_action = Math.trunc(movies.count/5);

  var films = document.getElementsByClassName("film-cat3");
  films = Array.from(films)
  films.forEach((element, index) => {
    element.textContent = movies.results[index].title;
    url_img = movies.results[index].image_url
    console.log(url_img)
  });

}

logMoviesAction(page_action)