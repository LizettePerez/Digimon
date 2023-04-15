const URL_BASE = 'https://digimon-api.vercel.app/api';
const URL_DIGIMON = URL_BASE + '/digimon';

let contenido;

function tabla(datos) {
  contenido.innerHTML = "";

  for (let digimon of datos) {

    contenido.innerHTML += `
          <th scope="row">${digimon.name}</ th> 
          <td><img width="100px" height="100px" src="${digimon.img}" alt="${digimon.name}"></td> 
          <td>${digimon.level}</td>
      </tr> `;
  }
}

function tarjeta(data) {
  carta.innerHTML = "";

  for (let digimon of data) {
    carta.innerHTML += ` 
        <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${digimon.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${digimon.name}</h5>
        <p class="card-text">${digimon.level}</p>
       </div>
    </div>
  </div>
</div>
   `
  }
}



function searchName() {
  let nombreDigimon = document.getElementById("inputName").value.toLowerCase();
  document.getElementById("tabla_principal").style.display = "none";



  if (nombreDigimon === "") {
    fetch(URL_DIGIMON)
      .then(response => response.json())
      .then(datos => {
        tabla_principal.style.display = "table";
        tabla(datos);
        carta.style.display = "none";
      });
  } else {
    fetch(URL_DIGIMON + '/name/' + nombreDigimon)
      .then(response => response.json())
      .then(datos => {
        tarjeta(datos);
      });
  }
}

function searchLevel() {
  let levelDigimon = document.getElementById("inputLevel").value.toLowerCase();

  if (levelDigimon === "") {
    fetch(URL_DIGIMON)
      .then(response => response.json())
      .then(datos => {
        tabla(datos);
      });
  } else {
    fetch(URL_DIGIMON + '/level/' + levelDigimon)
      .then(response => response.json())
      .then(datos => {
        tabla(datos);
      });
  }
}

function sortByName(order) {
  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      if (order === "asc") {
        datos.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "desc") {
        datos.sort((a, b) => b.name.localeCompare(a.name));
      }
      tabla(datos);
    });
}

sortByName("asc"); // Ordenar por nombre de forma ascendente
sortByName("desc"); // Ordenar por nombre de forma descendente



$(document).ready(function () {
  contenido = document.getElementById("contenido");
  carta = document.getElementById("carta");

  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tabla(datos);
    });

});
