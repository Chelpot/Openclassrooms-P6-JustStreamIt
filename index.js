
const CATEGORY1 = "Fantasy"
const CATEGORY2 = "History"
const CATEGORY3 = "Action"

/* retrieve elements from html document */
var popup = document.getElementById("popup");
var span = document.getElementsByClassName("close")[0];

var leftBtnCat1 = document.getElementById("left-btn-category-1")
var rightBtnCat1 = document.getElementById("right-btn-category-1")

var leftBtnCat2 = document.getElementById("left-btn-category-2")
var rightBtnCat2 = document.getElementById("right-btn-category-2")

var leftBtnCat3 = document.getElementById("left-btn-category-3")
var rightBtnCat3 = document.getElementById("right-btn-category-3")

var leftBtnBest = document.getElementById("left-btn-best-movie")
var rightBtnBest = document.getElementById("right-btn-best-movie")

var dictPagesByCategory = {}

/* init pages */
var pageFantasy = 1
var pageHistory = 1
var pageAction = 1
var pageBest = 1

/* fantasy listener */
leftBtnCat1.onclick = function() {
  if(pageFantasy > 1){
    pageFantasy -= 1;
    logMovies(pageFantasy, CATEGORY1);
  }
}

rightBtnCat1.onclick = function() {
  if(pageFantasy < dictPagesByCategory["maxPageFantasy"]){
    pageFantasy += 1
    logMovies(pageFantasy, CATEGORY1);
  }
}

/* history listener */
leftBtnCat2.onclick = function() {
  if(pageHistory > 1){
    pageHistory -= 1;
    logMovies(pageHistory, CATEGORY2);
  }
}

rightBtnCat2.onclick = function() {
  if(pageHistory < dictPagesByCategory["maxPageHistory"]){
    pageHistory += 1
    logMovies(pageHistory, CATEGORY2);
  }
}

/* action listener */
leftBtnCat3.onclick = function() {
  if(pageAction > 1){
    pageAction -= 1;
    logMovies(pageAction, CATEGORY3);
  }
}

rightBtnCat3.onclick = function() {
  if(pageAction < dictPagesByCategory["maxPageHistory"]){
    pageAction += 1
    logMovies(pageAction, CATEGORY3);
  }
}

/* best movies listener */
leftBtnBest.onclick = function() {
  if(pageBest > 1){
    pageBest -= 1;
    logMoviesBest(pageBest);
  }
}

rightBtnBest.onclick = function() {
  if(pageBest < maxPageBest){
    pageBest += 1
    logMoviesBest(pageBest);
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

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("film")) {
    title = e.target.textContent;
    openPopup(title)
    
  }
});


async function openPopup(title) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    title: title
  }));
  data = await response.json()
  data = data.results[0]
  popup.style.display = "inline-block";


  // Load data in popup
  document.getElementById("popup-title").textContent = data.title;
  document.getElementById("popup-year").textContent = "Année : " + data.year;
  document.getElementById("popup-votes").textContent = "Nombre de votes : " + data.votes;
  document.getElementById("popup-imbScore").textContent = "Score sur le site Imb : " + data.imdb_score;
  document.getElementById("popup-directors").textContent = "Directeurs : " + Array.from(data.directors).join(' | ');
  document.getElementById("popup-actors").textContent = "Acteurs : " + Array.from(data.actors).join(' | ');
  document.getElementById("popup-writers").textContent = "Scénaristes : " + Array.from(data.writers).join(' | ');
  document.getElementById("popup-genres").textContent = "Genres : " + Array.from(data.genres).join(' | ');
  document.getElementById("popup-img").src = data.image_url;
}

async function logMoviesBest(nbPage) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    page: nbPage,
    sort_by: "-imdb_score"
}));

const movies = await response.json();
maxPageBest = Math.trunc(movies.count/5);

var films = document.getElementsByClassName("film-best");
films = Array.from(films)
films.forEach((element, index) => {
  element.textContent = movies.results[index].title;
  element.src = movies.results[index].image_url;
});

}

logMoviesBest(pageBest)

async function logMovies(nbPage, categoryName) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: categoryName,
    page: nbPage,
    sort_by: "-votes"
  }))

  const data = await response.json();
  dictPagesByCategory[`maxPage${categoryName}`] = Math.trunc(data.count/5);
  categoryName = categoryName.toLowerCase()
  /* For each img in our Carousel we assign the corresponding datas */
  var moviesElements = document.getElementsByClassName(`film-${categoryName}`);
  moviesElements = Array.from(moviesElements)
  moviesElements.forEach((element, index) => {
    element.textContent = data.results[index].title;
    element.src = data.results[index].image_url;
  })
}

logMovies(1, CATEGORY1);
logMovies(1, CATEGORY2);
logMovies(1, CATEGORY3);