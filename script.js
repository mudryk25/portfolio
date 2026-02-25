document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const heroName = document.querySelector('.bold-name');
    const designDevCredit = document.getElementById('design-dev-credit');
    const interactiveElements = document.querySelectorAll('a, button, #design-dev-credit');

    // Smooth Cursor Following
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Easing factor
        const easing = 0.15;

        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Check if device supports hover
    const isHoverable = window.matchMedia('(hover: hover)').matches;

    if (isHoverable) {
        // Cursor Expansion
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Hero Name Hover Font Swap
        if (heroName) {
            heroName.addEventListener('mouseenter', () => {
                heroName.classList.add('expressive');
            });
            heroName.addEventListener('mouseleave', () => {
                heroName.classList.remove('expressive');
            });
        }

        // Design/Dev Credit Font Swap
        if (designDevCredit && heroName) {
            designDevCredit.addEventListener('mouseenter', () => {
                heroName.classList.add('expressive');
            });
            designDevCredit.addEventListener('mouseleave', () => {
                heroName.classList.remove('expressive');
            });
        }
    }

    // Smooth Scrolling for all links
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
});
