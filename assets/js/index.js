const URL_BASE = 'https://digimon-api.vercel.app/api';
const URL_DIGIMON = URL_BASE + '/digimon';

let contenido;

function tabla(datos) {
  contenido.innerHTML = "";

  for (let digimon of datos) {
    const row = document.createElement("tr");

    row.innerHTML += `
          <th scope="row">${digimon.name}</ th> 
          <td><img width="100px" height="100px" src="${digimon.img}" alt="${digimon.name}"></td> 
          <td>${digimon.level}</td>
      </tr> `;
    row.addEventListener("click", function () {
      goToDigimonPerfil(digimon.name);
    });
    contenido.appendChild(row);
  }
}

function goToDigimonPerfil(digimonName) {
  let digimonPerfilURL = "./digimon-perfil.html?name=" + digimonName;
  window.location.href = digimonPerfilURL;
}


$(document).ready(function () {
  contenido = document.getElementById("contenido");

  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tabla(datos);
    });

});
