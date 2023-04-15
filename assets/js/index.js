const URL_BASE = 'https://rickandmortyapi.com/api';
const URL_CHARACTERS = URL_BASE + '/character';

let contenido;
let carta;

function tarjeta(data) {
  carta.innerHTML = "";

  for (let temp of data) {
    carta.innerHTML +=
      `
      <div class="card" style="width: 18rem;">
        <img src="${temp.image}" alt="${temp.name}" title="${temp.name}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${temp.name}</h5>
          <p class="card-text">ESPECIE: ${temp.species}</p>
        </div>
      </div>
    `;
  }
}

function capturarDato() {
  let nombrePersonaje = document.getElementById("dato").value;
  nombrePersonaje = nombrePersonaje.toLowerCase();
  document.getElementById("tabla-principal").style.display = "none";
  document.getElementById("carta").style.display = "block";

  fetch(URL_CHARACTERS + '/?name=' + nombrePersonaje)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tarjeta(datos.results);
    });
}

function tabla(datos) {
  contenido.innerHTML = "";

  for (let temp of datos) {
    contenido.innerHTML += `<tr>
      <th scope="row">${temp.name}</th>
      <td><img src="${temp.image}" alt="${temp.name}" title="${temp.name}" width="100" height="100"></td>
      <td>${temp.species}</td>
    </tr>`;
  }
}

$(document).ready(function () {
  contenido = document.getElementById("contenido");
  carta = document.getElementById("carta");

  fetch(URL_CHARACTERS)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tabla(datos.results);
    });

});
