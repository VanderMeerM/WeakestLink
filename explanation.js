
//console.log(`Hoogte: ${window.outerHeight}, breedte: ${window.outerWidth}`);


function showExplanation() {
    corrTotalAmount.style.visibility = "hidden";
    evaluate.style.visibility = "hidden";
    bank.style.visibility = "hidden";
    intro.style.width = "800px";
    intro.style.lineHeight = "1.5em";

    const explanation =
        `"Een van de negen spelers kan met een groot geldbedrag naar huis. 
    Hiervoor zullen ze hun krachten moeten bundelen tot de finale.  
    Slechts één speler gaat ervan door met het verdiende geld; acht spelers gaan naar huis met niets."
    <p>
    Deze legendarische woorden sprak de presentatrice (Chazia Mourali resp. Bridget Maasland) aan het begin van elke show. 
    Op deze website zit je zelf achter de knoppen en kun je in een oogopslag zien hoeveel vragen een speler correct heeft beantwoord, hoeveel fout en of diegene geld op de bank heeft gezet. 
    <p>
    Vervolgens toont de evaluatie – nadat de rondetijd is verstreken, vergeet dus ook niet iedere keer de klok te starten! – een compleet overzicht, waarin de spelers van sterkste naar zwakste schakel zijn gesorteerd. 
    <p>
    Bij de stemronde kun je per speler het aantal stemmen-tegen bijhouden, waarop een overzicht volgt van de daadwerkelijk door het team bepaalde zwakste schakel die zal worden weggestemd. 
    <p>
    <strong>Foutje gemaakt? Geen probleem!</strong><br> Heb je ingevoerd dat een speler een correct antwoord had gegeven terwijl dat niet zo was?
    Je kunt op elk moment het totale bankbedrag aanpassen, zodat je uiterlijk bij het ingaan van een nieuwe ronde weer 'bij' bent.  
    <p>
    <strong>VERVERS VANAF NU EN TIJDENS HET SPELEN ALLEEN <u>NOOIT</u> DE PAGINA!</strong>
    <P>
    Veel plezier met deze nieuwe ervaring van het spel en...TOT ZIENS! `

    intro.innerHTML = explanation

    removePreviousText(startgame)

    const btn = document.createElement('button')
    btn.onclick = () => { AddNamePlayers() };
    btn.innerHTML = `Ga door`;
    startgame.appendChild(btn)
}

showExplanation()