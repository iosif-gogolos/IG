// Project data
const projectData = {
    1: {
        title: 'Urban Coffee Branding',
        category: 'Brand Identity',
        description: 'A comprehensive brand identity project for Urban Coffee, a modern coffee shop chain. The project included logo design, color palette development, typography selection, packaging design, and marketing materials. The goal was to create a warm, inviting brand that appeals to urban professionals while maintaining a sophisticated, contemporary feel.',
        technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Strategy', 'Print Design']
    },
    2: {
        title: 'EcoTech App Design',
        category: 'UI/UX Design',
        description: 'A mobile application design for EcoTech, an environmental monitoring platform. The project focused on creating an intuitive user interface that makes complex environmental data accessible and actionable. Features include real-time air quality monitoring, carbon footprint tracking, and personalized sustainability recommendations.',
        technologies: ['Figma', 'User Research', 'Prototyping', 'Interaction Design']
    },
    3: {
        title: 'Minimal Magazine Layout',
        category: 'Print Design',
        description: 'A sophisticated editorial design project for a high-end lifestyle magazine. The layout emphasizes whitespace, elegant typography, and stunning photography. The design system includes templates for articles, features, interviews, and advertisements, all maintaining a cohesive minimal aesthetic.',
        technologies: ['Adobe InDesign', 'Typography', 'Editorial Design', 'Grid Systems']
    },
    4: {
        title: 'Art Gallery Exhibition',
        category: 'Creative Direction',
        description: 'Complete creative direction for a contemporary art gallery exhibition. The project encompassed exhibition design, wayfinding signage, promotional materials, digital presence, and catalog design. The visual identity reflects the experimental nature of the featured artworks while maintaining gallery sophistication.',
        technologies: ['Creative Direction', 'Exhibition Design', 'Print Production', 'Digital Marketing']
    },
    5: {
        title: 'Fashion Brand Campaign',
        category: 'Visual Identity',
        description: 'A bold visual campaign for an emerging sustainable fashion brand. The project included campaign photography art direction, social media strategy, lookbook design, and website visuals. The aesthetic balances high-fashion elegance with eco-conscious messaging, appealing to environmentally aware fashion enthusiasts.',
        technologies: ['Art Direction', 'Photography', 'Social Media', 'Campaign Strategy']
    },
    6: {
        title: 'Tech Startup Rebranding',
        category: 'Brand Identity',
        description: 'Complete rebranding project for a growing tech startup transitioning from B2B to B2C market. The new brand identity is modern, approachable, and scalable across digital platforms. Deliverables included new logo, brand guidelines, website redesign, marketing collateral, and presentation templates.',
        technologies: ['Brand Strategy', 'Logo Design', 'Web Design', 'Design Systems']
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.querySelector('.modal-title');
const modalCategory = document.querySelector('.modal-category');
const modalDescription = document.querySelector('.modal-description');
const modalTechnologies = document.querySelector('.modal-technologies');
const modalClose = document.querySelector('.modal-close');

// Open modal
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = e.target.dataset.projectId;
        const project = projectData[projectId];
        
        if (project) {
            modalTitle.textContent = project.title;
            modalCategory.textContent = project.category;
            modalDescription.textContent = project.description;
            
            // Create technologies section
            const techHTML = `
                <h3>Technologies & Skills</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            `;
            modalTechnologies.innerHTML = techHTML;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const value = input.value.trim();
        
        group.classList.remove('error', 'success');
        
        if (value === '') {
            group.classList.add('error');
            isValid = false;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.add('success');
            }
        } else {
            group.classList.add('success');
        }
    });
    
    if (isValid) {
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#27ae60';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formGroups.forEach(group => {
                group.classList.remove('success');
            });
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    }
});

// Real-time validation
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        const group = input.closest('.form-group');
        const value = input.value.trim();
        
        group.classList.remove('error', 'success');
        
        if (value !== '') {
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    group.classList.add('success');
                } else {
                    group.classList.add('error');
                }
            } else {
                group.classList.add('success');
            }
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Update ARIA attribute
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Lock/unlock body scroll
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Event listeners
hamburger.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close menu on window resize (if going from mobile to desktop)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});