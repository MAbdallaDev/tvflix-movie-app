"use strict";

// add event to multi elements

const addEventOnElement = function (element , eventType , callback) {
    element.forEach(ele => {
        ele.addEventListener(eventType , callback)
    });
}

// Toggle search box

const searchBox = document.querySelector(".search-box");
const searchToggler = document.querySelectorAll("[search-toggler]")
// console.log(searchToggler)
addEventOnElement(searchToggler,"click",()=> {
    searchBox.classList.toggle("active")
})

const getMovieDetails = function (movieId) {
    window.localStorage.setItem("movieId",String(movieId))
}
const getMovieList = function (urlParam , genreName) {
    window.localStorage.setItem("urlParam",urlParam)
    window.localStorage.setItem("genreName",genreName)
}