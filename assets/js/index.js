'use strict'
import { sidebarFun } from "./sidebar.js"
import { apy_key,fetchDataFromServer , imageBaseURL } from "./api.js"
import {CreateMovieCard} from './movie-card.js'
import { search } from "./search.js"
const pageContent = document.querySelector("[page-content]");

sidebarFun()

const homePageSections = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },
    {
        title: "Weekly Trending Movies",
        path: "/trending/movie/week"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    }]

const genreList = {
    asString(generIdList) {
        let newGenerList = [];
        for(const generId of generIdList) {
            this[generId] && newGenerList.push(this[generId])
        }
        return newGenerList.join(", ")
    }
};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apy_key}`,function({genres}) {
    for(const {id , name} of genres) {
        genreList[id] = name;
    }
    fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${apy_key}&page=1'`,heroBanner);
})


const heroBanner = function({results:movieList}){
    
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Movies"
    banner.innerHTML =`
        <div class="banner-slider"></div>
        </div>
        <div class="banner-control">
            <div class="inner"> </div>
        </div>
    `

    let controlItemIndex = 0;

    for(const [index , movie] of movieList.entries()) {
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        const slideItem = document.createElement("div");
        slideItem.classList.add("slider-item");
        slideItem.setAttribute("slider-img","");
        slideItem.innerHTML =`
            <img  
                src="${imageBaseURL}w1280${backdrop_path}" 
                alt="${title}" 
                class="img-cover" 
                loading="${index === 0 ? "eager" : "lazy"}">
            <div class="banner-content">
                <h2 class="heading">${title}</h2>
                <div class="meta-list">
                    <p class="meta-item year">${release_date.split("-")[0]}</p>
                    <p class="meta-item badge">${vote_average.toFixed(1)}</p>
                </div>
                <div class="gener">${genreList.asString(genre_ids)} </div>
                <div class="description">${overview} </div>
                <a href="detail.html" class="btn"
                onclick = getMovieDetails("${id}")
                >
                    <img 
                        src="assets/images/play_circle.png" 
                        alt="${title}" 
                        width="24" height="24"
                        
                    >
                    <span>Watch Now</span>
                </a>
            </div>
        `
        banner.querySelector(".banner-slider").appendChild(slideItem)
        
        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box","slider-item")
        controlItem.setAttribute("slider-control",`${controlItemIndex}`);
        controlItemIndex++;

        controlItem.innerHTML = `
            <img  
                src="${imageBaseURL}w154${poster_path}" 
                alt="Slide to ${title}" 
                loading="lazy"
                draggable="false"
                class="img-cover"
            >`
            banner.querySelector(".inner").appendChild(controlItem);
    }

    pageContent.appendChild(banner)
    addHeroSlide();

    for(const{title , path} of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${apy_key}&page=1`,
            createMovieList , title)
    }
}

const addHeroSlide = function() {
    const slideItem =  document.querySelectorAll(".slider-item")
    const slideControl =  document.querySelectorAll("[slider-control]")
    let lastSlideItem = slideItem[0];
    let lastSlideControl= slideControl[0];

    lastSlideItem.classList.add("active")
    lastSlideControl.classList.add("active")
    const sliderStart = function () {
        lastSlideItem.classList.remove("active");
        lastSlideControl.classList.remove("active");
        slideItem[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");
        lastSlideItem = slideItem[Number(this.getAttribute("slider-control"))]
        lastSlideControl = this;
    }
    addEventOnElement(slideControl,"click",sliderStart)
}

const createMovieList = function ({results:movieList},title){
    const movieListEle = document.createElement("section");
    movieListEle.classList.add("movie-list");
    movieListEle.ariaLabel = `${title}`;
    movieListEle.innerHTML = `
        <div class="title-wrapper">
            <h2 class="title-large">${title}</h2>
        </div>
        <div class="slider-list">
            <div class="inner-slider"></div>
        </div>
    `
    for(const movie of movieList) {
        const movieCard = CreateMovieCard(movie);
        movieListEle.querySelector(".inner-slider").appendChild(movieCard)
    }
    pageContent.appendChild(movieListEle);

}
search();