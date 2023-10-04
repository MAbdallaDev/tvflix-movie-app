'use strict'

const apy_key = "b3b01a802266a07ec8966620c3801ec4";
const imageBaseURL = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url , callback , optionalParameters) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data,optionalParameters))
}

export {apy_key , imageBaseURL , fetchDataFromServer};