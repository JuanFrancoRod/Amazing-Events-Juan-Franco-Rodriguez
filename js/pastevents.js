/* let contcards = document.getElementById("eventos")
let eventos =  filtro (data.eventos)
let carta = ``

function agregarCarta(evento) {
    return`<div class="card" style="width: 25rem">
    <img src="${evento.image}" class="card-img-top" alt=""/>
    <div class="card-body d-flex text-center flex-column">
      <div>
        <h5 class="card-title">${evento.name}</h5>
        <p>${evento.description} </p>
      </div>
      <div class="d-flex justify-content-around">
        <p class="card-text">${evento.price}</p>
        <a href="/assets/pages/details.html" class="btn btn-primary">Ver mas...</a>
      </div>
    </div>
  </div>`
}
function filtro(listaDeEventos){
    let fechaFiltro = data.fechaActual
    let filtrarEventos = []
    for(let evento of listaDeEventos){
        if(evento.date < fechaFiltro){
            filtrarEventos.push(evento)
        }
    }return filtrarEventos

}
for( let distintosEventos of eventos){
    carta += agregarCarta(distintosEventos)
} 
contcards.innerHTML = carta; */
const $contcards = document.getElementById("eventos");
const $buscador = document.getElementById("buscador");
const $checkboxs = document.getElementById("checkboxs");
let pastEvent = [];
let eventos1 = [];

console.log($buscador);

//link api https://mindhub-xj03.onrender.com/api/amazing

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((data) => data.json())
  .then((res) => {
    for (let event of res.events) {
      if (event.date < res.currentDate) {
        pastEvent.push(event);
      }
    }
    console.log(pastEvent);
    eventos1 = res.events.filter((evento) => evento.category);
    console.log(eventos1);
    nuevoCheckbox(eventos1, $checkboxs);
    ImprimirCard(pastEvent, $contcards);
    $buscador.addEventListener("input", () => {
      aplicarFiltro();
    });
    $checkboxs.addEventListener("change", () => {
      aplicarFiltro();
    });
  })
  .catch((err) => console.log(err));

//checkbox
function nuevoCheckbox(evento, contenedor) {
  let direccion = (events) => events.category;
  let categoriaEvento = new Set(evento.filter(direccion).map(direccion));
  categoriaEvento.forEach((category) => {
    contenedor.innerHTML += `
    <label class = ""> 
<input type="checkbox" name="evento" value="${category}" id="evento" autocomplete="off" />${category}
</label> 
    `;
  });
}
const prueba = () => {
  console.log("funcion");
};
//cartas
function nuevaCard(eventos) {
  let divCards = document.createElement("DIV");
  divCards.classList = `card`;
  divCards.innerHTML = `
    <img src="${eventos.image}" class="card-img-top" alt=""/>
    <div class="card-body d-flex text-center flex-column">
      <div>
        <h5 class="card-title">${eventos.name}</h5>
        <p>${eventos.description} </p>
      </div>
    </div>
    <div class="d-flex justify-content-around">
        <p class="card-text">${eventos.price}</p>
        <a href="/assets/pages/details.html?id=${eventos._id}" class="btn btn-primary">Ver mas...</a>
      </div>
  </div>`;
  return divCards;
}

//imprimir

function ImprimirCard(eventos1, contenedor) {
  contenedor.innerHTML = "";
  if (eventos1.length > 0) {
    let fragment = document.createDocumentFragment();
    eventos1.forEach((events) => fragment.appendChild(nuevaCard(events)));
    contenedor.appendChild(fragment);
  } else {
    contenedor.innerHTML = "<h3> no hay eventos</h3>";
  }
}

//filtros

function aplicarFiltro() {
  let checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((elemento) => elemento.value);
  let filtroDeEventos;
  if (checked.length == 0) {
    filtroDeEventos = pastEvent;
  } else {
    filtroDeEventos = pastEvent.filter((event) =>
      checked.includes(event.category)
    );
  }

  let filtroPorBuscador = filtroDeEventos.filter((event) =>
    event.name.toLowerCase().includes($buscador.value.toLowerCase())
  );
  console.log(filtroDeEventos);
  ImprimirCard(filtroPorBuscador, $contcards);
}