/* ========================================================
   SAVE MANAGER
   Sistema de salvamento automático utilizando LocalStorage

   Responsabilidades:
   - Salvar o estado do jogo
   - Carregar uma carreira salva
   - Verificar se existe salvamento
   - Apagar salvamento
   - Criar backup
   ======================================================== */


/* ========================================================
   IMPORTAÇÕES
   ======================================================== */

import {

    gameState,

    getDefaultGameState

} from "./state.js";


/* ========================================================
   CONFIGURAÇÕES
   ======================================================== */

const SAVE_KEY =

    "voce_decide_sua_carreira_save";


const SAVE_VERSION =

    1;


/* ========================================================
   SALVAR JOGO
   ======================================================== */

export function saveGame(){

    try{

        const saveData = {

            version: SAVE_VERSION,

            timestamp: Date.now(),

            state: structuredClone(

                gameState

            )

        };


        localStorage.setItem(

            SAVE_KEY,

            JSON.stringify(

                saveData

            )

        );


        console.log(

            "💾 Jogo salvo."

        );


        return true;

    }

    catch(error){

        console.error(

            "Erro ao salvar jogo:",

            error

        );


        return false;

    }

}


/* ========================================================
   CARREGAR JOGO
   ======================================================== */

export function loadGame(){

    try{

        const savedData =

            localStorage.getItem(

                SAVE_KEY

            );


        if(!savedData){

            return null;

        }


        const parsedData =

            JSON.parse(

                savedData

            );


        /*
        Verifica versão
        */

        if(

            parsedData.version !==

            SAVE_VERSION

        ){

            console.warn(

                "Versão do salvamento incompatível."

            );


            return null;

        }


        return parsedData.state;

    }

    catch(error){

        console.error(

            "Erro ao carregar jogo:",

            error

        );


        return null;

    }

}


/* ========================================================
   VERIFICAR SE EXISTE SAVE
   ======================================================== */

export function hasSave(){

    return (

        localStorage.getItem(

            SAVE_KEY

        ) !== null

    );

}


/* ========================================================
   APAGAR SAVE
   ======================================================== */

export function deleteSave(){

    try{

        localStorage.removeItem(

            SAVE_KEY

        );


        console.log(

            "🗑️ Salvamento apagado."

        );


        return true;

    }

    catch(error){

        console.error(

            "Erro ao apagar salvamento:",

            error

        );


        return false;

    }

}


/* ========================================================
   DATA DO SAVE
   ======================================================== */

export function getSaveInfo(){

    try{

        const savedData =

            localStorage.getItem(

                SAVE_KEY

            );


        if(!savedData){

            return null;

        }


        const parsedData =

            JSON.parse(

                savedData

            );


        return {

            timestamp:

                parsedData.timestamp,

            date:

                new Date(

                    parsedData.timestamp

                ),

            scene:

                parsedData.state
                    ?.player
                    ?.currentScene ?? null,

            decisions:

                parsedData.state
                    ?.story
                    ?.decisionCount ?? 0

        };

    }

    catch(error){

        console.error(

            "Erro ao obter informações do save:",

            error

        );


        return null;

    }

}


/* ========================================================
   SALVAMENTO AUTOMÁTICO
   ======================================================== */

export function enableAutoSave(){

    /*
    Salva sempre que o estado da página
    estiver prestes a ser encerrado.
    */

    window.addEventListener(

        "beforeunload",

        () => {

            saveGame();

        }

    );


    /*
    Também salva periodicamente.

    30 segundos.
    */

    setInterval(

        () => {

            saveGame();

        },

        30000

    );

}


/* ========================================================
   RESTAURAR ESTADO
   ======================================================== */

export function restoreGameState(){

    const savedState =

        loadGame();


    if(!savedState){

        return false;

    }


    /*
    Não substituímos a referência original
    de gameState.

    Em vez disso, copiamos os dados.
    */

    Object.assign(

        gameState,

        savedState

    );


    /*
    Garante que estruturas novas
    adicionadas posteriormente existam.
    */

    mergeMissingProperties();


    console.log(

        "▶ Carreira restaurada."

    );


    return true;

}


/* ========================================================
   GARANTIR PROPRIEDADES
   ======================================================== */

function mergeMissingProperties(){

    const defaultState =

        getDefaultGameState();


    /*
    Player
    */

    gameState.player = {

        ...defaultState.player,

        ...gameState.player

    };


    /*
    Stats
    */

    gameState.stats = {

        ...defaultState.stats,

        ...gameState.stats

    };


    /*
    Flags
    */

    gameState.flags = {

        ...defaultState.flags,

        ...gameState.flags

    };


    /*
    Match
    */

    gameState.match = {

        ...defaultState.match,

        ...gameState.match

    };


    /*
    Story
    */

    gameState.story = {

        ...defaultState.story,

        ...gameState.story

    };


    /*
    Settings
    */

    gameState.settings = {

        ...defaultState.settings,

        ...gameState.settings

    };

}


/* ========================================================
   EXPORTAR CHAVE
   ======================================================== */

export function getSaveKey(){

    return SAVE_KEY;

}