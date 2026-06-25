document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    pokreniMobilniMeni();
    pokreniGlatkoSkrolovanje();
    pokreniNovineFormu();
    pokreniAnimacijeNaSkrol();
});

function pokreniMobilniMeni() {
    const hamburgerMeni = document.querySelector('.hamburger-meni');
    const navigacioniMeni = document.querySelector('.navigacija-meni');
    const okidaciMegamenija = document.querySelectorAll('.megameni-okidac');
    
    if (hamburgerMeni && navigacioniMeni) {
        hamburgerMeni.addEventListener('click', function() {
            this.classList.toggle('aktivan');
            navigacioniMeni.classList.toggle('aktivan');
            
            const spanovi = this.querySelectorAll('span');
            if (this.classList.contains('aktivan')) {
                spanovi[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spanovi[1].style.opacity = '0';
                spanovi[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spanovi[0].style.transform = 'none';
                spanovi[1].style.opacity = '1';
                spanovi[2].style.transform = 'none';
            }
        });
    }
    
    if (window.innerWidth <= 768) {
        okidaciMegamenija.forEach(okidac => {
            const veza = okidac.querySelector('a');
            
            veza.addEventListener('click', function(e) {
                e.preventDefault();
                okidac.classList.toggle('aktivan');
            });
        });
    }
    
    document.addEventListener('click', function(e) {
        if (navigacioniMeni && navigacioniMeni.classList.contains('aktivan')) {
            if (!navigacioniMeni.contains(e.target) && !hamburgerMeni.contains(e.target)) {
                navigacioniMeni.classList.remove('aktivan');
                hamburgerMeni.classList.remove('aktivan');
                
                const spanovi = hamburgerMeni.querySelectorAll('span');
                spanovi[0].style.transform = 'none';
                spanovi[1].style.opacity = '1';
                spanovi[2].style.transform = 'none';
            }
        }
    });
}

function pokreniGlatkoSkrolovanje() {
    const linkovi = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    linkovi.forEach(veza => {
        veza.addEventListener('click', function(e) {
            e.preventDefault();
            
            const idCilja = this.getAttribute('href');
            const elementCilja = document.querySelector(idCilja);
            
            if (elementCilja) {
                const pomerajOdVrha = elementCilja.offsetTop - 100;
                
                window.scrollTo({
                    top: pomerajOdVrha,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, idCilja);
            }
        });
    });
}

function pokreniNovineFormu() {
    const forme = document.querySelectorAll('.novine-forma');
    
    forme.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const unosEmaila = this.querySelector('input[type="email"]');
            const email = unosEmaila.value.trim();
            
            let trenutniJezik = localStorage.getItem('language') || 'sr';
            
            let porukaUspesno, porukaGreska;
            if (trenutniJezik === 'en') {
                porukaUspesno = 'Thank you for subscribing! Check your email.';
                porukaGreska = 'Please enter a valid email address.';
            } else {
                porukaUspesno = 'Hvala na prijavi! Proverite vaš email.';
                porukaGreska = 'Molimo unesite validnu email adresu.';
            }
            
            if (proveriEmail(email)) {
                prikaziObavestenje(porukaUspesno, 'success');
                unosEmaila.value = '';
            } else {
                prikaziObavestenje(porukaGreska, 'error');
            }
        });
    });
}

function proveriEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function prikaziObavestenje(poruka, tip = 'info') {
    const postojeceObavestenje = document.querySelector('.notification');
    if (postojeceObavestenje) {
        postojeceObavestenje.remove();
    }
    
    const obavestenje = document.createElement('div');
    obavestenje.className = `notification notification-${tip}`;
    obavestenje.textContent = poruka;

    obavestenje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tip === 'success' ? '#4CAF50' : tip === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: uletiDesno 0.3s ease;
    `;
    
    document.body.appendChild(obavestenje);
    
    setTimeout(() => {
        obavestenje.style.animation = 'izletiDesno 0.3s ease';
        setTimeout(() => {
            obavestenje.remove();
        }, 300);
    }, 3000);
}

function pokreniAnimacijeNaSkrol() {
    const animiraniElementi = document.querySelectorAll('.usluga-kartica, .tim-kartica, .stat-stavka, .galerija-stavka');
    
    animiraniElementi.forEach(el => {
        el.classList.add('fade-in');
    });
    
    window.addEventListener('scroll', proveriVidljivost);
    proveriVidljivost();
    
    function proveriVidljivost() {
        animiraniElementi.forEach(el => {
            if (daLiJeElementUVidnomPolju(el)) {
                el.classList.add('visible');
            }
        });
    }
    
    function daLiJeElementUVidnomPolju(el) {
        const pravougaonik = el.getBoundingClientRect();
        return (
            pravougaonik.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            pravougaonik.bottom >= 0
        );
    }
}

const stilFade = document.createElement('style');
stilFade.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes uletiDesno {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes izletiDesno {
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
document.head.appendChild(stilFade);

$(document).ready(function() {

    const $themeBtn = $('<button>', {
        id: 'tema-promena-bocno',
        class: 'bocno-dugme tema-dugme',
        text: 'T',
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

    const $fontControls = $('<div>', {
        id: 'font-bocne-kontrole',
        class: 'font-bocne-kontrole'
    }).css({
        'position': 'fixed',
        'bottom': '30px',
        'left': '30px',
        'display': 'none',
        'flex-direction': 'column',
        'z-index': '999'
    });

    const $fontDecrease = $('<button>', {
        class: 'bocno-dugme font-dugme',
        id: 'font-bocno-smanji',
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
        class: 'bocno-dugme font-dugme',
        id: 'font-bocno-resetuj',
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
        class: 'bocno-dugme font-dugme',
        id: 'font-bocno-povecaj',
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
    
    $fontControls.append($fontDecrease, $fontReset, $fontIncrease);
    $('body').append($fontControls);
  
    const dugmeNaVrh = document.createElement('button');
    dugmeNaVrh.innerHTML = '^';
    dugmeNaVrh.setAttribute('aria-label', 'Nazad na vrh');
    
    dugmeNaVrh.style.cssText = `
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
    
    document.body.appendChild(dugmeNaVrh);

    $('.bocno-dugme').on('mouseenter', function() {
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
    
    dugmeNaVrh.addEventListener('mouseenter', function() {
        this.style.background = '#006f12';
        this.style.transform = 'translateY(-5px)';
    });
    
    dugmeNaVrh.addEventListener('mouseleave', function() {
        this.style.background = '#378a3a';
        this.style.transform = 'translateY(0)';
    });
 
    const sacuvanaTema = localStorage.getItem('theme');
    
    if (sacuvanaTema === 'dark') {
        $('body').addClass('tamna-tema');
        $themeBtn.text('S');
    } else {
        $('body').removeClass('tamna-tema');
        $themeBtn.text('T');
    }
    
    $themeBtn.on('click', function() {
        $('body').toggleClass('tamna-tema');
        
        if ($('body').hasClass('tamna-tema')) {
            $(this).text('S');
            $('.bocno-dugme, .tema-dugme').css('background', '#4CAF50');
            localStorage.setItem('theme', 'dark');
        } else {
            $(this).text('T');
            $('.bocno-dugme, .tema-dugme').css('background', '#4CAF50');
            localStorage.setItem('theme', 'light');
        }
    });

    (function() {
        const osnovnaVelicina = 16;
        let trenutnaVelicina = localStorage.getItem('fontSize') ? 
                         parseFloat(localStorage.getItem('fontSize')) : osnovnaVelicina;
        
        document.documentElement.style.fontSize = trenutnaVelicina + 'px';
        
        $('#font-bocno-smanji').on('click', function() {
            if (trenutnaVelicina > 12) {
                trenutnaVelicina = trenutnaVelicina - 1;
                document.documentElement.style.fontSize = trenutnaVelicina + 'px';
                localStorage.setItem('fontSize', trenutnaVelicina);
            }
        });
        
        $('#font-bocno-resetuj').on('click', function() {
            trenutnaVelicina = osnovnaVelicina;
            document.documentElement.style.fontSize = osnovnaVelicina + 'px';
            localStorage.setItem('fontSize', osnovnaVelicina);
        });
        
        $('#font-bocno-povecaj').on('click', function() {
            if (trenutnaVelicina < 24) {
                trenutnaVelicina = trenutnaVelicina + 1;
                document.documentElement.style.fontSize = trenutnaVelicina + 'px';
                localStorage.setItem('fontSize', trenutnaVelicina);
            }
        });
    })();

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $themeBtn.fadeIn(300);
            $fontControls.fadeIn(300);
            $(dugmeNaVrh).fadeIn(300);
        } else {
            $themeBtn.fadeOut(300);
            $fontControls.fadeOut(300);
            $(dugmeNaVrh).fadeOut(300);
        }
    });

    dugmeNaVrh.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
});
