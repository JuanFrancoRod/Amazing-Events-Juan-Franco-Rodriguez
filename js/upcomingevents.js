let contcards = document.getElementById("eventos")
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
        if(evento.date > fechaFiltro){
            filtrarEventos.push(evento)
        }
    }return filtrarEventos

}
for( let distintosEventos of eventos){
    carta += agregarCarta(distintosEventos)
} 
contcards.innerHTML = carta;