/* ========================================================
   STORY DATA
   Banco de dados da narrativa

   Cada cena possui:
   - id
   - capítulo
   - título
   - speaker
   - texto
   - pergunta
   - 4 respostas
   - background

   Cada resposta pode possuir:
   - effects
   - flags
   - consequence
   - next
   ======================================================== */


const storyData = [

    /* ====================================================
       CAPÍTULO 1
       ENTREVISTA COLETIVA
       ==================================================== */


    {
        id: "intro_01",

        chapter: "intro",

        title: "O primeiro contato",

        speaker: "Repórter",

        background: "press_room",

        text: `
            As portas da sala de imprensa se abrem.
            Você entra pela primeira vez usando a camisa
            do maior clube da sua carreira.

            Dezenas de jornalistas levantam os celulares.
            Câmeras apontam para você.

            Ao seu lado está o técnico.

            É sua primeira entrevista como jogador do clube.
        `,

        question:
            "Um jornalista pergunta: como você está se sentindo depois de chegar a um clube desse tamanho?",

        answers: [

            {
                text:
                    "Estou aqui para vencer. Sei do meu potencial e quero mostrar isso.",

                effects: {

                    coach: 2,

                    fans: 2,

                    confidence: 3

                },

                flags: [

                    "confident_interview"

                ],

                consequence:
                    "Alguns jornalistas anotam sua resposta imediatamente. O tom confiante chama atenção.",

                next:
                    "intro_02"

            },


            {
                text:
                    "É uma honra estar aqui. Sei que tenho muito a aprender e quero ajudar o grupo.",

                effects: {

                    coach: 4,

                    teammates: 3,

                    professionalism: 3

                },

                flags: [

                    "humble_interview"

                ],

                consequence:
                    "O técnico faz um pequeno gesto de aprovação. A resposta transmite maturidade.",

                next:
                    "intro_02"

            },


            {
                text:
                    "Sinceramente? Ainda estou tentando acreditar que isso aconteceu.",

                effects: {

                    teammates: 2,

                    confidence: 1

                },

                flags: [

                    "honest_interview"

                ],

                consequence:
                    "A sala reage com alguns sorrisos. A resposta espontânea quebra um pouco o clima formal.",

                next:
                    "intro_02"

            },


            {
                text:
                    "Não vim até aqui para ser mais um. Quero ser o principal jogador deste time.",

                effects: {

                    coach: -2,

                    fans: 3,

                    confidence: 4,

                    professionalism: -2

                },

                flags: [

                    "arrogant_interview"

                ],

                consequence:
                    "Alguns jornalistas trocam olhares. A frase começa a circular nas redes antes mesmo do fim da entrevista.",

                next:
                    "intro_02"

            }

        ]

    },


    /* ====================================================
       ENTREVISTA — PERGUNTA 2
       ==================================================== */


    {
        id: "intro_02",

        chapter: "intro",

        title: "As expectativas",

        speaker: "Repórter",

        background: "press_room",

        text: (state) => {

            if(state.flags.arrogant_interview){

                return `
                    O próximo jornalista percebe a repercussão
                    da sua primeira resposta.

                    Ele sorri antes de fazer a pergunta.

                    Parece que está procurando uma manchete.
                `;

            }


            if(state.flags.humble_interview){

                return `
                    O clima da coletiva continua tranquilo.

                    Depois da sua primeira resposta,
                    outro jornalista levanta a mão.
                `;

            }


            return `
                As câmeras continuam registrando cada palavra.

                Outro jornalista pede a palavra.
            `;

        },

        question:
            "Você chega poucos dias antes de uma semifinal de Champions. Acha que já está pronto para jogar?",

        answers: [

            {
                text:
                    "Se o treinador me colocar em campo, vou estar pronto. Não tenho medo desse momento.",

                effects: {

                    coach: 2,

                    confidence: 3,

                    fans: 1

                },

                flags: [

                    "ready_for_champions"

                ],

                consequence:
                    "O técnico olha rapidamente para você. A resposta demonstra confiança sem fugir da responsabilidade.",

                next:
                    "intro_03"

            },


            {
                text:
                    "Quem decide isso é o treinador. Meu trabalho é treinar e estar preparado quando ele precisar.",

                effects: {

                    coach: 4,

                    professionalism: 4

                },

                flags: [

                    "respects_coach"

                ],

                consequence:
                    "O técnico finalmente sorri. Você deixou claro que respeita a hierarquia do grupo.",

                next:
                    "intro_03"

            },


            {
                text:
                    "É uma semifinal de Champions. Qualquer jogador sentiria pressão, mas vou tentar aproveitar.",

                effects: {

                    teammates: 2,

                    confidence: 1,

                    professionalism: 1

                },

                flags: [

                    "admits_pressure"

                ],

                consequence:
                    "A resposta parece sincera. Alguns jornalistas anotam que você não tentou esconder a pressão.",

                next:
                    "intro_03"

            },


            {
                text:
                    "Se eu não estivesse pronto, o clube não teria pago para me contratar.",

                effects: {

                    coach: -3,

                    fans: 2,

                    confidence: 4,

                    professionalism: -2

                },

                flags: [

                    "high_ego"

                ],

                consequence:
                    "Um jornalista sorri. Você percebe que acabou de entregar uma frase perfeita para as manchetes.",

                next:
                    "intro_03"

            }

        ]

    },


    /* ====================================================
       ENTREVISTA — PERGUNTA 3
       ==================================================== */


    {
        id: "intro_03",

        chapter: "intro",

        title: "A pergunta difícil",

        speaker: "Repórter",

        background: "press_room",

        text: (state) => {

            if(state.flags.arrogant_interview){

                return `
                    A entrevista chega ao fim.

                    Mas um último jornalista decide apertar ainda mais.

                    Ele pergunta sobre sua relação com os jogadores
                    que já são estrelas do elenco.
                `;

            }


            return `
                A coletiva está chegando ao fim.

                Antes que você deixe a sala,
                um último jornalista pede a palavra.

                A pergunta muda completamente o clima.
            `;

        },

        question:
            "Alguns jogadores do elenco já são ídolos do clube. Você aceitaria começar no banco para ganhar espaço aos poucos?",

        answers: [

            {
                text:
                    "Sim. Quero conquistar meu espaço dentro de campo, respeitando quem já construiu sua história aqui.",

                effects: {

                    coach: 4,

                    teammates: 4,

                    professionalism: 4,

                    confidence: 1

                },

                flags: [

                    "respects_veterans",

                    "team_first"

                ],

                consequence:
                    "Um dos jogadores mais experientes do elenco assiste à entrevista pelo celular e comenta positivamente sobre você.",

                next:
                    "STARTER_DECISION"

            },


            {
                text:
                    "Aceitaria, mas vou trabalhar todos os dias para fazer o treinador mudar de ideia.",

                effects: {

                    coach: 3,

                    professionalism: 3,

                    confidence: 3

                },

                flags: [

                    "competitive",

                    "patient_ambition"

                ],

                consequence:
                    "O técnico parece satisfeito. Você mostrou ambição sem exigir nada antes da hora.",

                next:
                    "STARTER_DECISION"

            },


            {
                text:
                    "Eu preferiria jogar. Mas se precisar esperar, vou continuar trabalhando.",

                effects: {

                    teammates: 1,

                    professionalism: 2,

                    confidence: 2

                },

                flags: [

                    "wants_starting_role"

                ],

                consequence:
                    "Sua resposta deixa claro que você quer jogar, mas não pretende criar problemas por isso.",

                next:
                    "STARTER_DECISION"

            },


            {
                text:
                    "Não. Fui contratado para jogar, não para assistir meus companheiros jogarem.",

                effects: {

                    coach: -5,

                    teammates: -3,

                    fans: 3,

                    confidence: 5,

                    professionalism: -4

                },

                flags: [

                    "refuses_bench",

                    "ego_problem"

                ],

                consequence:
                    "A sala fica em silêncio por alguns segundos. A declaração certamente será uma das manchetes da noite.",

                next:
                    "STARTER_DECISION"

            }

        ]

    },


    /* ====================================================
       FIM DA ENTREVISTA
       ==================================================== */


    {
        id: "starter_announcement",

        chapter: "intro",

        title: "A escalação",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            if(state.player.starter){

                return `
                    Dois dias depois.

                    O treino terminou.

                    O técnico reúne o elenco no centro do campo.

                    Todos aguardam a escalação para a semifinal.

                    Seu nome aparece entre os titulares.

                    Você conseguiu.
                `;

            }


            return `
                Dois dias depois.

                O treino terminou.

                O técnico reúne o elenco no centro do campo.

                A escalação é anunciada.

                Seu nome não aparece entre os titulares.

                Você começa no banco.
            `;

        },

        question: (state) => {

            if(state.player.starter){

                return "Como você reage ao descobrir que será titular?";

            }


            return "Como você reage ao descobrir que começará a partida no banco?";

        },

        answers: [

            {
                text:
                    "Respiro fundo e penso apenas no jogo. Agora preciso estar preparado.",

                effects: {

                    confidence: 3,

                    professionalism: 3

                },

                flags: [

                    "calm_before_match"

                ],

                consequence:
                    "Você mantém a cabeça fria. O jogo está cada vez mais próximo.",

                next: (state) => {

                    return state.player.starter

                        ? "starter_01"

                        : "bench_01";

                }

            },

            {
                text:
                    "Vou procurar o treinador e agradecer pela oportunidade.",

                effects: {

                    coach: 3,

                    professionalism: 2

                },

                flags: [

                    "coach_respect"

                ],

                consequence:
                    "O treinador responde apenas com um aceno. A relação entre vocês começa a ganhar força.",

                next: (state) => {

                    return state.player.starter

                        ? "starter_01"

                        : "bench_01";

                }

            },

            {
                text:
                    "Fico pensando no que preciso fazer para mostrar que mereço estar aqui.",

                effects: {

                    confidence: 2,

                    professionalism: 2

                },

                flags: [

                    "self_reflection"

                ],

                consequence:
                    "Você começa a analisar cada detalhe da semana. A semifinal pode mudar tudo.",

                next: (state) => {

                    return state.player.starter

                        ? "starter_01"

                        : "bench_01";

                }

            },

            {
                text:
                    "Não escondo minha frustração. Eu queria estar jogando.",

                effects: {

                    confidence: 1,

                    professionalism: -2,

                    coach: -1

                },

                flags: [

                    "frustrated_selection"

                ],

                consequence:
                    "Você tenta controlar a expressão, mas o treinador percebe sua frustração.",

                next: (state) => {

                    return state.player.starter

                        ? "starter_01"

                        : "bench_01";

                }

            }
            

        ]

    }

    /* ====================================================
       CAMINHO DO TITULAR — CENA 01
       TREINO FINAL
       ==================================================== */

    ,{
        id: "starter_01",

        chapter: "starter",

        title: "O último treino",

        speaker: "Narrador",

        background: "stadium",

        text: (state) => {

            if(state.flags.arrogant_interview){

                return `
                    Você entra no campo para o último treino antes
                    da semifinal.

                    Alguns jogadores ainda comentam sobre a entrevista
                    que você deu dias atrás.

                    Você percebe que agora precisa provar suas palavras
                    dentro de campo.
                `;

            }

            if(state.flags.humble_interview){

                return `
                    O último treino antes da semifinal começa.

                    Você chega cedo ao campo.

                    O ambiente está concentrado, mas seus companheiros
                    já parecem mais confortáveis com sua presença.
                `;

            }

            return `
                O último treino antes da semifinal começa.

                O estádio está vazio.

                Mesmo assim, a tensão é diferente de qualquer treino
                que você já tenha vivido.

                Faltam poucas horas para a partida mais importante
                da sua jovem carreira.
            `;

        },

        question:
            "Durante um exercício tático, o treinador interrompe a atividade e pede mais intensidade. O que você faz?",

        answers: [

            {
                text:
                    "Aumento a intensidade e tento ser um dos jogadores mais ativos do treino.",

                effects: {

                    coach: 4,

                    professionalism: 3,

                    confidence: 2

                },

                flags: [

                    "high_intensity_training"

                ],

                consequence:
                    "O treinador acompanha seus movimentos por alguns segundos e faz um sinal positivo com a cabeça.",

                next:
                    "starter_02"

            },

            {
                text:
                    "Mantenho a concentração e sigo exatamente as instruções do exercício.",

                effects: {

                    coach: 3,

                    professionalism: 4

                },

                flags: [

                    "tactical_discipline"

                ],

                consequence:
                    "Você executa a movimentação corretamente. O auxiliar anota alguma coisa na prancheta.",

                next:
                    "starter_02"

            },

            {
                text:
                    "Procuro ajudar os jogadores ao meu redor a entender a movimentação.",

                effects: {

                    teammates: 4,

                    coach: 2,

                    professionalism: 2

                },

                flags: [

                    "training_leader"

                ],

                consequence:
                    "Um dos jogadores mais experientes agradece pela orientação. Você começa a ganhar espaço dentro do grupo.",

                next:
                    "starter_02"

            },

            {
                text:
                    "Faço o exercício no meu ritmo. Não quero chegar cansado para a semifinal.",

                effects: {

                    confidence: 1,

                    professionalism: -3,

                    coach: -3

                },

                flags: [

                    "conserves_energy"

                ],

                consequence:
                    "O treinador percebe que você diminuiu a intensidade e pede que você acompanhe o ritmo do restante do grupo.",

                next:
                    "starter_02"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 02
       ALIMENTAÇÃO
       ==================================================== */

    {
        id: "starter_02",

        chapter: "starter",

        title: "A escolha antes do jogo",

        speaker: "Nutricionista",

        background: "stadium",

        text: (state) => {

            if(state.flags.high_intensity_training){

                return `
                    Depois do treino intenso, você chega ao refeitório
                    do clube.

                    Seu corpo pede descanso, mas ainda existe uma última
                    decisão antes de deixar o centro de treinamento.
                `;

            }

            return `
                Depois do treino, você chega ao refeitório do clube.

                A equipe de nutrição preparou uma refeição específica
                para os jogadores que estarão relacionados para a
                semifinal.

                Alguns companheiros conversam enquanto comem.
            `;

        },

        question:
            "Um companheiro chama você para comer uma sobremesa fora do plano alimentar. Como você reage?",

        answers: [

            {
                text:
                    "Agradeço, mas sigo o plano preparado pela equipe.",

                effects: {

                    professionalism: 4,

                    confidence: 1,

                    coach: 1

                },

                flags: [

                    "strict_diet"

                ],

                consequence:
                    "Você mantém a rotina planejada. A equipe de preparação física aprova sua disciplina.",

                next:
                    "starter_03"

            },

            {
                text:
                    "Como apenas um pouco. Não quero transformar uma refeição em uma obsessão.",

                effects: {

                    teammates: 3,

                    professionalism: 1

                },

                flags: [

                    "balanced_diet"

                ],

                consequence:
                    "Seu companheiro sorri. Vocês continuam conversando sobre a semifinal.",

                next:
                    "starter_03"

            },

            {
                text:
                    "Hoje é véspera de semifinal. Melhor não arriscar.",

                effects: {

                    professionalism: 3,

                    confidence: 2

                },

                flags: [

                    "match_focus"

                ],

                consequence:
                    "Você prefere manter tudo sob controle. Sua cabeça já está totalmente voltada para a partida.",

                next:
                    "starter_03"

            },

            {
                text:
                    "Claro. Depois de tudo que treinamos, acho que merecemos.",

                effects: {

                    teammates: 4,

                    professionalism: -3,

                    confidence: 1

                },

                flags: [

                    "social_with_team",

                    "diet_slip"

                ],

                consequence:
                    "A mesa vira um pequeno momento de descontração, mas você sabe que saiu um pouco da rotina.",

                next:
                    "starter_03"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 03
       CHUTEIRAS
       ==================================================== */

    {
        id: "starter_03",

        chapter: "starter",

        title: "O detalhe",

        speaker: "Narrador",

        background: "tunnel",

        text: `
            A noite chega.

            No seu quarto, o uniforme está separado.

            A camisa do clube está sobre a cadeira.

            Mas existe uma escolha que parece pequena e, naquela
            noite, ganha uma importância enorme.

            Suas chuteiras.
        `,

        question:
            "Qual chuteira você decide usar na semifinal?",

        answers: [

            {
                text:
                    "A que já uso há meses. Conheço exatamente como ela responde.",

                effects: {

                    confidence: 3,

                    professionalism: 2

                },

                flags: [

                    "trusted_boots"

                ],

                consequence:
                    "Você escolhe segurança. Não há espaço para testar algo novo antes de uma semifinal.",

                next:
                    "starter_04"

            },

            {
                text:
                    "A nova que recebi do patrocinador. Quero estrear algo especial.",

                effects: {

                    confidence: 3,

                    fans: 2

                },

                flags: [

                    "new_boots"

                ],

                consequence:
                    "Você publica uma foto discreta das chuteiras. Em poucos minutos, torcedores começam a comentar.",

                next:
                    "starter_04"

            },

            {
                text:
                    "Uma chuteira mais leve. Quero velocidade para atacar os espaços.",

                effects: {

                    confidence: 2,

                    professionalism: 1

                },

                flags: [

                    "speed_boots"

                ],

                consequence:
                    "Você imagina os espaços que poderá encontrar durante a partida.",

                next:
                    "starter_04"

            },

            {
                text:
                    "Escolho a mais chamativa. Se vou entrar para a história, quero que lembrem dela.",

                effects: {

                    fans: 4,

                    confidence: 3,

                    professionalism: -1

                },

                flags: [

                    "flashy_boots"

                ],

                consequence:
                    "A escolha chama atenção até no vestiário. Alguns companheiros brincam com você sobre o visual.",

                next:
                    "starter_04"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 04
       AUTÓGRAFOS
       ==================================================== */

    {
        id: "starter_04",

        chapter: "starter",

        title: "Do outro lado do portão",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            if(state.flags.flashy_boots){

                return `
                    Na saída do centro de treinamento,
                    você percebe uma pequena multidão esperando
                    do lado de fora.

                    Alguns torcedores reconhecem suas novas chuteiras
                    e começam a gritar seu nome.
                `;

            }

            return `
                Na saída do centro de treinamento,
                uma pequena multidão espera os jogadores.

                Crianças seguram camisas do clube.

                Alguns torcedores chamam seu nome.

                É a primeira vez que você percebe o tamanho da
                expectativa sobre sua chegada.
            `;

        },

        question:
            "Um garoto pede um autógrafo antes de você entrar no carro. O que você faz?",

        answers: [

            {
                text:
                    "Paro, assino a camisa dele e tiro uma foto.",

                effects: {

                    fans: 5,

                    confidence: 2

                },

                flags: [

                    "fan_friendly"

                ],

                consequence:
                    "O garoto sorri de orelha a orelha. O momento é filmado por outros torcedores.",

                next:
                    "starter_05"

            },

            {
                text:
                    "Assino rapidamente, mas explico que preciso descansar para o jogo.",

                effects: {

                    fans: 3,

                    professionalism: 2

                },

                flags: [

                    "professional_fan_interaction"

                ],

                consequence:
                    "Você consegue atender o torcedor sem comprometer sua preparação.",

                next:
                    "starter_05"

            },

            {
                text:
                    "Peço desculpas e digo que depois da semifinal posso atender todo mundo.",

                effects: {

                    professionalism: 3,

                    fans: -1

                },

                flags: [

                    "focused_before_match"

                ],

                consequence:
                    "O torcedor parece um pouco decepcionado, mas você mantém sua prioridade na preparação.",

                next:
                    "starter_05"

            },

            {
                text:
                    "Passo direto. Não quero me distrair antes de uma partida desse tamanho.",

                effects: {

                    professionalism: 1,

                    fans: -4,

                    confidence: 2

                },

                flags: [

                    "cold_fan_interaction"

                ],

                consequence:
                    "Você entra no carro. Alguns torcedores continuam chamando seu nome, mas você não olha para trás.",

                next:
                    "starter_05"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 05
       REDES SOCIAIS
       ==================================================== */

    {
        id: "starter_05",

        chapter: "starter",

        title: "A noite anterior",

        speaker: "Narrador",

        background: "tunnel",

        text: (state) => {

            if(state.flags.cold_fan_interaction){

                return `
                    Já no hotel, você percebe que alguns vídeos da
                    sua chegada estão circulando nas redes sociais.

                    Um deles mostra você ignorando os torcedores.

                    Os comentários estão divididos.
                `;

            }

            if(state.flags.fan_friendly){

                return `
                    Já no hotel, você percebe que a foto com o jovem
                    torcedor começou a circular nas redes sociais.

                    A publicação está recebendo milhares de comentários.

                    A torcida parece ter gostado do gesto.
                `;

            }

            return `
                Já no hotel, você pega o celular.

                A semifinal domina as redes sociais.

                Torcedores, jornalistas e ex-jogadores discutem
                quem será decisivo na partida.

                Você percebe que seu nome também aparece entre
                os assuntos mais comentados.
            `;

        },

        question:
            "Você recebe uma mensagem de um amigo sugerindo que publique algo antes da semifinal. O que você faz?",

        answers: [

            {
                text:
                    "Publico uma mensagem curta agradecendo o apoio da torcida.",

                effects: {

                    fans: 4,

                    confidence: 2,

                    professionalism: 1

                },

                flags: [

                    "positive_social_media"

                ],

                consequence:
                    "A mensagem recebe milhares de respostas positivas. A torcida começa a criar expectativa para sua estreia na Champions.",

                next:
                    "starter_06"

            },

            {
                text:
                    "Publico uma foto do vestiário com uma mensagem sobre foco e trabalho.",

                effects: {

                    coach: 2,

                    fans: 2,

                    professionalism: 3

                },

                flags: [

                    "professional_social_media"

                ],

                consequence:
                    "A postagem transmite concentração. Até alguns companheiros compartilham a mensagem.",

                next:
                    "starter_06"

            },

            {
                text:
                    "Não publico nada. Coloco o celular de lado e tento dormir.",

                effects: {

                    professionalism: 4,

                    confidence: 2

                },

                flags: [

                    "social_media_silence"

                ],

                consequence:
                    "Você evita distrações. Agora toda sua atenção está voltada para a partida.",

                next:
                    "starter_06"

            },

            {
                text:
                    "Publico: 'Amanhã vocês vão descobrir por que me contrataram.'",

                effects: {

                    fans: 5,

                    confidence: 4,

                    coach: -2,

                    professionalism: -2

                },

                flags: [

                    "provocative_social_media"

                ],

                consequence:
                    "A publicação explode nas redes. Torcedores adoram a ousadia, mas o treinador certamente verá a mensagem.",

                next:
                    "starter_06"

            }

        ]

    },   
    
    /* ====================================================
       CAMINHO DO TITULAR — CENA 06
       PRESSÃO DA IMPRENSA
       ==================================================== */

    {
        id: "starter_06",

        chapter: "starter",

        title: "A manchete",

        speaker: "Narrador",

        background: "hotel",

        text: (state) => {

            if(state.flags.provocative_social_media){

                return `
                    Você acorda com dezenas de notificações.

                    A frase publicada na noite anterior virou
                    uma das principais manchetes esportivas.

                    Alguns jornalistas dizem que você demonstrou
                    personalidade.

                    Outros dizem que você falou demais antes de
                    sequer entrar em campo.
                `;

            }

            return `
                Você acorda cedo no hotel.

                A semifinal domina todos os jornais esportivos.

                Na televisão, comentaristas discutem a escalação,
                as estratégias dos dois times e os jogadores que
                podem decidir a partida.

                Seu nome aparece várias vezes.
            `;

        },

        question:
            "Um jornalista consegue falar com você no corredor do hotel e pergunta se você está sentindo pressão.",

        answers: [

            {
                text:
                    "Pressão existe, mas é exatamente por isso que treinamos todos os dias.",

                effects: {

                    confidence: 4,

                    professionalism: 3,

                    coach: 2

                },

                flags: [

                    "handles_pressure"

                ],

                consequence:
                    "O jornalista agradece. Sua resposta transmite tranquilidade diante de uma situação enorme.",

                next:
                    "starter_07"

            },

            {
                text:
                    "Estou nervoso, mas acho que todo jogador sente isso antes de uma partida assim.",

                effects: {

                    teammates: 2,

                    confidence: 1,

                    professionalism: 2

                },

                flags: [

                    "admits_nerves"

                ],

                consequence:
                    "A sinceridade surpreende o jornalista. A resposta acaba sendo publicada sem nenhuma polêmica.",

                next:
                    "starter_07"

            },

            {
                text:
                    "Se eu ficar pensando na pressão, vou esquecer de jogar futebol.",

                effects: {

                    confidence: 3,

                    professionalism: 2

                },

                flags: [

                    "match_mindset"

                ],

                consequence:
                    "Você encerra a conversa e segue para o café da manhã.",

                next:
                    "starter_07"

            },

            {
                text:
                    "Pressão? Acho que quem deveria estar preocupado é o adversário.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    professionalism: -2,

                    coach: -1

                },

                flags: [

                    "provokes_opponent"

                ],

                consequence:
                    "O jornalista sorri. Você percebe imediatamente que essa frase provavelmente estará nas manchetes.",

                next:
                    "starter_07"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 07
       COMPANHEIRO
       ==================================================== */

    {
        id: "starter_07",

        chapter: "starter",

        title: "O companheiro",

        speaker: "Companheiro",

        background: "locker_room",

        text: (state) => {

            if(state.flags.team_first){

                return `
                    No vestiário, um dos jogadores mais experientes
                    se aproxima.

                    Ele foi um dos atletas que você respeitou
                    durante a entrevista.

                    Agora ele parece querer conversar em particular.
                `;

            }

            return `
                No vestiário, enquanto os jogadores se preparam,
                um companheiro se aproxima.

                Ele olha para você durante alguns segundos antes
                de falar.

                Parece preocupado.
            `;

        },

        question:
            "Ele diz: 'Você chegou agora. Não tente carregar o time inteiro sozinho.' O que você responde?",

        answers: [

            {
                text:
                    "Você tem razão. Vou fazer minha parte e confiar no grupo.",

                effects: {

                    teammates: 5,

                    professionalism: 3,

                    confidence: 1

                },

                flags: [

                    "trusts_team"

                ],

                consequence:
                    "Ele coloca a mão no seu ombro e sorri. A conversa termina com respeito entre vocês.",

                next:
                    "starter_08"

            },

            {
                text:
                    "Eu sei. Mas se aparecer uma oportunidade, vou tentar decidir.",

                effects: {

                    teammates: 2,

                    confidence: 3

                },

                flags: [

                    "wants_to_decide"

                ],

                consequence:
                    "Ele concorda. Você percebe que ambos entendem a responsabilidade de uma semifinal.",

                next:
                    "starter_08"

            },

            {
                text:
                    "Não estou preocupado. Sei exatamente o que preciso fazer.",

                effects: {

                    confidence: 4,

                    teammates: -1

                },

                flags: [

                    "self_confident"

                ],

                consequence:
                    "O jogador apenas dá de ombros. Você percebe que sua resposta soou mais dura do que pretendia.",

                next:
                    "starter_08"

            },

            {
                text:
                    "Talvez você devesse se preocupar mais com a sua própria atuação.",

                effects: {

                    teammates: -5,

                    confidence: 4,

                    professionalism: -3

                },

                flags: [

                    "team_conflict"

                ],

                consequence:
                    "O clima muda imediatamente. Ele se afasta sem responder.",

                next:
                    "starter_08"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 08
       CONVERSA COM O TREINADOR
       ==================================================== */

    {
        id: "starter_08",

        chapter: "starter",

        title: "Olho no olho",

        speaker: "Treinador",

        background: "locker_room",

        text: (state) => {

            if(state.flags.team_conflict){

                return `
                    Pouco antes da palestra,
                    o treinador pede para conversar com você.

                    Ele sabe que houve um problema no vestiário.

                    A porta se fecha.
                `;

            }

            return `
                Pouco antes da palestra,
                o treinador pede para conversar com você.

                Ele fecha a porta.

                Por alguns segundos, nenhum dos dois fala.

                Então ele olha diretamente para você.
            `;

        },

        question:
            "O treinador pergunta: 'Você está preparado para o que vem pela frente?'",

        answers: [

            {
                text:
                    "Estou. Confio no meu trabalho e no grupo.",

                effects: {

                    coach: 5,

                    confidence: 3

                },

                flags: [

                    "coach_confidence"

                ],

                consequence:
                    "O treinador responde apenas: 'Então mostre isso em campo.'",

                next:
                    "starter_09"

            },

            {
                text:
                    "Estou preparado. Só preciso que confie em mim.",

                effects: {

                    coach: 3,

                    confidence: 4

                },

                flags: [

                    "asks_for_trust"

                ],

                consequence:
                    "O treinador observa você por alguns segundos antes de responder: 'Você terá sua oportunidade.'",

                next:
                    "starter_09"

            },

            {
                text:
                    "Estou nervoso, mas não vou fugir da responsabilidade.",

                effects: {

                    coach: 3,

                    professionalism: 4,

                    confidence: 1

                },

                flags: [

                    "honest_with_coach"

                ],

                consequence:
                    "O treinador parece satisfeito com a sinceridade.",

                next:
                    "starter_09"

            },

            {
                text:
                    "Se você me colocou como titular, espero que saiba o que está fazendo.",

                effects: {

                    coach: -5,

                    confidence: 5,

                    professionalism: -4

                },

                flags: [

                    "challenges_coach"

                ],

                consequence:
                    "O treinador fica em silêncio. A conversa termina de maneira fria.",

                next:
                    "starter_09"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 09
       CLIMA
       ==================================================== */

    {
        id: "starter_09",

        chapter: "starter",

        title: "Mudança de planos",

        speaker: "Narrador",

        background: "stadium_rain",

        text: `
            O ônibus finalmente chega ao estádio.

            Quando você desce, percebe que começou a chover.

            O gramado está molhado.

            As condições da partida serão diferentes do que
            a comissão técnica havia planejado.

            No túnel, o auxiliar chama alguns jogadores.
        `,

        question:
            "O auxiliar pergunta se você prefere jogar de maneira mais segura por causa do gramado.",

        answers: [

            {
                text:
                    "Sim. Vamos controlar o jogo e evitar riscos desnecessários.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "safe_game_plan"

                ],

                consequence:
                    "O auxiliar concorda. A equipe começa a ajustar a estratégia.",

                next:
                    "starter_10"

            },

            {
                text:
                    "Não. O campo está ruim para os dois times. Precisamos continuar atacando.",

                effects: {

                    confidence: 4,

                    coach: 2

                },

                flags: [

                    "aggressive_game_plan"

                ],

                consequence:
                    "O auxiliar sorri. A ideia combina com a estratégia ofensiva do time.",

                next:
                    "starter_10"

            },

            {
                text:
                    "Podemos começar com cuidado e aumentar o ritmo depois.",

                effects: {

                    professionalism: 3,

                    confidence: 2,

                    coach: 2

                },

                flags: [

                    "adaptive_game_plan"

                ],

                consequence:
                    "A sugestão é anotada na prancheta. O plano pode mudar durante a partida.",

                next:
                    "starter_10"

            },

            {
                text:
                    "Não importa a chuva. Quero jogar como sempre.",

                effects: {

                    confidence: 5,

                    professionalism: -1

                },

                flags: [

                    "ignores_conditions"

                ],

                consequence:
                    "Você mantém sua postura agressiva. Agora precisa provar que consegue executá-la.",

                next:
                    "starter_10"

            }

        ]

    },


    /* ====================================================
       CAMINHO DO TITULAR — CENA 10
       TÚNEL
       ==================================================== */

    {
        id: "starter_10",

        chapter: "starter",

        title: "O túnel",

        speaker: "Narrador",

        background: "tunnel",

        text: (state) => {

            if(state.flags.team_conflict){

                return `
                    O túnel está lotado.

                    De um lado, seus companheiros.

                    Do outro, os jogadores adversários.

                    O companheiro com quem você discutiu passa por você.

                    Nenhum dos dois fala.
                `;

            }

            return `
                O túnel está lotado.

                De um lado, seus companheiros.

                Do outro, os jogadores adversários.

                As arquibancadas começam a fazer barulho.

                Você escuta o hino da Champions ao longe.

                É agora.
            `;

        },

        question:
            "Faltam poucos segundos para entrar em campo. Qual é seu último pensamento?",

        answers: [

            {
                text:
                    "Penso na minha família e em tudo que precisei fazer para chegar até aqui.",

                effects: {

                    confidence: 4,

                    professionalism: 2

                },

                flags: [

                    "family_motivation"

                ],

                consequence:
                    "Você respira fundo. Por alguns segundos, toda a pressão desaparece.",

                next:
                    "match_01"

            },

            {
                text:
                    "Penso apenas na primeira jogada. Quero começar bem.",

                effects: {

                    confidence: 3,

                    professionalism: 3

                },

                flags: [

                    "focused_start"

                ],

                consequence:
                    "Você visualiza a primeira jogada na cabeça antes mesmo de pisar no gramado.",

                next:
                    "match_01"

            },

            {
                text:
                    "Olho para a torcida e tento absorver aquele momento.",

                effects: {

                    fans: 4,

                    confidence: 3

                },

                flags: [

                    "absorbs_atmosphere"

                ],

                consequence:
                    "O estádio inteiro parece tremer. Você percebe que nunca jogou diante de uma atmosfera como aquela.",

                next:
                    "match_01"

            },

            {
                text:
                    "Penso no adversário. Quero mostrar que sou melhor que eles.",

                effects: {

                    confidence: 5,

                    professionalism: -1

                },

                flags: [

                    "rivalry_mindset"

                ],

                consequence:
                    "Você encara os jogadores adversários. A tensão aumenta antes mesmo do apito.",

                next:
                    "match_01"

            }

        ]

    },
    
        /* ====================================================
       PARTIDA — CENA 01
       ENTRADA EM CAMPO
       ==================================================== */

    {
        id: "match_01",

        chapter: "match",

        title: "A semifinal",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.team_conflict){

                return `
                    O hino termina.

                    Você olha para o lado e vê o companheiro
                    com quem discutiu antes da partida.

                    O jogo está prestes a começar.

                    Não existe mais tempo para conversas.
                `;

            }

            return `
                O hino da Champions termina.

                O estádio explode em gritos.

                Você olha para as arquibancadas e percebe
                milhares de pessoas acompanhando cada movimento.

                O árbitro confere o relógio.

                A bola está no centro do campo.

                É hora de jogar.
            `;

        },

        question:
            "A bola começa a rolar. Qual é sua primeira atitude?",

        answers: [

            {
                text:
                    "Faço uma movimentação agressiva e procuro participar imediatamente do ataque.",

                effects: {

                    confidence: 4,

                    fans: 2,

                    coach: 2

                },

                flags: [

                    "aggressive_start"

                ],

                consequence:
                    "Você toca na bola logo nos primeiros segundos e mostra que não pretende se esconder.",

                next:
                    "match_02"

            },

            {
                text:
                    "Mantenho minha posição e observo como o adversário está se comportando.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "observes_opponent"

                ],

                consequence:
                    "Você percebe alguns espaços que podem aparecer durante a partida.",

                next:
                    "match_02"

            },

            {
                text:
                    "Procuro imediatamente meu companheiro mais próximo para trocar passes.",

                effects: {

                    teammates: 4,

                    professionalism: 2

                },

                flags: [

                    "builds_connection"

                ],

                consequence:
                    "A troca de passes ajuda o time a entrar no ritmo da partida.",

                next:
                    "match_02"

            },

            {
                text:
                    "Tento uma jogada individual logo no primeiro ataque.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    teammates: -1

                },

                flags: [

                    "individual_start"

                ],

                consequence:
                    "Você parte para cima do marcador. A torcida reage imediatamente.",

                next:
                    "match_02"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 02
       PRIMEIRO CONFRONTO
       ==================================================== */

    {
        id: "match_02",

        chapter: "match",

        title: "O primeiro duelo",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.individual_start){

                return `
                    Aos poucos, o adversário percebe que você
                    está tentando criar jogadas sozinho.

                    O lateral começa a se aproximar mais.

                    Você recebe a bola novamente.
                `;

            }

            if(state.flags.builds_connection){

                return `
                    Os primeiros minutos passam.

                    A troca de passes entre você e seus companheiros
                    começa a funcionar.

                    O adversário recua alguns metros.

                    Então surge o primeiro espaço.
                `;

            }

            return `
                Os primeiros minutos passam.

                O jogo é intenso.

                O adversário começa a pressionar sua equipe.

                Você recebe a bola perto da lateral.

                O marcador vem rapidamente.
            `;

        },

        question:
            "O marcador chega forte. Qual é sua decisão?",

        answers: [

            {
                text:
                    "Tento driblá-lo e avanço pelo corredor.",

                effects: {

                    confidence: 4,

                    fans: 3

                },

                flags: [

                    "takes_on_defender"

                ],

                consequence:
                    "Você ganha alguns metros e levanta a torcida.",

                next:
                    "match_03"

            },

            {
                text:
                    "Protejo a bola e espero um companheiro aparecer.",

                effects: {

                    teammates: 3,

                    professionalism: 3,

                    coach: 2

                },

                flags: [

                    "plays_safe"

                ],

                consequence:
                    "Você evita o risco e mantém a posse da equipe.",

                next:
                    "match_03"

            },

            {
                text:
                    "Dou um passe rápido por dentro e me movimento para receber novamente.",

                effects: {

                    teammates: 4,

                    professionalism: 4

                },

                flags: [

                    "quick_combination"

                ],

                consequence:
                    "A tabela funciona e você aparece novamente em espaço aberto.",

                next:
                    "match_03"

            },

            {
                text:
                    "Forço o contato para tentar cavar uma falta.",

                effects: {

                    confidence: 2,

                    professionalism: -2,

                    fans: 1

                },

                flags: [

                    "seeks_foul"

                ],

                consequence:
                    "O árbitro manda o jogo seguir. Você reclama, mas precisa voltar para a jogada.",

                next:
                    "match_03"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 03
       PRIMEIRA GRANDE CHANCE
       ==================================================== */

    {
        id: "match_03",

        chapter: "match",

        title: "A oportunidade",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            if(state.flags.takes_on_defender){

                return `
                    O drible anterior abriu espaço.

                    Você recebe novamente na entrada da área.

                    Um companheiro passa pelo lado.

                    Por alguns segundos, parece que a defesa
                    adversária está desorganizada.
                `;

            }

            return `
                Aos 17 minutos, sua equipe recupera a bola
                no meio-campo.

                O contra-ataque começa.

                Você corre para encontrar espaço.

                Quando recebe, percebe que está diante da
                primeira grande oportunidade da partida.
            `;

        },

        question:
            "Você tem espaço para avançar. O que faz?",

        answers: [

            {
                text:
                    "Arrisco o chute de fora da área.",

                effects: {

                    confidence: 5,

                    fans: 3

                },

                flags: [

                    "long_shot_attempt"

                ],

                consequence:
                    "Você bate de primeira. A bola passa muito perto da trave e o estádio inteiro reage.",

                next:
                    "match_04"

            },

            {
                text:
                    "Passo para o companheiro que está entrando livre.",

                effects: {

                    teammates: 5,

                    professionalism: 3,

                    coach: 3

                },

                flags: [

                    "selfless_pass"

                ],

                consequence:
                    "Seu companheiro recebe em ótima posição. A jogada quase termina em gol.",

                next:
                    "match_04"

            },

            {
                text:
                    "Avanço mais alguns metros antes de decidir.",

                effects: {

                    confidence: 3,

                    professionalism: 2

                },

                flags: [

                    "waits_for_opening"

                ],

                consequence:
                    "Você atrai dois defensores e abre espaço para o restante do ataque.",

                next:
                    "match_04"

            },

            {
                text:
                    "Tento driblar os dois marcadores e entrar na área.",

                effects: {

                    confidence: 5,

                    fans: 4,

                    teammates: -1

                },

                flags: [

                    "double_dribble"

                ],

                consequence:
                    "Você tenta uma jogada ousada. A torcida levanta das cadeiras.",

                next:
                    "match_04"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 04
       O PRIMEIRO PROBLEMA
       ==================================================== */

    {
        id: "match_04",

        chapter: "match",

        title: "Um problema inesperado",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.team_conflict){

                return `
                    Aos 31 minutos, uma jogada dá errado.

                    Seu companheiro perde a bola.

                    O adversário parte para o contra-ataque.

                    Quando a jogada termina, ele olha para você.

                    Você percebe que ele está esperando uma reação.
                `;

            }

            return `
                Aos 31 minutos, uma jogada dá errado.

                O adversário recupera a bola e parte rapidamente
                para o ataque.

                Sua equipe precisa se reorganizar.

                O treinador grita instruções da área técnica.
            `;

        },

        question:
            "O adversário está avançando. Como você reage?",

        answers: [

            {
                text:
                    "Volto imediatamente para ajudar na marcação.",

                effects: {

                    professionalism: 4,

                    coach: 4,

                    teammates: 2

                },

                flags: [

                    "defensive_help"

                ],

                consequence:
                    "Você corre de volta e ajuda a fechar o espaço. O ataque adversário perde força.",

                next:
                    "match_05"

            },

            {
                text:
                    "Fico mais adiantado para estar preparado para o contra-ataque.",

                effects: {

                    confidence: 3,

                    professionalism: -1

                },

                flags: [

                    "waits_for_counter"

                ],

                consequence:
                    "Você permanece na frente esperando uma oportunidade quando a bola voltar.",

                next:
                    "match_05"

            },

            {
                text:
                    "Grito para meus companheiros se organizarem.",

                effects: {

                    teammates: 4,

                    coach: 2,

                    confidence: 2

                },

                flags: [

                    "organizes_team"

                ],

                consequence:
                    "Sua voz ajuda o grupo a se reorganizar rapidamente.",

                next:
                    "match_05"

            },

            {
                text:
                    "Reclamo com o companheiro que perdeu a bola.",

                effects: {

                    teammates: -4,

                    professionalism: -3,

                    confidence: 2

                },

                flags: [

                    "blames_teammate"

                ],

                consequence:
                    "O companheiro responde irritado. O clima dentro do campo fica mais pesado.",

                next:
                    "match_05"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 05
       CARTÃO AMARELO / PRESSÃO
       ==================================================== */

    {
        id: "match_05",

        chapter: "match",

        title: "No limite",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.blames_teammate){

                return `
                    O jogo fica cada vez mais físico.

                    Depois da discussão anterior, você tenta
                    recuperar a concentração.

                    Um adversário entra forte em uma disputa.

                    Você chega atrasado.
                `;

            }

            return `
                O jogo fica cada vez mais físico.

                As duas equipes começam a disputar cada bola
                como se fosse a última.

                Aos 39 minutos, você chega atrasado em uma disputa.

                O árbitro apita.
            `;

        },

        question:
            "O árbitro se aproxima. Como você reage?",

        answers: [

            {
                text:
                    "Aceito a decisão e sigo concentrado.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "accepts_yellow"

                ],

                consequence:
                    "Você evita discutir. O árbitro mostra o cartão amarelo e a partida continua.",

                next:
                    "match_06"

            },

            {
                text:
                    "Explico que não tive intenção de cometer a falta.",

                effects: {

                    professionalism: 1,

                    confidence: 2

                },

                flags: [

                    "explains_foul"

                ],

                consequence:
                    "O árbitro ouve sua explicação, mas mantém a decisão.",

                next:
                    "match_06"

            },

            {
                text:
                    "Fico irritado, mas me afasto antes que a situação piore.",

                effects: {

                    confidence: 2,

                    professionalism: -1

                },

                flags: [

                    "controls_anger"

                ],

                consequence:
                    "Você respira fundo e volta para sua posição.",

                next:
                    "match_06"

            },

            {
                text:
                    "Reclamo com o árbitro e digo que ele está favorecendo o adversário.",

                effects: {

                    fans: 2,

                    confidence: 3,

                    professionalism: -5,

                    coach: -3

                },

                flags: [

                    "argues_referee"

                ],

                consequence:
                    "O árbitro avisa que não tolerará outra reclamação. Você passa a jogar sob risco de outro cartão.",

                next:
                    "match_06"

            }

        ]

    },
        /* ====================================================
       PARTIDA — CENA 06
       EVENTO ESPECIAL
       ==================================================== */

    {
        id: "match_06",

        chapter: "match",

        title: "Algo mudou",

        speaker: "Narrador",

        background: "stadium_rain",

        text: (state) => {

            if(state.flags.argues_referee){

                return `
                    Você volta para sua posição ainda irritado
                    com a decisão do árbitro.

                    A chuva aumenta.

                    O gramado começa a ficar cada vez mais pesado.

                    Então o adversário recupera a bola e acelera
                    pelo seu lado do campo.
                `;

            }

            if(state.flags.defensive_help){

                return `
                    Você volta rapidamente para sua posição.

                    A chuva começa a ficar mais forte.

                    O gramado está escorregadio e cada disputa
                    exige ainda mais atenção.

                    O adversário tenta explorar esse espaço.
                `;

            }

            return `
                A chuva aumenta.

                O gramado começa a ficar pesado.

                A partida fica mais difícil de controlar.

                Faltam poucos minutos para o intervalo.
            `;

        },

        question:
            "Você percebe que o adversário está explorando o gramado molhado. O que faz?",

        answers: [

            {
                text:
                    "Jogo de forma mais simples e evito carregar a bola em excesso.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "adapts_to_rain"

                ],

                consequence:
                    "Você diminui os riscos e passa a procurar soluções mais simples.",

                next:
                    "match_07"

            },

            {
                text:
                    "Continuo tentando jogar normalmente. Não quero mudar meu estilo.",

                effects: {

                    confidence: 4,

                    professionalism: -1

                },

                flags: [

                    "keeps_style_in_rain"

                ],

                consequence:
                    "Você mantém seu estilo agressivo apesar das condições difíceis.",

                next:
                    "match_07"

            },

            {
                text:
                    "Peço aos companheiros para trocar mais passes pelo chão.",

                effects: {

                    teammates: 4,

                    coach: 3,

                    professionalism: 3

                },

                flags: [

                    "changes_team_strategy"

                ],

                consequence:
                    "O time começa a trocar passes mais rapidamente para evitar as zonas mais perigosas do campo.",

                next:
                    "match_07"

            },

            {
                text:
                    "Tento usar o gramado molhado para acelerar minhas jogadas.",

                effects: {

                    confidence: 5,

                    fans: 2,

                    professionalism: -1

                },

                flags: [

                    "uses_rain"

                ],

                consequence:
                    "Você percebe que a bola ganha velocidade quando toca no gramado molhado.",

                next:
                    "match_07"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 07
       PROVOCAÇÃO
       ==================================================== */

    {
        id: "match_07",

        chapter: "match",

        title: "A provocação",

        speaker: "Adversário",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.rivalry_mindset){

                return `
                    Um dos defensores adversários percebe sua
                    postura durante a partida.

                    Depois de uma disputa de bola,
                    ele se aproxima.

                    Ele sorri e diz:

                    "Você fala bastante antes dos jogos."
                `;

            }

            return `
                Depois de uma disputa de bola,
                um dos defensores adversários se aproxima.

                Ele tenta provocar você.

                "É sua primeira semifinal, garoto.
                Vamos ver se aguenta."
            `;

        },

        question:
            "Como você responde à provocação?",

        answers: [

            {
                text:
                    "Não respondo. Apenas volto para minha posição.",

                effects: {

                    professionalism: 4,

                    confidence: 2,

                    coach: 2

                },

                flags: [

                    "ignores_provocation"

                ],

                consequence:
                    "O adversário percebe que não conseguiu tirar você do jogo.",

                next:
                    "match_08"

            },

            {
                text:
                    "Sorrio e digo: 'A gente conversa depois do jogo.'",

                effects: {

                    confidence: 4,

                    fans: 2

                },

                flags: [

                    "calm_provocation"

                ],

                consequence:
                    "Você responde sem perder a concentração. A torcida reage quando percebe a troca de palavras.",

                next:
                    "match_08"

            },

            {
                text:
                    "Digo que ele deveria se preocupar em me marcar.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    professionalism: -1

                },

                flags: [

                    "responds_provocation"

                ],

                consequence:
                    "O defensor sorri. Agora o duelo entre vocês ficou pessoal.",

                next:
                    "match_08"

            },

            {
                text:
                    "Perco a paciência e começo a discutir.",

                effects: {

                    confidence: 2,

                    professionalism: -5,

                    teammates: -1

                },

                flags: [

                    "loses_temper"

                ],

                consequence:
                    "O árbitro se aproxima para separar os dois. Você precisa tomar cuidado para não receber outro cartão.",

                next:
                    "match_08"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 08
       A CHANCE MAIS PERIGOSA
       ==================================================== */

    {
        id: "match_08",

        chapter: "match",

        title: "Quase gol",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            if(state.flags.long_shot_attempt){

                return `
                    Aos 43 minutos, sua equipe recupera a bola
                    novamente.

                    Você recebe próximo da área.

                    Depois do chute de minutos atrás,
                    o goleiro agora está mais atento.

                    Existe pouco espaço.
                `;

            }

            return `
                Aos 43 minutos.

                Sua equipe consegue recuperar a bola
                no campo de ataque.

                Você recebe próximo da área.

                A defesa adversária está desorganizada.

                Existe uma oportunidade enorme.
            `;

        },

        question:
            "Você percebe um companheiro entrando livre na área. O que faz?",

        answers: [

            {
                text:
                    "Faço o passe imediatamente.",

                effects: {

                    teammates: 5,

                    coach: 4,

                    professionalism: 3

                },

                flags: [

                    "creates_big_chance"

                ],

                consequence:
                    "O passe encontra seu companheiro. Ele finaliza, mas o goleiro faz uma defesa espetacular.",

                next:
                    "match_09"

            },

            {
                text:
                    "Seguro a bola e tento finalizar sozinho.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    teammates: -2

                },

                flags: [

                    "selfish_chance"

                ],

                consequence:
                    "Você chuta pressionado. A bola desvia e sai pela linha de fundo.",

                next:
                    "match_09"

            },

            {
                text:
                    "Faço um passe curto e tento receber de volta.",

                effects: {

                    teammates: 4,

                    professionalism: 3

                },

                flags: [

                    "combination_attack"

                ],

                consequence:
                    "A tabela funciona. Você entra na área, mas a defesa consegue bloquear sua finalização.",

                next:
                    "match_09"

            },

            {
                text:
                    "Tento um passe de calcanhar para surpreender a defesa.",

                effects: {

                    confidence: 4,

                    fans: 4,

                    professionalism: -1

                },

                flags: [

                    "creative_attempt"

                ],

                consequence:
                    "A jogada quase funciona. A torcida reage com um enorme 'ohhh'.",

                next:
                    "match_09"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 09
       INTERVALO SE APROXIMA
       ==================================================== */

    {
        id: "match_09",

        chapter: "match",

        title: "Último lance",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            return `
                O relógio passa dos 45 minutos.

                O quarto árbitro levanta a placa.

                Mais dois minutos.

                Sua equipe ainda não conseguiu marcar.

                O adversário também não.

                0 a 0.

                Então surge um último ataque antes do intervalo.
            `;

        },

        question:
            "Você recebe a bola pela última vez antes do intervalo. Qual é sua decisão?",

        answers: [

            {
                text:
                    "Cruzo para a área procurando um companheiro.",

                effects: {

                    teammates: 4,

                    professionalism: 2

                },

                flags: [

                    "crosses_before_break"

                ],

                consequence:
                    "O cruzamento passa perigosamente pela área, mas ninguém consegue finalizar.",

                next:
                    "match_10"

            },

            {
                text:
                    "Tento entrar na área pelo meio.",

                effects: {

                    confidence: 4,

                    fans: 3

                },

                flags: [

                    "drives_into_box"

                ],

                consequence:
                    "Você passa por um marcador, mas é cercado por outros dois defensores.",

                next:
                    "match_10"

            },

            {
                text:
                    "Seguro a bola e espero o intervalo.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "kills_time"

                ],

                consequence:
                    "Você mantém a posse e evita que o adversário tenha uma última oportunidade.",

                next:
                    "match_10"

            },

            {
                text:
                    "Arrisco uma finalização improvável.",

                effects: {

                    confidence: 5,

                    fans: 4,

                    professionalism: -1

                },

                flags: [

                    "desperate_shot"

                ],

                consequence:
                    "O chute sai forte, mas passa por cima do gol.",

                next:
                    "match_10"

            }

        ]

    },


    /* ====================================================
       PARTIDA — CENA 10
       INTERVALO
       ==================================================== */

    {
        id: "match_10",

        chapter: "match",

        title: "No vestiário",

        speaker: "Treinador",

        background: "locker_room",

        text: (state) => {

            if(state.flags.challenges_coach){

                return `
                    O time entra no vestiário.

                    O placar continua 0 a 0.

                    O treinador fecha a porta.

                    Ele olha diretamente para você antes
                    de começar a palestra.

                    Você percebe que ele está esperando
                    que você prove sua confiança.
                `;

            }

            if(state.flags.team_conflict){

                return `
                    O time entra no vestiário.

                    O placar continua 0 a 0.

                    O ambiente está tenso.

                    O treinador sabe que houve problemas
                    dentro do campo.

                    Agora ele precisa reorganizar a equipe.
                `;

            }

            return `
                O primeiro tempo termina.

                0 a 0.

                Os jogadores entram no vestiário.

                Todos estão cansados.

                O treinador espera alguns segundos
                antes de começar a falar.

                A semifinal ainda está completamente aberta.
            `;

        },

        question:
            "O treinador pergunta ao grupo: 'O que precisamos mudar no segundo tempo?'",

        answers: [

            {
                text:
                    "Precisamos acelerar a troca de passes e atacar os espaços.",

                effects: {

                    coach: 4,

                    teammates: 3,

                    confidence: 3

                },

                flags: [

                    "suggests_attack"

                ],

                consequence:
                    "O treinador concorda. A equipe precisa encontrar mais velocidade.",

                next:
                    "second_half_01"

            },

            {
                text:
                    "Precisamos ter paciência. Uma hora o espaço vai aparecer.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "suggests_patience"

                ],

                consequence:
                    "O treinador pensa por alguns segundos e concorda com a ideia.",

                next:
                    "second_half_01"

            },

            {
                text:
                    "Precisamos jogar mais juntos. Estamos deixando muitos espaços.",

                effects: {

                    teammates: 4,

                    coach: 3,

                    professionalism: 3

                },

                flags: [

                    "suggests_balance"

                ],

                consequence:
                    "Os jogadores começam a discutir maneiras de melhorar a organização.",

                next:
                    "second_half_01"

            },

            {
                text:
                    "Se me derem a bola, eu consigo decidir o jogo.",

                effects: {

                    confidence: 5,

                    coach: -2,

                    teammates: -2

                },

                flags: [

                    "demands_responsibility"

                ],

                consequence:
                    "O vestiário fica em silêncio por alguns segundos. O treinador encara você antes de continuar a palestra.",

                next:
                    "second_half_01"

            }

        ]

    },
        /* ====================================================
       SEGUNDO TEMPO — CENA 01
       VOLTA AO CAMPO
       ==================================================== */

    {
        id: "second_half_01",

        chapter: "second_half",

        title: "Os últimos 45 minutos",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.stats.confidence >= 15){

                return `
                    O segundo tempo começa.

                    Você volta ao gramado com uma sensação diferente.

                    Tudo que aconteceu antes da partida parece
                    ter desaparecido.

                    Você está confiante.

                    O treinador percebe isso e pede para que você
                    seja mais agressivo.
                `;

            }

            if(state.stats.confidence <= 5){

                return `
                    O segundo tempo começa.

                    Você volta ao gramado tentando recuperar
                    a concentração.

                    Algumas decisões do primeiro tempo ainda
                    estão passando pela sua cabeça.

                    Você precisa reagir.
                `;

            }

            return `
                O segundo tempo começa.

                O placar continua 0 a 0.

                O estádio está ainda mais barulhento.

                Cada ataque parece poder decidir a semifinal.
            `;

        },

        question:
            "A bola volta a rolar. Qual será sua postura?",

        answers: [

            {
                text:
                    "Procuro participar mais das jogadas ofensivas.",

                effects: {

                    confidence: 3,

                    fans: 2,

                    coach: 2

                },

                flags: [

                    "second_half_aggression"

                ],

                consequence:
                    "Você começa a aparecer mais perto da área adversária.",

                next:
                    "second_half_02"

            },

            {
                text:
                    "Sigo exatamente o plano definido no intervalo.",

                effects: {

                    professionalism: 4,

                    coach: 4

                },

                flags: [

                    "follows_half_time_plan"

                ],

                consequence:
                    "O treinador percebe que você está executando exatamente o que foi pedido.",

                next:
                    "second_half_02"

            },

            {
                text:
                    "Tento aproximar os jogadores para melhorar a troca de passes.",

                effects: {

                    teammates: 4,

                    professionalism: 3

                },

                flags: [

                    "connects_team"

                ],

                consequence:
                    "A equipe começa a encontrar mais espaços entre as linhas.",

                next:
                    "second_half_02"

            },

            {
                text:
                    "Tento resolver a partida sozinho.",

                effects: {

                    confidence: 5,

                    teammates: -2,

                    coach: -1

                },

                flags: [

                    "tries_to_win_alone"

                ],

                consequence:
                    "Você assume mais riscos e começa a buscar jogadas individuais.",

                next:
                    "second_half_02"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 02
       O ADVERSÁRIO MUDA
       ==================================================== */

    {
        id: "second_half_02",

        chapter: "second_half",

        title: "A mudança adversária",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.aggressive_game_plan){

                return `
                    O adversário percebe que sua equipe está
                    tentando atacar com velocidade.

                    O treinador rival faz uma substituição.

                    Um novo defensor entra justamente para
                    acompanhar seus movimentos.
                `;

            }

            return `
                O treinador adversário percebe que sua equipe
                começou a controlar mais a partida.

                Ele faz uma substituição.

                Um novo jogador entra para marcar você.
            `;

        },

        question:
            "O novo marcador começa a acompanhar você de perto. O que faz?",

        answers: [

            {
                text:
                    "Recuo alguns metros para tentar tirá-lo da posição.",

                effects: {

                    professionalism: 3,

                    teammates: 3,

                    coach: 3

                },

                flags: [

                    "pulls_defender"

                ],

                consequence:
                    "O marcador acompanha você. Um espaço aparece atrás dele.",

                next:
                    "second_half_03"

            },

            {
                text:
                    "Continuo atacando diretamente o marcador.",

                effects: {

                    confidence: 4,

                    fans: 3

                },

                flags: [

                    "attacks_marker"

                ],

                consequence:
                    "Você encara o defensor novamente. O duelo começa a ficar pessoal.",

                next:
                    "second_half_03"

            },

            {
                text:
                    "Troco de posição com um companheiro.",

                effects: {

                    teammates: 4,

                    professionalism: 3,

                    coach: 2

                },

                flags: [

                    "changes_position"

                ],

                consequence:
                    "A troca confunde a marcação adversária.",

                next:
                    "second_half_03"

            },

            {
                text:
                    "Peço a bola mesmo estando cercado.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    professionalism: -1

                },

                flags: [

                    "demands_ball"

                ],

                consequence:
                    "Você recebe pressionado por dois jogadores.",

                next:
                    "second_half_03"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 03
       PRIMEIRA GRANDE DECISÃO
       ==================================================== */

    {
        id: "second_half_03",

        chapter: "second_half",

        title: "O espaço aparece",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            if(state.flags.pulls_defender){

                return `
                    Sua movimentação funcionou.

                    O marcador saiu da posição.

                    Um espaço enorme aparece na entrada da área.

                    Seu companheiro percebe primeiro.

                    O passe vem na sua direção.
                `;

            }

            if(state.flags.changes_position){

                return `
                    A troca de posições confundiu a defesa.

                    Você aparece em uma região onde ninguém
                    esperava encontrá-lo.

                    A bola chega aos seus pés.
                `;

            }

            return `
                Aos 57 minutos, sua equipe recupera a bola.

                Você recebe próximo da área.

                Dois defensores fecham seu espaço.

                Um companheiro aparece livre pelo lado.
            `;

        },

        question:
            "Você precisa tomar uma decisão rapidamente.",

        answers: [

            {
                text:
                    "Passo para o companheiro livre.",

                effects: {

                    teammates: 5,

                    coach: 4,

                    professionalism: 3

                },

                flags: [

                    "makes_correct_pass"

                ],

                consequence:
                    "O passe quebra a linha defensiva. A equipe cria uma grande oportunidade.",

                next:
                    "second_half_04"

            },

            {
                text:
                    "Tento finalizar mesmo cercado.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    teammates: -2

                },

                flags: [

                    "forces_finish"

                ],

                consequence:
                    "Você consegue chutar, mas a defesa bloqueia a tentativa.",

                next:
                    "second_half_04"

            },

            {
                text:
                    "Seguro a bola até alguém aparecer para ajudar.",

                effects: {

                    professionalism: 3,

                    teammates: 3

                },

                flags: [

                    "waits_for_support"

                ],

                consequence:
                    "Um companheiro chega e você consegue manter a posse.",

                next:
                    "second_half_04"

            },

            {
                text:
                    "Tento passar pelos dois defensores.",

                effects: {

                    confidence: 5,

                    fans: 4,

                    teammates: -1

                },

                flags: [

                    "beats_two_defenders"

                ],

                consequence:
                    "Você tenta uma jogada extremamente difícil. A torcida se levanta.",

                next:
                    "second_half_04"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 04
       MOMENTO DE TENSÃO
       ==================================================== */

    {
        id: "second_half_04",

        chapter: "second_half",

        title: "O contra-ataque",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.flags.tries_to_win_alone){

                return `
                    Sua tentativa anterior não funcionou.

                    O adversário recupera a bola e começa
                    um contra-ataque perigoso.

                    Você está longe da sua posição.
                `;

            }

            return `
                A jogada ofensiva termina.

                O adversário recupera a bola.

                Em poucos segundos, eles conseguem avançar.

                Sua equipe está desorganizada.

                O estádio prende a respiração.
            `;

        },

        question:
            "O adversário está entrando na área. O que você faz?",

        answers: [

            {
                text:
                    "Volto o mais rápido possível para ajudar.",

                effects: {

                    professionalism: 5,

                    coach: 4,

                    teammates: 3

                },

                flags: [

                    "tracks_back"

                ],

                consequence:
                    "Você chega a tempo de fechar uma linha de passe importante.",

                next:
                    "second_half_05"

            },

            {
                text:
                    "Peço para um companheiro cobrir meu espaço.",

                effects: {

                    teammates: 4,

                    professionalism: 3

                },

                flags: [

                    "asks_for_cover"

                ],

                consequence:
                    "Seu companheiro entende a situação e cobre o espaço.",

                next:
                    "second_half_05"

            },

            {
                text:
                    "Permaneço mais adiantado esperando uma recuperação.",

                effects: {

                    confidence: 3,

                    professionalism: -2

                },

                flags: [

                    "stays_forward"

                ],

                consequence:
                    "Você permanece preparado para iniciar um contra-ataque.",

                next:
                    "second_half_05"

            },

            {
                text:
                    "Tento recuperar a bola de qualquer maneira.",

                effects: {

                    confidence: 4,

                    professionalism: -2

                },

                flags: [

                    "desperate_recovery"

                ],

                consequence:
                    "Você chega forte na disputa e o árbitro observa atentamente.",

                next:
                    "second_half_05"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 05
       O TREINADOR
       ==================================================== */

    {
        id: "second_half_05",

        chapter: "second_half",

        title: "Uma decisão na lateral",

        speaker: "Treinador",

        background: "stadium_match",

        text: (state) => {

            if(state.stats.coach <= 5){

                return `
                    O treinador chama você perto da lateral.

                    O jogo está chegando aos 65 minutos.

                    Ele parece preocupado com sua atuação.

                    "Preciso que você seja mais inteligente
                    nas próximas jogadas."
                `;

            }

            if(state.stats.coach >= 18){

                return `
                    O treinador chama você perto da lateral.

                    O jogo está chegando aos 65 minutos.

                    Ele fala rapidamente:

                    "Continue assim. A próxima oportunidade
                    pode decidir tudo."
                `;

            }

            return `
                O treinador chama você perto da lateral.

                O jogo está chegando aos 65 minutos.

                O placar continua 0 a 0.

                "Ainda temos tempo", ele diz.
            `;

        },

        question:
            "O treinador pergunta se você consegue continuar no mesmo ritmo.",

        answers: [

            {
                text:
                    "Consigo. Pode confiar em mim.",

                effects: {

                    confidence: 4,

                    coach: 4

                },

                flags: [

                    "promises_performance"

                ],

                consequence:
                    "O treinador faz um sinal positivo e volta para a área técnica.",

                next:
                    "second_half_06"

            },

            {
                text:
                    "Consigo, mas preciso administrar minha energia.",

                effects: {

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "manages_energy"

                ],

                consequence:
                    "O treinador entende. Você começa a escolher melhor quando acelerar.",

                next:
                    "second_half_06"

            },

            {
                text:
                    "Estou cansado, mas não quero sair.",

                effects: {

                    confidence: 3,

                    coach: 2,

                    professionalism: 1

                },

                flags: [

                    "wants_to_stay"

                ],

                consequence:
                    "O treinador olha para o banco, mas decide manter você em campo por enquanto.",

                next:
                    "second_half_06"

            },

            {
                text:
                    "Se você me tirar agora, vai se arrepender.",

                effects: {

                    confidence: 5,

                    coach: -5,

                    professionalism: -3

                },

                flags: [

                    "challenges_substitution"

                ],

                consequence:
                    "O treinador não responde. Ele apenas olha para o relógio.",

                next:
                    "second_half_06"

            }

        ]

    },
        /* ====================================================
       SEGUNDO TEMPO — CENA 06
       O CANSAÇO
       ==================================================== */

    {
        id: "second_half_06",

        chapter: "second_half",

        title: "O peso da partida",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(state.stats.confidence >= 20) {

                return `
                    O relógio passa dos 70 minutos.

                    Suas pernas começam a pesar.

                    Mesmo assim, você sente que está vivendo
                    uma das melhores partidas da sua carreira.

                    Existe uma sensação de que algo ainda
                    pode acontecer.
                `;

            }

            return `
                O relógio passa dos 70 minutos.

                O ritmo da partida começa a cobrar seu preço.

                Suas pernas estão pesadas.

                O placar continua 0 a 0.

                E cada erro agora pode ser decisivo.
            `;

        },

        question:
            "Você sente o cansaço. Como decide administrar os próximos minutos?",

        answers: [

            {
                text:
                    "Diminuo um pouco o ritmo para guardar energia para o fim.",

                effects: {

                    professionalism: 4,

                    confidence: 2

                },

                flags: [

                    "saves_energy"

                ],

                consequence:
                    "Você passa a escolher melhor os momentos para acelerar.",

                next:
                    "second_half_07"

            },

            {
                text:
                    "Continuo correndo no mesmo ritmo.",

                effects: {

                    confidence: 4,

                    professionalism: -1

                },

                flags: [

                    "maintains_intensity"

                ],

                consequence:
                    "Você continua pressionando, mesmo sentindo o desgaste físico.",

                next:
                    "second_half_07"

            },

            {
                text:
                    "Peço para os companheiros segurarem mais a posse.",

                effects: {

                    teammates: 4,

                    professionalism: 3,

                    coach: 2

                },

                flags: [

                    "controls_possession"

                ],

                consequence:
                    "A equipe diminui o ritmo por alguns minutos.",

                next:
                    "second_half_07"

            },

            {
                text:
                    "Ignoro o cansaço e tento buscar o gol a qualquer custo.",

                effects: {

                    confidence: 5,

                    fans: 3,

                    professionalism: -2

                },

                flags: [

                    "ignores_fatigue"

                ],

                consequence:
                    "Você continua avançando. Agora cada corrida exige muito mais esforço.",

                next:
                    "second_half_07"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 07
       O CARTÃO
       ==================================================== */

    {
        id: "second_half_07",

        chapter: "second_half",

        title: "No limite",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(
                state.flags.argues_referee ||
                state.flags.loses_temper
            ) {

                return `
                    Aos 74 minutos, você entra em uma disputa
                    mais forte.

                    O árbitro já havia avisado anteriormente.

                    Você sabe que precisa tomar cuidado.

                    Mesmo assim, o adversário passa por você.
                `;

            }

            return `
                Aos 74 minutos, o adversário consegue escapar
                pela lateral.

                Você está cansado.

                Ele tem espaço para avançar.

                Você precisa decidir rapidamente.
            `;

        },

        question:
            "O adversário está escapando. O que você faz?",

        answers: [

            {
                text:
                    "Acompanho a jogada sem cometer falta.",

                effects: {

                    professionalism: 5,

                    coach: 3

                },

                flags: [

                    "avoids_second_card"

                ],

                consequence:
                    "Você acompanha o adversário e espera o momento certo para recuperar a posição.",

                next:
                    "second_half_08"

            },

            {
                text:
                    "Faço uma falta tática para impedir o contra-ataque.",

                effects: {

                    professionalism: -2,

                    coach: 1

                },

                flags: [

                    "tactical_foul"

                ],

                consequence:
                    "O árbitro marca a falta e se aproxima. Você já tem um cartão.",

                next:
                    "second_half_08"

            },

            {
                text:
                    "Tento recuperar a bola no carrinho.",

                effects: {

                    confidence: 3,

                    professionalism: -3

                },

                flags: [

                    "sliding_tackle"

                ],

                consequence:
                    "Você chega na bola por pouco. O árbitro manda o jogo seguir.",

                next:
                    "second_half_08"

            },

            {
                text:
                    "Deixo o adversário passar e volto para minha posição.",

                effects: {

                    professionalism: 2,

                    coach: 1

                },

                flags: [

                    "does_not_risk"

                ],

                consequence:
                    "Você prefere não correr o risco de receber outro cartão.",

                next:
                    "second_half_08"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 08
       SUBSTITUIÇÃO
       ==================================================== */

    {
        id: "second_half_08",

        chapter: "second_half",

        title: "O banco se movimenta",

        speaker: "Narrador",

        background: "stadium_match",

        text: (state) => {

            if(
                state.stats.coach <= 4 ||
                state.flags.challenges_substitution
            ) {

                return `
                    O treinador olha para o banco.

                    Alguns reservas começam a aquecer.

                    Você percebe que seu nome pode estar
                    entre os próximos a sair.
                `;

            }

            if(state.stats.coach >= 20) {

                return `
                    O treinador olha para o banco.

                    Alguns jogadores começam a aquecer.

                    Mas ele olha para você e faz um sinal:

                    "Continua."
                `;

            }

            return `
                O treinador olha para o banco.

                Dois jogadores começam a aquecer.

                Você não sabe se a substituição será sua
                ou de outro companheiro.
            `;

        },

        question:
            "O treinador chama você para conversar rapidamente.",

        answers: [

            {
                text:
                    "Pergunto o que ele precisa que eu faça nos próximos minutos.",

                effects: {

                    coach: 4,

                    professionalism: 3

                },

                flags: [

                    "asks_tactical_instruction"

                ],

                consequence:
                    "O treinador explica exatamente onde quer que você se posicione.",

                next: (state) => {

                    if(
                        state.stats.coach >= 12 &&
                        !state.flags.challenges_substitution
                    ) {

                        return "second_half_09";

                    }

                    return "substitution_01";

                }

            },

            {
                text:
                    "Digo que ainda consigo jogar em alto nível.",

                effects: {

                    confidence: 4,

                    coach: 2

                },

                flags: [

                    "claims_fitness"

                ],

                consequence:
                    "O treinador observa você durante alguns segundos antes de decidir.",

                next: (state) => {

                    if(state.stats.coach >= 10) {

                        return "second_half_09";

                    }

                    return "substitution_01";

                }

            },

            {
                text:
                    "Aceito qualquer decisão que ele tomar.",

                effects: {

                    professionalism: 5,

                    coach: 5

                },

                flags: [

                    "accepts_coach_decision"

                ],

                consequence:
                    "O treinador percebe sua maturidade e toma uma decisão.",

                next: (state) => {

                    if(state.stats.coach >= 8) {

                        return "second_half_09";

                    }

                    return "substitution_01";

                }

            },

            {
                text:
                    "Digo que não quero sair de jeito nenhum.",

                effects: {

                    confidence: 4,

                    coach: -5,

                    professionalism: -3

                },

                flags: [

                    "refuses_substitution"

                ],

                consequence:
                    "O treinador fica sério. Agora a decisão está nas mãos dele.",

                next: (state) => {

                    if(state.stats.coach >= 8) {

                        return "second_half_09";

                    }

                    return "substitution_01";

                }

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 09
       A GRANDE CHANCE
       ==================================================== */

    {
        id: "second_half_09",

        chapter: "second_half",

        title: "A oportunidade perfeita",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            if(state.flags.selfless_pass) {

                return `
                    Aos 82 minutos.

                    O jogo continua 0 a 0.

                    Você recebe a bola perto da área.

                    O mesmo companheiro que você procurou
                    durante o primeiro tempo aparece livre.

                    Desta vez, o espaço é ainda maior.
                `;

            }

            if(state.flags.creates_big_chance) {

                return `
                    Aos 82 minutos.

                    Depois de várias tentativas,
                    sua equipe finalmente encontra espaço.

                    Você recebe a bola dentro da área.
                `;

            }

            return `
                Aos 82 minutos.

                O estádio inteiro está de pé.

                Sua equipe recupera a bola no campo de ataque.

                Você recebe dentro da área.

                O goleiro sai do gol.

                É a maior oportunidade da partida.
            `;

        },

        question:
            "Você está diante do goleiro. O que faz?",

        answers: [

            {
                text:
                    "Finalizo colocado no canto.",

                effects: {

                    confidence: 5,

                    fans: 4

                },

                flags: [

                    "decisive_finish"

                ],

                consequence:
                    "Você bate colocado. O goleiro se estica completamente.",

                next:
                    "goal_check"

            },

            {
                text:
                    "Tento driblar o goleiro.",

                effects: {

                    confidence: 5,

                    fans: 5

                },

                flags: [

                    "dribbles_keeper"

                ],

                consequence:
                    "Você tenta tirar o goleiro da jogada.",

                next:
                    "goal_check"

            },

            {
                text:
                    "Passo para o companheiro que está livre.",

                effects: {

                    teammates: 5,

                    professionalism: 4,

                    coach: 4

                },

                flags: [

                    "final_selfless_pass"

                ],

                consequence:
                    "Você coloca seu companheiro diante do gol.",

                next:
                    "goal_check"

            },

            {
                text:
                    "Tento uma finalização de primeira extremamente difícil.",

                effects: {

                    confidence: 5,

                    fans: 5,

                    professionalism: -1

                },

                flags: [

                    "spectacular_finish"

                ],

                consequence:
                    "Você tenta uma finalização acrobática. O estádio inteiro prende a respiração.",

                next:
                    "goal_check"

            }

        ]

    },


    /* ====================================================
       SEGUNDO TEMPO — CENA 10
       ÚLTIMA INSTRUÇÃO
       ==================================================== */

    {
        id: "second_half_10",

        chapter: "second_half",

        title: "Os minutos finais",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            return `
                O relógio chega aos 87 minutos.

                O estádio está completamente envolvido.

                A partida está chegando ao fim.

                O placar pode mudar a qualquer momento.

                O treinador grita sua última instrução.
            `;

        },

        question:
            "O treinador pede que você escolha entre atacar ou controlar o jogo.",

        answers: [

            {
                text:
                    "Vamos atacar. Não quero depender da prorrogação.",

                effects: {

                    confidence: 4,

                    fans: 4,

                    coach: 2

                },

                flags: [

                    "late_attack"

                ],

                consequence:
                    "A equipe avança suas linhas e começa a pressionar.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Vamos controlar. Não podemos cometer um erro agora.",

                effects: {

                    professionalism: 5,

                    coach: 4

                },

                flags: [

                    "late_control"

                ],

                consequence:
                    "A equipe diminui os riscos e mantém a posse.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Procuro um equilíbrio entre as duas coisas.",

                effects: {

                    professionalism: 3,

                    teammates: 3,

                    coach: 3

                },

                flags: [

                    "late_balance"

                ],

                consequence:
                    "O time tenta controlar a bola sem abandonar o ataque.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Deixo tudo que tenho em campo e procuro decidir.",

                effects: {

                    confidence: 5,

                    fans: 5,

                    professionalism: -1

                },

                flags: [

                    "all_in_attack"

                ],

                consequence:
                    "Você parte para os últimos minutos com toda a energia restante.",

                next:
                    "final_minutes_01"

            }

        ]

    },
        /* ====================================================
       SUBSTITUIÇÃO — CENA 01
       O TREINADOR TOMA A DECISÃO
       ==================================================== */

    {
        id: "substitution_01",

        chapter: "substitution",

        title: "A decisão",

        speaker: "Treinador",

        background: "sideline",

        text: (state) => {

            return `
                O treinador olha para você.

                O jogo está nos minutos finais.

                Ele precisa tomar uma decisão.

                O estádio inteiro continua pressionando.
            `;

        },

        question:
            "O treinador diz: 'Você precisa sair agora.' Como você reage?",

        answers: [

            {
                text:
                    "Aceito a decisão e cumprimento o treinador.",

                effects: {

                    professionalism: 5,

                    coach: 4,

                    teammates: 2

                },

                flags: [

                    "accepts_substitution"

                ],

                consequence:
                    "Você deixa o campo aplaudido por parte da torcida.",

                next:
                    "substitution_02"

            },

            {
                text:
                    "Pergunto por que estou sendo substituído.",

                effects: {

                    professionalism: 1,

                    coach: -1

                },

                flags: [

                    "questions_substitution"

                ],

                consequence:
                    "O treinador explica rapidamente que precisa mudar a estratégia.",

                next:
                    "substitution_02"

            },

            {
                text:
                    "Fico frustrado, mas não discuto.",

                effects: {

                    confidence: -1,

                    professionalism: 3,

                    coach: 2

                },

                flags: [

                    "frustrated_substitution"

                ],

                consequence:
                    "Você deixa o campo claramente decepcionado, mas respeita a decisão.",

                next:
                    "substitution_02"

            },

            {
                text:
                    "Digo que ainda posso decidir a partida.",

                effects: {

                    confidence: 3,

                    coach: -4,

                    professionalism: -2

                },

                flags: [

                    "argues_substitution"

                ],

                consequence:
                    "O treinador mantém a decisão. Você precisa sair.",

                next:
                    "substitution_02"

            }

        ]

    },


    /* ====================================================
       SUBSTITUIÇÃO — CENA 02
       NO BANCO
       ==================================================== */

    {
        id: "substitution_02",

        chapter: "substitution",

        title: "Do lado de fora",

        speaker: "Narrador",

        background: "bench",

        text: (state) => {

            return `
                Você se senta no banco.

                Faltam poucos minutos.

                Você acompanha cada lance.

                Seus companheiros continuam lutando pelo resultado.

                O placar permanece 0 a 0.
            `;

        },

        question:
            "Você percebe um companheiro livre e tenta ajudar mesmo fora do campo. O que faz?",

        answers: [

            {
                text:
                    "Grito instruções para ajudar na organização.",

                effects: {

                    teammates: 4,

                    professionalism: 3

                },

                flags: [

                    "supports_from_bench"

                ],

                consequence:
                    "Seus companheiros escutam suas orientações.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Fico em silêncio e observo a partida.",

                effects: {

                    professionalism: 2

                },

                flags: [

                    "observes_from_bench"

                ],

                consequence:
                    "Você acompanha cada movimento tentando entender o que poderia ter feito diferente.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Torço pelos meus companheiros.",

                effects: {

                    teammates: 5,

                    fans: 2

                },

                flags: [

                    "supports_team"

                ],

                consequence:
                    "Os jogadores percebem seu apoio mesmo estando no banco.",

                next:
                    "final_minutes_01"

            },

            {
                text:
                    "Fico irritado por ter sido substituído.",

                effects: {

                    teammates: -2,

                    coach: -2,

                    confidence: -1

                },

                flags: [

                    "angry_on_bench"

                ],

                consequence:
                    "Você prefere não falar com ninguém e acompanha o restante da partida em silêncio.",

                next:
                    "final_minutes_01"

            }

        ]

    },


    /* ====================================================
       GRANDE CHANCE — VERIFICAÇÃO
       ==================================================== */

    {
        id: "goal_check",

        chapter: "decisive",

        title: "O momento decisivo",

        speaker: "Narrador",

        background: "stadium_goal",

        text: (state) => {

            /*
             * SISTEMA SIMPLES DE DESEMPENHO
             *
             * Quanto maior a confiança + relacionamento
             * com o treinador + profissionalismo,
             * maior a chance de a jogada dar certo.
             */

            const performance =
                state.stats.confidence +
                state.stats.coach +
                state.stats.professionalism +
                state.stats.teammates;

            /*
             * Jogadas especialmente boas recebem bônus.
             */

            let bonus = 0;

            if(state.flags.decisive_finish) {
                bonus += 8;
            }

            if(state.flags.dribbles_keeper) {
                bonus += 6;
            }

            if(state.flags.final_selfless_pass) {
                bonus += 7;
            }

            if(state.flags.spectacular_finish) {
                bonus += 4;
            }

            /*
             * Sorte controlada.
             */

            const randomValue =
                Math.floor(Math.random() * 30);

            const finalScore =
                performance +
                bonus +
                randomValue;

            /*
             * Resultado final da jogada.
             */

            if(finalScore >= 75) {

                state.flags.scored_decisive_goal = true;

                return `
                    Você finaliza.

                    Por um instante, parece que o tempo para.

                    A bola encontra o caminho do gol.

                    GOOOOOOOOOL!

                    O estádio explode.

                    Seus companheiros correm em sua direção.

                    O placar muda.

                    1 a 0.
                `;

            }

            if(finalScore >= 55) {

                state.flags.missed_big_chance = true;

                return `
                    Você finaliza.

                    A bola passa pelo goleiro.

                    Mas bate na trave!

                    O estádio inteiro solta um grito coletivo.

                    A bola volta para o campo.

                    A oportunidade passou.
                `;

            }

            state.flags.failed_decisive_chance = true;

            return `
                Você finaliza.

                O goleiro consegue defender.

                A bola sobra para a defesa adversária.

                Você coloca as mãos na cabeça.

                Era a grande oportunidade da partida.
            `;

        },

        question: (state) => {

            if(state.flags.scored_decisive_goal) {

                return "O estádio inteiro grita seu nome. Como você comemora?";

            }

            if(state.flags.missed_big_chance) {

                return "A bola volta para o campo. Você ainda pode continuar na jogada. O que faz?";

            }

            return "O goleiro defendeu. A bola ainda está viva. O que você faz?";

        },

        answers: [

            {
                text: "Corro para comemorar com meus companheiros.",

                effects: {

                    confidence: 6,

                    teammates: 5,

                    fans: 5

                },

                flags: [

                    "celebrates_with_team"

                ],

                consequence:
                    "Você é cercado pelos companheiros. O estádio está em festa.",

                next: "final_minutes_01",

                condition: (state) =>
                    state.flags.scored_decisive_goal

            },

            {
                text: "Comemoro apontando para a torcida.",

                effects: {

                    confidence: 5,

                    fans: 6

                },

                flags: [

                    "celebrates_with_fans"

                ],

                consequence:
                    "Você corre em direção às arquibancadas. A torcida responde imediatamente.",

                next: "final_minutes_01",

                condition: (state) =>
                    state.flags.scored_decisive_goal
            },

            {
                text: "Volto imediatamente para tentar recuperar a bola.",

                effects: {

                    professionalism: 5,

                    teammates: 4,

                    coach: 4

                },

                flags: [

                    "follows_play_after_miss"

                ],

                consequence:
                    "Você não desiste e tenta manter a jogada viva.",

                next: "final_minutes_01",

                condition: (state) =>
                    !state.flags.scored_decisive_goal
            },

            {
                text: "Levanto a cabeça e continuo correndo.",

                effects: {

                    confidence: 4,

                    professionalism: 4

                },

                flags: [

                    "recovers_after_miss"

                ],

                consequence:
                    "Você supera rapidamente a frustração e continua participando do jogo.",

                next: "final_minutes_01",

                condition: (state) =>
                    !state.flags.scored_decisive_goal
            }

        ]

    },


    /* ====================================================
       MINUTOS FINAIS — CENA 01
       ==================================================== */

    {
        id: "final_minutes_01",

        chapter: "final_minutes",

        title: "Aos 88 minutos",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            if(state.flags.scored_decisive_goal) {

                return `
                    O placar mostra 1 a 0.

                    Restam poucos minutos.

                    O adversário agora coloca todos os jogadores
                    no ataque.

                    Sua equipe precisa sobreviver.
                `;

            }

            return `
                O relógio chega aos 88 minutos.

                O placar continua 0 a 0.

                A semifinal está caminhando para a prorrogação.

                Mas o adversário não desistiu.

                Eles avançam com todos os jogadores.
            `;

        },

        question:
            "O adversário começa a pressionar. Como sua equipe deve reagir?",

        answers: [

            {
                text:
                    "Recuamos e protegemos o resultado.",

                effects: {

                    professionalism: 4,

                    coach: 4,

                    teammates: 3

                },

                flags: [

                    "protects_result"

                ],

                consequence:
                    "A equipe fecha os espaços e tenta controlar os últimos minutos.",

                next: "final_minutes_02"

            },

            {
                text:
                    "Continuamos atacando para tentar marcar outro.",

                effects: {

                    confidence: 4,

                    fans: 4,

                    coach: 1

                },

                flags: [

                    "searches_second_goal"

                ],

                consequence:
                    "A equipe mantém alguns jogadores avançados.",

                next: "final_minutes_02"

            },

            {
                text:
                    "Tentamos manter a posse e fazer o relógio correr.",

                effects: {

                    professionalism: 5,

                    teammates: 4,

                    coach: 5

                },

                flags: [

                    "controls_final_minutes"

                ],

                consequence:
                    "A equipe troca passes e tenta diminuir o ritmo da partida.",

                next: "final_minutes_02"

            },

            {
                text:
                    "Pressionamos o adversário ainda no campo deles.",

                effects: {

                    confidence: 4,

                    fans: 5,

                    professionalism: -1

                },

                flags: [

                    "high_press_final"

                ],

                consequence:
                    "Sua equipe sobe as linhas e tenta recuperar a bola rapidamente.",

                next: "final_minutes_02"

            }

        ]

    },
        /* ====================================================
       MINUTOS FINAIS — CENA 02
       A PRESSÃO FINAL
       ==================================================== */

    {
        id: "final_minutes_02",

        chapter: "final_minutes",

        title: "A pressão aumenta",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            if (state.flags.scored_decisive_goal) {

                return `
                    O relógio chega aos 91 minutos.

                    Sua equipe vence por 1 a 0.

                    O adversário coloca praticamente todo o time
                    no campo de ataque.

                    Cada cruzamento parece uma ameaça.

                    O treinador grita para todos manterem
                    a concentração.
                `;

            }

            return `
                O relógio chega aos 91 minutos.

                O placar continua empatado.

                A torcida está nervosa.

                O adversário começa a pressionar cada vez mais.

                A prorrogação está muito próxima.
            `;

        },

        question:
            "A bola chega perigosamente perto da sua área. O que você faz?",

        answers: [

            {
                text:
                    "Volto para ajudar a defesa.",

                effects: {

                    professionalism: 5,

                    coach: 4,

                    teammates: 4

                },

                flags: [

                    "helps_defense_final"

                ],

                consequence:
                    "Você ajuda a fechar o espaço e impede uma linha de passe.",

                next:
                    "final_minutes_03"

            },

            {
                text:
                    "Fico mais avançado esperando um contra-ataque.",

                effects: {

                    confidence: 3,

                    professionalism: -1

                },

                flags: [

                    "waits_final_counter"

                ],

                consequence:
                    "Você permanece pronto para correr assim que sua equipe recuperar a bola.",

                next:
                    "final_minutes_03"

            },

            {
                text:
                    "Peço para todos manterem a calma.",

                effects: {

                    teammates: 5,

                    coach: 3,

                    professionalism: 3

                },

                flags: [

                    "calms_team"

                ],

                consequence:
                    "Sua postura ajuda os companheiros a manterem a concentração.",

                next:
                    "final_minutes_03"

            },

            {
                text:
                    "Tento roubar a bola e iniciar o contra-ataque.",

                effects: {

                    confidence: 4,

                    fans: 3,

                    professionalism: -1

                },

                flags: [

                    "steals_final_ball"

                ],

                consequence:
                    "Você consegue pressionar o adversário e quase recupera a posse.",

                next:
                    "final_minutes_03"

            }

        ]

    },


    /* ====================================================
       MINUTOS FINAIS — CENA 03
       ÚLTIMO ATAQUE
       ==================================================== */

    {
        id: "final_minutes_03",

        chapter: "final_minutes",

        title: "O último ataque",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            if (state.flags.scored_decisive_goal) {

                return `
                    Aos 94 minutos.

                    O adversário cobra um escanteio.

                    Sua equipe consegue afastar.

                    A bola sobra para você.

                    Existe espaço para um último contra-ataque.

                    O estádio inteiro está de pé.
                `;

            }

            return `
                Aos 94 minutos.

                Sua equipe recupera a bola.

                Existe tempo para apenas mais um ataque.

                O estádio inteiro está de pé.

                Todos sabem que pode ser a última jogada
                antes do apito final.
            `;

        },

        question:
            "Você recebe a bola no contra-ataque. Qual é sua decisão?",

        answers: [

            {
                text:
                    "Corro para o ataque e tento decidir a partida.",

                effects: {

                    confidence: 5,

                    fans: 5

                },

                flags: [

                    "final_counter_attack"

                ],

                consequence:
                    "Você dispara pelo campo enquanto os defensores tentam alcançar você.",

                next:
                    "final_chance"

            },

            {
                text:
                    "Seguro a bola e gasto os últimos segundos.",

                effects: {

                    professionalism: 5,

                    coach: 5,

                    teammates: 3

                },

                flags: [

                    "kills_final_seconds"

                ],

                consequence:
                    "Você protege a posse e deixa o relógio correr.",

                next:
                    "final_whistle"

            },

            {
                text:
                    "Passo para um companheiro que está em melhor posição.",

                effects: {

                    teammates: 5,

                    professionalism: 4,

                    coach: 4

                },

                flags: [

                    "final_team_play"

                ],

                consequence:
                    "O companheiro recebe espaço para finalizar.",

                next:
                    "final_chance"

            },

            {
                text:
                    "Tento uma jogada individual para arrancar a vitória.",

                effects: {

                    confidence: 5,

                    fans: 5,

                    teammates: -1

                },

                flags: [

                    "final_individual_play"

                ],

                consequence:
                    "Você encara o último defensor da partida.",

                next:
                    "final_chance"

            }

        ]

    },


    /* ====================================================
       ÚLTIMA CHANCE
       ==================================================== */

    {
        id: "final_chance",

        chapter: "final_chance",

        title: "O último momento",

        speaker: "Narrador",

        background: "stadium_goal",

        text: (state) => {

            const performance =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.teammates +
                state.stats.coach;

            let bonus = 0;

            if (state.flags.final_counter_attack) {
                bonus += 8;
            }

            if (state.flags.final_team_play) {
                bonus += 9;
            }

            if (state.flags.final_individual_play) {
                bonus += 5;
            }

            if (state.flags.decided_game_plan) {
                bonus += 3;
            }

            const randomValue =
                Math.floor(Math.random() * 25);

            const finalScore =
                performance +
                bonus +
                randomValue;

            if (finalScore >= 78) {

                state.flags.final_goal = true;

                return `
                    Você chega perto da área.

                    O defensor tenta bloquear seu caminho.

                    Você encontra um pequeno espaço.

                    A finalização sai.

                    A bola entra!

                    GOOOOOOOOOOL!

                    É o último lance da semifinal.

                    O estádio simplesmente explode.

                    Sua equipe vence.
                `;

            }

            if (finalScore >= 58) {

                state.flags.final_near_goal = true;

                return `
                    Você encontra espaço para finalizar.

                    A bola passa pelo goleiro...

                    mas sai raspando a trave!

                    Não dá tempo para outra tentativa.

                    O árbitro olha para o relógio.
                `;

            }

            state.flags.final_missed = true;

            return `
                Você tenta a finalização.

                O goleiro consegue defender.

                A bola é afastada.

                O árbitro olha para o relógio.

                Não existe mais tempo.
            `;

        },

        question: (state) => {

            if (state.flags.final_goal) {

                return "Você marcou no último lance. O que faz primeiro?";

            }

            if (state.flags.final_near_goal) {

                return "A bola saiu. O árbitro está prestes a encerrar.";

            }

            return "A bola foi defendida. O árbitro está prestes a encerrar.";

        },

        answers: [

            {
                text:
                    "Corro para comemorar com todos.",

                effects: {

                    confidence: 6,

                    teammates: 6,

                    fans: 6

                },

                flags: [

                    "final_goal_celebration"

                ],

                consequence:
                    "Você é cercado pelos companheiros enquanto a torcida comemora.",

                next: "final_whistle",

                condition: (state) =>
                    state.flags.final_goal
            },

            {
                text:
                    "Levanto os braços para a torcida.",

                effects: {

                    confidence: 5,

                    fans: 6

                },

                flags: [

                    "celebrates_final_goal"

                ],

                consequence:
                    "A torcida responde cantando ainda mais alto.",

                next: "final_whistle",

                condition: (state) =>
                    state.flags.final_goal
            },

            {
                text:
                    "Aceito o resultado e volto para minha posição.",

                effects: {

                    professionalism: 4,

                    confidence: 1

                },

                flags: [

                    "accepts_final_result"

                ],

                consequence:
                    "Você mantém a cabeça erguida até o último segundo.",

                next: "final_whistle",

                condition: (state) =>
                    !state.flags.final_goal
            }

        ]

    },


    /* ====================================================
       APITO FINAL
       ==================================================== */

    {
        id: "final_whistle",

        chapter: "ending",

        title: "O apito final",

        speaker: "Narrador",

        background: "stadium_celebration",

        text: (state) => {

            if (
                state.flags.scored_decisive_goal ||
                state.flags.final_goal
            ) {

                return `
                    O árbitro apita.

                    ACABOU!

                    Sua equipe venceu a semifinal.

                    Os jogadores correm para o campo.

                    A torcida está completamente enlouquecida.

                    Você olha para o placar.

                    A sua equipe está classificada para a final
                    da Champions League.

                    E você fez parte disso.
                `;

            }

            return `
                O árbitro apita.

                ACABOU!

                O placar terminou empatado.

                Nenhuma das equipes conseguiu decidir
                a semifinal no tempo regulamentar.

                Os jogadores olham para o banco.

                O treinador já está dando novas instruções.

                A semifinal ainda não terminou.
            `;

        },

        question: (state) => {

            if (
                state.flags.scored_decisive_goal ||
                state.flags.final_goal
            ) {

                return "A equipe está comemorando. O que passa pela sua cabeça?";

            }

            return "A semifinal irá para a prorrogação. Você está pronto?";
        },

        answers: [

            {
                text:
                    "É exatamente para momentos assim que eu jogo futebol.",

                effects: {

                    confidence: 5,

                    fans: 3

                },

                flags: [

                    "embraces_big_moment"

                ],

                consequence:
                    "Você percebe que aquela noite ficará marcada na sua carreira.",

                next: "ending_01",

                condition: (state) =>
                    state.flags.scored_decisive_goal ||
                    state.flags.final_goal
            },

            {
                text:
                    "Ainda não acabou. Precisamos continuar focados.",

                effects: {

                    professionalism: 5,

                    coach: 4,

                    teammates: 3

                },

                flags: [

                    "stays_focused"

                ],

                consequence:
                    "Sua postura mantém a concentração do grupo.",

                next: (state) => {

                    if (
                        state.flags.scored_decisive_goal ||
                        state.flags.final_goal
                    ) {

                        return "ending_01";

                    }

                    return "extra_time_01";

                }

            }

        ]

    },
        /* ====================================================
       PRORROGAÇÃO — CENA 01
       PRIMEIRO TEMPO DA PRORROGAÇÃO
       ==================================================== */

    {
        id: "extra_time_01",

        chapter: "extra_time",

        title: "Mais 30 minutos",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            if (state.stats.confidence >= 20) {

                return `
                    A prorrogação começa.

                    Você está exausto.

                    Mesmo assim, sua confiança continua alta.

                    O treinador olha para você e diz:

                    "Se tiver uma última oportunidade,
                    aproveite."
                `;

            }

            return `
                A prorrogação começa.

                Mais 30 minutos.

                Os jogadores estão completamente exaustos.

                Você respira fundo.

                Ainda existe uma vaga na final da Champions
                esperando por alguém.
            `;

        },

        question:
            "Como você encara os primeiros minutos da prorrogação?",

        answers: [

            {
                text:
                    "Começo com calma e tento economizar energia.",

                effects: {

                    professionalism: 5,

                    confidence: 2

                },

                flags: [

                    "extra_time_careful"

                ],

                consequence:
                    "Você evita corridas desnecessárias e procura se posicionar melhor.",

                next:
                    "extra_time_02"

            },

            {
                text:
                    "Continuo pressionando como se fosse o começo do jogo.",

                effects: {

                    confidence: 4,

                    fans: 3,

                    professionalism: -2

                },

                flags: [

                    "extra_time_aggressive"

                ],

                consequence:
                    "Você tenta pressionar os adversários mesmo com o corpo pedindo descanso.",

                next:
                    "extra_time_02"

            },

            {
                text:
                    "Procuro controlar a posse junto com meus companheiros.",

                effects: {

                    teammates: 4,

                    professionalism: 4,

                    coach: 3

                },

                flags: [

                    "extra_time_possession"

                ],

                consequence:
                    "Sua equipe começa a trocar passes para recuperar o controle da partida.",

                next:
                    "extra_time_02"

            },

            {
                text:
                    "Procuro uma jogada que possa decidir tudo rapidamente.",

                effects: {

                    confidence: 5,

                    fans: 4

                },

                flags: [

                    "extra_time_seeks_goal"

                ],

                consequence:
                    "Você começa a procurar espaços atrás da defesa.",

                next:
                    "extra_time_02"

            }

        ]

    },


    /* ====================================================
       PRORROGAÇÃO — CENA 02
       O CANSAÇO EXTREMO
       ==================================================== */

    {
        id: "extra_time_02",

        chapter: "extra_time",

        title: "O corpo pede descanso",

        speaker: "Narrador",

        background: "stadium_night",

        text: (state) => {

            return `
                Os minutos passam.

                Você sente que suas pernas já não respondem
                da mesma maneira.

                O adversário também está completamente cansado.

                O jogo fica cada vez mais lento.

                Mas a tensão aumenta.
            `;

        },

        question:
            "Você percebe que não consegue manter o mesmo ritmo. O que faz?",

        answers: [

            {
                text:
                    "Administro minha energia e escolho melhor os momentos de correr.",

                effects: {

                    professionalism: 5,

                    coach: 4

                },

                flags: [

                    "manages_extra_energy"

                ],

                consequence:
                    "Você passa a economizar energia para uma possível última jogada.",

                next:
                    "extra_time_03"

            },

            {
                text:
                    "Continuo correndo mesmo estando completamente cansado.",

                effects: {

                    confidence: 4,

                    professionalism: -2

                },

                flags: [

                    "pushes_body"

                ],

                consequence:
                    "Você força seu corpo além do limite.",

                next:
                    "extra_time_03"

            },

            {
                text:
                    "Peço para um companheiro assumir parte das minhas funções.",

                effects: {

                    teammates: 4,

                    professionalism: 3

                },

                flags: [

                    "shares_responsibility"

                ],

                consequence:
                    "Seu companheiro entende e passa a cobrir mais espaço.",

                next:
                    "extra_time_03"

            },

            {
                text:
                    "Tento guardar energia para uma única oportunidade.",

                effects: {

                    confidence: 4,

                    professionalism: 2

                },

                flags: [

                    "saves_for_moment"

                ],

                consequence:
                    "Você diminui sua participação por alguns minutos.",

                next:
                    "extra_time_03"

            }

        ]

    },


    /* ====================================================
       PRORROGAÇÃO — CENA 03
       O ÚLTIMO ESFORÇO
       ==================================================== */

    {
        id: "extra_time_03",

        chapter: "extra_time",

        title: "Uma brecha",

        speaker: "Narrador",

        background: "stadium_attack",

        text: (state) => {

            return `
                Aos 112 minutos.

                O adversário erra um passe no meio-campo.

                Sua equipe recupera a bola.

                Por alguns segundos, a defesa rival fica
                completamente aberta.

                Você vê um corredor livre.
            `;

        },

        question:
            "É talvez a última grande oportunidade. O que você faz?",

        answers: [

            {
                text:
                    "Corro para dentro da área.",

                effects: {

                    confidence: 5,

                    fans: 4

                },

                flags: [

                    "extra_run"

                ],

                consequence:
                    "Você reúne o que ainda resta de energia e dispara para a área.",

                next:
                    "extra_time_04"

            },

            {
                text:
                    "Peço a bola no espaço e tento finalizar de primeira.",

                effects: {

                    confidence: 5,

                    professionalism: 2,

                    fans: 5

                },

                flags: [

                    "extra_first_touch"

                ],

                consequence:
                    "Você pede a bola e se posiciona para finalizar rapidamente.",

                next:
                    "extra_time_04"

            },

            {
                text:
                    "Passo para o companheiro que está mais avançado.",

                effects: {

                    teammates: 5,

                    coach: 4,

                    professionalism: 4

                },

                flags: [

                    "extra_assist_attempt"

                ],

                consequence:
                    "O passe encontra seu companheiro em boa posição.",

                next:
                    "extra_time_04"

            },

            {
                text:
                    "Tento carregar a bola até a área sozinho.",

                effects: {

                    confidence: 5,

                    fans: 5,

                    teammates: -1

                },

                flags: [

                    "extra_individual_run"

                ],

                consequence:
                    "Você avança enquanto três jogadores tentam impedir sua passagem.",

                next:
                    "extra_time_04"

            }

        ]

    },


    /* ====================================================
       PRORROGAÇÃO — CENA 04
       A DECISÃO
       ==================================================== */

    {
        id: "extra_time_04",

        chapter: "extra_time",

        title: "O momento decisivo",

        speaker: "Narrador",

        background: "stadium_goal",

        text: (state) => {

            return `
                A bola chega até você.

                O relógio marca 118 minutos.

                Restam apenas alguns instantes.

                Você olha para o gol.

                O goleiro está preparado.

                Os jogadores ao seu redor mal conseguem correr.

                É agora.
            `;

        },

        question:
            "O que você tenta fazer?",

        answers: [

            {
                text:
                    "Finalizo colocado.",

                effects: {

                    confidence: 5,

                    fans: 5

                },

                flags: [

                    "extra_placed_finish"

                ],

                consequence:
                    "Você procura o canto mais distante do gol.",

                next:
                    "extra_time_goal_check"

            },

            {
                text:
                    "Tento uma finalização forte.",

                effects: {

                    confidence: 4,

                    fans: 4

                },

                flags: [

                    "extra_power_finish"

                ],

                consequence:
                    "Você bate com toda a força que ainda possui.",

                next:
                    "extra_time_goal_check"

            },

            {
                text:
                    "Passo para o companheiro que está livre.",

                effects: {

                    teammates: 5,

                    professionalism: 5,

                    coach: 5

                },

                flags: [

                    "extra_final_pass"

                ],

                consequence:
                    "Você prefere colocar seu companheiro em condição ainda melhor.",

                next:
                    "extra_time_goal_check"

            },

            {
                text:
                    "Tento driblar o goleiro.",

                effects: {

                    confidence: 5,

                    fans: 6

                },

                flags: [

                    "extra_keeper_dribble"

                ],

                consequence:
                    "Você tenta tirar o goleiro completamente da jogada.",

                next:
                    "extra_time_goal_check"

            }

        ]

    },


    /* ====================================================
       PRORROGAÇÃO — VERIFICAÇÃO
       ==================================================== */

    {
        id: "extra_time_goal_check",

        chapter: "extra_time",

        title: "118 minutos",

        speaker: "Narrador",

        background: "stadium_goal",

        text: (state) => {

            const performance =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.teammates +
                state.stats.coach;

            let bonus = 0;

            if (state.flags.extra_placed_finish) {
                bonus += 8;
            }

            if (state.flags.extra_power_finish) {
                bonus += 5;
            }

            if (state.flags.extra_final_pass) {
                bonus += 10;
            }

            if (state.flags.extra_keeper_dribble) {
                bonus += 7;
            }

            if (state.flags.manages_extra_energy) {
                bonus += 4;
            }

            const randomValue =
                Math.floor(Math.random() * 25);

            const score =
                performance +
                bonus +
                randomValue;

            if (score >= 82) {

                state.flags.extra_time_goal = true;

                return `
                    A finalização sai.

                    O goleiro se estica.

                    A bola passa por ele.

                    GOOOOOOOOOL!

                    119 MINUTOS!

                    Sua equipe marca no fim da prorrogação!

                    Os jogadores correm desesperadamente
                    para comemorar.
                `;

            }

            if (score >= 62) {

                state.flags.extra_time_near_goal = true;

                return `
                    Você finaliza.

                    A bola passa pelo goleiro...

                    mas bate na trave!

                    O estádio inteiro grita.

                    Faltam poucos segundos.
                `;

            }

            state.flags.extra_time_missed = true;

            return `
                Você finaliza.

                O goleiro consegue defender.

                A bola é afastada.

                O relógio continua correndo.

                Talvez não exista outra oportunidade.
            `;

        },

        question: (state) => {

            if (state.flags.extra_time_goal) {

                return "Você marcou aos 119 minutos. Como reage?";

            }

            return "A bola foi afastada. Ainda existe uma última jogada.";

        },

        answers: [

            {
                text:
                    "Corro para comemorar com meus companheiros.",

                effects: {

                    confidence: 6,

                    teammates: 6,

                    fans: 6

                },

                flags: [

                    "extra_goal_celebration"

                ],

                consequence:
                    "Todos se abraçam. A equipe está a poucos segundos da final.",

                next:
                    "extra_time_whistle",

                condition: (state) =>
                    state.flags.extra_time_goal
            },

            {
                text:
                    "Levanto os braços para a torcida.",

                effects: {

                    confidence: 5,

                    fans: 6

                },

                flags: [

                    "extra_goal_fans"

                ],

                consequence:
                    "O estádio inteiro responde ao gol.",

                next:
                    "extra_time_whistle",

                condition: (state) =>
                    state.flags.extra_time_goal
            },

            {
                text:
                    "Volto correndo para minha posição.",

                effects: {

                    professionalism: 5,

                    coach: 4

                },

                flags: [

                    "extra_recovers_position"

                ],

                consequence:
                    "Você sabe que ainda precisa defender por alguns segundos.",

                next:
                    "extra_time_whistle",

                condition: (state) =>
                    !state.flags.extra_time_goal
            }

        ]

    },


    /* ====================================================
       PRORROGAÇÃO — APITO FINAL
       ==================================================== */

    {
        id: "extra_time_whistle",

        chapter: "extra_time",

        title: "O último apito",

        speaker: "Narrador",

        background: "stadium_celebration",

        text: (state) => {

            if (state.flags.extra_time_goal) {

                return `
                    O relógio chega aos 120 minutos.

                    O adversário ainda tenta um último ataque.

                    A defesa afasta a bola.

                    O árbitro olha para o relógio.

                    E APITA!

                    ACABOU!

                    SUA EQUIPE ESTÁ NA FINAL!

                    Você olha para o placar.

                    A classificação aconteceu no último minuto
                    da prorrogação.
                `;

            }

            return `
                O relógio chega aos 120 minutos.

                O árbitro olha para o relógio.

                Você escuta o apito.

                ACABOU!

                    Ninguém conseguiu marcar.

                Agora tudo será decidido nos pênaltis.

                Os jogadores se reúnem no meio do campo.

                O treinador começa a escolher os cobradores.
            `;

        },

        question: (state) => {

            if (state.flags.extra_time_goal) {

                return "Sua equipe está classificada. Como você reage?";

            }

            return "O treinador olha para você. Você quer cobrar um pênalti?";

        },

        answers: [

            {
                text:
                    "Quero cobrar. Pode colocar meu nome na lista.",

                effects: {

                    confidence: 5,

                    coach: 3

                },

                flags: [

                    "wants_penalty"

                ],

                consequence:
                    "O treinador coloca seu nome entre os possíveis cobradores.",

                next: "penalty_01",

                condition: (state) =>
                    !state.flags.extra_time_goal
            },

            {
                text:
                    "Prefiro deixar os mais preparados cobrarem.",

                effects: {

                    professionalism: 4,

                    teammates: 3

                },

                flags: [

                    "declines_penalty"

                ],

                consequence:
                    "O treinador respeita sua decisão e monta a lista com outros jogadores.",

                next: "penalty_01",

                condition: (state) =>
                    !state.flags.extra_time_goal
            },

            {
                text:
                    "Vou comemorar com o grupo.",

                effects: {

                    confidence: 5,

                    teammates: 5,

                    fans: 5

                },

                flags: [

                    "celebrates_extra_time"

                ],

                consequence:
                    "Você corre para abraçar seus companheiros.",

                next: "ending_01",

                condition: (state) =>
                    state.flags.extra_time_goal
            }

        ]

    },
        /* ====================================================
       PÊNALTIS — CENA 01
       A LISTA DOS COBRADORES
       ==================================================== */

    {
        id: "penalty_01",

        chapter: "penalties",

        title: "A lista",

        speaker: "Treinador",

        background: "penalty",

        text: (state) => {

            const pressure =
                state.stats.confidence +
                state.stats.coach +
                state.stats.professionalism;

            if (state.flags.wants_penalty) {

                return `
                    O treinador segura a prancheta.

                    Ele olha para os jogadores.

                    Depois olha diretamente para você.

                    "Você disse que queria cobrar."

                    Ele escreve seu nome na lista.

                    Você será um dos cobradores.
                `;

            }

            if (pressure >= 45) {

                return `
                    O treinador começa a escolher os cobradores.

                    Ele procura os jogadores mais preparados
                    para lidar com a pressão.

                    Seu nome aparece entre os primeiros.

                    Mesmo tendo dito que preferia não cobrar,
                    o treinador pergunta novamente.
                `;

            }

            return `
                O treinador monta a lista dos cobradores.

                Você observa os companheiros.

                Seu nome não aparece entre os primeiros.

                Talvez você não precise participar das cobranças.
            `;

        },

        question: (state) => {

            if (state.flags.wants_penalty) {

                return "Você será um dos cobradores. Como se prepara?";

            }

            return "O treinador pergunta novamente se você está disposto a cobrar.";

        },

        answers: [

            {
                text:
                    "Respiro fundo e começo a me concentrar.",

                effects: {

                    confidence: 4,

                    professionalism: 4

                },

                flags: [

                    "prepares_for_penalty"

                ],

                consequence:
                    "Você tenta ignorar o barulho do estádio e se concentra apenas na cobrança.",

                next: "penalty_02"

            },

            {
                text:
                    "Olho para o goleiro adversário.",

                effects: {

                    confidence: 4,

                    professionalism: 2

                },

                flags: [

                    "studies_keeper"

                ],

                consequence:
                    "Você tenta entender os movimentos do goleiro.",

                next: "penalty_02"
            },

            {
                text:
                    "Converso rapidamente com um companheiro.",

                effects: {

                    teammates: 4,

                    confidence: 2

                },

                flags: [

                    "talks_before_penalty"

                ],

                consequence:
                    "Seu companheiro tenta tranquilizar você.",

                next: "penalty_02"
            },

            {
                text:
                    "Digo que quero cobrar o último pênalti.",

                effects: {

                    confidence: 6,

                    coach: 3,

                    fans: 3

                },

                flags: [

                    "asks_last_penalty"

                ],

                consequence:
                    "O treinador olha para você por alguns segundos e anota seu pedido.",

                next: "penalty_02"
            }

        ]

    },


    /* ====================================================
       PÊNALTIS — CENA 02
       PRIMEIRAS COBRANÇAS
       ==================================================== */

    {
        id: "penalty_02",

        chapter: "penalties",

        title: "A disputa começa",

        speaker: "Narrador",

        background: "penalty",

        text: `
            O primeiro cobrador caminha até a marca da cal.

            O estádio inteiro fica em silêncio.

            Ele bate.

            GOL.

            A disputa começa.

            O segundo jogador também marca.

            O adversário responde.

            Depois de algumas cobranças, tudo continua
            equilibrado.
        `,

        question:
            "Você acompanha tudo da linha do meio-campo. Como controla a pressão?",

        answers: [

            {
                text:
                    "Foco apenas na minha própria cobrança.",

                effects: {

                    confidence: 5,

                    professionalism: 4

                },

                flags: [

                    "focuses_penalty"
                ],

                consequence:
                    "Você ignora o que acontece ao redor e pensa apenas na sua cobrança.",

                next: "penalty_03"
            },

            {
                text:
                    "Observo todos os cobradores.",

                effects: {

                    professionalism: 4,

                    confidence: 2

                },

                flags: [

                    "observes_penalties"
                ],

                consequence:
                    "Você percebe como os jogadores estão lidando com a pressão.",

                next: "penalty_03"
            },

            {
                text:
                    "Tento conversar com os companheiros para acalmá-los.",

                effects: {

                    teammates: 5,

                    confidence: 2

                },

                flags: [

                    "supports_penalty_team"
                ],

                consequence:
                    "Sua atitude ajuda a equipe a permanecer concentrada.",

                next: "penalty_03"
            },

            {
                text:
                    "Fico andando de um lado para o outro.",

                effects: {

                    confidence: -1,

                    professionalism: -1

                },

                flags: [

                    "nervous_penalty"
                ],

                consequence:
                    "Você tenta controlar a ansiedade enquanto espera sua vez.",

                next: "penalty_03"
            }

        ]

    },


    /* ====================================================
       PÊNALTIS — CENA 03
       SUA VEZ
       ==================================================== */

    {
        id: "penalty_03",

        chapter: "penalties",

        title: "Sua vez",

        speaker: "Narrador",

        background: "penalty",

        text: (state) => {

            return `
                O treinador chama seu nome.

                É a sua vez.

                Você caminha lentamente até a marca do pênalti.

                O estádio parece muito maior agora.

                O goleiro adversário está diante de você.

                Você coloca a bola no lugar.

                Silêncio.
            `;

        },

        question:
            "Como você decide bater?",

        answers: [

            {
                text:
                    "No canto esquerdo.",

                effects: {

                    confidence: 4

                },

                flags: [

                    "penalty_left"
                ],

                consequence:
                    "Você escolhe o canto esquerdo antes de começar a corrida.",

                next: "penalty_04"
            },

            {
                text:
                    "No canto direito.",

                effects: {

                    confidence: 4

                },

                flags: [

                    "penalty_right"
                ],

                consequence:
                    "Você escolhe o canto direito.",

                next: "penalty_04"
            },

            {
                text:
                    "No meio.",

                effects: {

                    confidence: 5,

                    fans: 4

                },

                flags: [

                    "penalty_center"
                ],

                consequence:
                    "Você decide arriscar uma cobrança no meio.",

                next: "penalty_04"
            },

            {
                text:
                    "Espero o goleiro se mexer.",

                effects: {

                    confidence: 5,

                    professionalism: 3

                },

                flags: [

                    "penalty_waits_keeper"
                ],

                consequence:
                    "Você decide esperar o movimento do goleiro.",

                next: "penalty_04"
            }

        ]

    },


    /* ====================================================
       PÊNALTIS — CENA 04
       A COBRANÇA
       ==================================================== */

    {
        id: "penalty_04",

        chapter: "penalties",

        title: "A cobrança",

        speaker: "Narrador",

        background: "penalty_goal",

        text: (state) => {

            const performance =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.coach;

            let bonus = 0;

            if (state.flags.focuses_penalty) {
                bonus += 7;
            }

            if (state.flags.prepares_for_penalty) {
                bonus += 5;
            }

            if (state.flags.studies_keeper) {
                bonus += 4;
            }

            if (state.flags.penalty_waits_keeper) {
                bonus += 6;
            }

            const randomValue =
                Math.floor(Math.random() * 25);

            const score =
                performance +
                bonus +
                randomValue;

            if (score >= 68) {

                state.flags.penalty_scored = true;

                return `
                    Você respira fundo.

                    Dá alguns passos para trás.

                    Corre.

                    Bate na bola.

                    O goleiro pula para um lado.

                    A bola vai para o outro.

                    GOOOOOOL!

                    Você converte a cobrança.
                `;

            }

            if (score >= 50) {

                state.flags.penalty_saved = true;

                return `
                    Você corre.

                    Bate na bola.

                    O goleiro escolhe o lado certo.

                    Ele defende!

                    O estádio explode.

                    Você fica parado por alguns segundos.
                `;

            }

            state.flags.penalty_missed = true;

            return `
                Você corre para a bola.

                A cobrança sai.

                Mas a bola passa longe do gol.

                Você fecha os olhos por um instante.

                A disputa continua.
            `;

        },

        question: (state) => {

            if (state.flags.penalty_scored) {

                return "Você marcou. Como reage?";

            }

            if (state.flags.penalty_saved) {

                return "O goleiro defendeu. Como você reage?";

            }

            return "Você perdeu a cobrança. O que faz agora?";

        },

        answers: [

            {
                text:
                    "Comemoro rapidamente e volto para os companheiros.",

                effects: {

                    confidence: 5,

                    teammates: 4,

                    fans: 4

                },

                flags: [

                    "penalty_goal_reaction"
                ],

                consequence:
                    "Você volta imediatamente para acompanhar o restante da disputa.",

                next: "penalty_05",

                condition: (state) =>
                    state.flags.penalty_scored
            },

            {
                text:
                    "Fico alguns segundos parado, tentando processar.",

                effects: {

                    confidence: -1,

                    professionalism: 2

                },

                flags: [

                    "penalty_miss_reaction"
                ],

                consequence:
                    "Você respira fundo e tenta recuperar a concentração.",

                next: "penalty_05",

                condition: (state) =>
                    !state.flags.penalty_scored
            }

        ]

    },


    /* ====================================================
       PÊNALTIS — CENA 05
       RESULTADO DA DISPUTA
       ==================================================== */

    {
        id: "penalty_05",

        chapter: "penalties",

        title: "A última cobrança",

        speaker: "Narrador",

        background: "penalty",

        text: (state) => {

            const penaltyPerformance =
                state.stats.confidence +
                state.stats.coach +
                state.stats.professionalism +
                state.stats.teammates;

            const randomValue =
                Math.floor(Math.random() * 20);

            const finalPenaltyScore =
                penaltyPerformance +
                randomValue;

            /*
             * Caso o jogador tenha convertido seu pênalti
             * e tenha bons atributos, a equipe tem maior
             * chance de avançar.
             */

            if (
                state.flags.penalty_scored &&
                finalPenaltyScore >= 55
            ) {

                state.flags.won_penalties = true;

                return `
                    As últimas cobranças acontecem.

                    Um jogador adversário perde.

                    Sua equipe marca.

                    O próximo jogador adversário precisa marcar
                    para manter a disputa viva.

                    Ele corre.

                    Bate.

                    DEFESA!

                    ACABOU!

                    SUA EQUIPE ESTÁ NA FINAL!
                `;

            }

            if (finalPenaltyScore >= 42) {

                state.flags.penalties_continue = true;

                return `
                    As cobranças continuam.

                    Ninguém consegue abrir vantagem suficiente.

                    A disputa entra nas cobranças alternadas.

                    Agora cada chute pode decidir tudo.
                `;

            }

            state.flags.lost_penalties = true;

            return `
                O adversário converte a última cobrança.

                    O silêncio toma conta do estádio.

                Sua equipe lutou até o último instante.

                Mas a classificação ficou com eles.
            `;

        },

        question: (state) => {

            if (state.flags.won_penalties) {

                return "Sua equipe está na final. O que você sente?";

            }

            if (state.flags.penalties_continue) {

                return "A disputa continua. Você está disposto a cobrar novamente?";

            }

            return "A temporada europeia termina aqui. Como você reage?";

        },

        answers: [

            {
                text:
                    "Eu sabia que conseguiríamos.",

                effects: {

                    confidence: 6,

                    fans: 5,

                    teammates: 5

                },

                flags: [

                    "celebrates_penalty_win"
                ],

                consequence:
                    "Você comemora com seus companheiros.",

                next: "ending_01",

                condition: (state) =>
                    state.flags.won_penalties
            },

            {
                text:
                    "Quero cobrar novamente.",

                effects: {

                    confidence: 5,

                    coach: 3

                },

                flags: [

                    "ready_for_more_penalties"
                ],

                consequence:
                    "Você se coloca novamente à disposição.",

                next: "penalty_sudden_death",

                condition: (state) =>
                    state.flags.penalties_continue
            },

            {
                text:
                    "Aceito o resultado e apoio meus companheiros.",

                effects: {

                    professionalism: 5,

                    teammates: 4

                },

                flags: [

                    "accepts_penalty_loss"
                ],

                consequence:
                    "Você se aproxima dos companheiros e tenta manter o grupo unido.",

                next: "ending_02",

                condition: (state) =>
                    state.flags.lost_penalties
            }

        ]

    },


    /* ====================================================
       PÊNALTIS — MORTE SÚBITA
       ==================================================== */

    {
        id: "penalty_sudden_death",

        chapter: "penalties",

        title: "Morte súbita",

        speaker: "Narrador",

        background: "penalty",

        text: `
            A disputa entra na morte súbita.

            Agora não existe mais margem para erro.

            Um gol pode colocar sua equipe na final.

            Uma defesa pode acabar com tudo.

            O treinador olha para você.
        `,

        question:
            "Você está disposto a assumir a responsabilidade?",

        answers: [

            {
                text:
                    "Sim. Quero bater novamente.",

                effects: {

                    confidence: 6,

                    coach: 4

                },

                flags: [

                    "takes_sudden_death"
                ],

                consequence:
                    "Você caminha novamente em direção à marca do pênalti.",

                next: "penalty_sudden_death_check"
            },

            {
                text:
                    "Prefiro que outro jogador bata.",

                effects: {

                    professionalism: 3,

                    teammates: 2

                },

                flags: [

                    "refuses_sudden_death"
                ],

                consequence:
                    "Outro companheiro assume a responsabilidade.",

                next: "penalty_sudden_death_check"
            }

        ]

    },


    /* ====================================================
       MORTE SÚBITA — RESULTADO
       ==================================================== */

    {
        id: "penalty_sudden_death_check",

        chapter: "penalties",

        title: "Tudo ou nada",

        speaker: "Narrador",

        background: "penalty_goal",

        text: (state) => {

            const score =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.coach +
                Math.floor(Math.random() * 25);

            if (
                state.flags.takes_sudden_death &&
                score >= 55
            ) {

                state.flags.sudden_death_goal = true;

                return `
                    Você corre.

                    Bate.

                    GOOOOOOL!

                    O goleiro foi para o outro lado.

                    Agora o adversário precisa marcar.

                    O cobrador adversário corre.

                    Bate.

                    O goleiro defende!

                    ACABOU!

                    SUA EQUIPE ESTÁ NA FINAL!
                `;

            }

            if (score >= 45) {

                state.flags.sudden_death_continue = true;

                return `
                    A cobrança é convertida.

                    O adversário também marca.

                    A disputa continua.

                    Ninguém consegue decidir.
                `;

            }

            state.flags.sudden_death_loss = true;

            return `
                A cobrança não entra.

                O adversário tem a oportunidade de decidir.

                Eles marcam.

                O estádio explode.

                Sua equipe está eliminada.
            `;

        },

        question: (state) => {

            if (state.flags.sudden_death_goal) {

                return "Você acabou de colocar sua equipe na final. Como reage?";

            }

            if (state.flags.sudden_death_continue) {

                return "A disputa continua. Você ainda acredita na classificação?";

            }

            return "A eliminação aconteceu. O que você faz?";

        },

        answers: [

            {
                text:
                    "Comemoro com meus companheiros.",

                effects: {

                    confidence: 6,

                    teammates: 6,

                    fans: 6

                },

                flags: [

                    "sudden_death_celebration"
                ],

                consequence:
                    "Você é carregado pelos companheiros.",

                next: "ending_01",

                condition: (state) =>
                    state.flags.sudden_death_goal
            },

            {
                text:
                    "Continuo acreditando até o fim.",

                effects: {

                    confidence: 5,

                    teammates: 4

                },

                flags: [

                    "believes_until_end"
                ],

                consequence:
                    "Você mantém a cabeça erguida enquanto a disputa continua.",

                next: "penalty_sudden_death",

                condition: (state) =>
                    state.flags.sudden_death_continue
            },

            {
                text:
                    "Vou até meus companheiros imediatamente.",

                effects: {

                    professionalism: 5,

                    teammates: 5

                },

                flags: [

                    "supports_after_elimination"
                ],

                consequence:
                    "Você não deixa ninguém sozinho após a eliminação.",

                next: "ending_02",

                condition: (state) =>
                    state.flags.sudden_death_loss
            }

        ]

    },
        /* ====================================================
       FINAL 01
       CLASSIFICADO — GRANDE DESTAQUE
       ==================================================== */

    {
        id: "ending_01",

        chapter: "ending",

        title: "A noite que mudou tudo",

        speaker: "Narrador",

        background: "stadium_celebration",

        text: (state) => {

            const performance =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.coach +
                state.stats.teammates +
                state.stats.fans;

            if (performance >= 95) {

                return `
                    O estádio ainda está em festa.

                    Seus companheiros comemoram ao seu redor.

                    Você olha para as arquibancadas.

                    Algumas horas atrás, você era apenas o
                    novo contratado do clube.

                    Agora, você acabou de ajudar sua equipe
                    a chegar à final da Champions League.

                    O treinador se aproxima.

                    Ele coloca a mão no seu ombro.

                    "Agora você entende por que eu trouxe você."

                    Você não responde.

                    Apenas olha para o campo.

                    Aquela noite mudou completamente a forma
                    como todos enxergam você.
                `;

            }

            if (performance >= 70) {

                return `
                    O apito final ecoa pelo estádio.

                    SUA EQUIPE ESTÁ NA FINAL!

                    Você abraça seus companheiros.

                    Não foi uma partida perfeita.

                    Houve erros.

                    Houve momentos de dúvida.

                    Mas você conseguiu permanecer importante
                    quando a equipe mais precisava.

                    O treinador passa por você e faz um sinal
                    positivo.

                    "Boa partida."

                    Duas palavras.

                    Mas você sabe o peso que elas têm.
                `;

            }

            return `
                O estádio comemora.

                Sua equipe está classificada.

                Você participou da caminhada até a final.

                Talvez sua atuação não tenha sido perfeita.

                Talvez algumas decisões tenham dado errado.

                Mas, no futebol, poucas coisas importam mais
                do que estar no lugar certo quando a história
                é escrita.

                E você estava lá.
            `;

        },

        question:
            "Depois da comemoração, você recebe uma mensagem do treinador.",

        answers: [

            {
                text:
                    "Abro imediatamente.",

                effects: {

                    confidence: 3,

                    coach: 3

                },

                flags: [

                    "reads_coach_message"

                ],

                consequence:
                    "Você descobre que o treinador quer conversar antes do próximo treino.",

                next: "ending_03"
            },

            {
                text:
                    "Primeiro vou comemorar com meus companheiros.",

                effects: {

                    teammates: 4,

                    fans: 2

                },

                flags: [

                    "celebrates_before_message"

                ],

                consequence:
                    "Você aproveita o momento com o grupo antes de pensar no futuro.",

                next: "ending_03"
            }

        ]

    },


    /* ====================================================
       FINAL 02
       ELIMINAÇÃO
       ==================================================== */

    {
        id: "ending_02",

        chapter: "ending",

        title: "O fim da caminhada",

        speaker: "Narrador",

        background: "stadium_empty",

        text: (state) => {

            if (state.stats.professionalism >= 20) {

                return `
                    O estádio começa a ficar vazio.

                    Você permanece alguns segundos no gramado.

                    A eliminação dói.

                    Muito.

                    Mas você olha para seus companheiros.

                    Alguns estão frustrados.

                    Outros ainda tentam entender o que aconteceu.

                    Você se aproxima deles.

                    Não existe tempo para procurar culpados.

                    Amanhã será outro dia.

                    E essa experiência vai fazer parte
                    da sua história.
                `;

            }

            if (state.stats.confidence <= 5) {

                return `
                    O estádio começa a esvaziar.

                    Você sente a frustração.

                    A oportunidade de chegar à final acabou.

                    Algumas decisões da partida ficam
                    passando pela sua cabeça.

                    Mas uma coisa é certa:

                    sua história nesse clube ainda está
                    apenas começando.
                `;

            }

            return `
                O árbitro encerra a partida.

                Sua equipe está eliminada.

                Você olha para o gramado enquanto os
                adversários comemoram.

                Não era o resultado que você queria.

                Mas a temporada ainda não acabou.

                Existe muito futebol pela frente.
            `;

        },

        question:
            "No vestiário, o treinador reúne o grupo.",

        answers: [

            {
                text:
                    "Escuto tudo que ele tem para dizer.",

                effects: {

                    professionalism: 5,

                    coach: 3

                },

                flags: [

                    "listens_after_loss"

                ],

                consequence:
                    "Você presta atenção em cada palavra.",

                next: "ending_04"
            },

            {
                text:
                    "Converso com meus companheiros.",

                effects: {

                    teammates: 5

                },

                flags: [

                    "supports_after_loss"

                ],

                consequence:
                    "Você ajuda a manter o grupo unido.",

                next: "ending_04"
            },

            {
                text:
                    "Fico sozinho pensando no jogo.",

                effects: {

                    confidence: -1,

                    professionalism: 2

                },

                flags: [

                    "reflects_after_loss"

                ],

                consequence:
                    "Você tenta entender tudo que aconteceu.",

                next: "ending_04"
            }

        ]

    },


    /* ====================================================
       FINAL 03
       A CONVERSA COM O TREINADOR
       ==================================================== */

    {
        id: "ending_03",

        chapter: "ending",

        title: "Uma conversa importante",

        speaker: "Treinador",

        background: "locker_room",

        text: (state) => {

            if (state.stats.coach >= 20) {

                return `
                    O treinador espera você no corredor.

                    "Eu sabia que você conseguiria."

                    Ele mostra algumas imagens da partida
                    no tablet.

                    "Olha essa movimentação."

                    "Foi exatamente o que treinamos."

                    Você percebe que ganhou algo importante:

                    a confiança dele.
                `;

            }

            if (state.stats.coach <= 5) {

                return `
                    O treinador chama você.

                    Ele não parece satisfeito.

                    "Você tem talento."

                    Ele faz uma pausa.

                    "Mas talento sozinho não ganha uma
                    semifinal."

                    Você sabe que ainda precisa provar
                    algumas coisas.
                `;

            }

            return `
                O treinador chama você.

                "Boa partida."

                Ele mostra algumas jogadas no tablet.

                "Você tomou boas decisões hoje."

                Depois ele olha diretamente para você.

                "Mas a final será diferente."

                Você percebe que o trabalho ainda está
                apenas começando.
            `;

        },

        question:
            "O treinador pergunta qual é seu objetivo para a final.",

        answers: [

            {
                text:
                    "Quero ser titular.",

                effects: {

                    confidence: 5,

                    coach: 2

                },

                flags: [

                    "wants_start_final"
                ],

                consequence:
                    "O treinador sorri discretamente.",

                next: "ending_04"
            },

            {
                text:
                    "Quero ajudar a equipe, seja como for.",

                effects: {

                    professionalism: 5,

                    teammates: 3,

                    coach: 4

                },

                flags: [

                    "team_first_final"
                ],

                consequence:
                    "O treinador parece satisfeito com sua resposta.",

                next: "ending_04"
            },

            {
                text:
                    "Quero ser o jogador decisivo da final.",

                effects: {

                    confidence: 6,

                    fans: 3,

                    coach: -1

                },

                flags: [

                    "wants_to_be_star"
                ],

                consequence:
                    "O treinador apenas responde: 'Então prove.'",

                next: "ending_04"
            }

        ]

    },


    /* ====================================================
       FINAL 04
       ENCERRAMENTO DO CAPÍTULO
       ==================================================== */

    {
        id: "ending_04",

        chapter: "ending",

        title: "O próximo desafio",

        speaker: "Narrador",

        background: "city_night",

        text: (state) => {

            const total =
                state.stats.confidence +
                state.stats.professionalism +
                state.stats.teammates +
                state.stats.coach +
                state.stats.fans;

            if (total >= 110) {

                return `
                    Mais tarde naquela noite.

                    Você chega ao hotel.

                    As luzes da cidade aparecem pela janela.

                    Seu celular não para de receber mensagens.

                    Torcedores.

                    Companheiros.

                    Amigos.

                    Jornalistas.

                    Todos estão falando sobre a partida.

                    Você coloca o celular sobre a mesa.

                    A final da Champions League está esperando.

                    E, pela primeira vez desde que chegou
                    ao clube, você sente:

                    "Eu pertenço a este lugar."
                `;

            }

            if (total >= 80) {

                return `
                    Mais tarde naquela noite.

                    Você volta para o hotel.

                    A classificação ainda parece surreal.

                    Você sabe que cometeu erros.

                    Também sabe que tomou decisões importantes.

                    Agora existe apenas uma coisa na sua cabeça:

                    a final.

                    A maior partida da sua jovem carreira
                    está cada vez mais perto.
                `;

            }

            return `
                A noite termina.

                Você está cansado.

                Mas sabe que acabou de viver uma experiência
                que vai carregar pelo resto da temporada.

                A semifinal acabou.

                Agora começa a preparação para o próximo
                desafio.

                A FINAL.
            `;

        },

        question:
            "FIM DO CAPÍTULO 1",

        answers: [

            {
                text:
                    "Continuar",

                effects: {},

                flags: [

                    "chapter_one_complete"
                ],

                consequence:
                    "O primeiro capítulo da sua carreira termina aqui.",

                next: "game_complete"
            }

        ]

    },


    /* ====================================================
       FINAL DO JOGO / CAPÍTULO
       ==================================================== */

    {
        id: "game_complete",

        chapter: "complete",

        title: "Fim do Capítulo 1",

        speaker: "Narrador",

        background: "city_night",

        text: (state) => {

    return `
        CAPÍTULO 1 CONCLUÍDO.

        Você chegou ao clube.

        Conheceu seus companheiros.

        Ganhou ou perdeu a batalha pela titularidade.

        Jogou uma semifinal de Champions League.

        Tomou decisões.

        Errou.

        Acertou.

        Cada escolha ajudou a construir
        o jogador que você está se tornando.

        ─────────────────────────

        A PRIMEIRA PARTE DA SUA CARREIRA
        TERMINA AQUI.

        MAIS CAPÍTULOS DESSA GRANDE
        HISTÓRIA EM BREVE.

        A sua carreira está apenas começando.
    `;

},

        question:
            "Você chegou ao final deste capítulo.",

        answers: [

            {
                text:
                    "Recomeçar",

                effects: {},

                flags: [],

                consequence:
                    "Reiniciando sua carreira...",

                next: "restart"
            }

        ]

    },


    /* ====================================================
       REINÍCIO
       ==================================================== */

    {
        id: "restart",

        chapter: "system",

        title: "Novo começo",

        speaker: "Sistema",

        background: "stadium",

        text: `
            Uma nova carreira começa.

            Suas decisões serão diferentes.

            Seu destino também pode ser.
        `,

        question:
            "Pronto para tentar novamente?",

        answers: [

            {
                text:
                    "Começar novamente",

                effects: {},

                flags: [],

                consequence:
                    "Nova carreira iniciada.",

                next: "intro"
            }

  
  
        ]
},


    /* =========================================================
   PRIMEIRA SEMANA — CHEGADA AO CLUBE
   ========================================================= */


/* =========================================================
   CENA 01 — INTRO
   ========================================================= */

{
    id: "intro",

    chapter: 1,

    background: "stadium_day",

    speaker: "NARRADOR",

    title: "Uma nova oportunidade",

    text: `
        Você ainda tenta entender a dimensão do que acabou
        de acontecer.

        Há poucos dias, você era apenas mais um jogador
        tentando conquistar seu espaço.

        Agora, você acaba de assinar com um dos maiores
        clubes da Europa.

        E o momento não poderia ser mais intenso.

        Faltam poucos dias para a semifinal da Champions.

        E o treinador ainda não decidiu quem começará jogando.
    `,

    question:
        "Como você encara esse primeiro momento?",

    answers: [

        {
            text:
                "Entrar no clube com confiança e mostrar que pertence a esse nível.",

            effects: {

                confidence: 3,

                professionalism: 1

            },

            consequence:
                "Você chega confiante e deixa uma primeira impressão positiva.",

            next:
                "club_arrival"

        },

        {
            text:
                "Manter a cabeça baixa e observar tudo antes de agir.",

            effects: {

                professionalism: 3,

                confidence: 1

            },

            consequence:
                "Você prefere entender o ambiente antes de se expor.",

            next:
                "club_arrival"

        },

        {
            text:
                "Pensar imediatamente na semifinal e na possibilidade de ser titular.",

            effects: {

                confidence: 2,

                coach: -1

            },

            consequence:
                "A ambição fala mais alto, mas você sabe que ainda precisa provar seu valor.",

            next:
                "club_arrival"

        }

    ]

},


/* =========================================================
   CENA 02 — CHEGADA AO CLUBE
   ========================================================= */

{
    id: "club_arrival",

    chapter: 1,

    background: "training_ground",

    speaker: "NARRADOR",

    title: "Primeiro dia",

    text: `
        O carro para diante do centro de treinamento.

        Você olha pela janela e vê os campos perfeitamente
        cuidados, os prédios do clube e alguns jogadores
        chegando para o treino.

        É diferente de tudo que você já viveu.

        Um funcionário do clube abre a porta e sorri.

        "Bem-vindo."
    `,

    question:
        "Qual é sua primeira atitude?",

    answers: [

        {
            text:
                "Cumprimentar todos que encontrar.",

            effects: {

                teammates: 3,

                professionalism: 1

            },

            consequence:
                "Você começa a criar conexões desde o primeiro minuto.",

            next:
                "locker_room"

        },

        {
            text:
                "Ir direto para o vestiário e se preparar para o treino.",

            effects: {

                professionalism: 3,

                teammates: 0

            },

            consequence:
                "Você demonstra foco total no trabalho.",

            next:
                "locker_room"

        },

        {
            text:
                "Parar alguns segundos para observar o centro de treinamento.",

            effects: {

                confidence: 1,

                professionalism: 2

            },

            consequence:
                "Você absorve o momento antes de entrar no novo ambiente.",

            next:
                "locker_room"

        }

    ]

},


/* =========================================================
   CENA 03 — VESTIÁRIO
   ========================================================= */

{
    id: "locker_room",

    chapter: 1,

    background: "locker_room",

    speaker: "NARRADOR",

    title: "O novo vestiário",

    text: `
        Ao entrar no vestiário, você encontra seu novo lugar.

        Seu nome está escrito no armário.

        Por alguns segundos, você simplesmente fica olhando.

        Então alguém se aproxima.

        "Você é o novo reforço, certo?"
        
        É um dos jogadores mais experientes do elenco.
    `,

    question:
        "Como você responde?",

    answers: [

        {
            text:
                "Sim. Espero poder ajudar o time.",

            effects: {

                teammates: 3,

                professionalism: 1

            },

            consequence:
                "Sua humildade agrada aos jogadores mais experientes.",

            flags: [

                "humble_arrival"

            ],

            next:
                "training_first"

        },

        {
            text:
                "Sim. Vim para disputar meu espaço.",

            effects: {

                confidence: 3,

                teammates: -1

            },

            consequence:
                "Sua confiança chama atenção imediatamente.",

            flags: [

                "confident_arrival"

            ],

            next:
                "training_first"

        },

        {
            text:
                "Sim. Estou muito feliz por estar aqui.",

            effects: {

                teammates: 2,

                confidence: 2

            },

            consequence:
                "Sua atitude aberta facilita a aproximação com o grupo.",

            next:
                "training_first"

        }

    ]

},


/* =========================================================
   CENA 04 — PRIMEIRO TREINO
   ========================================================= */

{
    id: "training_first",

    chapter: 1,

    background: "training_ground",

    speaker: "NARRADOR",

    title: "Primeiro treino",

    text: `
        O treino começa.

        Tudo acontece em uma velocidade diferente.

        Os passes são mais rápidos.
        As decisões precisam ser imediatas.
        Cada erro parece chamar atenção.

        Você percebe que não está mais em um ambiente
        onde pode simplesmente esperar uma oportunidade.

        Aqui, você precisa conquistá-la.
    `,

    question:
        "Como você decide encarar o treino?",

    answers: [

        {
            text:
                "Jogar com intensidade máxima desde o primeiro minuto.",

            effects: {

                confidence: 3,

                professionalism: 2

            },

            consequence:
                "Sua intensidade chama atenção durante o treino.",

            flags: [

                "intense_training"

            ],

            next:
                "coach_observation"

        },

        {
            text:
                "Priorizar decisões simples e evitar erros.",

            effects: {

                professionalism: 3,

                confidence: 1

            },

            consequence:
                "Você demonstra segurança e disciplina.",

            next:
                "coach_observation"

        },

        {
            text:
                "Tentar jogadas difíceis para impressionar.",

            effects: {

                confidence: 4,

                professionalism: -1

            },

            consequence:
                "Algumas jogadas funcionam. Outras nem tanto.",

            flags: [

                "risk_taker"

            ],

            next:
                "coach_observation"

        }

    ]

},


/* =========================================================
   CENA 05 — OLHAR DO TREINADOR
   ========================================================= */

{
    id: "coach_observation",

    chapter: 1,

    background: "training_ground",

    speaker: "TREINADOR",

    title: "Sob observação",

    text: `
        Durante uma pausa no treino, você percebe o treinador
        observando o campo.

        Ele conversa rapidamente com um dos auxiliares.

        Depois olha novamente para você.

        Você não consegue ouvir o que estão dizendo.

        Mas uma coisa fica clara:

        você está sendo avaliado.
    `,

    question:
        "Você tenta chamar a atenção do treinador?",

    answers: [

        {
            text:
                "Sim. Vou buscar participar mais das jogadas.",

            effects: {

                coach: 3,

                confidence: 2

            },

            consequence:
                "O treinador começa a observar suas decisões com mais atenção.",

            next:
                "coach_conversation"

        },

        {
            text:
                "Não. Vou continuar fazendo meu trabalho normalmente.",

            effects: {

                coach: 2,

                professionalism: 3

            },

            consequence:
                "Sua disciplina chama atenção sem que você precise forçar nada.",

            next:
                "coach_conversation"

        },

        {
            text:
                "Vou tentar uma jogada individual para mostrar meu talento.",

            effects: {

                confidence: 3,

                coach: 1,

                professionalism: -1

            },

            consequence:
                "O treinador percebe seu talento, mas também sua ousadia.",

            next:
                "coach_conversation"

        }

    ]

},


/* =========================================================
   CENA 06 — CONVERSA COM O TREINADOR
   ========================================================= */

{
    id: "coach_conversation",

    chapter: 1,

    background: "coach_office",

    speaker: "TREINADOR",

    title: "A conversa",

    text: `
        Depois do treino, um membro da comissão técnica
        pede para você esperar.

        Alguns minutos depois, o treinador entra.

        Ele fecha a porta e senta à sua frente.

        "Vou ser direto."

        "Temos uma semifinal em poucos dias."

        "Ainda não decidi quem vai começar."

        Ele faz uma pausa.

        "Você terá uma oportunidade."
    `,

    question:
        "O que você responde?",

    answers: [

        {
            text:
                "Vou trabalhar para estar pronto quando o senhor precisar.",

            effects: {

                coach: 4,

                professionalism: 3

            },

            consequence:
                "O treinador aprova sua postura profissional.",

            flags: [

                "coach_trust_early"

            ],

            next:
                "press_attention"

        },

        {
            text:
                "Quero começar jogando. Vou provar que mereço.",

            effects: {

                confidence: 4,

                coach: 1

            },

            consequence:
                "O treinador percebe sua ambição.",

            flags: [

                "ambitious"

            ],

            next:
                "press_attention"

        },

        {
            text:
                "Estou pronto. Pode confiar em mim.",

            effects: {

                confidence: 3,

                coach: 3

            },

            consequence:
                "Sua confiança transmite segurança ao treinador.",

            flags: [

                "coach_confidence"

            ],

            next:
                "press_attention"

        }

    ]

},


/* =========================================================
   CENA 07 — IMPRENSA
   ========================================================= */

{
    id: "press_attention",

    chapter: 2,

    background: "press_room",

    speaker: "NARRADOR",

    title: "A primeira manchete",

    text: `
        No dia seguinte, seu nome começa a aparecer nas redes
        e nos jornais esportivos.

        "NOVO REFORÇO PODE SURPREENDER NA SEMIFINAL."

        Você ainda nem disputou uma partida pelo clube.

        Mesmo assim, a expectativa começa a crescer.

        No corredor, um jornalista consegue falar com você.
    `,

    question:
        "Ele pergunta se você espera ser titular. O que você diz?",

    answers: [

        {
            text:
                "Estou aqui para ajudar o time, seja começando ou entrando depois.",

            effects: {

                professionalism: 3,

                coach: 2,

                fans: 2

            },

            consequence:
                "Sua resposta demonstra maturidade.",

            flags: [

                "good_press"

            ],

            next:
                "semifinal_eve"

        },

        {
            text:
                "Eu vim para jogar. Quero estar entre os titulares.",

            effects: {

                confidence: 3,

                fans: 2,

                coach: -1

            },

            consequence:
                "A declaração aumenta a expectativa sobre você.",

            flags: [

                "press_confidence"

            ],

            next:
                "semifinal_eve"

        },

        {
            text:
                "Prefiro deixar o futebol falar por mim.",

            effects: {

                professionalism: 2,

                fans: 1,

                coach: 1

            },

            consequence:
                "Você evita criar polêmica antes da partida.",

            flags: [

                "quiet_press"

            ],

            next:
                "semifinal_eve"

        }

    ]

},


/* =========================================================
   CENA 08 — VÉSPERA DA SEMIFINAL
   ========================================================= */

{
    id: "semifinal_eve",

    chapter: 2,

    background: "stadium_night",

    speaker: "NARRADOR",

    title: "A véspera",

    text: `
        Chegou a véspera da semifinal.

        O estádio está praticamente vazio.

        Amanhã, milhares de torcedores estarão aqui.

        Você está no centro de treinamento quando recebe
        uma mensagem da comissão técnica.

        "Reunião com o treinador. Agora."

        Seu coração acelera.

        Talvez você finalmente descubra a decisão.
    `,

    question:
        "Antes da reunião, o que você faz?",

    answers: [

        {
            text:
                "Vou revisar mentalmente tudo que fiz nos últimos treinos.",

            effects: {

                professionalism: 3,

                confidence: 1

            },

            consequence:
                "Você se prepara mentalmente para qualquer cenário.",

            next:
                "starting_decision"

        },

        {
            text:
                "Vou descansar e confiar no trabalho que fiz.",

            effects: {

                confidence: 3,

                professionalism: 2

            },

            consequence:
                "Você chega à reunião tranquilo e preparado.",

            next:
                "starting_decision"

        },

        {
            text:
                "Vou conversar com um companheiro de confiança.",

            effects: {

                teammates: 3,

                confidence: 2

            },

            consequence:
                "Uma conversa simples ajuda a aliviar a pressão.",

            next:
                "starting_decision"

        }

    ]

},


/* =========================================================
   CENA 09 — DECISÃO DO TREINADOR
   ========================================================= */

{
    id: "starting_decision",

    chapter: 2,

    background: "coach_office",

    speaker: "TREINADOR",

    title: "A decisão",

    text: `
        Você entra na sala.

        O treinador está sentado ao lado de sua comissão.

        Ele olha para você por alguns segundos.

        "Você fez uma boa semana."

        Ele então pega a prancheta.

        "Amanhã..."

        Uma pequena pausa.

        "Você estará relacionado."

        Mas ainda existe uma dúvida.

        Titular ou banco?

        Essa decisão será tomada pouco antes da partida.
    `,

    question:
        "Como você reage?",

    answers: [

        {
            text:
                "Agradecer e dizer que estará pronto para qualquer situação.",

            effects: {

                professionalism: 3,

                coach: 3,

                confidence: 1

            },

            consequence:
                "O treinador percebe que pode confiar na sua postura.",

            flags: [

                "professional_response"

            ],

            next:
                "match_day"

        },

        {
            text:
                "Dizer que está pronto para começar.",

            effects: {

                confidence: 3,

                coach: 2

            },

            consequence:
                "Você deixa claro que quer assumir a responsabilidade.",

            flags: [

                "wants_start"

            ],

            next:
                "match_day"

        }

    ]

},


/* =========================================================
   CENA 10 — DIA DA SEMIFINAL
   ========================================================= */

{
    id: "match_day",

    chapter: 3,

    background: "stadium_night",

    speaker: "NARRADOR",

    title: "Dia de jogo",

    text: `
        O dia finalmente chegou.

        O ônibus atravessa as ruas enquanto torcedores
        cercam o estádio.

        Você coloca os fones e olha pela janela.

        Hoje não existe mais treino.

        Não existe mais preparação.

        Existe apenas a partida.

        No vestiário, o treinador entra com a escalação
        nas mãos.

        Todos ficam em silêncio.

        Ele começa a anunciar os titulares.
    `,

    question:
        "Você respira fundo e espera seu nome.",

    answers: [

        {
            text:
                "Manter a calma e esperar a decisão.",

            effects: {

                confidence: 2,

                professionalism: 2

            },

            consequence:
                "Você mantém a concentração enquanto o treinador anuncia a escalação.",

            next:
                "lineup_decision"

        }

    ]

},
/* =========================================================
   CENA 11 — ESCALAÇÃO
   ========================================================= */

{
    id: "lineup_decision",

    chapter: 3,

    background: "locker_room",

    speaker: "TREINADOR",

    title: "A escalação",

    text: function(state) {

        const confidence =
            state.stats.confidence;

        const coach =
            state.stats.coach;

        const professionalism =
            state.stats.professionalism;

        const total =
            confidence +
            coach +
            professionalism;


        if (total >= 85) {

            return `
                O treinador termina de anunciar a escalação.

                Alguns jogadores começam a se levantar.

                Então ele olha diretamente para você.

                "Você começa."

                Por um segundo, o vestiário parece ficar em silêncio.

                Você conseguiu.

                Sua primeira partida pelo clube será justamente
                uma semifinal da Champions.
            `;

        }


        if (total >= 65) {

            return `
                O treinador termina de anunciar os titulares.

                Seu nome ainda não foi chamado.

                Então ele olha para você.

                "Você começa no banco."

                Não era exatamente o que você queria ouvir.

                Mas ele continua:

                "Você vai entrar. Esteja preparado."

                A oportunidade ainda está viva.
            `;

        }
    

        return `
            O treinador termina de anunciar a escalação.

            Seu nome não aparece entre os titulares.

            Você começa no banco.

            O treinador se aproxima antes de sair.

            "Fique concentrado."

            "Talvez eu precise de você."

            Você respira fundo.

            Ainda existe uma chance.
        `;

    },

    question: function(state) {

        const total =
            state.stats.confidence +
            state.stats.coach +
            state.stats.professionalism;


        if (total >= 85) {

            return "Você acaba de receber a maior oportunidade da sua carreira. Como reage?";

        }


        return "Você começa no banco. Como reage?";

    },

    answers: function(state) {

        const total =
            state.stats.confidence +
            state.stats.coach +
            state.stats.professionalism;


        if (total >= 85) {

            return [

                {
                    text:
                        "Respirar fundo e assumir a responsabilidade.",

                    effects: {

                        confidence: 3,

                        coach: 2

                    },

                    consequence:
                        "Você sente a pressão, mas está pronto para o desafio.",

                    flags: [

                        "semifinal_starter"

                    ],

                    next:
                        "starter_pre_match"

                },

                {

                    text:
                        "Comemorar rapidamente com os companheiros.",

                    effects: {

                        teammates: 3,

                        confidence: 2

                    },

                    consequence:
                        "Seus companheiros comemoram sua oportunidade com você.",

                    flags: [

                        "semifinal_starter",
                        "team_support"

                    ],

                    next:
                        "starter_pre_match"

                }

            ];

        }


        return [

            {

                text:
                    "Aceitar a decisão e ficar pronto para entrar.",

                effects: {

                    professionalism: 3,

                    coach: 2

                },

                consequence:
                    "Sua maturidade impressiona a comissão técnica.",

                flags: [

                    "semifinal_substitute"

                ],

                next:
                    "bench_pre_match"

            },

            {

                text:
                    "Ficar frustrado, mas transformar isso em motivação.",

                effects: {

                    confidence: 2,

                    professionalism: 1

                },

                consequence:
                    "A frustração se transforma em vontade de provar seu valor.",

                flags: [

                    "motivated_substitute"

                ],

                next:
                    "bench_pre_match"

            }

        ];

    }

},


/* =========================================================
   CENA 12 — TITULAR
   ========================================================= */

{
    id: "starter_pre_match",

    chapter: 3,

    background: "stadium_night",

    speaker: "NARRADOR",

    title: "Entre os onze",

    text: `
        Você entra no túnel.

        O barulho do estádio começa a ficar cada vez mais alto.

        Pela primeira vez, você veste a camisa do clube
        para uma partida oficial.

        Ao seu lado estão alguns dos maiores jogadores
        do mundo.

        O árbitro chama os times.

        É hora de entrar em campo.
    `,

    question:
        "Antes de entrar, qual é seu pensamento?",

    answers: [

        {

            text:
                "Eu trabalhei para chegar até aqui. Agora é jogar.",

            effects: {

                confidence: 3,

                professionalism: 1

            },

            consequence:
                "Você entra em campo concentrado.",

            next:
                "match_start_starter"

        },

        {

            text:
                "Preciso aproveitar cada segundo dessa oportunidade.",

            effects: {

                confidence: 2,

                teammates: 1

            },

            consequence:
                "Você transforma a pressão em motivação.",

            next:
                "match_start_starter"

        }

    ]

},


/* =========================================================
   CENA 13 — BANCO
   ========================================================= */

{
    id: "bench_pre_match",

    chapter: 3,

    background: "stadium_night",

    speaker: "NARRADOR",

    title: "Esperando sua chance",

    text: `
        Você se senta no banco.

        O estádio está ensurdecedor.

        Seus companheiros entram em campo.

        Você acompanha cada movimento.

        O treinador passa algumas instruções finais.

        Antes de se afastar, ele olha para você.

        "Fique aquecido."

        Você sabe o que isso significa.

        Sua hora pode chegar.
    `,

    question:
        "Como você se prepara?",

    answers: [

        {

            text:
                "Observar atentamente o adversário.",

            effects: {

                professionalism: 3,

                coach: 1

            },

            consequence:
                "Você começa a identificar espaços que podem ser explorados.",

            next:
                "match_start_bench"

        },

        {

            text:
                "Ficar mentalmente preparado para entrar a qualquer momento.",

            effects: {

                confidence: 3,

                professionalism: 1

            },

            consequence:
                "Você mantém a concentração durante os primeiros minutos.",

            next:
                "match_start_bench"

        }

    ]

},


/* =========================================================
   CENA 14 — COMEÇO DA PARTIDA COMO TITULAR
   ========================================================= */

{
    id: "match_start_starter",

    chapter: 4,

    background: "stadium_match",

    speaker: "NARRADOR",

    title: "A semifinal começou",

    text: `
        O apito soa.

        A bola rola.

        Nos primeiros minutos, você percebe que o ritmo
        é ainda mais intenso do que nos treinamentos.

        O adversário pressiona.

        Seu primeiro toque na bola acontece no meio de
        uma disputa apertada.

        Agora não existe mais volta.
    `,

    question:
        "Qual será sua primeira abordagem na partida?",

    answers: [

        {

            text:
                "Jogar simples e ganhar confiança aos poucos.",

            effects: {

                confidence: 2,

                professionalism: 2

            },

            consequence:
                "Você começa a partida com segurança.",

            next:
                "match_first_moment"

        },

        {

            text:
                "Tentar uma jogada agressiva logo no início.",

            effects: {

                confidence: 3,

                professionalism: -1

            },

            consequence:
                "Você deixa claro que não veio para se esconder.",

            next:
                "match_first_moment"

        }

    ]

},


/* =========================================================
   CENA 15 — COMEÇO DA PARTIDA COMO RESERVA
   ========================================================= */

{
    id: "match_start_bench",

    chapter: 4,

    background: "stadium_match",

    speaker: "NARRADOR",

    title: "Esperando o momento",

    text: `
        A partida começa.

        Você acompanha tudo do banco.

        Os primeiros minutos são intensos.

        O adversário consegue pressionar sua equipe.

        Você observa o jogo e tenta entender onde poderia
        fazer a diferença.

        O treinador permanece de pé na área técnica.
    `,

    question:
        "O que você faz enquanto espera?",

    answers: [

        {

            text:
                "Continuar analisando o jogo.",

            effects: {

                professionalism: 3,

                coach: 1

            },

            consequence:
                "Você começa a entender exatamente onde pode ajudar.",

            next:
                "substitute_moment"

        },

        {

            text:
                "Pedir para entrar e mostrar que está pronto.",

            effects: {

                confidence: 3,

                coach: 1

            },

            consequence:
                "O treinador percebe sua disposição.",

            next:
                "substitute_moment"

        }

     ]

},

/* =========================================================
   CENA 16 — MOMENTO DA SUBSTITUIÇÃO
   ========================================================= */

{
    id: "substitute_moment",

    chapter: 4,

    background: "stadium_match",

    speaker: "TREINADOR",

    title: "Sua hora chegou",

    text: `
        O jogo continua intenso.

        Você permanece no banco observando cada lance.

        O treinador olha para o campo.

        Depois olha para você.

        "Comece a se aquecer."

        Você percebe que a oportunidade está chegando.

        Faltam poucos minutos para o fim da partida.
    `,

    question:
        "O que você faz?",

    answers: [

        {

            text:
                "Levantar imediatamente e começar a se aquecer.",

            effects: {

                confidence: 3,

                professionalism: 2,

                coach: 2

            },

            flags: [

                "ready_to_enter"

            ],

            consequence:
                "Você mostra ao treinador que está preparado.",

            next:
                "substitute_entry"

        },

        {

            text:
                "Continuar analisando o jogo antes de entrar.",

            effects: {

                professionalism: 4,

                coach: 2

            },

            flags: [

                "analyzes_game"

            ],

            consequence:
                "Você tenta entender exatamente onde pode fazer a diferença.",

            next:
                "substitute_entry"

        },

        {

            text:
                "Dizer ao treinador que está pronto para entrar.",

            effects: {

                confidence: 4,

                coach: 3

            },

            flags: [

                "asks_to_enter"

            ],

            consequence:
                "O treinador percebe sua confiança e disposição.",

            next:
                "substitute_entry"

        }

    ]

},


/* =========================================================
   CENA 17 — ENTRANDO EM CAMPO
   ========================================================= */

{
    id: "substitute_entry",

    chapter: 4,

    background: "stadium_match",

    speaker: "NARRADOR",

    title: "A entrada",

    text: `
        O treinador faz um sinal.

        "Vai."

        Você corre até a lateral.

        O quarto árbitro autoriza a substituição.

        A torcida percebe sua entrada.

        Você respira fundo.

        A semifinal está chegando aos minutos decisivos.

        Agora você finalmente está em campo.
    `,

    question:
        "Qual é sua primeira atitude?",

    answers: [

        {

            text:
                "Jogar de forma segura e procurar meus companheiros.",

            effects: {

                professionalism: 4,

                teammates: 2

            },

            flags: [

                "safe_entry"

            ],

            consequence:
                "Você começa sua participação com segurança.",

            next:
                "substitute_first_action"

        },

        {

            text:
                "Pedir a bola e tentar participar imediatamente.",

            effects: {

                confidence: 4,

                fans: 2

            },

            flags: [

                "aggressive_entry"

            ],

            consequence:
                "Você mostra que não entrou em campo para se esconder.",

            next:
                "substitute_first_action"

        },

        {

            text:
                "Observar rapidamente o posicionamento dos jogadores.",

            effects: {

                professionalism: 3,

                confidence: 2,

                coach: 2

            },

            flags: [

                "reads_field"

            ],

            consequence:
                "Você entende rapidamente o espaço disponível.",

            next:
                "substitute_first_action"

        }

    ]

},


/* =========================================================
   CENA 18 — PRIMEIRO LANCE
   ========================================================= */

{
    id: "substitute_first_action",

    chapter: 4,

    background: "stadium_attack",

    speaker: "NARRADOR",

    title: "Primeiro lance",

    text: `
        Poucos segundos depois de entrar,

        a bola chega até você.

        O adversário se aproxima rapidamente.

        O estádio aumenta o volume.

        Você terá pouco tempo para decidir.
    `,

    question:
        "O que você faz?",

    answers: [

        {

            text:
                "Fazer um passe simples e manter a posse.",

            effects: {

                professionalism: 4,

                teammates: 3

            },

            flags: [

                "safe_first_touch"

            ],

            consequence:
                "Você começa sua participação sem correr riscos desnecessários.",

            next:
                "second_half_09"

        },

        {

            text:
                "Tentar avançar e ganhar alguns metros.",

            effects: {

                confidence: 4,

                fans: 2

            },

            flags: [

                "drives_forward"

            ],

            consequence:
                "Você ganha espaço e faz a equipe avançar.",

            next:
                "second_half_09"

        },

        {

            text:
                "Procurar um companheiro em posição melhor.",

            effects: {

                teammates: 4,

                professionalism: 3

            },

            flags: [

                "looks_for_teammate"

            ],

            consequence:
                "Você encontra uma opção e mantém o ataque vivo.",

            next:
                "second_half_09"

        }

    ]

}

];
