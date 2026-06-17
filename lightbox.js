(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        initLightbox();
    });
    
    function initLightbox() {
        // Proveri da li smo na stranici sa galerijom
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;

        createLightbox();
        
        // Elementi lightbox-a
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        
        // Otvaranje lightbox-a na klik slike
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                openLightbox(this);
            });
        });
        
        function openLightbox(item) {
            const img = item.querySelector('img');
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = '';
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        // Zatvaranje
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Klik van slike
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Prethodna slika
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                openLightbox(galleryItems[currentIndex]);
            });
        }
        
        // Sledeća slika
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                openLightbox(galleryItems[currentIndex]);
            });
        }
        
        // Tastatura
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    openLightbox(galleryItems[currentIndex]);
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    openLightbox(galleryItems[currentIndex]);
                }
            }
        });
    }
    
    function createLightbox() {
        if (document.getElementById('lightbox')) return;
        
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-content" id="lightbox-img" alt="Uvećana slika">
                <div id="lightbox-caption"></div>
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
})();