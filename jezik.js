$(document).ready(function() {
    
    // Učitaj sačuvani jezik ili podrazumevani (srpski)
    let currentLang = localStorage.getItem('language') || 'sr';
    
    // Učitaj prevode i primeni
    loadTranslations(currentLang);
    
    // Klik na dugme za jezik
    $('.lang-btn').on('click', function() {
        const lang = $(this).data('lang');
        
        // Ako je veći isti jezik, ne radi ništa
        if (lang === currentLang) return;
        
        // Ažuriraj aktivno dugme
        $('.lang-btn').removeClass('active');
        $(this).addClass('active');
        
        // Sačuvaj izbor
        localStorage.setItem('language', lang);
        currentLang = lang;
        
        // Učitaj prevode
        loadTranslations(lang);
    });
    
    // Funkcija za učitavanje prevoda
    function loadTranslations(lang) {
        $.getJSON(`lang-${lang}.json`, function(translations) {
            applyTranslations(translations);
        }).fail(function() {
            console.error('Greška pri učitavanju prevoda za jezik:', lang);
            
            // Ako ne može da učita engleski, probaj srpski
            if (lang !== 'sr') {
                $.getJSON('lang-sr.json', function(translations) {
                    applyTranslations(translations);
                });
            }
        });
    }
    
    // Funkcija za primenu prevoda na stranicu
    function applyTranslations(translations) {
        // Navigacija
        $('.nav-menu a[href="index.html"]').text(translations.navigation.home);
        $('.footer-links a[href="index.html"]').text(translations.navigation.home);
        $('.nav-menu a[href="o-nama.html"]').text(translations.navigation.about);
        $('.footer-links a[href="o-nama.html"]').text(translations.navigation.about);
        $('.nav-menu a[href="usluge.html"]').text(translations.navigation.services);
        $('.footer-links a[href="usluge.html"]').text(translations.navigation.services);
        $('.nav-menu a[href="galerija.html"]').text(translations.navigation.gallery);
        $('.footer-links a[href="galerija.html"]').text(translations.navigation.gallery);
        $('.nav-menu a[href="kontakt.html"]').text(translations.navigation.contact);
        $('.footer-links a[href="kontakt.html"]').text(translations.navigation.contact);
        $('.nav-menu a[href="donacije.html"]').text(translations.navigation.donate);
        $('.mega-col a[href="psi.html"]').text(translations.navigation.dogAdoption);
        $('.mega-col a[href="macke.html"]').text(translations.navigation.catAdoption);
        $('.mega-col a[href="mikrocip.html"]').text(translations.navigation.microchip);
        $('.mega-col a[href="pregledi.html"]').text(translations.navigation.checkups);
        $('.mega-col a[href="sterilizacija.html"]').text(translations.navigation.sterilization);
        $('.mega-col a[href="vakcinacije.html"]').text(translations.navigation.vaccinations);
        $('.mega-col a[href="volontiranje.html"]').text(translations.navigation.volunteering);
        $('.mega-col:contains("Udomljavanje") h3').text(translations.navigation.adoption);
        $('.mega-col:contains("Veterinarska pomoć") h3').text(translations.navigation.vetHelp);
        $('.mega-col:contains("Volontiranje") h3').text(translations.navigation.volunteer);
        $('.donate-btn').text(translations.navigation.donate);
//INDEX
        $('.slide-content').eq(0).find('h2').text(translations['slide-content'].title1);
        $('.slide-content').eq(0).find('p').text(translations['slide-content'].description1);
        $('.slide-content').eq(0).find('.slider-btn').text(translations['slide-content'].button1);
        $('.slide-content').eq(1).find('h2').text(translations['slide-content'].title2);    
        $('.slide-content').eq(1).find('p').text(translations['slide-content'].description2);
        $('.slide-content').eq(1).find('.slider-btn').text(translations['slide-content'].button2);
        $('.slide-content').eq(2).find('h2').text(translations['slide-content'].title3);
        $('.slide-content').eq(2).find('p').text(translations['slide-content'].description3);
        $('.slide-content').eq(2).find('.slider-btn').text(translations['slide-content'].button3);


        // About preview
        $('.about-content h2').text(translations.about.title);
        $('.about-content p').text(translations.about.content);
        $('.about-content .btn-outline').text(translations.about.button);
        
        // Services
        $('.services-preview .section-title').text(translations.services.title);
        $('.service-card h3').eq(0).text(translations.services.dogAdoption);
        $('.service-card p').eq(0).text(translations.services.descriptionDog);
        $('.service-card h3').eq(1).text(translations.services.catAdoption);
        $('.service-card p').eq(1).text(translations.services.descriptionCat);
        $('.service-card h3').eq(2).text(translations.services.vet);
        $('.service-card p').eq(2).text(translations.services.descriptionVet);
        $('.read-more').text(translations.buttons.readMore + ' →');

        // Video
        $('.video-section h2').text(translations.video.title);
        $('.video-section p').text(translations.video.description);

        //Animacija
        $('.animation-section .container .section-title').text(translations.animation.title);
        $('.animated-box .overlay p').eq(0).text(translations.animation.description1);
        $('.animated-box .overlay p').eq(1).text(translations.animation.description2);
        $('.animated-box .overlay p').eq(2).text(translations.animation.description3);
        
        //Dokumenti
        $('.document-section .container h2').text(translations.documents.title);
        $('.documents-list span').eq(0).text(translations.documents.adoptionForm);
        $('.documents-list small').eq(0).text(translations.documents.download1);
        $('.documents-list span').eq(1).text(translations.documents.adoptionAgreement);
        $('.documents-list small').eq(1).text(translations.documents.download2);
        $('.documents-list span').eq(2).text(translations.documents.advice);
        $('.documents-list small').eq(2).text(translations.documents.download3);
  
        //Mapa
        $('.map-section .container h2').text(translations.map.title);
        $('.address-info p').eq(0).html(`<strong>${translations.map.addressLabel}</strong> ${translations.map.address}`);
        $('.address-info p').eq(1).html(`<strong>${translations.map.hoursLabel}</strong> ${translations.map.time}`);
//O NAMA
        //Hero
        $('.o-nama .hero-content1 h1').text(translations.hero2.title);
        $('.o-nama .hero-content1 p').eq(0).text(translations.hero2.subtitle);

        $('.o-nama .our-story h2').text(translations.story.title);
        $('.o-nama .story-text').eq(0).text(translations.story.content1);
        $('.o-nama .story-text').eq(1).text(translations.story.content2);
        $('.o-nama .story-text').eq(2).text(translations.story.content3);
        $('.o-nama .mission-vision h3').eq(0).text(translations.story.titleMission);
        $('.o-nama .mission-vision p').eq(0).text(translations.story.contentMission);
        $('.o-nama .mission-vision h3').eq(1).text(translations.story.tittleVision);
        $('.o-nama .mission-vision p').eq(1).text(translations.story.contentVision);
        
        //Statistika
        $('.o-nama .stats-section .container h2').text(translations.statistics.title);
        $('.o-nama .stat-item .stat-label').eq(0).text(translations.statistics.adoptedDogs);
        $('.o-nama .stat-item .stat-label').eq(1).text(translations.statistics.adoptedCats);
        $('.o-nama .stat-item .stat-label').eq(2).text(translations.statistics.volunteers);
        $('.o-nama .stat-item .stat-label').eq(3).text(translations.statistics.shelter);

        //Tim
        $('.o-nama .our-team .container h2').text(translations.team.title);
        $('.o-nama .team-card h3').eq(0).text(translations.team.name1);
        $('.o-nama .team-card .position').eq(0).text(translations.team.description1);
        $('.o-nama .team-card .bio').eq(0).text(translations.team.content1);
        $('.o-nama .team-card h3').eq(1).text(translations.team.name2);
        $('.o-nama .team-card .position').eq(1).text(translations.team.description2);
        $('.o-nama .team-card .bio').eq(1).text(translations.team.content2);
        $('.o-nama .team-card h3').eq(2).text(translations.team.name3);
        $('.o-nama .team-card .position').eq(2).text(translations.team.description3);
        $('.o-nama .team-card .bio').eq(2).text(translations.team.content3);
        $('.o-nama .team-card h3').eq(3).text(translations.team.name4);
        $('.o-nama .team-card .position').eq(3).text(translations.team.description4);
        $('.o-nama .team-card .bio').eq(3).text(translations.team.content4);
        $('.o-nama .partners h2').text(translations.team.partenrs);

//Galerija
        //Slike
        $('.gallery-section .section-title').text(translations.galleryPage.title);
        $('.gallery-intro').text(translations.galleryPage.intro);

        $('.gallery-item').each(function(index) {
        const itemNum = index + 1;
        const item = translations.galleryPage.items[`item${itemNum}`];
        
        if (item) {
                $(this).find('h3').text(item.title);
                $(this).find('p').first().text(item.subtitle);
                $(this).find('.description').text(item.description);
        }
        });
//USLUGE
        $('.hero-content h1').text(translations.hero3.title3);
        $('.hero-content p').eq(0).text(translations.hero3.subtitle3);

        $('.services-page .section-title').eq(0).text(translations.servicesPage.titleU); 
        $('.service-card1 h3').eq(0).text(translations.servicesPage.pet1);
        $('.service-card1 p').eq(0).text(translations.servicesPage.desc1);
        $('.service-card1 a').eq(0).text(translations.servicesPage.petBtn1+ ' →');

        $('.service-card1 h3').eq(1).text(translations.servicesPage.pet2);
        $('.service-card1 p').eq(1).text(translations.servicesPage.desc2);
        $('.service-card1 a').eq(1).text(translations.servicesPage.petBtn2+ ' →');

        $('.services-page .section-title').eq(1).text(translations.servicesPage.titleV);
        $('.service-card1 h3').eq(2).text(translations.servicesPage.vacc);
        $('.service-card1 p').eq(2).text(translations.servicesPage.desc3);
        $('.service-card1 a').eq(2).text(translations.servicesPage.vBtn1+ ' →');

        $('.service-card1 h3').eq(3).text(translations.servicesPage.ster);
        $('.service-card1 p').eq(3).text(translations.servicesPage.desc4);
        $('.service-card1 a').eq(3).text(translations.servicesPage.vBtn2+ ' →');

        $('.service-card1 h3').eq(4).text(translations.servicesPage.microchip);
        $('.service-card1 p').eq(4).text(translations.servicesPage.desc5);
        $('.service-card1 a').eq(4).text(translations.servicesPage.vBtn3+ ' →');

        $('.service-card1 h3').eq(5).text(translations.servicesPage.check);
        $('.service-card1 p').eq(5).text(translations.servicesPage.desc6);
        $('.service-card1 a').eq(5).text(translations.servicesPage.vBtn4+ ' →');

        $('.services-page .section-title').eq(2).text(translations.servicesPage.titleVol);
        $('.service-card1 h3').eq(6).text(translations.servicesPage.volon);
        $('.service-card1 p').eq(6).text(translations.servicesPage.descVo1);
        $('.service-card1 a').eq(6).text(translations.servicesPage.voBtn1+ ' →');

        $('.service-card1 h3').eq(7).text(translations.servicesPage.don);
        $('.service-card1 p').eq(7).text(translations.servicesPage.descVo2);
        $('.service-card1 a').eq(7).text(translations.servicesPage.voBtn2+ ' →');

        //CTA
        $('.cta-section h2').text(translations.ctaUsluge.title);
        $('.cta-section p').text(translations.ctaUsluge.description);
        $('.btn-cta').text(translations.ctaUsluge.ctaBtn);
//KONTAKT
        if ($('body').hasClass('contact-page')) {
                
                $('.bg-success .container h1').text(translations.hero.title);
                $('.hero-subtitle').text(translations.hero.subtitle); 
                $('.card h3').eq(0).text(translations.address.title);
                $('.card p').eq(0).text(translations.address.line1);
                $('.card p').eq(1).text(translations.address.line2);
                $('.card h3').eq(1).text(translations.phone.title);

                $('.col-lg-6 h2').first().text(translations.form.titleForm);
                $('label[for="name"]').text(translations.form.name);
                $('label[for="email"]').text(translations.form.email);
                $('label[for="phone"]').text(translations.form.phone);
                $('label[for="subject"]').text(translations.form.subject);
                $('label[for="interest"]').text(translations.form.interest);

                $('#interest option').first().text(translations.form.options.option);
                $('#interest option[value="Udomljavanje"]').text(translations.form.options.adoption);
                $('#interest option[value="Volontiranje"]').text(translations.form.options.volunteer);
                $('#interest option[value="Donacija"]').text(translations.form.options.donation);
                $('#interest option[value="Informacije"]').text(translations.form.options.info);
                $('#interest option[value="Ostalo"]').text(translations.form.options.other);

                $('input#name').attr('placeholder', translations.form.placeholders.name);
                $('input#email').attr('placeholder', translations.form.placeholders.email);
                $('input#phone').attr('placeholder', translations.form.placeholders.phone);
                $('input#subject').attr('placeholder', translations.form.placeholders.subject);
                $('textarea#message').attr('placeholder', translations.form.placeholders.message);

                $('label[for="message"]').text(translations.form.message);
                $('label[for="consent"]').text(translations.form.consent);
                $('.btn-success').first().text(translations.form.button);

                $('.col-lg-6 h2').last().text(translations.map1.titleMap);

                $('.card h3').eq(3).text(translations.workingHours.title);

                $('.list-unstyled li').eq(0).find('span').first().text(translations.workingHours.weekdays);
                $('.list-unstyled li').eq(0).find('span').last().text(translations.workingHours.weekdaysTime);

                $('.list-unstyled li').eq(1).find('span').first().text(translations.workingHours.saturday);
                $('.list-unstyled li').eq(1).find('span').last().text(translations.workingHours.saturdayTime);

                $('.list-unstyled li').eq(2).find('span').first().text(translations.workingHours.sunday);
                $('.list-unstyled li').eq(2).find('span').last().text(translations.workingHours.sundayStatus);

                $('.container.py-5 h2').first().text(translations.volunteer.title);
                $('.col-md-6 h3').text(translations.volunteer.heading);

                $('.list-unstyled .fs-5').eq(0).text(translations.volunteer.benefits['1']);
                $('.list-unstyled .fs-5').eq(1).text(translations.volunteer.benefits['2']);
                $('.list-unstyled .fs-5').eq(2).text(translations.volunteer.benefits['3']);
                $('.list-unstyled .fs-5').eq(3).text(translations.volunteer.benefits['4']);
                $('.list-unstyled .fs-5').eq(4).text(translations.volunteer.benefits['5']);

                $('.volunteer-description').text(translations.volunteer.description);

        }
//PSI
        $('.page-title').text(translations.dogsPage.title);
        $('.page-description').text(translations.dogsPage.description);

        $('.animal-card').each(function(index) {
            const dogNum = index + 1;
            const dog = translations.dogsPage.dogs[`dog${dogNum}`];
            
            if (dog) {
                const ageText = $(this).find('p').eq(0);
                ageText.html(`<strong>${translations.dogsPage.age}:</strong> ${dog.age}`);
                const breedText = $(this).find('p').eq(1);
                breedText.html(`<strong>${translations.dogsPage.breed}:</strong> ${dog.breed}`);
                $(this).find('.animal-desc').text(dog.desc);
                $(this).find('.btn-small').text(translations.dogsPage.button);
            }
        });

//MACKE
        $('.page-title1').text(translations.catsPage.title);
        $('.page-description1').text(translations.catsPage.description);

        $('.animal-card1').each(function(index) {
            const catNum = index + 1;
            const cat = translations.catsPage.cats[`cat${catNum}`];
            
            if (cat) {
                const ageText = $(this).find('p').eq(0);
                ageText.html(`<strong>${translations.catsPage.age}:</strong> ${cat.age}`);
                
                const breedText = $(this).find('p').eq(1);
                breedText.html(`<strong>${translations.catsPage.breed}:</strong> ${cat.breed}`);
                
                $(this).find('.animal-desc1').text(cat.desc);
                $(this).find('.btn-small').text(translations.catsPage.button);
            }
        });
//VAKCINACIJA
        $('.vacc-page .service-detail h2').first().text(translations.vaccinationPage.mainTitle);
        $('.vacc-page .service-detail p').first().text(translations.vaccinationPage.mainDescription);
        $('.vacc-page .service-detail h3').eq(0).text(translations.vaccinationPage.dogsTitle);
        $('.vacc-page .service-list').eq(0).find('li').eq(0).html(translations.vaccinationPage.dogsList.item1);
        $('.vacc-page .service-list').eq(0).find('li').eq(1).html(translations.vaccinationPage.dogsList.item2);
        $('.vacc-page .service-list').eq(0).find('li').eq(2).html(translations.vaccinationPage.dogsList.item3);
        $('.vacc-page .service-list').eq(0).find('li').eq(3).html(translations.vaccinationPage.dogsList.item4);
        $('.vacc-page .service-detail h3').eq(1).text(translations.vaccinationPage.catsTitle);
        $('.vacc-page .service-list').eq(1).find('li').eq(0).html(translations.vaccinationPage.catsList.item1);
        $('.vacc-page .service-list').eq(1).find('li').eq(1).html(translations.vaccinationPage.catsList.item2);
        $('.vacc-page .service-list').eq(1).find('li').eq(2).html(translations.vaccinationPage.catsList.item3);
        $('.vacc-page .service-detail h3').eq(2).text(translations.vaccinationPage.whenTitle);
        $('.vaccine-table th').eq(0).text(translations.vaccinationPage.table.header1);
        $('.vaccine-table th').eq(1).text(translations.vaccinationPage.table.header2);
        $('.vaccine-table tr').eq(1).find('td').eq(0).text(translations.vaccinationPage.table.row1.col1);
        $('.vaccine-table tr').eq(1).find('td').eq(1).text(translations.vaccinationPage.table.row1.col2);
        $('.vaccine-table tr').eq(2).find('td').eq(0).text(translations.vaccinationPage.table.row2.col1);
        $('.vaccine-table tr').eq(2).find('td').eq(1).text(translations.vaccinationPage.table.row2.col2);
        $('.vaccine-table tr').eq(3).find('td').eq(0).text(translations.vaccinationPage.table.row3.col1);
        $('.vaccine-table tr').eq(3).find('td').eq(1).text(translations.vaccinationPage.table.row3.col2);
        $('.vaccine-table tr').eq(4).find('td').eq(0).text(translations.vaccinationPage.table.row4.col1);
        $('.vaccine-table tr').eq(4).find('td').eq(1).text(translations.vaccinationPage.table.row4.col2);
        $('.vacc-page .price-card h4').text(translations.vaccinationPage.priceCard.title);
        $('.vacc-page .price-item span').eq(0).text(translations.vaccinationPage.priceCard.item1);
        $('.vacc-page .price-item span').eq(1).text(translations.vaccinationPage.priceCard.item2);
        $('.vacc-page .price-item span').eq(2).text(translations.vaccinationPage.priceCard.item3);
        $('.vacc-page .price-item.total span').text(translations.vaccinationPage.priceCard.total);
        $('.vacc-page .contact-sidebar h4').text(translations.vaccinationPage.contactSidebar.title);
        $('.vacc-page .contact-sidebar p').eq(2).html(`<img src="usluge/ikonica-radnoVreme.png" alt="Radno vreme"> ${translations.vaccinationPage.contactSidebar.workTime}`);
        $('.vacc-page .btn-sidebar').text(translations.vaccinationPage.contactSidebar.button);
        $('.vacc-page .note-card h4').text(translations.vaccinationPage.noteCard.title);
        $('.vacc-page .note-card p').text(translations.vaccinationPage.noteCard.text);
        $('.vacc-page .cta-section h2').text(translations.vaccinationPage.cta.title);
        $('.vacc-page .cta-section p').text(translations.vaccinationPage.cta.description);
        $('.vacc-page .btn-cta').text(translations.vaccinationPage.cta.button);
        $('.vacc-page .video-section h2').text(translations.vaccinationPage.vaccinationVideo.title);
        $('.vacc-page .video-section h3').text(translations.vaccinationPage.vaccinationVideo.title2);
        $('.vacc-page .video-section p').text(translations.vaccinationPage.vaccinationVideo.description);

//DONACIJE
        $('.donations-page .service-detail h2').text(translations.donationsPage.title);
        $('.donations-page .service-detail p').first().text(translations.donationsPage.description);

        $('.donations-page .donation-card h3').eq(0).text(translations.donationsPage.cards.money.title);
        $('.donations-page .donation-card p').eq(0).text(translations.donationsPage.cards.money.account);
        $('.donations-page .donation-card p').eq(1).text(translations.donationsPage.cards.money.paypal);

        $('.donations-page .donation-card h3').eq(1).text(translations.donationsPage.cards.food.title);
        $('.donations-page .donation-card p').eq(2).text(translations.donationsPage.cards.food.text);
        $('.donations-page .donation-card ul').eq(0).find('li').eq(0).text(translations.donationsPage.cards.food.items.item1);
        $('.donations-page .donation-card ul').eq(0).find('li').eq(1).text(translations.donationsPage.cards.food.items.item2);
        $('.donations-page .donation-card ul').eq(0).find('li').eq(2).text(translations.donationsPage.cards.food.items.item3);

        $('.donations-page .donation-card h3').eq(2).text(translations.donationsPage.cards.equipment.title);
        $('.donations-page .donation-card ul').eq(1).find('li').eq(0).text(translations.donationsPage.cards.equipment.items.item1);
        $('.donations-page .donation-card ul').eq(1).find('li').eq(1).text(translations.donationsPage.cards.equipment.items.item2);
        $('.donations-page .donation-card ul').eq(1).find('li').eq(2).text(translations.donationsPage.cards.equipment.items.item3);
        $('.donations-page .donation-card ul').eq(1).find('li').eq(3).text(translations.donationsPage.cards.equipment.items.item4);

        $('.donations-page .donation-card h3').eq(3).text(translations.donationsPage.cards.medical.title);
        $('.donations-page .donation-card ul').eq(2).find('li').eq(0).text(translations.donationsPage.cards.medical.items.item1);
        $('.donations-page .donation-card ul').eq(2).find('li').eq(1).text(translations.donationsPage.cards.medical.items.item2);
        $('.donations-page .donation-card ul').eq(2).find('li').eq(2).text(translations.donationsPage.cards.medical.items.item3);
//MIKROCIPOVANJE
        $('.mikrocip .service-detail h2').text(translations.microchipPage.title);
        $('.mikrocip .service-detail p').eq(0).text(translations.microchipPage.description);
        $('.mikrocip .service-detail h3').eq(0).text(translations.microchipPage.whatTitle);
        $('.mikrocip .service-detail p').eq(1).text(translations.microchipPage.whatText);
        $('.mikrocip .service-detail h3').eq(1).text(translations.microchipPage.procedureTitle);

        $('.mikrocip .service-steps li').eq(0).html(translations.microchipPage.steps.step1);
        $('.mikrocip .service-steps li').eq(1).html(translations.microchipPage.steps.step2);
        $('.mikrocip .service-steps li').eq(2).html(translations.microchipPage.steps.step3);
        $('.mikrocip .service-steps li').eq(3).html(translations.microchipPage.steps.step4);
        $('.mikrocip .service-steps li').eq(4).html(translations.microchipPage.steps.step5);

        $('.mikrocip .price-card h4').text(translations.microchipPage.priceCard.title);
        $('.mikrocip .price-item span').eq(0).text(translations.microchipPage.priceCard.item1);
        $('.mikrocip .price-item span').eq(1).text(translations.microchipPage.priceCard.item2);
        $('.mikrocip .price-item span').eq(2).text(translations.microchipPage.priceCard.item3);

//PREGLEDI
        $('.pregledi .service-detail h2').text(translations.checkupsPage.title);
        $('.pregledi .service-detail p').first().text(translations.checkupsPage.description);

        $('.pregledi .service-detail h3').eq(0).text(translations.checkupsPage.includesTitle);
        $('.pregledi .service-list').eq(0).find('li').eq(0).html(translations.checkupsPage.includesList.item1);
        $('.pregledi .service-list').eq(0).find('li').eq(1).html(translations.checkupsPage.includesList.item2);
        $('.pregledi .service-list').eq(0).find('li').eq(2).html(translations.checkupsPage.includesList.item3);
        $('.pregledi .service-list').eq(0).find('li').eq(3).html(translations.checkupsPage.includesList.item4);
        $('.pregledi .service-list').eq(0).find('li').eq(4).html(translations.checkupsPage.includesList.item5);
        $('.pregledi .service-list').eq(0).find('li').eq(5).html(translations.checkupsPage.includesList.item6);

        $('.pregledi .service-detail h3').eq(1).text(translations.checkupsPage.additionalTitle);
        $('.pregledi .service-detail ul').eq(1).find('li').eq(0).text(translations.checkupsPage.additionalList.item1);
        $('.pregledi .service-detail ul').eq(1).find('li').eq(1).text(translations.checkupsPage.additionalList.item2);
        $('.pregledi .service-detail ul').eq(1).find('li').eq(2).text(translations.checkupsPage.additionalList.item3);
        $('.pregledi .service-detail ul').eq(1).find('li').eq(3).text(translations.checkupsPage.additionalList.item4);

        $('.pregledi .price-card h4').text(translations.checkupsPage.priceCard.title);
        $('.pregledi .price-item span').text(translations.checkupsPage.priceCard.item1);
//STERILIZACIJA
        $('.sterilizacija .service-detail h2').text(translations.sterilizationPage.title);
        $('.sterilizacija .service-detail p').first().text(translations.sterilizationPage.description);

        $('.sterilizacija .service-detail h3').eq(0).text(translations.sterilizationPage.benefitsTitle);
        $('.sterilizacija .service-list li').eq(0).html(translations.sterilizationPage.benefitsList.item1);
        $('.sterilizacija .service-list li').eq(1).html(translations.sterilizationPage.benefitsList.item2);
        $('.sterilizacija .service-list li').eq(2).html(translations.sterilizationPage.benefitsList.item3);
        $('.sterilizacija .service-list li').eq(3).html(translations.sterilizationPage.benefitsList.item4);
        $('.sterilizacija .service-list li').eq(4).html(translations.sterilizationPage.benefitsList.item5);

        $('.sterilizacija .service-detail h3').eq(1).text(translations.sterilizationPage.whenTitle);
        $('.sterilizacija .service-detail p').eq(1).text(translations.sterilizationPage.whenText);

        $('.sterilizacija .price-card h4').text(translations.sterilizationPage.priceCard.title);
        $('.sterilizacija .price-item span').eq(0).text(translations.sterilizationPage.priceCard.item1);
        $('.sterilizacija .price-item span').eq(1).text(translations.sterilizationPage.priceCard.item2);
        $('.sterilizacija .price-item span').eq(2).text(translations.sterilizationPage.priceCard.item3);
        $('.sterilizacija .price-item span').eq(3).text(translations.sterilizationPage.priceCard.item4);
        $('.sterilizacija .price-item span').eq(4).text(translations.sterilizationPage.priceCard.item5);
        $('.sterilizacija .price-item span').eq(5).text(translations.sterilizationPage.priceCard.item6);
        $('.sterilizacija .price-item span').eq(6).text(translations.sterilizationPage.priceCard.item7);
//VOLONTIRANJE
        $('.volontiranje .service-detail h2').text(translations.volunteerPage.title);
        $('.volontiranje .service-detail p').first().text(translations.volunteerPage.description);

        $('.volontiranje .service-detail h3').eq(0).text(translations.volunteerPage.activitiesTitle);
        $('.volontiranje .activity h4').eq(0).text(translations.volunteerPage.activities.walking.title);
        $('.volontiranje .activity p').eq(0).text(translations.volunteerPage.activities.walking.text);
        $('.volontiranje .activity h4').eq(1).text(translations.volunteerPage.activities.feeding.title);
        $('.volontiranje .activity p').eq(1).text(translations.volunteerPage.activities.feeding.text);
        $('.volontiranje .activity h4').eq(2).text(translations.volunteerPage.activities.cleaning.title);
        $('.volontiranje .activity p').eq(2).text(translations.volunteerPage.activities.cleaning.text);
        $('.volontiranje .activity h4').eq(3).text(translations.volunteerPage.activities.photo.title);
        $('.volontiranje .activity p').eq(3).text(translations.volunteerPage.activities.photo.text);
        $('.volontiranje .activity h4').eq(4).text(translations.volunteerPage.activities.transport.title);
        $('.volontiranje .activity p').eq(4).text(translations.volunteerPage.activities.transport.text);

        $('.volontiranje .service-detail h3').eq(1).text(translations.volunteerPage.howTitle);
        $('.volontiranje .service-steps li').eq(0).text(translations.volunteerPage.steps.step1);
        $('.volontiranje .service-steps li').eq(1).text(translations.volunteerPage.steps.step2);
        $('.volontiranje .service-steps li').eq(2).text(translations.volunteerPage.steps.step3);
        $('.volontiranje .service-steps li').eq(3).text(translations.volunteerPage.steps.step4);

        $('.volontiranje .volunteer-form h3').text(translations.volunteerPage.form.title);
        $('.volontiranje .volunteer-form input[type="text"]').attr('placeholder', translations.volunteerPage.form.namePlaceholder);
        $('.volontiranje .volunteer-form input[type="email"]').attr('placeholder', translations.volunteerPage.form.emailPlaceholder);
        $('.volontiranje .volunteer-form input[type="tel"]').attr('placeholder', translations.volunteerPage.form.phonePlaceholder);
        $('.volontiranje .volunteer-form select option').eq(0).text(translations.volunteerPage.form.selectLabel);
        $('.volontiranje .volunteer-form select option').eq(1).text(translations.volunteerPage.form.selectOptions.option1);
        $('.volontiranje .volunteer-form select option').eq(2).text(translations.volunteerPage.form.selectOptions.option2);
        $('.volontiranje .volunteer-form select option').eq(3).text(translations.volunteerPage.form.selectOptions.option3);
        $('.volontiranje .volunteer-form select option').eq(4).text(translations.volunteerPage.form.selectOptions.option4);
        $('.volontiranje .volunteer-form select option').eq(5).text(translations.volunteerPage.form.selectOptions.option5);
        $('.volontiranje .volunteer-form select option').eq(6).text(translations.volunteerPage.form.selectOptions.option6);
        $('.volontiranje .volunteer-form textarea').attr('placeholder', translations.volunteerPage.form.textareaPlaceholder);
        $('.volontiranje .btn-submit').text(translations.volunteerPage.form.submitButton);

        $('.volontiranje .info-card h4').text(translations.volunteerPage.infoCard.title);
        $('.volontiranje .info-card p').eq(0).html(translations.volunteerPage.infoCard.location);
        $('.volontiranje .info-card p').eq(1).html(translations.volunteerPage.infoCard.time);
        $('.volontiranje .info-card p').eq(2).html(translations.volunteerPage.infoCard.contact);
        $('.volontiranje .info-card p').eq(3).html(translations.volunteerPage.infoCard.required);
// FOOTER
        $('.footer-section h4').eq(0).text(translations.navigation.name);
        $('.footer-section h4').eq(1).text(translations.footer.quickLinks);
        $('.footer-section h4').eq(2).text(translations.footer.contact);
        $('.footer-section h4').eq(3).text(translations.footer.newsletter);
        
        
        $('.footer-section p').eq(0).text(translations.navigation.description);
        $('.footer-section p').eq(1).text(translations.footer.newsletter);
        
       $('.contact-info li').eq(0).html(`<img src="footer/telefon-ikonica.png" alt="Telefon"> ${translations.footer.phone}`);
        $('.contact-info li').eq(1).html(`<img src="footer/email-ikonica.png" alt="Email"> ${translations.footer.email}`);
        $('.contact-info li').eq(2).html(`<img src="footer/lokacija-ikonica.png" alt="Lokacija"> ${translations.footer.address}`);

        $('.footer-links a[href="index.html"]').text(translations.navigation.home);
        $('.footer-links a[href="o-nama.html"]').text(translations.navigation.about);
        $('.footer-links a[href="usluge.html"]').text(translations.navigation.services);
        $('.footer-links a[href="galerija.html"]').text(translations.navigation.gallery);
        $('.footer-links a[href="kontakt.html"]').text(translations.navigation.contact);
        
        $('.newsletter-form input').attr('placeholder', translations.footer.emailPlaceholder);
        $('.newsletter-form button').text(translations.footer.subscribe);
        
        $('.footer-bottom p').html(`© 2026 ${translations.navigation.name} - ${translations.footer.rights}. | <a href="politika-privatnosti.html">${translations.footer.privacy}</a> | <a href="uslovi.html">${translations.footer.terms}</a>`);
        
        // Kontakt forma
        if ($('#contactForm').length) {
            $('label[for="name"]').text(translations.contact.name + ' *');
            $('label[for="email"]').text(translations.contact.email + ' *');
            $('label[for="phone"]').text(translations.contact.phone);
            $('label[for="message"]').text(translations.contact.message + ' *');
            $('.submit-btn').text(translations.contact.send);
        }
    }
});