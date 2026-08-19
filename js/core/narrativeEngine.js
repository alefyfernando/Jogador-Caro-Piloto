/* ========================================================
   NARRATIVE ENGINE
   Motor principal da narrativa
   ======================================================== */


/* ========================================================
   IMPORTAÇÕES
   ======================================================== */

import {
    gameState,
    changeStat,
    setFlag,
    registerDecision,
    setCurrentScene,
    setChapter,
    setStarter,
    setMatchResult,
    finishGame
} from "./state.js";

import { storyData } from "../story/storyData.js";

import { calculateEnding } from "../story/endings.js";


/* ========================================================
   CALLBACKS
   ======================================================== */

let callbacks = {

    onSceneStart: null,

    onChoice: null,

    onConsequence: null,

    onLineUpdate: null,

    onEnding: null

};


/* ========================================================
   CONTROLE INTERNO
   ======================================================== */

let currentAnswer = null;

let isProcessing = false;


/* ========================================================
   REGISTRAR CALLBACKS
   ======================================================== */

export function registerNarrativeCallbacks(newCallbacks){

    callbacks = {

        ...callbacks,

        ...newCallbacks

    };

}


/* ========================================================
   ENCONTRAR CENA
   ======================================================== */

export function getScene(sceneId){

    const scene = storyData.find(

        scene => scene.id === sceneId

    );


    if(!scene){

        console.error(

            `Cena "${sceneId}" não encontrada.`

        );

        return null;

    }


    return scene;

}


/* ========================================================
   INICIAR CENA
   ======================================================== */

export function startScene(sceneId){

    const scene = getScene(sceneId);


    if(!scene){

        return;

    }


    /*
    Libera processamento
    */

    isProcessing = false;

    gameState.story.processingChoice = false;


    /*
    Salva cena
    */

    setCurrentScene(sceneId);


    /*
    Salva capítulo
    */

    if(scene.chapter){

        setChapter(scene.chapter);

    }


    /*
    Mostra cena
    */

    if(callbacks.onSceneStart){

        callbacks.onSceneStart(

            scene,

            gameState

        );

    }

}


/* ========================================================
   PROCESSAR RESPOSTA
   ======================================================== */

export function chooseAnswer(answerIndex){

    /*
    Impede múltiplos cliques
    */

    if(isProcessing){

        return;

    }


    const scene = getScene(

        gameState.player.currentScene

    );


    if(!scene){

        return;

    }


    /*
    Verifica resposta
    */

    if(

        !scene.answers ||

        !scene.answers[answerIndex]

    ){

        console.warn(

            "Resposta inválida:",

            answerIndex

        );

        return;

    }


    const answer =

        scene.answers[answerIndex];


    /*
    Inicia processamento
    */

    isProcessing = true;

    gameState.story.processingChoice = true;


    /*
    Guarda resposta
    */

    currentAnswer = answer;


    /* ====================================================
       APLICAR ATRIBUTOS
       ==================================================== */

    applyEffects(

        answer.effects

    );


    /* ====================================================
       APLICAR FLAGS
       ==================================================== */

    applyFlags(

        answer.flags

    );


    /* ====================================================
       REGISTRAR DECISÃO
       ==================================================== */

    registerDecision();


    /* ====================================================
       CALLBACK DA ESCOLHA
       ==================================================== */

    if(callbacks.onChoice){

        callbacks.onChoice(

            answer,

            gameState

        );

    }


    /* ====================================================
       CALLBACK DA CONSEQUÊNCIA
       ==================================================== */

    if(callbacks.onConsequence){

        callbacks.onConsequence(

            answer.consequence,

            gameState,

            () => {

                continueFromAnswer(answer);

            }

        );

    }

}


/* ========================================================
   APLICAR EFEITOS
   ======================================================== */

function applyEffects(effects){

    if(!effects){

        return;

    }


    Object.entries(effects).forEach(

        ([stat, amount]) => {

            changeStat(

                stat,

                amount

            );

        }

    );

}


/* ========================================================
   APLICAR FLAGS
   ======================================================== */

function applyFlags(flags){

    if(!flags){

        return;

    }


    flags.forEach(

        flag => {

            setFlag(

                flag,

                true

            );

        }

    );

}


/* ========================================================
   CONTINUAR
   ======================================================== */

export function continueFromAnswer(answer){

    /*
    Libera o motor
    */

    isProcessing = false;

    gameState.story.processingChoice = false;


    if(!answer){

        console.warn(

            "Nenhuma resposta para continuar."

        );

        return;

    }


    /*
    Verifica próxima ação
    */

    const next = answer.next;


    if(!next){

        console.warn(

            "A resposta não possui próxima cena."

        );

        return;

    }


    /* ====================================================
       DECISÃO DE TITULARIDADE
       ==================================================== */

    if(next === "STARTER_DECISION"){

        determineStarter();

        return;

    }


    /* ====================================================
       FINAL DA PARTIDA
       ==================================================== */

    if(next === "END_MATCH"){

        finishMatch();

        return;

    }


    /* ====================================================
       PRÓXIMA CENA
       ==================================================== */

    startScene(next);

}


/* ========================================================
   DETERMINAR TITULAR
   ======================================================== */

export function determineStarter(){

    const coach =

        gameState.stats.coach;


    const professionalism =

        gameState.stats.professionalism;


    const confidence =

        gameState.stats.confidence;


    /*
    Peso dos atributos
    */

    const finalScore =

        (coach * 0.5) +

        (professionalism * 0.3) +

        (confidence * 0.2);


    /*
    Limite para titularidade
    */

    const starter =

        finalScore >= 60;


    setStarter(starter);


    /*
    Pequena pausa dramática
    */

    setTimeout(() => {

        if(starter){

            startScene(

                "starter_01"

            );

        }

        else{

            startScene(

                "bench_01"

            );

        }

    }, 1200);

}


/* ========================================================
   FINALIZAR PARTIDA
   ======================================================== */

export function finishMatch(){

    const stats = gameState.stats;

    const flags = gameState.flags;


    /*
    Soma geral de desempenho
    */

    const performanceScore =

        stats.coach +

        stats.teammates +

        stats.fans +

        stats.professionalism +

        stats.confidence;


    let result = "loss";


    /* ====================================================
       DERROTA MUITO NEGATIVA
       ==================================================== */

    if(

        stats.professionalism <= 15 ||

        stats.teammates <= 10 ||

        stats.coach <= 10

    ){

        result = "loss";

    }


    /* ====================================================
       GRANDE ATUAÇÃO
       ==================================================== */

    else if(

        flags.scoredGoal ||

        flags.penaltyHero ||

        flags.shootoutHero ||

        performanceScore >= 380

    ){

        result = "win";

    }


    /* ====================================================
       BOA CAMPANHA
       ==================================================== */

    else if(

        performanceScore >= 300

    ){

        result = "win";

    }


    /*
    Resultado
    */

    setMatchResult(result);


    /*
    Calcula final
    */

    const ending = calculateEnding();


    /*
    Salva final
    */

    finishGame(ending);


    /*
    Interface
    */

    if(callbacks.onEnding){

        callbacks.onEnding(

            ending,

            result,

            gameState

        );

    }

}


/* ========================================================
   PROGRESSO
   ======================================================== */

export function getProgress(){

    const current =

        gameState.story.decisionCount;


    const total =

        gameState.story.totalDecisions;


    const percentage =

        Math.min(

            100,

            Math.round(

                (current / total) * 100

            )

        );


    return {

        current,

        total,

        percentage

    };

}


/* ========================================================
   CAMINHO
   ======================================================== */

export function getPlayerPath(){

    if(gameState.player.starter === true){

        return "starter";

    }


    if(gameState.player.starter === false){

        return "bench";

    }


    return "unknown";

}


/* ========================================================
   VERIFICAR FLAG
   ======================================================== */

export function hasFlag(flag){

    return Boolean(

        gameState.flags[flag]

    );

}


/* ========================================================
   PEGAR ATRIBUTO
   ======================================================== */

export function getStat(stat){

    return gameState.stats[stat] ?? 0;

}


/* ========================================================
   PEGAR ESTADO
   ======================================================== */

export function getNarrativeState(){

    return gameState;

}