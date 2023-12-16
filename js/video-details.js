import { message } from "./components/message.js";
const detailContainer = document.querySelector(".movie-details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id + "?key=352ba432-5b5d-4ccc-9aba-f2704c500cf3";

async function fetchMovie() {

    try {
        const response = await fetch(url);
        const details = await response.json();
        createHtml(details);
      
    }
    catch(error) {
        detailContainer.innerHTML = message("error", error);
    }
    
}

fetchMovie();

function createHtml(details) {
    detailContainer.innerHTML = `<div class="film-show" style="background-image: url('${details.image}')"></div>
                                 <div class="film-name"><h1>${details.title}</h1>
                                    <button class="buy">
                                        <a href="checkout-page.html">BUY</a>
                                    </button>
                                 <div class="trailer">
                                    <h3><i class="fa-brands fa-imdb"></i> ${details.rating} | ${details.genre} | ${details.released}</h3>
                                        <p>${details.description}<br />
                                            <span class="price">${details.price} $</span>
                                        </p>
                                        </div>
                                 </div>`;
}








// const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";

// const getMovieText = document.querySelectorAll(".movieText");

// async function getMovies() {
//   const response = await fetch(squareEyesAPI);
//   const result = await response.json();
//   return result;
// }



// async function displayMovies() {
//   const movies = await getMovies();
//   const moviesContainer = document.getElementById("movies_container");
//   console.log(moviesContainer.outerHTML);

//   for (i = 0; i < movies.length; i++) {
//     const movie = movies[i];


//     if (movie.onSale){
//         const movieDiv = document.createElement("div");
//         movieDiv.classList.add("movie");

//         const image = document.createElement("img");
//         image.srt = movie.image;
//         image.alt = movie.description;

//         const movieText = document.createElement("p");
//         movieText.classList.add("container-movies");
//         movieText.innerHTML = `${movie.tittle} <span class="movieSale">${movie.price} </span>  $${movie.discountedPrice}`;

//         const button = document.createElement("a");
//         button.href = "#";
//         button.classList.add("button");
//         button.textContent = "Add to bag";

//         moviesContainer.appendChild(image);
//         moviesContainer.appendChild(movieText);
//         moviesContainer.appendChild(button);
        

//     }
//   }
// }


// displayMovies ();




//   // for (let i = 0; i < result.length; i++) {
//   //   console.log(result[i]);
//   // }

//   // for (let i = 0; i < getMovieText.length; i++) {
//   //   let moviesOnSale = result[i].onSale;

//   //   getMovieText[i].innerHTML = ` ${result[i].tittle} $${result[i].price}`;

//   //   if (moviesOnSale === true) {
//   //     result[i].price = getMovieText[
//   //       i
//   //     ].innerHTML = `${result[i].tittle} <span class="moviesale">${result[i].price} </span> $${result}
//   //   } 
//   // }