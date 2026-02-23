document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.padding = '15px 50px';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.padding = '20px 50px';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Simple toggle style for demo
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // --- 3. Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .glass-panel, .step-item, .hero-content');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger specific animations if needed
                if (entry.target.classList.contains('profit-graph-container')) {
                    animateGraph();
                }
            }
        });
    }, observerOptions);

    // Initial style for animated elements (can also be done in CSS)
    document.querySelectorAll('.glass-panel, .step-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // --- 4. Stats Counter Animation ---
    const statsSection = document.querySelector('.hero-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statNumbers.forEach(num => {
                    const target = +num.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            num.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            num.innerText = target;
                        }
                    };
                    updateCount();
                });
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- 5. Graph Animation ---
    function animateGraph() {
        // Triggered by specific observer above
        // The CSS transition on .bar height handles the visual effect
        // We just need to make sure the bars have their height set effectively
        // Since we set inline styles in HTML, simply adding a class that ensures they are rendered might be enough,
        // but actually, let's reset them to 0 and animate to target.
        
        // Wait a beat then animate
        /* This logic is handled by the CSS transition on 'height' property 
           when the element becomes visible. But since we hardcoded style="height: X%",
           we need to obscure it first then reveal it, OR use JS to changing height from 0 to X%.
        */
        
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const finalHeight = bar.style.height;
            bar.style.height = '0'; // Reset
            
            setTimeout(() => {
                bar.style.height = finalHeight;
            }, 100);
        });
    }
    
    // --- 6. Testimonial Slider ---
    let slideIndex = 1;
    let slideInterval;
    
    // Expose currentSlide to global scope for HTML onclick
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
        resetTimer();
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("testimonial-slide");
        let dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove('active');
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        setTimeout(() => slides[slideIndex-1].classList.add('active'), 10); // Trigger fade
        dots[slideIndex-1].className += " active";
    }

    function autoSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    }

    // Initialize Slider
    showSlides(slideIndex);
    slideInterval = setInterval(autoSlide, 5000);

});
