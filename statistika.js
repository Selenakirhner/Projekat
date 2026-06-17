(function() {
    'use strict';
    

    document.addEventListener('DOMContentLoaded', function() {
        initNumberAnimation();
    });
    
    function initNumberAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        

        if (statNumbers.length === 0) return;
        

        function animateNumbers() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.innerText);
                
                if (current < target) {
                    const increment = Math.ceil(target / 50); 
                    let newValue = current + increment;
                    if (newValue > target) newValue = target;
                    stat.innerText = newValue;
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
        
        let animationStarted = false;
        let interval;
        
        function checkVisibilityAndAnimate() {
            const statsSection = document.querySelector('.stats-section');
            if (!animationStarted && statsSection && isElementInViewport(statsSection)) {
                animationStarted = true;
                

                statNumbers.forEach(stat => {
                    stat.innerText = '0';
                });
                
                interval = setInterval(() => {
                    let allFinished = true;
                    
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const current = parseInt(stat.innerText);
                        
                        if (current < target) {
                            allFinished = false;
                            const increment = Math.ceil(target / 50);
                            let newValue = current + increment;
                            if (newValue > target) newValue = target;
                            stat.innerText = newValue;
                        }
                    });
                    
                    if (allFinished) {
                        clearInterval(interval);
                    }
                }, 50); 
            }
        }
        //Provera vidljivosti i pokretanje animacije
        window.addEventListener('scroll', checkVisibilityAndAnimate);
        checkVisibilityAndAnimate();
    }
    
})();