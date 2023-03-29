const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const id = params.get('id');
let MovieData;

const detailsEle = document.getElementById('movie-details');


async function onload() {
    const result = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b422a152`);
    MovieData = await result.json();
    console.log(MovieData);
    showDetails(MovieData);
}

function showDetails(movie){
    detailsEle.innerHTML = `
            <div>
            <h3>${movie.Title}</h3>
            <img src="${movie.Poster}">
            </div>
            <div>
            <p>${movie.Actors}</p>
            <p>${movie.Released}</p>
            <p>${movie.Country}</p>
            <p>${movie.Runtime}</p>
            <p>${movie.imdbRating}</p>
            <p>${movie.Plot}</p>
            </div>
        `;
}

function addFav(){
    localStorage.setItem(`${id}`, [MovieData.Title, MovieData.Runtime, MovieData.imdbRating]);
    alert("Added to favourite list")
}

onload();