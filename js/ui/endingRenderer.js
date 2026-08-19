/* ========================================================
   ENDING RENDERER
   Responsável por exibir o final da carreira
   ======================================================== */


/* ========================================================
   DADOS VISUAIS DOS FINAIS
   ======================================================== */

const endingVisuals = {

    hero: {
        title: "Herói da Classificação",
        subtitle: "Você apareceu quando o time mais precisava.",
        background: "ending-hero",
        image: "assets/endings/hero.jpg"
    },

    best_player: {
        title: "Melhor Jogador da Partida",
        subtitle: "Uma atuação que entrou para a história.",
        background: "ending-best-player",
        image: "assets/endings/best-player.jpg"
    },

    bench_hero: {
        title: "O Reserva que Mudou o Jogo",
        subtitle: "Você começou no banco, mas terminou como protagonista.",
        background: "ending-bench-hero",
        image: "assets/endings/bench-hero.jpg"
    },

    instant_idol: {
        title: "Ídolo Instantâneo",
        subtitle: "A torcida encontrou um novo nome para cantar.",
        background: "ending-idol",
        image: "assets/endings/idol.jpg"
    },

    national_team: {
        title: "Convocado para a Seleção",
        subtitle: "Sua atuação abriu uma nova porta na carreira.",
        background: "ending-national",
        image: "assets/endings/national.jpg"
    },

    revelation: {
        title: "Revelação da Temporada",
        subtitle: "Seu primeiro grande momento virou o começo de algo maior.",
        background: "ending-revelation",
        image: "assets/endings/revelation.jpg"
    },

    coach_wants_you: {
        title: "O Técnico Quer Você",
        subtitle: "Sua personalidade conquistou a confiança do comandante.",
        background: "ending-coach",
        image: "assets/endings/coach.jpg"
    },

    sold: {
        title: "Transferência Surpresa",
        subtitle: "Seu desempenho chamou atenção de outro gigante europeu.",
        background: "ending-transfer",
        image: "assets/endings/transfer.jpg"
    },

    trusted_bench: {
        title: "Banco na Próxima Partida",
        subtitle: "Ainda há muito a provar para conquistar seu espaço.",
        background: "ending-bench",
        image: "assets/endings/bench.jpg"
    },

    fans_lost: {
        title: "A Torcida Perdeu a Confiança",
        subtitle: "Agora você terá que reconstruir sua relação com as arquibancadas.",
        background: "ending-fans",
        image: "assets/endings/fans.jpg"
    },

    villain: {
        title: "Vilão da Eliminação",
        subtitle: "Uma noite que você preferiria esquecer.",
        background: "ending-villain",
        image: "assets/endings/villain.jpg"
    },

    contract_terminated: {
        title: "Contrato Rescindido",
        subtitle: "Sua passagem pelo clube terminou antes do esperado.",
        background: "ending-terminated",
        image: "assets/endings/terminated.jpg"
    }

};


/* ========================================================
   ELEMENTOS
   ======================================================== */

let elements = {};


/* ========================================================
   INICIALIZAR
   ======================================================== */

export function initEndingRenderer(){

    elements = {

        screen:
            document.querySelector(
                "#ending-screen"
            ),

        image:
            document.querySelector(
                "#ending-image"
            ),

        category:
            document.querySelector(
                "#ending-category"
            ),

        title:
            document.querySelector(
                "#ending-title"
            ),

        subtitle:
            document.querySelector(
                "#ending-subtitle"
            ),

        description:
            document.querySelector(
                "#ending-description"
            ),

        stats:
            document.querySelector(
                "#ending-stats"
            ),

        decisions:
            document.querySelector(
                "#ending-decisions"
            ),

        path:
            document.querySelector(
                "#ending-path"
            ),

        result:
            document.querySelector(
                "#ending-result"
            ),

        restart:
            document.querySelector(
                "#ending-restart"
            ),

        menu:
            document.querySelector(
                "#ending-menu"
            )

    };


    setupEvents();

}


/* ========================================================
   EVENTOS
   ======================================================== */

function setupEvents(){

    if(elements.restart){

        elements.restart.addEventListener(

            "click",

            () => {

                window.dispatchEvent(

                    new CustomEvent(

                        "game:restart"

                    )

                );

            }

        );

    }


    if(elements.menu){

        elements.menu.addEventListener(

            "click",

            () => {

                window.dispatchEvent(

                    new CustomEvent(

                        "game:menu"

                    )

                );

            }

        );

    }

}


/* ========================================================
   MOSTRAR FINAL
   ======================================================== */

export function renderEnding(

    endingId,

    result,

    state

){

    const visual =

        endingVisuals[endingId]

        ||

        endingVisuals.villain;


    /*
    --------------------------------------------------------
    Imagem
    --------------------------------------------------------
    */

    if(elements.image){

        elements.image.src =

            visual.image;

        elements.image.alt =

            visual.title;

    }


    /*
    --------------------------------------------------------
    Categoria
    --------------------------------------------------------
    */

    if(elements.category){

        elements.category.textContent =

            getEndingCategory(

                endingId

            );

    }


    /*
    --------------------------------------------------------
    Título
    --------------------------------------------------------
    */

    if(elements.title){

        elements.title.textContent =

            visual.title;

    }


    /*
    --------------------------------------------------------
    Subtítulo
    --------------------------------------------------------
    */

    if(elements.subtitle){

        elements.subtitle.textContent =

            visual.subtitle;

    }


    /*
    --------------------------------------------------------
    Resultado
    --------------------------------------------------------
    */

    if(elements.result){

        elements.result.textContent =

            result === "win"

                ? "CLASSIFICAÇÃO"

                : "ELIMINAÇÃO";

    }


    /*
    --------------------------------------------------------
    Caminho
    --------------------------------------------------------
    */

    if(elements.path){

        elements.path.textContent =

            state.player.starter

                ? "Titular"

                : "Reserva";

    }


    /*
    --------------------------------------------------------
    Decisões
    --------------------------------------------------------
    */

    if(elements.decisions){

        elements.decisions.textContent =

            state.story.decisionCount;

    }


    /*
    --------------------------------------------------------
    Estatísticas
    --------------------------------------------------------
    */

    renderStats(

        state

    );


    /*
    --------------------------------------------------------
    Descrição
    --------------------------------------------------------
    */

    if(elements.description){

        elements.description.textContent =

            generateDescription(

                endingId,

                state

            );

    }


    /*
    --------------------------------------------------------
    Background
    --------------------------------------------------------
    */

    if(elements.screen){

        elements.screen.dataset.ending =

            visual.background;

    }


    /*
    --------------------------------------------------------
    Mostrar tela
    --------------------------------------------------------
    */

    showEndingScreen();

}


/* ========================================================
   ESTATÍSTICAS
   ======================================================== */

function renderStats(state){

    if(!elements.stats){

        return;

    }


    elements.stats.innerHTML = "";


    const stats = [

        {
            name: "Técnico",
            value: state.stats.coach
        },

        {
            name: "Companheiros",
            value: state.stats.teammates
        },

        {
            name: "Torcida",
            value: state.stats.fans
        },

        {
            name: "Profissionalismo",
            value: state.stats.professionalism
        },

        {
            name: "Confiança",
            value: state.stats.confidence
        }

    ];


    stats.forEach(stat => {

        const item =

            document.createElement(

                "div"

            );


        item.className =

            "ending-stat";


        const name =

            document.createElement(

                "span"

            );


        name.className =

            "ending-stat-name";


        name.textContent =

            stat.name;


        const value =

            document.createElement(

                "span"

            );


        value.className =

            "ending-stat-value";


        value.textContent =

            stat.value;


        item.appendChild(name);

        item.appendChild(value);


        elements.stats.appendChild(

            item

        );

    });

}


/* ========================================================
   DESCRIÇÃO DO FINAL
   ======================================================== */

function generateDescription(

    endingId,

    state

){

    const coach =

        state.stats.coach;


    const teammates =

        state.stats.teammates;


    const fans =

        state.stats.fans;


    const professionalism =

        state.stats.professionalism;


    const confidence =

        state.stats.confidence;


    const path =

        state.player.starter

            ? "titular"

            : "reserva";


    const descriptions = {

        hero:

            `Você começou a semifinal como ${path} e terminou como um dos nomes mais importantes da noite. Sua confiança, suas decisões e a maneira como lidou com a pressão fizeram a diferença no momento decisivo.`,

        best_player:

            `Sua atuação foi completa. Você ganhou a confiança do treinador, manteve a cabeça fria e aproveitou as oportunidades. No apito final, seu nome estava entre os primeiros da lista de melhores jogadores.`,

        bench_hero:

            `Começar no banco não impediu você de mudar a história. Quando recebeu a oportunidade, entrou concentrado e mostrou ao treinador que estava preparado.`,

        instant_idol:

            `Em apenas uma noite, a relação com a torcida mudou completamente. As arquibancadas encontraram em você um novo personagem para representar aquela campanha.`,

        national_team:

            `Sua atuação ultrapassou as fronteiras do clube. O desempenho chamou atenção e abriu caminho para uma convocação que pode mudar sua carreira.`,

        revelation:

            `Poucos esperavam tanto de você na primeira temporada. Suas escolhas mostraram maturidade e seu crescimento rapidamente virou assunto dentro do clube.`,

        coach_wants_you:

            `O treinador passou a confiar cada vez mais em você. Sua disciplina, postura e capacidade de tomar decisões sob pressão fizeram a diferença.`,

        sold:

            `Seu desempenho despertou interesse no mercado. O clube recebeu propostas e sua carreira tomou um rumo inesperado após a semifinal.`,

        trusted_bench:

            `Você ainda não conquistou a titularidade, mas ganhou respeito dentro do elenco. O próximo desafio será transformar essa confiança em espaço dentro de campo.`,

        fans_lost:

            `Algumas decisões pesaram na relação com as arquibancadas. A torcida agora espera uma resposta dentro de campo.`,

        villain:

            `A noite não saiu como planejado. Algumas decisões tomadas durante a semana e durante a partida acabaram influenciando diretamente o resultado.`,

        contract_terminated:

            `A passagem pelo clube terminou de maneira inesperada. Uma sequência de decisões ruins prejudicou sua relação com o treinador, o elenco e a diretoria.`

    };


    /*
    Pequenos complementos personalizados
    */

    let description =

        descriptions[endingId]

        ||

        descriptions.villain;


    if(coach >= 70){

        description +=

            " O treinador reconheceu sua evolução.";

    }


    if(teammates >= 70){

        description +=

            " Seus companheiros também terminaram a campanha ao seu lado.";

    }


    if(fans >= 70){

        description +=

            " A torcida respondeu positivamente à sua postura.";

    }


    if(professionalism >= 70){

        description +=

            " Seu profissionalismo foi um dos pontos mais elogiados.";

    }


    if(confidence >= 70){

        description +=

            " Você mostrou personalidade nos momentos de maior pressão.";

    }


    return description;

}


/* ========================================================
   CATEGORIA
   ======================================================== */

function getEndingCategory(endingId){

    const categories = {

        hero: "FINAL DE GLÓRIA",

        best_player: "DESTAQUE DA PARTIDA",

        bench_hero: "SUPERAÇÃO",

        instant_idol: "TORCIDA",

        national_team: "CARREIRA INTERNACIONAL",

        revelation: "REVELAÇÃO",

        coach_wants_you: "CONFIANÇA DO TREINADOR",

        sold: "MERCADO DA BOLA",

        trusted_bench: "EM BUSCA DE ESPAÇO",

        fans_lost: "CRISE COM A TORCIDA",

        villain: "NOITE PARA ESQUECER",

        contract_terminated: "FIM DA PASSAGEM"

    };


    return (

        categories[endingId]

        ||

        "FIM DA CARREIRA"

    );

}


/* ========================================================
   MOSTRAR TELA
   ======================================================== */

function showEndingScreen(){

    if(!elements.screen){

        return;

    }


    elements.screen.classList.remove(

        "hidden"

    );


    elements.screen.classList.add(

        "ending-visible"

    );


    document.body.classList.add(

        "game-ended"

    );

}


/* ========================================================
   ESCONDER TELA
   ======================================================== */

export function hideEndingScreen(){

    if(!elements.screen){

        return;

    }


    elements.screen.classList.remove(

        "ending-visible"

    );


    elements.screen.classList.add(

        "hidden"

    );


    document.body.classList.remove(

        "game-ended"

    );

}