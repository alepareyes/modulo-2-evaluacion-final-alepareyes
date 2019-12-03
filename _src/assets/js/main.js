'use strict';


let showsContainer = document.querySelector('.js-shows-container');
let favShowsContainer = document.querySelector('.js-favshows-container');

let shows = [];
let favoritesShows = [];

const btn = document.querySelector('.js-btn');



function setLocalStorage() {
    localStorage.setItem("favoritesShows", JSON.stringify(favoritesShows));
}

function getLocalStorage() {
    const localStorageFavoritesShowsJSON = localStorage.getItem("favoritesShows");
    const localStorageFavoritesShows = JSON.parse(localStorageFavoritesShowsJSON);

    if (localStorageFavoritesShows !== null) {
        favoritesShows = localStorageFavoritesShows;
        paintFavShows();
        listenShows();
    }
}





function getServerData() {

    const search = document.querySelector('.js-input').value;

    let url = `http://api.tvmaze.com/search/shows?q=${search}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            shows = data;
            console.log(shows);
            paintShows();
            listenShows();
        })
        .catch(function (err) {
            console.log("Error al traer los datos del servidor", err);
        });
}



function addToFavorites(ev) {

    const clickedId = parseInt(ev.currentTarget.id);
    const index = favoritesShows.findIndex(function (show, index) {
        return show.id === clickedId;
    });

    const isFavorite = index !== -1;

    if (isFavorite === true) {
        favoritesShows.splice(index, 1);
    } else {
        for (let i = 0; i < shows.length; i++) {
            if (shows[i].show.id === clickedId) {
                favoritesShows.push(shows[i].show);
            }
        }
    }
    console.log(index)
    console.log(favoritesShows);
    paintShows();
    listenShows();
    paintFavShows();
    setLocalStorage();

    const eraseAll = document.querySelector('.reset');
    function resetFavs() {
        favoritesShows.splice(0, favoritesShows.length);
        setLocalStorage();
        paintShows();
        paintFavShows();
        listenShows();
    }

    eraseAll.addEventListener('click', resetFavs);
}


function paintShows() {

    let htmlCode = '';

    for (let i = 0; i < shows.length; i++) {

        const favoriteIndex = favoritesShows.indexOf(i);
        const isFavorite = favoriteIndex !== -1;

        const imgDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;

        if (isFavorite === true) {
            htmlCode += `<div class="shows__item--favorite" id="${shows[i].show.id}">`;
        } else {
            htmlCode += `<div class="shows__item js-shows-item " id="${shows[i].show.id}">`;
        }

        htmlCode += `<h2 class="shows__name">${shows[i].show.name}</h2>`;
        if (shows[i].show.image === null) {
            htmlCode += `<img class="shows__photo" src="${imgDefault}" />`
        } else {
            const img = shows[i].show.image.medium;
            htmlCode += `<img class="shows__photo" src="${img}" />`;
        }

        htmlCode += `Género: ${shows[i].show.genres}<br>`;
        htmlCode += `Fecha: ${shows[i].show.premiered}`;
        htmlCode += `</div>`;
    }
    showsContainer.innerHTML = htmlCode;
}


function paintFavShows() {
    let htmlFav = '';

    for (let i = 0; i < favoritesShows.length; i++) {

        const imgDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;

        htmlFav += `<div class="shows__item--favorite shows__name" id="${favoritesShows[i].id}">`;
        htmlFav += `<i class="far fa-times-circle js-xbtn" id="${favoritesShows[i].id}"></i>`
        htmlFav += `<h2 class="shows__name">${favoritesShows[i].name}</h2>`;

        if (favoritesShows[i].image === null) {
            htmlFav += `<img class="shows__photo---fav" src="${imgDefault}" />`
        } else {
            const img = favoritesShows[i].image.medium;
            htmlFav += `<img class="shows__photo---fav" src="${img}" />`;
        }

        htmlFav += `</div>`;
    }

    favShowsContainer.innerHTML = htmlFav;
    listenRemove();
}




function listenShows() {
    const showsItems = document.querySelectorAll(".js-shows-item");
    for (const showsItem of showsItems) {
        showsItem.addEventListener('click', addToFavorites);
    }
}

function listenRemove() {
    const icons = document.querySelectorAll('.js-xbtn')
    for (const icon of icons) {
        icon.addEventListener('click', addToFavorites);
    }
}

getLocalStorage();
btn.addEventListener('click', getServerData);
