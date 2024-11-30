document.addEventListener('DOMContentLoaded', function() {
    const siguiente = document.getElementById('siguiente');
    const anterior = document.getElementById('anterior');
    const carruselDom = document.querySelector('.carrusel');
    const listaDom = carruselDom.querySelector('.carrusel .lista');
    const miniaturasDom = document.querySelector('.carrusel .miniaturas');
    const elementosMiniaturasDom = miniaturasDom.querySelectorAll('.elemento');
    const tiempoDom = document.querySelector('.carrusel .tiempo');

    let indiceActual = 0;
    const totalElementos = elementosMiniaturasDom.length;

    function mostrarSlider(indice) {
        const elementosSliderDom = listaDom.querySelectorAll('.elemento');
        
        // Ocultar todos los elementos
        elementosSliderDom.forEach(elem => elem.style.display = 'none');
        elementosMiniaturasDom.forEach(elem => elem.classList.remove('activo'));

        // Mostrar el elemento actual
        elementosSliderDom[indice].style.display = 'block';
        elementosMiniaturasDom[indice].classList.add('activo');

        // Actualizar índice actual
        indiceActual = indice;

        // Reiniciar la animación de tiempo
        tiempoDom.style.animation = 'none';
        tiempoDom.offsetHeight; // Trigger reflow
        tiempoDom.style.animation = null;
        tiempoDom.style.animationName = 'tiempo';
        tiempoDom.style.animationDuration = '7s';
        tiempoDom.style.animationTimingFunction = 'linear';
    }

    function siguienteSlide() {
        mostrarSlider((indiceActual + 1) % totalElementos);
    }

    function anteriorSlide() {
        mostrarSlider((indiceActual - 1 + totalElementos) % totalElementos);
    }

    siguiente.onclick = siguienteSlide;
    anterior.onclick = anteriorSlide;

    // Configurar miniaturas
    elementosMiniaturasDom.forEach((miniatura, index) => {
        miniatura.onclick = () => mostrarSlider(index);
    });

    // Iniciar el carrusel
    mostrarSlider(0);

    // Configurar deslizamiento automático
    setInterval(siguienteSlide, 7000);

    // Resto del código (menú móvil, desplazamiento suave, etc.) permanece igual
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

    // Código para los pasos de instalación
    const pasos = [
        { 
            titulo: "Evaluación Inicial", 
            descripcion: "Aprende cómo analizamos tu consumo energético y el espacio disponible para un sistema solar óptimo.",
         imagen: "/img/img_inst7.jpg" // Imagen de evaluación inicial

        },
        { 
            titulo: "Diseño del Sistema", 
            descripcion: "Descubre cómo se diseña un sistema solar personalizado para maximizar la eficiencia energética.",
             imagen: "/img/img_inst9.jpg" // Imagen de diseño del sistema
        },
        { 
            titulo: "Instalación y Configuración", 
            descripcion: "Explora el proceso de montaje y configuración de un sistema solar residencial.",
             imagen: "/img/img_inst8.jpg" // Imagen de instalación
        },
    ];

    let pasoActual = 0;

    const tituloPaso = document.getElementById('tituloPaso');
    const descripcionPaso = document.getElementById('descripcionPaso');
    const indicadorPaso = document.getElementById('indicadorPaso');
    const imagenPaso = document.getElementById('imagenPaso');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    function actualizarPaso() {
        const paso = pasos[pasoActual];
        tituloPaso.textContent = paso.titulo;
        descripcionPaso.textContent = paso.descripcion;
        indicadorPaso.textContent = `Paso ${pasoActual + 1} de ${pasos.length}`;
        imagenPaso.src = paso.imagen;
        imagenPaso.alt = paso.titulo;

        botonAnterior.disabled = pasoActual === 0;
        botonSiguiente.disabled = pasoActual === pasos.length - 1;
    }

    botonAnterior.addEventListener('click', () => {
        if (pasoActual > 0) {
            pasoActual--;
            actualizarPaso();
        }
    });

    botonSiguiente.addEventListener('click', () => {
        if (pasoActual < pasos.length - 1) {
            pasoActual++;
            actualizarPaso();
        }
    });

    actualizarPaso();

    // Funcionalidad de acordeón para preguntas frecuentes
    const elementosPreguntasFrecuentes = document.querySelectorAll('.elementoPreguntaFrecuente');

    elementosPreguntasFrecuentes.forEach(elemento => {
        const pregunta = elemento.querySelector('h3');
        const respuesta = elemento.querySelector('p');

        pregunta.addEventListener('click', () => {
            const estaAbierto = respuesta.style.display === 'block';
            
            elementosPreguntasFrecuentes.forEach(otroElemento => {
                if (otroElemento !== elemento) {
                    otroElemento.querySelector('p').style.display = 'none';
                    otroElemento.querySelector('h3').classList.remove('activo');
                }
            });

            respuesta.style.display = estaAbierto ? 'none' : 'block';
            pregunta.classList.toggle('activo', !estaAbierto);
        });
    });

    // Intersection Observer para animación de aparición gradual
    const elementosAparicion = document.querySelectorAll('.aparicionGradual');
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });

    elementosAparicion.forEach(elem => observador.observe(elem));

    if (window.lucide) {
        lucide.createIcons();
    }
    const points = document.querySelectorAll('.reference-point');
    
    // Función para actualizar las líneas de conexión
    function updateConnections() {
        const svg = document.querySelector('.connection-lines');
        const connections = svg.querySelectorAll('.connection');
        
        connections.forEach(connection => {
            const [from, to] = connection.dataset.connect.split('-');
            const fromPoint = document.querySelector(`[data-point="${from}"]`);
            const toPoint = document.querySelector(`[data-point="${to}"]`);
            
            if (fromPoint && toPoint) {
                const fromRect = fromPoint.getBoundingClientRect();
                const toRect = toPoint.getBoundingClientRect();
                const containerRect = svg.getBoundingClientRect();
                
                const x1 = fromRect.left + fromRect.width/2 - containerRect.left;
                const y1 = fromRect.top + fromRect.height/2 - containerRect.top;
                const x2 = toRect.left + toRect.width/2 - containerRect.left;
                const y2 = toRect.top + toRect.height/2 - containerRect.top;
                
                connection.setAttribute('d', `M ${x1} ${y1} C ${x1} ${y2}, ${x2} ${y1}, ${x2} ${y2}`);
            }
        });
    }
    
    // Actualizar posición de tooltips
    points.forEach(point => {
        const tooltip = point.querySelector('.tooltip');
        
        point.addEventListener('mouseenter', () => {
            const pointRect = point.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const containerRect = point.closest('.image-container').getBoundingClientRect();
            
            // Ajustar posición horizontal
            if (pointRect.left + tooltipRect.width > containerRect.right) {
                tooltip.style.left = 'auto';
                tooltip.style.right = '50px';
            }
            
            // Ajustar posición vertical
            if (pointRect.top + tooltipRect.height > containerRect.bottom) {
                tooltip.style.top = 'auto';
                tooltip.style.bottom = '0';
                tooltip.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Actualizar conexiones al cargar y al redimensionar
    updateConnections();
    window.addEventListener('resize', updateConnections);
    
    // Efecto de resaltado al hover
    points.forEach(point => {
        point.addEventListener('mouseenter', () => {
            const dot = point.querySelector('.point-dot');
            dot.style.transform = 'scale(2)';
        });
        
        point.addEventListener('mouseleave', () => {
            const dot = point.querySelector('.point-dot');
            dot.style.transform = 'scale(1)';
        });
    });
 
});

