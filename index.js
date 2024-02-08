
const CATEGORY1 = "Fantasy";
const CATEGORY2 = "History";
const CATEGORY3 = "Action";
const CATEGORYBEST = "";


/* retrieve elements from html document */
var popup = document.getElementById("popup");
var span = document.getElementsByClassName("close")[0];

var leftBtnCat1 = document.getElementById("left-btn-category-1");
var rightBtnCat1 = document.getElementById("right-btn-category-1");

var leftBtnCat2 = document.getElementById("left-btn-category-2");
var rightBtnCat2 = document.getElementById("right-btn-category-2");

var leftBtnCat3 = document.getElementById("left-btn-category-3");
var rightBtnCat3 = document.getElementById("right-btn-category-3");

var leftBtnBest = document.getElementById("left-btn-best-movie");
var rightBtnBest = document.getElementById("right-btn-best-movie");

var buttonBestMovie = document.getElementById("button-best-movie");

/* init pages */
var positionFantasy = 0;
var positionHistory = 0;
var positionAction = 0;
var positionBest = 0;

/* fantasy listener */
leftBtnCat1.onclick = function () {
  positionFantasy -= 1;
  logSevenMovies(CATEGORY1, positionFantasy);
}

rightBtnCat1.onclick = function () {
  positionFantasy += 1;
  logSevenMovies(CATEGORY1, positionFantasy);
}

/* history listener */
leftBtnCat2.onclick = function () {
  positionHistory -= 1;
  logSevenMovies(CATEGORY2, positionHistory);
}

rightBtnCat2.onclick = function () {
  positionHistory += 1;
  logSevenMovies(CATEGORY2, positionHistory);
}

/* action listener */
leftBtnCat3.onclick = function () {
  positionAction -= 1;
  logSevenMovies(CATEGORY3, positionAction);
}

rightBtnCat3.onclick = function () {
  positionAction += 1;
  logSevenMovies(CATEGORY3, positionAction);
}

/* best movies listener */
leftBtnBest.onclick = function () {
  positionBest -= 1;
  logSevenMovies(CATEGORYBEST, positionBest);
}

rightBtnBest.onclick = function () {
  positionBest += 1;
  logSevenMovies(CATEGORYBEST, positionBest);
}

buttonBestMovie.onclick = function () {
  title = document.getElementById("best-movie-title").textContent;
  openPopup(title);
}

/* close popup listeners */
span.onclick = function () {
  popup.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("film")) {
    title = e.target.textContent;
    openPopup(title)
  }
  if (e.target.classList.contains("button-best-movie")) {
    title = document.getElementById("best-movie-img").textContent
    openPopup(title)
  }
});

async function openPopup(title) {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    title: title
  }));

  data = await response.json();
  url_detail = data.results[0].url;

  const response_detail = await fetch(url_detail);
  data = await response_detail.json();
  popup.style.display = "inline-block";


  // Load data in popup
  document.getElementById("popup-img").src = data.image_url;
  document.getElementById("popup-title").textContent = data.title;
  document.getElementById("popup-genres").textContent = "Genres : " + Array.from(data.genres).join(' | ');
  document.getElementById("popup-publishedDate").textContent = "Film publié le : " + data.date_published;
  document.getElementById("popup-rated").textContent = "Rated : " + data.rated;
  document.getElementById("popup-imbScore").textContent = "Score sur le site Imdb : " + data.imdb_score;
  document.getElementById("popup-directors").textContent = "Directeurs : " + Array.from(data.directors).join(' | ');
  document.getElementById("popup-actors").textContent = "Acteurs : " + Array.from(data.actors).join(' | ');
  document.getElementById("popup-duration").textContent = "Durée du film : " + data.duration + " Minutes";
  document.getElementById("popup-countries").textContent = "Pays d'origine : " + Array.from(data.countries).join(' | ');
  var bo = document.getElementById("popup-boxoffice");
  if (data.worldwide_gross_income == null){
    bo.textContent = "Résultats au Box Office : Inconnu";
  }
  else{
    bo.textContent = "Résultats au Box Office : " + data.worldwide_gross_income + "$";
  }
  document.getElementById("popup-description").textContent = "Résumé : " + data.long_description;
}

async function logSevenMovies(categoryName, position) {
  var movies = []
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: categoryName,
    sort_by: "-imdb_score"
  }));
  const moviePartOne = await response.json();
  
  const responseTwo = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    genre: categoryName,
    page: 2,
    sort_by: "-imdb_score"
  }));

  const moviePartTwo = await responseTwo.json();

  /*We only need first 7 results */
  moviePartOne.results.forEach(element => {
    movies.push(element)
  });
  movies.push(moviePartTwo.results[0]);
  movies.push(moviePartTwo.results[1]);


  if(categoryName==""){
    categoryName="best";
  }
  
  categoryName = categoryName.toLowerCase();

  /* For each img in our Carousel we assign the corresponding datas */
  var movies_images = document.getElementsByClassName(`film-${categoryName}`);
  movies_images = Array.from(movies_images);
  movies_images.forEach((element, index) => {
    if (position+index >= 0){
      pos = (position+index)%7;
    }
    else{
      /*To be able to scroll to the left, we must take data in reverse order*/
      pos = ((position+index)%7+7)%7;
    }
    element.textContent = movies[pos].title;
    element.src = movies[pos].image_url;
    element.setAttribute('alt', movies[pos].title);
  })
  /* For each title in our Carousel we assign the title */
  var movies_titles = document.getElementsByClassName(`title-film-${categoryName}`);
  movies_titles = Array.from(movies_titles);
  movies_titles.forEach((element, index) => {
    if (position+index >= 0){
      pos = (position+index)%7;
    }
    else{
      /*To be able to scroll to the left, we must take data in reverse order*/
      pos = ((position+index)%7+7)%7;
    }
    element.textContent = movies[pos].title
  })
}

async function logBestMovie() {
  const response = await fetch("http://localhost:8000/api/v1/titles/?" + new URLSearchParams({
    sort_by: "-imdb_score"
  }));

  const movies = await response.json();
  var movie_url = movies.results[0].url;

  const response_Best_Movie = await fetch(movie_url);
  const best_movie = await response_Best_Movie.json();

  document.getElementById("best-movie-title").textContent = best_movie.title;
  document.getElementById("best-movie-description").textContent = best_movie.description;
  document.getElementById("best-movie-img").src = best_movie.image_url;
  document.getElementById("best-movie-img").textContent = best_movie.title;


}

logBestMovie();
logSevenMovies(CATEGORYBEST, 0);
logSevenMovies(CATEGORY1, 0);
logSevenMovies(CATEGORY2, 0);
logSevenMovies(CATEGORY3, 0);