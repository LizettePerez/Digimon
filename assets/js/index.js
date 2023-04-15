const URL_BASE = 'https://rickandmortyapi.com/api';
const URL_CHARACTERS = URL_BASE + '/character';

let contenido;

function capturarDato() {

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

  fetch(URL_CHARACTERS)
    .then(response => response.json())
    .then(datos => {
      tabla(datos.results);
    });

});
