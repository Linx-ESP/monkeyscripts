// ==UserScript==
// @name         CEX URL Filter
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Añade automáticamente filtros de disponibilidad a la URL de CEX
// @author       LinxESP
// @match        https://es.webuy.com/search*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Verificar si la URL ya contiene el parámetro de disponibilidad
    if (!window.location.href.includes('availability=')) {
        // Construir la nueva URL con el parámetro de disponibilidad
        const separator = window.location.href.includes('?') ? '&' : '?';
        const newUrl = window.location.href + separator + "availability=Disponible+online~Disponible+en+tienda";
        
        // Redirigir a la nueva URL
        window.location.href = newUrl;
    }
})();