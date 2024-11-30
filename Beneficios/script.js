document.addEventListener('DOMContentLoaded', function() {
    const botonMenu = document.getElementById('boton-menu');
    const menuMovil = document.getElementById('menu-movil');

    botonMenu.addEventListener('click', function() {
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