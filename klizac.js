class KlizacSlika {
    constructor(selektorKlizaca) {
        this.klizac = document.querySelector(selektorKlizaca);
        if (!this.klizac) return;
        this.slajdovi = this.klizac.querySelectorAll('.slajd');
        this.dugmePre = document.querySelector('.klizac-kontrola.prethodni');
        this.dugmeSledeci = document.querySelector('.klizac-kontrola.sledeci');
        this.kontejnerTacaka = document.querySelector('.klizac-tacke');
        this.trenutniSlajd = 0;
        this.brojSlajdova = this.slajdovi.length;
        this.intervalAutomatskoPrikazivanje = null;
        this.brzinaAutomatskoPrikazivanje = 5000;
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
    
    prikaziSlajd(indeks) {
        if (indeks < 0) {
            indeks = this.brojSlajdova - 1;
        } else if (indeks >= this.brojSlajdova) {
            indeks = 0;
        }
        this.slajdovi.forEach(slajd => {
            slajd.classList.remove('aktivan');
        });
        this.slajdovi[indeks].classList.add('aktivan');
        this.azurirajTacke(indeks);
        this.trenutniSlajd = indeks;
    }
    
    azurirajTacke(indeks) {
        if (!this.kontejnerTacaka) return;
        const tacke = this.kontejnerTacaka.querySelectorAll('.tacka');
        tacke.forEach((tacka, i) => {
            if (i === indeks) {
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
        if (this.intervalAutomatskoPrikazivanje) return;
        this.intervalAutomatskoPrikazivanje = setInterval(() => {
            this.sledeciSlajd();
        }, this.brzinaAutomatskoPrikazivanje);
    }
    
    zaustaviAutomatskoPrikazivanje() {
        if (this.intervalAutomatskoPrikazivanje) {
            clearInterval(this.intervalAutomatskoPrikazivanje);
            this.intervalAutomatskoPrikazivanje = null;
        }
    }
    
    postaviBrzinuAutomatskogPrikazivanja(brzina) {
        this.brzinaAutomatskoPrikazivanje = brzina;
        this.zaustaviAutomatskoPrikazivanje();
        this.pokreniAutomatskoPrikazivanje();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new KlizacSlika('.klizac');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = KlizacSlika;
}
