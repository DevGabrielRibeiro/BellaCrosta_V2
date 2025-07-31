// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Pizza carousel functionality
class PizzaCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.pizza-slide');
        this.totalSlides = this.slides.length;
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');

        this.init();
    }

    init() {
        this.showSlide(this.currentSlide);
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Auto-play carousel
        setInterval(() => this.nextSlide(), 4000);
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PizzaCarousel();
});

// Reservation modal functionality
function showReservationModal() {
    const modal = document.createElement('div');
    modal.className = 'reservation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Fazer Reserva</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="reservation-form">
                    <div class="form-group">
                        <label for="name">Nome:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefone:</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="date">Data:</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Horário:</label>
                        <input type="time" id="time" name="time" required>
                    </div>
                    <div class="form-group">
                        <label for="people">Número de pessoas:</label>
                        <select id="people" name="people" required>
                            <option value="">Selecione</option>
                            <option value="1">1 pessoa</option>
                            <option value="2">2 pessoas</option>
                            <option value="3">3 pessoas</option>
                            <option value="4">4 pessoas</option>
                            <option value="5">5 pessoas</option>
                            <option value="6">6+ pessoas</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">Confirmar Reserva</button>
                        <button type="button" class="cancel-btn">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        modal.remove();
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form submission
    modal.querySelector('.reservation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Reserva confirmada! Entraremos em contato em breve.');
        closeModal();
    });
}

// Add event listeners for reservation buttons
document.addEventListener('DOMContentLoaded', () => {
    const reservationButtons = document.querySelectorAll('.cta-button, .reserve-btn');
    reservationButtons.forEach(button => {
        button.addEventListener('click', showReservationModal);
    });
});



// Login/Cadastro modal functionality
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Seja bem-vindo!</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form login">
                    <div class="form-content">
                        <header>Login</header>
                        <form action="#" class="login-form">
                            <div class="field input-field">
                                <input type="email" placeholder="Email" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="password" placeholder="Digite uma senha" class="password">
                            </div>
                            <div class="field button-field">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div class="form-link">
                            <span>Não possue conta? <a href="#" class="link signup-link">Registra-se</a></span>
                        </div>
                    </div>
                </div>
                <div class="form signup">
                    <div class="form-content">
                        <header>Cadastrar</header>
                        <form action="#" class="signup-form">
                            <div class="field input-field">
                                <input type="text" placeholder="Nome" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="text" placeholder="CPF" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="email" placeholder="Email" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="text" placeholder="Telefone" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="password" placeholder="Senha" class="password">
                            </div>
                            <div class="form-link">
                                <a href="#" class="forgot-pass">Esqueceu sua senha?</a>
                            </div>
                            <div class="field button-field">
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>
                        <div class="form-link">
                            <span>Já tem conta? <a href="#" class="link login-link">Login</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Função de fechar o modal
    const closeModal = () => modal.remove();

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Submissão do login
    modal.querySelector('.login-form').addEventListener('submit', e => {
        e.preventDefault();

        // Aqui você pode validar o login com backend se quiser

        alert('Login efetuado com sucesso!');
        closeModal();

        // Alterar o botão "Entrar" para "Sair"
        const entrarLink = document.querySelector('.nav-link.entrar');
        if (entrarLink) {
            entrarLink.textContent = 'Sair';
            entrarLink.classList.remove('entrar');
            entrarLink.classList.add('sair');

            // Define o evento de logout
            entrarLink.addEventListener('click', function logout(e) {
                e.preventDefault();
                // Confirmação (opcional)
                if (confirm("Deseja sair?")) {
                    entrarLink.textContent = 'Entrar';
                    entrarLink.classList.remove('sair');
                    entrarLink.classList.add('entrar');

                    // Remove este event listener de logout para evitar duplicação
                    entrarLink.removeEventListener('click', logout);
                }
            });
        }
    });


    // Alternância entre formulários
    const loginForm = modal.querySelector('.form.login');
    const signupForm = modal.querySelector('.form.signup');
    signupForm.style.display = 'none';

    modal.querySelector('.signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    modal.querySelector('.login-link').addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Submissão do cadastro
    modal.querySelector('.signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cadastro efetuado, faça login');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });


    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
}

// Ativa o modal ao clicar no "Entrar"
document.addEventListener('DOMContentLoaded', function () {
    const entrarLink = document.querySelector('.nav-link.entrar');

    if (entrarLink) {
        entrarLink.addEventListener('click', function (e) {
            e.preventDefault();
            showLoginModal();
        });
    }
});



// Menu visualization functionality
document.querySelector('.view-menu-btn').addEventListener('click', () => {
    document.querySelector('#cardapio').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('#cardapio').scrollIntoView({
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.menu-item, .service-card, .about-text, .brazilian-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Service card navigation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const sections = ['#pizzas', '#cardapio', '#contato', '#sobre'];
        const targetSection = sections[index];
        if (targetSection) {
            document.querySelector(targetSection).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Add cursor pointer
    card.style.cursor = 'pointer';
});

// Loading screen (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form functionality (if needed)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada! Obrigado pelo contato.');
            contactForm.reset();
        });
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}