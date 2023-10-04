'use strict'
import { sidebarFun } from "./sidebar.js"
import { apy_key,fetchDataFromServer , imageBaseURL } from "./api.js"
import {CreateMovieCard} from './movie-card.js'
import { search } from "./search.js"
const pageContent = document.querySelector("[page-content]");
const urlParam = window.localStorage.getItem("urlParam")
const genreName = window.localStorage.getItem("genreName")
sidebarFun()


let currentPage = 1;
let totalPages = 0;
fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${apy_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`,
    function({results:movieList , total_pages}) {
        console.log(urlParam)
        console.log(movieList)
        totalPages = total_pages;
        document.title = `${genreName} Movies - Tvflix`

        const movieListEle = document.createElement("section");
        movieListEle.classList.add("movie-list", "gener-list");
        movieListEle.ariaLabel = `${genreName} Movies`;
        movieListEle.innerHTML = `
            <div class="title-wrapper">
                <h2 class="heading">All ${genreName} Movies</h2>
            </div>
            <div class="grid-list"> </div>
            <button class="btn load-more" load-more>Load More</button>
        `
        for(const movie of movieList) {
            const movieCard = CreateMovieCard(movie);

            movieListEle.querySelector(".grid-list").appendChild(movieCard);
        }
        pageContent.appendChild(movieListEle)

        document.querySelector("[load-more]").addEventListener("click" , function () {
            console.log(this)
            this.classList.add("loading");
            if (currentPage >= totalPages) {
                this.style.display = "none"
                return;
            }
            currentPage++;

            fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${apy_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`,
            function({results:movieList}){
                console.log(this)
                document.querySelector("[load-more]").classList.remove("loading")
                for(const movie of movieList) {
                    const movieCard = CreateMovieCard(movie);
                    movieListEle.querySelector(".grid-list").appendChild(movieCard);
                }
            })
        })
        
})

search();