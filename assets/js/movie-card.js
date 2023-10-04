'use strict'

import { imageBaseURL } from "./api.js";

export const CreateMovieCard = function(movie) {
    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
        <figure class="poster-box card-banner">
            <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover">
        </figure>
        <div class="title">${title}</div>
        <div class="meta-list">
            <div class="meta-item rating">
                <img src="assets/images/star.png" width="20" height="20" alt="rating" loading="lazy">
                <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="meta-item">
                <div class="badge">${release_date.split("-")[0]}</div>
            </div>
        </div>
        <a href="detail.html" class="card-btn" title="${title}" onclick = getMovieDetails("${id}")></a>
    `;
    return card;
}