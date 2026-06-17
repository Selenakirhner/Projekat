// Čekamo da se DOM učita
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    initMobileMenu();
    initSmoothScroll();
    initNewsletterForm();
    initAnimationsOnScroll();
});

//MOBILNI MENI - Hamburger meni za mobilne uređaje
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animacija hamburger ikonice
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Za mega meni na mobilnim uređajima
    if (window.innerWidth <= 768) {
        megaMenuTriggers.forEach(trigger => {
            const link = trigger.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                trigger.classList.toggle('active');
            });
        });
    }
    
    // Zatvaranje menija kada se klikne van njega
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}


//SMOOTH SCROLL - Glatko skrolovanje za anchor linkove
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL bez refresha stranice
                history.pushState(null, null, targetId);
            }
        });
    });
}
//NEWSLETTER FORMA - Validacija i slanje newsletter forme
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Dohvati trenutni jezik
            let currentLang = localStorage.getItem('language') || 'sr';
            
            let successMsg, errorMsg;
            if (currentLang === 'en') {
                successMsg = 'Thank you for subscribing! Check your email.';
                errorMsg = 'Please enter a valid email address.';
            } else {
                successMsg = 'Hvala na prijavi! Proverite vaš email.';
                errorMsg = 'Molimo unesite validnu email adresu.';
            }
            
            if (validateEmail(email)) {
                showNotification(successMsg, 'success');
                emailInput.value = '';
            } else {
                showNotification(errorMsg, 'error');
            }
        });
    });
}
//VALIDACIJA EMAILA - Provera da li je email validan
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//NOTIFIKACIJA - Prikazivanje notifikacija korisniku
function showNotification(message, type = 'info') {
    // Proveri da li već postoji notifikacija
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Kreiraj notifikaciju
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Automatsko uklanjanje nakon 3 sekunde
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
//ANIMACIJE NA SKROL - Aktiviranje animacija kada element dođe u viewport
function initAnimationsOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .stat-item, .gallery-item');
    
    // Dodaj klasu za animaciju
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Provera pri skrolu
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    
    function checkVisibility() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
}

//CSS za animacije
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fadeStyle);
$(document).ready(function() {
    
//DUGME ZA TEMU SA STRANE
    const $themeBtn = $('<button>', {
        id: 'theme-toggle-side',
        class: 'side-btn theme-btn',
        text: '🌙',
        'aria-label': 'Promeni temu'
    }).css({
        'position': 'fixed',
        'bottom': '90px', 
        'right': '30px',
        'width': '50px',
        'height': '50px',
        'background': '#378a3a',
        'color': 'white',
        'border': 'none',
        'border-radius': '50%',
        'cursor': 'pointer',
        'font-size': '24px',
        'z-index': '999',
        'transition': 'all 0.3s ease',
        'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
        'display': 'none',
        'align-items': 'center',
        'justify-content': 'center'
    });
    
    $('body').append($themeBtn);
    
//DUGME ZA FONT SA STRANE
    const $fontControls = $('<div>', {
        id: 'font-side-controls',
        class: 'font-side-controls'
    }).css({
        'position': 'fixed',
        'bottom': '30px', 
        'left': '30px',
        'display': 'none',
        'flex-direction': 'column',

        'z-index': '999'
    });

    const $fontDecrease = $('<button>', {
        class: 'side-btn font-btn',
        id: 'font-side-decrease',
        text: 'A-',
        'aria-label': 'Smanji font'
    }).css({
        'width': '50px',
        'height': '50px',
        'margin-bottom': '10px',
        'background': '#378a3a',
        'color': 'white',
        'border': 'none',
        'border-radius': '50%',
        'cursor': 'pointer',
        'font-size': '20px',
        'font-weight': 'bold',
        'transition': 'all 0.3s ease',
        'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    });
    
    const $fontReset = $('<button>', {
        class: 'side-btn font-btn',
        id: 'font-side-reset',
        text: 'A',
        'aria-label': 'Resetuj font'
    }).css({
        'width': '50px',
        'height': '50px',
        'margin-bottom': '10px',
        'background': '#378a3a',
        'color': 'white',
        'border': 'none',
        'border-radius': '50%',
        'cursor': 'pointer',
        'font-size': '20px',
        'font-weight': 'bold',
        'transition': 'all 0.3s ease',
        'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    });
    
    const $fontIncrease = $('<button>', {
        class: 'side-btn font-btn',
        id: 'font-side-increase',
        text: 'A+',
        'aria-label': 'Uvećaj font'
    }).css({
        'width': '50px',
        'height': '50px',
        'margin-bottom': '0px',
        'background': '#378a3a',
        'color': 'white',
        'border': 'none',
        'border-radius': '50%',
        'cursor': 'pointer',
        'font-size': '20px',
        'font-weight': 'bold',
        'transition': 'all 0.3s ease',
        'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    });
    // Dodaj dugmad u kontrolu
    $fontControls.append($fontDecrease, $fontReset, $fontIncrease);
    $('body').append($fontControls);
    
//BACK TO TOP DUGME
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Nazad na vrh');
    
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #378a3a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTopBtn);
    
//HOVER EFEKTI ZA DUGMAD
    $('.side-btn').on('mouseenter', function() {
        $(this).css({
            'background': '#006f12',
            'transform': 'translateY(-5px)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'background': '#378a3a',
            'transform': 'translateY(0)'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#006f12';
        this.style.transform = 'translateY(-5px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#378a3a';
        this.style.transform = 'translateY(0)';
    });
    
//TAMNA TEMA
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        $('body').addClass('dark-theme');
        $themeBtn.text('☀️');
    } else {
        $('body').removeClass('dark-theme');
        $themeBtn.text('🌙');
    }
    
    $themeBtn.on('click', function() {
        $('body').toggleClass('dark-theme');
        
        if ($('body').hasClass('dark-theme')) {
            $(this).text('☀️');
            $('.side-btn, #backToTopBtn').css('background', '#4CAF50');
            localStorage.setItem('theme', 'dark');
        } else {
            $(this).text('🌙');
            $('.side-btn, #backToTopBtn').css('background', '#4CAF50');
            localStorage.setItem('theme', 'light');
        }
    });
    
//KONTROLA FONTA
    (function() {
        const baseSize = 16;
        let currentSize = localStorage.getItem('fontSize') ? 
                         parseFloat(localStorage.getItem('fontSize')) : baseSize;
        
        document.documentElement.style.fontSize = currentSize + 'px';
        
        $('#font-side-decrease').on('click', function() {
            if (currentSize > 12) {
                currentSize = currentSize - 1;
                document.documentElement.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            }
        });
        
        $('#font-side-reset').on('click', function() {
            currentSize = baseSize;
            document.documentElement.style.fontSize = baseSize + 'px';
            localStorage.setItem('fontSize', baseSize);
        });
        
        $('#font-side-increase').on('click', function() {
            if (currentSize < 24) {
                currentSize = currentSize + 1;
                document.documentElement.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            }
        });
    })();
    
//PRIKAZIVANJE NA SKROLU
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $themeBtn.fadeIn(300);
            $fontControls.fadeIn(300);
            $(backToTopBtn).fadeIn(300);
        } else {
            $themeBtn.fadeOut(300);
            $fontControls.fadeOut(300);
            $(backToTopBtn).fadeOut(300);
        }
    });
    
//BACK TO TOP KLIK
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
});
