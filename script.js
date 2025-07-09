/**
 * Escola Sementinha - Script Principal
 * Funcionalidades:
 * - Menu responsivo
 * - Scroll suave
 * - Validação de formulário
 * - Slider de depoimentos
 * - Botão voltar ao topo
 * - Animações ao scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Slider de depoimentos
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remover classe active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adicionar classe active ao slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Event listeners para os controles do slider
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-play do slider (a cada 5 segundos)
    let sliderInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Parar auto-play quando o mouse estiver sobre o slider
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            sliderInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        });
    }
    
    // Validação do formulário
    const form = document.getElementById('formulario-contato');
    const formSuccess = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar mensagens de erro anteriores
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => {
                message.textContent = '';
            });
            
            // Validar campos
            let isValid = true;
            
            // Validar nome
            const nome = document.getElementById('nome');
            if (!nome.value.trim()) {
                showError(nome, 'Por favor, informe seu nome');
                isValid = false;
            }
            
            // Validar email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError(email, 'Por favor, informe seu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, informe um email válido');
                isValid = false;
            }
            
            // Validar telefone
            const telefone = document.getElementById('telefone');
            if (!telefone.value.trim()) {
                showError(telefone, 'Por favor, informe seu telefone');
                isValid = false;
            } else if (!isValidPhone(telefone.value)) {
                showError(telefone, 'Por favor, informe um telefone válido');
                isValid = false;
            }
            
            // Validar mensagem
            const mensagem = document.getElementById('mensagem');
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Por favor, escreva sua mensagem');
                isValid = false;
            }
            
            // Se todos os campos estiverem válidos, mostrar mensagem de sucesso
            if (isValid) {
                form.reset();
                form.style.display = 'none';
                formSuccess.classList.remove('hidden');
                
                // Após 5 segundos, ocultar mensagem de sucesso e mostrar formulário novamente
                setTimeout(function() {
                    formSuccess.classList.add('hidden');
                    form.style.display = 'block';
                }, 5000);
            }
        });
    }
    
    // Função para mostrar mensagem de erro
    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar telefone
    function isValidPhone(phone) {
        // Aceita formatos: (XX) XXXXX-XXXX ou XX XXXXX-XXXX ou XXXXXXXXXX
        const re = /^(?:\([0-9]{2}\) ?|[0-9]{2} ?)?[0-9]{5}-?[0-9]{4}$/;
        return re.test(phone);
    }
    
    // Botão voltar ao topo
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Animações ao scroll
    const animateElements = document.querySelectorAll('.section-title, .card, .turma-item, .valor-item');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fade');
            }
        });
    }
    
    // Verificar posição inicial dos elementos
    window.addEventListener('load', checkScroll);
    
    // Verificar posição dos elementos ao rolar a página
    window.addEventListener('scroll', checkScroll);
    
    // Adicionar máscara ao campo de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Formatar como (XX) XXXXX-XXXX
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Efeito de destaque no header ao rolar
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Destacar item do menu conforme a seção visível
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const headerHeight = document.querySelector('#header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 10) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
