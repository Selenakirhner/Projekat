class KlizacSlika {
    constructor(selectorKlizaca) {
        this.klizac = document.querySelector(selectorKlizaca);
        if (!this.klizac) return;
        
        this.slajdovi = this.klizac.querySelectorAll('.slajd');
        this.dugmePre = document.querySelector('.klizac-kontrola.prethodni');
        this.dugmeSledeci = document.querySelector('.klizac-kontrola.sledeci');
        this.kontejnerTacaka = document.querySelector('.klizac-tacke');
        
        this.trenutniSlajd = 0;
        this.brojSlajdova = this.slajdovi.length;
        this.intervalAutoplay = null;
        this.brzinaAutoplay = 5000;
        
        this.pokreni();
    }
    
    pokreni() {
        this.napraviTacke();
        
        if (this.dugmePre) {
            this.dugmePre.addEventListener('click', () => this.prethodniSlajd());
        }
        
        if (this.dugmeSledeci) {
            this.dugmeSledeci.addEventListener('click', () => this.sledeciSlajd());
        }
        
        this.pokreniAutomatskoPrikazivanje();
        
        this.klizac.addEventListener('mouseenter', () => this.zaustaviAutomatskoPrikazivanje());
        this.klizac.addEventListener('mouseleave', () => this.pokreniAutomatskoPrikazivanje());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prethodniSlajd();
            } else if (e.key === 'ArrowRight') {
                this.sledeciSlajd();
            }
        });

        this.prikaziSlajd(0);
    }
    
    napraviTacke() {
        if (!this.kontejnerTacaka) return;
        
        for (let i = 0; i < this.brojSlajdova; i++) {
            const tacka = document.createElement('span');
            tacka.classList.add('tacka');
            tacka.dataset.index = i;
            
            tacka.addEventListener('click', () => {
                this.prikaziSlajd(i);
                this.zaustaviAutomatskoPrikazivanje();
                this.pokreniAutomatskoPrikazivanje();
            });
            
            this.kontejnerTacaka.appendChild(tacka);
        }
    }
    
    prikaziSlajd(index) {
        if (index < 0) {
            index = this.brojSlajdova - 1;
        } else if (index >= this.brojSlajdova) {
            index = 0;
        }
        
        this.slajdovi.forEach(slajd => {
            slajd.classList.remove('aktivan');
        });
        
        this.slajdovi[index].classList.add('aktivan');
        
        this.azurirajTacke(index);
        
        this.trenutniSlajd = index;
    }
    
    azurirajTacke(index) {
        if (!this.kontejnerTacaka) return;
        
        const tacke = this.kontejnerTacaka.querySelectorAll('.tacka');
        tacke.forEach((tacka, i) => {
            if (i === index) {
                tacka.classList.add('aktivan');
            } else {
                tacka.classList.remove('aktivan');
            }
        });
    }
    
    sledeciSlajd() {
        this.prikaziSlajd(this.trenutniSlajd + 1);
    }
    
    prethodniSlajd() {
        this.prikaziSlajd(this.trenutniSlajd - 1);
    }
    
    pokreniAutomatskoPrikazivanje() {
        if (this.intervalAutoplay) return;
        
        this.intervalAutoplay = setInterval(() => {
            this.sledeciSlajd();
        }, this.brzinaAutoplay);
    }
    
    zaustaviAutomatskoPrikazivanje() {
        if (this.intervalAutoplay) {
            clearInterval(this.intervalAutoplay);
            this.intervalAutoplay = null;
        }
    }
    
    postaviBrzinuAutomatskogPrikazivanja(brzina) {
        this.brzinaAutoplay = brzina;
        this.zaustaviAutomatskoPrikazivanje();
        this.pokreniAutomatskoPrikazivanje();
    }
}

// Inicijalizacija slajdera kada se DOM učita
document.addEventListener('DOMContentLoaded', function() {
    new KlizacSlika('.klizac');
});

// Eksport za korišćenje u drugim modulima (ako je potrebno)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KlizacSlika;
}