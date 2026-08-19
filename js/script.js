class Game{

    constructor(){

        this.initialize();

    }

    initialize(){

        this.bindEvents();

        console.log("Game iniciado.");

    }

    bindEvents(){

        const startButton =
        document.getElementById("startButton");

        startButton.addEventListener(

            "click",

            ()=>{

                this.startGame();

            }

        );

    }

    startGame(){

        alert("Na próxima etapa começará a narrativa.");

    }

}

window.onload=()=>{

    new Game();

};