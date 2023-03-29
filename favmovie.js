function favList() {
    const listEle = document.getElementById('fav-movie-list');
    let list = [];

    function getFavMovieList() {
        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i);
            if (!list.includes(id)) {
                list.push(id);
                getDetails(id);
            }
        }
    }

    getFavMovieList();

    async function getDetails(id) {
        const result = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b422a152`);
        const movieData = await result.json();
        showData(movieData);
    }

    function showData(data) {
        let movieListItem = document.createElement('div');
        movieListItem.classList.add("list-item")
        movieListItem.innerHTML = `
        <ul>
            <li><h2>${data.Title}</h2></li>
            <li>Director: ${data.Director}</li>
            <li>Actors: ${data.Actors}</li>
            <li>Release Date: ${data.Released}</li>
            <li>Runtime: ${data.Runtime}</li>
            <button id="${data.imdbID}">Delete</button>
        </ul>
    `;
        movieListItem.dataset.id = data.imdbID;
        listEle.appendChild(movieListItem);
        // deleteElefun();
        getFavMovieList();
    }

    document.addEventListener('click', async function (event) {
        localStorage.removeItem(event.target.id);
        this.location.reload();
    })

}



favList();





