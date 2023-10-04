// Important notes take it from tvflix project
"use strict";

// add event to multi elements

const addEventOnElement = function (element , eventType , callback) {
    element.forEach(ele => {
        ele.addEventListener(eventType , callback)
    });
}