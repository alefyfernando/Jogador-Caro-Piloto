/* ========================================================
   MAIN.JS
   Ponto de entrada do jogo

   Responsável por:
   - Inicializar os sistemas
   - Conectar narrativa e interface
   - Iniciar a história
   - Controlar transições
   ======================================================== */


/* ========================================================
   IMPORTAÇÕES
   ======================================================== */

import {

    startScene,

    continueFromAnswer,

    registerNarrativeCallbacks

} from "./core/narrativeEngine.js";


import {

    gameState

} from "./core/state.js";


import {

    initSceneRenderer,

    renderScene,

    handleConsequence,

    updateProgress

} from "./ui/sceneRenderer.js";


import {

    initBackgroundManager,

    preloadBackgrounds,

    setBackground

} from "./ui/backgroundManager.js";


/* ========================================================
   CONFIGURAÇÃO
   ======================================================== */

const CONFIG = {

    firstScene: "intro_01",

    consequenceDelay: 1200

};


/* ========================================================
   ELEMENTOS GLOBAIS
   ======================================================== */

let startButton = null;

let restartButton = null;

let continueButton = null;

let settingsButton = null;


/* ========================================================
   INICIALIZAÇÃO
   ======================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initGame

);


/* ========================================================
   INIT GAME
   ======================================================== */

function initGame(){

    console.log(

        "⚽ Inicializando Você Decide Sua Carreira..."

    );


    /*
    --------------------------------------------------------
    Inicializa interface
    --------------------------------------------------------
    */

    initSceneRenderer();


    /*
    --------------------------------------------------------
    Inicializa backgrounds
    --------------------------------------------------------
    */

    initBackgroundManager();


    /*
    --------------------------------------------------------
    Pré-carrega imagens
    --------------------------------------------------------
    */

    preloadBackgrounds();


    /*
    --------------------------------------------------------
    Busca elementos
    --------------------------------------------------------
    */

    cacheElements();


    /*
    --------------------------------------------------------
    Configura eventos
    --------------------------------------------------------
    */

    setupEvents();


    /*
    --------------------------------------------------------
    Conecta motor de narrativa
    --------------------------------------------------------
    */

    registerNarrativeCallbacks({

        onSceneStart: handleSceneStart,

        onChoice: handleChoice,

        onConsequence: handleConsequenceEvent,

        onLineUpdate: handleStateUpdate,

        onEnding: handleEnding

    });


    /*
    --------------------------------------------------------
    Atualiza interface inicial
    --------------------------------------------------------
    */

    updateProgress(gameState);


    /*
    --------------------------------------------------------
    Background inicial
    --------------------------------------------------------
    */

    setBackground(

        "menu",

        { force:true }

    );


    console.log(

        "⚽ Jogo pronto."

    );

}


/* ========================================================
   CACHE ELEMENTS
   ======================================================== */

function cacheElements(){

    startButton =

        document.querySelector(

            "#start-game"

        );


    restartButton =

        document.querySelector(

            "#restart-game"

        );


    continueButton =

        document.querySelector(

            "#continue-game"

        );


    settingsButton =

        document.querySelector(

            "#settings-button"

        );

}


/* ========================================================
   EVENTOS
   ======================================================== */

function setupEvents(){


    /* ----------------------------------------------------
       COMEÇAR JOGO
       ---------------------------------------------------- */

    if(startButton){

        startButton.addEventListener(

            "click",

            startGame

        );

    }


    /* ----------------------------------------------------
       REINICIAR
       ---------------------------------------------------- */

    if(restartButton){

        restartButton.addEventListener(

            "click",

            restartGame

        );

    }


    /* ----------------------------------------------------
       CONTINUAR
       ---------------------------------------------------- */

    if(continueButton){

        continueButton.addEventListener(

            "click",

            continueGame

        );

    }


    /* ----------------------------------------------------
       CONFIGURAÇÕES
       ---------------------------------------------------- */

    if(settingsButton){

        settingsButton.addEventListener(

            "click",

            openSettings

        );

    }

}


/* ========================================================
   COMEÇAR JOGO
   ======================================================== */

function startGame(){

    console.log(

        "🎬 Iniciando história..."

    );


    /*
    Esconde tela inicial
    */

    hideElement(

        "#start-screen"

    );


    /*
    Mostra jogo
    */

    showElement(

        "#game-screen"

    );


    /*
    Pequeno efeito de transição
    */

    document.body.classList.add(

        "game-started"

    );


    /*
    Começa primeira cena
    */

    setTimeout(() => {

        startScene(

            CONFIG.firstScene

        );

    }, 400);

}


/* ========================================================
   CONTINUAR JOGO
   ======================================================== */

function continueGame(){

    console.log(

        "▶ Continuando jogo..."

    );


    hideElement(

        "#start-screen"

    );


    showElement(

        "#game-screen"

    );


    /*
    O LocalStorage será integrado
    posteriormente.

    Por enquanto continuamos da cena
    armazenada no estado atual.
    */

    startScene(

        gameState.player.currentScene

    );

}


/* ========================================================
   REINICIAR JOGO
   ======================================================== */

function restartGame(){

    const confirmed =

        window.confirm(

            "Tem certeza que deseja reiniciar sua carreira?"

        );


    if(!confirmed){

        return;

    }


    /*
    O reset definitivo será integrado
    com o sistema de armazenamento.
    */

    window.location.reload();

}


/* ========================================================
   CENA INICIADA
   ======================================================== */

function handleSceneStart(

    scene,

    state

){

    console.log(

        `🎬 Cena iniciada: ${scene.id}`

    );


    /*
    Renderiza a cena
    */

    renderScene(

        scene

    );


    /*
    Atualiza progresso
    */

    updateProgress(

        state

    );

}


/* ========================================================
   ESCOLHA REALIZADA
   ======================================================== */

function handleChoice(

    answer,

    state

){

    console.log(

        "🎯 Escolha:",

        answer.text

    );


    /*
    Atualiza progresso
    */

    updateProgress(

        state

    );

}


/* ========================================================
   CONSEQUÊNCIA
   ======================================================== */

function handleConsequenceEvent(

    consequence,

    state

){

    handleConsequence(

        consequence,

        state,

        () => {

            /*
            Depois da consequência,
            continua para próxima cena.
            */

            if(

                typeof window.pendingNextScene ===

                "function"

            ){

                window.pendingNextScene();

                window.pendingNextScene = null;

            }

        }

    );


    /*
    Guarda temporariamente a próxima ação.
    */

    window.pendingNextScene = () => {

        /*
        A resposta atual é recuperada
        pelo sistema abaixo.
        */

    };

}


/* ========================================================
   ATUALIZAÇÃO DO ESTADO
   ======================================================== */

function handleStateUpdate(state){

    updateProgress(

        state

    );

}


/* ========================================================
   FINAL
   ======================================================== */

function handleEnding(

    ending,

    result,

    state

){

    console.log(

        "🏆 Final:",

        ending

    );


    console.log(

        "Resultado:",

        result

    );


    /*
    A tela de final será criada
    no endingRenderer.js.
    */

    window.dispatchEvent(

        new CustomEvent(

            "game:ending",

            {

                detail: {

                    ending,

                    result,

                    state

                }

            }

        )

    );

}


/* ========================================================
   ABRIR CONFIGURAÇÕES
   ======================================================== */

function openSettings(){

    window.dispatchEvent(

        new CustomEvent(

            "game:settings"

        )

    );

}


/* ========================================================
   MOSTRAR ELEMENTO
   ======================================================== */

function showElement(selector){

    const element =

        document.querySelector(

            selector

        );


    if(!element){

        return;

    }


    element.classList.remove(

        "hidden"

    );


    element.classList.add(

        "visible"

    );

}


/* ========================================================
   ESCONDER ELEMENTO
   ======================================================== */

function hideElement(selector){

    const element =

        document.querySelector(

            selector

        );


    if(!element){

        return;

    }


    element.classList.remove(

        "visible"

    );


    element.classList.add(

        "hidden"

    );

}