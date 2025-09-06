// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
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

// Add some interactive particles on click
document.addEventListener('click', function(e) {
    createClickParticle(e.clientX, e.clientY);
});

function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #ff6b9d, #4ecdc4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x - 3}px;
        top: ${y - 3}px;
        animation: clickParticle 1s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}
