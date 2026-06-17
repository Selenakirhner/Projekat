class ImageSlider {
    constructor(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;
        
        this.slides = this.slider.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-control.prev');
        this.nextBtn = document.querySelector('.slider-control.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        this.createDots();
        // Postavi event listenere
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Automatsko pokretanje slajdera
        this.startAutoPlay();
        
        // Zaustavi autoplay kada miš pređe preko slajdera
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
        
        //Strelice
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        this.showSlide(0);
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                this.showSlide(i);
                this.stopAutoPlay();
                this.startAutoPlay();
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    showSlide(index) {
        // Provera granica
        if (index < 0) {
            index = this.slideCount - 1;
        } else if (index >= this.slideCount) {
            index = 0;
        }
        
        // Sakrij sve slajdove
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Prikaži trenutni slajd
        this.slides[index].classList.add('active');
        
        // Ažuriraj dotove
        this.updateDots(index);
        
        this.currentSlide = index;
    }
    
    updateDots(index) {
        if (!this.dotsContainer) return;
        
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Metoda za promenu brzine autoplaya
    setAutoPlayDelay(delay) {
        this.autoPlayDelay = delay;
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Inicijalizacija slajdera kada se DOM učita
document.addEventListener('DOMContentLoaded', function() {
    new ImageSlider('.slider');
});

// Eksport za korišćenje u drugim modulima (ako je potrebno)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageSlider;
}