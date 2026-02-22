// ================================================
// PRANAV VERSE - COMPLETE JAVASCRIPT
// ================================================

// ========== LOADING SCREEN ==========
document.addEventListener('DOMContentLoaded', function() {
    var loadingScreen = document.getElementById('loadingScreen');
    var loaderProgress = document.getElementById('loaderProgress');
    var progress = 0;

    var loadInterval = setInterval(function() {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loaderProgress.style.width = progress + '%';

        if (progress === 100) {
            clearInterval(loadInterval);
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initAnimations();
            }, 500);
        }
    }, 200);
});

// ========== CUSTOM CURSOR ==========
var cursor = document.getElementById('cursor');
var cursorFollower = document.getElementById('cursorFollower');
var mouseX = 0;
var mouseY = 0;
var followerX = 0;
var followerY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top = mouseY - 6 + 'px';
    }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
var hoverElements = document.querySelectorAll('a, button, .project-card, .category-card, .feature-card, .tag, .filter-btn');
hoverElements.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        if (cursorFollower) cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
        if (cursorFollower) cursorFollower.classList.remove('hover');
    });
});

// ========== PARTICLE CANVAS ==========
var canvas = document.getElementById('particleCanvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.1;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = 'rgba(108, 92, 231, ' + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

var particles = [];
var particleCount = Math.min(80, Math.floor(window.innerWidth / 15));

for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
            var dx = particles[i].x - particles[j].x;
            var dy = particles[i].y - particles[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = 'rgba(108, 92, 231, ' + (0.1 * (1 - distance / 150)) + ')';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== NAVBAR SCROLL ==========
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU ==========
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== ACTIVE NAV ON SCROLL ==========
var sections = document.querySelectorAll('section[id]');
var navLinksList = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop - 150;
        var sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
function initAnimations() {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    var counters = document.querySelectorAll('.stat-number');

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counter = entry.target;
                var target = parseInt(counter.getAttribute('data-count'));
                var duration = 2000;
                var increment = target / (duration / 16);
                var current = 0;

                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                }

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}
animateCounters();

// ========== PROJECT FILTER ==========
var filterBtns = document.querySelectorAll('.filter-btn');
var projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        projectCards.forEach(function(card, index) {
            var category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease ' + (index * 0.1) + 's forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeInUp keyframes
var styleSheet = document.createElement('style');
styleSheet.textContent = '@keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(styleSheet);

// ========== SEARCH ==========
var searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(e) {
    var query = e.target.value.toLowerCase();
    var allCards = document.querySelectorAll('.project-card');

    allCards.forEach(function(card) {
        var title = card.querySelector('.card-title').textContent.toLowerCase();
        var desc = card.querySelector('.card-description').textContent.toLowerCase();
        var tech = card.querySelector('.card-tech').textContent.toLowerCase();

        if (title.includes(query) || desc.includes(query) || tech.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = query === '' ? 'block' : 'none';
        }
    });
});

function searchTag(tag) {
    searchInput.value = tag;
    searchInput.dispatchEvent(new Event('input'));
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// ========== TESTIMONIAL SLIDER ==========
var currentSlide = 0;
var testimonialTrack = document.getElementById('testimonialTrack');
var testimonialCards = document.querySelectorAll('.testimonial-card');
var sliderDotsContainer = document.getElementById('sliderDots');

function getCardsPerView() {
    return window.innerWidth >= 768 ? 2 : 1;
}

var cardsPerView = getCardsPerView();
var totalSlides = Math.ceil(testimonialCards.length / cardsPerView);

function createDots() {
    sliderDotsContainer.innerHTML = '';
    totalSlides = Math.ceil(testimonialCards.length / cardsPerView);

    for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
        sliderDotsContainer.appendChild(dot);
    }
}
createDots();

function updateSlider() {
    if (testimonialCards.length === 0) return;
    var cardWidth = testimonialCards[0].offsetWidth + 30;
    testimonialTrack.style.transform = 'translateX(-' + (currentSlide * cardWidth * cardsPerView) + 'px)';

    var dots = document.querySelectorAll('.slider-dot');
    dots.forEach(function(dot, index) {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function slideTestimonials(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

setInterval(function() { slideTestimonials(1); }, 5000);

window.addEventListener('resize', function() {
    cardsPerView = getCardsPerView();
    createDots();
    currentSlide = 0;
    updateSlider();
});

// ========== 3D CARD TILT ==========
document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 15;
        var rotateY = (centerX - x) / 15;

        var wrapper = card.querySelector('.card-3d-wrapper');
        wrapper.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';

        var glow = card.querySelector('.card-glow');
        glow.style.left = (x - rect.width) + 'px';
        glow.style.top = (y - rect.height) + 'px';
    });

    card.addEventListener('mouseleave', function() {
        var wrapper = card.querySelector('.card-3d-wrapper');
        wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========== DOWNLOAD MODAL ==========
var downloadModal = document.getElementById('downloadModal');
var modalTitle = document.getElementById('modalTitle');
var modalText = document.getElementById('modalText');
var modalProgress = document.getElementById('modalProgress');
var modalStatus = document.getElementById('modalStatus');

function downloadProject(name) {
    downloadModal.classList.add('active');
    modalTitle.textContent = 'Downloading ' + name;
    modalText.textContent = 'Your project source code is being prepared.';
    modalProgress.style.width = '0%';
    modalStatus.textContent = 'Preparing files...';

    var progress = 0;
    var statusMessages = [
        'Preparing files...',
        'Compressing source code...',
        'Bundling assets...',
        'Almost there...',
        'Download complete! ✅'
    ];

    var downloadInterval = setInterval(function() {
        progress += Math.random() * 20 + 5;
        if (progress > 100) progress = 100;

        modalProgress.style.width = progress + '%';

        var idx = Math.min(Math.floor(progress / 25), statusMessages.length - 1);
        modalStatus.textContent = statusMessages[idx];

        if (progress === 100) {
            clearInterval(downloadInterval);
            setTimeout(function() {
                closeModal();
                showToast(name + ' downloaded successfully! 🎉', 'success');
            }, 1000);
        }
    }, 300);
}

function openPreview(name) {
    showToast('Opening preview for ' + name + '... 👀', 'info');
}

function closeModal() {
    downloadModal.classList.remove('active');
}

// ========== TOAST NOTIFICATIONS ==========
var toastContainer = document.getElementById('toastContainer');

function showToast(message, type) {
    type = type || 'info';
    var toast = document.createElement('div');
    toast.classList.add('toast', type);

    var icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = '<span>' + (icons[type] || 'ℹ️') + '</span> ' + message;
    toastContainer.appendChild(toast);

    setTimeout(function() {
        toast.classList.add('removing');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// ========== SUBSCRIBE ==========
function subscribe() {
    var emailInput = document.getElementById('emailInput');
    var email = emailInput.value.trim();

    if (!email || email.indexOf('@') === -1) {
        showToast('Please enter a valid email! 📧', 'error');
        return;
    }

    showToast('Welcome aboard! 🚀 Subscribed with ' + email, 'success');
    emailInput.value = '';
}

// ========== CONTACT FORM ==========
function submitContact(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll reply soon. 📨', 'success');
    document.getElementById('contactForm').reset();
}

// ========== LOAD MORE PROJECTS ==========
function loadMoreProjects() {
    var grid = document.getElementById('projectsGrid');

    var newProjects = [
        {
            icon: 'fa-palette',
            title: 'Portfolio Generator',
            desc: 'Dynamic portfolio builder with customizable themes and animations.',
            tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
            category: 'web',
            badge: 'popular', badgeText: '⭐ Popular',
            downloads: '750', stars: '4.6', views: '2.3k'
        },
        {
            icon: 'fa-database',
            title: 'Student Management System',
            desc: 'Complete CRUD app for managing student records with auth.',
            tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'],
            category: 'web',
            badge: 'hot', badgeText: '🔥 Hot',
            downloads: '1.1k', stars: '4.7', views: '3.1k'
        },
        {
            icon: 'fa-cloud-sun',
            title: 'Weather Forecast App',
            desc: 'Real-time weather with location detection and 7-day forecast.',
            tech: ['React', 'OpenWeather API', 'CSS3', 'Axios'],
            category: 'web',
            badge: 'new', badgeText: '✨ New',
            downloads: '600', stars: '4.5', views: '1.8k'
        }
    ];

    newProjects.forEach(function(project, index) {
        var card = document.createElement('div');
        card.classList.add('project-card');
        card.setAttribute('data-category', project.category);
        card.style.animation = 'fadeInUp 0.5s ease ' + (index * 0.2) + 's forwards';
        card.style.opacity = '0';

        var techHTML = '';
        project.tech.forEach(function(t) {
            techHTML += '<span>' + t + '</span>';
        });

        card.innerHTML =
            '<div class="card-3d-wrapper">' +
                '<div class="card-glow"></div>' +
                '<div class="card-header">' +
                    '<div class="card-icon"><i class="fas ' + project.icon + '"></i></div>' +
                    '<div class="card-badges">' +
                        '<span class="badge ' + project.badge + '">' + project.badgeText + '</span>' +
                        '<span class="badge free">Free</span>' +
                    '</div>' +
                '</div>' +
                '<div class="card-body">' +
                    '<h3 class="card-title">' + project.title + '</h3>' +
                    '<p class="card-description">' + project.desc + '</p>' +
                    '<div class="card-tech">' + techHTML + '</div>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<div class="card-stats">' +
                        '<span><i class="fas fa-download"></i> ' + project.downloads + '</span>' +
                        '<span><i class="fas fa-star"></i> ' + project.stars + '</span>' +
                        '<span><i class="fas fa-eye"></i> ' + project.views + '</span>' +
                    '</div>' +
                    '<div class="card-actions">' +
                        '<button class="btn-preview" onclick="openPreview(\'' + project.title + '\')">' +
                            '<i class="fas fa-eye"></i> Preview' +
                        '</button>' +
                        '<button class="btn-download" onclick="downloadProject(\'' + project.title + '\')">' +
                            '<i class="fas fa-download"></i> Download' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        grid.appendChild(card);

        // Add 3D tilt to new cards
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cX = rect.width / 2;
            var cY = rect.height / 2;
            var rX = (y - cY) / 15;
            var rY = (cX - x) / 15;
            card.querySelector('.card-3d-wrapper').style.transform =
                'perspective(1000px) rotateX(' + rX + 'deg) rotateY(' + rY + 'deg) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            card.querySelector('.card-3d-wrapper').style.transform =
                'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    showToast('3 more projects loaded! 🎉', 'success');
}

// ========== SCROLL TO TOP ==========
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== THEME TOGGLE ==========
var themeToggle = document.getElementById('themeToggle');
var isDark = true;

themeToggle.addEventListener('click', function() {
    isDark = !isDark;
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    showToast(isDark ? 'Dark mode enabled 🌙' : 'Light mode coming soon! ☀️', 'info');
});

// ========== PARALLAX ON SHAPES ==========
window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var shapes = document.querySelectorAll('.shape');
    shapes.forEach(function(shape, index) {
        var speed = (index + 1) * 0.02;
        shape.style.transform = 'translate(' + (Math.sin(scrollY * speed) * 20) + 'px, ' + (scrollY * speed * -1) + 'px)';
    });
});

// ========== SMOOTH ANCHOR SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========== CONSOLE MESSAGE ==========
console.log(
    '%c🚀 PRANAV VERSE %c\nWelcome to the Student Project Hub!\nBuilt with ❤️ for students.',
    'color: #6c5ce7; font-size: 24px; font-weight: bold;',
    'color: #a29bfe; font-size: 14px;'
);
