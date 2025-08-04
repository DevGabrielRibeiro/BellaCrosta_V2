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
                        <input type="text" id="name" name="name" required ${currentUser ? 'readonly' : ''}>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefone:</label>
                        <input type="tel" id="phone" name="phone" required ${currentUser ? 'readonly' : ''}>
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
    
    // Preencher campos automaticamente se o usuário estiver logado
    if (currentUser) {
        modal.querySelector('#name').value = currentUser.nome;
        modal.querySelector('#phone').value = currentUser.telefone;
    }

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
        
        const formData = {
            nome: modal.querySelector('#name').value,
            telefone: modal.querySelector('#phone').value,
            data: modal.querySelector('#date').value,
            horario: modal.querySelector('#time').value,
            pessoas: modal.querySelector('#people').value
        };
        
        // Salvar reserva no localStorage (opcional)
        const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        reservas.push({
            ...formData,
            dataReserva: new Date().toISOString(),
            usuario: currentUser ? currentUser.email : 'Não logado'
        });
        localStorage.setItem('reservas', JSON.stringify(reservas));
        
        alert(`Reserva confirmada para ${formData.nome}! Entraremos em contato em breve.`);
        closeModal();
    });
}

// Add event listeners for reservation buttons
document.addEventListener('DOMContentLoaded', () => {
    const reservationButtons = document.querySelectorAll('.cta-button, .reserve-btn');
    reservationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Se não estiver logado, mostra o modal de login
            if (!currentUser) {
                showLoginModal();
            } else {
                showReservationModal();
            }
        });
    });
});



// Login/Cadastro modal functionality
let currentUser = null;

// Função para salvar dados do usuário
function saveUserData(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    currentUser = userData;
}

// Função para carregar dados do usuário
function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        return currentUser;
    }
    return null;
}

// Função para fazer logout
function logoutUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
}

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
                                <input type="text" placeholder="Nome" class="input" name="nome" id="signup-nome">
                            </div>
                            <div class="field input-field">
                                <input type="text" placeholder="CPF" class="input">
                            </div>
                            <div class="field input-field">
                                <input type="email" placeholder="Email" class="input" id="signup-email">
                            </div>
                            <div class="field input-field">
                                <input type="text" placeholder="Telefone" class="input" id="signup-telefone">
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
        
        const email = modal.querySelector('.login-form input[type="email"]').value;
        
        // Verificar se o usuário existe no localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.email === email);
        
        if (user) {
            // Salvar dados do usuário logado
            saveUserData({
                nome: user.nome,
                email: user.email,
                telefone: user.telefone
            });
            
            alert('Login efetuado com sucesso!');
            closeModal();

            // Alterar o botão "Entrar" para "Sair"
            updateLoginButton();
        } else {
            alert('Usuário não encontrado. Verifique suas credenciais ou faça o cadastro.');
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
        
        const nome = modal.querySelector('#signup-nome').value;
        const email = modal.querySelector('#signup-email').value;
        const telefone = modal.querySelector('#signup-telefone').value;
        
        // Validar se todos os campos estão preenchidos
        if (!nome || !email || !telefone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Salvar usuário no localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Verificar se o email já existe
        if (users.find(u => u.email === email)) {
            alert('Este email já está cadastrado. Faça login ou use outro email.');
            return;
        }
        
        const newUser = {
            nome: nome,
            email: email,
            telefone: telefone
        };
        
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        alert('Cadastro efetuado com sucesso! Faça login para continuar.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });


    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
}

// Função para atualizar o botão de login/logout
function updateLoginButton() {
    const entrarLink = document.querySelector('.nav-link.entrar, .nav-link.sair');
    if (!entrarLink) return;
    
    if (currentUser) {
        entrarLink.textContent = 'Sair';
        entrarLink.classList.remove('entrar');
        entrarLink.classList.add('sair');
        
        // Remove event listeners anteriores
        entrarLink.replaceWith(entrarLink.cloneNode(true));
        const newEntrarLink = document.querySelector('.nav-link.sair');
        
        newEntrarLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Deseja sair?")) {
                logoutUser();
                newEntrarLink.textContent = 'Entrar';
                newEntrarLink.classList.remove('sair');
                newEntrarLink.classList.add('entrar');
                
                // Reativar o modal de login
                newEntrarLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showLoginModal();
                });
            }
        });
    } else {
        entrarLink.textContent = 'Entrar';
        entrarLink.classList.remove('sair');
        entrarLink.classList.add('entrar');
    }
}

// Ativa o modal ao clicar no "Entrar"
document.addEventListener('DOMContentLoaded', function () {
    // Carregar dados do usuário se existirem
    loadUserData();
    updateLoginButton();
    
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