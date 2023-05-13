let contenido = document.getElementById("contenido");
let datos;

fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(data => {
        datos = data;
        console.log(datos);
        tabla(datos);
    });

function tabla(objetos) {
    contenido.innerHTML = "";

    for (let objeto of objetos) {
        contenido.innerHTML += `<tr>
      <th scope="row">${objeto.name}</th>
      <td><img src="${objeto.img}" alt="${objeto.name}" style="width: 50px; height: auto;"></td>
      <td>${objeto.level}</td>
    </tr>`;
    }

    let imagenes = contenido.getElementsByTagName("img");
    for (let imagen of imagenes) {
        imagen.addEventListener("click", function (event) {
            event.stopPropagation();

            let imgGrande = document.createElement("img");
            imgGrande.src = event.target.src.replace("small", "large");
            imgGrande.style.maxHeight = "80%";
            imgGrande.style.maxWidth = "80%";
            imgGrande.style.margin = "auto";


            let nombreDigimon = document.createElement("div");
            nombreDigimon.innerText = event.target.alt;
            nombreDigimon.style.fontWeight = "bold";
            nombreDigimon.style.textAlign = "center";
            nombreDigimon.style.fontSize = "1.5em";

            let nivelDigimon = document.createElement("div");
            nivelDigimon.innerText = datos.find(digimon => digimon.img === event.target.src).level;
            nivelDigimon.style.textAlign = "center";
            nivelDigimon.style.fontSize = "1em";


            let fondo = document.createElement("div");
            fondo.style.position = "fixed";
            fondo.style.top = "50%";
            fondo.style.left = "50%";
            fondo.style.transform = "translate(-50%, -50%)";
            fondo.style.width = "30vw";
            fondo.style.height = "60vh";
            fondo.style.backgroundColor = "white";
            fondo.style.border = "3px solid black";
            fondo.style.display = "flex";
            fondo.style.flexDirection = "column";
            fondo.style.alignItems = "center";
            fondo.style.padding = "10px";
            fondo.appendChild(nombreDigimon);
            fondo.appendChild(nivelDigimon);
            fondo.appendChild(imgGrande);

            document.body.appendChild(fondo);

            fondo.addEventListener("click", function () {
                fondo.remove();
            });
        });
    }
}

contenido.addEventListener("click", function (event) {

    if (event.target.closest("#contenido") !== null) {
        tabla(datos);
    }
});

document.getElementById("buscar-btn").addEventListener("click", function () {
    const searchTerm = document.getElementById("search-input").value;
    const digimon = datos.find(digimon => digimon.name.toLowerCase() === searchTerm.toLowerCase());

    if (digimon) {
        const digimonesFiltrados = datos.filter(objeto => objeto.name.toLowerCase() === searchTerm.toLowerCase());
        tabla(digimonesFiltrados);
    } else {
        alert("No se encontró el Digimon buscado");
    }
});