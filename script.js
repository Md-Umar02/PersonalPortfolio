/*
   script.js
   Handles interactive elements for the portfolio website.
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    // Selects the button and the menu element.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Adds a click event listener to the button to toggle the 'hidden' class on the menu.
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Full-Stack Developer", ".NET Developer", "Creative Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            // Logic for typing or deleting text
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Logic to switch between typing and deleting
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                // Move to the next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            // Set the speed of typing/deleting
            const typeSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typeSpeed);
        }
        // Start the effect
        type();
    }

    // --- Section Reveal on Scroll ---
    const sections = document.querySelectorAll('.section-reveal');
    if (sections.length > 0) {
        // Create an Intersection Observer to watch when sections enter the viewport.
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When a section is visible, add the 'visible' class to trigger the animation.
                    entry.target.classList.add('visible');
                    // Stop observing the section once it has been revealed.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        // Observe each section.
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu on link click, if it's open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

});
