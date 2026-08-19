/* =========================================================
   FOOTBALL CAREER
   DEBUG.JS
   Verificador da estrutura da história
   ========================================================= */


/* =========================================================
   EXECUTA O DEBUG
   ========================================================= */

function validateStory() {

    console.group(
        "⚽ FOOTBALL CAREER — STORY DEBUG"
    );


    /* -----------------------------------------
       Verifica se storyData existe
       ----------------------------------------- */

    if (
        typeof storyData === "undefined"
    ) {

        console.error(
            "❌ storyData.js não foi encontrado."
        );

        console.groupEnd();

        return false;

    }


    console.log(
        `📚 Cenas encontradas: ${storyData.length}`
    );


    let errors = 0;

    let warnings = 0;


    /* -----------------------------------------
       Cria lista de IDs
       ----------------------------------------- */

    const sceneIds =
        new Set(
            storyData.map(
                scene => scene.id
            )
        );


    /* -----------------------------------------
       Verifica IDs duplicados
       ----------------------------------------- */

    const duplicatedIds = [];

    const seenIds = new Set();


    storyData.forEach(
        scene => {

            if (
                seenIds.has(scene.id)
            ) {

                duplicatedIds.push(
                    scene.id
                );

            }

            seenIds.add(
                scene.id
            );

        }
    );


    if (
        duplicatedIds.length > 0
    ) {

        console.error(
            "❌ IDs duplicados:",
            duplicatedIds
        );

        errors++;

    }


    /* -----------------------------------------
       Verifica cada cena
       ----------------------------------------- */

    storyData.forEach(
        scene => {

            if (!scene.id) {

                console.error(
                    "❌ Cena sem ID:",
                    scene
                );

                errors++;

                return;

            }


            if (!scene.text) {

                console.warn(
                    `⚠️ Cena "${scene.id}" não possui texto.`
                );

                warnings++;

            }


            if (
                !scene.answers ||
                !Array.isArray(scene.answers)
            ) {

                console.warn(
                    `⚠️ Cena "${scene.id}" não possui answers.`
                );

                warnings++;

                return;

            }


            /* ---------------------------------
               Verifica escolhas
               --------------------------------- */

            scene.answers.forEach(
                (answer, index) => {

                    if (!answer.text) {

                        console.warn(
                            `⚠️ Escolha ${index + 1} da cena "${scene.id}" está sem texto.`
                        );

                        warnings++;

                    }


                    if (!answer.next) {

                        console.warn(
                            `⚠️ Escolha "${answer.text}" da cena "${scene.id}" não possui next.`
                        );

                        warnings++;

                        return;

                    }


                    /* -----------------------------
                       next como string
                       ----------------------------- */

                    if (
                        typeof answer.next ===
                        "string"
                    ) {

                        if (
                            !sceneIds.has(
                                answer.next
                            )
                        ) {

                            console.error(
                                `❌ Cena "${scene.id}" aponta para "${answer.next}", mas essa cena não existe.`
                            );

                            errors++;

                        }

                    }

                }
            );

        }
    );


    /* -----------------------------------------
       Verifica cena inicial
       ----------------------------------------- */

    if (
        !sceneIds.has("intro")
    ) {

        console.error(
            "❌ A cena inicial \"intro\" não existe."
        );

        errors++;

    }


    /* -----------------------------------------
       Resultado
       ----------------------------------------- */

    console.log("");
    console.log(
        "=============================="
    );


    if (errors === 0) {

        console.log(
            "✅ Nenhum erro estrutural encontrado!"
        );

    } else {

        console.error(
            `❌ ${errors} erro(s) encontrado(s).`
        );

    }


    if (warnings > 0) {

        console.warn(
            `⚠️ ${warnings} aviso(s) encontrado(s).`
        );

    }


    console.log(
        "=============================="
    );


    console.groupEnd();


    return errors === 0;

}


/* =========================================================
   LISTA TODAS AS CENAS
   ========================================================= */

function listScenes() {

    if (
        typeof storyData === "undefined"
    ) {

        console.error(
            "storyData.js não carregado."
        );

        return;

    }


    console.table(

        storyData.map(
            scene => ({

                ID:
                    scene.id,

                Capítulo:
                    scene.chapter,

                Título:
                    scene.title,

                Escolhas:
                    scene.answers
                        ? scene.answers.length
                        : 0

            })
        )

    );

}


/* =========================================================
   ENCONTRA UMA CENA
   ========================================================= */

function inspectScene(id) {

    if (
        typeof storyData === "undefined"
    ) {

        console.error(
            "storyData.js não carregado."
        );

        return;

    }


    const scene =
        storyData.find(
            item => item.id === id
        );


    if (!scene) {

        console.error(
            `❌ Cena "${id}" não encontrada.`
        );

        return;

    }


    console.log(
        "🎬 Cena:",
        scene
    );

}


/* =========================================================
   DISPONIBILIZA NO CONSOLE
   ========================================================= */

window.storyDebug = {

    validate:
        validateStory,

    list:
        listScenes,

    inspect:
        inspectScene

};