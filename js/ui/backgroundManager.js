/* ========================================================
   BACKGROUND MANAGER
   Gerenciador de fundos das cenas
   ======================================================== */


/* ========================================================
   CONFIGURAÇÃO DOS BACKGROUNDS
   ======================================================== */

const backgrounds = {

    /* ----------------------------------------------------
       MENU
       ---------------------------------------------------- */

    menu: {
        image: "assets/backgrounds/menu.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       ENTREVISTA
       ---------------------------------------------------- */

    press_room: {
        image: "assets/backgrounds/press-room.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       ESTÁDIO
       ---------------------------------------------------- */

    stadium: {
        image: "assets/backgrounds/stadium.jpg",
        position: "center center"
    },


    stadium_night: {
        image: "assets/backgrounds/stadium-night.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       TÚNEL
       ---------------------------------------------------- */

    tunnel: {
        image: "assets/backgrounds/tunnel.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       BANCO
       ---------------------------------------------------- */

    bench: {
        image: "assets/backgrounds/bench.jpg",
        position: "center center"
    },


    bench_rain: {
        image: "assets/backgrounds/bench-rain.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       JOGO
       ---------------------------------------------------- */

    match: {
        image: "assets/backgrounds/match.jpg",
        position: "center center"
    },


    match_rain: {
        image: "assets/backgrounds/match-rain.jpg",
        position: "center center"
    },


    match_attack: {
        image: "assets/backgrounds/match-attack.jpg",
        position: "center center"
    },


    match_entry: {
        image: "assets/backgrounds/match-entry.jpg",
        position: "center center"
    },


    match_late: {
        image: "assets/backgrounds/match-late.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       PÊNALTI
       ---------------------------------------------------- */

    penalty: {
        image: "assets/backgrounds/penalty.jpg",
        position: "center center"
    },


    penalty_shootout: {
        image: "assets/backgrounds/penalty-shootout.jpg",
        position: "center center"
    },


    /* ----------------------------------------------------
       PRORROGAÇÃO
       ---------------------------------------------------- */

    extra_time: {
        image: "assets/backgrounds/extra-time.jpg",
        position: "center center"
    }

};


/* ========================================================
   BACKGROUND ATUAL
   ======================================================== */

let currentBackground = null;


/* ========================================================
   ELEMENTOS DO DOM
   ======================================================== */

let backgroundElement = null;

let overlayElement = null;


/* ========================================================
   INICIALIZAR
   ======================================================== */

export function initBackgroundManager(){

    backgroundElement =

        document.querySelector(
            "#dynamic-background"
        );


    overlayElement =

        document.querySelector(
            "#background-overlay"
        );


    if(!backgroundElement){

        console.warn(
            "Elemento #dynamic-background não encontrado."
        );

    }

}


/* ========================================================
   PEGAR BACKGROUND
   ======================================================== */

export function getBackground(backgroundId){

    return backgrounds[backgroundId] || backgrounds.stadium;

}


/* ========================================================
   TROCAR BACKGROUND
   ======================================================== */

export function setBackground(

    backgroundId,

    options = {}

){

    if(!backgroundElement){

        initBackgroundManager();

    }


    const background =

        getBackground(backgroundId);


    /*
    Evita recarregar a mesma imagem
    */

    if(

        currentBackground === backgroundId &&

        !options.force

    ){

        return;

    }


    currentBackground = backgroundId;


    /*
    --------------------------------------------------------
    Prepara animação
    --------------------------------------------------------
    */

    backgroundElement.classList.remove(

        "background-visible"

    );


    backgroundElement.classList.add(

        "background-changing"

    );


    /*
    Pequeno atraso para a transição
    */

    setTimeout(() => {

        backgroundElement.style.backgroundImage =

            `url("${background.image}")`;


        backgroundElement.style.backgroundPosition =

            background.position;


        backgroundElement.classList.remove(

            "background-changing"

        );


        backgroundElement.classList.add(

            "background-visible"

        );

    }, 150);


    /*
    --------------------------------------------------------
    Atualiza overlay
    --------------------------------------------------------
    */

    if(overlayElement){

        overlayElement.dataset.scene =

            backgroundId;

    }

}


/* ========================================================
   PRÉ-CARREGAR IMAGENS
   ======================================================== */

export function preloadBackgrounds(){

    Object.values(backgrounds).forEach(

        background => {

            const image = new Image();

            image.src = background.image;

        }

    );

}


/* ========================================================
   TROCAR BACKGROUND COM BASE NA CENA
   ======================================================== */

export function updateBackgroundFromScene(scene){

    if(!scene){

        return;

    }


    if(!scene.background){

        setBackground("stadium");

        return;

    }


    setBackground(

        scene.background

    );

}


/* ========================================================
   EFEITO ESPECIAL DE FLASH
   ======================================================== */

export function flashBackground(){

    if(!backgroundElement){

        return;

    }


    backgroundElement.classList.add(

        "background-flash"

    );


    setTimeout(() => {

        backgroundElement.classList.remove(

            "background-flash"

        );

    }, 350);

}


/* ========================================================
   EFEITO DE ESCURECIMENTO
   ======================================================== */

export function darkenBackground(){

    if(!overlayElement){

        return;

    }


    overlayElement.classList.add(

        "overlay-dark"

    );

}


/* ========================================================
   REMOVER ESCURECIMENTO
   ======================================================== */

export function lightenBackground(){

    if(!overlayElement){

        return;

    }


    overlayElement.classList.remove(

        "overlay-dark"

    );

}


/* ========================================================
   RETORNAR BACKGROUND ATUAL
   ======================================================== */

export function getCurrentBackground(){

    return currentBackground;

}