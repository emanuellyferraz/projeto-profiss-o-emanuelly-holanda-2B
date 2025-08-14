// Menu Mobile
function menuShow() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').style.display = 'none';
    });
});

// Carrinho de Compras - Contador
let cartCount = 0;
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    // Animação do ícone do carrinho
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('animate');
    setTimeout(() => {
        cartIcon.classList.remove('animate');
    }, 500);
}

// Carrossel de Produtos
let currentSlide = 0;
const slides = document.querySelectorAll('.carrossel-slide');
const totalSlides = slides.length;

function moveCarrossel(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    const carrosselContainer = document.querySelector('.carrossel-container');
    carrosselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-avanço do carrossel
setInterval(() => {
    moveCarrossel(1);
}, 5000);

// Filtro de Produtos
function filterProducts() {
    const category = document.getElementById('categoria-filter').value;
    const price = document.getElementById('preco-filter').value;
    const products = document.querySelectorAll('.produto-item');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-categoria');
        const productPrice = parseFloat(product.getAttribute('data-preco'));
        
        let categoryMatch = category === 'todos' || productCategory === category;
        let priceMatch = true;
        
        if (price !== 'todos') {
            const [min, max] = price.split('-').map(Number);
            
            if (price.endsWith('+')) {
                priceMatch = productPrice >= min;
            } else {
                priceMatch = productPrice >= min && productPrice <= max;
            }
        }
        
        if (categoryMatch && priceMatch) {
            product.style.display = 'block';
            
            // Efeito de fade in
            product.style.opacity = '0';
            setTimeout(() => {
                product.style.opacity = '1';
            }, 100);
        } else {
            product.style.display = 'none';
        }
    });
}

// Filtro da Galeria
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adiciona a classe active ao botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'todos' || category === filter) {
                item.style.display = 'block';
                
                // Efeito de fade in
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal da Galeria
function openModal(imgSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    captionText.innerHTML = caption;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Adiciona evento de clique às imagens da galeria
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        const caption = img.nextElementSibling.querySelector('h3').textContent;
        openModal(img.src, caption);
    });
});

// Fechar modal ao clicar fora da imagem
window.addEventListener('click', (event) => {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Formulário de Contato
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-message');
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.className = 'success';
            messageDiv.textContent = 'Mensagem enviada com sucesso!';
            form.reset();
        } else {
            messageDiv.className = 'error';
            messageDiv.textContent = 'Erro ao enviar mensagem. Tente novamente.';
        }
    })
    .catch(error => {
        messageDiv.className = 'error';
        messageDiv.textContent = 'Erro ao enviar mensagem. Tente novamente.';
    });
});

// Formulário de Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input').value;
    const message = document.createElement('p');
    message.textContent = 'Obrigado por se cadastrar! Em breve você receberá nossas ofertas.';
    message.style.color = 'white';
    message.style.marginTop = '20px';
    
    this.parentNode.appendChild(message);
    this.reset();
    
    setTimeout(() => {
        message.remove();
    }, 5000);
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao rolar a página
function animateOnScroll() {
    const elements = document.querySelectorAll('.destaque-item, .produto-item, .mission-item, .team-member');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Configura animações iniciais
document.querySelectorAll('.destaque-item, .produto-item, .mission-item, .team-member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Dispara animações quando a página carrega e ao rolar
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
