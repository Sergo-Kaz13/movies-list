"use strict";

const initialMoviesItems = JSON.parse(localStorage.getItem("listMovie")) || [];

console.log(initialMoviesItems);

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

        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        img.className = "movie_img";
        img.src = movie.imgUrl;
        img.alt = movie.title;
        imgTd.append(img);

        const titleTd = document.createElement("td");
        titleTd.textContent = `${movie.title}`;

        const ratingTd = document.createElement("td");
        ratingTd.textContent = `👍${movie.rating} 👎`;

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
  const elementId = event.target.closest("tr").id;
  const movieIndex = initialMoviesItems.findIndex(
    (movie) => movie.id === +elementId
  );

  initialMoviesItems.splice(movieIndex, 1);
  setLocalStorageData(initialMoviesItems);

  enterMovies(initialMoviesItems);
}

function setLocalStorageData(data) {
  localStorage.setItem("listMovie", JSON.stringify(data));
}
