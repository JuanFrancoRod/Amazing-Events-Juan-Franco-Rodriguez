let urlParams = location.search
let params = new URLSearchParams(urlParams)
let id = params.get("id")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
        // Manipula los datos obtenidos de la API
        const eventoSeleccionado = data.events.find(evento => evento._id == id);

        const contenedorEventoSeleccionado = document.getElementById("evento-seleccionado");

        contenedorEventoSeleccionado.innerHTML = mostrarEventoSeleccionado(eventoSeleccionado);
    })
    .catch(error => {
        console.error(error);
    });

// Crear la plantilla HTML correspondiente con la información del evento
function mostrarEventoSeleccionado(eventoSeleccionado) {
    return ` <img src=${eventoSeleccionado.image}">
        <div>
            <h4>${eventoSeleccionado.name}</h4>
            <p>${eventoSeleccionado.date}</p>
            <p>${eventoSeleccionado.category}</p>
            <p>${eventoSeleccionado.place}</p>
            <p>${eventoSeleccionado.capacity}</p>
            <p>${eventoSeleccionado.assistance}</p>
            <p${eventoSeleccionado.price}</p>
            <p>${eventoSeleccionado.description}</p>
        </div> `;
}