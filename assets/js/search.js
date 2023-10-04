'use strict';

import { apy_key , fetchDataFromServer } from "./api.js";
import { CreateMovieCard } from "./movie-card.js";

export function search () {
    let searchWrapper =  document.querySelector("[search-wrapper]");
    let searchField = document.querySelector("[seach-field]");
    let searchModule = document.createElement("section");
    searchModule.classList.add("search-model");
    document.querySelector("main").appendChild(searchModule);
    let searchTimeOut;
    searchField.addEventListener("input" , function () {
        if (!searchField.value.trim()) {
            searchWrapper.classList.remove("searching");
            searchModule.classList.remove("active");
            clearTimeout(searchTimeOut);
            return;
        }
        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeOut);

        searchTimeOut = setTimeout(() => {
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${apy_key}&query=${searchField.value}`
                ,function ({results : movieList}){
                    searchWrapper.classList.remove("searching");
                    searchModule.classList.add("active");
                    searchModule.innerHTML = "";
                    searchModule.innerHTML = `
                        <p class="label">Results for</p>
                        <p class="heading">${searchField.value}</p>
                        <div class="movie-list">
                            <div class="grid-list"></div>
                        </div>
                    `
                    for( const movie of movieList) {
                        const movieCard = CreateMovieCard(movie);
                        searchModule.querySelector(".grid-list").appendChild(movieCard)
                    }
                    
            })
        }, 500)
    })
    
}