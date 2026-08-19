/*
=========================================
ENDINGS.JS
Sistema de finais
=========================================
*/

import { gameState } from "../core/state.js";


/*
=========================================
Calcula o final do jogador
=========================================
*/

export function calculateEnding(){

    const stats = gameState.stats;
    const flags = gameState.flags;

    /*
    -------------------------------------
    FINAL 1
    Herói da classificação
    -------------------------------------
    */

    if(

        flags.penaltyHero &&

        stats.confidence >= 70 &&

        stats.fans >= 65

    ){

        return "hero";

    }


    /*
    -------------------------------------
    FINAL 2
    Ídolo instantâneo
    -------------------------------------
    */

    if(

        stats.fans >= 80 &&

        stats.teammates >= 60

    ){

        return "idol";

    }


    /*
    -------------------------------------
    FINAL 3
    Melhor jogador da partida
    -------------------------------------
    */

    if(

        stats.confidence >= 80 &&

        stats.professionalism >= 65 &&

        stats.coach >= 65

    ){

        return "man_of_match";

    }


    /*
    -------------------------------------
    FINAL 4
    Líder do elenco
    -------------------------------------
    */

    if(

        flags.leader &&

        stats.teammates >= 75

    ){

        return "leader";

    }


    /*
    -------------------------------------
    FINAL 5
    Favorito da torcida
    -------------------------------------
    */

    if(

        flags.crowdFavorite &&

        stats.fans >= 70

    ){

        return "crowd_favorite";

    }


    /*
    -------------------------------------
    FINAL 6
    Confiança total do treinador
    -------------------------------------
    */

    if(

        stats.coach >= 85 &&

        stats.professionalism >= 70

    ){

        return "coach_trust";

    }


    /*
    -------------------------------------
    FINAL 7
    Reserva que mudou o jogo
    -------------------------------------
    */

    if(

        gameState.player.starter === false &&

        stats.confidence >= 70

    ){

        return "super_sub";

    }


    /*
    -------------------------------------
    FINAL 8
    Problemas com o elenco
    -------------------------------------
    */

    if(

        stats.teammates <= 25

    ){

        return "locker_room_problem";

    }


    /*
    -------------------------------------
    FINAL 9
    Torcida perde a confiança
    -------------------------------------
    */

    if(

        stats.fans <= 25

    ){

        return "fans_lost";

    }


    /*
    -------------------------------------
    FINAL 10
    Problemas disciplinares
    -------------------------------------
    */

    if(

        stats.professionalism <= 25

    ){

        return "disciplinary";

    }


    /*
    -------------------------------------
    FINAL 11
    Talento desperdiçado
    -------------------------------------
    */

    if(

        stats.confidence <= 30

    ){

        return "wasted_potential";

    }


    /*
    -------------------------------------
    FINAL 12
    Começo promissor
    -------------------------------------
    */

    return "promising_start";

}


/*
=========================================
Dados dos finais
=========================================
*/

export const endings = {

    hero:{

        title:"HERÓI DA CLASSIFICAÇÃO",

        image:"hero",

        text:

        "Sua primeira grande noite europeia termina de forma inesquecível. Você assume a responsabilidade quando o time mais precisava e deixa seu nome marcado na semifinal.",

        color:"gold"

    },


    idol:{

        title:"ÍDOLO INSTANTÂNEO",

        image:"idol",

        text:

        "Em poucos dias você conquistou algo que muitos jogadores levam anos para conseguir: a confiança da torcida.",

        color:"blue"

    },


    man_of_match:{

        title:"MELHOR EM CAMPO",

        image:"mvp",

        text:

        "Sua atuação foi completa. Técnica, concentração e personalidade fizeram de você um dos grandes nomes da partida.",

        color:"gold"

    },


    leader:{

        title:"LÍDER DO ELENCO",

        image:"leader",

        text:

        "Mesmo sendo recém-chegado, você conquistou o respeito do vestiário. Seus companheiros passaram a enxergá-lo como uma referência.",

        color:"blue"

    },


    crowd_favorite:{

        title:"QUERIDINHO DA TORCIDA",

        image:"fans",

        text:

        "A torcida encontrou um novo jogador para cantar. Seu nome ecoa pelo estádio após a partida.",

        color:"blue"

    },


    coach_trust:{

        title:"CONFIANÇA TOTAL DO TREINADOR",

        image:"coach",

        text:

        "O treinador percebeu que pode confiar em você nos momentos decisivos. Sua posição dentro do elenco mudou completamente.",

        color:"green"

    },


    super_sub:{

        title:"O RESERVA QUE MUDOU O JOGO",

        image:"super_sub",

        text:

        "Você começou no banco, mas aproveitou sua oportunidade. Quando entrou, mudou completamente o ritmo da partida.",

        color:"gold"

    },


    locker_room_problem:{

        title:"PROBLEMAS NO VESTIÁRIO",

        image:"locker",

        text:

        "Seu talento é reconhecido, mas seus conflitos com os companheiros começaram a criar problemas dentro do elenco.",

        color:"red"

    },


    fans_lost:{

        title:"A TORCIDA PERDEU A CONFIANÇA",

        image:"fans_angry",

        text:

        "As escolhas feitas durante a semana fizeram a torcida se afastar. Agora você terá que reconquistar o apoio das arquibancadas.",

        color:"red"

    },


    disciplinary:{

        title:"PROBLEMAS DISCIPLINARES",

        image:"disciplinary",

        text:

        "Seu comportamento começou a incomodar a comissão técnica. O talento não foi suficiente para esconder os problemas fora das quatro linhas.",

        color:"red"

    },


    wasted_potential:{

        title:"TALENTO DESPERDIÇADO",

        image:"potential",

        text:

        "Você teve oportunidades, mas a falta de confiança impediu que mostrasse todo o seu potencial.",

        color:"gray"

    },


    promising_start:{

        title:"UM COMEÇO PROMISSOR",

        image:"promising",

        text:

        "Você ainda não virou uma estrela, mas sua primeira semana deixou boas impressões. O futuro depende das próximas decisões.",

        color:"blue"

    }

};