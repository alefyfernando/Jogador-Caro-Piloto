/*
=========================================
ATTRIBUTES.JS
Sistema de atributos
=========================================
*/

import { gameState } from "../js/core/state.js";

export class AttributeSystem {

    constructor() {

        this.maxValue = 100;

        this.minValue = 0;

    }

    /*
    =========================================
    Adiciona pontos
    =========================================
    */

    add(attribute, value) {

        if (!(attribute in gameState.stats)) {

            console.warn(`Atributo "${attribute}" não existe.`);

            return;

        }

        gameState.stats[attribute] += value;

        this.clamp(attribute);

        this.updateUI();

    }

    /*
    =========================================
    Remove pontos
    =========================================
    */

    remove(attribute, value) {

        this.add(attribute, -value);

    }

    /*
    =========================================
    Define valor
    =========================================
    */

    set(attribute, value) {

        if (!(attribute in gameState.stats)) return;

        gameState.stats[attribute] = value;

        this.clamp(attribute);

        this.updateUI();

    }

    /*
    =========================================
    Retorna valor
    =========================================
    */

    get(attribute) {

        return gameState.stats[attribute];

    }

    /*
    =========================================
    Limites
    =========================================
    */

    clamp(attribute) {

        gameState.stats[attribute] = Math.max(

            this.minValue,

            Math.min(

                this.maxValue,

                gameState.stats[attribute]

            )

        );

    }

    /*
    =========================================
    Atualiza HUD
    =========================================
    */

    updateUI() {

        Object.keys(gameState.stats).forEach(stat => {

            const bar = document.querySelector(

                `[data-stat="${stat}"] .stat-fill`

            );

            const value = document.querySelector(

                `[data-stat="${stat}"] .stat-value`

            );

            if (bar) {

                bar.style.width =

                    gameState.stats[stat] + "%";

            }

            if (value) {

                value.textContent =

                    gameState.stats[stat] + "%";

            }

        });

    }

    /*
    =========================================
    Reinicia atributos
    =========================================
    */

    reset() {

        Object.keys(gameState.stats).forEach(stat => {

            gameState.stats[stat] = 50;

        });

        this.updateUI();

    }

}

export const attributes = new AttributeSystem();