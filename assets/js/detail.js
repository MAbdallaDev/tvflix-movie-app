'use strict'
import { sidebarFun } from "./sidebar.js"
import { apy_key,fetchDataFromServer , imageBaseURL } from "./api.js"
import {CreateMovieCard} from './movie-card.js'
import { search } from "./search.js"
const pageContent = document.querySelector("[page-content]");
const movieId = window.localStorage.getItem("movieId");
sidebarFun()

const getGeners = function (genres) {
    let newGenresList = [];
    for (const {name} of genres) newGenresList.push(name);

    return newGenresList.join(", ")
}
const getCasts = function(castList) {
    let newCastList = [];
    for (let i = 0; i < castList.length && i < 10; i++) {
        const {name} =  castList[i];
        newCastList.push(name);
    }
    return newCastList.join(", ")
}
const getDirector = function(crewList) {
    const directors  =  crewList.filter(({job} )=> job === "Director");
    const directorsList = [];
    for(const {name} of directors) directorsList.push(name);

    return directorsList.join(", ")
}

const filterdVideos = function(videosList) {
    return videosList.filter(({type , site})=> (type === "Teaser" || type === "Trailer") && site === "YouTube");
}

fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apy_key}&append_to_response=casts,videos,images,releases`,function(movie) {
    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        genres,
        overview,
        vote_average,
        releases: {countries: [{certification}]},
        casts: {cast , crew},
        videos: {results : videos}
    } = movie;

    document.title = `${title} - Tvfilx`
    const movieDetails = document.createElement("section");
    movieDetails.classList.add("movie-detail");
    movieDetails.innerHTML = `
        <div 
            class="background-imge" 
            style="background-image: url('${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}') ">
        </div>
        <figure class="poster-box movie-poster">
            <img src="${imageBaseURL}w342${poster_path}" alt="${title} poster" class="img-cover">
        </figure>
        <div class="detail-box">
            <div class="detail-content">
                <h1 class="heading">${title}</h1>
                <div class="meta-list">
                    <div class="meta-item rating">
                        <img src="assets/images/star.png" width="20" height="20" alt="rating">
                        <span class="span">${vote_average.toFixed(1)}</span>
                    </div>
                    <div class="separator"></div>
                    <div class="meta-list">${runtime}m</div>
                    <div class="separator"></div>
                    <div class="meta-list">${release_date.split("-")[0]}</div>
                    <div class="separator"></div>
                    <div class="meta-list badge">${certification}</div>
                </div>
                <p class="gener">${getGeners(genres)}</p>
                <p class="description">${overview}</p>
                <ul class="detail-list">
                    <div class="list-item">
                        <p class="list-name">Starring</p>
                        <p>${getCasts(cast)}</p>
                    </div>
                    <div class="list-item">
                        <p class="list-name">Directed By</p>
                        <p>${getDirector(crew)} </p>
                    </div>
                </ul>
            </div>
            <div class="title-wrapper">
                <h3 class="title-large">Trailers and Clips</h3>
            </div>
            <div class="slider-list">
                <div class="inner-slider"></div>
            </div>
        </div>
    `;

    for(const {name , key} of filterdVideos(videos)) {
        const videoCard = document.createElement("div")
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <iframe width="500" height="294" src ="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"> </iframe>
        `
        movieDetails.querySelector(".inner-slider").appendChild(videoCard);
    }
    pageContent.appendChild(movieDetails);

    fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apy_key}`,addRecommendations);

})
const addRecommendations = function({results:movieList}) {
    const movieListEle =  document.createElement("section");
    movieListEle.classList.add("movie-list");
    movieListEle.ariaLabel = "You May Also Like";
    movieListEle.innerHTML = `
        <div class="title-wrapper">
            <h2 class="title-large">You May Also Like</h2>
        </div>
        <div class="slider-list">
            <div class="inner-slider"></div>
        </div>
    `
    for(const movie of movieList) {
        const movieCard = CreateMovieCard(movie);
        movieListEle.querySelector(".inner-slider").appendChild(movieCard);
    }
    pageContent.appendChild(movieListEle)
}
search();