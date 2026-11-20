/* Método em 4 fases: Imersão (diálogo), Descoberta (regra e armadilhas), Prática ativa (montar a frase e quiz)
   e Shadowing (repetir em voz alta). Conteúdo trazido da versão Cittadino Pro v3. */
export const METODO = [
      {
        id: 'u1',
        stage: 'A1',
        stageLabel: 'Base A1',
        title: 'Ufficio Anagrafe & Cortesia',
        subtitle: 'Lei formale, vorrei, pedidos em órgãos públicos',
        minutes: 6,
        dialogue: [
          { spk: 'Impiegata', it: 'Buongiorno! Come posso aiutarLa oggi?', pt: 'Bom dia! Como posso ajudar o senhor/a senhora hoje?' },
          { spk: 'Tu', it: 'Buongiorno, vorrei richiedere il certificato di residenza, per favore.', pt: 'Bom dia, gostaria de solicitar o certificado de residência, por favor.' },
          { spk: 'Impiegata', it: 'Certo. Ha portato un documento d\'identità valido e il codice fiscale?', pt: 'Claro. Trouxe um documento de identidade válido e o CPF italiano?' },
          { spk: 'Tu', it: 'Sì, ecco il mio passaporto. Devo anche compilare un modulo?', pt: 'Sim, aqui está meu passaporte. Preciso também preencher um formulário?' }
        ],
        discovery: {
          ruleTitle: 'O Segredo da Cortesia Italiana (Lei + Condizionale)',
          ruleBody: 'No exame B1 Cittadinanza, falar "Voglio" ou usar "tu" com funcionários públicos faz perder pontos de adequação sociolinguística. Troque sempre "voglio" por "vorrei" e use verbos na 3ª pessoa do singular com "Lei".',
          traps: [
            { wrong: 'Voglio un certificato (rude)', right: 'Vorrei richiedere un certificato (educado)' },
            { wrong: 'Puoi ripetere? (informal)', right: 'Può ripetere, per favore? (formal)' },
            { wrong: 'Abito a Brasile (erro de preposição)', right: 'Abito in Brasile da tre anni (correto)' }
          ]
        },
        builder: {
          prompt: 'Monte a frase formal: "Gostaria de agendar um horário para amanhã."',
          audio: 'Vorrei prenotare un appuntamento per domani.',
          tokens: ['Vorrei', 'prenotare', 'un', 'appuntamento', 'per', 'domani.'],
          explanation: 'Estrutura-chave da burocracia italiana: "Vorrei + infinitivo + complemento".'
        },
        quiz: {
          prompt: 'Qual é a resposta mais natural e formal ao ouvir "Può firmare qui?" no Comune?',
          audio: 'Certo, firmo subito. Grazie mille.',
          options: [
            'Sì, io firmiamo adesso.',
            'Certo, firmo subito. Grazie mille.',
            'No, tu firmi per me.',
            'Voglio firmare ieri.'
          ],
          answer: 1,
          explanation: '"Certo, firmo subito" (Claro, assino já) responde à pergunta formal com naturalidade e concordância na 1ª pessoa.'
        },
        shadowing: {
          it: 'Buongiorno, vorrei prenotare un appuntamento per la carta d\'identità.',
          pron: 'buon-DJÔR-no, vor-RÊI pre-no-TÁ-re un ap-pun-ta-MÊN-to per la CÁR-ta di-den-ti-TÁ',
          pt: 'Bom dia, gostaria de agendar um horário para a carteira de identidade.'
        }
      },
      {
        id: 'u2',
        stage: 'A2',
        stageLabel: 'Ponte A2',
        title: 'Passato Prossimo vs. Imperfetto',
        subtitle: 'Contar sua história de vida na prova oral e escrita',
        minutes: 7,
        dialogue: [
          { spk: 'Esaminatore', it: 'Quando è arrivato in Italia e cosa faceva nel Suo Paese?', pt: 'Quando o senhor chegou à Itália e o que fazia no seu país?' },
          { spk: 'Tu', it: 'Sono arrivato nel 2022. In Brasile lavoravo come tecnico informatico.', pt: 'Cheguei em 2022. No Brasil eu trabalhava como técnico de informática.' },
          { spk: 'Esaminatore', it: 'È stato difficile adattarsi all\'inizio?', pt: 'Foi difícil se adaptar no começo?' },
          { spk: 'Tu', it: 'All\'inizio non parlavo bene l\'italiano, ma ho studiato ogni giorno.', pt: 'No começo eu não falava bem italiano, mas estudei todos os dias.' }
        ],
        discovery: {
          ruleTitle: 'Foto (Imperfetto) vs. Filme/Ação Concluída (Passato Prossimo)',
          ruleBody: 'Na prova oral e escrita B1, o examinador avalia se você mistura os dois passados corretamente. Use Imperfetto para cenários, idades e rotinas antigas ("lavoravo", "abitavo") e Passato Prossimo para marcos pontuais ("sono arrivato", "ho trovato lavoro").',
          traps: [
            { wrong: 'Ho arrivato in Italia (auxiliar errado)', right: 'Sono arrivato/a in Italia (verbo de movimento usa essere)' },
            { wrong: 'Quando ero giovane, ho giocato sempre', right: 'Quando ero giovane, giocavo sempre (hábito = imperfetto)' }
          ]
        },
        builder: {
          prompt: 'Monte a frase: "Enquanto eu esperava o trem, encontrei Marco."',
          audio: 'Mentre aspettavo il treno, ho incontrato Marco.',
          tokens: ['Mentre', 'aspettavo', 'il', 'treno,', 'ho', 'incontrato', 'Marco.'],
          explanation: '"Mentre" exige Imperfetto ("aspettavo") na ação contínua; o evento súbito usa Passato Prossimo ("ho incontrato").'
        },
        quiz: {
          prompt: 'Complete corretamente: "L\'anno scorso mia moglie _____ _____ il corso di italiano."',
          audio: 'L\'anno scorso mia moglie ha finito il corso di italiano.',
          options: ['è finita', 'ha finito', 'finiva', 'finirà'],
          answer: 1,
          explanation: 'Quando "finire" tem objeto direto ("il corso"), usa o auxiliar "avere": "ha finito".'
        },
        shadowing: {
          it: 'Quando vivevo in Brasile, sognavo di conoscere le città storiche italiane.',
          pron: 'CUÁN-do vi-VÊ-vo in bra-ZÍ-le, so-NHÁ-vo di co-NÔ-she-re le tchit-TÁ STÓ-ri-que i-ta-LIÁ-ne',
          pt: 'Quando eu morava no Brasil, sonhava em conhecer as cidades históricas italianas.'
        }
      },
      {
        id: 'u3',
        stage: 'B1',
        stageLabel: 'Prova B1',
        title: 'Conectivos & Coesão na Scrittura',
        subtitle: 'Elevar e-mails de 80–120 palavras para nota máxima (12/12)',
        minutes: 8,
        dialogue: [
          { spk: 'Prof. Lorenzo', it: 'Un testo B1 non è una lista di frasi brevi: devi collegare le idee.', pt: 'Um texto B1 não é uma lista de frases curtas: você precisa conectar as ideias.' },
          { spk: 'Tu', it: 'Quindi devo usare parole come "inoltre", "tuttavia" e "pertanto"?', pt: 'Então devo usar palavras como "além disso", "contudo" e "portanto"?' },
          { spk: 'Prof. Lorenzo', it: 'Esatto! E non dimenticare di rispettare il limite tra 80 e 120 parole.', pt: 'Exato! E não esqueça de respeitar o limite entre 80 e 120 palavras.' }
        ],
        discovery: {
          ruleTitle: 'Os 5 Conectivos de Ouro do CILS B1 Cittadinanza',
          ruleBody: 'Adicionar 3 ou 4 conectivos lógicos transforma um texto A2 em um texto B1 sólido: Inoltre (adição), Tuttavia / Nonostante (contraste), Poiché / Siccome (causa), Pertanto / Quindi (conclusão).',
          traps: [
            { wrong: 'E... e... e... ma... (repetição A1)', right: 'Inoltre... Tuttavia... Pertanto... (coesão B1)' },
            { wrong: 'Escrever 50 palavras ou 180 palavras', right: 'Ficar estritamente entre 80 e 120 palavras' }
          ]
        },
        builder: {
          prompt: 'Monte a conclusão formal: "Portanto, agradeço pela sua atenção."',
          audio: 'Pertanto, La ringrazio per la Sua attenzione.',
          tokens: ['Pertanto,', 'La', 'ringrazio', 'per', 'la', 'Sua', 'attenzione.'],
          explanation: 'Note o "La" e "Sua" com inicial maiúscula opcional na escrita formal para demonstrar respeito.'
        },
        quiz: {
          prompt: 'Qual conectivo expressa CONDIÇÃO ("contanto que") muito cobrado em avisos do CILS B1?',
          audio: 'Puoi rinnovare il prestito online, purché il libro non sia prenotato.',
          options: ['benché', 'purché', 'inoltre', 'infatti'],
          answer: 1,
          explanation: '"Purché" significa "contanto que / desde que" e sempre pede o verbo no Congiuntivo ("sia").'
        },
        shadowing: {
          it: 'Tuttavia, vorrei chiedere se è possibile spostare l\'orario dell\'appuntamento.',
          pron: 'tut-ta-VÍ-a, vor-RÊI QUIÊ-de-re se è pos-SÍ-bi-le spos-TÁ-re lo-RÁ-rio del-lap-pun-ta-MÊN-to',
          pt: 'Contudo, gostaria de perguntar se é possível remarcar o horário do agendamento.'
        }
      },
      {
        id: 'u4',
        stage: 'B1',
        stageLabel: 'Prova B1',
        title: 'Congiuntivo, Opinioni e Pronomi',
        subtitle: 'Penso che sia, pronomi diretti/indiretti e difesa de opinião',
        minutes: 8,
        dialogue: [
          { spk: 'Esaminatore', it: 'Secondo Lei, perché è importante imparare bene la lingua del Paese in cui si vive?', pt: 'Na sua opinião, por que é importante aprender bem a língua do país onde se vive?' },
          { spk: 'Tu', it: 'Penso che la lingua sia fondamentale per integrarsi e trovare un buon lavoro.', pt: 'Acho que a língua é fundamental para se integrar e encontrar um bom trabalho.' },
          { spk: 'Esaminatore', it: 'E i Suoi figli parlano italiano a casa?', pt: 'E seus filhos falam italiano em casa?' },
          { spk: 'Tu', it: 'Sì, spesso glielo chiedo e pratichiamo insieme dopo cena.', pt: 'Sim, frequentemente peço isso a eles e praticamos juntos depois do jantar.' }
        ],
        discovery: {
          ruleTitle: 'Quando usar o Congiuntivo Presente sem travar',
          ruleBody: 'Sempre que abrir uma opinião com "Penso che", "Credo che", "Spero che" ou "È importante che", use o congiuntivo dos verbos mais frequentes: essere -> sia, avere -> abbia, potere -> possa, fare -> faccia.',
          traps: [
            { wrong: 'Penso che è importante (indicativo)', right: 'Penso che sia importante (congiuntivo B1+)' },
            { wrong: 'Spero che puoi venire', right: 'Spero che tu possa venire' }
          ]
        },
        builder: {
          prompt: 'Monte a frase: "Acho que este curso seja muito útil."',
          audio: 'Penso che questo corso sia molto utile.',
          tokens: ['Penso', 'che', 'questo', 'corso', 'sia', 'molto', 'utile.'],
          explanation: 'Após "Penso che", usamos o congiuntivo presente de "essere": "sia".'
        },
        quiz: {
          prompt: 'Complete com o pronome correto: "Hai già letto il regolamento? — Sì, _____ ho letto ieri."',
          audio: 'Hai già letto il regolamento? Sì, l\'ho letto ieri.',
          options: ['la', 'l\'', 'li', 'gli'],
          answer: 1,
          explanation: '"Il regolamento" é masculino singular; diante de "ho", o pronome "lo" sofre elisão e vira "l\'ho".'
        },
        shadowing: {
          it: 'Credo che conoscere i diritti e i doveri civici sia essenziale per ogni cittadino.',
          pron: 'CRÊ-do quê co-NÔ-she-re i di-RÍT-ti e i do-VÊ-ri TCHÍ-vi-tchi SÍ-a es-sen-TSIÁ-le per Ô-nhi tchit-ta-DÍ-no',
          pt: 'Acredito que conhecer os direitos e deveres cívicos seja essencial para todo cidadão.'
        }
      }
    ];
