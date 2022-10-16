const sliders = document.querySelector(".carousel_box");
const buttons = {
  prev: document.querySelector(".btn_left"),
  next: document.querySelector(".btn_right"),
};

const filters = {
  popular: document.getElementById("popular"),
  theatre: document.getElementById("new"),
  family: document.getElementById("family"),
};

let movies = [];

let scrollPerClick;
let imagePadding = 20;
let scrollAmount = 0;

function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });
}

if (scrollAmount < 0) {
  scrollAmount = 0;
}

function sliderScrollRight() {
  if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
}

const API_KEY = "api_key=9345e8a8e43d799b00bf0c28c7dd27de";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=revenue.desc&" + API_KEY;

const POP_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const THEATRE_URL =
  BASE_URL +
  "/discover/movie?primary_release_date.gte=2022-09-15&primary_release_date.lte=2022-10-22&" +
  API_KEY;

showMovieData(API_URL);

function showMovieData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movies = [];
      console.log(data);
      console.log(movies);
      movies = data.results;
      showMovies(data);
    });
}

function showMovies() {
  // console.log(data.results);

  // result = data.results;
  sliders.innerHTML = "<div><div>";
  movies.map((cur, index) => {
    sliders.insertAdjacentHTML(
      "afterbegin",
      `<img class="img-${index} slider-img" src = "https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`
    );
  });

  scrollPerClick = 800; //document.querySelector(".img-1").clientWidth + imagePadding;
}

function setFilter(type) {
  if (type === "r") {
  }
}

buttons.prev.addEventListener("click", () => sliderScrollLeft());
buttons.next.addEventListener("click", () => sliderScrollRight());

filters.popular.addEventListener("click", () => showMovieData(POP_URL));
filters.theatre.addEventListener("click", () => showMovieData(THEATRE_URL));
filters.family.addEventListener("click", () => showMovieData(API_URL));
