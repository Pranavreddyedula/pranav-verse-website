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

// ========== PROJECT DATA FOR PREVIEWS ==========
var projectData = {
    'E-Commerce Website': {
        icon: 'fa-shopping-cart',
        badge: 'hot',
        badgeText: '🔥 Hot',
        description: 'A complete full-stack e-commerce platform built with React and Node.js. Features include product listing with search and filters, shopping cart with quantity management, secure payment gateway integration with Stripe, user authentication, admin dashboard for managing products and orders, responsive design, and order tracking system.',
        tech: [
            { name: 'React', icon: 'fab fa-react' },
            { name: 'Node.js', icon: 'fab fa-node-js' },
            { name: 'MongoDB', icon: 'fas fa-database' },
            { name: 'Stripe', icon: 'fas fa-credit-card' },
            { name: 'Express', icon: 'fas fa-server' },
            { name: 'JWT', icon: 'fas fa-lock' }
        ],
        features: [
            'Shopping Cart System',
            'Payment Gateway',
            'Admin Dashboard',
            'User Authentication',
            'Product Search & Filter',
            'Order Tracking',
            'Responsive Design',
            'Email Notifications'
        ],
        downloads: '1.2k',
        stars: '4.8',
        views: '3.5k',
        files: '45',
        url: 'pranav-verse.com/ecommerce',
        filename: 'App.jsx',
        code: 'import React from "react";\nimport { BrowserRouter, Routes, Route } from "react-router-dom";\nimport Navbar from "./components/Navbar";\nimport Home from "./pages/Home";\nimport Products from "./pages/Products";\nimport Cart from "./pages/Cart";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Navbar />\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/products" element={<Products />} />\n        <Route path="/cart" element={<Cart />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nexport default App;',
        fileTree: '<span class="folder">📁 ecommerce-app/</span><br><div class="indent"><span class="folder">📁 src/</span><br><div class="indent"><span class="folder">📁 components/</span><br><div class="indent"><span class="file">📄 Navbar.jsx</span><br><span class="file">📄 ProductCard.jsx</span><br><span class="file">📄 CartItem.jsx</span></div><span class="folder">📁 pages/</span><br><div class="indent"><span class="file">📄 Home.jsx</span><br><span class="file">📄 Products.jsx</span><br><span class="file">📄 Cart.jsx</span></div><span class="file">📄 App.jsx</span></div><span class="file">📄 package.json</span><br><span class="file">📄 README.md</span></div>',
        demoHTML: '<div class="demo-nav"><span>🏠 Home</span><span>🛍️ Products</span><span>🛒 Cart (3)</span><span>👤 Account</span></div><div class="demo-header"><h4>🛒 Premium Store</h4><p>Discover amazing products at best prices</p></div><div class="demo-grid"><div class="demo-card"><i class="fas fa-laptop"></i><span>Laptops<br><b style="color:#6c5ce7">$999</b></span></div><div class="demo-card"><i class="fas fa-headphones"></i><span>Headphones<br><b style="color:#6c5ce7">$149</b></span></div><div class="demo-card"><i class="fas fa-camera"></i><span>Cameras<br><b style="color:#6c5ce7">$599</b></span></div></div><div class="demo-btn">🛒 Add to Cart</div>'
    },
    'AI Chatbot': {
        icon: 'fa-robot',
        badge: 'trending',
        badgeText: '📈 Trending',
        description: 'An intelligent AI chatbot assistant built with Python and TensorFlow. Features natural language processing for understanding user queries, context-aware responses that remember conversation history, machine learning model that improves over time, Flask web interface with modern UI, and easy API integration.',
        tech: [
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'TensorFlow', icon: 'fas fa-brain' },
            { name: 'Flask', icon: 'fas fa-server' },
            { name: 'NLP', icon: 'fas fa-comments' },
            { name: 'NLTK', icon: 'fas fa-language' },
            { name: 'SQLite', icon: 'fas fa-database' }
        ],
        features: [
            'Natural Language Processing',
            'Context-Aware Responses',
            'Learning Capability',
            'Web Interface',
            'Multi-language Support',
            'API Integration',
            'Conversation History',
            'Custom Training'
        ],
        downloads: '2.1k',
        stars: '4.9',
        views: '5.2k',
        files: '28',
        url: 'pranav-verse.com/ai-chatbot',
        filename: 'chatbot.py',
        code: 'import tensorflow as tf\nfrom flask import Flask, request, jsonify\nfrom nltk.tokenize import word_tokenize\nimport json\n\napp = Flask(__name__)\n\nclass ChatBot:\n    def __init__(self):\n        self.model = tf.keras.models.load_model("model.h5")\n        self.intents = json.load(open("intents.json"))\n    \n    def predict(self, message):\n        tokens = word_tokenize(message.lower())\n        prediction = self.model.predict([tokens])\n        return self.get_response(prediction)\n\nbot = ChatBot()\n\n@app.route("/chat", methods=["POST"])\ndef chat():\n    message = request.json["message"]\n    response = bot.predict(message)\n    return jsonify({"response": response})',
        fileTree: '<span class="folder">📁 ai-chatbot/</span><br><div class="indent"><span class="folder">📁 models/</span><br><div class="indent"><span class="file">📄 model.h5</span><br><span class="file">📄 tokenizer.pkl</span></div><span class="folder">📁 data/</span><br><div class="indent"><span class="file">📄 intents.json</span></div><span class="folder">📁 templates/</span><br><div class="indent"><span class="file">📄 index.html</span></div><span class="file">📄 chatbot.py</span><br><span class="file">📄 train.py</span><br><span class="file">📄 requirements.txt</span></div>',
        demoHTML: '<div class="demo-chat"><div class="demo-message user">Hey! Can you help me with Python?</div><div class="demo-message bot">🤖 Of course! I would love to help you with Python. What topic are you working on?</div><div class="demo-message user">How do I read a CSV file?</div><div class="demo-message bot">🤖 You can use pandas! Here is how:<br><code>import pandas as pd<br>df = pd.read_csv("file.csv")</code></div></div><div class="demo-chat-input"><div class="chat-input-box">Type your message...</div><div class="chat-send-btn"><i class="fas fa-paper-plane"></i></div></div>'
    },
    'Health Tracker': {
        icon: 'fa-heartbeat',
        badge: 'new',
        badgeText: '✨ New',
        description: 'A beautiful mobile health tracking application built with Flutter. Track your daily fitness activities, calorie intake, sleep patterns, water consumption and more. Features interactive charts, daily reminders, goal setting, progress tracking, and cloud sync with Firebase.',
        tech: [
            { name: 'Flutter', icon: 'fas fa-mobile-alt' },
            { name: 'Dart', icon: 'fas fa-code' },
            { name: 'Firebase', icon: 'fas fa-fire' },
            { name: 'Charts', icon: 'fas fa-chart-pie' },
            { name: 'SQLite', icon: 'fas fa-database' },
            { name: 'Provider', icon: 'fas fa-cubes' }
        ],
        features: [
            'Fitness Activity Tracking',
            'Calorie Counter',
            'Sleep Pattern Analysis',
            'Water Intake Tracker',
            'Interactive Charts',
            'Daily Reminders',
            'Goal Setting',
            'Cloud Sync'
        ],
        downloads: '890',
        stars: '4.7',
        views: '2.1k',
        files: '35',
        url: 'pranav-verse.com/health-tracker',
        filename: 'main.dart',
        code: 'import "package:flutter/material.dart";\nimport "package:provider/provider.dart";\nimport "screens/home_screen.dart";\nimport "providers/health_provider.dart";\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return ChangeNotifierProvider(\n      create: (_) => HealthProvider(),\n      child: MaterialApp(\n        title: "Health Tracker",\n        theme: ThemeData(\n          primarySwatch: Colors.purple,\n        ),\n        home: HomeScreen(),\n      ),\n    );\n  }\n}',
        fileTree: '<span class="folder">📁 health-tracker/</span><br><div class="indent"><span class="folder">📁 lib/</span><br><div class="indent"><span class="folder">📁 screens/</span><br><div class="indent"><span class="file">📄 home_screen.dart</span><br><span class="file">📄 activity_screen.dart</span></div><span class="folder">📁 providers/</span><br><div class="indent"><span class="file">📄 health_provider.dart</span></div><span class="file">📄 main.dart</span></div><span class="file">📄 pubspec.yaml</span><br><span class="file">📄 README.md</span></div>',
        demoHTML: '<div class="demo-header"><h4>❤️ Health Tracker</h4><p>Your daily health companion</p></div><div class="demo-grid"><div class="demo-card"><i class="fas fa-walking" style="color:#55efc4"></i><span>Steps<br><b style="color:#55efc4">8,542</b></span></div><div class="demo-card"><i class="fas fa-fire-alt" style="color:#ff7675"></i><span>Calories<br><b style="color:#ff7675">1,250</b></span></div><div class="demo-card"><i class="fas fa-tint" style="color:#74b9ff"></i><span>Water<br><b style="color:#74b9ff">6 Cups</b></span></div></div><div style="margin-top:10px"><small style="color:#6c6c8a">Weekly Progress</small><div class="demo-chart-bars"><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div></div></div>'
    },
    'Data Dashboard': {
        icon: 'fa-chart-line',
        badge: 'popular',
        badgeText: '⭐ Popular',
        description: 'An interactive data visualization dashboard built with Python Dash and Plotly. Features real-time data updates, multiple chart types, custom filters, data export functionality, responsive layout, and beautiful animations.',
        tech: [
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'Plotly', icon: 'fas fa-chart-bar' },
            { name: 'Dash', icon: 'fas fa-tachometer-alt' },
            { name: 'Pandas', icon: 'fas fa-table' },
            { name: 'NumPy', icon: 'fas fa-calculator' },
            { name: 'CSS', icon: 'fab fa-css3-alt' }
        ],
        features: [
            'Real-time Data Updates',
            'Multiple Chart Types',
            'Custom Filters',
            'Data Export CSV/PDF',
            'Responsive Layout',
            'Dark/Light Theme',
            'Interactive Tooltips',
            'Date Range Picker'
        ],
        downloads: '980',
        stars: '4.5',
        views: '2.8k',
        files: '22',
        url: 'pranav-verse.com/data-dashboard',
        filename: 'app.py',
        code: 'import dash\nfrom dash import html, dcc\nimport plotly.express as px\nimport pandas as pd\n\napp = dash.Dash(__name__)\n\ndf = pd.read_csv("data/sales.csv")\n\napp.layout = html.Div([\n    html.H1("Sales Dashboard"),\n    dcc.Dropdown(\n        id="filter",\n        options=["2023", "2024"],\n        value="2024"\n    ),\n    dcc.Graph(id="sales-chart"),\n    dcc.Graph(id="revenue-chart"),\n])\n\nif __name__ == "__main__":\n    app.run_server(debug=True)',
        fileTree: '<span class="folder">📁 data-dashboard/</span><br><div class="indent"><span class="folder">📁 data/</span><br><div class="indent"><span class="file">📄 sales.csv</span><br><span class="file">📄 users.csv</span></div><span class="folder">📁 assets/</span><br><div class="indent"><span class="file">📄 style.css</span></div><span class="file">📄 app.py</span><br><span class="file">📄 requirements.txt</span><br><span class="file">📄 README.md</span></div>',
        demoHTML: '<div class="demo-nav"><span>📊 Overview</span><span>📈 Sales</span><span>👥 Users</span><span>⚙️ Settings</span></div><div class="demo-sidebar"><div class="demo-sidebar-menu"><div class="demo-menu-item active-item">📊 Dashboard</div><div class="demo-menu-item">📈 Analytics</div><div class="demo-menu-item">👥 Users</div><div class="demo-menu-item">⚙️ Settings</div></div><div class="demo-main-area"><small style="color:#6c6c8a">Monthly Revenue</small><div class="demo-chart-bars"><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div><div class="demo-bar"></div></div></div></div>'
    },
    'Space Shooter': {
        icon: 'fa-gamepad',
        badge: 'hot',
        badgeText: '🔥 Hot',
        description: 'An exciting 3D space shooter game built with Three.js and WebGL. Features stunning particle effects, multiple weapon types, power-up system, enemy waves with increasing difficulty, multiplayer support via Socket.io, leaderboard system, and immersive sound effects.',
        tech: [
            { name: 'Three.js', icon: 'fas fa-cube' },
            { name: 'WebGL', icon: 'fas fa-palette' },
            { name: 'Socket.io', icon: 'fas fa-plug' },
            { name: 'Node.js', icon: 'fab fa-node-js' },
            { name: 'JavaScript', icon: 'fab fa-js' },
            { name: 'HTML5', icon: 'fab fa-html5' }
        ],
        features: [
            'Stunning 3D Graphics',
            'Particle Effects',
            'Multiple Weapons',
            'Power-Up System',
            'Enemy Wave System',
            'Multiplayer Support',
            'Leaderboard',
            'Sound Effects'
        ],
        downloads: '1.8k',
        stars: '4.9',
        views: '6.1k',
        files: '38',
        url: 'pranav-verse.com/space-shooter',
        filename: 'game.js',
        code: 'import * as THREE from "three";\n\nclass SpaceShooter {\n  constructor() {\n    this.scene = new THREE.Scene();\n    this.camera = new THREE.PerspectiveCamera(75);\n    this.renderer = new THREE.WebGLRenderer();\n    this.score = 0;\n    this.health = 100;\n    this.init();\n  }\n\n  init() {\n    this.createStarfield();\n    this.createPlayer();\n    this.spawnEnemies();\n    this.animate();\n  }\n\n  createPlayer() {\n    const geo = new THREE.ConeGeometry(1, 3);\n    const mat = new THREE.MeshPhongMaterial({\n      color: 0x6c5ce7\n    });\n    this.player = new THREE.Mesh(geo, mat);\n    this.scene.add(this.player);\n  }\n\n  animate() {\n    requestAnimationFrame(() => this.animate());\n    this.renderer.render(this.scene, this.camera);\n  }\n}',
        fileTree: '<span class="folder">📁 space-shooter/</span><br><div class="indent"><span class="folder">📁 src/</span><br><div class="indent"><span class="file">📄 game.js</span><br><span class="file">📄 player.js</span><br><span class="file">📄 enemy.js</span></div><span class="folder">📁 assets/</span><br><div class="indent"><span class="folder">📁 sounds/</span><br><span class="folder">📁 textures/</span></div><span class="file">📄 index.html</span><br><span class="file">📄 package.json</span><br><span class="file">📄 README.md</span></div>',
        demoHTML: '<div class="demo-game"><div class="demo-game-screen"><div class="demo-health">❤️ HP: 100</div><div class="demo-score">⭐ Score: 15,240</div><div style="position:absolute;top:20px;left:30px;width:2px;height:2px;background:white;border-radius:50%"></div><div style="position:absolute;top:50px;left:80px;width:2px;height:2px;background:white;border-radius:50%"></div><div style="position:absolute;top:35px;right:60px;width:2px;height:2px;background:white;border-radius:50%"></div><div style="position:absolute;top:80px;left:150px;width:2px;height:2px;background:white;border-radius:50%"></div><div class="demo-spaceship" style="margin-top:50px">🚀</div></div><div class="demo-grid"><div class="demo-card"><i class="fas fa-bolt" style="color:#ffeaa7"></i><span>Laser</span></div><div class="demo-card"><i class="fas fa-shield-alt" style="color:#55efc4"></i><span>Shield</span></div><div class="demo-card"><i class="fas fa-bomb" style="color:#ff7675"></i><span>Bomb</span></div></div></div>'
    },
    'Blog CMS': {
        icon: 'fa-blog',
        badge: 'new',
        badgeText: '✨ New',
        description: 'A complete blog content management system built with Next.js and Prisma. Features rich text editor, comment system, category management, SEO optimization, social sharing, markdown support, image optimization, and responsive design with Tailwind CSS.',
        tech: [
            { name: 'Next.js', icon: 'fab fa-react' },
            { name: 'Prisma', icon: 'fas fa-database' },
            { name: 'PostgreSQL', icon: 'fas fa-server' },
            { name: 'Tailwind', icon: 'fab fa-css3-alt' },
            { name: 'MDX', icon: 'fas fa-file-alt' },
            { name: 'Auth.js', icon: 'fas fa-lock' }
        ],
        features: [
            'Rich Text Editor',
            'Comment System',
            'Category Management',
            'SEO Optimization',
            'Social Sharing',
            'Markdown Support',
            'Image Optimization',
            'RSS Feed'
        ],
        downloads: '1.5k',
        stars: '4.6',
        views: '4.0k',
        files: '42',
        url: 'pranav-verse.com/blog-cms',
        filename: 'page.tsx',
        code: 'import { prisma } from "@/lib/prisma";\nimport PostCard from "@/components/PostCard";\nimport Sidebar from "@/components/Sidebar";\n\nexport default async function Home() {\n  const posts = await prisma.post.findMany({\n    orderBy: { createdAt: "desc" },\n    include: { author: true },\n    take: 10,\n  });\n\n  return (\n    <main className="container mx-auto">\n      <h1>Latest Posts</h1>\n      <div className="grid grid-cols-3 gap-6">\n        {posts.map((post) => (\n          <PostCard key={post.id} post={post} />\n        ))}\n      </div>\n      <Sidebar />\n    </main>\n  );\n}',
        fileTree: '<span class="folder">📁 blog-cms/</span><br><div class="indent"><span class="folder">📁 app/</span><br><div class="indent"><span class="file">📄 page.tsx</span><br><span class="file">📄 layout.tsx</span><br><span class="folder">📁 blog/[slug]/</span></div><span class="folder">📁 components/</span><br><div class="indent"><span class="file">📄 PostCard.tsx</span><br><span class="file">📄 Sidebar.tsx</span></div><span class="folder">📁 prisma/</span><br><div class="indent"><span class="file">📄 schema.prisma</span></div><span class="file">📄 package.json</span><br><span class="file">📄 README.md</span></div>',
        demoHTML: '<div class="demo-nav"><span>🏠 Home</span><span>📝 Blog</span><span>📂 Categories</span><span>📧 Contact</span></div><div class="demo-header"><h4>📝 Pranav Blog</h4><p>Latest articles about tech and coding</p></div><div class="demo-grid"><div class="demo-card"><i class="fas fa-newspaper"></i><span>Getting Started<br>with React</span></div><div class="demo-card"><i class="fas fa-code"></i><span>Python Tips<br>and Tricks</span></div><div class="demo-card"><i class="fas fa-palette"></i><span>CSS Animation<br>Guide</span></div></div><div class="demo-btn">📖 Read More</div>'
    }
};

// ========== OPEN PREVIEW FUNCTION ==========
function openPreview(name) {
    var data = projectData[name];

    if (!data) {
        showToast('Preview coming soon for ' + name + '! 🚀', 'info');
        return;
    }

    var previewModal = document.getElementById('previewModal');

    document.getElementById('previewIcon').innerHTML = '<i class="fas ' + data.icon + '"></i>';
    document.getElementById('previewTitle').textContent = name;
    document.getElementById('previewBadges').innerHTML = '<span class="badge ' + data.badge + '">' + data.badgeText + '</span><span class="badge free">Free</span>';

    document.getElementById('previewDescription').textContent = data.description;

    var techHTML = '';
    data.tech.forEach(function(t) {
        techHTML += '<div class="tech-tag"><i class="' + t.icon + '"></i> ' + t.name + '</div>';
    });
    document.getElementById('previewTechs').innerHTML = techHTML;

    var featHTML = '';
    data.features.forEach(function(f) {
        featHTML += '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
    });
    document.getElementById('previewFeatures').innerHTML = featHTML;

    document.getElementById('previewDownloads').textContent = data.downloads;
    document.getElementById('previewStars').textContent = data.stars;
    document.getElementById('previewViews').textContent = data.views;
    document.getElementById('previewFiles').textContent = data.files;

    document.getElementById('browserUrl').textContent = 'https://' + data.url;
    document.getElementById('browserContent').innerHTML = data.demoHTML;

    document.getElementById('codeFilename').textContent = data.filename;
    document.getElementById('codeContent').innerHTML = '<code>' + escapeHtml(data.code) + '</code>';

    document.getElementById('fileTree').innerHTML = data.fileTree;

    document.getElementById('previewDownloadBtn').setAttribute('onclick', "closePreview(); downloadProject('" + name + "')");

    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    var previewModal = document.getElementById('previewModal');
    previewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function copyCode() {
    var codeText = document.getElementById('codeContent').textContent;
    navigator.clipboard.writeText(codeText).then(function() {
        showToast('Code copied to clipboard! 📋', 'success');
    }).catch(function() {
        showToast('Failed to copy code', 'error');
    });
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

