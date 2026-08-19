/* =========================================================
   FOOTBALL CAREER
   GAME.JS
   Núcleo principal do jogo
   ========================================================= */


/* =========================================================
   ESTADO PADRÃO
   ========================================================= */

const defaultState = {

    player: {
        name: "Você",
        position: "Atacante",
        club: "Seu Clube"
    },

    stats: {
        confidence: 10,
        professionalism: 10,
        teammates: 10,
        coach: 10,
        fans: 10
    },

    flags: {},

    currentScene: "intro",
    previousScene: null,

    history: [],

    gameStarted: false,
    gameFinished: false

};


/* =========================================================
   ESTADO ATUAL
   ========================================================= */

let state = createInitialState();


/* =========================================================
   CRIA ESTADO NOVO
   ========================================================= */

function createInitialState() {

    return JSON.parse(
        JSON.stringify(defaultState)
    );

}


/* =========================================================
   ELEMENTOS DO HTML
   ========================================================= */

const elements = {};


/* =========================================================
   INICIALIZA ELEMENTOS
   ========================================================= */

function cacheElements() {

    elements.setupScreen =
    document.querySelector(
        "#setup-screen"
    );

elements.setupName =
    document.querySelector(
        "#setup-name"
    );

elements.setupPosition =
    document.querySelector(
        "#setup-position"
    );

elements.setupClub =
    document.querySelector(
        "#setup-club"
    );

elements.setupError =
    document.querySelector(
        "#setup-error"
    );

elements.startCareerButton =
    document.querySelector(
        "#start-career-button"
    );
    elements.background =
        document.querySelector("#background");

    elements.speaker =
        document.querySelector("#speaker");

    elements.sceneTitle =
        document.querySelector("#scene-title");

    elements.storyText =
        document.querySelector("#story-text");

    elements.question =
        document.querySelector("#question");

    elements.answers =
        document.querySelector("#answers");

    elements.consequence =
        document.querySelector("#consequence");

    elements.consequenceTitle =
    document.querySelector(
        "#consequence-title"
    );

    elements.consequenceEffects =
    document.querySelector(
        "#consequence-effects"
    );

    elements.playerName =
        document.querySelector("#player-name");

    elements.playerPosition =
        document.querySelector("#player-position");

    elements.chapterNumber =
        document.querySelector("#chapter-number");

    elements.saveButton =
        document.querySelector("#save-button");

    elements.restartButton =
        document.querySelector("#restart-button");

    elements.saveNotification =
        document.querySelector(
            "#save-notification"
        );

}

/* =========================================================
   CONFIGURAÇÃO DO JOGADOR
   ========================================================= */

function setupPlayerCreation() {

    if (!elements.startCareerButton) {

        return;

    }


    elements.startCareerButton.addEventListener(
        "click",
        createPlayer
    );


    if (elements.setupName) {

        elements.setupName.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    createPlayer();

                }

            }
        );

    }

}


/* =========================================================
   CRIA O JOGADOR
   ========================================================= */

function createPlayer() {

    const name =
        elements.setupName
            ?.value
            .trim();


    const position =
        elements.setupPosition
            ?.value ||
        "Atacante";


    const club =
        elements.setupClub
            ?.value ||
        "Royal Madrid";


    /* -----------------------------------------
       VALIDA NOME
       ----------------------------------------- */

    if (!name) {

        if (elements.setupError) {

            elements.setupError.textContent =
                "Digite um nome para o jogador.";

        }


        elements.setupName?.focus();

        return;

    }


    if (name.length < 2) {

        if (elements.setupError) {

            elements.setupError.textContent =
                "O nome precisa ter pelo menos 2 caracteres.";

        }


        elements.setupName?.focus();

        return;

    }


    /* -----------------------------------------
       SALVA DADOS
       ----------------------------------------- */

    state.player.name =
        name;

    state.player.position =
        position;

    state.player.club =
        club;


    state.gameStarted =
        true;

    state.gameFinished =
        false;


    /* -----------------------------------------
       ATUALIZA INTERFACE
       ----------------------------------------- */

    updatePlayerInfo();


    /* -----------------------------------------
       ESCONDE CONFIGURAÇÃO
       ----------------------------------------- */

    if (elements.setupScreen) {

        elements.setupScreen.classList.add(
            "hidden"
        );

    }


    /* -----------------------------------------
       COMEÇA A HISTÓRIA
       ----------------------------------------- */

    state.currentScene =
        "intro";


    renderScene(
        "intro",
        true
    );


    saveGame();

}
/* =========================================================
   INICIALIZA O JOGO
   ========================================================= */

function startGame() {

    state =
        createInitialState();


    state.gameStarted =
        false;


    state.gameFinished =
        false;


    updatePlayerInfo();


    /* -----------------------------------------
       MOSTRA TELA DE CRIAÇÃO
       ----------------------------------------- */

    if (elements.setupScreen) {

        elements.setupScreen.classList.remove(
            "hidden"
        );

    }


    /* -----------------------------------------
       LIMPA CAMPOS
       ----------------------------------------- */

    if (elements.setupName) {

        elements.setupName.value =
            "";

    }


    if (elements.setupError) {

        elements.setupError.textContent =
            "";

    }


    /* -----------------------------------------
       FOCO NO NOME
       ----------------------------------------- */

    setTimeout(
        () => {

            elements.setupName?.focus();

        },
        100
    );

}

/* =========================================================
   PROCURA UMA CENA
   ========================================================= */

function getScene(sceneId) {

    if (
        typeof storyData === "undefined"
    ) {

        console.error(
            "storyData.js não foi carregado."
        );

        return null;

    }


    const scene =
        storyData.find(
            item => item.id === sceneId
        );


    if (!scene) {

        console.error(
            `Cena não encontrada: ${sceneId}`
        );

        return null;

    }


    return scene;

}


/* =========================================================
   RENDERIZA CENA
   ========================================================= */

function renderScene(
    sceneId,
    animate = true
) {

    const scene =
        getScene(sceneId);


    if (!scene) {

        return;

    }


    if (
        state.currentScene &&
        state.currentScene !== sceneId
    ) {

        state.history.push(
            state.currentScene
        );

    }


    state.previousScene =
        state.currentScene;

    state.currentScene =
        sceneId;


    if (
        sceneId === "game_complete"
    ) {

        state.gameFinished =
            true;

    }


    updateBackground(scene);

    updatePlayerInfo();

    updateChapter(scene);

    updateSpeaker(scene);

    updateTitle(scene);

    updateStoryText(scene);

    updateQuestion(scene);

    renderAnswers(scene);

    updateStats();


    if (animate) {

        playSceneAnimation();

    }

}


/* =========================================================
   ATUALIZA FUNDO
   ========================================================= */

function updateBackground(scene) {

    const background =
        scene.background ||
        "stadium";


    const backgroundElement =
        elements.background;


    if (!backgroundElement) {

        return;

    }


    /* =====================================================
       SAÍDA DO FUNDO ATUAL
       ===================================================== */

    backgroundElement.classList.remove(
        "background-enter"
    );


    backgroundElement.classList.add(
        "background-changing"
    );


    setTimeout(
        () => {

            /* ---------------------------------------------
               ALTERA O TIPO DE FUNDO
               --------------------------------------------- */

            document.body.dataset.background =
                background;


            backgroundElement.dataset.background =
                background;


            /* ---------------------------------------------
               ENTRADA DO NOVO FUNDO
               --------------------------------------------- */

            backgroundElement.classList.remove(
                "background-changing"
            );


            backgroundElement.classList.add(
                "background-enter"
            );


            setTimeout(
                () => {

                    backgroundElement.classList.remove(
                        "background-enter"
                    );

                },
                800
            );

        },
        250
    );

}


/* =========================================================
   INFORMAÇÕES DO JOGADOR
   ========================================================= */

function updatePlayerInfo() {

    if (elements.playerName) {

        elements.playerName.textContent =
            state.player.name;

    }


    if (elements.playerPosition) {

        elements.playerPosition.textContent =
            state.player.position;

    }

}


/* =========================================================
   CAPÍTULO
   ========================================================= */

function updateChapter(scene) {

    if (!elements.chapterNumber) {

        return;

    }


    let number = "01";


    if (
        scene.chapter &&
        !isNaN(scene.chapter)
    ) {

        number =
            String(scene.chapter)
                .padStart(2, "0");

    }


    elements.chapterNumber.textContent =
        number;

}


/* =========================================================
   SPEAKER
   ========================================================= */

function updateSpeaker(scene) {

    if (!elements.speaker) {

        return;

    }


    let speaker =
        scene.speaker || "";


    if (
        typeof speaker === "function"
    ) {

        speaker =
            speaker(state);

    }


    elements.speaker.textContent =
        speaker;

}


/* =========================================================
   TÍTULO
   ========================================================= */

function updateTitle(scene) {

    if (!elements.sceneTitle) {

        return;

    }


    let title =
        scene.title || "";


    if (
        typeof title === "function"
    ) {

        title =
            title(state);

    }


    elements.sceneTitle.textContent =
        title;

}


/* =========================================================
   TEXTO
   ========================================================= */

function updateStoryText(scene) {

    if (!elements.storyText) {

        return;

    }


    let text =
        scene.text || "";


    if (
        typeof text === "function"
    ) {

        text =
            text(state);

    }


    elements.storyText.innerHTML =
        formatText(text);

}


/* =========================================================
   FORMATA TEXTO
   ========================================================= */

function formatText(text) {

    return String(text)
        .trim()
        .replace(/\n\s*\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

}


/* =========================================================
   PERGUNTA
   ========================================================= */

function updateQuestion(scene) {

    if (!elements.question) {

        return;

    }


    let question =
        scene.question || "";


    if (
        typeof question === "function"
    ) {

        question =
            question(state);

    }


    elements.question.textContent =
        question;

}


/* =========================================================
   CRIA BOTÕES
   ========================================================= */

function renderAnswers(scene) {

    if (!elements.answers) {

        return;

    }


    elements.answers.innerHTML =
        "";


 let answers =
    scene.answers || [];


if (
    typeof answers === "function"
) {

    answers =
        answers(state);

}


    answers.forEach(
        (answer, index) => {

            if (
                typeof answer.condition ===
                "function" &&
                !answer.condition(state)
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "choice-button";


            button.dataset.index =
                index;


            button.innerHTML = `

                <span class="choice-number">
                    ${index + 1}
                </span>

                <span class="choice-text">
                    ${answer.text}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    chooseAnswer(answer);

                }
            );


            elements.answers.appendChild(
                button
            );

        }
    );


    if (
        answers.length === 0
    ) {

        showNoChoices();

    }

}


/* =========================================================
   CASO NÃO EXISTAM ESCOLHAS
   ========================================================= */

function showNoChoices() {

    if (!elements.answers) {

        return;

    }


    elements.answers.innerHTML = `

        <div class="no-choice">
            Continuando...
        </div>

    `;

}


/* =========================================================
   ESCOLHA
   ========================================================= */

function chooseAnswer(answer) {

    if (!answer) {

        return;

    }


    disableChoices();


    /* =====================================================
       APLICA EFEITOS DA ESCOLHA
       ===================================================== */

    applyEffects(
        answer.effects
    );


    /* =====================================================
       APLICA FLAGS
       ===================================================== */

    applyFlags(
        answer.flags
    );


    /* =====================================================
       MOSTRA CONSEQUÊNCIA
       ===================================================== */

    showConsequence(
        answer.consequence
    );


    /* =====================================================
       DESCOBRE PRÓXIMA CENA
       ===================================================== */

    const nextScene =
        resolveNextScene(
            answer.next
        );


    /* =====================================================
       SALVA O JOGO
       ===================================================== */
    /* =====================================================
       NOVA CARREIRA
       ===================================================== */

    if (nextScene === "restart") {

        const playerData = {
            ...state.player
        };

        state = createInitialState();

        state.player = playerData;

        state.gameStarted = true;

        state.gameFinished = false;

        state.currentScene = "restart";

        state.previousScene = null;

        state.history = [];

        updatePlayerInfo();

        updateStats();
    }
    
    saveGame();


    /* =====================================================
       SE NÃO EXISTIR PRÓXIMA CENA
       ===================================================== */

    if (!nextScene) {

        console.warn(
            "Essa escolha não possui próxima cena."
        );

        return;

    }


    /* =====================================================
       ANIMAÇÃO DE SAÍDA
       ===================================================== */

    playSceneExitAnimation(
        () => {

            renderScene(
                nextScene,
                true
            );

        }
    );

}
/* =========================================================
   TRANSIÇÃO ENTRE CENAS
   ========================================================= */

function playSceneExitAnimation(callback) {

    const elementsToAnimate = [

        elements.storyText,

        elements.question,

        elements.answers,

        elements.sceneTitle,

        elements.speaker

    ];


    elementsToAnimate.forEach(
        element => {

            if (!element) {

                return;

            }


            element.classList.remove(
                "scene-enter"
            );


            element.classList.add(
                "scene-changing"
            );

        }
    );


    setTimeout(
        () => {

            elementsToAnimate.forEach(
                element => {

                    if (!element) {

                        return;

                    }


                    element.classList.remove(
                        "scene-changing"
                    );

                }
            );


            if (
                typeof callback ===
                "function"
            ) {

                callback();

            }

        },
        450
    );

}

/* =========================================================
   RESOLVE PRÓXIMA CENA
   ========================================================= */

function resolveNextScene(next) {

    if (
        typeof next === "function"
    ) {

        return next(state);

    }


    return next;

}


/* =========================================================
   APLICA EFEITOS
   ========================================================= */

function applyEffects(effects) {

    if (!effects) {

        return;

    }


    Object.entries(effects)
        .forEach(
            ([stat, value]) => {

                if (
                    typeof state.stats[stat] !==
                    "number"
                ) {

                    console.warn(
                        `Stat não encontrada: ${stat}`
                    );

                    return;

                }


                state.stats[stat] +=
                    Number(value) || 0;


                state.stats[stat] =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            state.stats[stat]
                        )
                    );

            }
        );


    updateStats();

}


/* =========================================================
   FLAGS
   ========================================================= */

function applyFlags(flags) {

    if (!Array.isArray(flags)) {

        return;

    }


    flags.forEach(
        flag => {

            if (typeof flag === "string") {

                state.flags[flag] =
                    true;

            }

        }
    );

}


/* =========================================================
   MOSTRA CONSEQUÊNCIA DA ESCOLHA
   ========================================================= */

function showConsequence(
    text,
    effects = null
) {

    if (!elements.consequence) {

        return;

    }


    /* =====================================================
       TÍTULO
       ===================================================== */

    if (elements.consequenceTitle) {

        elements.consequenceTitle.textContent =
            text || "Decisão tomada";

    }


    /* =====================================================
       EFEITOS
       ===================================================== */

    if (elements.consequenceEffects) {

        elements.consequenceEffects.innerHTML =
            "";


        if (effects) {

            Object.entries(effects)
                .forEach(
                    ([stat, value]) => {

                        const numericValue =
                            Number(value);


                        if (
                            !numericValue
                        ) {

                            return;

                        }


                        const effect =
                            document.createElement(
                                "span"
                            );


                        effect.className =
                            numericValue > 0
                                ? "effect-positive"
                                : "effect-negative";


                        const sign =
                            numericValue > 0
                                ? "+"
                                : "";


                        effect.textContent =
                            `${sign}${numericValue} ${getStatName(stat)}`;


                        elements.consequenceEffects
                            .appendChild(effect);

                    }
                );

        }

    }


    /* =====================================================
       MOSTRA
       ===================================================== */

    elements.consequence.classList.add(
        "show"
    );


    clearTimeout(
        showConsequence.timer
    );


    showConsequence.timer =
        setTimeout(
            () => {

                elements.consequence.classList.remove(
                    "show"
                );

            },
            1200
        );

}
/* =========================================================
   NOME VISUAL DOS ATRIBUTOS
   ========================================================= */

function getStatName(stat) {

    const names = {

        confidence:
            "Confiança",

        professionalism:
            "Profissionalismo",

        teammates:
            "Companheiros",

        coach:
            "Treinador",

        fans:
            "Torcida"

    };


    return (
        names[stat] ||
        stat
    );

}


/* =========================================================
   DESABILITA ESCOLHAS
   ========================================================= */

function disableChoices() {

    const buttons =
        document.querySelectorAll(
            ".choice-button"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );

}


/* =========================================================
   ATUALIZA STATS
   ========================================================= */

function updateStats() {

    updateStat(
        "confidence",
        state.stats.confidence
    );

    updateStat(
        "professionalism",
        state.stats.professionalism
    );

    updateStat(
        "teammates",
        state.stats.teammates
    );

    updateStat(
        "coach",
        state.stats.coach
    );

    updateStat(
        "fans",
        state.stats.fans
    );

}


/* =========================================================
   ATUALIZA UMA STAT
   ========================================================= */

function updateStat(
    name,
    value
) {

    const valueElement =
        document.querySelector(
            `[data-stat="${name}"]`
        );


    if (valueElement) {

        valueElement.textContent =
            value;

    }


    const bar =
        document.querySelector(
            `[data-stat-bar="${name}"]`
        );


    if (bar) {

        bar.style.width =
            `${value}%`;

    }

}


/* =========================================================
   ANIMAÇÃO DE CENA
   ========================================================= */

function playSceneAnimation() {

    const animatedElements = [

        elements.storyText,

        elements.question,

        elements.sceneTitle,

        elements.speaker,

        elements.answers

    ];


    animatedElements.forEach(
        element => {

            if (!element) {

                return;

            }


            element.classList.remove(
                "scene-enter"
            );


            void element.offsetWidth;


            element.classList.add(
                "scene-enter"
            );

        }
    );

}


/* =========================================================
   SALVAR
   ========================================================= */

function saveGame() {

    try {

        localStorage.setItem(
            "footballCareerSave",
            JSON.stringify(state)
        );


        showSaveNotification();

        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar jogo:",
            error
        );

        return false;

    }

}


/* =========================================================
   NOTIFICAÇÃO DE SAVE
   ========================================================= */

function showSaveNotification() {

    if (!elements.saveNotification) {

        return;

    }


    elements.saveNotification.classList.add(
        "show"
    );


    clearTimeout(
        showSaveNotification.timer
    );


    showSaveNotification.timer =
        setTimeout(
            () => {

                elements.saveNotification.classList.remove(
                    "show"
                );

            },
            1800
        );

}


/* =========================================================
   CARREGAR
   ========================================================= */

function loadGame() {

    try {

        const saved =
            localStorage.getItem(
                "footballCareerSave"
            );


        if (!saved) {

            return false;

        }


        const loaded =
            JSON.parse(saved);


        const fresh =
            createInitialState();


        state = {

            ...fresh,

            ...loaded,

            player: {

                ...fresh.player,

                ...(loaded.player || {})

            },

            stats: {

                ...fresh.stats,

                ...(loaded.stats || {})

            },

            flags: {

                ...(loaded.flags || {})

            }

        };


        state.gameStarted =
            true;


        updatePlayerInfo();

        renderScene(
            state.currentScene,
            false
        );


        return true;

    } catch (error) {

        console.error(
            "Erro ao carregar o jogo:",
            error
        );


        return false;

    }

}


/* =========================================================
   APAGA SAVE
   ========================================================= */

function deleteSave() {

    localStorage.removeItem(
        "footballCareerSave"
    );

}


/* =========================================================
   REINICIAR
   ========================================================= */

function restartGame() {

    const confirmed =
        confirm(
            "Tem certeza que deseja começar uma nova carreira?"
        );

    if (!confirmed) {
        return;
    }

    /* =====================================================
       RESETA COMPLETAMENTE A CARREIRA
       ===================================================== */

    deleteSave();

    state = createInitialState();

    updateStats();

    updatePlayerInfo();

    startGame();
}


/* =========================================================
   BOTÕES DO HTML
   ========================================================= */

function setupControls() {

    if (elements.saveButton) {

        elements.saveButton.addEventListener(
            "click",
            saveGame
        );

    }


    if (elements.restartButton) {

        elements.restartButton.addEventListener(
            "click",
            restartGame
        );

    }

}


/* =========================================================
   TECLADO
   ========================================================= */

function setupKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.repeat
            ) {

                return;

            }


            const buttons =
                document.querySelectorAll(
                    ".choice-button:not(:disabled)"
                );


            const number =
                Number(event.key);


            if (
                number >= 1 &&
                number <= buttons.length
            ) {

                buttons[
                    number - 1
                ].click();

            }

        }
    );

}


/* =========================================================
   AUTO SAVE
   ========================================================= */

function setupAutoSave() {

    setInterval(
        () => {

            if (
                state.gameStarted
            ) {

                saveGame();

            }

        },
        30000
    );

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

cacheElements();

setupControls();

setupKeyboard();

setupAutoSave();

setupPlayerCreation();


        const saved =
            localStorage.getItem(
                "footballCareerSave"
            );


        if (saved) {

            const continueGame =
                confirm(
                    "Existe uma carreira salva. Deseja continuar?"
                );


            if (continueGame) {

                if (loadGame()) {

                    return;

                }

            }

        }


        startGame();

    }
);