/* =========================================================
   FOOTBALL CAREER
   MATCH.JS
   Sistema base das partidas
   ========================================================= */


/* =========================================================
   ESTADO DA PARTIDA
   ========================================================= */

const matchState = {

    active: false,

    minute: 0,

    homeScore: 0,

    awayScore: 0,

    energy: 100,

    performance: 50,

    confidence: 50,

    possession: 50,

    events: [],

    playerOnField: false,

    finished: false

};


/* =========================================================
   CONFIGURAÇÃO DA PARTIDA
   ========================================================= */

const matchConfig = {

    duration: 90,

    opponent:
        "FC Champions",

    stadium:
        "Stadium Arena"

};


/* =========================================================
   INICIA UMA PARTIDA
   ========================================================= */

function startMatch(
    playerStarting = true
) {

    matchState.active =
        true;

    matchState.minute =
        0;

    matchState.homeScore =
        0;

    matchState.awayScore =
        0;

    matchState.energy =
        100;

    matchState.performance =
        50;

    matchState.confidence =
        50;

    matchState.possession =
        50;

    matchState.events =
        [];

    matchState.playerOnField =
        playerStarting;

    matchState.finished =
        false;


    console.log(
        "⚽ Partida iniciada!"
    );


    console.log(
        `🏟️ ${matchConfig.stadium}`
    );


    console.log(
        `🆚 ${matchConfig.opponent}`
    );


    updateMatchUI();

}


/* =========================================================
   AVANÇA O TEMPO
   ========================================================= */

function advanceMatchTime(
    minutes = 1
) {

    if (
        !matchState.active ||
        matchState.finished
    ) {

        return;

    }


    matchState.minute +=
        minutes;


    if (
        matchState.minute >=
        matchConfig.duration
    ) {

        matchState.minute =
            matchConfig.duration;

        finishMatch();

        return;

    }


    updateMatchUI();

}


/* =========================================================
   ALTERA DESEMPENHO
   ========================================================= */

function changePerformance(
    amount
) {

    matchState.performance +=
        amount;


    matchState.performance =
        Math.max(
            0,
            Math.min(
                100,
                matchState.performance
            )
        );


    updateMatchUI();

}


/* =========================================================
   ALTERA CONFIANÇA
   ========================================================= */

function changeMatchConfidence(
    amount
) {

    matchState.confidence +=
        amount;


    matchState.confidence =
        Math.max(
            0,
            Math.min(
                100,
                matchState.confidence
            )
        );


    updateMatchUI();

}


/* =========================================================
   ALTERA ENERGIA
   ========================================================= */

function changeEnergy(
    amount
) {

    matchState.energy +=
        amount;


    matchState.energy =
        Math.max(
            0,
            Math.min(
                100,
                matchState.energy
            )
        );


    updateMatchUI();

}


/* =========================================================
   ALTERA POSSE DE BOLA
   ========================================================= */

function changePossession(
    amount
) {

    matchState.possession +=
        amount;


    matchState.possession =
        Math.max(
            0,
            Math.min(
                100,
                matchState.possession
            )
        );


    updateMatchUI();

}


/* =========================================================
   REGISTRA EVENTO
   ========================================================= */

function registerMatchEvent(
    type,
    description
) {

    const event = {

        minute:
            matchState.minute,

        type:
            type,

        description:
            description

    };


    matchState.events.push(
        event
    );


    console.log(
        `[${event.minute}'] ${description}`
    );


    return event;

}


/* =========================================================
   GOL DO NOSSO TIME
   ========================================================= */

function scoreGoal() {

    matchState.homeScore++;


    registerMatchEvent(
        "goal",
        "⚽ GOL! Seu time marcou."
    );


    changePerformance(
        8
    );


    changeMatchConfidence(
        10
    );


    changeEnergy(
        -3
    );


    updateMatchUI();

}


/* =========================================================
   GOL DO ADVERSÁRIO
   ========================================================= */

function concedeGoal() {

    matchState.awayScore++;


    registerMatchEvent(
        "conceded",
        "⚠️ O adversário marcou."
    );


    changePerformance(
        -5
    );


    changeMatchConfidence(
        -8
    );


    changeEnergy(
        -2
    );


    updateMatchUI();

}


/* =========================================================
   FINALIZA A PARTIDA
   ========================================================= */

function finishMatch() {

    matchState.active =
        false;

    matchState.finished =
        true;


    registerMatchEvent(
        "fulltime",
        "🏁 Fim de jogo."
    );


    updateMatchUI();


    console.log(
        "🏁 PARTIDA ENCERRADA"
    );


    console.log(
        `Placar:
        ${matchState.homeScore}
        x
        ${matchState.awayScore}`
    );

}


/* =========================================================
   ATUALIZA INTERFACE
   ========================================================= */

function updateMatchUI() {

        const confidenceElement =
        document.querySelector(
            "#match-confidence"
        );


    const energyBar =
        document.querySelector(
            "#match-energy-bar"
        );


    const performanceBar =
        document.querySelector(
            "#match-performance-bar"
        );


    const confidenceBar =
        document.querySelector(
            "#match-confidence-bar"
        );


    const eventsElement =
        document.querySelector(
            "#match-events"
        );

    const minuteElement =
        document.querySelector(
            "#match-minute"
        );


    const scoreElement =
        document.querySelector(
            "#match-score"
        );


    const energyElement =
        document.querySelector(
            "#match-energy"
        );


    const performanceElement =
        document.querySelector(
            "#match-performance"
        );


    if (minuteElement) {

        minuteElement.textContent =
            `${matchState.minute}'`;

    }


    if (scoreElement) {

        scoreElement.textContent =
            `${matchState.homeScore} - ${matchState.awayScore}`;

    }


    if (energyElement) {

        energyElement.textContent =
            `${Math.round(
                matchState.energy
            )}%`;

    }


    if (performanceElement) {

        performanceElement.textContent =
            `${Math.round(
                matchState.performance
            )}`;

    }
    /* =====================================================
       CONFIANÇA
       ===================================================== */

    if (confidenceElement) {

        confidenceElement.textContent =
            `${Math.round(
                matchState.confidence
            )}`;

    }


    /* =====================================================
       BARRA DE ENERGIA
       ===================================================== */

    if (energyBar) {

        energyBar.style.width =
            `${matchState.energy}%`;

    }


    /* =====================================================
       BARRA DE DESEMPENHO
       ===================================================== */

    if (performanceBar) {

        performanceBar.style.width =
            `${matchState.performance}%`;

    }


    /* =====================================================
       BARRA DE CONFIANÇA
       ===================================================== */

    if (confidenceBar) {

        confidenceBar.style.width =
            `${matchState.confidence}%`;

    }


    /* =====================================================
       EVENTOS
       ===================================================== */

    if (
        eventsElement &&
        matchState.events.length > 0
    ) {

        eventsElement.innerHTML =
            "";


        matchState.events
            .slice()
            .reverse()
            .forEach(
                event => {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "match-event";


                    element.textContent =
                        `${event.minute}' — ${event.description}`;


                    eventsElement
                        .appendChild(
                            element
                        );

                }
            );

    }
        const homeName =
        document.querySelector(
            "#match-home-name"
        );


    if (
        homeName &&
        state.player
    ) {

        homeName.textContent =
            state.player.club ||
            "SEU CLUBE";

    }
}
/* =========================================================
   ABRE A TELA DA PARTIDA
   ========================================================= */

function showMatchScreen() {

    const screen =
        document.querySelector(
            "#match-screen"
        );


    if (!screen) {

        console.warn(
            "Tela da partida não encontrada."
        );

        return;

    }


    screen.classList.remove(
        "hidden"
    );


    updateMatchUI();

}


/* =========================================================
   FECHA A TELA DA PARTIDA
   ========================================================= */

function hideMatchScreen() {

    const screen =
        document.querySelector(
            "#match-screen"
        );


    if (!screen) {

        return;

    }


    screen.classList.add(
        "hidden"
    );

}


/* =========================================================
   BOTÃO DA PARTIDA
   ========================================================= */

function setupMatchControls() {

    const button =
        document.querySelector(
            "#match-action-button"
        );


    if (!button) {

        console.warn(
            "Botão da partida não encontrado."
        );

        return;

    }


    button.addEventListener(
        "click",
        handleMatchAction
    );

}


/* =========================================================
   AÇÃO PRINCIPAL
   ========================================================= */

function handleMatchAction() {

    if (
        !matchState.active
    ) {

        return;

    }


    /*
     * Cada clique avança aproximadamente
     * 5 minutos da partida.
     */

    advanceMatchTime(
        5
    );


    generateMatchEvent();

}


/* =========================================================
   EVENTOS AUTOMÁTICOS
   ========================================================= */

function generateMatchEvent() {

    if (
        !matchState.active
    ) {

        return;

    }


    const random =
        Math.random();


    /*
     * Evento neutro
     */

    if (
        random < 0.45
    ) {

        registerMatchEvent(
            "play",
            "O jogo segue equilibrado no meio-campo."
        );

        return;

    }


    /*
     * Chance do nosso time
     */

    if (
        random < 0.65
    ) {

        registerMatchEvent(
            "chance",
            "Seu time encontra espaço no ataque."
        );


        changePerformance(
            2
        );


        return;

    }


    /*
     * Pressão adversária
     */

    if (
        random < 0.82
    ) {

        registerMatchEvent(
            "danger",
            "O adversário aumenta a pressão."
        );


        changeEnergy(
            -3
        );


        return;

    }


    /*
     * Pequena chance de gol
     */

    if (
        random < 0.94
    ) {

        scoreGoal();

        return;

    }


    /*
     * Gol adversário
     */

    concedeGoal();

}

/* =========================================================
   DISPONIBILIZA PARA OUTROS ARQUIVOS
   ========================================================= */

window.matchSystem = {

    state:
        matchState,

    start:
        startMatch,

    advance:
        advanceMatchTime,

    goal:
        scoreGoal,

    concede:
        concedeGoal,

    performance:
        changePerformance,

    confidence:
        changeMatchConfidence,

    energy:
        changeEnergy,

    possession:
        changePossession,

    event:
        registerMatchEvent,

    show:
        showMatchScreen,

    hide:
        hideMatchScreen,

    setup:
        setupMatchControls
};

/* =========================================================
   INICIALIZA OS CONTROLES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupMatchControls();

    }
)

;
