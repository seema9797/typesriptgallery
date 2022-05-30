"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const auth = "api_key=16f5a39714623a8f11910f456e72441e";
const inputsearch = document.querySelector(".inputsearch");
const displayimages = document.querySelector(".displayimages");
const forminput = document.querySelector(".form");
const errorMsg = document.querySelector(".errormsg");
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + auth;
var temp = 0;
//images search 
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searcURL = BASE_URL + "/search/movie?" + auth + "&query=";
//getMpovies(API_URL)
//search for movies
forminput.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = inputsearch.value;
    if (value) {
        getMovie(searcURL + value);
    }
    else {
        getMovie(API_URL);
        inputsearch.value = "";
    }
});
function getMovie(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const response = yield data.json();
        console.log(response.results);
        const result = response.results;
        if (result) {
            showResultMov(result);
            errorMsg.style.display = "none";
        }
        if (result.length === 0) {
            errorMsg.style.display = "block";
            const divError = document.createElement("div");
            divError.classList.add("container");
            divError.innerHTML = `
        <div class="errorCont">
        <div>
        <h1>Sorry,there is no result for keyword you searched</h1>
        <img src="notfound.png" alt="not found"/>
        </div>
        </div>
        `;
            if (temp === 0) {
                errorMsg.appendChild(divError);
                temp = 1;
            }
        }
        //display_images(response.results)
    });
}
getMovie(API_URL);
function showResultMov(result) {
    displayimages.innerHTML = "";
    result.forEach((index) => {
        const photo = document.createElement("div");
        photo.innerHTML = `
        <div class="seemore"> 
          <h3 id="">${index.title}</h3>
          <button>See more</button>
        </div>
        <img src=${IMG_URL + index.poster_path}>
        
        `;
        document.querySelector(".displayimages").appendChild(photo);
    });
}
