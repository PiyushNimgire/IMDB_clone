// https://www.omdbapi.com/?s=thor&apikey=b422a152

const movieSearchBox = document.getElementById('search-box');
const movieListEle = document.getElementById('movie-list');

const movieId = {
    id : ""
}

movieSearchBox.addEventListener("keyup", findMovies);

async function loadMovies(searchTerm){
    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=b422a152`
    let response = await fetch(`${url}`);
    let data = await response.json();
    if(data.Response == "True"){
        displayMovieList(data.Search);
    }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        loadMovies(searchTerm);
    }
}



function displayMovieList(movieList){
    
    movieListEle.innerHTML = "";
    for(let i=0; i<movieList.length; i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movieList[i].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movieList[i].Poster != "N/A"){
            moviePoster = movieList[i].Poster;
        }else {
            moviePoster = "image_not_found.png";
        }

        movieListItem.innerHTML = `
            <div>
                <img src= ${moviePoster}>
            </div>
            <div>
                <h3>${movieList[i].Title}</h3>
                <p>${movieList[i].Year}</p>
            </div>
        `;

        movieListEle.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = document.querySelectorAll(".search-list-item");
    searchListMovies.forEach((movie) => {
        movie.addEventListener('click', async function (){
            movieId.id = movie.dataset.id;
            const queryString = new URLSearchParams(movieId).toString();
            const url = `movie.html?${queryString}`;
            window.location.href = url;
        })
    })
}


