document.addEventListener('DOMContentLoaded', function() {
    //hero-slider
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");
    const sliderContainer = document.querySelector(".slider-container");
    let current = 0;

    function showSlide(index) {
        if(sliderContainer)
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        current = index;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => showSlide(i));
    });

    setInterval(() => {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }, 6000); // toutes les 6 secondes


    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    

    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Année courante dans le footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Le token est généré automatiquement par le widget v2
        const token = grecaptcha.getResponse();

        if (!token) {
            alert("Veuillez valider le reCAPTCHA.");
            return;
        }

        try {
            const response = await fetch('/api/contact/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message, token })
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                contactForm.reset();
                grecaptcha.reset(); // Réinitialise le captcha
            }
        } catch (error) {
            alert("Erreur lors de l'envoi. Veuillez réessayer.");
            console.error(error);
        }
    });
}



    
    // Animation au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-text, .about-image, .skill-category, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ajout d'une légère animation aux éléments
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .about-image, .skill-category, .contact-form, .contact-info');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Déclenchement initial au chargement
    animateOnScroll();


});