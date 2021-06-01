'use strict';

// Fetch Starships
fetch ('https://swapi.dev/api/starships')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
})
.catch(function(error) {
    console.error("ERROR: ", error);
});

//Fetch Films

fetch ('https://swapi.dev/api/films')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    populateMovies(data);
    console.log(data);
})
.catch(function(error) {
    console.error("ERROR: ", error);
});

document.addEventListener('DOMContentLoaded', function() {
    const starshipSearch = document.querySelector('#starshipSearch');

    starshipSearch.addEventListener('submit', function(event){
        event.preventDefault();
        const starshipInput = document.querySelector('#starshipInput')
        searchShips(starshipInput.value);
    })
})

function searchShips(shipName) {
    console.log("searching for: ", shipName);
    fetch(`https://swapi.dev/api/starships/?search=${shipName}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        if (data.count > 0) {
            shipResults(data);
        }
        console.log(data);
    })
    .catch(function(error) {
        console.error("ERROR: ", error);
        return error;
    })
}

function shipResults(data) {
    const shipSearchResults = data.results;
    const shipResultsDiv = document.querySelector('#starshipContainer');

    shipSearchResults.forEach(function(result) {
        const shipName = document.createElement('p');
        shipName.innerText = `Name: ${result.name}`;
        shipResultsDiv.appendChild(shipName);

        const manufacturer = document.createElement('p');
        manufacturer.innerText = `Manufacturer: ${result.manufacturer}`;
        shipResultsDiv.appendChild(manufacturer);

        const model = document.createElement('p');
        model.innerText = `Model: ${result.model}`;
        shipResultsDiv.appendChild(model);
    })
}

function populateMovies(data) {
    const movieListForm = document.querySelector('#filmSearch');
    const selectElement = document.createElement('select');
    data.results.forEach(function(movie) {
        const movieOptionEl = document.createElement('option');
        movieOptionEl.value = movie.title;
        movieOptionEl.text = movie.title;
        selectElement.appendChild(movieOptionEl);
    });
    movieListForm.appendChild(selectElement);

    selectElement.addEventListener('change', function(event){
        const movieName = event.target.value;
        fetchMovieInfo(movieName);
    })
}

function fetchMovieInfo(movieName) {
    console.log(movieName);
    fetch (`https://swapi.dev/api/films/?search=${movieName}`)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        movieResults(data);
        
    })
}

function movieResults(data) {
    console.log(data.title)
    console.log(data.results)
    const movieResultsDiv = document.querySelector('#filmContainer');
    const movieSearchResults = data.results;

    movieSearchResults.forEach(function(result) {
        const movieName = document.createElement('p');
        movieName.innerText = `${result.title}`;
        movieName.classList.add('movieName')
        movieResultsDiv.appendChild(movieName);

        const episodeNumber = document.createElement('p');
        episodeNumber.innerText =`${result.episode_id}`;
        episodeNumber.classList.add('episodeNumber')
        movieResultsDiv.appendChild(episodeNumber);

        const releaseDate = document.createElement('p');
        releaseDate.innerText = `${result.release_date}`;
        movieResultsDiv.appendChild(releaseDate);

        const movieDescription = document.createElement('p');
        movieDescription.innerText = `${result.opening_crawl}`;
        movieDescription.classList.add('movieDescription')
        movieResultsDiv.appendChild(movieDescription);

        
    })






}
