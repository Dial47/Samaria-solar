document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preload');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1500);
    });

    // Menú móvil
    const botonMenu = document.getElementById('botonMenu');
    const menuMovil = document.getElementById('menuMovil');

    botonMenu.addEventListener('click', function() {
        menuMovil.style.display = menuMovil.style.display === 'block' ? 'none' : 'block';
    });

    // Navegación suave
    parallax-section

    // Manejo del formulario de contacto
    const formularioContacto = document.querySelector('form');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            formularioContacto.reset();
        });
    }

    // Efecto parallax para la sección hero
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.seccionParallax');
        let posicionScroll = window.pageYOffset;
        parallax.style.backgroundPositionY = posicionScroll * 0.5 + 'px';
    });

    // Intersection Observer para animar elementos cuando entran en la vista
    const animarAlDesplazar = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animar');
                observador.unobserve(entrada.target);
            }
        });
    };

    const observador = new IntersectionObserver(animarAlDesplazar, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.tarjetaBeneficio, .galeria-item, .paso').forEach(elemento => {
        observador.observe(elemento);
    });
});

console.log("Script de Samaria Solar cargado exitosamente!");