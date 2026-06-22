$(document).ready(function() {
    
    let trenutniJezik = localStorage.getItem('language') || 'sr';

    ucitajPrevode(trenutniJezik);

    $('.jezik-dugme').on('click', function() {
        const jezik = $(this).data('lang');

        if (jezik === trenutniJezik) return;

        $('.jezik-dugme').removeClass('aktivan');
        $(this).addClass('aktivan');

        localStorage.setItem('language', jezik);
        trenutniJezik = jezik;

        ucitajPrevode(jezik);
    });

    function ucitajPrevode(jezik) {
        $.getJSON(`lang-${jezik}.json`, function(prevodi) {
            primeniPrevode(prevodi);
        }).fail(function() {
            console.error('Greška pri učitavanju prevoda za jezik:', jezik);

            if (jezik !== 'sr') {
                $.getJSON('lang-sr.json', function(prevodi) {
                    primeniPrevode(prevodi);
                });
            }
        });
    }

    function primeniPrevode(prevodi) {
        // Navigacija
        $('.navigacija-meni a[href="index.html"]').text(prevodi.navigacija.pocetna);
        $('.podnozje-linkovi a[href="index.html"]').text(prevodi.navigacija.pocetna);
        $('.navigacija-meni a[href="o-nama.html"]').text(prevodi.navigacija.onama);
        $('.podnozje-linkovi a[href="o-nama.html"]').text(prevodi.navigacija.onama);
        $('.navigacija-meni a[href="usluge.html"]').text(prevodi.navigacija.usluge);
        $('.podnozje-linkovi a[href="usluge.html"]').text(prevodi.navigacija.usluge);
        $('.navigacija-meni a[href="galerija.html"]').text(prevodi.navigacija.galerija);
        $('.podnozje-linkovi a[href="galerija.html"]').text(prevodi.navigacija.galerija);
        $('.navigacija-meni a[href="kontakt.html"]').text(prevodi.navigacija.kontakt);
        $('.podnozje-linkovi a[href="kontakt.html"]').text(prevodi.navigacija.kontakt);
        $('.navigacija-meni a[href="donacije.html"]').text(prevodi.navigacija.doniraj);
        $('.megameni-kolona a[href="psi.html"]').text(prevodi.navigacija.udomljavanjePasa);
        $('.megameni-kolona a[href="macke.html"]').text(prevodi.navigacija.udomljavanjeMacaka);
        $('.megameni-kolona a[href="mikrocip.html"]').text(prevodi.navigacija.mikrocip);
        $('.megameni-kolona a[href="pregledi.html"]').text(prevodi.navigacija.pregledi);
        $('.megameni-kolona a[href="sterilizacija.html"]').text(prevodi.navigacija.sterilizacija);
        $('.megameni-kolona a[href="vakcinacije.html"]').text(prevodi.navigacija.vakcinacije);
        $('.megameni-kolona a[href="volontiranje.html"]').text(prevodi.navigacija.postaniVolonter);
        $('.megameni-kolona:contains("Udomljavanje") h3').text(prevodi.navigacija.udomljavanje);
        $('.megameni-kolona:contains("Veterinarska pomoć") h3').text(prevodi.navigacija.vetPomoc);
        $('.megameni-kolona:contains("Volontiranje") h3').text(prevodi.navigacija.volontiranje);
        $('.doniraj-dugme').text(prevodi.navigacija.doniraj);

        // INDEX
        $('.slajd-sadrzaj').eq(0).find('h2').text(prevodi.slajdSadrzaj.naslov1);
        $('.slajd-sadrzaj').eq(0).find('p').text(prevodi.slajdSadrzaj.opis1);
        $('.slajd-sadrzaj').eq(0).find('.klizac-dugme').text(prevodi.slajdSadrzaj.dugme1);
        $('.slajd-sadrzaj').eq(1).find('h2').text(prevodi.slajdSadrzaj.naslov2);    
        $('.slajd-sadrzaj').eq(1).find('p').text(prevodi.slajdSadrzaj.opis2);
        $('.slajd-sadrzaj').eq(1).find('.klizac-dugme').text(prevodi.slajdSadrzaj.dugme2);
        $('.slajd-sadrzaj').eq(2).find('h2').text(prevodi.slajdSadrzaj.naslov3);
        $('.slajd-sadrzaj').eq(2).find('p').text(prevodi.slajdSadrzaj.opis3);
        $('.slajd-sadrzaj').eq(2).find('.klizac-dugme').text(prevodi.slajdSadrzaj.dugme3);

        // o nama
        $('.o-nama-sadrzaj h2').text(prevodi.onama.naslov);
        $('.o-nama-sadrzaj p').text(prevodi.onama.sadrzaj);
        $('.o-nama-sadrzaj .dugme-okvir').text(prevodi.onama.dugme);
        
        // usluge
        $('.usluge-pregled .sekcija-naslov').text(prevodi.usluge.naslov);
        $('.usluga-kartica h3').eq(0).text(prevodi.usluge.udomljavanjePasa);
        $('.usluga-kartica p').eq(0).text(prevodi.usluge.opisPas);
        $('.usluga-kartica h3').eq(1).text(prevodi.usluge.udomljavanjeMacaka);
        $('.usluga-kartica p').eq(1).text(prevodi.usluge.opisMacka);
        $('.usluga-kartica h3').eq(2).text(prevodi.usluge.vet);
        $('.usluga-kartica p').eq(2).text(prevodi.usluge.opisVet);
        $('.procitaj-vise').text(prevodi.dugmad.procitajVise + ' →');

        // Video
        $('.video-sekcija h2').text(prevodi.video.naslov);
        $('.video-sekcija p').text(prevodi.video.opis);

        // Animacija
        $('.animacija-sekcija .kontejner .sekcija-naslov').text(prevodi.animacija.naslov);
        $('.animirana-kutija .preklop p').eq(0).text(prevodi.animacija.opis1);
        $('.animirana-kutija .preklop p').eq(1).text(prevodi.animacija.opis2);
        $('.animirana-kutija .preklop p').eq(2).text(prevodi.animacija.opis3);
        
        // Dokumenti
        $('.dokument-sekcija .kontejner h2').text(prevodi.dokumenti.naslov);
        $('.dokumenti-lista span').eq(0).text(prevodi.dokumenti.vodic);
        $('.dokumenti-lista small').eq(0).text(prevodi.dokumenti.preuzimanje1);
        $('.dokumenti-lista span').eq(1).text(prevodi.dokumenti.ugovor);
        $('.dokumenti-lista small').eq(1).text(prevodi.dokumenti.preuzimanje2);
        $('.dokumenti-lista span').eq(2).text(prevodi.dokumenti.saveti);
        $('.dokumenti-lista small').eq(2).text(prevodi.dokumenti.preuzimanje3);
  
        // Mapa
        $('.mapa-sekcija .kontejner h2').text(prevodi.mapa.naslov);
        $('.adresa-info p').eq(0).html(`<strong>${prevodi.mapa.adresaLabel}</strong> ${prevodi.mapa.adresa}`);
        $('.adresa-info p').eq(1).html(`<strong>${prevodi.mapa.vremeLabel}</strong> ${prevodi.mapa.vreme}`);

        // O NAMA
        // Hero
        $('.o-nama-stranica .hero-sadrzaj1 h1').text(prevodi.hero2.naslov);
        $('.o-nama-stranica .hero-sadrzaj1 p').eq(0).text(prevodi.hero2.podnaslov);

        $('.nasa-prica h2').text(prevodi.prica.naslov);
        $('.prica-tekst').eq(0).text(prevodi.prica.sadrzaj1);
        $('.prica-tekst').eq(1).text(prevodi.prica.sadrzaj2);
        $('.prica-tekst').eq(2).text(prevodi.prica.sadrzaj3);
        $('.misija h3').text(prevodi.prica.misijaNaslov);
        $('.misija p').text(prevodi.prica.misijaSadrzaj);
        $('.vizija h3').text(prevodi.prica.vizijaNaslov);
        $('.vizija p').text(prevodi.prica.vizijaSadrzaj);
        
        // Statistika
        $('.statistika-sekcija .kontejner h2').text(prevodi.statistika.naslov);
        $('.stat-stavka .stat-natpis').eq(0).text(prevodi.statistika.udomljeniPsi);
        $('.stat-stavka .stat-natpis').eq(1).text(prevodi.statistika.udomljeneMacke);
        $('.stat-stavka .stat-natpis').eq(2).text(prevodi.statistika.volonteri);
        $('.stat-stavka .stat-natpis').eq(3).text(prevodi.statistika.uAzilu);

        // Tim
        $('.nas-tim .kontejner h2').text(prevodi.tim.naslov);
        $('.tim-kartica h3').eq(0).text(prevodi.tim.ime1);
        $('.tim-kartica .pozicija').eq(0).text(prevodi.tim.pozicija1);
        $('.tim-kartica .biografija').eq(0).text(prevodi.tim.bio1);
        $('.tim-kartica h3').eq(1).text(prevodi.tim.ime2);
        $('.tim-kartica .pozicija').eq(1).text(prevodi.tim.pozicija2);
        $('.tim-kartica .biografija').eq(1).text(prevodi.tim.bio2);
        $('.tim-kartica h3').eq(2).text(prevodi.tim.ime3);
        $('.tim-kartica .pozicija').eq(2).text(prevodi.tim.pozicija3);
        $('.tim-kartica .biografija').eq(2).text(prevodi.tim.bio3);
        $('.tim-kartica h3').eq(3).text(prevodi.tim.ime4);
        $('.tim-kartica .pozicija').eq(3).text(prevodi.tim.pozicija4);
        $('.tim-kartica .biografija').eq(3).text(prevodi.tim.bio4);
        $('.partneri h2').text(prevodi.tim.partneri);

        // GALERIJA
        $('.galerija-sekcija .sekcija-naslov').text(prevodi.galerijaStranica.naslov);
        $('.galerija-uvod').text(prevodi.galerijaStranica.uvod);

        $('.galerija-stavka').each(function(index) {
            const brojStavke = index + 1;
            const stavka = prevodi.galerijaStranica.stavke[`stavka${brojStavke}`];
            
            if (stavka) {
                $(this).find('h3').text(stavka.naslov);
                $(this).find('p').first().text(stavka.podnaslov);
                $(this).find('.opis').text(stavka.opis);
            }
        });

        // USLUGE
        $('.hero-sadrzaj h1').text(prevodi.hero3.naslov3);
        $('.hero-sadrzaj p').eq(0).text(prevodi.hero3.podnaslov3);

        $('.usluge-stranica .sekcija-naslov').eq(0).text(prevodi.uslugeStranica.naslovU); 
        $('.usluga-kartica1 h3').eq(0).text(prevodi.uslugeStranica.ljubimac1);
        $('.usluga-kartica1 p').eq(0).text(prevodi.uslugeStranica.opis1);
        $('.usluga-kartica1 a').eq(0).text(prevodi.uslugeStranica.dugme1 + ' →');

        $('.usluga-kartica1 h3').eq(1).text(prevodi.uslugeStranica.ljubimac2);
        $('.usluga-kartica1 p').eq(1).text(prevodi.uslugeStranica.opis2);
        $('.usluga-kartica1 a').eq(1).text(prevodi.uslugeStranica.dugme2 + ' →');

        $('.usluge-stranica .sekcija-naslov').eq(1).text(prevodi.uslugeStranica.naslovV);
        $('.usluga-kartica1 h3').eq(2).text(prevodi.uslugeStranica.vakcina);
        $('.usluga-kartica1 p').eq(2).text(prevodi.uslugeStranica.opis3);
        $('.usluga-kartica1 a').eq(2).text(prevodi.uslugeStranica.vDugme1 + ' →');

        $('.usluga-kartica1 h3').eq(3).text(prevodi.uslugeStranica.sterilizacija);
        $('.usluga-kartica1 p').eq(3).text(prevodi.uslugeStranica.opis4);
        $('.usluga-kartica1 a').eq(3).text(prevodi.uslugeStranica.vDugme2 + ' →');

        $('.usluga-kartica1 h3').eq(4).text(prevodi.uslugeStranica.mikrocip);
        $('.usluga-kartica1 p').eq(4).text(prevodi.uslugeStranica.opis5);
        $('.usluga-kartica1 a').eq(4).text(prevodi.uslugeStranica.vDugme3 + ' →');

        $('.usluga-kartica1 h3').eq(5).text(prevodi.uslugeStranica.pregled);
        $('.usluga-kartica1 p').eq(5).text(prevodi.uslugeStranica.opis6);
        $('.usluga-kartica1 a').eq(5).text(prevodi.uslugeStranica.vDugme4 + ' →');

        $('.usluge-stranica .sekcija-naslov').eq(2).text(prevodi.uslugeStranica.naslovVol);
        $('.usluga-kartica1 h3').eq(6).text(prevodi.uslugeStranica.volontiraj);
        $('.usluga-kartica1 p').eq(6).text(prevodi.uslugeStranica.opisVo1);
        $('.usluga-kartica1 a').eq(6).text(prevodi.uslugeStranica.voDugme1 + ' →');

        $('.usluga-kartica1 h3').eq(7).text(prevodi.uslugeStranica.donacija);
        $('.usluga-kartica1 p').eq(7).text(prevodi.uslugeStranica.opisVo2);
        $('.usluga-kartica1 a').eq(7).text(prevodi.uslugeStranica.voDugme2 + ' →');

        // CTA
        $('.akcija-sekcija h2').text(prevodi.pozivNaAkciju.naslov);
        $('.akcija-sekcija p').text(prevodi.pozivNaAkciju.opis);
        $('.dugme-akcija').text(prevodi.pozivNaAkciju.dugme);

        // KONTAKT
        if ($('body').hasClass('kontakt-stranica')) {
                
            $('.bg-success .kontejner h1').text(prevodi.kontaktHero.naslov);
            $('.hero-subtitle').text(prevodi.kontaktHero.podnaslov); 
            $('.card h3').eq(0).text(prevodi.adresa.naslov);
            $('.card p').eq(0).text(prevodi.adresa.linija1);
            $('.card p').eq(1).text(prevodi.adresa.linija2);
            $('.card h3').eq(1).text(prevodi.telefon.naslov);

            $('.col-lg-6 h2').first().text(prevodi.forma.naslovForme);
            $('label[for="name"]').text(prevodi.forma.ime);
            $('label[for="email"]').text(prevodi.forma.email);
            $('label[for="phone"]').text(prevodi.forma.telefon);
            $('label[for="subject"]').text(prevodi.forma.naslovPoruke);
            $('label[for="interest"]').text(prevodi.forma.interesovanje);

            $('#interest option').first().text(prevodi.forma.opcije.opcija);
            $('#interest option[value="Udomljavanje"]').text(prevodi.forma.opcije.udomljavanje);
            $('#interest option[value="Volontiranje"]').text(prevodi.forma.opcije.volontiranje);
            $('#interest option[value="Donacija"]').text(prevodi.forma.opcije.donacija);
            $('#interest option[value="Informacije"]').text(prevodi.forma.opcije.informacije);
            $('#interest option[value="Ostalo"]').text(prevodi.forma.opcije.ostalo);

            $('input#name').attr('placeholder', prevodi.forma.placeholderi.ime);
            $('input#email').attr('placeholder', prevodi.forma.placeholderi.email);
            $('input#phone').attr('placeholder', prevodi.forma.placeholderi.telefon);
            $('input#subject').attr('placeholder', prevodi.forma.placeholderi.naslov);
            $('textarea#message').attr('placeholder', prevodi.forma.placeholderi.poruka);

            $('label[for="message"]').text(prevodi.forma.poruka);
            $('label[for="consent"]').text(prevodi.forma.saglasnost);
            $('.btn-success').first().text(prevodi.forma.dugme);

            $('.col-lg-6 h2').last().text(prevodi.mapa1.naslovMape);

            $('.card h3').eq(3).text(prevodi.radnoVreme.naslov);

            $('.list-unstyled li').eq(0).find('span').first().text(prevodi.radnoVreme.radniDani);
            $('.list-unstyled li').eq(0).find('span').last().text(prevodi.radnoVreme.radniDaniVreme);

            $('.list-unstyled li').eq(1).find('span').first().text(prevodi.radnoVreme.subota);
            $('.list-unstyled li').eq(1).find('span').last().text(prevodi.radnoVreme.subotaVreme);

            $('.list-unstyled li').eq(2).find('span').first().text(prevodi.radnoVreme.nedelja);
            $('.list-unstyled li').eq(2).find('span').last().text(prevodi.radnoVreme.nedeljaStatus);

            $('.kontejner.py-5 h2').first().text(prevodi.volontiranjeStranica.naslov);
            $('.col-md-6 h3').text(prevodi.volontiranjeStranica.naslovSekcije);

            $('.list-unstyled .fs-5').eq(0).text(prevodi.volontiranjeStranica.prednosti['1']);
            $('.list-unstyled .fs-5').eq(1).text(prevodi.volontiranjeStranica.prednosti['2']);
            $('.list-unstyled .fs-5').eq(2).text(prevodi.volontiranjeStranica.prednosti['3']);
            $('.list-unstyled .fs-5').eq(3).text(prevodi.volontiranjeStranica.prednosti['4']);
            $('.list-unstyled .fs-5').eq(4).text(prevodi.volontiranjeStranica.prednosti['5']);

            $('.volunteer-description').text(prevodi.volontiranjeStranica.opis);
        }

        // PSI
        $('.strana-naslov').text(prevodi.psiStranica.naslov);
        $('.strana-opis').text(prevodi.psiStranica.opis);

        $('.zivotinja-kartica').each(function(index) {
            const brojPsa = index + 1;
            const pas = prevodi.psiStranica.psi[`pas${brojPsa}`];
            
            if (pas) {
                const uzrastTekst = $(this).find('p').eq(0);
                uzrastTekst.html(`<strong>${prevodi.psiStranica.uzrast}:</strong> ${pas.uzrast}`);
                const rasaTekst = $(this).find('p').eq(1);
                rasaTekst.html(`<strong>${prevodi.psiStranica.rasa}:</strong> ${pas.rasa}`);
                $(this).find('.zivotinja-opis').text(pas.opis);
                $(this).find('.dugme-malo').text(prevodi.psiStranica.dugme);
            }
        });

        // MACKE
        $('.strana-naslov1').text(prevodi.mackeStranica.naslov);
        $('.strana-opis1').text(prevodi.mackeStranica.opis);

        $('.zivotinja-kartica1').each(function(index) {
            const brojMacke = index + 1;
            const macka = prevodi.mackeStranica.macke[`macka${brojMacke}`];
            
            if (macka) {
                const uzrastTekst = $(this).find('p').eq(0);
                uzrastTekst.html(`<strong>${prevodi.mackeStranica.uzrast}:</strong> ${macka.uzrast}`);
                const rasaTekst = $(this).find('p').eq(1);
                rasaTekst.html(`<strong>${prevodi.mackeStranica.rasa}:</strong> ${macka.rasa}`);
                $(this).find('.zivotinja-opis1').text(macka.opis);
                $(this).find('.dugme-malo').text(prevodi.mackeStranica.dugme);
            }
        });

        // VAKCINACIJA
        $('.vakcina-stranica .usluga-detalj h2').first().text(prevodi.vakcinacijeStranica.glavniNaslov);
        $('.vakcina-stranica .usluga-detalj p').first().text(prevodi.vakcinacijeStranica.glavniOpis);
        $('.vakcina-stranica .usluga-detalj h3').eq(0).text(prevodi.vakcinacijeStranica.naslovPsi);
        $('.vakcina-stranica .usluga-lista').eq(0).find('li').eq(0).html(prevodi.vakcinacijeStranica.listaPsi.stavka1);
        $('.vakcina-stranica .usluga-lista').eq(0).find('li').eq(1).html(prevodi.vakcinacijeStranica.listaPsi.stavka2);
        $('.vakcina-stranica .usluga-lista').eq(0).find('li').eq(2).html(prevodi.vakcinacijeStranica.listaPsi.stavka3);
        $('.vakcina-stranica .usluga-lista').eq(0).find('li').eq(3).html(prevodi.vakcinacijeStranica.listaPsi.stavka4);
        $('.vakcina-stranica .usluga-detalj h3').eq(1).text(prevodi.vakcinacijeStranica.naslovMacke);
        $('.vakcina-stranica .usluga-lista').eq(1).find('li').eq(0).html(prevodi.vakcinacijeStranica.listaMacke.stavka1);
        $('.vakcina-stranica .usluga-lista').eq(1).find('li').eq(1).html(prevodi.vakcinacijeStranica.listaMacke.stavka2);
        $('.vakcina-stranica .usluga-lista').eq(1).find('li').eq(2).html(prevodi.vakcinacijeStranica.listaMacke.stavka3);
        $('.vakcina-stranica .usluga-detalj h3').eq(2).text(prevodi.vakcinacijeStranica.kadaNaslov);
        $('.vakcina-tabela th').eq(0).text(prevodi.vakcinacijeStranica.tabela.zaglavlje1);
        $('.vakcina-tabela th').eq(1).text(prevodi.vakcinacijeStranica.tabela.zaglavlje2);
        $('.vakcina-tabela tr').eq(1).find('td').eq(0).text(prevodi.vakcinacijeStranica.tabela.red1.kolona1);
        $('.vakcina-tabela tr').eq(1).find('td').eq(1).text(prevodi.vakcinacijeStranica.tabela.red1.kolona2);
        $('.vakcina-tabela tr').eq(2).find('td').eq(0).text(prevodi.vakcinacijeStranica.tabela.red2.kolona1);
        $('.vakcina-tabela tr').eq(2).find('td').eq(1).text(prevodi.vakcinacijeStranica.tabela.red2.kolona2);
        $('.vakcina-tabela tr').eq(3).find('td').eq(0).text(prevodi.vakcinacijeStranica.tabela.red3.kolona1);
        $('.vakcina-tabela tr').eq(3).find('td').eq(1).text(prevodi.vakcinacijeStranica.tabela.red3.kolona2);
        $('.vakcina-tabela tr').eq(4).find('td').eq(0).text(prevodi.vakcinacijeStranica.tabela.red4.kolona1);
        $('.vakcina-tabela tr').eq(4).find('td').eq(1).text(prevodi.vakcinacijeStranica.tabela.red4.kolona2);
        $('.vakcina-stranica .cena-kartica h4').text(prevodi.vakcinacijeStranica.cenaKartica.naslov);
        $('.vakcina-stranica .cena-stavka span').eq(0).text(prevodi.vakcinacijeStranica.cenaKartica.stavka1);
        $('.vakcina-stranica .cena-stavka span').eq(1).text(prevodi.vakcinacijeStranica.cenaKartica.stavka2);
        $('.vakcina-stranica .cena-stavka span').eq(2).text(prevodi.vakcinacijeStranica.cenaKartica.stavka3);
        $('.vakcina-stranica .cena-stavka.ukupno span').text(prevodi.vakcinacijeStranica.cenaKartica.ukupno);
        $('.vakcina-stranica .kontakt-bocno h4').text(prevodi.vakcinacijeStranica.kontaktBocno.naslov);
        $('.vakcina-stranica .kontakt-bocno p').eq(2).html(`<img src="usluge/ikonica-radnoVreme.png" alt="Radno vreme"> ${prevodi.vakcinacijeStranica.kontaktBocno.radnoVreme}`);
        $('.vakcina-stranica .dugme-bocno').text(prevodi.vakcinacijeStranica.kontaktBocno.dugme);
        $('.vakcina-stranica .napomena-kartica h4').text(prevodi.vakcinacijeStranica.napomena.naslov);
        $('.vakcina-stranica .napomena-kartica p').text(prevodi.vakcinacijeStranica.napomena.tekst);
        $('.vakcina-stranica .akcija-sekcija h2').text(prevodi.vakcinacijeStranica.poziv.naslov);
        $('.vakcina-stranica .akcija-sekcija p').text(prevodi.vakcinacijeStranica.poziv.opis);
        $('.vakcina-stranica .dugme-akcija').text(prevodi.vakcinacijeStranica.poziv.dugme);
        $('.vakcina-stranica .video-sekcija h2').text(prevodi.vakcinacijeStranica.video.naslov);
        $('.vakcina-stranica .video-sekcija h3').text(prevodi.vakcinacijeStranica.video.podnaslov);
        $('.vakcina-stranica .video-sekcija p').text(prevodi.vakcinacijeStranica.video.opis);

        // DONACIJE
        $('.donacije-stranica .usluga-detalj h2').text(prevodi.donacijeStranica.naslov);
        $('.donacije-stranica .usluga-detalj p').first().text(prevodi.donacijeStranica.opis);

        $('.donacije-stranica .donacije-kartica h3').eq(0).text(prevodi.donacijeStranica.kartice.novac.naslov);
        $('.donacije-stranica .donacije-kartica p').eq(0).text(prevodi.donacijeStranica.kartice.novac.racun);
        $('.donacije-stranica .donacije-kartica p').eq(1).text(prevodi.donacijeStranica.kartice.novac.paypal);

        $('.donacije-stranica .donacije-kartica h3').eq(1).text(prevodi.donacijeStranica.kartice.hrana.naslov);
        $('.donacije-stranica .donacije-kartica p').eq(2).text(prevodi.donacijeStranica.kartice.hrana.tekst);
        $('.donacije-stranica .donacije-kartica ul').eq(0).find('li').eq(0).text(prevodi.donacijeStranica.kartice.hrana.stavke.stavka1);
        $('.donacije-stranica .donacije-kartica ul').eq(0).find('li').eq(1).text(prevodi.donacijeStranica.kartice.hrana.stavke.stavka2);
        $('.donacije-stranica .donacije-kartica ul').eq(0).find('li').eq(2).text(prevodi.donacijeStranica.kartice.hrana.stavke.stavka3);

        $('.donacije-stranica .donacije-kartica h3').eq(2).text(prevodi.donacijeStranica.kartice.oprema.naslov);
        $('.donacije-stranica .donacije-kartica ul').eq(1).find('li').eq(0).text(prevodi.donacijeStranica.kartice.oprema.stavke.stavka1);
        $('.donacije-stranica .donacije-kartica ul').eq(1).find('li').eq(1).text(prevodi.donacijeStranica.kartice.oprema.stavke.stavka2);
        $('.donacije-stranica .donacije-kartica ul').eq(1).find('li').eq(2).text(prevodi.donacijeStranica.kartice.oprema.stavke.stavka3);
        $('.donacije-stranica .donacije-kartica ul').eq(1).find('li').eq(3).text(prevodi.donacijeStranica.kartice.oprema.stavke.stavka4);

        $('.donacije-stranica .donacije-kartica h3').eq(3).text(prevodi.donacijeStranica.kartice.medicina.naslov);
        $('.donacije-stranica .donacije-kartica ul').eq(2).find('li').eq(0).text(prevodi.donacijeStranica.kartice.medicina.stavke.stavka1);
        $('.donacije-stranica .donacije-kartica ul').eq(2).find('li').eq(1).text(prevodi.donacijeStranica.kartice.medicina.stavke.stavka2);
        $('.donacije-stranica .donacije-kartica ul').eq(2).find('li').eq(2).text(prevodi.donacijeStranica.kartice.medicina.stavke.stavka3);

        // MIKROČIPOVANJE
        $('.mikrocip-stranica .usluga-detalj h2').text(prevodi.mikrocipStranica.naslov);
        $('.mikrocip-stranica .usluga-detalj p').eq(0).text(prevodi.mikrocipStranica.opis);
        $('.mikrocip-stranica .usluga-detalj h3').eq(0).text(prevodi.mikrocipStranica.staJeNaslov);
        $('.mikrocip-stranica .usluga-detalj p').eq(1).text(prevodi.mikrocipStranica.staJeTekst);
        $('.mikrocip-stranica .usluga-detalj h3').eq(1).text(prevodi.mikrocipStranica.postupakNaslov);

        $('.mikrocip-stranica .usluga-koraci li').eq(0).html(prevodi.mikrocipStranica.koraci.korak1);
        $('.mikrocip-stranica .usluga-koraci li').eq(1).html(prevodi.mikrocipStranica.koraci.korak2);
        $('.mikrocip-stranica .usluga-koraci li').eq(2).html(prevodi.mikrocipStranica.koraci.korak3);
        $('.mikrocip-stranica .usluga-koraci li').eq(3).html(prevodi.mikrocipStranica.koraci.korak4);
        $('.mikrocip-stranica .usluga-koraci li').eq(4).html(prevodi.mikrocipStranica.koraci.korak5);

        $('.mikrocip-stranica .cena-kartica h4').text(prevodi.mikrocipStranica.cene.naslov);
        $('.mikrocip-stranica .cena-stavka span').eq(0).text(prevodi.mikrocipStranica.cene.stavka1);
        $('.mikrocip-stranica .cena-stavka span').eq(1).text(prevodi.mikrocipStranica.cene.stavka2);
        $('.mikrocip-stranica .cena-stavka span').eq(2).text(prevodi.mikrocipStranica.cene.stavka3);

        // PREGLEDI
        $('.pregledi-stranica .usluga-detalj h2').text(prevodi.preglediStranica.naslov);
        $('.pregledi-stranica .usluga-detalj p').first().text(prevodi.preglediStranica.opis);

        $('.pregledi-stranica .usluga-detalj h3').eq(0).text(prevodi.preglediStranica.ukljucujeNaslov);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(0).html(prevodi.preglediStranica.ukljucujeLista.stavka1);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(1).html(prevodi.preglediStranica.ukljucujeLista.stavka2);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(2).html(prevodi.preglediStranica.ukljucujeLista.stavka3);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(3).html(prevodi.preglediStranica.ukljucujeLista.stavka4);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(4).html(prevodi.preglediStranica.ukljucujeLista.stavka5);
        $('.pregledi-stranica .usluga-lista').eq(0).find('li').eq(5).html(prevodi.preglediStranica.ukljucujeLista.stavka6);

        $('.pregledi-stranica .usluga-detalj h3').eq(1).text(prevodi.preglediStranica.dodatniNaslov);
        $('.pregledi-stranica .usluga-detalj ul').eq(1).find('li').eq(0).text(prevodi.preglediStranica.dodatniLista.stavka1);
        $('.pregledi-stranica .usluga-detalj ul').eq(1).find('li').eq(1).text(prevodi.preglediStranica.dodatniLista.stavka2);
        $('.pregledi-stranica .usluga-detalj ul').eq(1).find('li').eq(2).text(prevodi.preglediStranica.dodatniLista.stavka3);
        $('.pregledi-stranica .usluga-detalj ul').eq(1).find('li').eq(3).text(prevodi.preglediStranica.dodatniLista.stavka4);

        $('.pregledi-stranica .cena-kartica h4').text(prevodi.preglediStranica.cenaKartica.naslov);
        $('.pregledi-stranica .cena-stavka span').text(prevodi.preglediStranica.cenaKartica.stavka1);

        // STERILIZACIJA
        $('.sterilizacija-stranica .usluga-detalj h2').text(prevodi.sterilizacijaStranica.naslov);
        $('.sterilizacija-stranica .usluga-detalj p').first().text(prevodi.sterilizacijaStranica.opis);

        $('.sterilizacija-stranica .usluga-detalj h3').eq(0).text(prevodi.sterilizacijaStranica.prednostiNaslov);
        $('.sterilizacija-stranica .usluga-lista li').eq(0).html(prevodi.sterilizacijaStranica.prednostiLista.stavka1);
        $('.sterilizacija-stranica .usluga-lista li').eq(1).html(prevodi.sterilizacijaStranica.prednostiLista.stavka2);
        $('.sterilizacija-stranica .usluga-lista li').eq(2).html(prevodi.sterilizacijaStranica.prednostiLista.stavka3);
        $('.sterilizacija-stranica .usluga-lista li').eq(3).html(prevodi.sterilizacijaStranica.prednostiLista.stavka4);
        $('.sterilizacija-stranica .usluga-lista li').eq(4).html(prevodi.sterilizacijaStranica.prednostiLista.stavka5);

        $('.sterilizacija-stranica .usluga-detalj h3').eq(1).text(prevodi.sterilizacijaStranica.kadaNaslov);
        $('.sterilizacija-stranica .usluga-detalj p').eq(1).text(prevodi.sterilizacijaStranica.kadaTekst);

        $('.sterilizacija-stranica .cena-kartica h4').text(prevodi.sterilizacijaStranica.cene.naslov);
        $('.sterilizacija-stranica .cena-stavka span').eq(0).text(prevodi.sterilizacijaStranica.cene.stavka1);
        $('.sterilizacija-stranica .cena-stavka span').eq(1).text(prevodi.sterilizacijaStranica.cene.stavka2);
        $('.sterilizacija-stranica .cena-stavka span').eq(2).text(prevodi.sterilizacijaStranica.cene.stavka3);
        $('.sterilizacija-stranica .cena-stavka span').eq(3).text(prevodi.sterilizacijaStranica.cene.stavka4);
        $('.sterilizacija-stranica .cena-stavka span').eq(4).text(prevodi.sterilizacijaStranica.cene.stavka5);
        $('.sterilizacija-stranica .cena-stavka span').eq(5).text(prevodi.sterilizacijaStranica.cene.stavka6);
        $('.sterilizacija-stranica .cena-stavka span').eq(6).text(prevodi.sterilizacijaStranica.cene.stavka7);

        // VOLONTIRANJE
        $('.volontiranje-stranica .usluga-detalj h2').text(prevodi.volontiranjeStranicaDetalj.naslov);
        $('.volontiranje-stranica .usluga-detalj p').first().text(prevodi.volontiranjeStranicaDetalj.opis);

        $('.volontiranje-stranica .usluga-detalj h3').eq(0).text(prevodi.volontiranjeStranicaDetalj.aktivnostiNaslov);
        $('.volontiranje-stranica .aktivnost h4').eq(0).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.setnja.naslov);
        $('.volontiranje-stranica .aktivnost p').eq(0).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.setnja.tekst);
        $('.volontiranje-stranica .aktivnost h4').eq(1).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.hranjenje.naslov);
        $('.volontiranje-stranica .aktivnost p').eq(1).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.hranjenje.tekst);
        $('.volontiranje-stranica .aktivnost h4').eq(2).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.ciscenje.naslov);
        $('.volontiranje-stranica .aktivnost p').eq(2).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.ciscenje.tekst);
        $('.volontiranje-stranica .aktivnost h4').eq(3).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.fotografisanje.naslov);
        $('.volontiranje-stranica .aktivnost p').eq(3).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.fotografisanje.tekst);
        $('.volontiranje-stranica .aktivnost h4').eq(4).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.transport.naslov);
        $('.volontiranje-stranica .aktivnost p').eq(4).text(prevodi.volontiranjeStranicaDetalj.aktivnosti.transport.tekst);

        $('.volontiranje-stranica .usluga-detalj h3').eq(1).text(prevodi.volontiranjeStranicaDetalj.kakoNaslov);
        $('.volontiranje-stranica .usluga-koraci li').eq(0).text(prevodi.volontiranjeStranicaDetalj.koraci.korak1);
        $('.volontiranje-stranica .usluga-koraci li').eq(1).text(prevodi.volontiranjeStranicaDetalj.koraci.korak2);
        $('.volontiranje-stranica .usluga-koraci li').eq(2).text(prevodi.volontiranjeStranicaDetalj.koraci.korak3);
        $('.volontiranje-stranica .usluga-koraci li').eq(3).text(prevodi.volontiranjeStranicaDetalj.koraci.korak4);

        $('.volontiranje-stranica .volonterska-forma h3').text(prevodi.volontiranjeStranicaDetalj.forma.naslov);
        $('.volontiranje-stranica .volonterska-forma input[type="text"]').attr('placeholder', prevodi.volontiranjeStranicaDetalj.forma.placeholderIme);
        $('.volontiranje-stranica .volonterska-forma input[type="email"]').attr('placeholder', prevodi.volontiranjeStranicaDetalj.forma.placeholderEmail);
        $('.volontiranje-stranica .volonterska-forma input[type="tel"]').attr('placeholder', prevodi.volontiranjeStranicaDetalj.forma.placeholderTelefon);
        $('.volontiranje-stranica .volonterska-forma select option').eq(0).text(prevodi.volontiranjeStranicaDetalj.forma.izborAktivnosti);
        $('.volontiranje-stranica .volonterska-forma select option').eq(1).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija1);
        $('.volontiranje-stranica .volonterska-forma select option').eq(2).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija2);
        $('.volontiranje-stranica .volonterska-forma select option').eq(3).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija3);
        $('.volontiranje-stranica .volonterska-forma select option').eq(4).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija4);
        $('.volontiranje-stranica .volonterska-forma select option').eq(5).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija5);
        $('.volontiranje-stranica .volonterska-forma select option').eq(6).text(prevodi.volontiranjeStranicaDetalj.forma.opcije.opcija6);
        $('.volontiranje-stranica .volonterska-forma textarea').attr('placeholder', prevodi.volontiranjeStranicaDetalj.forma.placeholderPoruka);
        $('.volontiranje-stranica .dugme-slanje').text(prevodi.volontiranjeStranicaDetalj.forma.dugme);

        $('.volontiranje-stranica .info-kartica h4').text(prevodi.volontiranjeStranicaDetalj.infoKartica.naslov);
        $('.volontiranje-stranica .info-kartica p').eq(0).html(prevodi.volontiranjeStranicaDetalj.infoKartica.lokacija);
        $('.volontiranje-stranica .info-kartica p').eq(1).html(prevodi.volontiranjeStranicaDetalj.infoKartica.vreme);
        $('.volontiranje-stranica .info-kartica p').eq(2).html(prevodi.volontiranjeStranicaDetalj.infoKartica.kontakt);
        $('.volontiranje-stranica .info-kartica p').eq(3).html(prevodi.volontiranjeStranicaDetalj.infoKartica.potrebno);

        // FOOTER
        $('.podnozje-sekcija h4').eq(0).text(prevodi.navigacija.ime);
        $('.podnozje-sekcija h4').eq(1).text(prevodi.podnozje.brziLinkovi);
        $('.podnozje-sekcija h4').eq(2).text(prevodi.podnozje.kontakt);
        $('.podnozje-sekcija h4').eq(3).text(prevodi.podnozje.novine);
        
        $('.podnozje-sekcija p').eq(0).text(prevodi.navigacija.opis);
        $('.podnozje-sekcija p').eq(1).text(prevodi.podnozje.novine);
        
        $('.kontakt-informacije li').eq(0).html(`<img src="podnozje/telefon-ikonica.png" alt="Telefon"> ${prevodi.podnozje.telefon}`);
        $('.kontakt-informacije li').eq(1).html(`<img src="podnozje/email-ikonica.png" alt="Email"> ${prevodi.podnozje.email}`);
        $('.kontakt-informacije li').eq(2).html(`<img src="podnozje/lokacija-ikonica.png" alt="Lokacija"> ${prevodi.podnozje.adresa}`);

        $('.podnozje-linkovi a[href="index.html"]').text(prevodi.navigacija.pocetna);
        $('.podnozje-linkovi a[href="o-nama.html"]').text(prevodi.navigacija.onama);
        $('.podnozje-linkovi a[href="usluge.html"]').text(prevodi.navigacija.usluge);
        $('.podnozje-linkovi a[href="galerija.html"]').text(prevodi.navigacija.galerija);
        $('.podnozje-linkovi a[href="kontakt.html"]').text(prevodi.navigacija.kontakt);
        
        $('.novine-forma input').attr('placeholder', prevodi.podnozje.placeholderEmail);
        $('.novine-forma button').text(prevodi.podnozje.prijaviSe);
        
        $('.podnozje-dno p').html(`© 2026 ${prevodi.navigacija.ime} - ${prevodi.podnozje.prava}. | <a href="politika-privatnosti.html">${prevodi.podnozje.privatnost}</a> | <a href="uslovi.html">${prevodi.podnozje.uslovi}</a>`);
        
        // Kontakt forma
        if ($('#contactForm').length) {
            $('label[for="name"]').text(prevodi.kontakt.ime + ' *');
            $('label[for="email"]').text(prevodi.kontakt.email + ' *');
            $('label[for="phone"]').text(prevodi.kontakt.telefon);
            $('label[for="message"]').text(prevodi.kontakt.poruka + ' *');
            $('.submit-btn').text(prevodi.kontakt.posalji);
        }
    }
});
