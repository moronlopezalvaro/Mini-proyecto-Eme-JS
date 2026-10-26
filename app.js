// @ts-check
'use strict';

/**
 * Representa una incidencia recibida en la central de emergencias.
 * @typedef {object} Incidente
 * @property {number} id Identificador único de la incidencia.
 * @property {string} descripcion Descripción breve de la emergencia.
 * @property {number} gravedad Nivel de gravedad, de 1 (leve) a 5 (máxima).
 * @property {boolean} resuelta Indica si la incidencia ya ha sido resuelta.
 */

// configuracion
/**
 * Interruptor global de depuración. Si es false, no se muestra nada por consola.
 * @type {boolean}
 */
const _DEBUGMODE = true;

/**
 * Número de recursos (ambulancias/camiones) disponibles en el parque.
 * @type {number}
 */
let recursosDisponibles = 4;

// lote de incidentes
/**
 * Lote de incidencias pendientes de procesar.
 * @type {Incidente[]}
 */
const loteIncidentes = [
    { id: 101, descripcion: "Gato atrapado en un árbol", gravedad: 1, resuelta: false },
    { id: 102, descripcion: "Falsa alarma de humo en local", gravedad: 2, resuelta: true },
    { id: 103, descripcion: "Incendio estructural en bloque de viviendas", gravedad: "5", resuelta: false },
    { id: 104, descripcion: "Contenedor ardiendo en la vía pública", gravedad: 3, resuelta: false },
    { id: 105, descripcion: "Inundación leve de un sótano", gravedad: 2, resuelta: true },
    { id: 106, descripcion: "Accidente de tráfico múltiple en la A-4", gravedad: 5, resuelta: false },
    { id: 107, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, resuelta: false }
];

// funciones
/**
 * Muestra un mensaje por consola solo si el modo depuración está activo.
 * @param {string} mensaje Texto que se mostrará por consola.
 * @param {'info'|'warn'|'error'} [nivel='info'] Nivel del mensaje, que determina el método de consola usado.
 * @returns {void}
 */
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

/**
 * Genera el parte formateado de un incidente atendido.
 * @param {Incidente} incidente Incidencia atendida.
 * @param {number} asignados Recursos asignados a la incidencia.
 * @returns {string} Parte del incidente listo para mostrarse por consola.
 */
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

/**
 * Calcula cuántos recursos necesita una incidencia según su gravedad.
 * @param {number} gravedad Nivel de gravedad de la incidencia (1-5).
 * @returns {number} Recursos necesarios: 2 si la gravedad es 5, 1 en cualquier otro caso.
 */
function calcularRecursos(gravedad) {
    if (gravedad === 5) {
        return 2;
    }
    return 1;
}

/**
 * Atiende una incidencia: asigna recursos, emite la alerta según su gravedad y muestra el parte.
 * @param {Incidente} incidente Incidencia no resuelta que se va a atender.
 * @returns {void}
 */
function procesarIncidente(incidente) {
    const necesarios = calcularRecursos(incidente.gravedad);
    const asignados = Math.min(necesarios, recursosDisponibles);
    recursosDisponibles -= asignados;

    switch (incidente.gravedad) {
        case 5:
            if (_DEBUGMODE) { debugger; }
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

/**
 * Recorre el lote de incidentes. Ignora los resueltos (continue)
 * y detiene el sistema cuando no quedan recursos (break).
 * @returns {void}
 */
function iniciarSimulacion() {
    registrar(`Iniciando Eme-JS | Incidentes en cola: ${loteIncidentes.length} | Recursos: ${recursosDisponibles}`);

    for (let i = 0; i < loteIncidentes.length; i++) {
        const incidente = loteIncidentes[i];

        if (incidente.resuelta === true) {
            if (_DEBUGMODE) { debugger; }
            registrar(`Incidente #${incidente.id} ya resuelto. Se ignora.`);
            continue;
        }

        if (recursosDisponibles <= 0) {
            if (_DEBUGMODE) { debugger; }
            registrar(`Sin recursos disponibles. Sistema detenido en el incidente #${incidente.id}.`, 'error');
            break;
        }

        procesarIncidente(incidente);
    }

    registrar(`Fin de la simulación. Recursos finales: ${recursosDisponibles}`);
}

iniciarSimulacion();