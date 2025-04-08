document.addEventListener("DOMContentLoaded", function () {
    // Recuperar mensaje guardado si existe
    const mensajeGuardado = localStorage.getItem("mensaje");
    if (mensajeGuardado) {
        document.getElementById("mensaje-enviar").textContent = mensajeGuardado;
    }
});

document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const mensaje = "¡Muchas gracias por suscribirte!";
    document.getElementById("mensaje-enviar").textContent = mensaje;
    
    // Guardar el mensaje en LocalStorage
    localStorage.setItem("mensaje", mensaje);
});
