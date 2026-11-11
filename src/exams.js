/* Simulados no formato oficial do CILS B1 Cittadinanza (Università per Stranieri di Siena).
   Estrutura conferida na prova-modelo oficial:
   - Ascolto, 30 min: prova 1 = 6 diálogos curtos, múltipla escolha A/B/C (1 ponto cada);
                      prova 2 = 2 textos, 12 afirmações vero/falso (0,5 ponto cada). Total 12.
   - Lettura e riflessione grammaticale, 40 min: prova 1 = texto + 12 vero/falso (0,5 cada);
                      prova 2 = texto para completar, 6 lacunas A/B/C (1 cada). Total 12.
   - Produzione scritta, 40 min: escolher 1 de 2 temas, 80 a 120 palavras. Total 12.
   - Produzione orale: apresentação pessoal (~1 min) + conversa sobre 1 tema (2-3 min). Total 12.
   Os textos abaixo são originais, escritos no mesmo formato. Linhas de diálogo começam com
   "M:" (voz masculina) ou "F:" (voz feminina). */

export const OFFICIAL = {
  page: "https://cils.unistrasi.it/1/89/382/Prove_Liv._B1_c.htm",
  base: "https://cils.unistrasi.it/public/articoli/382/",
  files: [
    ["Caderno de questões (ascolto e lettura)", "Prototipo Quaderno B1 Cittadinanza.pdf"],
    ["Áudio da prova de escuta (MP3)", "UNO_B1 cittadinanza.mp3"],
    ["Transcrição dos áudios", "TRASCRIZIONI B1 Cittadinanza.pdf"],
    ["Temas da produção escrita", "PS_B1_Cittadinanza.pdf"],
    ["Temas da produção oral", "Input aggiuntivo_B1citt_1_PO.pdf"],
    ["Gabarito oficial", "Chiavi B1 Cittadinanza AGGIORNATE.pdf"],
    ["Critérios de correção", "Criteri di valutazione B1 cittadinanza_nuovi.pdf"],
  ],
  // Gabarito oficial publicado pela Università per Stranieri di Siena.
  key: { a1: "CCACBB", a2: "FFVFVVVFFFVV", l1: "FVVVVFVFFVFF", l2: "BACACA" },
};

export const SCORING = {
  scritta: [
    ["Eficácia comunicativa: respondi ao que o tema pede", 3],
    ["Adequação de estilo: formal ou informal conforme o destinatário", 1],
    ["Correção gramatical: verbos, concordância, preposições", 4],
    ["Vocabulário adequado e variado", 3],
    ["Ortografia e pontuação", 1],
  ],
  orale: [
    ["Eficácia comunicativa: me fiz entender e mantive a conversa", 4],
    ["Correção gramatical", 4],
    ["Vocabulário adequado e variado", 3],
    ["Pronúncia e entonação", 1],
  ],
};

export const PRESENTAZIONE = [
  "Come ti chiami?",
  "Quanti anni hai?",
  "Di dove sei?",
  "Dove vivi? Se vivi in Italia, da quanto tempo?",
  "Che cosa fai nella vita, studi o lavori?",
];

export const EXAMS = [
 {
  id: "sim1", t: "Simulado 1",
  a1: [
   {d:["F: Buonasera, ho una prenotazione a nome Rossi.","M: Sì, signora, un tavolo per quattro alle otto.","F: Possiamo sederci vicino alla finestra?","M: Certo, prego, da questa parte."],
    s:"La signora Rossi", o:["è in un ristorante.","prenota una camera in albergo.","cerca un tavolo senza prenotazione."], a:0},
   {d:["M: Scusi, a che ora parte l'autobus per l'ospedale?","F: Il numero dodici passa ogni venti minuti, il prossimo è alle dieci e un quarto.","M: E dove compro il biglietto?","F: Dal tabaccaio qui all'angolo, sull'autobus non si vende."],
    s:"Il signore deve comprare il biglietto", o:["dal tabaccaio.","sull'autobus.","all'ospedale."], a:0},
   {d:["F: Pronto, Marco? Stasera non posso venire alla riunione di condominio.","M: Peccato, si parla delle spese per il nuovo ascensore.","F: Lo so. Mi mandi un messaggio con le decisioni?","M: Certo, ti scrivo dopo la riunione."],
    s:"La donna chiede a Marco di", o:["informarla su cosa si decide.","pagare le spese dell'ascensore.","spostare la riunione a domani."], a:0},
   {d:["M: Buongiorno, vorrei iscrivere mio figlio alla scuola elementare.","F: Le iscrizioni si fanno online, entro il trentuno gennaio.","M: E se non ho un computer?","F: Può venire qui in segreteria il martedì mattina, la aiutiamo noi."],
    s:"Il padre", o:["vuole iscrivere il figlio a scuola.","cerca lavoro nella scuola.","ha perso la password del sito."], a:0},
   {d:["F: Dottore, da ieri ho un forte mal di schiena.","M: Ha fatto qualche sforzo particolare?","F: Sì, ho portato delle scatole pesanti durante il trasloco.","M: Allora deve riposare qualche giorno. Le scrivo un certificato per il lavoro."],
    s:"Il medico", o:["le dà un certificato per il lavoro.","le prescrive un'operazione.","le consiglia di fare sport."], a:0},
   {d:["M: Giulia, hai visto che domani c'è sciopero dei treni?","F: Davvero? Io devo andare a Bologna per un colloquio!","M: Puoi chiedere un passaggio a Luca, va anche lui a Bologna in macchina.","F: Ottima idea, lo chiamo subito."],
    s:"Giulia decide di", o:["chiedere un passaggio in macchina.","rinviare il colloquio.","prendere il treno lo stesso."], a:0},
  ],
  a2: [
   {v:"f", tx:"Buongiorno e benvenuti a «Città informa», il programma del Comune per i cittadini. Da lunedì prossimo apre in via Garibaldi il nuovo Sportello per le famiglie. Qui i genitori possono ricevere informazioni sugli asili nido, sui centri estivi per bambini e sugli aiuti economici del Comune. Lo sportello è aperto dal lunedì al venerdì, dalle nove alle tredici, e il giovedì anche il pomeriggio, fino alle diciotto. Non serve l'appuntamento, ma bisogna portare un documento d'identità. Per chi non parla bene l'italiano, il mercoledì è presente un mediatore culturale che parla inglese, arabo e spagnolo.",
    q:[["Il programma è organizzato dal Comune.",true],["Il nuovo sportello si trova in via Garibaldi.",true],["Lo sportello dà informazioni solo sugli asili nido.",false],["Il giovedì lo sportello chiude alle tredici.",false],["Per andare allo sportello bisogna prendere un appuntamento.",false],["Il mercoledì c'è una persona che aiuta chi non parla bene italiano.",true]]},
   {v:"m", tx:"E ora una storia di lavoro. Amina ha trentaquattro anni ed è arrivata in Italia dal Marocco dieci anni fa. All'inizio lavorava come cameriera in un ristorante di Torino. Intanto, la sera, frequentava un corso di cucina. Tre anni fa ha aperto un piccolo ristorante dove propone piatti marocchini e italiani. Oggi nel suo locale lavorano sei persone, tutte giovani. «Il segreto è la passione», dice Amina, «e anche l'aiuto della mia famiglia». Il prossimo anno vuole aprire un secondo locale a Milano.",
    q:[["Amina vive in Italia da dieci anni.",true],["Il primo lavoro di Amina in Italia è stato in un albergo.",false],["Amina ha frequentato un corso serale di cucina.",true],["Nel ristorante di Amina si cucinano solo piatti italiani.",false],["Nel ristorante di Amina lavorano sei persone.",true],["Amina vuole vendere il suo ristorante.",false]]},
  ],
  l1: {
   t:"Comune di Valfiorita: nuovo servizio di raccolta dei rifiuti",
   tx:"Dal 1° aprile il Comune di Valfiorita cambia il sistema di raccolta dei rifiuti. I cassonetti in strada saranno eliminati e la raccolta si farà «porta a porta»: ogni famiglia riceverà gratuitamente cinque contenitori di colori diversi, uno per la carta, uno per la plastica, uno per il vetro, uno per l'organico e uno per l'indifferenziato.\n\nI contenitori si possono ritirare presso l'Ecosportello di piazza Mazzini, dal lunedì al sabato, dalle 8:30 alle 12:30. Per il ritiro è necessario presentare la tessera sanitaria dell'intestatario della tassa sui rifiuti (TARI). Chi non può andare di persona può delegare un familiare.\n\nI rifiuti devono essere messi fuori casa la sera prima del giorno di raccolta, dopo le ore 20:00. Il calendario con i giorni di raccolta è disponibile sul sito del Comune e sull'app «Valfiorita Pulita».\n\nGli oggetti grandi, come mobili ed elettrodomestici, non si possono lasciare in strada: il ritiro è gratuito, ma si deve prenotare chiamando il numero verde del Comune.\n\nCon il nuovo sistema il Comune vuole arrivare al 75% di raccolta differenziata entro due anni.",
   q:[["Il nuovo sistema di raccolta inizia ad aprile.",true],["I cassonetti in strada restano per i rifiuti indifferenziati.",false],["Le famiglie devono pagare i nuovi contenitori.",false],["Ogni famiglia riceve cinque contenitori.",true],["L'Ecosportello è aperto anche il sabato mattina.",true],["Per ritirare i contenitori serve la tessera sanitaria.",true],["Solo l'intestatario della TARI può ritirare i contenitori.",false],["I rifiuti si portano fuori la mattina del giorno di raccolta.",false],["Il calendario della raccolta si trova anche su un'app.",true],["I mobili vecchi si possono lasciare vicino ai contenitori.",false],["Il ritiro degli oggetti grandi si prenota al telefono.",true],["Oggi il Comune ha già il 75% di raccolta differenziata.",false]]},
  l2: {
   t:"Una lettera dal Centro Provinciale",
   tx:"Gentile signora Bianchi,\nle scrivo per (0) ___ che il corso di italiano per adulti del Centro Provinciale (1) ___ lunedì 14 ottobre. Le lezioni si svolgono (2) ___ sede di via Roma 15, il lunedì e il mercoledì dalle 18:00 alle 20:00. Il corso è gratuito, (3) ___ è obbligatorio frequentare almeno il 70% delle lezioni. Alla fine del corso gli studenti (4) ___ sostenere l'esame per il livello B1. Se ha bisogno di altre informazioni, (5) ___ può telefonare dal lunedì al venerdì.\n(6) ___ ringrazio e le invio cordiali saluti.\nLa segreteria",
   ex:["informarla","informarle","informare"],
   q:[["inizia","iniziava","inizierebbe"],["nella","alla","sulla"],["ma","perché","quindi"],["possono","potevano","potessero"],["mi","le","ci"],["La","Le","Gli"]]},
  w: [
   {p:"Il tuo vicino di casa ascolta musica ad alto volume ogni sera fino a tardi. Scrivi un messaggio all'amministratore del condominio: descrivi il problema, spiega da quanto tempo succede e chiedi di intervenire.",
    m:"Gentile amministratore,\nle scrivo perché ho un problema con il vicino dell'appartamento 4. Da circa un mese ascolta musica ad alto volume ogni sera, spesso fino all'una di notte. Io lavoro in un ospedale e la mattina mi sveglio alle sei, quindi non riesco a dormire abbastanza. Ho già provato a parlare con lui, ma la situazione non è cambiata. Anche altri condomini si sono lamentati. Le chiedo gentilmente di intervenire, magari con una lettera o durante la prossima riunione di condominio. La ringrazio per l'attenzione e resto in attesa di una sua risposta.\nCordiali saluti,\nAna Souza"},
   {p:"Hai visto un annuncio per un lavoro come commesso o commessa in un negozio del tuo quartiere. Scrivi una mail al negozio: presentati, racconta le tue esperienze di lavoro e chiedi informazioni sull'orario.",
    m:"Buongiorno,\nmi chiamo Carlos Lima, ho trentadue anni e vivo in Italia da tre anni. Ho visto il vostro annuncio per un posto da commesso e vorrei candidarmi. In Brasile ho lavorato per cinque anni in un negozio di abbigliamento, dove servivo i clienti e mi occupavo della cassa. In Italia ho lavorato in un supermercato per un anno. Sono una persona precisa e mi piace il contatto con il pubblico. Vorrei sapere quali sono gli orari di lavoro e se è previsto un lavoro anche nel fine settimana. Allego il mio curriculum.\nGrazie e cordiali saluti,\nCarlos Lima"}],
  o: ["Che cosa ti piace di più della città dove vivi? E che cosa cambieresti?","Come si festeggia una festa importante nel tuo Paese? E in Italia?","È meglio lavorare in un'azienda grande o piccola? Perché?","Quali sono, secondo te, i diritti e i doveri di un cittadino?"],
 },
 {
  id: "sim2", t: "Simulado 2",
  a1: [
   {d:["M: Buongiorno, ho perso il mio portafoglio sul treno da Firenze.","F: Ha già fatto la denuncia?","M: Non ancora, dove devo andare?","F: Può farla qui alla Polizia Ferroviaria, vicino al binario uno."],
    s:"L'uomo", o:["ha perso il portafoglio.","ha perso il treno per Firenze.","lavora alla Polizia Ferroviaria."], a:0},
   {d:["F: Buongiorno, vorrei due etti di prosciutto crudo.","M: Ecco a lei. Altro?","F: Sì, anche un pezzo di parmigiano, non troppo grande.","M: Va bene così? Sono trecento grammi."],
    s:"La signora è", o:["in un negozio di alimentari.","in un ristorante.","in farmacia."], a:0},
   {d:["M: Ciao Sara, vieni alla festa di compleanno di Paolo sabato?","F: Mi piacerebbe, ma lavoro fino alle dieci di sera.","M: Non importa, la festa finisce tardi.","F: Allora vengo dopo il lavoro."],
    s:"Sara", o:["va alla festa dopo il lavoro.","non va alla festa.","organizza la festa."], a:0},
   {d:["F: Pronto, chiamo per il guasto della lavatrice.","M: Sì, signora, il tecnico può venire giovedì pomeriggio.","F: Giovedì lavoro, non c'è un giorno prima?","M: Allora domani mattina alle nove."],
    s:"Il tecnico va dalla signora", o:["domani mattina.","giovedì pomeriggio.","la settimana prossima."], a:0},
   {d:["M: Scusi, per il rinnovo del permesso di soggiorno che cosa devo portare?","F: Il kit della posta compilato, quattro foto, il passaporto e una marca da bollo da sedici euro.","M: E la domanda dove la consegno?","F: Allo Sportello Amico dell'ufficio postale."],
    s:"L'uomo chiede informazioni per", o:["rinnovare il permesso di soggiorno.","spedire un pacco.","fare il passaporto."], a:0},
   {d:["F: Luca, quest'estate andiamo al mare o in montagna?","M: Il mare ad agosto costa troppo.","F: È vero, però in montagna piove spesso.","M: Allora andiamo al mare a settembre, è più economico."],
    s:"Luca propone di", o:["andare al mare a settembre.","andare in montagna ad agosto.","restare a casa."], a:0},
  ],
  a2: [
   {v:"f", tx:"Siete pronti per il fine settimana? Ecco gli appuntamenti in città. Sabato in piazza del Duomo c'è la Festa del Pane: i fornai della provincia preparano pane e dolci tradizionali e i bambini possono partecipare a un laboratorio gratuito. La festa comincia alle dieci e finisce alle venti. Domenica, invece, i musei comunali sono aperti con ingresso gratuito per tutti, dalle nove alle diciannove. Attenzione: per la mostra di fotografia al Palazzo Comunale è obbligatoria la prenotazione online. In caso di pioggia, la Festa del Pane si sposta sotto i portici di via Verdi.",
    q:[["La Festa del Pane è sabato.",true],["I bambini possono partecipare gratis a un laboratorio.",true],["La festa dura tutta la notte.",false],["Domenica bisogna pagare per entrare nei musei comunali.",false],["Per la mostra di fotografia bisogna prenotare.",true],["Se piove, la festa viene annullata.",false]]},
   {v:"m", tx:"Parliamo di salute. Secondo una ricerca recente, solo un italiano su tre fa attività fisica in modo regolare. I medici consigliano almeno trenta minuti di movimento al giorno, anche semplice: camminare, andare in bicicletta, salire le scale a piedi. Molti Comuni organizzano gruppi di cammino gratuiti per adulti e anziani, guidati da un istruttore. Per partecipare basta iscriversi presso la propria azienda sanitaria. Fare movimento insieme ad altre persone aiuta anche a combattere la solitudine.",
    q:[["Secondo la ricerca, la maggior parte degli italiani fa sport regolarmente.",false],["I medici consigliano mezz'ora di movimento al giorno.",true],["Anche camminare è un'attività utile per la salute.",true],["I gruppi di cammino sono a pagamento.",false],["Per partecipare ai gruppi bisogna iscriversi all'azienda sanitaria.",true],["Fare movimento in gruppo aiuta a sentirsi meno soli.",true]]},
  ],
  l1: {
   t:"Biblioteca civica: regolamento per gli utenti",
   tx:"L'iscrizione alla biblioteca è gratuita ed è aperta a tutti, anche a chi non è residente nel Comune. Per iscriversi è necessario presentare un documento d'identità valido e il codice fiscale. I minori di 14 anni devono essere accompagnati da un genitore.\n\nCon la tessera della biblioteca si possono prendere in prestito fino a cinque libri e tre DVD per volta. Il prestito dei libri dura trenta giorni e si può rinnovare una sola volta, anche online. I DVD, invece, si devono restituire entro una settimana.\n\nChi restituisce i materiali in ritardo non paga una multa, ma non può prendere altri prestiti per quindici giorni.\n\nLa biblioteca offre anche la connessione Wi-Fi gratuita, una sala studio silenziosa e, ogni giovedì pomeriggio, un gruppo di conversazione in italiano per stranieri, gratuito e senza prenotazione.\n\nNella sala studio è vietato mangiare e usare il telefono.",
   q:[["Per iscriversi alla biblioteca bisogna pagare.",false],["Anche chi non abita nel Comune può iscriversi.",true],["Per l'iscrizione servono un documento e il codice fiscale.",true],["Un bambino di dieci anni può iscriversi da solo.",false],["Si possono prendere in prestito al massimo cinque libri alla volta.",true],["Il prestito dei libri dura due settimane.",false],["Il prestito dei libri si può rinnovare via internet.",true],["I DVD si possono tenere per un mese.",false],["Chi restituisce un libro in ritardo deve pagare una multa.",false],["In biblioteca il Wi-Fi è gratuito.",true],["Il gruppo di conversazione si fa ogni giovedì.",true],["Nella sala studio si può telefonare a bassa voce.",false]]},
  l2: {
   t:"Una lettera da Bari",
   tx:"Cara Elena,\ncome stai? Io sto bene. (0) ___ scrivo da Bari, dove vivo da due mesi. La città è bellissima e la gente è molto (1) ___. Ho trovato un appartamento piccolo ma luminoso, vicino (2) ___ mare. Ogni mattina (3) ___ al lavoro in bicicletta. Il fine settimana scorso (4) ___ a Polignano con i miei colleghi: abbiamo mangiato il pesce fresco e (5) ___ il bagno. Perché non vieni a trovarmi? A luglio ho (6) ___ giorno di ferie.\nUn abbraccio,\nMarta",
   ex:["Ti","Le","Mi"],
   q:[["gentile","gentili","gentilmente"],["al","del","nel"],["vado","andavo","andrei"],["sono andata","ho andato","andavo"],["abbiamo fatto","siamo fatti","facevamo"],["qualche","alcuni","ogni"]]},
  w: [
   {p:"Tuo figlio è malato e domani non può andare a scuola. Scrivi una mail all'insegnante: spiega che cosa è successo, per quanti giorni sarà assente e chiedi quali compiti deve fare a casa.",
    m:"Gentile maestra Ferri,\nle scrivo per informarla che mio figlio Pedro, della classe terza B, da ieri sera ha la febbre alta e il mal di gola. Stamattina l'ho portato dal pediatra, che gli ha consigliato di restare a casa per tre o quattro giorni. Pedro è dispiaciuto perché non vuole perdere le lezioni, soprattutto quelle di matematica. Le chiedo, per favore, di dirmi quali compiti deve fare a casa, così può restare al passo con i compagni. Quando tornerà a scuola porterò il certificato medico. La ringrazio molto per la disponibilità.\nCordiali saluti,\nJuliana Costa"},
   {p:"Un tuo amico vuole venire a vivere in Italia. Scrivigli un messaggio: racconta la tua esperienza e dagli qualche consiglio sui documenti e sulla ricerca della casa.",
    m:"Caro Rafael,\nche bella notizia! Anch'io all'inizio ero un po' preoccupato, ma adesso mi trovo molto bene in Italia. Il primo consiglio è di preparare bene i documenti prima di partire: il passaporto, il certificato di nascita tradotto e, se ce l'hai, il visto. Appena arrivi, devi chiedere il codice fiscale all'Agenzia delle Entrate. Per la casa, ti consiglio di cercare su internet, ma di non pagare niente prima di vedere l'appartamento. All'inizio puoi stare da me per qualche settimana, così cerchiamo insieme. Scrivimi quando hai la data del volo!\nUn abbraccio,\nTiago"}],
  o: ["Preferisci fare la spesa al supermercato o al mercato? Perché?","Com'è la scuola nel tuo Paese rispetto a quella italiana?","Che cosa fai nel tempo libero? E nel fine settimana?","Quali sono le difficoltà di un cittadino straniero appena arrivato in Italia?"],
 },
];

/* Edições 3 a 20: montadas a partir do banco de itens originais (bank.js), sempre com
   6 diálogos, 2 textos de rádio (12 vero/falso), 1 leitura (12 vero/falso), 1 texto
   para completar (6 lacunas), 2 temas de escrita e 4 temas orais. */
import { DIALOGHI, MONOLOGHI, LETTURE, CLOZE, SCRITTURE, ORALI } from "./bank.js";
for (let k = 0; k < 18; k++) {
  EXAMS.push({
    id: "sim" + (k + 3), t: "Simulado " + (k + 3),
    a1: Array.from({ length: 6 }, (_, j) => { const n = (k * 6 + j * 5) % DIALOGHI.length; const x = DIALOGHI[n]; return { k: "b" + n, d: x.d, s: x.s, o: x.o, a: 0 }; }),
    a2: [MONOLOGHI[(2 * k) % MONOLOGHI.length], MONOLOGHI[(2 * k + 1) % MONOLOGHI.length]],
    l1: LETTURE[k % LETTURE.length],
    l2: CLOZE[(k + 2) % CLOZE.length],
    w: [SCRITTURE[k % SCRITTURE.length], SCRITTURE[(k + 3) % SCRITTURE.length]],
    o: Array.from({ length: 4 }, (_, j) => ORALI[(4 * k + j) % ORALI.length]),
  });
}
