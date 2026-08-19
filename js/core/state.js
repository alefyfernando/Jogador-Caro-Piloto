/* ========================================================
   STATE.JS
   Estado central do jogo
   ======================================================== */


/* ========================================================
   ESTADO PADRÃO
   ======================================================== */

const defaultGameState = {

    /* ----------------------------------------------------
       Informações do jogador
       ---------------------------------------------------- */

    player: {

        name: "Jogador",

        starter: null,

        currentChapter: "intro",

        currentScene: "intro_01"

    },


    /* ----------------------------------------------------
       Atributos do jogador
       ---------------------------------------------------- */

    stats: {

        coach: 50,

        teammates: 50,

        fans: 50,

        professionalism: 50,

        confidence: 50

    },


    /* ----------------------------------------------------
       Flags narrativas
       ---------------------------------------------------- */

    flags: {

        /* Personalidade */

        arrogant: false,

        humble: false,

        confident: false,

        determined: false,


        /* Relacionamentos */

        captainSupport: false,

        crowdFavorite: false,

        leader: false,


        /* Partida */

        yellowCard: false,

        injured: false,

        penaltyHero: false,

        penaltyMiss: false,

        shootoutTaker: false,

        shootoutHero: false,


        /* Caminho titular */

        freeKickTaker: false,

        disobeyedCoach: false,


        /* Caminho reserva */

        professionalBench: false,

        talkedToCoach: false,

        talkedToAssistant: false,

        supportive: false,

        studiedOpponent: false,

        studiedWeather: false,

        readyToEnter: false,

        enteredMatch: false,

        lateSubstitution: false,

        changedGame: false,

        scoredGoal: false,

        assistedGoal: false,


        /* Conflitos */

        fought: false

    },


    /* ----------------------------------------------------
       Controle da partida
       ---------------------------------------------------- */

    match: {

        scorePlayer: 0,

        scoreOpponent: 0,

        extraTime: false,

        penalties: false,

        result: null

    },


    /* ----------------------------------------------------
       Controle da narrativa
       ---------------------------------------------------- */

    story: {

        decisionCount: 0,

        totalDecisions: 43,

        currentQuestion: 0,

        completed: false,

        ending: null

    },


    /* ----------------------------------------------------
       Sistema
       ---------------------------------------------------- */

    settings: {

        sound: true,

        autoAdvance: true

    }

};


/* ========================================================
   ESTADO ATUAL
   ======================================================== */

export let gameState = structuredClone(defaultGameState);


/* ========================================================
   RESETAR ESTADO
   ======================================================== */

export function resetGameState(){

    gameState = structuredClone(defaultGameState);

}


/* ========================================================
   ATUALIZAR ESTADO
   ======================================================== */

export function updateGameState(updates){

    gameState = {

        ...gameState,

        ...updates

    };

}


/* ========================================================
   ALTERAR ATRIBUTO
   ======================================================== */

export function changeStat(stat, amount){

    if(!(stat in gameState.stats)){

        console.warn(
            `Atributo "${stat}" não existe.`
        );

        return;

    }


    gameState.stats[stat] += amount;


    /*
    Impede valores menores que 0
    */

    if(gameState.stats[stat] < 0){

        gameState.stats[stat] = 0;

    }


    /*
    Impede valores maiores que 100
    */

    if(gameState.stats[stat] > 100){

        gameState.stats[stat] = 100;

    }

}


/* ========================================================
   ATIVAR FLAG
   ======================================================== */

export function setFlag(flag, value = true){

    if(!(flag in gameState.flags)){

        console.warn(
            `Flag "${flag}" não existe.`
        );

        return;

    }


    gameState.flags[flag] = value;

}


/* ========================================================
   REGISTRAR DECISÃO
   ======================================================== */

export function registerDecision(){

    gameState.story.decisionCount++;

    gameState.story.currentQuestion++;

}


/* ========================================================
   DEFINIR CENA ATUAL
   ======================================================== */

export function setCurrentScene(sceneId){

    gameState.player.currentScene = sceneId;

}


/* ========================================================
   DEFINIR CAPÍTULO
   ======================================================== */

export function setChapter(chapter){

    gameState.player.currentChapter = chapter;

}


/* ========================================================
   DEFINIR SE É TITULAR
   ======================================================== */

export function setStarter(value){

    gameState.player.starter = value;

}


/* ========================================================
   DEFINIR RESULTADO
   ======================================================== */

export function setMatchResult(result){

    gameState.match.result = result;

}


/* ========================================================
   FINALIZAR JOGO
   ======================================================== */

export function finishGame(ending){

    gameState.story.completed = true;

    gameState.story.ending = ending;

}


/* ========================================================
   EXPORTAR ESTADO
   ======================================================== */

export function getGameState(){

    return gameState;

}


/* ========================================================
   EXPORTAR ESTADO PADRÃO
   ======================================================== */

export function getDefaultGameState(){

    return structuredClone(defaultGameState);

}