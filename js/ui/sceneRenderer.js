/* ========================================================
   SCENE RENDERER
   Responsável por desenhar as cenas na interface
   ======================================================== */


/* ========================================================
   IMPORTAÇÕES
   ======================================================== */

import {
    chooseAnswer
} from "../core/narrativeEngine.js";


import {
    gameState
} from "../core/state.js";


import {
    updateBackgroundFromScene
} from "./backgroundManager.js";


/* ========================================================
   CONFIGURAÇÕES
   ======================================================== */

const CONFIG = {

    typingSpeed: 18,

    consequenceDelay: 1200,

    autoAdvanceDelay: 900

};


/* ========================================================
   ELEMENTOS DA INTERFACE
   ======================================================== */

let elements = {};


/* ========================================================
   ESTADO DO RENDERIZADOR
   ======================================================== */

let typingTimer = null;

let currentAnswer = null;

let isTyping = false;

let selectedAnswer = false;


/* ========================================================
   INICIALIZAR
   ======================================================== */

export function initSceneRenderer(){

    elements = {

        sceneContainer:
            document.querySelector(
                "#scene-container"
            ),

        chapter:
            document.querySelector(
                "#scene-chapter"
            ),

        title:
            document.querySelector(
                "#scene-title"
            ),

        speaker:
            document.querySelector(
                "#scene-speaker"
            ),

        narrative:
            document.querySelector(
                "#scene-narrative"
            ),

        question:
            document.querySelector(
                "#scene-question"
            ),

        answers:
            document.querySelector(
                "#answers-container"
            ),

        consequence:
            document.querySelector(
                "#consequence"
            ),

        consequenceText:
            document.querySelector(
                "#consequence-text"
            ),

        progress:
            document.querySelector(
                "#progress-fill"
            ),

        progressText:
            document.querySelector(
                "#progress-text"
            ),

        decisionCounter:
            document.querySelector(
                "#decision-counter"
            )

    };

}


/* ========================================================
   VERIFICAR ELEMENTOS
   ======================================================== */

function validateElements(){

    const missing = [];


    Object.entries(elements).forEach(

        ([name, element]) => {

            if(!element){

                missing.push(name);

            }

        }

    );


    if(missing.length){

        console.warn(

            "Elementos ausentes:",

            missing

        );

    }

}


/* ========================================================
   RENDERIZAR CENA
   ======================================================== */

export function renderScene(scene){

    if(!scene){

        return;

    }


    validateElements();


    selectedAnswer = false;


    currentAnswer = null;


    /*
    --------------------------------------------------------
    Atualiza background
    --------------------------------------------------------
    */

    updateBackgroundFromScene(scene);


    /*
    --------------------------------------------------------
    Atualiza capítulo
    --------------------------------------------------------
    */

    if(elements.chapter){

        elements.chapter.textContent =

            formatChapter(scene.chapter);

    }


    /*
    --------------------------------------------------------
    Título
    --------------------------------------------------------
    */

    if(elements.title){

        elements.title.textContent =

            scene.title || "";

    }


    /*
    --------------------------------------------------------
    Personagem falando
    --------------------------------------------------------
    */

    if(elements.speaker){

        elements.speaker.textContent =

            scene.speaker || "Narrador";

    }


    /*
    --------------------------------------------------------
    Limpa consequência anterior
    --------------------------------------------------------
    */

    hideConsequence();


    /*
    --------------------------------------------------------
    Remove respostas antigas
    --------------------------------------------------------
    */

    clearAnswers();


    /*
    --------------------------------------------------------
    Animação do cartão
    --------------------------------------------------------
    */

    animateSceneIn();


    /*
    --------------------------------------------------------
    Texto narrativo
    --------------------------------------------------------
    */

    typeText(

        elements.narrative,

        resolveDynamicText(
            scene.text
        ),

        () => {

            renderQuestion(scene);

        }

    );

}


/* ========================================================
   TEXTO DINÂMICO
   ======================================================== */

function resolveDynamicText(text){

    if(typeof text === "function"){

        return text(gameState);

    }


    return text || "";

}


/* ========================================================
   RENDERIZAR PERGUNTA
   ======================================================== */

function renderQuestion(scene){

    if(!elements.question){

        return;

    }


    elements.question.classList.remove(

        "visible"

    );


    setTimeout(() => {

        elements.question.textContent =

            resolveDynamicText(
                scene.question
            );


        elements.question.classList.add(

            "visible"

        );


        renderAnswers(scene);

    }, 250);

}


/* ========================================================
   RENDERIZAR RESPOSTAS
   ======================================================== */

function renderAnswers(scene){

    if(!elements.answers){

        return;

    }


    clearAnswers();


    scene.answers.forEach(

        (answer, index) => {

            const button =

                createAnswerButton(

                    answer,

                    index

                );


            elements.answers.appendChild(

                button

            );


            setTimeout(() => {

                button.classList.add(

                    "answer-visible"

                );

            }, index * 100);

        }

    );

}


/* ========================================================
   CRIAR BOTÃO DE RESPOSTA
   ======================================================== */

function createAnswerButton(

    answer,

    index

){

    const button =

        document.createElement(
            "button"
        );


    button.className =

        "answer-button";


    button.type = "button";


    button.dataset.answerIndex =

        index;


    /*
    Número da alternativa
    */

    const number =

        document.createElement(
            "span"
        );


    number.className =

        "answer-number";


    number.textContent =

        String(index + 1).padStart(

            2,

            "0"

        );


    /*
    Texto
    */

    const text =

        document.createElement(
            "span"
        );


    text.className =

        "answer-text";


    text.textContent =

        resolveDynamicText(
            answer.text
        );


    /*
    Montagem
    */

    button.appendChild(number);

    button.appendChild(text);


    /*
    Evento
    */

    button.addEventListener(

        "click",

        () => {

            handleAnswerClick(

                answer,

                index

            );

        }

    );


    return button;

}


/* ========================================================
   ESCOLHER RESPOSTA
   ======================================================== */

function handleAnswerClick(

    answer,

    index

){

    if(selectedAnswer){

        return;

    }


    if(gameState.story.processingChoice){

        return;

    }


    selectedAnswer = true;


    currentAnswer = answer;


    /*
    Destaca resposta escolhida
    */

    highlightSelectedAnswer(index);


    /*
    Desativa outras respostas
    */

    disableAnswers();


    /*
    Processa escolha no motor
    */

    chooseAnswer(index);

}


/* ========================================================
   DESTACAR RESPOSTA
   ======================================================== */

function highlightSelectedAnswer(index){

    const buttons =

        elements.answers.querySelectorAll(

            ".answer-button"

        );


    buttons.forEach(

        (button, buttonIndex) => {

            if(buttonIndex === index){

                button.classList.add(

                    "answer-selected"

                );

            }

            else{

                button.classList.add(

                    "answer-disabled"

                );

            }

        }

    );

}


/* ========================================================
   DESATIVAR RESPOSTAS
   ======================================================== */

function disableAnswers(){

    const buttons =

        elements.answers.querySelectorAll(

            ".answer-button"

        );


    buttons.forEach(

        button => {

            button.disabled = true;

        }

    );

}


/* ========================================================
   MOSTRAR CONSEQUÊNCIA
   ======================================================== */

export function showConsequence(

    consequence,

    onComplete

){

    if(!elements.consequence){

        if(onComplete){

            onComplete();

        }

        return;

    }


    elements.consequenceText.textContent =

        consequence || "";


    elements.consequence.classList.add(

        "consequence-visible"

    );


    setTimeout(() => {

        if(onComplete){

            onComplete();

        }

    }, CONFIG.consequenceDelay);

}


/* ========================================================
   ESCONDER CONSEQUÊNCIA
   ======================================================== */

function hideConsequence(){

    if(!elements.consequence){

        return;

    }


    elements.consequence.classList.remove(

        "consequence-visible"

    );

}


/* ========================================================
   LIMPAR RESPOSTAS
   ======================================================== */

function clearAnswers(){

    if(!elements.answers){

        return;

    }


    elements.answers.innerHTML = "";

}


/* ========================================================
   EFEITO MÁQUINA DE ESCREVER
   ======================================================== */

function typeText(

    element,

    text,

    callback

){

    if(!element){

        return;

    }


    clearTimeout(typingTimer);


    isTyping = true;


    element.textContent = "";


    let index = 0;


    function write(){

        if(index >= text.length){

            isTyping = false;


            if(callback){

                callback();

            }


            return;

        }


        element.textContent +=

            text.charAt(index);


        index++;


        typingTimer = setTimeout(

            write,

            CONFIG.typingSpeed

        );

    }


    write();

}


/* ========================================================
   PULAR MÁQUINA DE ESCREVER
   ======================================================== */

export function skipTyping(){

    if(!isTyping){

        return false;

    }


    clearTimeout(typingTimer);


    isTyping = false;


    return true;

}


/* ========================================================
   ANIMAÇÃO DE ENTRADA
   ======================================================== */

function animateSceneIn(){

    if(!elements.sceneContainer){

        return;

    }


    elements.sceneContainer.classList.remove(

        "scene-enter"

    );


    /*
    Força o navegador a recalcular
    */

    void elements.sceneContainer.offsetWidth;


    elements.sceneContainer.classList.add(

        "scene-enter"

    );

}


/* ========================================================
   ATUALIZAR PROGRESSO
   ======================================================== */

export function updateProgress(state){

    const current =

        state.story.decisionCount;


    const total =

        state.story.totalDecisions;


    const percentage =

        Math.min(

            100,

            Math.round(

                (current / total) * 100

            )

        );


    if(elements.progress){

        elements.progress.style.width =

            `${percentage}%`;

    }


    if(elements.progressText){

        elements.progressText.textContent =

            `${percentage}%`;

    }


    if(elements.decisionCounter){

        elements.decisionCounter.textContent =

            `${current} / ${total}`;

    }

}


/* ========================================================
   FORMATAR NOME DO CAPÍTULO
   ======================================================== */

function formatChapter(chapter){

    const chapters = {

        intro:
            "ENTREVISTA",

        starter:
            "CAMINHO DO TITULAR",

        bench:
            "CAMINHO DO RESERVA"

    };


    return (

        chapters[chapter] ||

        chapter ||

        ""

    );

}


/* ========================================================
   CALLBACK DA CONSEQUÊNCIA
   ======================================================== */

export function handleConsequence(

    consequence,

    state,

    continueCallback

){

    showConsequence(

        consequence,

        continueCallback

    );


    updateProgress(state);

}