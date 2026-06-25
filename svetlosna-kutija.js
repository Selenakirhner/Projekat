(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        pokreniSvetlosnuKutiju();
    });
    
    function pokreniSvetlosnuKutiju() {
        const galerijaStavke = document.querySelectorAll('.galerija-stavka');
        if (galerijaStavke.length === 0) return;

        napraviSvetlosnuKutiju();
        
        const svetlosnaKutija = document.getElementById('svetlosna-kutija');
        const slikaUKutiji = document.getElementById('svetlosna-kutija-slika');
        const natpisUKutiji = document.getElementById('svetlosna-kutija-natpis');
        const dugmeZatvori = document.querySelector('.zatvori-svetlosnu-kutiju');
        const dugmePre = document.querySelector('.svetlosna-kutija-pre');
        const dugmeSledece = document.querySelector('.svetlosna-kutija-sledece');
        
        let trenutniIndeks = 0;
        
        galerijaStavke.forEach((stavka, indeks) => {
            stavka.addEventListener('click', function() {
                trenutniIndeks = indeks;
                otvoriSvetlosnuKutiju(this);
            });
        });
        
        function otvoriSvetlosnuKutiju(stavka) {
            const slika = stavka.querySelector('img');
            slikaUKutiji.src = slika.src;
            natpisUKutiji.innerHTML = '';
            svetlosnaKutija.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        if (dugmeZatvori) {
            dugmeZatvori.addEventListener('click', function() {
                svetlosnaKutija.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        svetlosnaKutija.addEventListener('click', function(e) {
            if (e.target === svetlosnaKutija) {
                svetlosnaKutija.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        if (dugmePre) {
            dugmePre.addEventListener('click', function() {
                trenutniIndeks = (trenutniIndeks - 1 + galerijaStavke.length) % galerijaStavke.length;
                otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndeks]);
            });
        }

        if (dugmeSledece) {
            dugmeSledece.addEventListener('click', function() {
                trenutniIndeks = (trenutniIndeks + 1) % galerijaStavke.length;
                otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndeks]);
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (svetlosnaKutija.style.display === 'block') {
                if (e.key === 'Escape') {
                    svetlosnaKutija.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    trenutniIndeks = (trenutniIndeks - 1 + galerijaStavke.length) % galerijaStavke.length;
                    otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndeks]);
                } else if (e.key === 'ArrowRight') {
                    trenutniIndeks = (trenutniIndeks + 1) % galerijaStavke.length;
                    otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndeks]);
                }
            }
        });
    }
    
    function napraviSvetlosnuKutiju() {
        if (document.getElementById('svetlosna-kutija')) return;
        
        const htmlSvetlosneKutije = `
            <div id="svetlosna-kutija" class="svetlosna-kutija">
                <span class="zatvori-svetlosnu-kutiju">&times;</span>
                <img class="svetlosna-kutija-sadrzaj" id="svetlosna-kutija-slika" alt="Uvećana slika">
                <div id="svetlosna-kutija-natpis"></div>
                <button class="svetlosna-kutija-pre">&#10094;</button>
                <button class="svetlosna-kutija-sledece">&#10095;</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', htmlSvetlosneKutije);
    }
})();
