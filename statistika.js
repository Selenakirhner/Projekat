(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        pokreniAnimacijuBrojeva();
    });
    
    function pokreniAnimacijuBrojeva() {
        const statBrojevi = document.querySelectorAll('.stat-broj');
        if (statBrojevi.length === 0) return;
        
        function animirajBrojeve() {
            statBrojevi.forEach(stat => {
                const cilj = parseInt(stat.getAttribute('data-target'));
                const trenutni = parseInt(stat.innerText);
                if (trenutni < cilj) {
                    const korak = Math.ceil(cilj / 50);
                    let novaVrednost = trenutni + korak;
                    if (novaVrednost > cilj) novaVrednost = cilj;
                    stat.innerText = novaVrednost;
                }
            });
        }
        
        function daLiJeElementUVidnomPolju(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        let animacijaPokrenuta = false;
        let interval;
        
        function proveriVidljivostIPokreniAnimaciju() {
            const statistikaSekcija = document.querySelector('.statistika-sekcija');
            if (!animacijaPokrenuta && statistikaSekcija && daLiJeElementUVidnomPolju(statistikaSekcija)) {
                animacijaPokrenuta = true;
                statBrojevi.forEach(stat => {
                    stat.innerText = '0';
                });
                interval = setInterval(() => {
                    let sviZavrseni = true;
                    statBrojevi.forEach(stat => {
                        const cilj = parseInt(stat.getAttribute('data-target'));
                        const trenutni = parseInt(stat.innerText);
                        if (trenutni < cilj) {
                            sviZavrseni = false;
                            const korak = Math.ceil(cilj / 50);
                            let novaVrednost = trenutni + korak;
                            if (novaVrednost > cilj) novaVrednost = cilj;
                            stat.innerText = novaVrednost;
                        }
                    });
                    
                    if (sviZavrseni) {
                        clearInterval(interval);
                    }
                }, 50);
            }
        }
        
        window.addEventListener('scroll', proveriVidljivostIPokreniAnimaciju);
        proveriVidljivostIPokreniAnimaciju();
    }
    
})();
