        (function () {
        // Shared Gallery Data (used by both mobile and desktop)
        const galleryImages = [
            { src: 'img/best1.webp', caption: 'Literature for the lonely' },
            { src: 'img/best2.webp', caption: 'care' },
            { src: 'img/best3.webp', caption: 'warmth' },
            { src: 'img/best4.webp', caption: 'light' },
            { src: 'img/best5.webp', caption: 'rest' },
            { src: 'img/durga1.webp', caption: 'final touch' },
            { src: 'img/durga2.webp', caption: 'artisans at work' },
            { src: 'img/durga3.webp', caption: 'mahishasura mardini' },
            { src: 'img/durga4.webp', caption: 'pandal' },
            { src: 'img/durga5.webp', caption: 'birth of the goddess' },
            { src: 'img/durga6.webp', caption: 'farewell' },
            { src: 'img/durga7.webp', caption: 'kumortuli' },
            { src: 'img/kash1.webp', caption: 'gulmarg' },
            { src: 'img/kash2.webp', caption: 'day at work' },
            { src: 'img/kol.webp', caption: 'a narrow lane of north calcutta' },
            { src: 'img/old1.webp', caption: 'Mercedes-Benz W108/W109' },
            { src: 'img/old3.webp', caption: 'ancient facades' },
            { src: 'img/old4.webp', caption: 'a master\'s workshop' },
            { src: 'img/phuket1.webp', caption: 'emerald sea' },
            { src: 'img/phuket2.webp', caption: 'sacred wat' },
            { src: 'img/phuket3.webp', caption: 'through the tide' },
            { src: 'img/phuket4.webp', caption: 'golden chofa' },
            { src: 'img/phuket5.webp', caption: 'stranded rocks' },
            { src: 'img/phuket7.webp', caption: 'secret cove' },
            { src: 'img/phuket8.webp', caption: 'dusk' },
            { src: 'img/pray.webp', caption: 'devotion' },
            { src: 'img/shikara.webp', caption: 'Shikara' },
            { src: 'img/tabla.webp', caption: 'Teen taal' }
        ];

        // Mobile Detection
        let isMobile = window.innerWidth <= 768;

        // Clock Functionality - Update every minute for better performance
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const cleanTime = `${hours}:${minutes}`;

            // Get timezone code (e.g., IST, GMT, EST)
            const timeZoneString = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2] || 'IST';

            const clockElement = document.getElementById('clock');
            if (clockElement) {
                clockElement.textContent = `${cleanTime} ${timeZoneString}`;
            }
        }

        // Update clock every minute instead of every second
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000;
        setTimeout(() => {
            updateClock();
            setInterval(updateClock, 60000); // 60 seconds
        }, msUntilNextMinute);
        updateClock(); // Initial call

        // Improved Resize Handler - Show warning instead of reload
        let resizeTimeout;
        let hasShownResizeWarning = false;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const nowMobile = window.innerWidth <= 768;
                if (isMobile !== nowMobile && !hasShownResizeWarning) {
                    hasShownResizeWarning = true;
                    // Optionally reload, or just update the flag for next time
                    window.location.reload();
                }
            }, 500);
        });

        // Skip desktop-only features on mobile (Existing logic follows...)
        if (isMobile) {
            // Mobile view - blank canvas, no gallery animations
            console.log('Mobile view detected - showing mobile gallery');

            // Hide everything desktop
            const mobileCanvas = document.getElementById('mobile-canvas');
            const scrollIndicator = document.getElementById('mobile-scroll-indicator');

            // Handle Scroll Arrow Visibility
            if (scrollIndicator) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        scrollIndicator.classList.add('hidden');
                    } else {
                        scrollIndicator.classList.remove('hidden');
                    }
                });
            }

            // Render Mobile Content
            if (mobileCanvas) {
                // Clear
                mobileCanvas.innerHTML = '';

                // 1. Render Gallery Images
                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'mobile-gallery-container';
                // galleryContainer.style.paddingTop = '10vh'; // Removed manual padding

                // Use galleryImages
                galleryImages.forEach((img, i) => {
                    const item = document.createElement('div');
                    item.className = 'mobile-gallery-item';

                    // Add some random left/right padding or margin to simulate randomization?
                    // "if randomization doesn't fit well, i dont mind a basic scroll" 
                    // Let's keep it simple and clean as requested: "normal vertical scrolling"

                    item.innerHTML = `
                        <img src="${img.src}" class="mobile-gallery-img" alt="${img.caption}" loading="lazy">
                        <div class="mobile-gallery-caption">IMG. ${String(i + 1).padStart(2, '0')} — ${img.caption}</div>
                    `;
                    galleryContainer.appendChild(item);
                });

                mobileCanvas.appendChild(galleryContainer);

                // Simple Intersection Observer for fade-in
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.1 });

                const mobileItems = document.querySelectorAll('.mobile-gallery-item');
                if (mobileItems.length > 0) {
                    // Force first few visible immediately
                    mobileItems[0].classList.add('visible');
                    if (mobileItems[1]) mobileItems[1].classList.add('visible');
                }

                mobileItems.forEach(item => {
                    observer.observe(item);
                });

                // 2. Render Thank You Section
                const endSection = document.createElement('div');
                endSection.className = 'mobile-end-section';

                endSection.innerHTML = `
                    <div class="mobile-thank-you-container">
                        <h1 class="mobile-thank-you-text">
                            <span>THANK</span>
                            <span>YOU</span>
                        </h1>
                        <div class="mobile-signature-block">
                            <img src="img/me.webp" class="mobile-sig-img" alt="Me" loading="lazy">
                            <span class="mobile-sig-msg">in progress</span>
                        </div>
                    </div>
                    
                    <div class="mobile-player-container">
                        <div class="mobile-on-repeat">CURRENTLY ON REPEAT</div>
                        <div class="mobile-player-wrapper" id="mobile-player-wrapper">
                            <div class="mobile-player-inner">
                                <img src="img/album_art.webp" class="mobile-album-art" alt="Album Art" loading="lazy">
                                <div class="mobile-vinyl-record">
                                    <div class="mobile-vinyl-label"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="song-info" style="text-align: center;">
                            <span class="song-title" style="color: #000;">Terrible Wishlists</span>
                            <span class="artist-name">Siyaahi</span>
                        </div>
                    </div>
                    
                    <div class="mobile-scroll-top" id="mobile-scroll-top">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
                    </div>
                `;

                mobileCanvas.appendChild(endSection);

                // Observe end section for visibility transition
                observer.observe(endSection);

                // Add scroll-to-top click handler
                const mobileScrollTop = document.getElementById('mobile-scroll-top');
                if (mobileScrollTop) {
                    mobileScrollTop.addEventListener('click', () => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    });
                }

                // Mobile Music Logic
                const mobilePlayerWrapper = document.getElementById('mobile-player-wrapper');
                const audio = document.getElementById('bg-music');

                if (mobilePlayerWrapper && audio) {
                    mobilePlayerWrapper.addEventListener('click', () => {
                        if (audio.paused) {
                            audio.play().then(() => {
                                mobilePlayerWrapper.classList.add('playing');
                            }).catch(e => console.error("Audio play failed", e));
                        } else {
                            audio.pause();
                            mobilePlayerWrapper.classList.remove('playing');
                        }
                    });
                }
            }

        } else {
            // Desktop view - initialize all animations and features
            // Horizontal Scroll Gallery Logic
            const track = document.getElementById('image-track');
            const numImages = galleryImages.length;
            const placeHolderColors = [
                '#e8e8e8', '#d0d0d0', '#c8c8c8', '#b0b0b0', '#f0f0f0', '#a0a0a0'
            ];

            // Random Generators
            function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            // Create curated images from the array
            for (let i = 0; i < numImages; i++) {
                const imageData = galleryImages[i];
                const item = document.createElement('div');
                item.classList.add('gallery-item');

                // Randomize aspect ratio / size MORE aggressively
                // 3 Types: Small, Medium, Large
                const sizeType = Math.random();
                let widthBase, heightBase;
                heightBase;

                // Varied heights to create rhythm, but let width be auto to preserve aspect ratio
                if (sizeType < 0.2) {
                    // Small (20%)
                    heightBase = randomInt(30, 40);
                } else if (sizeType < 0.6) {
                    // Medium (40%)
                    heightBase = randomInt(40, 55);
                } else {
                    // Large (40% - increased frequency)
                    heightBase = randomInt(55, 75);
                }

                // Random Y Offset for "editorial feel" 
                const yOffset = randomInt(-15, 15); // Reduced offset range to keep images in view

                // Determine caption position based on Y offset
                // If the image is pushed down (positive yOffset), place caption on TOP
                // If the image is pushed up (negative yOffset), place caption on BOTTOM
                const captionPositionClass = yOffset > 0 ? 'top' : 'bottom';

                // Tighter spacing on X axis
                const marginLeft = randomInt(2, 6);
                const marginRight = randomInt(2, 6);

                // Style
                item.style.height = heightBase + 'vh';
                item.style.width = 'auto'; // Allow width to adjust based on image aspect ratio
                // Set CSS Variable for the transform
                item.style.setProperty('--y-offset', `${yOffset}vh`);

                // Random Z-Index to clear up any overlap visual glitches
                item.style.zIndex = randomInt(1, 5);

                item.style.marginLeft = marginLeft + 'vw';
                item.style.marginRight = marginRight + 'vw';

                // Image Content
                const bg = placeHolderColors[randomInt(0, placeHolderColors.length - 1)];

                item.innerHTML = `
                <img src="${imageData.src}" 
                     class="gallery-image"
                     style="background-color: ${bg};"
                     alt="${imageData.caption}" />
                <div class="gallery-caption ${captionPositionClass}">IMG. ${String(i + 1).padStart(2, '0')} — ${imageData.caption}</div>
            `;

                track.appendChild(item);
            }

            // Animation Loop
            const scrollSpacer = document.querySelector('.scroll-spacer');
            const endCanvas = document.querySelector('.end-canvas');
            const footerCenter = document.querySelector('.footer-center');

            // Wait for next frame to ensure spacer is rendered height
            let totalScrollHeight = 0;
            let horizontalScrollLength = 0;

            function updateDimensions() {
                // The scrollable area for the horizontal part is the spacer height
                horizontalScrollLength = scrollSpacer.offsetHeight - window.innerHeight;
                // Total document height is handled by browser
            }
            window.addEventListener('resize', updateDimensions);
            updateDimensions();

            // Cache gallery items once (avoid querySelectorAll every frame)
            const galleryItems = document.querySelectorAll('.gallery-item');

            // Wholesome Popup Logic & Thank You Cursor Logic
            const popup = document.getElementById('wholesome-popup');
            const thankYouCursor = document.getElementById('thank-you-cursor');
            let isPopupActive = false;

            // Mouse Position State (cursor element handled by script.js lerp loop)
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;

            // Music Player Logic
            const playerWrapper = document.querySelector('.player-wrapper');
            const toggleBtn = document.querySelector('.vinyl-toggle-btn');
            const vinylControlBtn = document.querySelector('.vinyl-control-btn');
            const audio = document.getElementById('bg-music');
            const playIcon = document.querySelector('.icon-play');
            const pauseIcon = document.querySelector('.icon-pause');
            let isPlaying = false;
            let isExpanded = false;

            // Lerp helper
            function lerp(start, end, factor) {
                return start + (end - start) * factor;
            }

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                // Move popup with cursor
                if (isPopupActive && popup) {
                    popup.style.left = `${e.clientX}px`;
                    popup.style.top = `${e.clientY}px`;
                }
            });

            // Trigger popup on hover of Brand
            const brandLink = document.querySelector('.nav-brand');

            if (brandLink && popup) {
                brandLink.addEventListener('mouseenter', () => {
                    if (thankYouCursor && thankYouCursor.classList.contains('visible')) return;
                    isPopupActive = true;
                    popup.classList.add('active');
                });

                brandLink.addEventListener('mouseleave', () => {
                    isPopupActive = false;
                    popup.classList.remove('active');
                });
            }

            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!isExpanded) {
                        playerWrapper.classList.add('expanded');
                        toggleBtn.classList.add('active');
                        isExpanded = true;
                    } else {
                        playerWrapper.classList.remove('expanded');
                        toggleBtn.classList.remove('active');
                        isExpanded = false;

                        if (isPlaying) {
                            audio.pause();
                            isPlaying = false;
                            playerWrapper.classList.remove('playing');
                            playIcon.style.display = 'block';
                            pauseIcon.style.display = 'none';
                        }
                    }
                });
            }

            if (vinylControlBtn) {
                vinylControlBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (isPlaying) {
                        audio.pause();
                        isPlaying = false;
                        playerWrapper.classList.remove('playing');
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                    } else {
                        audio.play().then(() => {
                            isPlaying = true;
                            playerWrapper.classList.add('playing');
                            playIcon.style.display = 'none';
                            pauseIcon.style.display = 'block';
                        }).catch(err => {
                            console.error("Audio Playback Failed:", err);
                        });
                    }
                });
            }

            // --- SINGLE UNIFIED rAF LOOP ---
            // Merges: animate (scroll/visibility), animateCursorFollow, updateThankYouCursor
            function unifiedLoop() {
                // 1. Gallery scroll & visibility
                if (window.innerWidth <= 768) {
                    // Mobile: check visibility with cached items
                    galleryItems.forEach(item => {
                        const rect = item.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            item.classList.add('visible');
                        }
                    });
                    const endRect = endCanvas.getBoundingClientRect();
                    if (endRect.top < window.innerHeight * 0.8) {
                        endCanvas.classList.add('visible');
                        footerCenter.classList.add('at-bottom');
                    } else {
                        endCanvas.classList.remove('visible');
                        footerCenter.classList.remove('at-bottom');
                    }
                } else {
                    // Desktop: horizontal scroll + visibility
                    const scrollY = window.scrollY;
                    let progress = 0;
                    if (horizontalScrollLength > 0) {
                        progress = Math.min(Math.max(scrollY / horizontalScrollLength, 0), 1);
                    }
                    const trackWidth = track.scrollWidth;
                    const viewportWidth = window.innerWidth;
                    const x = -((trackWidth - viewportWidth + 100) * progress);
                    track.style.transform = `translateX(${x}px)`;

                    galleryItems.forEach(item => {
                        const rect = item.getBoundingClientRect();
                        if (rect.left < window.innerWidth * 1.1 && rect.right > -window.innerWidth * 0.1) {
                            item.classList.add('visible');
                        } else {
                            item.classList.remove('visible');
                        }
                    });

                    if (horizontalScrollLength > 0 && scrollY > horizontalScrollLength + window.innerHeight * 0.1) {
                        footerCenter.classList.add('at-bottom');
                        endCanvas.classList.add('visible');
                    } else {
                        const endRect = endCanvas.getBoundingClientRect();
                        if (endRect.top < window.innerHeight * 0.8) {
                            footerCenter.classList.add('at-bottom');
                            endCanvas.classList.add('visible');
                        } else {
                            footerCenter.classList.remove('at-bottom');
                            endCanvas.classList.remove('visible');
                        }
                    }
                }

                // 2. Thank You cursor visibility (based on end-canvas state)
                if (thankYouCursor) {
                    if (endCanvas && endCanvas.classList.contains('visible')) {
                        thankYouCursor.classList.add('visible');
                    } else {
                        thankYouCursor.classList.remove('visible');
                    }
                }

                // 3. Thank You cursor smooth follow (lerp)
                if (thankYouCursor) {
                    const easing = 0.08;
                    const offsetX = 20;
                    const offsetY = 20;
                    if (thankYouCursor.classList.contains('visible')) {
                        cursorX = lerp(cursorX, mouseX, easing);
                        cursorY = lerp(cursorY, mouseY, easing);
                    } else {
                        cursorX = mouseX;
                        cursorY = mouseY;
                    }
                    thankYouCursor.style.left = `${cursorX + offsetX}px`;
                    thankYouCursor.style.top = `${cursorY + offsetY}px`;
                }

                requestAnimationFrame(unifiedLoop);
            }
            unifiedLoop();

        }

        // --- SITE LOADER LOGIC ---
        // Runs globally after all prior script execution (Mobile & Desktop)
        (function () {
            const loader = document.getElementById('site-loader');
            const progressBar = document.getElementById('loader-progress');

            // Check if this is a hard refresh (navigation type = reload)
            const isHardRefresh = performance.navigation ?
                performance.navigation.type === 1 :
                performance.getEntriesByType('navigation')[0]?.type === 'reload';

            // 1. Check for internal navigation first (coming from about page)
            const isInternalNavigation = sessionStorage.getItem('internalNavigation') === 'true';

            // 2. Skip loader if returning from about page (not hard refresh)
            if (isInternalNavigation && !isHardRefresh) {
                // IMMEDIATELY hide loader - no flash
                if (loader) {
                    loader.style.cssText = 'display: none !important; opacity: 0 !important;';
                }
                document.body.classList.add('loaded');
                sessionStorage.removeItem('internalNavigation');

                // Initialize scroll animations immediately
                requestAnimationFrame(() => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                            }
                        });
                    }, { threshold: 0.1 });

                    document.querySelectorAll('.scroll-item, .about-section').forEach(el => observer.observe(el));
                });

                return; // Exit loader logic completely
            }

            // Clear flags for fresh load
            sessionStorage.removeItem('internalNavigation');

            // Minimum loader display time (2 seconds)
            const MINIMUM_LOAD_TIME = 2000;
            const loadStartTime = Date.now();

            // Track image loading
            const allImages = Array.from(document.images);
            const images = allImages.filter(img => img.src && img.src !== '');
            const totalImages = images.length;

            let imagesLoadedCount = 0;
            let targetPercent = 0;
            let currentPercent = 0;
            let imagesReady = false;
            let minimumTimeReached = false;

            // Update progress when an image loads
            const updateTarget = () => {
                imagesLoadedCount++;
                targetPercent = totalImages === 0 ? 100 : Math.floor((imagesLoadedCount / totalImages) * 100);
                checkIfReady();
            };

            // Check if both conditions are met (images loaded + min time passed)
            const checkIfReady = () => {
                if (targetPercent >= 100) {
                    imagesReady = true;
                }
                if (imagesReady && minimumTimeReached) {
                    finishLoading();
                }
            };

            // Smooth progress bar animation
            const animateProgress = () => {
                if (currentPercent < targetPercent) {
                    const diff = targetPercent - currentPercent;
                    const step = Math.max(0.5, diff * 0.08);
                    currentPercent = Math.min(currentPercent + step, targetPercent);
                }

                if (progressBar) {
                    progressBar.style.width = `${currentPercent}%`;
                }

                if (currentPercent < 100 || !minimumTimeReached) {
                    requestAnimationFrame(animateProgress);
                }
            };

            requestAnimationFrame(animateProgress);

            const finishLoading = () => {
                // Ensure bar is at 100%
                if (progressBar) progressBar.style.width = '100%';

                // Small delay to show complete state
                setTimeout(() => {
                    if (loader) loader.classList.add('hidden');
                    document.body.classList.add('loaded');

                    // Remove from DOM after fade transition
                    setTimeout(() => {
                        if (loader) loader.style.display = 'none';
                    }, 600);
                }, 300);
            };

            // Initialize image loaders
            if (totalImages === 0) {
                targetPercent = 100;
                imagesReady = true;
            } else {
                images.forEach((img) => {
                    if (img.complete) {
                        updateTarget();
                    } else {
                        img.addEventListener('load', updateTarget, { once: true });
                        img.addEventListener('error', updateTarget, { once: true });
                    }
                });
            }

            // Minimum time enforcement
            setTimeout(() => {
                minimumTimeReached = true;
                targetPercent = 100; // Force to 100%
                checkIfReady();
            }, MINIMUM_LOAD_TIME);

            // Fallback timeout (7 seconds max)
            setTimeout(() => {
                if (!imagesReady) {
                    console.warn('[Loader] Max time reached. Forcing completion.');
                    targetPercent = 100;
                    imagesReady = true;
                    minimumTimeReached = true;
                    checkIfReady();
                }
            }, 7000);
        })();

        // Desktop Scroll-to-Top Button Handler
        const scrollTopBtn = document.getElementById('scroll-top-btn');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
        }
        })();
