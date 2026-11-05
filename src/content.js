/* Conteúdo do curso: gramática, vocabulário, escuta, leitura, escrita e fala. */
export const UNITS = [
 {id:"pron", lv:"A1", t:"Pronúncia: ler como se escreve", e:`<p>Boa notícia: o italiano se lê quase sempre como se escreve. <b>Toque em qualquer palavra verde para ouvir.</b></p>
<table><tr><th>Escrita</th><th>Som</th><th>Exemplos</th></tr>
<tr><td>ce, ci</td><td>"tch"</td><td><span class="ex-it">ciao</span>, <span class="ex-it">cena</span></td></tr>
<tr><td>che, chi</td><td>"k"</td><td><span class="ex-it">chi</span>, <span class="ex-it">chiesa</span></td></tr>
<tr><td>ge, gi</td><td>"dj"</td><td><span class="ex-it">gelato</span>, <span class="ex-it">giorno</span></td></tr>
<tr><td>ghe, ghi</td><td>"g" de gato</td><td><span class="ex-it">spaghetti</span></td></tr>
<tr><td>gli</td><td>"lh"</td><td><span class="ex-it">famiglia</span>, <span class="ex-it">figlio</span></td></tr>
<tr><td>gn</td><td>"nh"</td><td><span class="ex-it">bagno</span>, <span class="ex-it">gnocchi</span></td></tr>
<tr><td>sce, sci</td><td>"ch" de chave</td><td><span class="ex-it">pesce</span>, <span class="ex-it">uscita</span></td></tr>
<tr><td>z</td><td>"ts" ou "dz"</td><td><span class="ex-it">pizza</span>, <span class="ex-it">zero</span></td></tr>
<tr><td>h</td><td>mudo</td><td><span class="ex-it">ho</span>, <span class="ex-it">hanno</span></td></tr></table>
<p><b>Consoantes dobradas</b> são pronunciadas mais longas, e isso muda o sentido: <span class="ex-it">nono</span> (nono) × <span class="ex-it">nonno</span> (avô), <span class="ex-it">pala</span> (pá) × <span class="ex-it">palla</span> (bola).</p>
<p>O <b>r</b> é sempre vibrado, como no "caro" do português, nunca como o "r" carioca.</p>`,
 q:[
  {s:"Como soa o «ch» em «chi»?",o:["Como k","Como tch","Como x"],a:0,x:"ch antes de e/i soa como k: chi = 'ki'."},
  {s:"Em «ciao», o «ci» soa como:",o:["tch","k","s"],a:0,x:"c antes de i/e = tch: 'tchao'."},
  {s:"O «gn» de «bagno» soa como:",o:["nh","g + n","n"],a:0,x:"gn = nh: 'banho'."},
  {say:"nonno",s:"Ouça. Qual palavra foi dita?",o:["nonno","nono"],a:0,x:"Nonno (avô) tem n dobrado e mais longo."},
  {say:"pesce",s:"Ouça. Como se escreve?",o:["pesce","pesche"],a:0,x:"Pesce (peixe) soa 'peche'. Pesche (pêssegos) soa 'peske'."},
  {s:"O «h» de «ho» (eu tenho) é:",o:["Mudo","Como r","Como o h do inglês"],a:0,x:"O h italiano nunca tem som."}]},
 {id:"sal", lv:"A1", t:"Saudações e apresentações", e:`<table><tr><td><span class="ex-it">Ciao!</span></td><td>Oi! / Tchau! (informal)</td></tr>
<tr><td><span class="ex-it">Buongiorno!</span></td><td>Bom dia! (até o meio da tarde)</td></tr>
<tr><td><span class="ex-it">Buonasera!</span></td><td>Boa tarde / boa noite (ao chegar)</td></tr>
<tr><td><span class="ex-it">Arrivederci!</span></td><td>Até logo (educado)</td></tr>
<tr><td><span class="ex-it">Mi chiamo Ana.</span></td><td>Meu nome é Ana.</td></tr>
<tr><td><span class="ex-it">Piacere!</span></td><td>Prazer!</td></tr>
<tr><td><span class="ex-it">Come stai?</span></td><td>Como vai? (amigo)</td></tr>
<tr><td><span class="ex-it">Come sta?</span></td><td>Como vai? (formal)</td></tr>
<tr><td><span class="ex-it">Bene, grazie. E tu?</span></td><td>Bem, obrigado. E você?</td></tr></table>
<p><b>Tu ou Lei?</b> Com amigos e família use <i>tu</i>. Com desconhecidos, funcionários públicos e o examinador use <b>Lei</b>, o "você/senhor" formal, que leva o verbo na 3ª pessoa: <span class="ex-it">Lei come si chiama?</span></p>`,
 q:[
  {s:"Você entra no Comune às 10h. Diga:",o:["Buongiorno!","Buonanotte!","Ciao ragazzi!"],a:0,x:"De manhã, num lugar formal: Buongiorno."},
  {s:"«Mi chiamo Paulo» significa:",o:["Meu nome é Paulo","Eu chamo o Paulo","O Paulo me chamou"],a:0,x:"Chiamarsi = chamar-se."},
  {s:"Para perguntar «como vai?» a um funcionário, de forma educada:",o:["Come sta?","Come stai?","Come stanno?"],a:0,x:"Formal (Lei): Come sta?"},
  {s:"Alguém diz «Piacere!». Você responde:",o:["Piacere mio!","Prego mio!","Buonanotte!"],a:0,x:"Piacere mio = o prazer é meu."},
  {s:"Mi ___ Ana.",tr:"Meu nome é Ana. (literalmente: eu me chamo Ana)",f:["chiamo"],x:"Mi chiamo = eu me chamo."},
  {s:"«Arrivederci» se usa para:",o:["Despedir-se","Agradecer","Pedir desculpas"],a:0,x:"Arrivederci = até logo."}]},
 {id:"art", lv:"A1", t:"Artigos e plural", e:`<p>Em italiano, todo substantivo é masculino ou feminino, como em português.</p>
<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
<tr><td>Masculino (regra geral)</td><td><span class="ex-it">il libro</span></td><td><span class="ex-it">i libri</span></td></tr>
<tr><td>Masc. antes de s+consoante, z</td><td><span class="ex-it">lo studente</span></td><td><span class="ex-it">gli studenti</span></td></tr>
<tr><td>Masc. antes de vogal</td><td><span class="ex-it">l'amico</span></td><td><span class="ex-it">gli amici</span></td></tr>
<tr><td>Feminino</td><td><span class="ex-it">la casa</span></td><td><span class="ex-it">le case</span></td></tr>
<tr><td>Fem. antes de vogal</td><td><span class="ex-it">l'amica</span></td><td><span class="ex-it">le amiche</span></td></tr></table>
<p><b>Plural</b>: -o → -i (<i>libro → libri</i>), -a → -e (<i>casa → case</i>), -e → -i (<i>chiave → chiavi</i>).</p>
<p>"Um/uma": <i>un libro, uno studente, una casa, un'amica</i>.</p>`,
 q:[
  {s:"___ casa",tr:"a casa",o:["la","il","lo"],a:0,x:"Casa é feminino: la."},
  {s:"___ studente",tr:"o estudante",o:["lo","il","la"],a:0,x:"s + consoante: lo."},
  {s:"___ amico",tr:"o amigo",o:["l'","il","lo"],a:0,x:"Antes de vogal: l'."},
  {s:"Qual é o plural de «il libro»?",o:["i libri","il libri","le libre"],a:0,x:"il → i, -o → -i."},
  {s:"Qual é o plural de «la chiave»?",o:["le chiavi","le chiave","la chiavi"],a:0,x:"-e → -i, la → le."},
  {s:"Una pizza, due ___ .",tr:"Uma pizza, duas pizzas.",f:["pizze"],x:"-a → -e: pizze."}]},
 {id:"ea", lv:"A1", t:"Essere e avere: ser/estar e ter", e:`<p>Os dois verbos mais importantes. Decore primeiro estes dois.</p>
<table><tr><th></th><th>essere (ser/estar)</th><th>avere (ter)</th></tr>
<tr><td>io (eu)</td><td>sono</td><td>ho</td></tr><tr><td>tu (você)</td><td>sei</td><td>hai</td></tr>
<tr><td>lui, lei, Lei (ele, ela, o senhor)</td><td>è</td><td>ha</td></tr><tr><td>noi (nós)</td><td>siamo</td><td>abbiamo</td></tr>
<tr><td>voi (vocês)</td><td>siete</td><td>avete</td></tr><tr><td>loro (eles)</td><td>sono</td><td>hanno</td></tr></table>
<p><span class="ex-it">Sono brasiliano.</span> Sou brasileiro.</p>
<p><b>Atenção:</b> idade, fome, sede e frio usam <b>avere</b>: <span class="ex-it">Ho trent'anni.</span> (Tenho 30 anos) · <span class="ex-it">Ho fame.</span> (Estou com fome)</p>
<p><b>C'è / ci sono</b> = há, tem: <span class="ex-it">C'è un bar qui vicino.</span></p>`,
 q:[
  {s:"Io ___ brasiliano.",tr:"Eu sou brasileiro.",o:["sono","ho","è"],a:0,x:"Io sono = eu sou."},
  {s:"Quanti anni hai? — ___ 35 anni.",tr:"Quantos anos você tem? — Tenho 35 anos.",o:["Ho","Sono","Hai"],a:0,x:"Idade usa avere: ho."},
  {s:"Noi ___ fame.",tr:"Nós estamos com fome.",o:["abbiamo","siamo","avete"],a:0,x:"Fome usa avere: abbiamo fame."},
  {s:"Lei ___ di Napoli, signora?",tr:"A senhora é de Nápoles?",o:["è","sei","ha"],a:0,x:"Lei (formal) usa a 3ª pessoa: è."},
  {s:"Loro ___ due figli.",tr:"Eles têm dois filhos.",f:["hanno"],x:"Loro hanno (o h é mudo: 'anno')."},
  {s:"Nel centro ___ molti negozi.",tr:"No centro há muitas lojas.",o:["ci sono","c'è","è"],a:0,x:"Plural: ci sono."}]},
 {id:"pres", lv:"A1", t:"O presente dos verbos regulares", e:`<p>Os verbos terminam em <b>-are</b>, <b>-ere</b> ou <b>-ire</b>. Tire a terminação e acrescente:</p>
<table><tr><th></th><th>parlare (falar)</th><th>prendere (pegar)</th><th>dormire (dormir)</th></tr>
<tr><td>io</td><td>parlo</td><td>prendo</td><td>dormo</td></tr><tr><td>tu</td><td>parli</td><td>prendi</td><td>dormi</td></tr>
<tr><td>lui/lei</td><td>parla</td><td>prende</td><td>dorme</td></tr><tr><td>noi</td><td>parliamo</td><td>prendiamo</td><td>dormiamo</td></tr>
<tr><td>voi</td><td>parlate</td><td>prendete</td><td>dormite</td></tr><tr><td>loro</td><td>parlano</td><td>prendono</td><td>dormono</td></tr></table>
<p>Como em português, o pronome pode sumir: <span class="ex-it">Parlo un po' di italiano.</span> (Falo um pouco de italiano)</p>
<p>Alguns verbos em -ire ganham <b>-isc-</b>: <span class="ex-it">capisco, capisci, capisce</span> (entendo, entende…).</p>
<p>Negação: <b>non</b> antes do verbo. <span class="ex-it">Non capisco.</span> (Não entendo)</p>`,
 q:[
  {s:"Io ___ italiano. (parlare)",tr:"Eu falo italiano.",o:["parlo","parla","parli"],a:0,x:"io → -o."},
  {s:"Noi ___ in Brasile. (abitare)",tr:"Nós moramos no Brasil.",o:["abitiamo","abitano","abitate"],a:0,x:"noi → -iamo."},
  {s:"Tu ___ un caffè? (prendere)",tr:"Você toma um café?",o:["prendi","prende","prendo"],a:0,x:"tu → -i."},
  {s:"Loro ___ (lavorare) a Roma.",tr:"Eles trabalham em Roma.",f:["lavorano"],x:"loro → -ano (para -are)."},
  {s:"Scusi, non ___ . (capire)",tr:"Desculpe, não entendo.",o:["capisco","capo","capiscono"],a:0,x:"Capire tem -isc-: capisco."},
  {s:"Voi ___ (dormire) molto.",tr:"Vocês dormem muito.",f:["dormite"],x:"voi → -ite (para -ire)."}]},
 {id:"num", lv:"A1", t:"Números, horas e dias", e:`<p>Toque para ouvir: <span class="ex-it">uno</span>, <span class="ex-it">due</span>, <span class="ex-it">tre</span>, <span class="ex-it">quattro</span>, <span class="ex-it">cinque</span>, <span class="ex-it">sei</span>, <span class="ex-it">sette</span>, <span class="ex-it">otto</span>, <span class="ex-it">nove</span>, <span class="ex-it">dieci</span>.</p>
<p>11 a 20: <span class="ex-it">undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove, venti</span>.</p>
<p>Dezenas: <span class="ex-it">trenta, quaranta, cinquanta, sessanta, settanta, ottanta, novanta, cento</span>. Junte direto: <i>ventidue</i> (22). Com 1 e 8 a dezena perde a vogal: <i>ventuno, ventotto</i>.</p>
<p><b>Horas</b>: <span class="ex-it">Che ore sono?</span> (Que horas são?) · <span class="ex-it">Sono le tre.</span> · <span class="ex-it">È l'una.</span> · <span class="ex-it">Sono le otto e mezza.</span> (8h30)</p>
<p><b>Dias</b>: <span class="ex-it">lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica</span>. Escrevem-se com minúscula.</p>`,
 q:[
  {say:"diciassette",s:"Ouça. Qual é o número?",o:["17","70","7"],a:0,x:"Diciassette = dieci + sette = 17."},
  {s:"«Quindici» é:",o:["15","50","5"],a:0,x:"Quindici = 15. Cinquanta = 50."},
  {s:"Como se diz «São três horas»?",o:["Sono le tre.","È le tre.","Ha le tre."],a:0,x:"Para horas no plural: sono le…"},
  {s:"Qual dia vem depois de «lunedì»?",o:["martedì","mercoledì","domenica"],a:0,x:"Lunedì (segunda), martedì (terça)."},
  {s:"21 = ___",f:["ventuno"],x:"Venti + uno perde o i: ventuno."},
  {say:"ottantotto",s:"Ouça. Qual é o número?",o:["88","18","80"],a:0,x:"Ottanta + otto = ottantotto."}]},
 {id:"irr", lv:"A1", t:"Verbos irregulares do dia a dia", e:`<table><tr><th></th><th>andare (ir)</th><th>fare (fazer)</th><th>volere (querer)</th></tr>
<tr><td>io</td><td>vado</td><td>faccio</td><td>voglio</td></tr><tr><td>tu</td><td>vai</td><td>fai</td><td>vuoi</td></tr>
<tr><td>lui/lei</td><td>va</td><td>fa</td><td>vuole</td></tr><tr><td>noi</td><td>andiamo</td><td>facciamo</td><td>vogliamo</td></tr>
<tr><td>voi</td><td>andate</td><td>fate</td><td>volete</td></tr><tr><td>loro</td><td>vanno</td><td>fanno</td><td>vogliono</td></tr></table>
<p>Outros: <b>potere</b> (poder): posso, puoi, può… · <b>dovere</b> (dever): devo, devi, deve, dobbiamo… · <b>venire</b> (vir): vengo, vieni, viene…</p>
<p>Querer/poder/dever + infinitivo: <span class="ex-it">Voglio imparare l'italiano.</span> (Quero aprender italiano) · <span class="ex-it">Posso entrare?</span> (Posso entrar?)</p>`,
 q:[
  {s:"Domani ___ a Roma. (io, andare)",tr:"Amanhã vou a Roma.",o:["vado","ando","va"],a:0,x:"Andare é irregular: vado."},
  {s:"Cosa ___ stasera? (tu, fare)",tr:"O que você faz hoje à noite?",o:["fai","fa","fate"],a:0,x:"tu fai."},
  {s:"___ imparare l'italiano. (io, volere)",tr:"Quero aprender italiano.",o:["Voglio","Volo","Vuole"],a:0,x:"io voglio."},
  {s:"Scusi, ___ entrare? (io, potere)",tr:"Com licença, posso entrar?",o:["posso","puoi","può"],a:0,x:"io posso."},
  {s:"Noi ___ (dovere) studiare.",tr:"Nós precisamos estudar.",f:["dobbiamo"],x:"noi dobbiamo."},
  {s:"Da dove ___ ? (tu, venire)",tr:"De onde você vem?",o:["vieni","viene","vengo"],a:0,x:"tu vieni."}]},
 {id:"dom", lv:"A1", t:"Fazer perguntas", e:`<table><tr><td><span class="ex-it">Chi?</span></td><td>Quem?</td></tr><tr><td><span class="ex-it">Che cosa? / Cosa?</span></td><td>O quê?</td></tr>
<tr><td><span class="ex-it">Dove?</span></td><td>Onde?</td></tr><tr><td><span class="ex-it">Quando?</span></td><td>Quando?</td></tr>
<tr><td><span class="ex-it">Come?</span></td><td>Como?</td></tr><tr><td><span class="ex-it">Quanto costa?</span></td><td>Quanto custa?</td></tr>
<tr><td><span class="ex-it">Perché?</span></td><td>Por quê? (e também "porque")</td></tr><tr><td><span class="ex-it">A che ora?</span></td><td>A que horas?</td></tr></table>
<p>Frases de sobrevivência: <span class="ex-it">Dov'è il bagno?</span> · <span class="ex-it">Può ripetere, per favore?</span> · <span class="ex-it">Può parlare più piano?</span> (Pode falar mais devagar?)</p>`,
 q:[
  {s:"___ ti chiami?",tr:"Como você se chama?",o:["Come","Dove","Chi"],a:0,x:"Come = como."},
  {s:"___ abiti? — A Milano.",tr:"Onde você mora? — Em Milão.",o:["Dove","Quando","Chi"],a:0,x:"Dove = onde."},
  {s:"___ costa il biglietto?",tr:"Quanto custa a passagem?",o:["Quanto","Come","Perché"],a:0,x:"Quanto = quanto."},
  {s:"___ è quel signore? — È mio padre.",tr:"Quem é aquele senhor? — É meu pai.",o:["Chi","Cosa","Dove"],a:0,x:"Chi = quem."},
  {s:"___ parte il treno? — Alle otto.",tr:"A que horas sai o trem? — Às oito.",o:["A che ora","Dove","Chi"],a:0,x:"A che ora = a que horas."},
  {s:"«Perché studi italiano?» significa:",o:["Por que você estuda italiano?","Quando você estuda italiano?","Onde você estuda italiano?"],a:0,x:"Perché = por quê."}]},
 {id:"pos", lv:"A2", t:"Possessivos e adjetivos", e:`<table><tr><th></th><th>masc.</th><th>fem.</th><th>masc. pl.</th><th>fem. pl.</th></tr>
<tr><td>meu</td><td>il mio</td><td>la mia</td><td>i miei</td><td>le mie</td></tr><tr><td>teu</td><td>il tuo</td><td>la tua</td><td>i tuoi</td><td>le tue</td></tr>
<tr><td>seu/dele/dela</td><td>il suo</td><td>la sua</td><td>i suoi</td><td>le sue</td></tr><tr><td>nosso</td><td>il nostro</td><td>la nostra</td><td>i nostri</td><td>le nostre</td></tr></table>
<p>Com <b>um familiar no singular</b> não se usa artigo: <span class="ex-it">mia madre, mio fratello</span>. No plural volta: <span class="ex-it">i miei fratelli</span>.</p>
<p>Adjetivos concordam como em português: <span class="ex-it">un ragazzo alto, una ragazza alta, ragazzi alti, ragazze alte</span>. Os terminados em -e servem para os dois gêneros: <i>gentile, grande</i>.</p>`,
 q:[
  {s:"___ madre si chiama Rosa.",tr:"Minha mãe se chama Rosa.",o:["Mia","La mia","Mio"],a:0,x:"Familiar no singular: sem artigo."},
  {s:"___ fratelli vivono in Brasile.",tr:"Meus irmãos moram no Brasil.",o:["I miei","Miei","Le mie"],a:0,x:"Plural: volta o artigo."},
  {s:"Abito in una casa ___ .",tr:"Moro numa casa pequena.",o:["piccola","piccolo","piccoli"],a:0,x:"Casa é feminino singular."},
  {s:"Ho due amiche ___ .",tr:"Tenho duas amigas simpáticas.",o:["simpatiche","simpatici","simpatica"],a:0,x:"Feminino plural: -che."},
  {s:"Signora, questo è il ___ passaporto?",tr:"Senhora, este é o seu passaporte?",o:["suo","tuo","loro"],a:0,x:"Formal (Lei): suo."},
  {s:"Le ___ amiche sono italiane.",tr:"Minhas amigas são italianas.",f:["mie"],x:"Feminino plural: le mie."}]},
 {id:"prep", lv:"A2", t:"Preposições simples", e:`<table><tr><td><b>a</b></td><td>cidades: <span class="ex-it">vivo a Roma</span></td></tr>
<tr><td><b>in</b></td><td>países e transportes: <span class="ex-it">vivo in Italia, vado in treno</span></td></tr>
<tr><td><b>di</b></td><td>origem e posse: <span class="ex-it">sono di Recife, il libro di Marco</span></td></tr>
<tr><td><b>da</b></td><td>desde / há: <span class="ex-it">studio da due mesi</span> (estudo há dois meses)</td></tr>
<tr><td><b>con</b></td><td>com: <span class="ex-it">con mia moglie</span></td></tr>
<tr><td><b>per</b></td><td>para / por: <span class="ex-it">per la cittadinanza</span></td></tr>
<tr><td><b>tra / fra</b></td><td>entre / daqui a: <span class="ex-it">tra dieci minuti</span></td></tr></table>`,
 q:[
  {s:"Vivo ___ Roma.",tr:"Moro em Roma.",o:["a","in","di"],a:0,x:"Cidade: a."},
  {s:"Vivo ___ Italia.",tr:"Moro na Itália.",o:["in","a","di"],a:0,x:"País: in."},
  {s:"Sono ___ San Paolo.",tr:"Sou de São Paulo.",o:["di","a","in"],a:0,x:"Origem com essere: di."},
  {s:"Studio italiano ___ due mesi.",tr:"Estudo italiano há dois meses.",o:["da","per","di"],a:0,x:"Algo que começou e continua: da."},
  {s:"Vado al lavoro ___ autobus.",tr:"Vou ao trabalho de ônibus.",o:["in","con","a"],a:0,x:"Meio de transporte: in."},
  {s:"Il treno parte ___ dieci minuti.",tr:"O trem sai daqui a dez minutos.",o:["tra","da","di"],a:0,x:"Daqui a: tra/fra."}]},
 {id:"rif", lv:"A2", t:"Verbos reflexivos", e:`<p>Como "me chamo, me levanto". O pronome vem antes do verbo:</p>
<table><tr><th></th><th>chiamarsi (chamar-se)</th><th>svegliarsi (acordar)</th></tr>
<tr><td>io</td><td>mi chiamo</td><td>mi sveglio</td></tr><tr><td>tu</td><td>ti chiami</td><td>ti svegli</td></tr>
<tr><td>lui/lei</td><td>si chiama</td><td>si sveglia</td></tr><tr><td>noi</td><td>ci chiamiamo</td><td>ci svegliamo</td></tr>
<tr><td>voi</td><td>vi chiamate</td><td>vi svegliate</td></tr><tr><td>loro</td><td>si chiamano</td><td>si svegliano</td></tr></table>
<p>Outros: <i>alzarsi</i> (levantar-se), <i>vestirsi</i> (vestir-se), <i>trovarsi bene</i> (sentir-se bem num lugar): <span class="ex-it">Mi trovo bene in Italia.</span></p>`,
 q:[
  {s:"Come ___ chiami?",tr:"Como você se chama?",o:["ti","si","mi"],a:0,x:"tu → ti."},
  {s:"Io ___ sveglio alle sette.",tr:"Eu acordo às sete.",o:["mi","si","ti"],a:0,x:"io → mi."},
  {s:"Lei ___ chiama Giulia.",tr:"Ela se chama Giulia.",o:["si","ci","mi"],a:0,x:"lei → si."},
  {s:"Noi ___ alziamo presto.",tr:"Nós nos levantamos cedo.",o:["ci","vi","si"],a:0,x:"noi → ci."},
  {s:"Loro si ___ (svegliarsi) tardi.",tr:"Eles acordam tarde.",f:["svegliano"],x:"loro si svegliano."},
  {s:"«Mi trovo bene in Italia» significa:",o:["Estou bem adaptado na Itália","Eu me encontrei na Itália","Acho a Itália boa"],a:0,x:"Trovarsi bene = sentir-se bem, estar adaptado."}]},
 {id:"pia", lv:"A2", t:"Mi piace: gostar", e:`<p>Em italiano, "gostar" funciona ao contrário: a coisa "agrada" a alguém.</p>
<p><b>Mi piace</b> + singular ou verbo: <span class="ex-it">Mi piace la pizza.</span> <span class="ex-it">Mi piace viaggiare.</span></p>
<p><b>Mi piacciono</b> + plural: <span class="ex-it">Mi piacciono gli spaghetti.</span></p>
<p>Para outras pessoas: <i>ti</i> (a você), <i>gli</i> (a ele), <i>le</i> (a ela), <i>ci</i> (a nós): <span class="ex-it">A Marco piace il calcio.</span> = <span class="ex-it">Gli piace il calcio.</span></p>`,
 q:[
  {s:"Mi ___ la pizza.",tr:"Eu gosto de pizza.",o:["piace","piacciono","piaccio"],a:0,x:"Singular: piace."},
  {s:"Mi ___ gli spaghetti.",tr:"Eu gosto de espaguete.",o:["piacciono","piace","piacere"],a:0,x:"Plural: piacciono."},
  {s:"Ti ___ viaggiare?",tr:"Você gosta de viajar?",o:["piace","piacciono"],a:0,x:"Com verbo: piace."},
  {s:"A Marco ___ il calcio.",tr:"O Marco gosta de futebol.",o:["piace","piacciono","piaci"],a:0,x:"Il calcio é singular."},
  {s:"«Non mi piace il freddo» significa:",o:["Não gosto do frio","Não sinto frio","O frio não me faz mal"],a:0,x:"Non mi piace = não gosto."},
  {s:"A Lucia piacciono i gatti. = ___ piacciono i gatti.",tr:"A Lucia gosta de gatos. = Ela gosta de gatos.",o:["Le","Gli","Mi"],a:0,x:"A lei = le."}]},
 {id:"pp", lv:"B1", t:"Passato prossimo: essere o avere", e:`<p>O <b>passato prossimo</b> conta ações concluídas: auxiliar + particípio.</p>
<p><b>Avere</b> com a maioria dos verbos: <span class="ex-it">ho mangiato, abbiamo comprato</span>.</p>
<p><b>Essere</b> com verbos de movimento ou mudança de estado (<i>andare, venire, partire, arrivare, nascere, morire, diventare, restare</i>) e com todos os reflexivos (<i>mi sono svegliato</i>). Com <b>essere</b> o particípio concorda com o sujeito: <span class="ex-it">Maria è andata, i ragazzi sono partiti</span>.</p>
<p>Particípios irregulares frequentes: <i>fare→fatto, prendere→preso, scrivere→scritto, vedere→visto, venire→venuto, essere→stato, nascere→nato, mettere→messo</i>.</p>`,
 q:[
  {s:"Ieri Maria ___ andata in Comune.",o:["è","ha","era"],a:0,x:"Andare usa essere."},
  {s:"Noi ___ mangiato una pizza.",o:["abbiamo","siamo","avevamo"],a:0,x:"Mangiare é transitivo: avere."},
  {s:"I miei nonni sono ___ (nascere) in Calabria.",f:["nati"],x:"Nascere → nato; plural masculino: nati."},
  {s:"Mi ___ svegliato alle sette.",o:["sono","ho","mi"],a:0,x:"Verbos reflexivos usam essere."},
  {s:"Lei ha ___ (prendere) il treno delle otto.",f:["preso"],x:"Particípio irregular: preso."},
  {s:"Le ragazze sono ___ alla festa.",o:["venute","venuto","venuti"],a:0,x:"Com essere, concorda: feminino plural → venute."}]},
 {id:"pi", lv:"B1", t:"Passato prossimo o imperfetto?", e:`<p><b>Imperfetto</b> = pano de fundo, hábito, descrição: <span class="ex-it">da bambino andavo al mare; pioveva; ero stanco</span>.</p>
<p><b>Passato prossimo</b> = fato pontual e concluído: <span class="ex-it">ieri sono andato al mare</span>.</p>
<p>Juntos: o imperfetto descreve a cena, o passato prossimo interrompe: <span class="ex-it">Mentre guardavo la TV, è squillato il telefono.</span></p>
<table><tr><th>-are</th><th>-ere</th><th>-ire</th></tr><tr><td>parlavo</td><td>leggevo</td><td>dormivo</td></tr><tr><td>parlavi</td><td>leggevi</td><td>dormivi</td></tr><tr><td>parlava</td><td>leggeva</td><td>dormiva</td></tr></table>
<p>Irregular: <i>essere → ero, eri, era, eravamo, eravate, erano</i>.</p>`,
 q:[
  {s:"Quando ero bambino, ___ ogni estate al mare.",o:["andavo","sono andato","andrò"],a:0,x:"Hábito no passado: imperfetto."},
  {s:"Mentre ___ la TV, è squillato il telefono.",o:["guardavo","ho guardato","guarderò"],a:0,x:"Ação em andamento interrompida: imperfetto."},
  {s:"L'anno scorso ___ in Italia per la prima volta.",o:["sono andato","andavo","vado"],a:0,x:"Fato único e concluído: passato prossimo."},
  {s:"Da giovane mio padre ___ i capelli lunghi.",o:["aveva","ha avuto","avrà"],a:0,x:"Descrição no passado: imperfetto."},
  {s:"Ieri sera (io) ___ (uscire) con gli amici.",f:["sono uscito","sono uscita"],x:"Uscire usa essere: sono uscito/uscita."},
  {s:"Fuori ___ e faceva freddo.",o:["pioveva","è piovuto","piove"],a:0,x:"Descrição do tempo/cenário: imperfetto."}]},
 {id:"pr", lv:"B1", t:"Pronomi diretti, indiretti e combinati", e:`<table><tr><th>Diretti</th><td>mi, ti, lo, la, ci, vi, li, le</td></tr><tr><th>Indiretti</th><td>mi, ti, gli (a lui), le (a lei / a Lei), ci, vi, gli (a loro)</td></tr></table>
<p><span class="ex-it">Il pane? Lo compro io.</span> · <span class="ex-it">A Marco? Gli telefono stasera.</span></p>
<p>No passato prossimo, <i>lo/la/li/le</i> fazem o particípio concordar: <span class="ex-it">Le amiche? Le ho viste ieri.</span></p>
<p><b>Combinados</b>: o indireto vem antes e muda o -i em -e: <i>me lo, te lo, ce lo, ve lo</i>. Para <i>gli/le</i> + lo: <b>glielo</b> (gliela, glieli, gliele).</p>`,
 q:[
  {s:"Hai comprato il pane? Sì, ___ ho comprato.",o:["l'","gli","la"],a:0,x:"Il pane é objeto direto masculino: lo → l' antes de vogal."},
  {s:"Telefoni a Marco? Sì, ___ telefono stasera.",o:["gli","lo","le"],a:0,x:"Telefonare a qualcuno: indireto, a lui = gli."},
  {s:"Hai visto le tue amiche? Sì, ___ ho viste ieri.",o:["le","li","gli"],a:0,x:"Feminino plural direto: le (e o particípio concorda: viste)."},
  {s:"Scrivi alla nonna? Sì, ___ scrivo una lettera.",o:["le","la","gli"],a:0,x:"A lei (indireto) = le."},
  {s:"Mi dai il documento? Sì, ___ do subito.",o:["te lo","ti lo","glielo"],a:0,x:"Ti + lo = te lo."},
  {s:"Hai dato il modulo all'impiegato? Sì, ___ ho dato.",o:["gliel'","gli l'","lo gli"],a:0,x:"Gli + lo = glielo → gliel' antes de vogal."}]},
 {id:"rel", lv:"B1", t:"Pronomi relativi: che e cui", e:`<p>Os relativos ligam duas frases, como "que" e "o qual" em português. Estão no programa oficial do B1 Cittadinanza.</p>
<p><b>Che</b> = que (sujeito ou objeto, sem preposição): <span class="ex-it">La signora che abita qui è italiana.</span> · <span class="ex-it">Il documento che ho portato è scaduto.</span></p>
<p><b>Cui</b> = que / o qual, <b>depois de preposição</b>: <span class="ex-it">la città in cui vivo</span>, <span class="ex-it">il collega con cui lavoro</span>, <span class="ex-it">il libro di cui ti ho parlato</span>, <span class="ex-it">il motivo per cui studio</span>.</p>
<p>Mais formal: <i>il quale, la quale, i quali, le quali</i>: <span class="ex-it">l'ufficio al quale mi sono rivolto</span>.</p>`,
 q:[
  {s:"La signora ___ abita qui è italiana.",tr:"A senhora que mora aqui é italiana.",o:["che","cui","di cui"],a:0,x:"Sem preposição: che."},
  {s:"Il libro di ___ ti ho parlato è finito.",tr:"O livro de que te falei acabou.",o:["cui","che","quale"],a:0,x:"Depois de preposição (di): cui."},
  {s:"La città in ___ vivo è piccola.",tr:"A cidade em que moro é pequena.",o:["cui","che","chi"],a:0,x:"Depois de in: cui."},
  {s:"Il collega con ___ lavoro è simpatico.",tr:"O colega com quem trabalho é simpático.",o:["cui","che","chi"],a:0,x:"Depois de con: cui."},
  {s:"Questo è il modulo ___ serve per la domanda.",tr:"Este é o formulário que serve para o pedido.",o:["che","cui","di cui"],a:0,x:"Sujeito, sem preposição: che."},
  {s:"Il motivo per ___ studio italiano è la cittadinanza.",tr:"O motivo pelo qual estudo italiano é a cidadania.",f:["cui"],x:"Per + cui."}]},
 {id:"ind", lv:"B1", t:"Indefinidos: ogni, qualche, nessuno", e:`<table><tr><td><span class="ex-it">ogni</span></td><td>cada / todo (sempre + singular): <span class="ex-it">ogni giorno</span></td></tr>
<tr><td><span class="ex-it">qualche</span></td><td>algum, alguns (sempre + singular!): <span class="ex-it">qualche giorno</span> = alguns dias</td></tr>
<tr><td><span class="ex-it">ciascuno</span></td><td>cada um: <span class="ex-it">ciascuno porta un documento</span></td></tr>
<tr><td><span class="ex-it">nessuno</span></td><td>ninguém / nenhum: <span class="ex-it">non c'è nessuno</span></td></tr>
<tr><td><span class="ex-it">qualcuno</span></td><td>alguém: <span class="ex-it">c'è qualcuno?</span></td></tr>
<tr><td><span class="ex-it">niente / nulla</span></td><td>nada: <span class="ex-it">non ho capito niente</span></td></tr></table>
<p>Como no português, em italiano a negação é dupla: <span class="ex-it">Non viene nessuno.</span> (Não vem ninguém.)</p>`,
 q:[
  {s:"Vado in palestra ___ giorno.",tr:"Vou à academia todo dia.",o:["ogni","tutti","qualche"],a:0,x:"Ogni + singular = todo/cada."},
  {s:"C'è ___ problema? — No, nessuno.",tr:"Tem algum problema? — Não, nenhum.",o:["qualche","alcuni","ogni"],a:0,x:"Qualche + singular = algum."},
  {s:"Non c'è ___ in ufficio.",tr:"Não tem ninguém no escritório.",o:["nessuno","qualcuno","ognuno"],a:0,x:"Non... nessuno = ninguém."},
  {s:"___ studente deve portare il proprio documento.",tr:"Cada estudante deve trazer o próprio documento.",o:["Ogni","Tutti","Alcuni"],a:0,x:"Ogni + singular."},
  {s:"Ho chiamato, ma non ha risposto ___ .",tr:"Liguei, mas ninguém atendeu.",o:["nessuno","niente","qualcuno"],a:0,x:"Para pessoas: nessuno."},
  {s:"Ho fame, ma in frigo non c'è ___ .",tr:"Estou com fome, mas não tem nada na geladeira.",o:["niente","nessuno","qualche"],a:0,x:"Para coisas: niente."}]},
 {id:"cn", lv:"B1", t:"Le particelle ci e ne", e:`<p><b>Ci</b> substitui um lugar (<span class="ex-it">Vai a Roma? Sì, ci vado.</span>) ou "a/in + coisa" com verbos como <i>pensare a, credere a, riuscire a</i>: <span class="ex-it">Ci penso io.</span></p>
<p><b>Ne</b> substitui uma quantidade ou "di + algo": <span class="ex-it">Quanti figli hai? Ne ho due.</span> · <span class="ex-it">Che ne pensi?</span> (= o que você acha disso?)</p>`,
 q:[
  {s:"Vai spesso a Roma? Sì, ___ vado ogni mese.",o:["ci","ne","la"],a:0,x:"Lugar: ci."},
  {s:"Quanti figli hai? ___ ho due.",o:["Ne","Li","Ci"],a:0,x:"Quantidade: ne."},
  {s:"Pensi ancora a quel problema? No, non ___ penso più.",o:["ci","ne","lo"],a:0,x:"Pensare a qualcosa → ci."},
  {s:"Vuoi del caffè? Sì, ___ prendo un po'.",o:["ne","lo","ci"],a:0,x:"Uma parte de algo: ne."},
  {s:"«Che ne pensi del nuovo sindaco?» significa:",o:["O que você acha do novo prefeito?","Você pensa no novo prefeito?","Você conhece o novo prefeito?"],a:0,x:"Pensare di qualcosa → ne: opinião."},
  {s:"Sei mai stato a Napoli? No, non ___ sono mai stato.",f:["ci"],x:"Lugar: ci."}]},
 {id:"fu", lv:"B1", extra:true, t:"Il futuro semplice", e:`<p>Planos, promessas e também <b>suposições</b> (<span class="ex-it">Dov'è Luca? Sarà a casa.</span>).</p>
<table><tr><th>parlare</th><th>essere</th><th>avere</th></tr><tr><td>parlerò</td><td>sarò</td><td>avrò</td></tr><tr><td>parlerai</td><td>sarai</td><td>avrai</td></tr><tr><td>parlerà</td><td>sarà</td><td>avrà</td></tr><tr><td>parleremo</td><td>saremo</td><td>avremo</td></tr><tr><td>parlerete</td><td>sarete</td><td>avrete</td></tr><tr><td>parleranno</td><td>saranno</td><td>avranno</td></tr></table>
<p>Os verbos em -are mudam o a para e: <i>compilare → compilerò</i>. Irregulares: <i>andrò, verrò, farò, potrò, dovrò, vorrò, saprò, vedrò</i>.</p>`,
 q:[
  {s:"Domani (io) ___ (andare) in questura.",f:["andrò","andro"],x:"Andare → andrò."},
  {s:"L'anno prossimo i miei figli ___ in Italia.",o:["verranno","veniranno","venirano"],a:0,x:"Venire → verrò, verranno."},
  {s:"Quando ___ la cittadinanza, faremo una festa.",o:["avremo","abbiamo avuto","avevamo"],a:0,x:"Em italiano, depois de quando com sentido futuro usa-se o futuro."},
  {s:"Dov'è Luca? Non so, ___ a casa.",o:["sarà","è stato","era"],a:0,x:"Futuro de suposição."},
  {s:"Noi ___ (essere) puntuali.",f:["saremo"],x:"Essere → saremo."},
  {s:"Tu ___ il modulo entro venerdì?",o:["compilerai","compilarai","compileresti"],a:0,x:"-are vira -er- no futuro."}]},
 {id:"co", lv:"B1", t:"Il condizionale presente", e:`<p>Para <b>cortesia</b>, desejos, conselhos e hipóteses.</p>
<p><span class="ex-it">Vorrei un appuntamento.</span> · <span class="ex-it">Potrebbe ripetere?</span> · <span class="ex-it">Al tuo posto, chiamerei subito.</span></p>
<table><tr><th>parlare</th><td>parlerei, parleresti, parlerebbe, parleremmo, parlereste, parlerebbero</td></tr></table>
<p>Mesmas raízes irregulares do futuro: <i>vorrei, potrei, dovrei, sarei, avrei, farei, andrei, verrei</i>. Atenção ao duplo m em <i>noi</i>: <b>-emmo</b>.</p>`,
 q:[
  {s:"___ prendere un appuntamento, per favore.",o:["Vorrei","Voglio","Volevo"],a:0,x:"Pedido educado: vorrei."},
  {s:"Mi ___ aiutare con questo modulo, signora?",o:["potrebbe","poteva","potrà"],a:0,x:"Cortesia com Lei: potrebbe."},
  {s:"Al tuo posto, io ___ subito.",o:["chiamerei","chiamerò","chiamassi"],a:0,x:"Conselho: condizionale."},
  {s:"Noi ___ (preferire) un posto vicino alla finestra.",f:["preferiremmo"],x:"Noi: -emmo, com dois m."},
  {s:"Se avessi tempo, ___ un corso di cucina.",o:["farei","farò","facevo"],a:0,x:"Hipótese: se + congiuntivo imperfetto, condizionale na principal."},
  {s:"«Sarebbe possibile pagare con la carta?» significa:",o:["Seria possível pagar com cartão?","Foi possível pagar com cartão?","Será possível pagar com cartão?"],a:0,x:"Sarebbe = seria."}]},
 {id:"cg", lv:"B1", extra:true, t:"Il congiuntivo presente", e:`<p>Depois de expressões de <b>opinião, desejo, dúvida e necessidade</b>: <i>penso che, credo che, spero che, è importante che, bisogna che, voglio che</i>.</p>
<table><tr><th>parlare</th><th>essere</th><th>avere</th></tr><tr><td>che io parli</td><td>sia</td><td>abbia</td></tr><tr><td>che tu parli</td><td>sia</td><td>abbia</td></tr><tr><td>che lui parli</td><td>sia</td><td>abbia</td></tr><tr><td>che noi parliamo</td><td>siamo</td><td>abbiamo</td></tr><tr><td>che voi parliate</td><td>siate</td><td>abbiate</td></tr><tr><td>che loro parlino</td><td>siano</td><td>abbiano</td></tr></table>
<p>Com certeza (<i>so che, è vero che, sono sicuro che</i>) usa-se o <b>indicativo</b>: <span class="ex-it">So che lui parla italiano.</span></p>
<p>Irregulares úteis: <i>fare → faccia, andare → vada, venire → venga, dare → dia, stare → stia</i>.</p>`,
 q:[
  {s:"Penso che il treno ___ in ritardo.",o:["sia","è","sarà"],a:0,x:"Opinião (penso che): congiuntivo."},
  {s:"È importante che tu ___ tutti i documenti.",o:["porti","porta","portare"],a:0,x:"Necessidade: congiuntivo, tu porti."},
  {s:"Credo che loro ___ già partiti.",o:["siano","sono","sarebbero"],a:0,x:"Credo che + congiuntivo passato: siano partiti."},
  {s:"Spero che domani ___ bel tempo.",o:["faccia","fa","farà"],a:0,x:"Desejo: congiuntivo, fare → faccia."},
  {s:"Bisogna che voi ___ (avere) pazienza.",f:["abbiate"],x:"Avere, voi: abbiate."},
  {s:"So che lui ___ italiano.",o:["parla","parli","parlasse"],a:0,x:"Certeza (so che): indicativo."}]},
 {id:"pa", lv:"B1", t:"Le preposizioni articolate", e:`<p>Preposição + artigo se juntam: <b>di, a, da, in, su</b>.</p>
<table><tr><th></th><th>il</th><th>lo</th><th>l'</th><th>la</th><th>i</th><th>gli</th><th>le</th></tr>
<tr><td>a</td><td>al</td><td>allo</td><td>all'</td><td>alla</td><td>ai</td><td>agli</td><td>alle</td></tr>
<tr><td>da</td><td>dal</td><td>dallo</td><td>dall'</td><td>dalla</td><td>dai</td><td>dagli</td><td>dalle</td></tr>
<tr><td>in</td><td>nel</td><td>nello</td><td>nell'</td><td>nella</td><td>nei</td><td>negli</td><td>nelle</td></tr>
<tr><td>su</td><td>sul</td><td>sullo</td><td>sull'</td><td>sulla</td><td>sui</td><td>sugli</td><td>sulle</td></tr></table>
<p>Para pessoas usa-se <b>da</b>: <span class="ex-it">vado dal medico, dall'avvocato</span>.</p>`,
 q:[
  {s:"Il libro è ___ tavolo.",o:["sul","nel","al"],a:0,x:"Em cima: su + il = sul."},
  {s:"Domani vado ___ medico.",o:["dal","al","nel"],a:0,x:"Ir à casa/consultório de alguém: da."},
  {s:"Mio cugino vive ___ Stati Uniti.",o:["negli","nei","agli"],a:0,x:"In + gli = negli."},
  {s:"Le chiavi sono ___ borsa, non sul tavolo.",o:["nella","alla","dalla"],a:0,x:"Dentro: in + la = nella."},
  {s:"Il treno parte ___ (da + il) binario 3.",f:["dal"],x:"Da + il = dal."},
  {s:"Ho telefonato ___ ufficio anagrafe.",o:["all'","al","allo"],a:0,x:"A + l' = all'."}]},
 {id:"cs", lv:"B1", t:"Comparativi e superlativi", e:`<p><b>più / meno ... di</b> antes de substantivo ou pronome: <span class="ex-it">Roma è più grande di Firenze.</span></p>
<p><b>più / meno ... che</b> comparando verbos, adjetivos ou depois de preposição: <span class="ex-it">È meglio telefonare che scrivere.</span></p>
<p>Superlativo relativo: <span class="ex-it">il più importante di tutti</span>. Absoluto: <span class="ex-it">buonissimo, bellissimo</span>.</p>
<p>Irregulares: <i>buono → migliore</i> (adjetivo), <i>bene → meglio</i> (advérbio).</p>`,
 q:[
  {s:"Roma è più grande ___ Firenze.",o:["di","che","come"],a:0,x:"Antes de nome próprio: di."},
  {s:"È meglio telefonare ___ scrivere.",o:["che","di","del"],a:0,x:"Entre dois verbos: che."},
  {s:"Questo è il documento ___ importante di tutti.",o:["più","meglio","molto"],a:0,x:"Superlativo relativo: il più..."},
  {s:"Questo caffè è ___ .",o:["buonissimo","più buonissimo","molto buonissimo"],a:0,x:"Superlativo absoluto já é máximo: buonissimo."},
  {s:"Lui cucina ___ di me.",o:["meglio","migliore","più bene"],a:0,x:"Advérbio: meglio."},
  {s:"Milano è meno caotica ___ Napoli.",f:["di"],x:"Antes de nome próprio: di."}]},
 {id:"im", lv:"B1", t:"L'imperativo (tu, voi, Lei)", e:`<p>Ordens, instruções e convites.</p>
<table><tr><th></th><th>ascoltare</th><th>prendere</th><th>firmare</th></tr><tr><td>tu</td><td>ascolta</td><td>prendi</td><td>firma</td></tr><tr><td>Lei (formal)</td><td>ascolti</td><td>prenda</td><td>firmi</td></tr><tr><td>voi</td><td>ascoltate</td><td>prendete</td><td>firmate</td></tr></table>
<p>Negativo com <i>tu</i> = non + infinito: <span class="ex-it">Non fare tardi!</span></p>
<p>Pronomes grudam no tu/voi: <span class="ex-it">Dammi il passaporto. Firmatelo.</span> Com Lei ficam antes: <span class="ex-it">Me lo dia.</span></p>`,
 q:[
  {s:"Signora, ___ qui, per favore.",o:["firmi","firma","firmate"],a:0,x:"Lei: firmi."},
  {s:"Marco, ___ la porta!",o:["chiudi","chiuda","chiudere"],a:0,x:"Tu: chiudi."},
  {s:"Non ___ tardi! (a un amico)",o:["fare","fai","faccia"],a:0,x:"Negativo com tu: non + infinito."},
  {s:"___ pure, signore!",o:["Entri","Entra","Entrare"],a:0,x:"Formal: Entri."},
  {s:"Ragazzi, ___ (ascoltare) bene!",f:["ascoltate"],x:"Voi: ascoltate."},
  {s:"«Dammi il passaporto» significa:",o:["Me dê o passaporte","Dei a ele o passaporte","Dê-lhe o passaporte"],a:0,x:"Da' + mi = dammi."}]},
 {id:"si", lv:"B1", t:"Il si impersonale e passivante", e:`<p><b>Si + verbo</b> na 3ª pessoa = "a gente / se": <span class="ex-it">In Italia si cena tardi.</span></p>
<p>Com objeto plural, o verbo vai ao plural: <span class="ex-it">Qui si parlano molte lingue.</span> · <span class="ex-it">Si vendono case.</span></p>
<p>Comum em avisos públicos: <span class="ex-it">Si prega di attendere. Non si accettano pagamenti in contanti.</span></p>`,
 q:[
  {s:"In Italia ___ cena tardi.",o:["si","ci","ne"],a:0,x:"Impessoal: si."},
  {s:"Qui si ___ molte lingue.",o:["parlano","parla","parlate"],a:0,x:"Objeto plural (lingue): parlano."},
  {s:"Come si ___ questa parola?",o:["scrive","scrivono","scrivi"],a:0,x:"Objeto singular: scrive."},
  {s:"Quando si è giovani, si ___ molto.",o:["viaggia","viaggiano","viaggi"],a:0,x:"Sem objeto: 3ª singular."},
  {s:"In questo ufficio si ___ (rinnovare) i passaporti.",f:["rinnovano"],x:"Objeto plural: rinnovano."},
  {s:"«Si dice che il museo chiuda» significa:",o:["Dizem que o museu vai fechar","Ele diz que o museu fecha","Diga que o museu fecha"],a:0,x:"Si dice = dizem."}]},
 {id:"cv", lv:"B1", t:"I connettivi del discorso", e:`<p>Para escrever e falar em nível B1, ligue as frases:</p>
<table><tr><td><b>perché</b></td><td>porque</td></tr><tr><td><b>quindi / perciò</b></td><td>portanto</td></tr><tr><td><b>però / ma</b></td><td>porém, mas</td></tr><tr><td><b>anche se</b></td><td>mesmo que (+ indicativo)</td></tr><tr><td><b>mentre</b></td><td>enquanto</td></tr><tr><td><b>prima di + infinito</b></td><td>antes de</td></tr><tr><td><b>dopo aver + particípio</b></td><td>depois de</td></tr><tr><td><b>invece</b></td><td>por outro lado, em vez disso</td></tr></table>`,
 q:[
  {s:"Studio italiano ___ voglio la cittadinanza.",o:["perché","però","quindi"],a:0,x:"Causa: perché."},
  {s:"Ero stanco, ___ sono andato a letto presto.",o:["quindi","perché","anche se"],a:0,x:"Consequência: quindi."},
  {s:"___ piove, esco lo stesso.",o:["Anche se","Perché","Quindi"],a:0,x:"Concessão: anche se + indicativo."},
  {s:"Mi piace Roma, ___ è troppo cara.",o:["però","perché","mentre"],a:0,x:"Contraste: però."},
  {s:"___ aspettavo, leggevo il giornale.",o:["Mentre","Quindi","Invece"],a:0,x:"Simultaneidade: mentre."},
  {s:"Prima di ___ , controlla i documenti.",o:["uscire","esci","uscito"],a:0,x:"Prima di + infinito."}]}
];

export const DECKS = [
 {id:"pw", lv:"A1", t:"Primeiras palavras", w:[["sì","sim","SI"],["no","não","NÓ"],["grazie","obrigado","GRA-tsie"],["prego","de nada / pois não","PRÉ-go"],["per favore","por favor","per fa-VÔ-re"],["scusi","com licença / desculpe (formal)","SKU-zi"],["ciao","oi / tchau","TCHAU"],["buongiorno","bom dia","buon-DJOR-no"],["buonasera","boa tarde / boa noite","buo-na-SÉ-ra"],["arrivederci","até logo","ar-ri-ve-DER-tchi"],["non capisco","não entendo","non ka-PIS-ko"],["può ripetere?","pode repetir?","PUÓ ri-PÉ-te-re"],["quanto costa?","quanto custa?","KUAN-to KÓS-ta"],["dov'è…?","onde fica…?","do-VÉ"],["va bene","está bem","va BÉ-ne"],["aiuto!","socorro!","a-IU-to"]]},
 {id:"nu", lv:"A1", t:"Números e tempo", w:[["uno, due, tre","um, dois, três","U-no, DU-e, TRE"],["dieci","dez","DIÉ-tchi"],["venti","vinte","VEN-ti"],["cento","cem","TCHÉN-to"],["mille","mil","MIL-le"],["oggi","hoje","ÓD-dji"],["domani","amanhã","do-MA-ni"],["ieri","ontem","IÉ-ri"],["adesso","agora","a-DÉS-so"],["la mattina","a manhã","la mat-TI-na"],["la sera","a noite (início)","la SÊ-ra"],["la settimana","a semana","la set-ti-MA-na"],["il mese","o mês","il MÊ-ze"],["l'anno","o ano","LAN-no"],["lunedì","segunda-feira","lu-ne-DI"],["domenica","domingo","do-MÊ-ni-ka"]]},
 {id:"fa", lv:"A1", t:"Família e pessoas", w:[["la madre","a mãe","la MA-dre"],["il padre","o pai","il PA-dre"],["il marito","o marido","il ma-RI-to"],["la moglie","a esposa","la MÓ-lhe"],["il figlio","o filho","il FI-lho"],["la figlia","a filha","la FI-lha"],["il fratello","o irmão","il fra-TÉL-lo"],["la sorella","a irmã","la so-RÉL-la"],["i nonni","os avós","i NÓN-ni"],["il nipote","o neto / o sobrinho","il ni-PÔ-te"],["l'amico","o amigo","la-MI-ko"],["il vicino di casa","o vizinho","il vi-TCHI-no di KA-za"]]},
 {id:"cb", lv:"A1", t:"Comida e compras", w:[["il pane","o pão","il PA-ne"],["l'acqua","a água","LAK-kua"],["il caffè","o café","il kaf-FÉ"],["la carne","a carne","la KAR-ne"],["il pesce","o peixe","il PÊ-che"],["la frutta","a fruta","la FRUT-ta"],["la verdura","a verdura","la ver-DU-ra"],["il formaggio","o queijo","il for-MAD-djo"],["il conto","a conta","il KÔN-to"],["lo scontrino","o cupom fiscal","lo skon-TRI-no"],["il supermercato","o supermercado","il su-per-mer-KA-to"],["il sacchetto","a sacola","il sak-KÊT-to"]]},
 {id:"bu", lv:"B1", t:"Burocrazia", w:[["il permesso di soggiorno","a autorização de residência","il per-MÊS-so di sod-DJOR-no"],["la questura","a delegacia central (imigração)","la kues-TU-ra"],["la prefettura","a prefeitura (órgão do governo)","la pre-fet-TU-ra"],["il comune","o município / a prefeitura","il ko-MU-ne"],["l'anagrafe","o registro civil","la-NA-gra-fe"],["il codice fiscale","o CPF italiano","il KÓ-di-tche fis-KA-le"],["la residenza","a residência","la re-zi-DÉN-tsa"],["il certificato di nascita","a certidão de nascimento","il tcher-ti-fi-KA-to di NA-chi-ta"],["la marca da bollo","o selo fiscal","la MAR-ka da BÔL-lo"],["il modulo","o formulário","il MÓ-du-lo"],["lo sportello","o guichê","lo spor-TÉL-lo"],["la scadenza","o vencimento / prazo","la ska-DÉN-tsa"],["il rinnovo","a renovação","il rin-NÔ-vo"],["la ricevuta","o recibo","la ri-tche-VU-ta"],["la firma","a assinatura","la FIR-ma"],["la delega","a procuração simples","la DÉ-le-ga"],["il giuramento","o juramento","il dju-ra-MÊN-to"],["la domanda","o pedido / requerimento","la do-MAN-da"]]},
 {id:"la", lv:"A2", t:"Lavoro", w:[["il colloquio di lavoro","a entrevista de emprego","il kol-LÓ-kuio di la-VÔ-ro"],["lo stipendio","o salário","lo sti-PÉN-dio"],["il contratto a tempo indeterminato","o contrato por prazo indeterminado","il kon-TRAT-to a TÉM-po in-de-ter-mi-NA-to"],["il datore di lavoro","o empregador","il da-TÔ-re di la-VÔ-ro"],["il collega","o colega","il kol-LÉ-ga"],["le ferie","as férias","le FÉ-rie"],["la busta paga","o contracheque","la BUS-ta PA-ga"],["licenziare","demitir","li-tchen-TSIA-re"],["andare in pensione","aposentar-se","an-DA-re in pen-SIÔ-ne"],["il turno","o turno","il TUR-no"],["il curriculum","o currículo","il kur-RI-ku-lum"],["essere disoccupato","estar desempregado","ÉS-se-re di-zok-ku-PA-to"]]},
 {id:"ca", lv:"A2", t:"Casa e città", w:[["l'affitto","o aluguel","laf-FIT-to"],["il padrone di casa","o proprietário","il pa-DRÔ-ne di KA-za"],["le bollette","as contas (luz, gás)","le bol-LÊT-te"],["il riscaldamento","o aquecimento","il ris-kal-da-MÊN-to"],["il condominio","o condomínio","il kon-do-MI-nio"],["trasferirsi","mudar-se","tras-fe-RIR-si"],["il quartiere","o bairro","il kuar-TIÉ-re"],["la fermata","o ponto (de ônibus)","la fer-MA-ta"],["l'abbonamento","a assinatura / o passe","lab-bo-na-MÊN-to"],["il marciapiede","a calçada","il mar-tcha-PIÉ-de"],["la raccolta differenziata","a coleta seletiva","la rak-KÓL-ta dif-fe-ren-TSIA-ta"],["il trasloco","a mudança","il traz-LÓ-ko"]]},
 {id:"sa", lv:"A2", t:"Salute", w:[["il medico di base","o clínico geral (do SSN)","il MÉ-di-ko di BA-ze"],["la tessera sanitaria","o cartão de saúde","la TÉS-se-ra sa-ni-TA-ria"],["la ricetta","a receita médica","la ri-TCHÉT-ta"],["il pronto soccorso","o pronto-socorro","il PRÔN-to sok-KÔR-so"],["la farmacia di turno","a farmácia de plantão","la far-ma-TCHI-a di TUR-no"],["avere la febbre","estar com febre","a-VÊ-re la FÉB-bre"],["il mal di gola","a dor de garganta","il mal di GÔ-la"],["la visita","a consulta","la VI-zi-ta"],["prenotare","agendar / reservar","pre-no-TA-re"],["guarire","sarar","gua-RI-re"],["la compressa","o comprimido","la kom-PRÉS-sa"],["l'ambulanza","a ambulância","lam-bu-LAN-tsa"]]},
 {id:"ci", lv:"B1", t:"Vita civica", w:[["la Costituzione","a Constituição","la kos-ti-tu-TSIÔ-ne"],["la Repubblica","a República","la re-PUB-bli-ka"],["il Presidente della Repubblica","o Presidente da República","il pre-zi-DÉN-te DÉL-la re-PUB-bli-ka"],["il Parlamento","o Parlamento","il par-la-MÊN-to"],["la Camera dei deputati","a Câmara dos Deputados","la KA-me-ra dei de-pu-TA-ti"],["il Senato","o Senado","il se-NA-to"],["la regione","a região (estado)","la re-DJÔ-ne"],["il sindaco","o prefeito","il SIN-da-ko"],["le elezioni","as eleições","le e-le-TSIÔ-ni"],["i diritti e i doveri","os direitos e deveres","i di-RIT-ti e i do-VÊ-ri"],["le tasse","os impostos","le TAS-se"],["la Festa della Repubblica","a Festa da República (2 de junho)","la FÉS-ta DÉL-la re-PUB-bli-ka"]]}
];

export const AUDIOS = [
 {id:"a0",v:{Barista:"m",Cliente:"f"},lv:"A1",rate:0.78,t:"Al bar",lvl:"Diálogo lento",tx:"Barista: Buongiorno! Cosa prende?\nCliente: Buongiorno. Un caffè e un cornetto, per favore.\nBarista: Ecco a lei. Altro?\nCliente: No, grazie. Quanto costa?\nBarista: Due euro e cinquanta.\nCliente: Ecco. Grazie, arrivederci!\nBarista: Grazie a lei, buona giornata!",
 pt:"Barista: Bom dia! O que vai querer?\nCliente: Bom dia. Um café e um croissant, por favor.\nBarista: Aqui está. Mais alguma coisa?\nCliente: Não, obrigado. Quanto custa?\nBarista: Dois euros e cinquenta.\nCliente: Aqui está. Obrigado, até logo!\nBarista: Obrigado a você, bom dia!",
 q:[{s:"Cosa prende il cliente? (O que o cliente pede?)",o:["Un caffè e un cornetto","Un tè e una pizza","Un'acqua"],a:0},{s:"Quanto costa? (Quanto custa?)",o:["2,50 €","5,20 €","2,15 €"],a:0}]},
 {id:"ap",v:{_:"m"},lv:"A1",rate:0.78,t:"Mi presento",lvl:"Monólogo lento",tx:"Ciao! Mi chiamo Lucas. Sono brasiliano, di Curitiba. Ho trentadue anni. Sono sposato e ho una figlia. Lavoro in un ristorante. Adesso abito a Padova. Studio l'italiano perché voglio la cittadinanza.",
 pt:"Oi! Meu nome é Lucas. Sou brasileiro, de Curitiba. Tenho trinta e dois anos. Sou casado e tenho uma filha. Trabalho num restaurante. Agora moro em Pádua. Estudo italiano porque quero a cidadania.",
 q:[{s:"Di dove è Lucas? (De onde ele é?)",o:["Di Curitiba","Di Padova","Di Roma"],a:0},{s:"Quanti anni ha? (Quantos anos tem?)",o:["32","22","42"],a:0},{s:"Dove lavora? (Onde trabalha?)",o:["In un ristorante","In un ufficio","In una scuola"],a:0}]},
 {id:"a1",v:{Impiegata:"f",Uomo:"m"},lv:"B1",t:"All'ufficio anagrafe",lvl:"Diálogo",tx:"Impiegata: Buongiorno, mi dica.\nUomo: Buongiorno. Vorrei richiedere un certificato di residenza.\nImpiegata: Ha un documento d'identità?\nUomo: Sì, ecco il passaporto.\nImpiegata: Perfetto. Per il certificato serve una marca da bollo da sedici euro. Sarà pronto tra dieci minuti.\nUomo: Posso pagare con la carta?\nImpiegata: Mi dispiace, qui solo in contanti. C'è un bancomat proprio di fronte.",
 q:[{s:"Cosa vuole l'uomo?",o:["Un certificato di residenza","Un nuovo passaporto","La carta d'identità"],a:0},{s:"Quanto tempo deve aspettare?",o:["Dieci minuti","Sedici minuti","Un'ora"],a:0},{s:"Come deve pagare?",o:["In contanti","Con la carta","Con un bonifico"],a:0}]},
 {id:"a2",v:{_:"m"},lv:"B1",t:"Messaggio in segreteria",lvl:"Monólogo",tx:"Ciao Giulia, sono Paolo. Ti chiamo perché sabato non posso venire alla cena: devo lavorare fino alle nove. Però domenica sono libero. Che ne dici di pranzare insieme da Marco? Lui ha detto che prepara la lasagna. Richiamami quando senti questo messaggio. Un bacio!",
 q:[{s:"Perché Paolo non va alla cena di sabato?",o:["Deve lavorare","È malato","Va da Marco"],a:0},{s:"Cosa propone Paolo?",o:["Un pranzo domenica","Una cena sabato","Un caffè lunedì"],a:0},{s:"Chi cucina?",o:["Marco","Giulia","Paolo"],a:0}]},
 {id:"a3",v:{Medico:"m",Paziente:"f"},lv:"B1",t:"Dal medico",lvl:"Diálogo",tx:"Medico: Allora, signora, cosa si sente?\nPaziente: Da tre giorni ho mal di gola e un po' di febbre, soprattutto la sera.\nMedico: Ha preso qualcosa?\nPaziente: Solo una tachipirina ieri sera.\nMedico: Vediamo... La gola è molto rossa. Le prescrivo un antibiotico: ne prenda una compressa due volte al giorno, dopo i pasti, per sei giorni. E beva molta acqua. Se tra tre giorni la febbre non passa, torni da me.",
 q:[{s:"Da quanto tempo la signora sta male?",o:["Da tre giorni","Da sei giorni","Da ieri sera"],a:0},{s:"Quante volte al giorno deve prendere l'antibiotico?",o:["Due volte","Tre volte","Una volta"],a:0},{s:"Quando deve tornare dal medico?",o:["Se la febbre non passa tra tre giorni","Dopo sei giorni in ogni caso","Domani mattina"],a:0}]},
 {id:"a4",v:{_:"f"},lv:"B1",t:"Annuncio in stazione",lvl:"Aviso público",tx:"Attenzione. Il treno regionale 4512 per Bologna Centrale, previsto in partenza alle ore dieci e quindici dal binario sei, partirà con un ritardo di circa venti minuti a causa di un guasto tecnico. Il treno partirà dal binario otto. Ci scusiamo per il disagio.",
 q:[{s:"Dove va il treno?",o:["A Bologna","A Bolzano","A Bergamo"],a:0},{s:"Da quale binario partirà?",o:["Dal binario otto","Dal binario sei","Dal binario quattro"],a:0},{s:"Perché il treno è in ritardo?",o:["Per un guasto tecnico","Per uno sciopero","Per il maltempo"],a:0}]}
];

export const READINGS = [
 {id:"r0",lv:"A1",t:"Un biglietto sul frigo",tx:"Ciao Marta,\noggi torno tardi dal lavoro, verso le otto. Nel frigo c'è la pasta per la cena. Per favore, compra il pane e il latte. Domani mattina andiamo insieme dal medico, alle nove.\nUn bacio,\nGianni",
 pt:"Oi Marta,\nhoje volto tarde do trabalho, por volta das oito. Na geladeira tem macarrão para o jantar. Por favor, compre pão e leite. Amanhã de manhã vamos juntos ao médico, às nove.\nUm beijo,\nGianni",
 q:[{s:"A che ora torna Gianni? (A que horas Gianni volta?)",o:["Verso le otto","Alle nove","Alle sei"],a:0},{s:"Cosa deve comprare Marta? (O que Marta deve comprar?)",o:["Il pane e il latte","La pasta e il pane","Il latte e il caffè"],a:0},{s:"Dove vanno domani? (Aonde vão amanhã?)",o:["Dal medico","Al supermercato","Al lavoro"],a:0}]},
 {id:"l1",lv:"B1",t:"Avviso del Comune",tx:"COMUNE DI MONTEVERDE – Servizi demografici\n\nDal 1° marzo l'ufficio anagrafe riceve il pubblico solo su appuntamento. È possibile prenotare online sul sito del Comune oppure telefonando dal lunedì al venerdì, dalle 9 alle 12.\n\nPer il rilascio della carta d'identità elettronica è necessario presentare: una fototessera recente, il documento scaduto (oppure la denuncia di smarrimento) e la ricevuta del pagamento.\n\nSi ricorda che la carta d'identità non viene consegnata subito: arriva per posta entro sei giorni lavorativi.",
 q:[{s:"Come si accede all'ufficio anagrafe?",o:["Solo con appuntamento","Senza prenotazione la mattina","Solo online"],a:0},{s:"Quando si può telefonare?",o:["Dal lunedì al venerdì, dalle 9 alle 12","Tutti i giorni","Il sabato mattina"],a:0},{s:"Quale documento NON è richiesto?",o:["Il certificato di nascita","La fototessera","La ricevuta del pagamento"],a:0},{s:"Come si riceve la carta d'identità?",o:["Per posta","Subito allo sportello","In questura"],a:0}]},
 {id:"l2",lv:"B1",t:"Un'email da Torino",tx:"Cara Lucia,\nfinalmente ti scrivo dall'Italia! Sono arrivata a Torino tre mesi fa con mio marito, che lavora in un'azienda di automobili. All'inizio è stato difficile: non capivo quasi niente e mi sentivo sola.\n\nAdesso va meglio: frequento un corso di italiano due volte alla settimana e ho conosciuto altre donne straniere. Il mese prossimo farò l'esame B1, perché voglio chiedere la cittadinanza. Speriamo bene!\n\nE tu come stai? Quando vieni a trovarmi?\nUn abbraccio,\nAna",
 q:[{s:"Perché Ana vive a Torino?",o:["Per il lavoro del marito","Per studiare all'università","Perché ha parenti lì"],a:0},{s:"Com'era la vita all'inizio?",o:["Difficile, si sentiva sola","Facile e divertente","Noiosa ma tranquilla"],a:0},{s:"Perché Ana farà l'esame B1?",o:["Per chiedere la cittadinanza","Per trovare lavoro","Per iscriversi all'università"],a:0}]},
 {id:"l3",lv:"B1",t:"La Costituzione italiana",tx:"La Costituzione della Repubblica italiana è entrata in vigore il 1° gennaio 1948.\n\nDopo la Seconda guerra mondiale, il 2 giugno 1946, gli italiani hanno scelto con un referendum la Repubblica al posto della monarchia. In quell'occasione, per la prima volta a livello nazionale, hanno votato anche le donne. Il 2 giugno è ancora oggi la Festa della Repubblica.\n\nL'articolo 1 dice: «L'Italia è una Repubblica democratica, fondata sul lavoro. La sovranità appartiene al popolo».",
 q:[{s:"Quando è entrata in vigore la Costituzione?",o:["Il 1° gennaio 1948","Il 2 giugno 1946","Il 25 aprile 1945"],a:0},{s:"Cosa hanno scelto gli italiani nel 1946?",o:["La Repubblica","La monarchia","Un nuovo re"],a:0},{s:"Che cosa è successo di nuovo nel 1946?",o:["Hanno votato anche le donne","È nata l'Unione Europea","È stata scritta la prima legge"],a:0},{s:"Secondo l'articolo 1, l'Italia è fondata...",o:["sul lavoro","sulla famiglia","sulla religione"],a:0}]}
];

export const WRITINGS = [
 {id:"w0",lv:"A1",t:"Presentati",min:25,max:40,p:"Scrivi chi sei: come ti chiami, quanti anni hai, di dove sei, dove abiti e che lavoro fai. (Escreva quem você é: nome, idade, de onde é, onde mora e com o que trabalha.)",tips:["Mi chiamo… (Meu nome é…)","Ho … anni (Tenho … anos)","Sono di… (Sou de…)","Abito a… (Moro em…)","Lavoro come… (Trabalho como…)"]},
 {id:"w1",lv:"B1",t:"Email al padrone di casa",min:50,max:80,p:"Il riscaldamento del tuo appartamento non funziona da una settimana. Scrivi un'email al padrone di casa: spiega il problema, da quando c'è e chiedi un intervento urgente.",tips:["Saudação formal: Gentile signor/signora…","Use o passato prossimo para contar o problema","Peça com condizionale: Potrebbe…?","Despedida: Cordiali saluti"]},
 {id:"w2",lv:"B1",t:"Il mio primo giorno in Italia",min:80,max:100,p:"Scrivi a un amico e racconta il tuo primo giorno in Italia (o un viaggio importante): dove eri, cosa hai fatto, come ti sentivi.",tips:["Imperfetto para descrever: era, faceva, mi sentivo","Passato prossimo para os fatos: sono arrivato, ho visto","Conectivos: prima, poi, mentre, alla fine"]},
 {id:"w3",lv:"B1",t:"Perché voglio la cittadinanza",min:80,max:100,p:"Scrivi un breve testo in cui spieghi perché vuoi diventare cittadino italiano e cosa significa per te.",tips:["Opinião: penso che + congiuntivo","Causa e consequência: perché, quindi","Futuro: quando sarò cittadino…"]},
 {id:"w4",lv:"B1",t:"Messaggio a un collega",min:50,max:60,p:"Domani non puoi partecipare alla riunione di lavoro. Scrivi un messaggio a un collega: spiega il motivo e proponi un'altra data.",tips:["Purtroppo domani non posso…","Proposta: Che ne dici di…? Potremmo…","Agradecimento no final"]}
];

export const SPEAK = [
 {id:"s0",t:"Primeiras frases",p:"Diga em voz alta, devagar: seu nome, de onde você é e por que estuda italiano. Ouça o modelo e repita frase por frase.",m:"Buongiorno. Mi chiamo Carla. Sono brasiliana, di Salvador. Studio l'italiano perché voglio vivere in Italia."},
 {id:"s1",t:"Presentati",p:"Come ti chiami, da dove vieni, da quanto tempo vivi in Italia (o perché vuoi viverci), che lavoro fai.",m:"Mi chiamo Ana, sono brasiliana e vengo da Belo Horizonte. Vivo in Italia da due anni, a Torino. Sono sposata con un italiano e lavoro come segretaria in uno studio medico. Nel tempo libero mi piace cucinare e passeggiare lungo il fiume."},
 {id:"s2",t:"La tua famiglia",p:"Descrivi la tua famiglia: quante persone, dove vivono, cosa fanno insieme.",m:"La mia famiglia non è molto grande. Ho due fratelli: uno vive in Brasile, l'altro in Portogallo. I miei genitori sono in pensione. Ci sentiamo ogni domenica in videochiamata e d'estate cerchiamo di passare qualche settimana insieme."},
 {id:"s3",t:"Una giornata tipo",p:"Racconta la tua giornata tipica, dalla mattina alla sera.",m:"Di solito mi sveglio alle sette, faccio colazione con un caffè e un cornetto e poi prendo l'autobus per andare al lavoro. Pranzo verso l'una con i colleghi. La sera, dopo cena, studio italiano per mezz'ora e guardo un po' di televisione."},
 {id:"s4",t:"Perché l'Italia",p:"Perché hai scelto l'Italia? Cosa ti piace e cosa trovi difficile?",m:"Ho scelto l'Italia perché la mia bisnonna era di Treviso e sono cresciuta con le sue storie. Mi piacciono il cibo, la storia e la gentilezza delle persone. Invece trovo difficile la burocrazia: per ogni documento bisogna fare molte file e prendere appuntamenti."},
 {id:"s5",t:"Un problema risolto",p:"Racconta una situazione difficile che hai vissuto e come l'hai risolta.",m:"L'anno scorso ho perso il portafoglio sull'autobus, con dentro la carta d'identità. All'inizio ero disperata. Poi sono andata dai carabinieri a fare la denuncia e il giorno dopo ho chiamato il Comune per prendere un appuntamento. Dopo una settimana avevo il nuovo documento."},
 {id:"s6",t:"Gioco di ruolo: in Comune",p:"Sei allo sportello del Comune. Chiedi informazioni per il cambio di residenza: documenti, tempi, costi.",m:"Buongiorno, mi scusi. Mi sono trasferita da poco in questa città e vorrei fare il cambio di residenza. Potrebbe dirmi quali documenti servono? Bisogna prendere un appuntamento? E quanto tempo ci vuole? Grazie mille, è stata molto gentile."}
];
