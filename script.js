/* ========================================
   PinoySeoul Internship Landing Page
   JavaScript — Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // Navigation Scroll Effect
    // =============================
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // =============================
    // Smooth Scroll for Anchor Links
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =============================
    // Counter Animation (Hero Stats)
    // =============================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                const current = Math.round(eased * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // Observe hero stats for counter animation
    const heroStats = document.getElementById('hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }

    // =============================
    // Scroll Reveal Animations
    // =============================
    const revealElements = document.querySelectorAll(
        '.track-card, .timeline-item, .benefit-card, .faq-item, .schools-content, .cta-content, .partner-card, .schools-ecosystem'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation based on sibling index
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [];
                const idx = siblings.indexOf(entry.target);
                const delay = idx * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // =============================
    // FAQ Auto-close other items
    // =============================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // =============================
    // Track Card Keyboard Support
    // =============================
    document.querySelectorAll('.track-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('focused');
            }
        });
    });

    // =============================
    // Parallax Effect for Orbs (subtle)
    // =============================
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const orbs = document.querySelectorAll('.gradient-orb');
                orbs.forEach((orb, i) => {
                    const speed = 0.05 + (i * 0.02);
                    orb.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // =============================
    // Active Nav Link Highlighting
    // =============================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});
