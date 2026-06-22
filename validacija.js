class ValidatorForme {
    constructor(idForme) {
        this.forma = document.getElementById(idForme);
        if (!this.forma) return;
        
        this.polja = {
            ime: {
                element: document.getElementById('name'),
                greska: document.getElementById('nameError'),
                obavezno: true,
                minDuzina: 3,
                maxDuzina: 50,
                obrazac: /^[a-zA-Z\sąććęłńóśźžđČĆŠĐŽ]+$/
            },
            email: {
                element: document.getElementById('email'),
                greska: document.getElementById('emailError'),
                obavezno: true,
                obrazac: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            telefon: {
                element: document.getElementById('phone'),
                greska: document.getElementById('phoneError'),
                obavezno: false,
                obrazac: /^[\+\s0-9]{6,}$/
            },
            naslov: {
                element: document.getElementById('subject'),
                greska: document.getElementById('subjectError'),
                obavezno: true,
                minDuzina: 5,
                maxDuzina: 100
            },
            poruka: {
                element: document.getElementById('message'),
                greska: document.getElementById('messageError'),
                obavezno: true,
                minDuzina: 10,
                maxDuzina: 1000
            }
        };
        
        this.pokreni();
    }

    dohvatiTrenutniJezik() {
        return localStorage.getItem('language') || 'sr';
    }
    
    pokreni() {
        this.forma.addEventListener('submit', (e) => this.obradiSlanje(e));
        this.podesiValidacijuURealnomVremenu();
        this.podesiValidacijuNaGubitakFokusa();
    }
    
    obradiSlanje(e) {
        e.preventDefault();
        
        if (this.proveriFormu()) {
            this.posaljiFormu();
        }
    }
    
    proveriFormu() {
        let isValid = true;
        
        for (const [nazivPolja, polje] of Object.entries(this.polja)) {
            if (!this.proveriPolje(nazivPolja)) {
                isValid = false;
            }
        }
        
        const saglasnost = document.getElementById('consent');
        if (saglasnost && !saglasnost.checked) {
            const trenutniJezik = this.dohvatiTrenutniJezik();
            const greskaPoruka = (trenutniJezik === 'en') 
                ? 'You must agree to the data processing.'
                : 'Morate se složiti sa obradom podataka.';
            this.prikaziGresku(greskaPoruka);
            isValid = false;
        }
        
        return isValid;
    }
    
    proveriPolje(nazivPolja) {
        const polje = this.polja[nazivPolja];
        if (!polje || !polje.element) return true;
        
        const vrednost = polje.element.value.trim();
        let isValid = true;
        let greskaPoruka = '';
        const trenutniJezik = this.dohvatiTrenutniJezik();

        if (polje.obavezno && vrednost === '') {
            greskaPoruka = (trenutniJezik === 'en') ? 'This field is required.' : 'Ovo polje je obavezno.';
            isValid = false;
        }

        if (isValid && polje.minDuzina && vrednost.length < polje.minDuzina) {
            if (trenutniJezik === 'en') {
                greskaPoruka = `Field must have at least ${polje.minDuzina} characters.`;
            } else {
                greskaPoruka = `Polje mora imati najmanje ${polje.minDuzina} karaktera.`;
            }
            isValid = false;
        }

        if (isValid && polje.maxDuzina && vrednost.length > polje.maxDuzina) {
            if (trenutniJezik === 'en') {
                greskaPoruka = `Field cannot have more than ${polje.maxDuzina} characters.`;
            } else {
                greskaPoruka = `Polje ne može imati više od ${polje.maxDuzina} karaktera.`;
            }
            isValid = false;
        }

        if (isValid && polje.obrazac && vrednost !== '' && !polje.obrazac.test(vrednost)) {
            greskaPoruka = (trenutniJezik === 'en') ? 'Field is not in the correct format.' : 'Polje nije u ispravnom formatu.';
            isValid = false;
        }
        
        if (!isValid) {
            this.prikaziGreskuPolja(nazivPolja, greskaPoruka);
        } else {
            this.ocistiGreskuPolja(nazivPolja);
        }
        
        return isValid;
    }
    
    prikaziGreskuPolja(nazivPolja, poruka) {
        const polje = this.polja[nazivPolja];
        if (polje.greska) {
            polje.greska.textContent = poruka;
            polje.greska.style.display = 'block';
        }
        
        if (polje.element) {
            polje.element.classList.add('error');
            polje.element.classList.remove('success');
        }
    }
    
    ocistiGreskuPolja(nazivPolja) {
        const polje = this.polja[nazivPolja];
        if (polje.greska) {
            polje.greska.textContent = '';
            polje.greska.style.display = 'none';
        }
        
        if (polje.element) {
            polje.element.classList.remove('error');
            polje.element.classList.add('success');
        }
    }
    
    prikaziGresku(poruka) {
        const greskaDiv = document.createElement('div');
        greskaDiv.className = 'form-error-general';
        greskaDiv.textContent = poruka;
        greskaDiv.style.cssText = `
            background: #f44336;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        `;
        
        const postojecaGreska = this.forma.querySelector('.form-error-general');
        if (postojecaGreska) {
            postojecaGreska.remove();
        }
        
        this.forma.insertBefore(greskaDiv, this.forma.firstChild);
        
        setTimeout(() => {
            if (greskaDiv.parentNode) {
                greskaDiv.remove();
            }
        }, 5000);
    }
    
    podesiValidacijuURealnomVremenu() {
        for (const nazivPolja of Object.keys(this.polja)) {
            const polje = this.polja[nazivPolja];
            if (polje.element) {
                polje.element.addEventListener('input', () => {
                    this.proveriPolje(nazivPolja);
                });
            }
        }
    }
    
    podesiValidacijuNaGubitakFokusa() {
        for (const nazivPolja of Object.keys(this.polja)) {
            const polje = this.polja[nazivPolja];
            if (polje.element) {
                polje.element.addEventListener('blur', () => {
                    this.proveriPolje(nazivPolja);
                });
            }
        }
    }
    
    posaljiFormu() {
        const formData = new FormData(this.forma);
        const podaci = {};
        
        for (let [kljuc, vrednost] of formData.entries()) {
            podaci[kljuc] = vrednost;
        }
        
        console.log('Slanje forme:', podaci);
        this.prikaziPorukuOUspehu();
        this.forma.reset();
        
        for (const polje of Object.values(this.polja)) {
            if (polje.element) {
                polje.element.classList.remove('success');
            }
        }
    }
    
    prikaziPorukuOUspehu() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        
        const trenutniJezik = this.dohvatiTrenutniJezik();
        let naslov, poruka;
        
        if (trenutniJezik === 'en') {
            naslov = 'Thank you for your message!';
            poruka = 'We will get back to you as soon as possible.';
        } else {
            naslov = 'Hvala na poruci!';
            poruka = 'Javićemo vam se u najkraćem mogućem roku.';
        }
        
        successDiv.innerHTML = `
            <h3>${naslov}</h3>
            <p>${poruka}</p>
        `;
        
        successDiv.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
            animation: sklizniDole 0.5s ease;
        `;
        
        this.forma.insertBefore(successDiv, this.forma.firstChild);
        
        setTimeout(() => {
            successDiv.style.animation = 'sklizniGore 0.5s ease';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 500);
        }, 5000);
    }
}

const stil = document.createElement('style');
stil.textContent = `
    @keyframes sklizniDole {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sklizniGore {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(stil);

document.addEventListener('DOMContentLoaded', function() {
    new ValidatorForme('contactForm');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidatorForme;
}
