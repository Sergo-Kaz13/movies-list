"use strict";

const initialMoviesItems = JSON.parse(localStorage.getItem("listMovie")) || [];

const tableBody = document.querySelector(".table_body");
const formElement = document.querySelector("#form");
const btnAddMovie = document.querySelector(".btn-add-movie");

enterMovies(initialMoviesItems);

function addNewMovies() {}

function enterMovies(movies) {
  tableBody.textContent = "";

  movies.length > 0
    ? movies.map((movie) => {
        const tr = document.createElement("tr");
        tr.id = movie.id;
        tr.addEventListener("click", (event) => deleteMovieItem(event));
        tr.addEventListener("click", (event) => ratingMovie(event));

        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        img.className = "movie_img";
        img.src = movie.imgUrl;
        img.alt = movie.title;
        imgTd.append(img);

        const titleTd = document.createElement("td");
        titleTd.textContent = `${movie.title}`;

        const ratingUp = document.createElement("span");
        const ratingDown = document.createElement("span");
        const ratingData = document.createElement("span");

        ratingUp.classList = "rating-up";
        ratingUp.textContent = "👍";
        ratingDown.classList = "rating-down";
        ratingDown.textContent = "👎";
        ratingData.classList = "rating-data";
        ratingData.textContent = `${movie.rating}`;

        const ratingTd = document.createElement("td");
        ratingTd.classList = "rating-block";
        ratingTd.append(ratingUp, ratingData, ratingDown);

        const btnTd = document.createElement("td");
        const btnDel = document.createElement("button");
        btnDel.textContent = "❌";
        btnDel.classList = "del-movie";
        btnTd.append(btnDel);

        tr.append(imgTd, titleTd, ratingTd, btnTd);
        tableBody.append(tr);
      })
    : loading();
}

function loading() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "Loading...";
  td.colSpan = 4;
  tr.append(td);

  tableBody.append(tr);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);
  const values = Object.fromEntries(formData.entries());
  values.id = generatorId();
  initialMoviesItems.push(values);
  setLocalStorageData(initialMoviesItems);
  enterMovies(initialMoviesItems);
});

btnAddMovie.addEventListener("click", () => {
  form.classList.toggle("show-form");
});

function generatorId() {
  return Date.now();
}

function deleteMovieItem(event) {
  if (event.target.tagName === "BUTTON") {
    const elementId = event.target.closest("tr").id;
    const movieIndex = initialMoviesItems.findIndex(
      (movie) => movie.id === +elementId
    );

    initialMoviesItems.splice(movieIndex, 1);
    setLocalStorageData(initialMoviesItems);

    enterMovies(initialMoviesItems);
  }
}

function ratingMovie(event) {
  const eventClass = event.target.className;
  const movieId = event.target.closest("tr").id;

  if (eventClass === "rating-up") {
    ratingUpdate("up", movieId);
  } else if (eventClass === "rating-down") {
    ratingUpdate("down", movieId);
  }
}

function setLocalStorageData(data) {
  localStorage.setItem("listMovie", JSON.stringify(data));
}

function ratingUpdate(operator, idMovie) {
  initialMoviesItems.map((movie) => {
    if (movie.id === +idMovie) {
      if (operator === "up") {
        movie.rating = +movie.rating + 1;
        setLocalStorageData(initialMoviesItems);
        enterMovies(initialMoviesItems);
      } else if (operator === "down") {
        movie.rating -= 1;
        setLocalStorageData(initialMoviesItems);
        enterMovies(initialMoviesItems);
      }
    }
  });
}
