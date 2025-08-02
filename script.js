document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll suave para enlaces internos
// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Solo prevenir el comportamiento por defecto para enlaces que no sean externos
        if (this.getAttribute('href').startsWith('#') && 
            !this.classList.contains('no-smooth-scroll')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcula la posición considerando el navbar fijo
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualiza la URL sin recargar la página
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        }
    });
});
    
    // Animaciones al hacer scroll
    function checkScroll() {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Contador de estadísticas
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.innerText);
            const increment = target / speed;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // Observador de intersección para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateStats();
                }
                entry.target.querySelectorAll('.animate').forEach(el => {
                    el.classList.add('visible');
                });
            }
        });
    }, { threshold: 0.1 });
    
    // Observar cada sección
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Efecto hover en tarjetas de donación
    const donationCards = document.querySelectorAll('.donation-card');
    donationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
                this.style.backgroundColor = 'rgb(143, 75, 131))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Inicializar animaciones al cargar
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

/* JavaScript para controlar la reproducción */
document.querySelector('.video-play-button').addEventListener('click', function() {
    const video = this.nextElementSibling;
    video.controls = true;
    video.play();
    this.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a los botones
    const colaboradorBtn = document.querySelector('.donation-options .donation-card:nth-child(1) .btn');
    const ejecutivoBtn = document.querySelector('.donation-options .donation-card:nth-child(2) .btn');
    
    const colaboradorPopup = document.getElementById('colaborador-popup');
    const ejecutivoPopup = document.getElementById('ejecutivo-popup');
    
    const closeButtons = document.querySelectorAll('.close-popup');
    
    // Abrir pop-up de Colaborador
    colaboradorBtn.addEventListener('click', function() {
        colaboradorPopup.style.display = 'block';
    });
    
    // Abrir pop-up de Ejecutivo
    ejecutivoBtn.addEventListener('click', function() {
        ejecutivoPopup.style.display = 'block';
    });
    
    // Cerrar pop-ups al hacer clic en la X
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            colaboradorPopup.style.display = 'none';
            ejecutivoPopup.style.display = 'none';
        });
    });
    
    // Cerrar pop-ups al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === colaboradorPopup) {
            colaboradorPopup.style.display = 'none';
        }
        if (event.target === ejecutivoPopup) {
            ejecutivoPopup.style.display = 'none';
        }
    });
});