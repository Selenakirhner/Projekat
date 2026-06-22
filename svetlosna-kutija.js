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
        
        let trenutniIndex = 0;

        galerijaStavke.forEach((stavka, index) => {
            stavka.addEventListener('click', function() {
                trenutniIndex = index;
                otvoriSvetlosnuKutiju(this);
            });
        });
        
        function otvoriSvetlosnuKutiju(stavka) {
            const img = stavka.querySelector('img');
            
            slikaUKutiji.src = img.src;
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
                trenutniIndex = (trenutniIndex - 1 + galerijaStavke.length) % galerijaStavke.length;
                otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndex]);
            });
        }

        if (dugmeSledece) {
            dugmeSledece.addEventListener('click', function() {
                trenutniIndex = (trenutniIndex + 1) % galerijaStavke.length;
                otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndex]);
            });
        }

        document.addEventListener('keydown', function(e) {
            if (svetlosnaKutija.style.display === 'block') {
                if (e.key === 'Escape') {
                    svetlosnaKutija.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    trenutniIndex = (trenutniIndex - 1 + galerijaStavke.length) % galerijaStavke.length;
                    otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndex]);
                } else if (e.key === 'ArrowRight') {
                    trenutniIndex = (trenutniIndex + 1) % galerijaStavke.length;
                    otvoriSvetlosnuKutiju(galerijaStavke[trenutniIndex]);
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
