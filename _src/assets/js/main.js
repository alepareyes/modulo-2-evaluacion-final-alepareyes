'use strict';

console.log('>> Ready :)');


let showsContainer = document.querySelector('.js-shows-container');
let favShowsContainer = document.querySelector('.js-favshows-container');

let shows = [];
let favoritesShows = [];

const btn = document.querySelector('.js-btn');



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


function paintShows() {

    let htmlCode = '';

    for (let i = 0; i < shows.length; i++) {

        const imgDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;


        htmlCode += `<div class="shows__item js-shows-item" id="${shows[i].show.id}">`;
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

    let htmlCode = '';

    for (let i = 0; i < favoritesShows.length; i++) {

        const imgDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;

        htmlCode += `<div class="shows__item js-shows-item" id="${favoritesShows[i].show.id}">`;
        htmlCode += `<h2 class="shows__name">${favoritesShows[i].show.name}</h2>`;

        if (favoritesShows[i].show.image === null) {
            htmlCode += `<img class="shows__photo" src="${imgDefault}" />`
        } else {
            const img = favoritesShows[i].show.image.medium;
            htmlCode += `<img class="shows__photo" src="${img}" />`;
        }

        htmlCode += `Género: ${favoritesShows[i].show.genres}<br>`;
        htmlCode += `Fecha: ${favoritesShows[i].show.premiered}`;
        htmlCode += `</div>`;
    }
    favShowsContainer.innerHTML = htmlCode;
}



function addToFavorites(ev) {

    const clickedId = parseInt(ev.currentTarget.id);

    for (let i = 0; i < shows.length; i++) {
        if (clickedId === shows[i].show.id) {
            favoritesShows.push(shows[i]);
        } else {
        }
    }
    console.log(clickedId, favoritesShows);

    paintFavShows();
}


function listenShows() {
    const showsItems = document.querySelectorAll(".js-shows-item");
    for (const showsItem of showsItems) {
        showsItem.addEventListener('click', addToFavorites);
    }
}


function forSearch(ev) {
    ev.preventDefault();
    getServerData();
}


btn.addEventListener('click', forSearch);

