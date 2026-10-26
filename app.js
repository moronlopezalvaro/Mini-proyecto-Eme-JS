'use strict';

// configuracion
const _DEBUGMODE = true;
let recursosDisponibles = 4;

// lote de incidentes
const loteIncidentes = [
    { id: 101, descripcion: "Gato atrapado en un árbol", gravedad: 1, resuelta: false },
    { id: 102, descripcion: "Falsa alarma de humo en local", gravedad: 2, resuelta: true },
    { id: 103, descripcion: "Incendio estructural en bloque de viviendas", gravedad: 5, resuelta: false },
    { id: 104, descripcion: "Contenedor ardiendo en la vía pública", gravedad: 3, resuelta: false },
    { id: 105, descripcion: "Inundación leve de un sótano", gravedad: 2, resuelta: true },
    { id: 106, descripcion: "Accidente de tráfico múltiple en la A-4", gravedad: 5, resuelta: false },
    { id: 107, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, resuelta: false }
];

// funciones
function calcularRecursos(gravedad) {
    if (gravedad === 5) {
        return 2;
    }
    return 1;
}

function procesarIncidente(incidente) {
    const necesarios = calcularRecursos(incidente.gravedad);
    const asignados = Math.min(necesarios, recursosDisponibles);

    switch (incidente.gravedad) {
        case 5:
            console.error(`🚨 ALERTA MÁXIMA 🚨 Incidente #${incidente.id}: ${incidente.descripcion}`);
            break;
        case 4:
        case 3:
            console.warn(`⚠️ Prioridad alta: #${incidente.id} - ${incidente.descripcion}`);
            break;
        default:
            console.log(`ℹ️ Prioridad baja: #${incidente.id} - ${incidente.descripcion}`);
    }

    recursosDisponibles -= asignados;
    console.log(`Recursos asignados: ${asignados} | Recursos restantes: ${recursosDisponibles}`);
}

function iniciarSimulacion() {
    for (let i = 0; i < loteIncidentes.length; i++) {
        const incidente = loteIncidentes[i];

        if (incidente.resuelta === true) {
            console.log(`Incidente #${incidente.id} ya resuelto. Se ignora.`);
            continue;
        }

        if (recursosDisponibles <= 0) {
            console.error(`Sin recursos disponibles. Sistema detenido en el incidente #${incidente.id}.`);
            break;
        }

        procesarIncidente(incidente);
    }

    console.log(`Fin de la simulación. Recursos finales: ${recursosDisponibles}`);
}

iniciarSimulacion();