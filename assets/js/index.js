const URL_BASE = 'https://digimon-api.vercel.app/api';
const URL_DIGIMON = URL_BASE + '/digimon';

let digimonContainer;

function cardDigimon(datos) {
  digimonContainer.innerHTML = "";

  for (let digimon of datos) {
    digimonContainer.innerHTML += `
      <div class="card" style="width: 14rem; border: 3px solid #a4beda;">
        <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal${digimon.name}">
        <div class="card-body">
          <h5 class="card-title text-black">${digimon.name}</h5>
          <p class="card-text text-secondary">${digimon.level}</p>
        </div>
      </div>
      <div class="modal fade" id="exampleModal${digimon.name}" tabindex="-1" aria-labelledby="exampleModalLabel${digimon.name}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title w-100 text-center fs-5" id="exampleModalLabel${digimon.name}">${digimon.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <img src="${digimon.img}" alt="${digimon.name}">
            <div class="modal-body text-secondary text-center">
              ${digimon.level}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
  }
}

function cardGallery(datos) {
  digimonContainer.innerHTML = "";

  for (let digimon of datos) {
    digimonContainer.innerHTML += `
      <div class="card" style="width: 18rem; border: 3px solid #a4beda;">
        <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}" title="${digimon.name}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal${digimon.name}">
      </div>
      <div class="modal fade" id="exampleModal${digimon.name}" tabindex="-1" aria-labelledby="exampleModalLabel${digimon.name}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title w-100 text-center fs-5" id="exampleModalLabel${digimon.name}">${digimon.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <img src="${digimon.img}" alt="${digimon.name}">
            <div class="modal-body text-secondary text-center">
              ${digimon.level}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
  }
}

function showGallery() {
  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      cardGallery(datos);
    });
}




function searchName() {
  let nombreDigimon = document.getElementById("inputName").value.toLowerCase();

  if (nombreDigimon === "") {
    fetch(URL_DIGIMON)
      .then(response => response.json())
      .then(datos => {
        cardDigimon(datos);
      });
  } else {
    fetch(URL_DIGIMON + '/name/' + nombreDigimon)
      .then(response => response.json())
      .then(datos => {
        cardGallery(datos);
      });
  }
}



function sortByLevel(level) {
  fetch(URL_DIGIMON + '/level/' + level)
    .then(response => response.json())
    .then(datos => {
      cardDigimon(datos);
    });
}

function sortByAllLevel(orden) {

  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      if (orden === 'desc') {
        datos.sort((a, b) => {
          if (a.level > b.level) {
            return -1;
          } else if (a.level < b.level) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        datos.sort((a, b) => {
          if (a.level < b.level) {
            return -1;
          } else if (a.level > b.level) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      cardDigimon(datos);
    });
}


function sortByName(orden) {

  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      if (orden === 'desc') {
        datos.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        datos.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      cardDigimon(datos);
    });
}



$(document).ready(function () {
  digimonContainer = document.getElementById("digimonContainer");

  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      cardDigimon(datos);
    });

});
