/**
 * Biblioteca de Textos para Fluência em Leitura
 * EENSA - Escola Estadual Nossa Senhora Aparecida
 * Mendes Pimentel/MG
 */

import { ReadingText } from '../types';

export const TEXTS: ReadingText[] = [
  // ========== TRAVA-LÍNGUAS (15-35s) ==========
  {
    id: 'tl-01',
    title: 'O Rato Roeu',
    category: 'trava-lingua',
    difficulty: 'facil',
    minSeconds: 15,
    maxSeconds: 30,
    wordsPerMinute: 120,
    content: `O rato roeu a roupa do rei de Roma; a rainha, com raiva, resolveu remendar. Mas o rato, rodando, roeu mais um pouco — e a rainha teve que recomeçar!`,
    tip: 'Trabalha a articulação do som /r/ e ritmo rápido.'
  },
  {
    id: 'tl-02',
    title: 'Três Pratos de Trigo',
    category: 'trava-lingua',
    difficulty: 'medio',
    minSeconds: 15,
    maxSeconds: 30,
    wordsPerMinute: 110,
    content: `Três pratos de trigo para três tigres tristes; três tigres tristes trituram três pratos de trigo. Qual tigre tritura mais? O mais triste, é claro!`,
    tip: 'Desafia a pronúncia de encontros consonantais /tr/.'
  },
  {
    id: 'tl-03',
    title: 'O Sapo na Lagoa',
    category: 'trava-lingua',
    difficulty: 'dificil',
    minSeconds: 20,
    maxSeconds: 35,
    wordsPerMinute: 100,
    content: `O sapo não lava o pé, não lava porque não quer; ele mora na lagoa, não lava o pé, mas quer! Se o sapo lavasse o pé — e o pé do sapo fosse limpo —, o sapo lavaria mais? O sapo não sabe!`,
    tip: 'Trabalha negações e estruturas condicionais com ritmo.'
  },
  {
    id: 'tl-04',
    title: 'A Aranha',
    category: 'trava-lingua',
    difficulty: 'facil',
    minSeconds: 15,
    maxSeconds: 25,
    wordsPerMinute: 115,
    content: `A aranha arranha a rã; a rã arranha a aranha. Nem a aranha arranha a rã, nem a rã arranha a aranha... Mas as duas ficam arranhadas!`,
    tip: 'Sons sibilantes e repetição de estruturas.'
  },
  {
    id: 'tl-05',
    title: 'Doce Perguntado',
    category: 'trava-lingua',
    difficulty: 'medio',
    minSeconds: 18,
    maxSeconds: 32,
    wordsPerMinute: 108,
    content: `O doce perguntou pro doce qual é o doce mais doce; o doce respondeu pro doce que o doce mais doce é o doce de batata-doce. Será?`,
    tip: 'Repetição intensiva com interrogação final.'
  },
  {
    id: 'tl-06',
    title: 'Luzia Lustra',
    category: 'trava-lingua',
    difficulty: 'dificil',
    minSeconds: 22,
    maxSeconds: 35,
    wordsPerMinute: 105,
    content: `A Luzia lustra louça, lustra janela, lustra tudo! Mas a louça que a Luzia mais lustra é a louça de vidro — que brilha, brilha, brilha... até não brilhar mais!`,
    tip: 'Aliteração /l/ e ritmo acelerado com pausas dramáticas.'
  },

  // ========== FÁBULAS CLÁSSICAS (40-100s) ==========
  {
    id: 'fb-01',
    title: 'A Cigarra e a Formiga',
    category: 'fabula',
    difficulty: 'facil',
    minSeconds: 40,
    maxSeconds: 80,
    wordsPerMinute: 90,
    content: `Era uma vez, no verão quentinho, uma cigarra que passava os dias cantando, cantando... Do outro lado da árvore, uma formiga trabalhava sem parar, carregando grãozinhos para guardar.

— Formiga, vem cantar comigo! — disse a cigarra, animada.
— Não posso, preciso trabalhar para o inverno! — respondeu a formiga, apressada.

A cigarra riu: — Inverno? Está tão longe... Depois eu me preocupo!

Mas o inverno chegou, gelado e cinzento. A cigarra, com frio e fome, bateu na porta da formiga:
— Por favor, me dá um grãozinho?

A formiga olhou para ela e disse: — Dançou no verão? Agora dança no inverno também!

Moral: O trabalho de hoje garante o conforto de amanhã.`,
    tip: 'Trabalha diálogo, entonação e moral da história. Pausa nas falas.'
  },
  {
    id: 'fb-02',
    title: 'A Lebre e a Tartaruga',
    category: 'fabula',
    difficulty: 'medio',
    minSeconds: 50,
    maxSeconds: 90,
    wordsPerMinute: 85,
    content: `A lebre era rápida — tão rápida que ninguém conseguia vencê-la em corridas. Mas ela era orgulhosa demais.

Um dia, a tartaruga, lenta e tranquila, a desafiou:
— Vamos fazer uma corrida?

A lebre caiu na gargalhada: — Você? Que lentidão! Vou ganhar dormindo!

E foi exatamente isso que ela fez. No meio da corrida, a lebre parou para descansar debaixo de uma árvore: — A tartaruga está tão longe... Posso tirar uma soneca.

Mas enquanto a lebre cochilava, a tartaruga seguia, devagar, sem parar. Passo a passo, passo a passo... até cruzar a linha de chegada!

Quando a lebre acordou e correu até lá, era tarde demais. A tartaruga já havia vencido.

Moral: Devagar e sempre se chega na frente. A persistência vale mais que a velocidade.`,
    tip: 'Narrative com contrastes (rápido/lento). Enfatizar onomatopeias e pausas.'
  },
  {
    id: 'fb-03',
    title: 'O Lobo e o Cordeiro',
    category: 'fabula',
    difficulty: 'dificil',
    minSeconds: 60,
    maxSeconds: 100,
    wordsPerMinute: 80,
    content: `Um cordeiro bebia água no riacho, tranquilo e frágil. De repente, um lobo faminto apareceu do outro lado:

— Você está sujando a minha água! — rosnou o lobo, procurando uma desculpa.

O cordeiro, tremendo, respondeu: — Mas, senhor Lobo, estou aqui embaixo; a água corre de você para mim...

O lobo, irritado, insistiu: — Então foi seu pai que me ofendeu ano passado!

— Mas eu nem tinha nascido ainda — disse o cordeiro, com a voz trêmula.

O lobo, sem mais argumentos, rugiu: — Não importa! Alguém da sua família me ofendeu, e agora você paga por isso!

E, sem mais conversa, o lobo devorou o pobre cordeiro.

Moral: Para quem procura desculpas para fazer o mal, qualquer motivo serve. A força não precisa de razão.`,
    tip: 'Trabalha tensão dramática, diálogo argumentativo e desfecho trágico.'
  },
  {
    id: 'fb-04',
    title: 'A Raposa e as Uvas',
    category: 'fabula',
    difficulty: 'facil',
    minSeconds: 35,
    maxSeconds: 70,
    wordsPerMinute: 95,
    content: `Uma raposa faminta viu um cacho de uvas maduras, pendurado bem alto numa parreira.

— Que uvas lindas! Vou pegá-las! — pensou a raposa.

Ela pulou uma vez... não alcançou. Pulou de novo... nada. Pulou mais alto, mais alto... mas as uvas continuavam lá em cima, impossíveis de alcançar.

Cansada e frustrada, a raposa virou as costas e disse: — Ah, essas uvas devem estar verdes mesmo. Não as quero!

E foi embora, fingindo não se importar.

Moral: É fácil desprezar o que não conseguimos ter.`,
    tip: 'Trabalha frustração e mudança de tom no diálogo.'
  },
  {
    id: 'fb-05',
    title: 'O Leão e o Ratinho',
    category: 'fabula',
    difficulty: 'medio',
    minSeconds: 45,
    maxSeconds: 85,
    wordsPerMinute: 88,
    content: `Um leão dormia profundamente quando um ratinho, sem querer, correu sobre sua juba. O leão acordou, furioso, e prendeu o ratinho com a pata enorme:

— Como ousa me acordar? Vou te devorar!

O ratinho, tremendo, implorou: — Por favor, Rei Leão! Me perdoa! Sou pequeno, mas um dia posso te ajudar!

O leão riu: — Você? Me ajudar? Isso eu quero ver! — E, de tanto rir, soltou o ratinho.

Dias depois, o leão caiu numa armadilha de caçadores: uma enorme rede! Ele rugiu, tentou se soltar, mas não conseguia.

De repente, o ratinho apareceu. Sem dizer nada, começou a roer as cordas da rede. Roeu, roeu, roeu... até que o leão ficou livre!

— Você salvou minha vida! — disse o leão, admirado.

Moral: Não subestime os pequenos. Todos têm algo valioso a oferecer.`,
    tip: 'Contraste entre força e fragilidade. Pausa nos diálogos.'
  },

  // ========== NARRATIVAS ORIGINAIS (90-210s) ==========
  {
    id: 'nr-01',
    title: 'O Velho Farol',
    category: 'narrativa',
    difficulty: 'medio',
    minSeconds: 90,
    maxSeconds: 150,
    wordsPerMinute: 75,
    content: `No alto do penhasco, onde o vento uivava forte e o mar batia furioso, havia um velho farol. Ele já não era pintado de branco e vermelho como antigamente; o tempo havia desbotado suas cores, e suas janelas rangiam com o vento.

Mas todas as noites, sem falta, o farol acendia sua luz — uma luz amarela, forte, que girava devagar, como um guardião do mar.

Seu Tomás, o faroleiro, era um homem de cabelos brancos que cuidava do farol há cinquenta anos. Ele conhecia cada pedra daquele lugar, cada degrau da escada que subia até o topo.

Uma noite, a tempestade chegou. O céu ficou negro, o vento dobrou as árvores, e as ondas cresciam, cresciam como montanhas de água salgada. Um barco de pescadores lutava contra a fúria do mar, perdido na escuridão.

Seu Tomás olhou pela janela e viu as luzes do barco, fracas, chamando por socorro. Ele subiu a escada correndo — degrau por degrau, degrau por degrau —, até chegar na luz do farol.

Mas algo estava errado: a luz não girava mais! O mecanismo havia travado com a força do vento.

— Não! Eles vão colidir com as pedras! — gritou Seu Tomás.

Sem pensar duas vezes, ele pegou uma lanterna antiga e subiu na sacada externa do farol. O vento quase o derrubou, mas ele ficou firme, balançando a lanterna de um lado para o outro, de um lado para o outro...

Os pescadores viram a luz! Conseguiram desviar das pedras e, lentamente, alcançaram o porto em segurança.

Quando a tempestade passou, os pescadores subiram até o farol para agradecer. Encontraram Seu Tomás sentado na sacada, cansado mas sorrindo.

— Vocês estão bem? — perguntou ele.

— Graças ao senhor, sim! — responderam os pescadores, emocionados.

Seu Tomás olhou para o velho farol e murmurou: — Nós dois ainda servimos para alguma coisa.

E a luz do farol, finalmente consertada, voltou a girar, firme como sempre.`,
    tip: 'Narrativa com tensão crescente. Trabalha descrição sensorial, diálogo e clímax emocional.'
  },
  {
    id: 'nr-02',
    title: 'A Menina das Estrelas',
    category: 'narrativa',
    difficulty: 'medio',
    minSeconds: 120,
    maxSeconds: 180,
    wordsPerMinute: 70,
    content: `Luna era uma menina diferente. Enquanto outras crianças brincavam de boneca ou corriam pelo quintal, ela passava as noites olhando para o céu, contando estrelas.

— Uma, duas, três... cinquenta e sete, cinquenta e oito... — contava Luna, com os olhos brilhando.

Sua avó costumava dizer: — Menina, você vai ficar com torcicolo de tanto olhar pra cima!

Mas Luna não se importava. Ela tinha certeza de que as estrelas queriam lhe contar algo.

Uma noite, algo extraordinário aconteceu. Uma estrela começou a piscar, piscar, piscar... como se estivesse chamando Luna! Ela desceu do telhado onde estava sentada e correu até o quintal.

E então, bem devagar, uma luz dourada desceu do céu, brilhante e suave ao mesmo tempo. Não era uma estrela qualquer — era uma Stella, uma menina feita de luz de estrela!

— Você me ouviu! — disse Stella, sorrindo. — Faz anos que eu tento me comunicar com alguém da Terra, mas nunca ninguém presta atenção...

Luna ficou maravilhada: — Eu sabia! Eu sabia que vocês falavam! O que vocês dizem?

— Dizemos histórias — respondeu Stella. — Histórias antigas, de quando o universo nasceu, de planetas distantes, de sonhos que viraram cometas. Mas ninguém mais escuta.

— Eu quero escutar! — disse Luna, sentando-se na grama.

E Stella começou a contar. Contou sobre galáxias que rodopiam como redemoinhos coloridos, sobre luas que cantam canções silenciosas, sobre o Sol que é uma estrela também, só que muito, muito perto.

Luna ouviu tudo, com o coração batendo de emoção. Quando Stella terminou, ela disse:

— E você, Luna? O que os humanos fazem?

Luna pensou um pouco e respondeu: — A gente sonha. Constrói coisas, planta árvores, cuida uns dos outros... e olha para o céu, pensando: "Será que estamos sozinhos?"

Stella sorriu: — Nunca estiveram.

E, com um último brilho, Stella subiu de volta para o céu, voltando ao seu lugar entre as outras estrelas.

Desde aquela noite, Luna não contava mais estrelas. Ela as cumprimentava, uma por uma, sabendo que cada uma tinha uma história para contar — e que, no silêncio da noite, elas falavam com quem sabia ouvir.`,
    tip: 'Narrativa poética e fantasiosa. Trabalha vocabulário espacial, diálogo filosófico e tom contemplativo.'
  },
  {
    id: 'nr-03',
    title: 'O Mercado das Palavras',
    category: 'narrativa',
    difficulty: 'dificil',
    minSeconds: 150,
    maxSeconds: 210,
    wordsPerMinute: 68,
    content: `Na cidade de Vocabulândia, existia um lugar muito especial: o Mercado das Palavras. Lá, as pessoas compravam e vendiam palavras — sim, palavras! — como se fossem frutas, verduras ou brinquedos.

Havia palavras doces, como "carinho" e "amor", que custavam apenas um sorriso. Havia palavras raras, como "efêmero" e "serendipidade", que valiam moedas de ouro. E havia palavras perigosas, como "guerra" e "ódio", que ninguém queria comprar — mas que, às vezes, eram roubadas.

Pedro, um menino curioso de doze anos, adorava visitar o mercado com seu avô, Senhor Sebastião, que era um colecionador de palavras antigas.

— Vovô, por que algumas palavras valem mais que outras? — perguntou Pedro um dia.

Senhor Sebastião parou, pensativo, e respondeu: — Porque o valor de uma palavra depende do que ela pode fazer. Uma palavra pode curar... ou ferir. Pode unir... ou separar. Pode mudar a vida de alguém para sempre.

Pedro nunca havia pensado nisso.

Naquele dia, enquanto caminhavam pelas barraquinhas, Pedro ouviu um grito:

— Me roubaram! Roubaram minha palavra mais preciosa!

Era Dona Marina, a vendedora de palavras afetivas. Ela chorava, desesperada.

— O que roubaram? — perguntou Senhor Sebastião.

— Minha palavra "esperança"! — soluçou Dona Marina. — Era a única que me restava... e sem ela, não consigo mais trabalhar. Quem vai comprar palavras de consolo se eu não tenho esperança para vender?

Pedro sentiu um aperto no peito. Ele sabia que, sem esperança, a cidade inteira ficaria mais cinzenta, mais triste.

— Vamos encontrá-la! — disse Pedro, decidido.

Ele e o avô saíram em busca do ladrão. Seguiram pistas pela cidade: uma palavra "desespero" deixada cair numa esquina, uma palavra "solidão" rabiscada numa parede...

Até que chegaram a uma casa abandonada, no fim da cidade. Lá dentro, encontraram um homem velho, encolhido no canto, segurando a palavra "esperança" como se fosse um tesouro.

— Por que você roubou? — perguntou Pedro, sem medo.

O homem levantou os olhos, cansados: — Porque ninguém mais me dava esperança de graça. Eu tentei comprar, mas não tenho nada... Pensei que, se eu tivesse essa palavra, talvez as coisas melhorassem.

Senhor Sebastião se aproximou devagar e disse, com voz suave: — A esperança não funciona assim, amigo. Ela não é algo que se guarda só para si. Quanto mais você divide, mais ela cresce. Vem conosco.

O homem hesitou, mas acabou seguindo. Quando chegaram ao mercado, Dona Marina não brigou, não gritou. Ela olhou para o homem e disse: — Fique com ela.

— Como? — perguntou o homem, surpreso.

— Você precisa mais do que eu — disse Dona Marina, sorrindo. — Mas me promete que vai usar essa palavra para ajudar outras pessoas também.

O homem concordou, com lágrimas nos olhos. E, naquele dia, a palavra "esperança" começou a se multiplicar. Ela encontrou um jeito de crescer nos corações das pessoas — não como mercadoria, mas como algo vivo, que se espalhava com generosidade.

Pedro aprendeu, naquele dia, que as palavras mais valiosas não são as que guardamos, mas as que compartilhamos.`,
    tip: 'Narrativa metalinguística sobre o poder das palavras. Trabalha vocabulário sofisticado, diálogo filosófico e moral complexa. Ideal para alunos avançados.'
  },

  // ========== TEXTOS INFORMATIVOS (60-120s) ==========
  {
    id: 'inf-01',
    title: 'Por Que o Céu É Azul?',
    category: 'informativo',
    difficulty: 'medio',
    minSeconds: 60,
    maxSeconds: 100,
    wordsPerMinute: 85,
    content: `Você já parou para pensar por que o céu é azul? A resposta tem a ver com luz, ar e ciência!

A luz do Sol pode parecer branca, mas na verdade ela é feita de muitas cores misturadas: vermelho, laranja, amarelo, verde, azul, anil e violeta — as sete cores do arco-íris. Cada cor tem um "tamanho de onda" diferente.

Quando a luz do Sol atravessa a atmosfera (a camada de ar que envolve a Terra), ela bate nas moléculas de oxigênio e nitrogênio que estão no ar. Essas moléculas são muito pequenas, mas conseguem "espalhar" a luz.

Aqui está o segredo: as cores de onda curta, como o azul e o violeta, se espalham muito mais do que as cores de onda longa, como o vermelho. É por isso que, quando olhamos para o céu, vemos principalmente azul — porque essa cor foi espalhada por todo lado!

Mas por que não vemos violeta, se ele também é espalhado? Porque nossos olhos são mais sensíveis ao azul do que ao violeta. Então, o céu "escolheu" ser azul para nós!

E no pôr do sol? Por que o céu fica laranja e vermelho? Porque, quando o Sol está baixo no horizonte, a luz viaja uma distância maior pela atmosfera, e as cores azuis se espalham tanto que "desaparecem". Sobram apenas o laranja e o vermelho, que têm ondas mais longas e conseguem chegar até nossos olhos.

Incrível, não é? A próxima vez que você olhar para o céu, lembre-se: ele é azul por causa de um baile de luzes e moléculas!`,
    tip: 'Texto científico com linguagem acessível. Trabalha explicação de causa-efeito, vocabulário técnico simples e interrogações didáticas.'
  },
  {
    id: 'inf-02',
    title: 'A Incrível Vida das Abelhas',
    category: 'informativo',
    difficulty: 'dificil',
    minSeconds: 80,
    maxSeconds: 120,
    wordsPerMinute: 78,
    content: `As abelhas são insetos fascinantes e essenciais para a vida no planeta. Sem elas, muitas das frutas, legumes e flores que conhecemos deixariam de existir. Mas como funciona a vida dentro de uma colmeia?

Em uma colmeia vivem três tipos de abelhas: a rainha, os zangões e as operárias.

A rainha é a única abelha que coloca ovos — ela pode botar até 2.000 ovos por dia! Sua função é garantir que a colmeia continue crescendo. Ela vive até cinco anos, o que é muito para um inseto.

Os zangões são os machos da colmeia. Eles não trabalham, não coletam pólen nem fazem mel; sua única missão é acasalar com a rainha. Depois disso, eles morrem ou são expulsos da colmeia quando o alimento fica escasso.

As operárias são as abelhas mais numerosas e trabalhadoras. Elas fazem de tudo: limpam a colmeia; alimentam as larvas (os filhotes); protegem a entrada contra invasores; e, é claro, voam de flor em flor coletando néctar e pólen.

Mas a parte mais impressionante é a comunicação das abelhas. Quando uma operária encontra flores cheias de néctar, ela volta para a colmeia e faz uma "dança"! Essa dança indica para as outras abelhas onde estão as flores: se ela dança em círculos, as flores estão perto; se ela balança o corpo em linha reta, as flores estão longe e na direção do Sol.

Além disso, as abelhas são responsáveis pela polinização. Quando elas visitam as flores em busca de néctar, o pólen gruda em seus pelos e é levado para outras flores. Isso permite que as plantas se reproduzam. Sem as abelhas, não teríamos maçãs, laranjas, morangos, amêndoas e muitos outros alimentos.

Por isso, proteger as abelhas é proteger nossa própria sobrevivência. Elas são pequenas, mas fazem um trabalho gigantesco!`,
    tip: 'Texto informativo com enumeração, conectivos lógicos e dados numéricos. Trabalha vocabulário científico e pausas em listas (ponto-e-vírgula).'
  },

  // ========== POESIAS (20-65s) ==========
  {
    id: 'po-01',
    title: 'O Rio e o Mar',
    category: 'poesia',
    difficulty: 'facil',
    minSeconds: 20,
    maxSeconds: 45,
    wordsPerMinute: 95,
    content: `O rio corre devagar,
Entre pedras a cantar;
Vai descendo a montanha,
Em busca do grande mar.

O mar espera pacientemente,
Com ondas que vêm e vão;
Ele abraça o pequeno rio,
E os dois se tornam um só coração.

Assim é a vida, menino:
Uns vêm de longe, outros daqui;
Mas todos, no fim do caminho,
Se encontram — como o rio e o mar que eu vi.`,
    tip: 'Poesia com rima ABAB. Trabalha ritmo, pausa no fim dos versos e imagem poética. Enfatizar musicalidade.'
  },
  {
    id: 'po-02',
    title: 'Tarde de Chuva',
    category: 'poesia',
    difficulty: 'medio',
    minSeconds: 35,
    maxSeconds: 65,
    wordsPerMinute: 82,
    content: `O céu ficou cinzento,
Como um lençol de chumbo estendido;
As nuvens, gordas e pesadas,
Trouxeram consigo um suspiro sofrido.

Plic, ploc, começou a chover —
Gotas dançando no telhado;
O cheiro de terra molhada
Invadiu o quintal, devagar, delicado.

As crianças correram pra dentro,
Rindo e gritando, molhadas;
Mas eu fiquei ali, parado,
Vendo a chuva lavar as calçadas.

A tarde de chuva é assim:
Traz silêncio, traz paz, traz lembrança;
E no fim da tempestade passageira,
Sempre sobra uma pequena esperança.`,
    tip: 'Poesia descritiva com linguagem sensorial (olfato, audição, visão). Trabalha enjambement e pausas dramáticas. Onomatopeia "plic, ploc".'
  },

  // ========== TEXTOS EXTRAS (Variedade) ==========
  {
    id: 'ex-01',
    title: 'O Menino que Tinha Medo do Escuro',
    category: 'narrativa',
    difficulty: 'facil',
    minSeconds: 50,
    maxSeconds: 90,
    wordsPerMinute: 88,
    content: `João tinha sete anos e um segredo: ele tinha muito medo do escuro. Toda noite, quando a luz apagava, seu coração disparava. Ele via sombras na parede, ouvia barulhos estranhos...

— Mãe, não apaga a luz! — pedia João.

Um dia, seu avô veio visitá-lo. O avô era um homem sábio, que havia viajado pelo mundo todo. Quando descobriu o medo de João, disse:

— Vem comigo, menino. Vou te mostrar uma coisa.

Eles subiram no telhado da casa, já de noitinha. O céu ia ficando escuro, escuro, até que...

— Olha! — disse o avô, apontando para cima.

João olhou e ficou maravilhado: milhares de estrelas brilhavam no céu preto! Era a coisa mais linda que ele já tinha visto.

— O escuro não é vazio, João — disse o avô, sorrindo. — Ele é cheio de estrelas. Só que, para vê-las, a luz precisa apagar.

Naquela noite, João dormiu com a luz apagada pela primeira vez. E toda vez que sentia medo, ele fechava os olhos e imaginava as estrelas brilhando, só para ele.`,
    tip: 'Narrativa sobre superação de medo. Trabalha diálogo, descrição emocional e desfecho reconfortante.'
  },
  {
    id: 'ex-02',
    title: 'Receita de Fazer um Amigo',
    category: 'poesia',
    difficulty: 'facil',
    minSeconds: 25,
    maxSeconds: 50,
    wordsPerMinute: 90,
    content: `Pegue um sorriso bem aberto,
Junte com uma palavra gentil;
Acrescente uma pitada de escuta,
E mexa tudo com carinho sutil.

Se a mistura ficar muito séria,
Adicione uma boa gargalhada;
E se parecer meio sem graça,
Coloque uma história bem contada.

Deixe descansar no tempo certo,
Sem pressa, sem forçar, devagar;
E pronto! Você tem um amigo —
Um tesouro que vai durar e durar.`,
    tip: 'Poesia lúdica com estrutura de receita. Trabalha metáforas cotidianas e rima. Tom leve e acolhedor.'
  },
];
