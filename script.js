// Intersection Observer for fade-in effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections with fade-in class
document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// ... existing intersection observer code ...

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const x = (window.innerWidth - mouseX * speed) / 100;
        const y = (window.innerHeight - mouseY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// 3D Card Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Skill bars animation
const animateSkillBars = () => {
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const percentage = progress.getAttribute('data-progress');
        progress.style.transform = `scaleX(${percentage / 100})`;
    });
};

// Typing effect for headings
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
};

// Initialize animations when elements come into view
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            if (entry.target.classList.contains('skill-progress')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('type-effect')) {
                const text = entry.target.getAttribute('data-text');
                entry.target.style.opacity = '1';
                typeWriter(entry.target, text);
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, { threshold: 0.2 });

// Observe elements for animations
document.querySelectorAll('.skill-progress, .type-effect').forEach(element => {
    animationObserver.observe(element);
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    let currentGallery = null;
    let currentIndex = 0;

    portfolioImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function(e) {
            e.preventDefault();
            const gallery = this.closest('.portfolio-card').querySelector('.hidden-gallery');
            if (gallery) {
                const images = Array.from(gallery.querySelectorAll('img'));
                showGallery(images);
            }
        });
    });

    function showGallery(images) {
        currentGallery = images;
        currentIndex = 0;

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const container = document.createElement('div');
        container.className = 'gallery-container';
        
        const img = document.createElement('img');
        img.className = 'gallery-image';
        updateImage(img);

        const prevBtn = createNavButton('←', 'gallery-nav gallery-prev', () => navigate(-1));
        const nextBtn = createNavButton('→', 'gallery-nav gallery-next', () => navigate(1));
        const closeBtn = createNavButton('×', 'gallery-close', closeGallery);

        container.appendChild(img);
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
        container.appendChild(closeBtn);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeGallery();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyPress);
    }

    function updateImage(img) {
        const currentImg = currentGallery[currentIndex];
        img.src = currentImg.src;
        img.alt = currentImg.alt;
        img.title = currentImg.title;
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
        const img = document.querySelector('.gallery-image');
        updateImage(img);
    }

    function createNavButton(text, className, onClick) {
        const button = document.createElement('button');
        button.innerHTML = text;
        button.className = className;
        button.addEventListener('click', onClick);
        return button;
    }

    function closeGallery() {
        const overlay = document.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.remove();
            document.removeEventListener('keydown', handleKeyPress);
        }
    }

    function handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
            case 'Escape':
                closeGallery();
                break;
        }
    }
});