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
function registrar(mensaje, nivel = 'info') {
    if (!_DEBUGMODE) {
        return;
    }

    switch (nivel) {
        case 'error':
            console.error(mensaje);
            break;
        case 'warn':
            console.warn(mensaje);
            break;
        default:
            console.log(mensaje);
    }
}

function generarParte(incidente, asignados) {
    return `
──────── PARTE DE INCIDENTE ────────
ID: ${incidente.id}
Descripción: ${incidente.descripcion}
Gravedad: ${incidente.gravedad}/5
Recursos asignados: ${asignados}
Recursos restantes: ${recursosDisponibles}
────────────────────────────────────`;
}

function calcularRecursos(gravedad) {
    if (gravedad === 5) {
        return 2;
    }
    return 1;
}

function procesarIncidente(incidente) {
    const necesarios = calcularRecursos(incidente.gravedad);
    const asignados = Math.min(necesarios, recursosDisponibles);
    recursosDisponibles -= asignados;

    switch (incidente.gravedad) {
        case 5:
            registrar(`ALERTA MÁXIMA Incidente #${incidente.id}: ${incidente.descripcion}`, 'error');
            break;
        case 4:
        case 3:
            registrar(`Prioridad alta: #${incidente.id}`, 'warn');
            break;
        default:
            registrar(`Prioridad baja: #${incidente.id}`);
    }

    registrar(generarParte(incidente, asignados));
}

function iniciarSimulacion() {
    registrar(`Iniciando Eme-JS | Incidentes en cola: ${loteIncidentes.length} | Recursos: ${recursosDisponibles}`);

    for (let i = 0; i < loteIncidentes.length; i++) {
        const incidente = loteIncidentes[i];

        if (incidente.resuelta === true) {
            registrar(`Incidente #${incidente.id} ya resuelto. Se ignora.`);
            continue;
        }

        if (recursosDisponibles <= 0) {
            registrar(`Sin recursos disponibles. Sistema detenido en el incidente #${incidente.id}.`, 'error');
            break;
        }

        procesarIncidente(incidente);
    }

    registrar(`Fin de la simulación. Recursos finales: ${recursosDisponibles}`);
}

iniciarSimulacion();