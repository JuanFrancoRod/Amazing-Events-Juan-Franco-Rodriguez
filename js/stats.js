let allEvents;


const urlFetch = "https://mindhub-xj03.onrender.com/api/amazing";
fetch(urlFetch)
    .then(data => data.json())
    .then((res) => {
      allEvents = res.events;
      console.log(allEvents);

      let fecha = res.currentDate;
      //filtro pasado y futuro
      const eventosPasados = allEvents.filter((evento) => evento.date < fecha);
      console.log(eventosPasados);
      const eventosFuturos = allEvents.filter((evento) => evento.date > fecha);
      console.log(eventosFuturos);

      // imprimir tabla
      function imprimirTabla() {
        
       return `<table class= "tabla">
        <thead>
          <tr>
            <th colspan="3">Event statistics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Events with the highest percentage of attendance</td>
            <td>Events with the lowest percentage of attendance</td>
            <td>Event with larger capacity</td>
          </tr>
          <tr>
            <td>${AsistenciaMaxima(allEvents)}</td>
            <td>${menorAsistencia(allEvents)}</td>
            <td>${capacidadMaxima(allEvents)}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
  
        <thead>
        <tr>
        <th colspan="3">Upcoming events statistics by category</th>
        </tr>
        </thead>
        <tr>
        <td>Categories</td>
        <td>Revenues</td>
        <td>Percentaje of attendance</td>
        </tr>
        <tbody id ="upcomingEvents">
       
          
        </tbody>
  
        <thead>
          <tr>
            <th colspan="3">Past Events statistics by category</th>
          </tr>
        </thead>
        <tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentaje of attendance</td>
        </tr>
        <tbody id = pastEvents>
          
        </tbody>
      </table>`;
      }
        const tableElement = document.getElementById("tableEvents")
        tableElement.innerHTML = imprimirTabla();

      //calcular ingresos
      
        function todasEstadisticas(array) {
          let arrayEstadisticas = array.map((e) => {
              
                return {
                  categoria: e.category,
                  reveneus:
                    e.price * (e.assistance ? e.assistance : e.estimate),
                  porcentajeAsist:
                    ((e.assistance ? e.assistance : e.estimate) * 100) / e.capacity,
                }; 
            })
            return arrayEstadisticas
        }
        let upcomingEstadisticas = todasEstadisticas(eventosFuturos)
        console.log(upcomingEstadisticas)
        let pastEstadisticas = todasEstadisticas(eventosPasados)

        //no repetir estadisticas
        
        function estadisticasFinales(arrayOrigen, arrayEstadisticas) {
            let filtroArray = [... new Set(arrayOrigen.map((evento) => evento.category))].map((categoria) => {
                let aux = arrayEstadisticas.filter((elemento) => elemento.categoria == categoria)

              let acumulado = { categoria: categoria, reveneus: 0, porcentaje: 0, cantidad: 0 }
              
                
                for (const iterator of aux) {
                    acumulado.reveneus += iterator.reveneus
                    acumulado.porcentaje += iterator.porcentajeAsist
                    acumulado.cantidad++
                }
                acumulado.porcentaje = acumulado.porcentaje / acumulado.cantidad
                return acumulado
            })
            return filtroArray
        }
      let upcomingEstadisticasFinales = estadisticasFinales(eventosFuturos, upcomingEstadisticas)
      console.log(upcomingEstadisticasFinales)
      
        let pastEstadisticasFinales = estadisticasFinales(eventosPasados, pastEstadisticas)

        const $upcomingImprimir = document.getElementById("upcomingEvents")
        const $pastImprimir = document.getElementById("pastEvents")

        function estadisticasTabla(array, place) {
            const template = array.reduce((acc, act) => {
                return acc + `<tr>
            <td>${act.categoria}</td>
            <td>${act.reveneus}</td>
            <td>${act.porcentaje.toFixed(2)}%</td>
            </tr>
                `
            }, '')
            place.innerHTML = template
        }
        estadisticasTabla(upcomingEstadisticasFinales, $upcomingImprimir)
        estadisticasTabla(pastEstadisticasFinales, $pastImprimir)
    })
    .catch((err) => console.log(err));

function AsistenciaMaxima(array) {
    let mayorAsistencia = { nombre: "", asistencia: 0 };

    array.forEach((a) => {
        const asistencia = (a.assistance * 100) / a.capacity;
        if (asistencia > mayorAsistencia.asistencia) {
            mayorAsistencia.nombre = a.name;
            mayorAsistencia.asistencia = asistencia;
        }
    });
    return `${mayorAsistencia.nombre}: ${mayorAsistencia.asistencia.toFixed(1)}%`;
}
function menorAsistencia(array) {
    let menorAsistencia = { nombre: "", asistencia: 100 };
    array.forEach((a) => {
        const asistencia = (a.asistencia * 100) / a.capacity;
        if (asistencia < menorAsistencia.asistencia) {
            menorAsistencia.nombre = a.nombre;
            menorAsistencia.asistencia = asistencia;
        }
    });
    return `${menorAsistencia.nombre}: ${menorAsistencia.asistencia.toFixed(2)}%`;

}

function capacidadMaxima(array) {
    let mayorCapacidad = { nombre: "", capacidad: 0 };
    array.forEach((a) => {
        const capacidad = a.capacity;
        if (capacidad > mayorCapacidad.capacidad) {
            mayorCapacidad.nombre = a.name;
            mayorCapacidad.capacidad = capacidad;
        }
    });
    return `${mayorCapacidad.nombre} : ${mayorCapacidad.capacidad.toFixed(0)}capacity`;
    }
