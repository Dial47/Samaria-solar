document.addEventListener('DOMContentLoaded', function() {
    const projectsData = [
        {
            id: 1,
            title: "Residencia Familiar Torres",
            description: "Instalación de 10 paneles solares para una casa de 150m², reduciendo la factura energética en un 80%",
            image: "../img/img_proy8.jpeg",
            completion: "2023",
            power: "5kW",
            savings: "80%"
        },
        {
            id: 2,
            title: "Casa Ecológica Martínez",
            description: "Sistema solar de 7kW con baterías para una casa autosuficiente de 200m²",
            image: "../img/img_proy6.jpeg",
            completion: "2023",
            power: "7kW",
            savings: "100%"
        },
        {
            id: 3,
            title: "Apartamentos Solares del Caribe",
            description: "Instalación comunitaria de 30kW para un edificio de 10 apartamentos",
            image: "../img/img_proy7.jpeg",
            completion: "2022",
            power: "30kW",
            savings: "60%"
        }
    ];

    const projectsGrid = document.getElementById('rejillaProyectos');

    function renderProjects() {
        projectsGrid.innerHTML = '';
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'tarjetaProyecto';
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="imagenProyecto">
                <div class="contenidoProyecto">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="detallesProyecto">
                        <span>Potencia: ${project.power}</span>
                        <span>Ahorro: ${project.savings}</span>
                        <span>Año: ${project.completion}</span>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Render projects
    renderProjects();

    // Mobile menu toggle
    const menuToggle = document.getElementById('alternarMenu');
    const mobileMenu = document.getElementById('menuMovil');

    menuToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

