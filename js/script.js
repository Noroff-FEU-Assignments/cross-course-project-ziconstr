// import { message } from "./components/message.js";

// const resultsContainer = document.querySelector(".posters");
// const postersDrama = document.querySelector(".posters-drama");
// const postersKids = document.querySelector(".posters-kids");
// const postersMenu = document.querySelector(".posters-menu");

// const baseApiUrl = "https://api.noroff.dev/api/v1";
// const endPointUrl = "/square-eyes";

// const url = `${baseApiUrl}${endPointUrl}`;

// async function fetchMovies() {

//     try {
//         const response = await fetch(url);
//         const json = await response.json();
        
//         resultsContainer.innerHTML = "";

//         for (let i = 0; i < json.length; i++) {
            
//             if (json[i].genre === "Action") {
//                 resultsContainer.innerHTML += `<a href="video-page-showing.html?id=${json[i].id}" class="card">
//                                                 <div>
//                                                 <img class="posters-image" src="${json[i].image}" alt="${json[i].title}"/>
//                                                 </div>
//                                                </a>`;
//             }
//             if (json[i].genre === "Drama" || json[i].genre === "Horror") {
//                 postersDrama.innerHTML += `<a href="video-page-showing.html?id=${json[i].id}" class="card">
//                                                 <div>
//                                                 <img class="posters-image" src="${json[i].image}" alt="${json[i].title}"/>
//                                                 </div>
//                                            </a>`;
//             }
//             if (json[i].genre === "Kids" || json[i].genre === "Comedy") {
//                 postersKids.innerHTML += `<a href="video-page-showing.html?id=${json[i].id}" class="card">
//                                                 <div>
//                                                 <img class="posters-image" src="${json[i].image}" alt="${json[i].title}"/>
//                                                 </div>
//                                           </a>`;
//             } 
//         }
//     }
//     catch (error) {
//         postersMenu.innerHTML = message("error", error);
//         }
//     }


// fetchMovies();


