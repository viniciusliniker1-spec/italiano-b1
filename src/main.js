import "./styles.css";
import {UNITS,DECKS,AUDIOS,READINGS,WRITINGS,SPEAK} from "./content.js";

/* ============================== ESTADO ============================== */
const KEY="cittadinanza-b1-v1";
const blank=()=>({v:1,level:null,decks:null,updatedAt:0,xp:0,streak:0,lastDay:null,lessons:{},cards:{},audio:{},reading:{},writing:{},speak:{},exams:[]});
let S=blank(), remoteRef=null, saveTimer=null, sampleFn=undefined;
try{const raw=localStorage.getItem(KEY); if(raw) S=Object.assign(blank(),JSON.parse(raw));}catch(e){}

const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayNum=s=>Math.round(Date.parse(s+"T12:00:00")/864e5);
function touch(xp){
  const t=today();
  if(S.lastDay!==t){S.streak=(S.lastDay&&dayNum(t)-dayNum(S.lastDay)===1)?S.streak+1:1;S.lastDay=t}
  S.xp+=xp||0; save();
}
function save(){
  S.updatedAt=Date.now();
  try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
  if(remoteRef){clearTimeout(saveTimer);saveTimer=setTimeout(()=>{remoteRef.set(JSON.parse(JSON.stringify(S))).catch(()=>{})},1200)}
  updateReady();
}
async function initCloud(){
  if(!window.claude||!window.claude.use){sampleFn=null;return}
  try{
    const [db,user]=await Promise.all([claude.use("db"),claude.use("user")]);
    if(db&&user){
      const id=await user.id();
      if(id){
        const ref=db.collection("data/users/"+id).doc("progress");
        const snap=await Promise.race([ref.get(),new Promise((_,r)=>setTimeout(()=>r(new Error("timeout")),10000))]);
        if(snap.exists){const d=snap.data(); if(d&&(d.updatedAt||0)>(S.updatedAt||0)){S=Object.assign(blank(),d);try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){} route()}}
        remoteRef=ref;
        if(!snap.exists||S.updatedAt>((snap.data()||{}).updatedAt||0)) remoteRef.set(JSON.parse(JSON.stringify(S))).catch(()=>{});
        document.getElementById("sync-note").textContent="Progresso salvo na sua conta.";
      }
    }
  }catch(e){}
  try{sampleFn=await claude.use("sample")}catch(e){sampleFn=null}
  if(location.hash==="#scrittura") route();
}

/* ============================== MÉTRICAS ============================== */
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const ALLCARDS=DECKS.flatMap(d=>d.w.map((w,i)=>({id:d.id+i,deck:d.id,it:w[0],pt:w[1]})));
function metrics(){
  const g=avg(UNITS.map(u=>(S.lessons[u.id]||{}).best||0));
  const v=ALLCARDS.filter(c=>(S.cards[c.id]||{}).box>=3).length/ALLCARDS.length;
  const a=avg(AUDIOS.map(x=>S.audio[x.id]||0));
  const r=avg(READINGS.map(x=>S.reading[x.id]||0));
  const w=avg(WRITINGS.map(x=>(S.writing[x.id]||0)/10));
  const p=SPEAK.filter(x=>S.speak[x.id]).length/SPEAK.length;
  return {Gramática:g,Vocabulário:v,Escuta:a,Leitura:r,Escrita:w,Fala:p};
}
function updateReady(){const m=metrics();document.getElementById("ready-pct").textContent=Math.round(avg(Object.values(m))*100)+"%"}
const INTERVALS=[0,1,2,4,8,16,32];
const LV={A1:{n:"Base",d:"Do zero: pronúncia, saudações, verbos essenciais e frases de sobrevivência."},A2:{n:"Ponte",d:"O dia a dia: possessivos, preposições, reflexivos e o verbo gostar."},B1:{n:"Nível da prova",d:"As estruturas cobradas no exame de cidadania."}};
const RANK={A1:0,A2:1,B1:2};
const lvProgress=lv=>avg(UNITS.filter(u=>u.lv===lv).map(u=>(S.lessons[u.id]||{}).best||0));
const startUnits=()=>UNITS.filter(u=>RANK[u.lv]>=RANK[S.level||"A1"]);
const nextUnit=()=>startUnits().find(u=>((S.lessons[u.id]||{}).best||0)<0.8)||UNITS[UNITS.length-1];
const stage=()=>nextUnit().lv;
const fitting=list=>list.filter(x=>RANK[x.lv||"B1"]<=RANK[stage()]);
const activeDecks=()=>S.decks||DECKS.filter(d=>RANK[d.lv]<=RANK[S.level||"A1"]).map(d=>d.id);
const dueCards=()=>{const t=dayNum(today()),on=activeDecks();return ALLCARDS.filter(c=>{const k=S.cards[c.id];return on.includes(c.deck)&&(!k||k.due<=t)})};
const groupByLv=(list,card)=>["A1","A2","B1"].map(lv=>{const xs=list.filter(x=>(x.lv||"B1")===lv);return xs.length?`<div class="lvl-head"><span class="code">${lv} · ${LV[lv].n}</span></div><div class="grid">${xs.map(card).join("")}</div>`:""}).join("");

/* ============================== UTIL ============================== */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>s.toLowerCase().trim().replace(/\s+/g," ").replace(/[’`]/g,"'");
const strip=s=>norm(s).normalize("NFD").replace(/[̀-ͯ]/g,"");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pct=x=>Math.round(x*100)+"%";
let itVoice=null;
function loadVoice(){try{const vs=speechSynthesis.getVoices();itVoice=vs.find(v=>/^it[-_]IT/i.test(v.lang))||vs.find(v=>/^it/i.test(v.lang))||null}catch(e){}}
try{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}
function speak(text,rate){
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.replace(/^[A-Za-zà-ù ]+: /gm,""));u.lang="it-IT";if(itVoice)u.voice=itVoice;u.rate=rate||0.9;speechSynthesis.speak(u);return true}catch(e){return false}
}
const ttsOK=()=>"speechSynthesis" in window;

/* Motor de perguntas. items: {s, o?, a?, f?, x?}. modo "instant" mostra feedback ao responder; "exam" só guarda. */
function quiz(el,items,{mode="instant",onDone}={}){
  const answers=new Array(items.length).fill(null);
  el.innerHTML="";
  items.forEach((it,i)=>{
    const q=document.createElement("div");q.className="q";
    q.innerHTML=`<span class="code">Domanda ${i+1} di ${items.length}</span><p class="stem">${esc(it.s)}</p>`;
    const tools=document.createElement("div");tools.className="row";
    if(it.say&&ttsOK()){const b=document.createElement("button");b.type="button";b.className="btn small";b.textContent="▶ Ouvir";b.onclick=()=>speak(it.say,0.8);tools.appendChild(b)}
    if(it.tr&&mode==="instant"){const b=document.createElement("button");b.type="button";b.className="btn ghost small";b.textContent="Ver tradução";const t=document.createElement("span");t.className="tr";t.hidden=true;t.textContent=it.tr;b.onclick=()=>{t.hidden=!t.hidden;b.textContent=t.hidden?"Ver tradução":"Esconder tradução"};tools.appendChild(b);tools.appendChild(t)}
    if(tools.children.length)q.appendChild(tools);
    const fb=document.createElement("div");fb.className="fb";fb.hidden=true;
    const full=it.s.includes("___")?(x=>x.includes("___")?x:it.s)(it.s.split("—").pop()).replace(/\([^)]*\)/g,"").replace("___",it.o?it.o[it.a]:(it.f||[""])[0]).replace(/\s+/g," ").trim():null;
    const showFb=(good,text)=>{fb.hidden=false;fb.className="fb "+(good?"ok":"ko");fb.textContent=text;
      if(full&&ttsOK()&&mode==="instant"){const b=document.createElement("button");b.type="button";b.className="btn ghost small";b.style.marginLeft="8px";b.textContent="▶ Ouvir a frase";b.onclick=()=>speak(full,0.85);fb.appendChild(b)}};
    if(it.o){
      const box=document.createElement("div");box.className="opts";
      const order=shuffle(it.o.map((t,k)=>k));
      order.forEach(k=>{
        const b=document.createElement("button");b.className="opt";b.textContent=it.o[k];b.type="button";
        b.onclick=()=>{
          if(mode==="instant"){
            if(answers[i]!==null) return;
            answers[i]=k===it.a;
            box.querySelectorAll(".opt").forEach(x=>x.disabled=true);
            b.classList.add(k===it.a?"right":"wrong");
            if(k!==it.a) box.children[order.indexOf(it.a)].classList.add("right");
            showFb(k===it.a,(k===it.a?"Giusto! ":"Não foi dessa vez. ")+(it.x||""));
            check();
          }else{
            box.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");answers[i]=k===it.a;
          }
        };
        box.appendChild(b);
      });
      q.appendChild(box);
    }else{
      const row=document.createElement("div");row.className="row";
      const inp=document.createElement("input");inp.type="text";inp.id="fill-"+el.id+"-"+i;inp.autocomplete="off";inp.spellcheck=false;inp.setAttribute("aria-label","Resposta");
      row.appendChild(inp);
      const grade=()=>{const v=norm(inp.value);if(!v)return null;
        if(it.f.some(f=>norm(f)===v))return "ok"; if(it.f.some(f=>strip(f)===strip(v)))return "accent"; return "ko"};
      if(mode==="instant"){
        const b=document.createElement("button");b.className="btn small";b.textContent="Verificar";b.type="button";
        const go=()=>{const g=grade();if(g===null||answers[i]!==null)return;answers[i]=g!=="ko";inp.disabled=true;b.disabled=true;
          showFb(g!=="ko",g==="ok"?"Giusto! "+(it.x||""):g==="accent"?"Quase: atenção ao acento → "+it.f[0]:"Resposta: "+it.f[0]+". "+(it.x||""));check()};
        b.onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go()};row.appendChild(b);
      }else{inp.oninput=()=>{const g=grade();answers[i]=g===null?null:g!=="ko"}}
      q.appendChild(row);
    }
    q.appendChild(fb);el.appendChild(q);
  });
  function check(){if(answers.every(a=>a!==null)&&onDone)onDone(answers.filter(Boolean).length/items.length)}
  return {score:()=>answers.filter(Boolean).length/items.length};
}

/* ============================== VISTAS ============================== */
const ROUTES=[["oggi","Hoje"],["grammatica","Gramática"],["vocaboli","Vocabulário"],["ascolto","Escuta"],["lettura","Leitura"],["scrittura","Escrita"],["parlato","Fala"],["simulado","Simulado"],["esame","O exame"]];
let examTimer=null;
function route(){
  const h=(location.hash||"#oggi").slice(1);
  const [name,arg]=h.split("--");
  const key=ROUTES.some(r=>r[0]===name)?name:"oggi";
  clearInterval(examTimer);try{speechSynthesis.cancel()}catch(e){}
  $("#tabs").innerHTML=ROUTES.map(([k,l])=>`<a href="#${k}" ${k===key?'aria-current="page"':""}>${l}</a>`).join("");
  const cur=$("#tabs [aria-current]");if(cur)cur.scrollIntoView({block:"nearest",inline:"nearest"});
  VIEWS[key]($("#view"),arg);updateReady();
}
window.addEventListener("hashchange",()=>{route();window.scrollTo(0,0)});

const VIEWS={
 oggi(v){
  if(!S.level){
    v.innerHTML=`<section class="sheet"><span class="code">Mod. 00 · Primo accesso</span><h2>Benvenuto! Por onde você quer começar?</h2>
    <p class="muted intro">Escolha o que melhor descreve você hoje. Dá para mudar depois.</p>
    <div class="grid">
      <button class="choice" data-lv="A1" type="button"><span class="code">Começar pelo A1</span><h3>Nunca estudei italiano</h3><span class="muted">Começamos pela pronúncia e pelas primeiras frases.</span></button>
      <button class="choice" data-lv="A2" type="button"><span class="code">Começar pelo A2</span><h3>Sei o básico</h3><span class="muted">Me apresento, conto até 100 e uso o presente.</span></button>
      <button class="choice" data-lv="B1" type="button"><span class="code">Começar pelo B1</span><h3>Já entendo textos simples</h3><span class="muted">Quero focar no que cai na prova.</span></button>
    </div></section>
    <section class="sheet"><span class="code">Como funciona</span><ul class="clean">
      <li>A trilha vai do zero ao B1 em 3 etapas: <b>Base</b>, <b>Ponte</b> e <b>Nível da prova</b>.</li>
      <li>Toda explicação está em português. Toque nas palavras <span class="ex-it">verdes</span> para ouvir a pronúncia.</li>
      <li>Nas primeiras etapas, cada exercício tem tradução e, depois de responder, você ouve a frase completa.</li>
    </ul></section>`;
    v.querySelectorAll("[data-lv]").forEach(b=>b.onclick=()=>{S.level=b.dataset.lv;S.decks=null;save();route()});
    return;
  }
  const m=metrics(),due=dueCards().length,nu=nextUnit(),st=stage();
  const nextAudio=fitting(AUDIOS).find(a=>(S.audio[a.id]||0)<0.67)||fitting(AUDIOS)[0];
  const nextRead=fitting(READINGS).find(a=>(S.reading[a.id]||0)<0.67)||fitting(READINGS)[0];
  const nextW=fitting(WRITINGS).find(w=>!S.writing[w.id])||fitting(WRITINGS)[0];
  const last=S.exams[S.exams.length-1];
  v.innerHTML=`
  <section class="sheet">
    <span class="code">Mod. 01 · Piano del giorno</span>
    <h2>${S.streak>1?`${S.streak} dias seguidos. Avanti così!`:"Buongiorno! Vamos estudar hoje?"}</h2>
    <p class="muted">Faça na ordem: primeiro a lição, depois os cartões e por último a escuta. Uns 20 a 30 minutos por dia, todo dia.</p>
    <div class="grid">
      <a class="unit" href="#grammatica--${nu.id}"><span class="code">1 · Lição ${nu.lv} · 10 min</span><h3>${esc(nu.t)}</h3><div class="bar"><i style="width:${pct((S.lessons[nu.id]||{}).best||0)}"></i></div></a>
      <a class="unit" href="#vocaboli"><span class="code">2 · Vocabulário · 5 min</span><h3>${due} cartões para revisar</h3><p class="muted">Palavras do seu nível.</p></a>
      ${nextAudio?`<a class="unit" href="#ascolto--${nextAudio.id}"><span class="code">3 · Escuta · 4 min</span><h3>${esc(nextAudio.t)}</h3><p class="muted">${nextAudio.lvl}${nextAudio.pt?", com tradução":""}.</p></a>`:""}
      ${st!=="A1"&&nextW?`<a class="unit" href="#scrittura--${nextW.id}"><span class="code">Extra · Escrita · 10 min</span><h3>${esc(nextW.t)}</h3><p class="muted">${nextW.min}–${nextW.max} palavras, correção do Claude.</p></a>`:nextRead?`<a class="unit" href="#lettura--${nextRead.id}"><span class="code">Extra · Leitura · 5 min</span><h3>${esc(nextRead.t)}</h3><p class="muted">Texto curto com tradução.</p></a>`:""}
    </div>
  </section>
  <section class="sheet">
    <span class="code">Mod. 02 · Il percorso</span>
    <h2>Sua trilha até o B1</h2>
    <div class="path">${["A1","A2","B1"].map(lv=>`<div class="stage ${lv===st?"on":""}"><span class="code">${lv}${lv===st?" · Você está aqui":""}</span><b>${LV[lv].n}</b><div class="bar"><i style="width:${pct(lvProgress(lv))}"></i></div><span class="muted" style="font-size:.85rem">${LV[lv].d}</span></div>`).join("")}</div>
    <p class="note">Quem fala português sai na frente, porque as línguas são parecidas. Mesmo assim, chegar do zero ao B1 costuma levar muitos meses de estudo diário. Constância vale mais do que maratonas.</p>
  </section>
  <section class="sheet">
    <span class="code">Mod. 03 · Competenze</span>
    <h2>Seu preparo para a prova</h2>
    <div class="skills">${Object.entries(m).map(([k,x])=>`<div class="skill"><span>${k}</span><div class="bar"><i style="width:${pct(x)}"></i></div><span class="n">${pct(x)}</span></div>`).join("")}</div>
    <div class="row"><span class="pill">${S.xp} XP</span><span class="pill">${S.exams.length} simulados</span>${last?`<span class="pill ${last.pass?"ok":"ko"}">Último simulado: ${pct(last.total)}</span>`:""}<span style="flex:1"></span><button class="btn ghost small" id="relevel" type="button">Mudar nível inicial</button></div>
  </section>`;
  $("#relevel").onclick=()=>{S.level=null;save();route()};
 },

 grammatica(v,arg){
  const u=UNITS.find(x=>x.id===arg);
  if(!u){
    v.innerHTML=`<section class="sheet"><span class="code">Grammatica</span><h2>Gramática do zero ao B1</h2>
    <p class="muted intro">${UNITS.length} unidades em ordem. Cada uma tem explicação em português e exercícios. Avance quando acertar 80% ou mais.</p>
    ${groupByLv(UNITS,x=>{const b=(S.lessons[x.id]||{}).best||0;return `<a class="unit" href="#grammatica--${x.id}"><span class="code">Unità ${String(UNITS.indexOf(x)+1).padStart(2,"0")}${x===nextUnit()?" · Próxima":""}</span><h3>${esc(x.t)}</h3><div class="bar"><i style="width:${pct(b)}"></i></div><span class="pill ${b>=0.8?"ok":""}">${b?"Melhor: "+pct(b):"Não iniciada"}</span></a>`})}</section>`;
    return;
  }
  const idx=UNITS.indexOf(u);
  v.innerHTML=`<section class="sheet"><a href="#grammatica" class="code">← Todas as unidades</a><span class="code">Unità ${String(idx+1).padStart(2,"0")} · ${u.lv} ${LV[u.lv].n}</span><h2>${esc(u.t)}</h2><div class="explain">${u.e}</div>${u.lv!=="B1"?`<p class="note">Toque nas palavras verdes para ouvir.</p>`:""}</section>
  <section class="sheet"><h3>Esercizi</h3><div id="qz"></div><div id="res" class="row" hidden></div></section>`;
  quiz($("#qz"),u.q,{onDone:sc=>{
    const L=S.lessons[u.id]||{};L.best=Math.max(L.best||0,sc);S.lessons[u.id]=L;touch(Math.round(sc*20));
    const r=$("#res");r.hidden=false;const nx=UNITS[idx+1];
    r.innerHTML=`<span class="pill ${sc>=0.8?"ok":"ko"}">Resultado: ${pct(sc)}</span><button class="btn ghost small" id="again" type="button">Refazer</button>${nx?`<a class="btn small" href="#grammatica--${nx.id}">Próxima unidade</a>`:""}`;
    $("#again").onclick=()=>route();
  }});
 },

 vocaboli(v){
  const on=activeDecks(),pool=ALLCARDS.filter(c=>on.includes(c.deck));
  const due=shuffle(dueCards()).slice(0,15);
  const boxes=[0,1,2,3,4,5,6].map(b=>pool.filter(c=>((S.cards[c.id]||{}).box||0)===b).length);
  v.innerHTML=`<section class="sheet"><span class="code">Lessico</span><h2>Vocabulário com repetição espaçada</h2>
  <p class="muted intro">Veja a palavra em italiano, tente lembrar o significado e toque para conferir. Se acertou, o cartão volta daqui a alguns dias. Se errou, ele volta ainda hoje.</p>
  <span class="code">Temas ativos</span>
  <div class="chips">${DECKS.map(d=>`<button class="chip" type="button" data-deck="${d.id}" aria-pressed="${on.includes(d.id)}">${esc(d.t)} · ${d.lv}</button>`).join("")}</div>
  <div class="box-row" aria-label="Cartões por caixa">${boxes.map((n,i)=>`<span title="Caixa ${i}">C${i} · ${n}</span>`).join("")}</div></section>
  <section class="sheet" id="study"></section>`;
  v.querySelectorAll("[data-deck]").forEach(b=>b.onclick=()=>{let a=activeDecks().slice();const id=b.dataset.deck;a=a.includes(id)?a.filter(x=>x!==id):a.concat(id);if(!a.length)return;S.decks=a;save();route()});
  const st=$("#study");let i=0,ok=0;
  function show(){
    if(!due.length){st.innerHTML=`<h3>Nenhum cartão para hoje.</h3><p class="muted">Volte amanhã: as revisões aparecem nos dias certos.</p>`;return}
    if(i>=due.length){touch(ok*2);st.innerHTML=`<h3>Sessão concluída: ${ok} de ${due.length}</h3><button class="btn" id="more" type="button">Nova sessão</button>`;$("#more").onclick=()=>route();return}
    const c=due[i];let flipped=false;
    st.innerHTML=`<span class="code">Cartão ${i+1} de ${due.length} · ${DECKS.find(d=>d.id===c.deck).t}</span>
    <div class="card" id="card" role="button" tabindex="0" aria-label="Virar cartão"><div><div class="word">${esc(c.it)}</div><p class="muted" id="back">Toque para ver a tradução</p></div></div>
    <div class="row">${ttsOK()?`<button class="btn ghost small" id="say" type="button">Ouvir</button>`:""}<span style="flex:1"></span><button class="btn ghost" id="no" type="button" hidden>Não sabia</button><button class="btn" id="yes" type="button" hidden>Sabia</button></div>`;
    const flip=()=>{if(flipped)return;flipped=true;$("#back").innerHTML=`<b style="color:var(--ink);font-size:1.2rem">${esc(c.pt)}</b>`;$("#no").hidden=false;$("#yes").hidden=false};
    $("#card").onclick=flip;$("#card").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}};
    if($("#say"))$("#say").onclick=e=>{e.stopPropagation();speak(c.it,0.85)};
    const grade=good=>{const k=S.cards[c.id]||{box:0};k.box=good?Math.min(6,(k.box||0)+1):0;k.due=dayNum(today())+(good?INTERVALS[k.box]:0);S.cards[c.id]=k;if(good)ok++;else due.push(c);save();i++;show()};
    $("#yes").onclick=()=>grade(true);$("#no").onclick=()=>grade(false);
  }
  show();
 },

 ascolto(v,arg){
  const a=AUDIOS.find(x=>x.id===arg);
  if(!a){
    v.innerHTML=`<section class="sheet"><span class="code">Ascolto</span><h2>Compreensão oral</h2>
    <p class="muted intro">Ouça sem ler, quantas vezes precisar, e depois responda. Nos áudios iniciantes a voz é mais lenta e há tradução. Na prova, você costuma ouvir cada áudio só duas vezes.</p>
    ${ttsOK()?"":`<p class="fb ko">Este navegador não tem síntese de voz. Leia a transcrição em voz alta para treinar.</p>`}
    ${groupByLv(AUDIOS,x=>`<a class="unit" href="#ascolto--${x.id}"><span class="code">${x.lvl}</span><h3>${esc(x.t)}</h3><span class="pill ${(S.audio[x.id]||0)>=0.67?"ok":""}">${S.audio[x.id]!=null?"Melhor: "+pct(S.audio[x.id]):"Novo"}</span></a>`)}</section>`;
    return;
  }
  const r=a.rate||0.95;
  v.innerHTML=`<section class="sheet"><a href="#ascolto" class="code">← Todos os áudios</a><span class="code">${a.lv} · ${a.lvl}</span><h2>${esc(a.t)}</h2>
   <div class="row"><button class="btn" id="play" type="button">▶ Ouvir</button><button class="btn ghost" id="slow" type="button">Ouvir mais devagar</button><button class="btn ghost small" id="showtx" type="button">Mostrar texto</button>${a.pt?'<button class="btn ghost small" id="showpt" type="button">Mostrar tradução</button>':""}</div>
   <p class="note" id="voice-note"></p><div class="transcript" id="tx" hidden>${esc(a.tx)}</div>${a.pt?`<div class="transcript tr" id="pt" hidden>${esc(a.pt)}</div>`:""}</section>
   <section class="sheet"><h3>Domande</h3><div id="qz"></div><div id="res" class="row" hidden></div></section>`;
  if(!itVoice&&ttsOK()) $("#voice-note").textContent="Se a voz soar estrangeira, instale uma voz italiana nas configurações de fala do seu sistema.";
  $("#play").onclick=()=>speak(a.tx,r);$("#slow").onclick=()=>speak(a.tx,Math.max(0.55,r-0.2));
  const tog=(btn,el,a1,a2)=>{$(btn).onclick=e=>{const t=$(el);t.hidden=!t.hidden;e.target.textContent=t.hidden?a1:a2}};
  tog("#showtx","#tx","Mostrar texto","Esconder texto");if(a.pt)tog("#showpt","#pt","Mostrar tradução","Esconder tradução");
  quiz($("#qz"),a.q,{onDone:sc=>{S.audio[a.id]=Math.max(S.audio[a.id]||0,sc);touch(Math.round(sc*15));const r=$("#res");r.hidden=false;r.innerHTML=`<span class="pill ${sc>=0.67?"ok":"ko"}">Resultado: ${pct(sc)}</span><a class="btn ghost small" href="#ascolto">Outro áudio</a>`}});
 },

 lettura(v,arg){
  const t=READINGS.find(x=>x.id===arg);
  if(!t){
    v.innerHTML=`<section class="sheet"><span class="code">Lettura</span><h2>Compreensão de leitura</h2>
    <p class="muted intro">Comece pelos bilhetes simples e avance até os avisos públicos e e-mails. Procure no texto a prova de cada resposta.</p>
    ${groupByLv(READINGS,x=>`<a class="unit" href="#lettura--${x.id}"><h3>${esc(x.t)}</h3><span class="pill ${(S.reading[x.id]||0)>=0.67?"ok":""}">${S.reading[x.id]!=null?"Melhor: "+pct(S.reading[x.id]):"Novo"}</span></a>`)}</section>`;
    return;
  }
  v.innerHTML=`<section class="sheet"><a href="#lettura" class="code">← Todos os textos</a><span class="code">${t.lv}</span><h2>${esc(t.t)}</h2><div class="reading">${esc(t.tx)}</div>
  <div class="row">${ttsOK()?'<button class="btn ghost small" id="say" type="button">▶ Ouvir o texto</button>':""}${t.pt?'<button class="btn ghost small" id="showpt" type="button">Mostrar tradução</button>':""}</div>${t.pt?`<div class="transcript tr" id="pt" hidden>${esc(t.pt)}</div>`:""}</section>
  <section class="sheet"><h3>Domande</h3><div id="qz"></div><div id="res" class="row" hidden></div></section>`;
  if($("#say"))$("#say").onclick=()=>speak(t.tx,t.lv==="A1"?0.8:0.95);
  if(t.pt)$("#showpt").onclick=e=>{const x=$("#pt");x.hidden=!x.hidden;e.target.textContent=x.hidden?"Mostrar tradução":"Esconder tradução"};
  quiz($("#qz"),t.q,{onDone:sc=>{S.reading[t.id]=Math.max(S.reading[t.id]||0,sc);touch(Math.round(sc*15));const r=$("#res");r.hidden=false;r.innerHTML=`<span class="pill ${sc>=0.67?"ok":"ko"}">Resultado: ${pct(sc)}</span><a class="btn ghost small" href="#lettura">Outro texto</a>`}});
 },

 scrittura(v,arg){
  const w=WRITINGS.find(x=>x.id===arg);
  if(!w){
    v.innerHTML=`<section class="sheet"><span class="code">Mod. 07 · Produzione scritta</span><h2>Escrita</h2>
    <p class="muted intro">Temas típicos da prova: e-mails, mensagens e relatos pessoais. Escreva e peça a correção: o Claude marca os erros, explica em português e dá uma nota de 0 a 10.</p>
    ${groupByLv(WRITINGS,x=>`<a class="unit" href="#scrittura--${x.id}"><span class="code">${x.min}–${x.max} palavras</span><h3>${esc(x.t)}</h3><span class="pill ${(S.writing[x.id]||0)>=6?"ok":""}">${S.writing[x.id]!=null?"Nota: "+S.writing[x.id]+"/10":"Novo"}</span></a>`)}</section>`;
    return;
  }
  let draft="";try{draft=localStorage.getItem(KEY+"-draft-"+w.id)||""}catch(e){}
  v.innerHTML=`<section class="sheet"><a href="#scrittura" class="code">← Todos os temas</a><span class="code">${w.min}–${w.max} parole</span><h2>${esc(w.t)}</h2>
   <p class="reading">${esc(w.p)}</p><ul class="clean muted">${w.tips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
   <label for="txt-${w.id}" class="code">Il tuo testo</label><textarea id="txt-${w.id}" spellcheck="false">${esc(draft)}</textarea>
   <div class="row"><span class="pill" id="wc">0 parole</span><span style="flex:1"></span><button class="btn" id="fix" type="button">Corrigir com o Claude</button></div>
   <p class="note" id="fix-note"></p></section><section class="sheet" id="out" hidden></section>`;
  const ta=$("#txt-"+w.id),wc=$("#wc");
  const count=()=>{const n=(ta.value.match(/[A-Za-zÀ-ÿ']+/g)||[]).length;wc.textContent=n+" parole";wc.className="pill "+(n>=w.min&&n<=w.max+10?"ok":"");try{localStorage.setItem(KEY+"-draft-"+w.id,ta.value)}catch(e){}return n};
  ta.oninput=count;count();
  if(sampleFn===null){$("#fix").disabled=true;$("#fix-note").textContent="A correção automática pela IA ainda não está ativa nesta versão do app. Por enquanto, use as dicas acima e releia procurando concordância, auxiliares e preposições."}
  $("#fix").onclick=async()=>{
    const n=count();if(n<15){$("#fix-note").textContent="Escreva pelo menos algumas frases antes de pedir a correção.";return}
    if(!sampleFn){$("#fix-note").textContent="Conectando ao Claude… tente de novo em alguns segundos.";return}
    const btn=$("#fix");btn.disabled=true;btn.textContent="Corrigindo…";$("#fix-note").textContent="";
    try{
      const res=await sampleFn.json(`Sei un esaminatore esperto della certificazione di italiano B1 per la cittadinanza (CILS/CELI/PLIDA). Correggi il testo di uno studente brasiliano.
Compito: ${w.p} (lunghezza richiesta: ${w.min}-${w.max} parole)
${w.lv==="A1"?"ATTENZIONE: lo studente è un principiante assoluto (livello A1). Valuta rispetto al livello A1, sii molto incoraggiante e scrivi le spiegazioni in modo semplicissimo.\n":""}Testo dello studente:
"""${ta.value}"""
Rispondi SOLO con JSON valido in questo formato:
{"voto": numero intero da 0 a 10, "livello": "A1"|"A2"|"B1"|"B2", "commento": "2-3 frasi in PORTOGHESE brasiliano sul compito, la coerenza e il lessico", "errori": [{"originale":"frammento sbagliato","corretto":"forma corretta","spiegazione":"spiegazione breve in PORTOGHESE brasiliano"}], "testo_corretto": "testo intero corretto in italiano, mantenendo le idee dello studente"}
Elenca al massimo 10 errori, i più importanti. Sii rigoroso ma incoraggiante.`,{modelTier:"default"});
      const voto=Math.max(0,Math.min(10,Math.round(+res.voto||0)));
      S.writing[w.id]=Math.max(S.writing[w.id]||0,voto);touch(10+voto*2);
      const o=$("#out");o.hidden=false;
      o.innerHTML=`<div class="row"><span class="code">Valutazione</span><span class="pill ${voto>=6?"ok":"ko"}">Nota ${voto}/10</span><span class="pill">Nível estimado ${esc(res.livello||"?")}</span></div>
      <p>${esc(res.commento||"")}</p>
      ${(res.errori||[]).length?`<h3>Erros principais</h3>${res.errori.map(e=>`<div class="err"><span><s>${esc(e.originale)}</s> → <b>${esc(e.corretto)}</b></span><span class="muted">${esc(e.spiegazione)}</span></div>`).join("")}`:"<p class='fb ok'>Nenhum erro importante encontrado.</p>"}
      <h3>Testo corretto</h3><div class="transcript">${esc(res.testo_corretto||"")}</div>`;
    }catch(e){
      $("#fix-note").textContent=e&&e.code==="not_granted"?"A correção precisa da sua permissão para consultar o Claude. Libere no menu de permissões do artefato.":e&&e.code==="rate_limited"?"Muitas correções seguidas. Aguarde um minuto e tente de novo.":"Não consegui corrigir agora. Tente de novo em instantes.";
    }finally{btn.disabled=false;btn.textContent="Corrigir com o Claude"}
  };
 },

 parlato(v){
  v.innerHTML=`<section class="sheet"><span class="code">Mod. 08 · Produzione orale</span><h2>Fala</h2>
  <p class="muted intro">A prova oral começa com uma apresentação pessoal e segue com descrição ou simulação de situação. Fale em voz alta por 1 a 2 minutos, depois ouça a resposta modelo e repita imitando a entonação.</p></section>
  ${SPEAK.map(s=>`<section class="sheet" data-s="${s.id}"><div class="row"><h3 style="flex:1">${esc(s.t)}</h3>${S.speak[s.id]?'<span class="pill ok">Praticado</span>':""}</div>
  <p>${esc(s.p)}</p>
  <div class="row"><button class="btn small" data-act="timer" type="button">Falar por 2 min</button><span class="timer" data-t>2:00</span><span style="flex:1"></span><button class="btn ghost small" data-act="model" type="button">Ver resposta modelo</button></div>
  <div data-m hidden class="explain"><div class="transcript">${esc(s.m)}</div><div class="row">${ttsOK()?'<button class="btn ghost small" data-act="say" type="button">Ouvir modelo</button>':""}<button class="btn small" data-act="done" type="button">Marcar como praticado</button></div></div></section>`).join("")}`;
  let tick=null;
  v.querySelectorAll("[data-s]").forEach(sec=>{
    const s=SPEAK.find(x=>x.id===sec.dataset.s);
    sec.onclick=e=>{const act=e.target.dataset&&e.target.dataset.act;if(!act)return;
      if(act==="timer"){clearInterval(tick);let left=120;const t=sec.querySelector("[data-t]");v.querySelectorAll("[data-t]").forEach(x=>x.textContent="2:00");
        tick=setInterval(()=>{left--;t.textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");if(left<=0){clearInterval(tick);t.textContent="Fine!"}},1000);examTimer=tick}
      if(act==="model"){const m=sec.querySelector("[data-m]");m.hidden=!m.hidden}
      if(act==="say")speak(s.m,0.9);
      if(act==="done"){if(!S.speak[s.id]){S.speak[s.id]=1;touch(10)}e.target.textContent="Praticado";e.target.disabled=true}
    };
  });
 },

 simulado(v){
  const hist=S.exams.slice(-5).reverse();
  v.innerHTML=`<section class="sheet"><span class="code">Mod. 09 · Prova simulata</span><h2>Simulado cronometrado</h2>
  <p class="muted intro">Três partes: escuta (2 áudios, até 2 reproduções cada), leitura (2 textos) e estruturas (12 questões sorteadas). Você tem 40 minutos. Para passar no simulado é preciso pelo menos 60% em cada parte.</p>
  ${stage()!=="B1"?`<p class="fb ko">O simulado está no nível da prova (B1). Se você está começando, vai achar difícil, e isso é normal. Complete antes as etapas Base e Ponte na aba Gramática.</p>`:""}<p class="note">Escrita e fala também fazem parte da prova real: treine-as nas abas próprias.</p>
  <div class="row"><button class="btn" id="start" type="button">Começar simulado</button></div>
  ${hist.length?`<h3>Últimos resultados</h3>${hist.map(x=>`<div class="result-row"><span>${esc(x.date)}</span><span class="muted">E ${pct(x.sec.ascolto)} · L ${pct(x.sec.lettura)} · G ${pct(x.sec.strutture)}</span><span class="pill ${x.pass?"ok":"ko"}">${x.pass?"Aprovado":"Reprovado"}</span></div>`).join("")}`:""}</section>`;
  $("#start").onclick=()=>runExam(v);
 },

 esame(v){
  v.innerHTML=`<section class="sheet"><span class="code">Mod. 10 · Informazioni</span><h2>O exame B1 para a cidadania</h2>
  <div class="explain">
  <p>Desde dezembro de 2018 (decreto-lei 113/2018, convertido na lei 132/2018), quem pede a cidadania italiana <b>por casamento</b> ou <b>por residência</b> precisa comprovar italiano no mínimo nível <b>B1</b> do Quadro Europeu.</p>
  <p>Quem pede por descendência (<i>iure sanguinis</i>) não precisa desse certificado. As regras de descendência mudaram em 2025, então confirme o seu caso no consulado ou na prefettura.</p>
  <h3>Certificados aceitos</h3>
  <table>
   <tr><th>Certificado</th><th>Entidade</th></tr>
   <tr><td>CILS</td><td>Università per Stranieri di Siena</td></tr>
   <tr><td>CELI</td><td>Università per Stranieri di Perugia</td></tr>
   <tr><td>PLIDA</td><td>Società Dante Alighieri</td></tr>
   <tr><td>Cert.IT</td><td>Università Roma Tre</td></tr>
  </table>
  <p>Vários desses exames têm uma versão específica para a cidadania (por exemplo, CILS B1 Cittadinanza e CELI B1 Cittadinanza) e podem ser feitos no Brasil em centros credenciados, como institutos de cultura italiana e sedes da Dante Alighieri.</p>
  <h3>O que costuma cair</h3>
  <ul class="clean">
   <li><b>Escuta</b>: diálogos do dia a dia, recados, avisos públicos.</li>
   <li><b>Leitura</b>: avisos, e-mails, textos informativos curtos.</li>
   <li><b>Estruturas</b>: preencher lacunas com verbos, preposições, pronomes.</li>
   <li><b>Escrita</b>: um e-mail ou mensagem e um texto pessoal curto.</li>
   <li><b>Fala</b>: apresentação pessoal e uma situação simulada com o examinador.</li>
  </ul>
  <p class="note">Cada entidade define formato, duração e nota mínima, e você normalmente precisa passar em todas as partes. Verifique o regulamento atual no site da entidade escolhida antes de se inscrever.</p>
  </div></section>`;
 }
};

function runExam(v){
  const aud=shuffle(AUDIOS).slice(0,2),rd=shuffle(READINGS).slice(0,2);
  const gram=shuffle(UNITS.filter(u=>u.lv==="B1").flatMap(u=>u.q.filter(q=>!/significa:$/.test(q.s)))).slice(0,12);
  const plays={};
  v.innerHTML=`<section class="sheet" style="position:sticky;top:calc(env(safe-area-inset-top,0px) + 46px);z-index:4"><div class="row"><span class="code" style="flex:1">Prova simulata in corso</span><span class="timer" id="clock">40:00</span><button class="btn small" id="submit" type="button">Entregar</button></div></section>
  <section class="sheet"><span class="code">Parte A · Ascolto</span>${aud.map((a,i)=>`<div class="q"><h3>${esc(a.t)}</h3><div class="row"><button class="btn small" data-play="${a.id}" type="button">Ouvir (2 restantes)</button></div><div id="ea${i}"></div></div>`).join("")}</section>
  <section class="sheet"><span class="code">Parte B · Lettura</span>${rd.map((t,i)=>`<div class="q"><h3>${esc(t.t)}</h3><div class="reading">${esc(t.tx)}</div><div id="er${i}"></div></div>`).join("")}</section>
  <section class="sheet"><span class="code">Parte C · Strutture</span><div id="eg"></div></section>`;
  v.querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>{const id=b.dataset.play;plays[id]=(plays[id]||0)+1;speak(AUDIOS.find(a=>a.id===id).tx,0.95);const left=2-plays[id];b.textContent=left>0?`Ouvir (${left} restante)`:"Sem reproduções";if(left<=0)b.disabled=true});
  const qa=aud.map((a,i)=>quiz($("#ea"+i),a.q,{mode:"exam"})),qr=rd.map((t,i)=>quiz($("#er"+i),t.q,{mode:"exam"})),qg=quiz($("#eg"),gram,{mode:"exam"});
  let left=40*60;
  examTimer=setInterval(()=>{left--;const c=$("#clock");if(c)c.textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");if(left<=0)finish()},1000);
  $("#submit").onclick=finish;
  function finish(){
    clearInterval(examTimer);try{speechSynthesis.cancel()}catch(e){}
    const sec={ascolto:avg(qa.map(q=>q.score())),lettura:avg(qr.map(q=>q.score())),strutture:qg.score()};
    const total=avg(Object.values(sec)),pass=Object.values(sec).every(x=>x>=0.6);
    S.exams.push({date:new Date().toLocaleDateString("pt-BR"),sec,total,pass});touch(30);
    const used=40*60-Math.max(0,left);
    v.innerHTML=`<section class="sheet"><span class="code">Esito della prova</span><h2>${pass?"Aprovado no simulado":"Ainda não: continue treinando"}</h2>
    <p class="muted">Tempo usado: ${Math.floor(used/60)} min ${used%60} s · Média geral ${pct(total)}</p>
    ${[["Escuta","ascolto"],["Leitura","lettura"],["Estruturas","strutture"]].map(([l,k])=>`<div class="result-row"><span>${l}</span><div class="bar" style="width:120px"><i style="width:${pct(sec[k])}"></i></div><span class="pill ${sec[k]>=0.6?"ok":"ko"}">${pct(sec[k])}</span></div>`).join("")}
    <p class="note">${pass?"Bom sinal. Faça simulados com regularidade e treine escrita e fala, que o simulado não cobre.":"Reforce primeiro a parte abaixo de 60%. Em estruturas, revise as unidades com menor pontuação na aba Gramática."}</p>
    <div class="row"><button class="btn" id="again" type="button">Novo simulado</button><a class="btn ghost" href="#oggi">Voltar ao início</a></div></section>`;
    $("#again").onclick=()=>runExam(v);window.scrollTo(0,0);
  }
}

document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest(".ex-it");if(t)speak(t.textContent,0.8)});
route();
initCloud();

/* PWA: funciona offline e pode ser instalado na tela inicial. */
if("serviceWorker" in navigator&&location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
let installEvt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installEvt=e;const b=document.getElementById("install");if(b)b.hidden=false});
document.getElementById("install").addEventListener("click",async()=>{if(!installEvt)return;installEvt.prompt();await installEvt.userChoice.catch(()=>{});installEvt=null;document.getElementById("install").hidden=true});
