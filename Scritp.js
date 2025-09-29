// ========== ESPERAR A QUE EL DOM ESTÉ CARGADO ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENÚ HAMBURGUESA ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navegacion = document.querySelector('.navegacion');
    const navLinks = document.querySelectorAll('.navegacion a');
    
    // Variable para controlar el estado del menú
    let menuAbierto = false;
    
    // Función para abrir/cerrar el menú
    function toggleMenu() {
        menuAbierto = !menuAbierto;
        
        if (menuAbierto) {
            navegacion.style.display = 'flex';
            navegacion.classList.add('menu-activo');
            menuToggle.classList.add('activo');
        } else {
            navegacion.style.display = 'none';
            navegacion.classList.remove('menu-activo');
            menuToggle.classList.remove('activo');
        }
    }
    
    // Event listener para el botón hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && menuAbierto) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al redimensionar la ventana (si pasamos a desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navegacion.style.display = 'flex';
            menuAbierto = false;
            menuToggle.classList.remove('activo');
        } else {
            if (!menuAbierto) {
                navegacion.style.display = 'none';
            }
        }
    });
    
    
    // ========== SCROLL SUAVE MEJORADO ==========
    // Aunque CSS tiene scroll-behavior: smooth, esto da más control
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========== RESALTAR ENLACE ACTIVO EN NAVEGACIÓN ==========
    const sections = document.querySelectorAll('section[id]');
    
    function activateNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remover clase activa de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('nav-activo');
                });
                
                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`.navegacion a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-activo');
                }
            }
        });
    }
    
    window.addEventListener('scroll', activateNavLink);
    
    
    // ========== ANIMACIÓN DE APARICIÓN AL HACER SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
                observer.unobserve(entry.target); // Dejar de observar una vez que apareció
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const elementosAnimados = document.querySelectorAll(
        '.proyecto-card, .categoria, .contacto-item, .sobre-mi-grid, .hero-contenido'
    );
    
    elementosAnimados.forEach(elemento => {
        elemento.classList.add('oculto'); // Agregar clase inicial
        observer.observe(elemento);
    });
    
    
    // ========== EFECTO TYPING EN EL HERO ==========
    const heroSubtitulo = document.querySelector('.hero-subtitulo');
    
    if (heroSubtitulo) {
        const textoOriginal = heroSubtitulo.textContent;
        heroSubtitulo.textContent = '';
        
        let i = 0;
        function typing() {
            if (i < textoOriginal.length) {
                heroSubtitulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(typing, 50); // Velocidad del typing (50ms por letra)
            }
        }
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(typing, 500);
    }
    
    
    // ========== BOTÓN SCROLL TO TOP ==========
    // Crear botón de scroll to top
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Funcionalidad del botón
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ========== ANIMACIÓN DEL LOGO EN EL HEADER ==========
    const headerLogo = document.querySelector('.header-logo');
    
    if (headerLogo) {
        let rotation = 0;
        
        headerLogo.addEventListener('click', function() {
            rotation += 360;
            this.style.transform = `rotate(${rotation}deg) scale(1.1)`;
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
        });
    }
    
    
    // ========== CONTADOR DE SKILLS (OPCIONAL) ==========
    // Si quieres agregar un contador a las habilidades
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
    
    
    // ========== MENSAJE EN CONSOLA (EASTER EGG) ==========
    console.log('%c¡Hola Developer! 👋', 'color: #FF0000; font-size: 20px; font-weight: bold;');
    console.log('%cGracias por revisar mi código 😊', 'color: #5151F7; font-size: 14px;');
    console.log('%c- Adiel Batista Guzmán', 'color: #000; font-size: 12px; font-style: italic;');
    
});


// ========== FUNCIONES AUXILIARES ==========

// Función para detectar si un elemento está visible en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para hacer throttle de eventos (optimización)
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}