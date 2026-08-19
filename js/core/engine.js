/*
=========================================
ENGINE.JS
Motor da Narrativa
=========================================
*/

import { gameState } from "./state.js";

export class Engine {

    constructor() {

        this.story = [];

        this.currentScene = null;

    }

    /*
    =========================================
    Recebe a história
    =========================================
    */

    loadStory(storyData) {

        this.story = storyData;

    }

    /*
    =========================================
    Inicia
    =========================================
    */

    start() {

        gameState.story.scene = 0;

        this.loadScene(0);

    }

    /*
    =========================================
    Carrega uma cena
    =========================================
    */

    loadScene(index) {

        this.currentScene = this.story[index];

        if (!this.currentScene) {

            console.warn("Fim da história.");

            return;

        }

        gameState.story.scene = index;

        this.render();

    }

    /*
    =========================================
    Renderiza a cena
    =========================================
    */

    render() {

        const storyText = document.getElementById("storyText");

        const questionText = document.getElementById("questionText");

        const answers = document.getElementById("answersContainer");

        storyText.textContent = this.currentScene.text;

        questionText.textContent = this.currentScene.question;

        answers.innerHTML = "";

        this.currentScene.answers.forEach((answer, index) => {

            const button = document.createElement("button");

            button.className = "answerButton";

            button.innerHTML = `

                <strong>${String.fromCharCode(65 + index)}.</strong>

                ${answer.text}

            `;

            button.addEventListener("click", () => {

                this.chooseAnswer(answer);

            });

            answers.appendChild(button);

        });

        this.updateProgress();

    }

    /*
    =========================================
    Escolha
    =========================================
    */

    chooseAnswer(answer) {

        gameState.story.decisions++;

        this.applyEffects(answer.effects);

        this.showConsequence(answer.consequence);

        setTimeout(() => {

            this.nextScene(answer.next);

        }, 1700);

    }

    /*
    =========================================
    Aplica atributos
    =========================================
    */

    applyEffects(effects) {

        if (!effects) return;

        Object.keys(effects).forEach(key => {

            if (gameState.stats[key] !== undefined) {

                gameState.stats[key] += effects[key];

            }

        });

    }

    /*
    =========================================
    Consequência
    =========================================
    */

    showConsequence(text) {

        const box = document.createElement("div");

        box.className = "answerResult";

        box.textContent = text;

        document
            .getElementById("answersContainer")
            .appendChild(box);

    }

    /*
    =========================================
    Próxima cena
    =========================================
    */

    nextScene(next) {

        if (typeof next === "number") {

            this.loadScene(next);

            return;

        }

        this.loadScene(gameState.story.scene + 1);

    }

    /*
    =========================================
    Barra de progresso
    =========================================
    */

    updateProgress() {

        const progress = document.getElementById("progressFill");

        if (!progress) return;

        const value =

            ((gameState.story.scene + 1)

                / this.story.length)

            * 100;

        progress.style.width = value + "%";

    }

    /*
=========================================
Procura cena pelo ID
=========================================
*/

findScene(id){

    return this.story.findIndex(scene => scene.id === id);

}

/*
=========================================
Vai para um ID
=========================================
*/

goTo(id){

    const index = this.findScene(id);

    if(index === -1){

        console.warn("Cena não encontrada:", id);

        return;

    }

    this.loadScene(index);

}

/*
=========================================
Decide quem será titular
=========================================
*/

checkStarter(){

    if(gameState.stats.coach >= 65){

        gameState.player.starter = true;

        this.goTo("starter_01");

    }

    else{

        gameState.player.starter = false;

        this.goTo("bench_01");

    }

}

/*
=========================================
Interpreta o próximo passo
=========================================
*/

resolveNext(next){

    if(typeof next === "number"){

        this.loadScene(next);

        return;

    }

    if(typeof next === "string"){

        switch(next){

            case "CHECK_STARTER":

                this.checkStarter();

                return;

            default:

                this.goTo(next);

                return;

        }

    }

    this.loadScene(

        gameState.story.scene + 1

    );

}
}

/*
=========================================
Instância única
=========================================
*/

export const engine = new Engine();