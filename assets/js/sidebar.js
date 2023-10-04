'use strict'

import { apy_key , fetchDataFromServer } from "./api.js";

export function sidebarFun () {
   const genreList = {};

   fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apy_key}`,function({genres}) {
   for(const {id , name} of genres) {
         genreList[id] = name;
      }
      // console.log(genreList)
      generLink();
   })

   const sidebarInner = document.createElement("div");
   sidebarInner.classList.add("inner-sidebar");
   sidebarInner.innerHTML = `
      <ul class="sidebar-list">
         <li class="title">Genre</li>
      </ul>
      <ul class="sidebar-list">
         <li class="title">Language</li>
         <li>
            <a href="./movie-list.html" class="sidebar-link" onclick=getMovieList("with_original_language=en","English") sidebar-link ">English</a>
         </li>
         <li>
            <a href="./movie-list.html" class="sidebar-link" onclick=getMovieList("with_original_language=hi","Hindi") sidebar-link >Hindi</a>
         </li>
         <li>
            <a href="./movie-list.html" class="sidebar-link" onclick=getMovieList("with_original_language=bn","Bengali") sidebar-link ">Bengali</a>
         </li>
      </ul>
   `



   const generLink = function () {
      const listOfNames = [...Object.values(genreList)]
         // console.log(genreList)
      // for (let i = 0; i < listOfNames.length; i++) {
      //    const sidebarLinkWrapper = document.createElement("li");
      //    const sidebarLink = document.createElement("a");
      //    sidebarLink.classList.add("sidebar-link");
      //    sidebarLink.setAttribute("href","./movie-list.html");
      //    sidebarLink.setAttribute("menu-close","");
      //    sidebarLink.innerHTML = listOfNames[i];
      //    sidebarLink.setAttribute("onclick",`getMovieList("with-geners=${generID}","${genreName}")`)
      //    sidebarLinkWrapper.appendChild(sidebarLink)

      //    sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(sidebarLinkWrapper)
      // }
      for(const [generId , genreName] of Object.entries(genreList)) {
         const sidebarLinkWrapper = document.createElement("li");
         const sidebarLink = document.createElement("a");
         sidebarLink.classList.add("sidebar-link");
         sidebarLink.setAttribute("href","./movie-list.html");
         sidebarLink.setAttribute("menu-close","");
         sidebarLink.innerHTML = genreName;
         sidebarLink.setAttribute("onclick",`getMovieList("with_genres=${generId}","${genreName}")`)
         sidebarLinkWrapper.appendChild(sidebarLink)
         sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(sidebarLinkWrapper)
         // console.log(sidebarLink)
      }
      const sidebar = document.querySelector("[sidebar]");
      sidebar.insertBefore(sidebarInner, document.querySelector(".sidebar-footer"));
      // sidebar.appendChild(sidebarInner);

      togglerSidebar(sidebar);
   }

   const togglerSidebar = (sidebar)=> {
      const sidebarBtn = document.querySelector(".menu-btn");
      const sidebarToggler = document.querySelectorAll("[menu-toggler]");
      const sidebarClose = document.querySelectorAll("[menu-close]")
      const overlay = document.querySelector("[overlay]")
      addEventOnElement(sidebarToggler , "click" , ()=> {
         sidebar.classList.toggle("active")
         sidebarBtn.classList.toggle("active")
         overlay.classList.toggle("active")
      })

      addEventOnElement(sidebarClose , "click" , ()=> {
         sidebar.classList.remove("active")
         sidebarBtn.classList.remove("active")
         overlay.classList.remove("active")
      })
   }
}