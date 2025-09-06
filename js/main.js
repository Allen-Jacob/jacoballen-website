// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navLinksContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinksContainer.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll for anchor links (si vous en ajoutez plus tard)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation classes on scroll (pour les futures animations)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.about-section').forEach(section => {
        observer.observe(section);
    });
});
