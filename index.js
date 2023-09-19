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

var dictPagesByCategory = {}

/* init pages */
var page_fantasy = 1
var page_history = 1
var page_action = 1
var page_best = 1

/* fantasy listener */
leftBtnCat1.onclick = function() {
  if(page_fantasy > 1){
    page_fantasy -= 1;
    logMovies(page_fantasy, "Fantasy");
  }
}

rightBtnCat1.onclick = function() {
  if(page_fantasy < dictPagesByCategory["maxPageFantasy"]){
    page_fantasy += 1
    logMovies(page_fantasy, "Fantasy");
  }
}

/* history listener */
leftBtnCat2.onclick = function() {
  if(page_history > 1){
    page_history -= 1;
    logMovies(page_history, "History");
  }
}

rightBtnCat2.onclick = function() {
  if(page_history < dictPagesByCategory["maxPageHistory"]){
    page_history += 1
    logMovies(page_history, "History");
  }
}

/* action listener */
leftBtnCat3.onclick = function() {
  if(page_action > 1){
    page_action -= 1;
    logMovies(page_action, "Action");
  }
}

rightBtnCat3.onclick = function() {
  if(page_action < dictPagesByCategory["maxPageHistory"]){
    page_action += 1
    logMovies(page_action, "Action");
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
  document.getElementById("popupTitle").textContent = data.title;
  document.getElementById("popupYear").textContent = "Année : " + data.year;
  document.getElementById("popupVotes").textContent = "Nombre de votes : " + data.votes;
  document.getElementById("popupImbScore").textContent = "Score sur le site Imb : " + data.imdb_score;
  document.getElementById("popupDirectors").textContent = "Directeurs : " + Array.from(data.directors).join(' | ');
  document.getElementById("popupActors").textContent = "Acteurs : " + Array.from(data.actors).join(' | ');
  document.getElementById("popupWriters").textContent = "Scénaristes : " + Array.from(data.writers).join(' | ');
  document.getElementById("popupGenres").textContent = "Genres : " + Array.from(data.genres).join(' | ');
  document.getElementById("popupImg").src = data.image_url;
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

async function logMovies(nbPage, categoryName) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: categoryName,
    page: nbPage,
  }))

  const data = await response.json();
  dictPagesByCategory[`maxPage${categoryName}`] = Math.trunc(data.count/5);
  
  /* For each img in our Carousel we assign the corresponding datas */
  var movies_elements = document.getElementsByClassName(`film-${categoryName}`);
  movies_elements = Array.from(movies_elements)
  movies_elements.forEach((element, index) => {
    element.textContent = data.results[index].title;
    element.src = data.results[index].image_url;
  })
}

logMovies(1, "Fantasy");
logMovies(1, "History");
logMovies(1, "Action");