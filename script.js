document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const heroName = document.querySelector('.bold-name');
    const designDevCredit = document.getElementById('design-dev-credit');
    const interactiveElements = document.querySelectorAll('a, button, #design-dev-credit, .nav-link-hero');

    // ====================================
    // Seamless Page Transitions (Index <-> About)
    // ====================================
    
    const setupPageTransitions = () => {
        // Get all internal navigation links to index.html or about.html
        const internalLinks = document.querySelectorAll('a[href="index.html"], a[href="about.html"], a[href="./index.html"], a[href="./about.html"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if modifier keys are pressed (open in new tab, etc.)
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                
                e.preventDefault();
                
                // Mark as internal navigation to skip loader on destination
                sessionStorage.setItem('internalNavigation', 'true');
                sessionStorage.setItem('siteVisited', 'true');
                
                // Fade out current page
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after fade
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    };
    
    setupPageTransitions();
    
    // Fade in on page load if coming from internal navigation
    if (sessionStorage.getItem('internalNavigation') === 'true') {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.transition = 'opacity 0.4s ease';
            document.body.style.opacity = '1';
        });
        sessionStorage.removeItem('internalNavigation');
    }

    // ====================================
    // Smooth Cursor Following
    // ====================================
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

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(animateCursor);
    };

    if (cursor) animateCursor();

    // Check if device supports hover
    const isHoverable = window.matchMedia('(hover: hover)').matches;

    if (isHoverable && cursor) {
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
});
