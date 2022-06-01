
let bankInCurrentRound = 0;
let bankTotal = 0;
let round = 1;
let timesup = `<span style="color:lightgreen">---</span>`;
let firstClick;
let chainValue;

const ronde = document.getElementById('ronde');
const bank = document.getElementById('bank');
const corrTotalAmount = document.getElementById('corrTotalAmount');
const changeBankTotal = document.getElementById('changeBankTotal');

const intro = document.getElementById('intro');
const startgame = document.getElementById('startgame')
const startClock = document.getElementById('startClock');
const evaluate = document.getElementById('evaluate');
const finalResult = document.getElementById('finalresult');

const goodbye = document.getElementById('goodbye');

const bedrag = document.getElementById('bedrag');
const playerPanelEvaluation = document.getElementById('playerPanelEvaluation');
const votedAway = document.getElementById('votedAway');

const bankinronde = document.getElementById('bankinronde');
const time = document.getElementById('time');
const chain = document.getElementById('chain');
const scrollToTop = document.getElementById('scrolltotop');

const amounts = [
    { amount: 0, visibility: false },
    { amount: 20 },
    { amount: 50 },
    { amount: 100 },
    { amount: 200 },
    { amount: 300 },
    { amount: 450 },
    { amount: 600 },
    { amount: 800 },
    { amount: 1000 }
];

amounts.reverse();

let bedr = amounts.length - 1;

let spelers = [
    { id: 1, Ypos: 280 },
    { id: 2, Ypos: 205 },
    { id: 3, Ypos: 130 },
    { id: 4, Ypos: 40 },
    { id: 5, Ypos: -20 },
    { id: 6, Ypos: 40 },
    { id: 7, Ypos: 130 },
    { id: 8, Ypos: 205 },
    { id: 9, Ypos: 280 }
]

const spelerA = document.getElementById('spelerA_circles');
const spelerB = document.getElementById('spelerB_circles');

const spelerA_Name = document.getElementById('spelerA_naam');
const spelerB_Name = document.getElementById('spelerB_naam');

let totalScorePlayerA = [];
let totalScorePlayerB = [];
let filteredArrayA = [];
let filteredArrayB = [];

scrollToTop.addEventListener('click', () => {
    playerPanelEvaluation.scrollIntoView({ behavior: 'smooth' });
})


function determineStartPlayerFirstRound() {

    const checknames = spelers.filter(sp => sp.name !== undefined)

    if (round == 1) {

        const sortPlayersByName = [...playerPanelEvaluation.querySelectorAll('div')]

        if (checknames.length == 9) {

            sortPlayersByName.sort((a, b) =>
                (a.children[0].innerText > b.children[0].innerText) ? 1 :
                    (b.children[0].innerText > a.children[0].innerText) ? -1 : 0);

            spelers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            changeBankTotal.innerHTML = `${spelers[0].name} (nr. ${spelers[0].id}) begint!`;
        }

        else {
            changeBankTotal.innerHTML = `${sortPlayersByName[0].children[0].innerText} begint!`;
        }
        sortPlayersByName[0].classList.remove('stylePanel');
        sortPlayersByName[0].classList.add('stylePanel_highlighted');
    }
}

let showFirstStartingPlayer = setInterval(() => {
    changeBankTotal.classList.toggle('unvisible')
}, 800);


function removePreviousText(id) {
    while (id.firstChild) {
        id.removeChild(id.firstChild);
    }
}


function setFirstAmountRed() {
    amounts.map(am => am.color = "white");
    amounts[amounts.length - 2].color = "red"
    chain.textContent = `Ketting: ${chainValue}`;
}


function AddNamePlayers() {
    removePreviousText(intro);

    bank.style.visibility = "visible";
    time.style.visibility = "hidden";
    corrTotalAmount.style.visibility = "hidden";
    evaluate.style.visibility = "hidden";

    spelers.map(speler => {
        speler['visibility'] = true;

        const input = document.createElement('input');
        const NewP = document.createElement('p');
        intro.style.width = '';
        input.placeholder = `Speler ${speler.id}`
        input.addEventListener('change', () => { saveNames });
        intro.appendChild(NewP)
        intro.appendChild(input)


        function saveNames() {
            speler['name'] = input.value;

            return spelers

        }
    })

    removePreviousText(startgame)

    const btn = document.createElement('button')
    btn.addEventListener('click', playGame);
    btn.textContent = `Start het spel`;
    startgame.appendChild(btn)

}


function playGame() {

    firstClick = false;
    chainValue = 0;

    removePreviousText(bedrag);

    bank.innerHTML = '';
    votedAway.innerHTML = '';
    goodbye.style.transform = '';
    goodbye.innerHTML = '';
    startgame.style.display = "none";
    time.style.visibility = "visible";
    corrTotalAmount.style.visibility = "visible";
    evaluate.style.visibility = "hidden";
    chain.textContent = `Ketting: ${chainValue}`;

    if (round > 1) {
        corrTotalAmount.addEventListener('click', changeTotal);
        corrTotalAmount.textContent = 'Klopt het totaalbedrag niet? Klik hier!';
    }

    if (round == 8) {
        playFinal()
        return
    }

    showInfo()

    removePreviousText(intro);

    removePreviousText(playerPanelEvaluation);

    spelers.sort((a, b) => (a.id - b.id)).map((speler, idx) => {
        speler['rightAnswer'] = 0;
        speler['wrongAnswer'] = 0;
        speler['banking'] = 0;
        const NewP = document.createElement('p');
        const NewLi = document.createElement('li');
        NewLi.style.fontSize = "17px";
        NewLi.style.textAlign = "center";
        NewLi.style.fontWeight = 100;
        NewLi.style.color = "white";
        NewLi.style.backgroundColor = "blue";
        NewLi.style.padding = "5px";
        NewP.style.fontSize = "15px";
        NewP.style.textAlign = "center";
        const div = document.createElement('div');
        const buttonBank = document.createElement('button');


        if (window.outerWidth > 1500) {
            div.style.transform = `translateY(${speler.Ypos}px)`
        };

        NewP.textContent = `Score: 0%`;
        if (sessionStorage.round) {
            ronde.innerHTML = `Ronde ${parseInt(sessionStorage.round)}`
        }
        else {
            ronde.innerHTML = `Ronde ${round}`
        }


        buttonBank.addEventListener('click', () => {
            if (round == 1 && div.className === 'stylePanel_highlighted') {
                banking()
            }
            else if (round != 1 && !firstClick) {
                firstClick = true;
                banking()
            }
            else if (round != 1 && firstClick && div.className === 'stylePanel_highlighted') {
                banking()

            }
        })

        buttonBank.textContent = `Roept 'BANK'`;
        buttonBank.style.paddingTop = "5px";
        buttonBank.style.paddingBottom = "5px";
        buttonBank.style.backgroundColor = "black";
        buttonBank.style.color = "white";


        div.setAttribute('class', 'stylePanel');

        (speler.name) ?
            NewLi.innerHTML = speler.name :
            NewLi.innerHTML = `Speler ${speler.id}`

        const buttonRight = document.createElement('button');
        const buttonWrong = document.createElement('button');

        buttonRight.addEventListener('click', () => {

            if (round == 1 && div.className === 'stylePanel_highlighted') {
                playerGivesAnswer('right')
            }
            else if (round != 1 && !firstClick) {
                firstClick = true;
                playerGivesAnswer('right')
            }
            else if (round != 1 && firstClick && div.className === 'stylePanel_highlighted') {
                playerGivesAnswer('right')
            }

        })

        buttonRight.innerHTML = `CORRECT (${speler.rightAnswer})`;
        buttonRight.style.backgroundColor = "green";
        buttonRight.style.paddingTop = "5px";
        buttonRight.style.paddingBottom = "5px";
        buttonRight.style.color = "white";

        buttonWrong.addEventListener('click', () => {

            if (round == 1 && div.className === 'stylePanel_highlighted') {
                playerGivesAnswer('wrong')
            }
            else if (round != 1 && !firstClick) {
                firstClick = true;
                playerGivesAnswer('wrong')
            }
            else if (round != 1 && firstClick && div.className === 'stylePanel_highlighted') {
                playerGivesAnswer('wrong')
            }

        })

        buttonWrong.innerHTML = `FOUT (${speler.wrongAnswer})`;
        buttonWrong.style.backgroundColor = "red";
        buttonWrong.style.paddingTop = "5px";
        buttonWrong.style.paddingBottom = "5px";
        buttonWrong.style.color = "white";

        if (!speler.visibility) {
            NewLi.setAttribute('class', 'unvisible');
            buttonRight.setAttribute('class', 'unvisible');
            buttonWrong.setAttribute('class', 'unvisible');
            buttonBank.setAttribute('class', 'unvisible');
            NewP.setAttribute('class', 'unvisible');
        }

        div.appendChild(NewLi)
        div.appendChild(buttonRight)
        div.appendChild(buttonWrong)
        if (round != 8) { div.appendChild(buttonBank) }
        div.appendChild(NewP)
        playerPanelEvaluation.appendChild(div)


        if (idx == 8) {
            scrollToTop.textContent = '↑';
            playerPanelEvaluation.appendChild(scrollToTop)
        }


        calculateTime();


        function highlightPanel() {

            function searchActivePanelsFromBeginning() {
                for (x = 0; x < activePanel.length; x++) {
                    if (activePanel[x].children[0].className !== 'unvisible') {
                        activePanel[x].classList.value = 'stylePanel_highlighted';
                        return
                    }

                }
            }

            const activePanel = [...playerPanelEvaluation.querySelectorAll('div')];

            if (speler.id < activePanel.length) {

                if (activePanel[idx + 1].children[0].className !== 'unvisible') {
                    activePanel[idx + 1].classList.value = 'stylePanel_highlighted';
                }
                else {
                    activePanel[idx].classList.value = 'stylePanel';

                    if (activePanel[activePanel.length - 1].children[0].className === 'unvisible') {
                        searchActivePanelsFromBeginning()
                    }

                    //search active panels to the end
                    for (x = idx + 1; x < activePanel.length - 1; x++) {
                        if (activePanel[x].children[0].className !== 'unvisible') {

                            activePanel[x - 1].classList.value = 'stylePanel';
                            activePanel[x].classList.value = 'stylePanel_highlighted';
                            return
                        }
                    }

                }

            } else if (speler.id == activePanel.length) {

                activePanel[speler.id - 1].classList.value = 'stylePanel';
                searchActivePanelsFromBeginning()

            }
            activePanel[(speler.id - 1)].setAttribute('class', 'stylePanel');

        }

        function playerGivesAnswer(rightorwrong) {
            removePreviousText(bedrag)
            clearInterval(showFirstStartingPlayer);
            changeBankTotal.classList.add('unvisible');

            if (rightorwrong === 'right') {
                speler.rightAnswer++;
                chainValue++;
                buttonRight.innerHTML = `CORRECT (${speler.rightAnswer})`;
                bedr--
            }

            else if (rightorwrong === 'wrong') {
                speler.wrongAnswer++
                chainValue = 0;
                buttonWrong.innerHTML = `FOUT (${speler.wrongAnswer})`;
                setFirstAmountRed()
                bedr = amounts.length - 1;

            }

            let turns = speler.rightAnswer + speler.wrongAnswer;

            NewP.style.visibility = "visible";
            NewP.innerHTML = `Score: ${(speler.rightAnswer / turns).toFixed(2) * 100}%`;
            chain.textContent = `Ketting: ${chainValue}`;

            highlightPanel()

            showInfo()
        }


        function banking() {
            removePreviousText(bedrag)

            setFirstAmountRed()
            chainValue = 0;
            speler.banking += amounts[bedr].amount;
            bankInCurrentRound += amounts[bedr].amount;
            bedr = amounts.length - 1;
            buttonBank.innerHTML = `'Gebankt:' ${speler.banking}`;
            chain.textContent = `Ketting: ${chainValue}`;

            showInfo();
        }
    })

    determineStartPlayerFirstRound()

    function calculateTime() {

        if (round <= 6) {
            timeInRound = 180 - ((round - 1) * 10);

            let minutes = Math.floor(timeInRound / 60);
            let seconds = timeInRound - (minutes * 60);

            (seconds >= 10) ?
                time.innerHTML = `${minutes}:${seconds}` :
                time.innerHTML = `${minutes}:0${seconds}`
        }

        else if (round == 7) {
            timeInRound = 90;
            let minutes = Math.floor(timeInRound / 60);
            let seconds = timeInRound - (minutes * 60);

            (seconds >= 10) ?
                time.innerHTML = `${minutes}:${seconds}` :
                time.innerHTML = `${minutes}:0${seconds}`
        }

    }


    function startTime() {

        if (round <= 6) {
            timeInRound = 179 - ((round - 1) * 10);

            let timeRuns = setInterval(() => {
                let minutes = Math.floor(timeInRound / 60);
                let seconds = timeInRound - (minutes * 60);

                (seconds >= 10) ?
                    time.innerHTML = `${minutes}:${seconds}` :
                    time.innerHTML = `${minutes}:0${seconds}`

                if (timeInRound > 0) { timeInRound-- }

                else {
                    clearInterval(timeRuns);
                    time.innerHTML = timesup;

                    evaluate.style.visibility = "visible";
                }
            }, 1000)
        }

        else if (round = 7) {
            timeInRound = 90;
            let timeRuns = setInterval(() => {
                let minutes = Math.floor(timeInRound / 60);
                let seconds = timeInRound - (minutes * 60);

                (seconds >= 10) ?
                    time.innerHTML = `${minutes}:${seconds}` :
                    time.innerHTML = `${minutes}:0${seconds}`

                if (timeInRound > 0) { timeInRound-- }

                else {
                    clearInterval(timeRuns);
                    time.innerHTML = timesup;
                    evaluate.style.visibility = "visible";
                }
            }, 1000)
        }
    }

    removePreviousText(startClock)

    const btn = document.createElement('button');
    btn.addEventListener('click', () => startTime());
    btn.innerHTML = 'Start de klok';
    startClock.appendChild(btn);

}

function changeTotal() {

    clearTimeout(showFirstStartingPlayer);

    changeBankTotal.classList.remove('unvisible');
    changeBankTotal.innerHTML = '';

    if (!changeBankTotal.firstChild) {
        const input = document.createElement('input');
        const btn = document.createElement('button');
        input.type = "number";
        input.placeholder = 'Voer bedrag in';
        btn.textContent = 'Pas bedrag aan';

        btn.addEventListener('click', () => {
            (input.value) ?
                bankTotal = parseInt(input.value) : null

            bank.innerHTML = `Bank (totaal): ${bankTotal}`
            sessionStorage.setItem('bankTotal', bankTotal);

            removePreviousText(changeBankTotal)

        })

        changeBankTotal.appendChild(input)
        changeBankTotal.appendChild(btn)
    }
}

function startNextRound() {
    bank.style.display = "flex";
    bedrag.style.display = "block";
    bankinronde.style.display = "block";

    setFirstAmountRed()

    removePreviousText(bedrag)
    time.innerHTML = '';
    bedr = amounts.length - 1;
    bankTotal += parseInt(bankInCurrentRound);
    sessionStorage.setItem('bankTotal', bankTotal);

    bankInCurrentRound = 0;
    round++
    sessionStorage.setItem('round', round)

    spelers.forEach(speler => {
        speler.wrongAnswer = 0;
        speler.rightAnswer = 0;
        speler.banking = 0;
    })
    showInfo();
}

function showAmounts() {

    if (bedr > 0) {

        amounts[bedr].color = "white";
        amounts[bedr - 1].color = "red";
    }
    else if (bedr == 0) {
        amounts[bedr].color = "red";
        bankInCurrentRound = 1000;
        chain.textContent = 'Ketting bereikt!';
        chainValue = 0;
    }

    amounts.filter(am => am.visibility != false).map(am => {
        const newLi = document.createElement('li');
        newLi.innerHTML = am.amount;
        newLi.style.color = am.color;
        bedrag.appendChild(newLi)
    })
}

function showInfo() {
    showAmounts();

    if (bankInCurrentRound > 100) {
        bankinronde.style.marginLeft = "0px";
    }

    if (bankInCurrentRound > 0) {
        bankinronde.style.marginLeft = "20px";
    }

    (round == 7) ?
        bankinronde.innerHTML = `<span style="font-size:30px">€</span> ${bankInCurrentRound} <strong style="font-size:12px">(bedrag wordt op het eind verdrievoudigd!)</strong>` :
        bankinronde.innerHTML = `<span style="font-size:30px">€</span> ${bankInCurrentRound}`;

    if (sessionStorage.bankTotal) {
        bank.innerHTML = `Bank (totaal): ${parseInt(sessionStorage.bankTotal)}`
    }
    else {
        bank.innerHTML = `Bank (totaal): ${bankTotal}`
    }
}

function evaluatePlayers() {

    time.innerHTML = '';
    bank.style.display = "none";
    bedrag.style.display = "none";
    bankinronde.style.display = "none";
    startplayer.style.visibility = "visible";
    startplayer.innerHTML = `Klik op een naam om een speler een stem-tegen te geven.<br>
        De sortering wordt direct aangepast.`

    if (round == 7) {
        bankInCurrentRound = bankInCurrentRound * 3
    }

    removePreviousText(playerPanelEvaluation)

    spelers.filter(sp => sp.visibility == true).
        sort((c, d) => (d.banking) - (c.banking)).
        sort((a, b) => (b.rightAnswer) - (a.rightAnswer)).
        sort((e, f) => (f.rightAnswer / (f.rightAnswer + f.wrongAnswer)) -
            (e.rightAnswer / (e.rightAnswer + e.wrongAnswer)))
        .forEach(player => {
            player['voteagainst'] = 0
            const playerName = (player.name) ? player.name : `<em>Speler ${player.id}</em>`
            const newLi = document.createElement('li');
            newLi.style.display = "block";
            newLi.style.margin = "20px";

            newLi.addEventListener('click', () => {
                votedAway.style.visibility = 'visible';
                votedAway.textContent = `Wie wordt weggestemd?`;
                player['voteagainst'] += 1;
                setVoteAgainst();

            })

            turns = player.rightAnswer + player.wrongAnswer;

            (turns != 0) ?

                newLi.innerHTML = `${playerName} (goede antwoorden: ${player.rightAnswer} 
         / gebankt: ${player.banking} / score: <strong>${(player.rightAnswer / turns).toFixed(2) * 100}%</strong>)` :
                newLi.innerHTML = playerName;

            playerPanelEvaluation.appendChild(newLi)

            function setVoteAgainst() {

                sortPlayersByVotes();

                let totalClicks = 1;

                function sortPlayersByVotes() {
                    removePreviousText(playerPanelEvaluation)
                    spelers.filter(sp => sp.visibility == true).sort((a, b) =>
                        (b.voteagainst) - (a.voteagainst)).forEach(player => {
                            const playerName = (player.name) ? player.name : `<em>Speler ${player.id}</em>`
                            const newLi = document.createElement('li');
                            newLi.innerHTML = `${playerName} &nbsp;&nbsp; <span style="color:red;">${player.voteagainst}</span>`;
                            newLi.style.display = "block";
                            newLi.style.width = "200px";
                            newLi.style.margin = "20px";

                            newLi.addEventListener('click', () => {
                                totalClicks++
                                if (totalClicks < (spelers.filter(sp => sp.visibility == true).length)) {
                                    player['voteagainst'] += 1;
                                    sortPlayersByVotes()
                                }
                                else if (totalClicks == (spelers.filter(sp => sp.visibility == true).length)) {
                                    player['voteagainst'] += 1;
                                    sortPlayersByVotes()
                                    selectPlayerToBeWiped()
                                }
                            })
                            playerPanelEvaluation.appendChild(newLi)
                        })
                }
            }

        })

    function selectPlayerToBeWiped() {

        startplayer.innerHTML = '';

        if (votedAway.children.length < 2) {
            const select = document.createElement('select');

            spelers.filter(sp => sp.visibility == true).sort((a, b) =>
                (a.voteagainst) - (b.voteagainst))
                .map(speler => {
                    const option = document.createElement('option');

                    speler.name ? option.value = speler.name : option.value = `Speler ${speler.id}`;

                    speler.name ? option.innerHTML = speler.name : option.innerHTML = `Speler ${speler.id}`;

                    option.setAttribute('selected', 'select[(select.length-1)].value')

                    select.appendChild(option);
                    votedAway.appendChild(select);
                })

            const button = document.createElement('button');
            button.innerHTML = 'Stem weg';
            button.addEventListener('click', () => { sayGoodbye() });
            votedAway.appendChild(button);


            function sayGoodbye() {
                removePreviousText(playerPanelEvaluation)
                votedAway.style.visibility = 'hidden';
                goodbye.innerHTML =
                    `${select.value}, <br>jij bent de zwakste schakel. <br>TOT ZIENS!!`;
                goodbye.style.transform = "translateX(1500px)";
                goodbye.style.transitionDuration = "1s";
                goodbye.style.transitionDelay = "2s";
                setTimeout(() => {

                    const wipedPlayer = spelers.findIndex(speler => (speler.name) ? speler.name === select.value
                        : speler.id === parseInt(select.value.split(' ')[1]));

                    spelers[wipedPlayer]['visibility'] = false;

                    startNextRound()

                    playGame()

                }, 3000)
            }
        }
    }
}

function playFinal() {

    document.querySelector('body').style.textAlign = 'center';

    ronde.innerHTML = `FINALE`;
    bank.innerHTML = `Wie gaat er naar huis met ${bankTotal} euro? <br><br>
    Klik op het groene resp. rode vlakje <br> van de cirkel voor een goed/fout antwoord.`;
    startClock.style.visibility = "hidden";
    bedrag.style.visibility = "hidden";
    time.style.visibility = "hidden";
    bankinronde.style.visibility = "hidden";
    chain.style.visibility = 'hidden';

    function getNamesFinalPlayers() {


        spelers.filter(sp => {
            sp.visibility == true;
            corrTotalAmount.style.fontSize = 'large';
            if (sp.name) {
                corrTotalAmount.innerHTML = `Begint ${spelers.filter(sp => sp.visibility == true)[0].name}?<p>
                <input type=radio name=finalplayers id=finalplayer1>
                <label for="finalplayer1">Ja</label>
                <input type=radio name=finalplayers id=finalplayer2>
                <label for="finalplayer2">Nee</label>`;
            } else {
                corrTotalAmount.innerHTML = `Begint speler ${spelers.filter(sp => sp.visibility == true)[0].id}?<p>
                <input type=radio name=finalplayers id=finalplayer1>
                <label for="finalplayer1">Ja</label>
                <input type=radio name=finalplayers id=finalplayer2>
                <label for="finalplayer2">Nee</label>`;
            }
        })


        document.getElementById('finalplayer1').addEventListener('click', () => {
            corrTotalAmount.style.visibility = 'hidden';
            changeBankTotal.style.visibility = 'hidden';
            addNamesFinalists(spelerA_Name, 0)
            addNamesFinalists(spelerB_Name, 1)
        })
        document.getElementById('finalplayer2').addEventListener('click', () => {
            corrTotalAmount.style.visibility = 'hidden';
            changeBankTotal.style.visibility = 'hidden';
            addNamesFinalists(spelerA_Name, 1)
            addNamesFinalists(spelerB_Name, 0)
        })
    }

    getNamesFinalPlayers()

    evaluate.style.visibility = "hidden";

    function sayGoodbyeAfterFinal() {

        ronde.innerHTML = '';
        bank.innerHTML = '';

        spelerA_Name.innerHTML = '';
        spelerB_Name.innerHTML = '';
        spelerA.style.fontSize = "80px";


        setTimeout(() => {

            const removeChilds = parent => {
                while (parent.lastChild) {
                    parent.removeChild(parent.lastChild);
                }
            };

            removeChilds(spelerA);
            removeChilds(spelerB);

            finalResult.innerHTML = '';

            spelerA.innerHTML =
                `Dit was de zwakste schakel. <br>TOT ZIENS!!`;

            spelerA.style.transform = "translateX(1500px)";
            spelerA.style.transitionDuration = "1s";
            spelerA.style.transitionDelay = "2s";
        }, 4000)
    }

    function addNamesFinalists(div, idx) {

        spelers.filter(sp => {
            sp.visibility == true;

            if (sp.name) {
                div.innerText = `${spelers.filter(sp => sp.visibility == true)[idx].name}`;
            } else {
                div.innerText = `Speler ${spelers.filter(sp => sp.visibility == true)[idx].id}`;
            }
        })
    }


    function setCircles(player, array, num, filteredarray) {

        function gameOver() {
            [...spelerA.querySelectorAll('div')].filter(arr => !arr.clicked).map(ar => ar.style.visibility = 'hidden');
            [...spelerB.querySelectorAll('div')].filter(arr => !arr.clicked).map(ar => ar.style.visibility = 'hidden');
        }

        function evaluateScore() {

            if
                (filteredArrayB.length - filteredArrayA.length > (num - totalScorePlayerB.length)) {

                spelers.filter(sp => {
                    sp.visibility == true;

                    if (sp.name) {
                        finalResult.innerHTML =
                            `${spelers.filter(sp => sp.visibility == true)[1].name}, jij gaat naar huis met ${bankTotal} euro.<br><br>
                        ${spelers.filter(sp => sp.visibility == true)[0].name}, jij gaat naar huis met niets.`;
                    } else {
                        finalResult.innerHTML =
                            `Speler ${spelers.filter(sp => sp.visibility == true)[1].id}, jij gaat naar huis met ${bankTotal} euro.<br><br>
                        Speler ${spelers.filter(sp => sp.visibility == true)[0].id}, jij gaat naar huis met niets.`;
                    }

                    gameOver()

                    sayGoodbyeAfterFinal()

                    return

                })
            }

            else if
                (filteredArrayA.length - filteredArrayB.length > (num - totalScorePlayerB.length)) {

                spelers.filter(sp => {
                    sp.visibility == true;

                    if (sp.name) {
                        finalResult.innerHTML =
                            `${spelers.filter(sp => sp.visibility == true)[0].name}, jij gaat naar huis met ${bankTotal} euro.<br><br>
                            ${spelers.filter(sp => sp.visibility == true)[1].name}, jij gaat naar huis met niets.`;
                    } else {
                        finalResult.innerHTML =
                            `Speler ${spelers.filter(sp => sp.visibility == true)[0].id}, jij gaat naar huis met ${bankTotal} euro.<br><br>
                        Speler ${spelers.filter(sp => sp.visibility == true)[1].id}, jij gaat naar huis met niets.`;
                    }

                    gameOver()

                    sayGoodbyeAfterFinal()

                })
            }
            else if (
                totalScorePlayerB.length == num &&
                filteredArrayB.length - filteredArrayA.length == (num - totalScorePlayerB.length)) {
                totalScorePlayerA = [];
                totalScorePlayerB = [];
                filteredArrayA = [];
                filteredArrayB = [];
                setCircles(spelerA, totalScorePlayerA, 1, filteredArrayA);
                setCircles(spelerB, totalScorePlayerB, 1, filteredArrayB);

                return
            }

        }


        for (x = 1; x < num + 1; x++) {

            const newDivLeft = document.createElement('div');
            const newDivRight = document.createElement('div');

            newDivLeft.classList.add('left');
            newDivLeft.style.backgroundColor = 'green';

            newDivRight.classList.add('right');
            newDivRight.style.backgroundColor = 'red';

            player.appendChild(newDivLeft);
            player.appendChild(newDivRight);
        }

        const divArray = [...player.querySelectorAll('div')]
        divArray.map((arr, idx) => {
            arr.addEventListener('click', () => {


                if (!divArray[idx].clicked) {

                    if (idx % 2 == 0) {
                        divArray[idx + 1].style.background = 'green';
                        array.push({ turn: (idx / 2) + 1, answer: true });
                        divArray[idx].clicked = true;
                        divArray[idx + 1].clicked = true;
                        filteredarray.push({ turn: (idx / 2) + 1, answer: true });

                        evaluateScore()

                        return
                    }

                    else if (idx % 2 == 1) {
                        divArray[idx - 1].style.background = 'red'
                    };
                    array.push({ turn: Math.ceil(idx / 2), answer: false });
                    divArray[idx].clicked = true;
                    divArray[idx - 1].clicked = true;

                    evaluateScore()

                }

            })

        })
    }

    setCircles(spelerA, totalScorePlayerA, 5, filteredArrayA);
    setCircles(spelerB, totalScorePlayerB, 5, filteredArrayB);
}


