'use strict';

console.log('>> Ready :)');


let showsContainer = document.querySelector('.js-shows-container');

let shows = [];
const favoritesShows = [];

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
        })
        .catch(function (err) {
            console.log("Error al traer los datos del servidor", err);
        });
}


function paintShows() {

    let htmlCode = '';

    for (let i = 0; i < shows.length; i++) {
        htmlCode += `<div class="shows__item js-shows-item" id="${i}">`;
        htmlCode += `<h2 class="shows__name">${shows[i].show.name}</h2>`;
        htmlCode += `<img class="shows__photo" src="${shows[i].show.image}" />`;
        htmlCode += `Géneros: ${shows[i].show.genders}<br>`;
        htmlCode += `Fecha: ${shows[i].show.premiered}`;
        htmlCode += `</div>`;
    }

    showsContainer.innerHTML = htmlCode;
}


btn.addEventListener('click', getServerData);

getServerData();