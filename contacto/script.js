document.addEventListener('DOMContentLoaded', function() {
    const alternarMenu = document.getElementById('alternarMenu');
    const menuMovil = document.getElementById('menuMovil');

    alternarMenu.addEventListener('click', function() {
        menuMovil.style.display = menuMovil.style.display === 'block' ? 'none' : 'block';
    });

    const enlacesNav = document.querySelectorAll('a[href^="#"]');
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const idObjetivo = this.getAttribute('href');
            const elementoObjetivo = document.querySelector(idObjetivo);
            if (elementoObjetivo) {
                elementoObjetivo.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            if (menuMovil.style.display === 'block') {
                menuMovil.style.display = 'none';
            }
        });
    });
});

document.getElementById('formularioContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí normalmente enviarías los datos del formulario al servidor
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    this.reset();
});

