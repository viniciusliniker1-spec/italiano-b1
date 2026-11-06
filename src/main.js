import "./styles.css";
import { UNITS, DECKS, AUDIOS, READINGS, WRITINGS, SPEAK } from "./content.js";
import { EXAMS, OFFICIAL, SCORING, PRESENTAZIONE } from "./exams.js";
import { PHRASES, PAIRS } from "./pronuncia.js";
import { keyOf, fullSentence } from "./audio-keys.js";
import { authEnabled, initAuth, onAuthChange, currentUser, lastSyncAt, inRecovery, syncNow, schedulePush, signIn, signUp, sendReset, setNewPassword, signOut } from "./auth.js";

/* ============================== ÍCONES ============================== */
const P = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2.5Z"/><path d="M8 7h8M8 11h6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
  flag:'<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>',
  cards:'<rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v11"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
  head:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  open:'<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/>',
  play:'<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  stop:'<rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" stroke="none"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  fire:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5Z"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  sync:'<path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3"/><path d="M4 4v4h4M20 20v-4h-4"/>',
};
const I = (n, c = "") => `<svg class="icon ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;

/* ============================== ESTADO ============================== */
const KEY = "cittadinanza-b1-v1";
const blank = () => ({ v: 2, level: null, decks: null, xp: 0, streak: 0, lastDay: null, today: { day: null, xp: 0 },
  lessons: {}, cards: {}, audio: {}, reading: {}, writing: {}, speak: {}, pron: {}, exams: [] });
let S = blank();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
const GOAL = 30;
const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
const dayNum = (s) => Math.round(Date.parse(s + "T12:00:00") / 864e5);
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} renderBar(); schedulePush(); }
function touch(xp) {
  const t = today();
  if (S.lastDay !== t) { S.streak = S.lastDay && dayNum(t) - dayNum(S.lastDay) === 1 ? S.streak + 1 : 1; S.lastDay = t; }
  if (!S.today || S.today.day !== t) S.today = { day: t, xp: 0 };
  S.xp += xp || 0; S.today.xp += xp || 0; save();
}
const todayXP = () => (S.today && S.today.day === today() ? S.today.xp : 0);

/* ============================== UTIL ============================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const norm = (s) => s.toLowerCase().trim().replace(/\s+/g, " ").replace(/[’`]/g, "'");
const strip = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");
const words = (s) => strip(s).replace(/[^a-z0-9' ]/g, " ").replace(/'/g, " ").split(/\s+/).filter(Boolean);
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const pct = (x) => Math.round(x * 100) + "%";
const fmt = (n) => (Math.round(n * 10) / 10).toString().replace(".", ",");
const LV = { A1: { n: "Base", d: "Pronúncia, saudações e verbos essenciais" }, A2: { n: "Ponte", d: "O dia a dia em italiano" }, B1: { n: "Prova", d: "O que cai no exame de cidadania" } };
const RANK = { A1: 0, A2: 1, B1: 2 };
const ABC = ["A", "B", "C", "D"];

/* ============================== ÁUDIO ==============================
   Toca os MP3 gravados com voz italiana neural. Se faltar algum, usa a voz do aparelho. */
let manifest = null, curAudio = null, curBtn = null;
fetch("./audio/manifest.json").then((r) => r.json()).then((m) => (manifest = m)).catch(() => (manifest = {}));
function stopAudio() {
  if (curAudio) { curAudio.pause(); curAudio = null; }
  try { speechSynthesis.cancel(); } catch (e) {}
  if (curBtn) { curBtn.classList.remove("playing"); curBtn = null; }
}
function playKey(key, text, { rate = 1, btn, onend } = {}) {
  stopAudio();
  const done = () => { if (btn) btn.classList.remove("playing"); if (curBtn === btn) curBtn = null; onend && onend(); };
  if (btn) { btn.classList.add("playing"); curBtn = btn; }
  const file = manifest && manifest[key];
  if (file) {
    const a = new Audio("./audio/" + file);
    a.playbackRate = rate; a.preservesPitch = true; a.onended = done; a.onerror = () => tts(text, rate, done);
    curAudio = a;
    a.play().catch(() => tts(text, rate, done));
  } else tts(text, rate, done);
}
function tts(text, rate, done) {
  try {
    const u = new SpeechSynthesisUtterance(text.replace(/^[MF]: /gm, "").replace(/^[A-Za-zà-ù ]{2,20}: /gm, ""));
    u.lang = "it-IT"; u.rate = 0.9 * rate;
    const v = speechSynthesis.getVoices().find((x) => /^it/i.test(x.lang)); if (v) u.voice = v;
    u.onend = done; u.onerror = done; speechSynthesis.speak(u);
  } catch (e) { done(); }
}
const say = (text, voice = "f", opts) => playKey(keyOf(text, voice), text, opts);
const sayDialog = (id, text, opts) => playKey("d|" + id, text, opts);
const playBtn = (attrs, label = "Ouvir", cls = "") => `<button class="play ${cls}" type="button" ${attrs}>${I("play")}${label}</button>`;

/* Clique em palavra italiana destacada → ouvir. */
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest(".ex-it");
  if (t) say(t.textContent.replace(/\s+/g, " ").trim(), "f", { btn: t });
});

/* ============================== FALA E GRAVAÇÃO ============================== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const canRec = !!(navigator.mediaDevices && window.MediaRecorder);
function listen(target) {
  return new Promise((resolve, reject) => {
    if (!SR) return reject(new Error("sem reconhecimento"));
    const r = new SR(); r.lang = "it-IT"; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = (e) => {
      const alts = [...e.results[0]].map((x) => x.transcript);
      const scored = alts.map((h) => ({ heard: h, ...compare(target, h) })).sort((a, b) => b.score - a.score);
      resolve(scored[0]);
    };
    r.onerror = (e) => reject(e); r.onend = () => resolve(null);
    r.start();
  });
}
function compare(target, heard) {
  const t = words(target), h = words(heard); let j = 0;
  const marks = t.map((w) => { const k = h.indexOf(w, j); if (k >= 0) { j = k + 1; return true; } return false; });
  return { marks, tw: target.split(/\s+/), score: marks.filter(Boolean).length / (t.length || 1) };
}
let rec = null;
async function toggleRecord(btn, out) {
  if (rec) { rec.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = []; rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop()); rec = null; btn.classList.remove("rec"); btn.innerHTML = I("mic") + "Gravar";
      const url = URL.createObjectURL(new Blob(chunks, { type: chunks[0] ? chunks[0].type : "audio/webm" }));
      out.innerHTML = `<audio controls src="${url}" style="width:100%"></audio>`;
    };
    rec.start(); btn.classList.add("rec"); btn.innerHTML = I("stop") + "Parar";
    setTimeout(() => rec && rec.state === "recording" && rec.stop(), 180000);
  } catch (e) { out.innerHTML = `<p class="banner">Não consegui usar o microfone. Permita o acesso ao microfone nas configurações do navegador.</p>`; }
}

/* ============================== MÉTRICAS ============================== */
const ALLCARDS = DECKS.flatMap((d) => d.w.map((w, i) => ({ id: d.id + i, deck: d.id, it: w[0], pt: w[1], pr: w[2] })));
const best = (id) => (S.lessons[id] || {}).best || 0;
const lvProgress = (lv) => avg(UNITS.filter((u) => u.lv === lv && !u.extra).map((u) => best(u.id)));
const startUnits = () => UNITS.filter((u) => RANK[u.lv] >= RANK[S.level || "A1"]);
const nextUnit = () => startUnits().find((u) => !u.extra && best(u.id) < 0.8) || startUnits().find((u) => best(u.id) < 0.8) || UNITS[UNITS.length - 1];
const stage = () => nextUnit().lv;
const fitting = (list) => list.filter((x) => RANK[x.lv || "B1"] <= RANK[stage()]);
const activeDecks = () => S.decks || DECKS.filter((d) => RANK[d.lv] <= RANK[S.level || "A1"]).map((d) => d.id);
const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
const dueCards = () => { const t = dayNum(today()), on = activeDecks(); return ALLCARDS.filter((c) => { const k = S.cards[c.id]; return on.includes(c.deck) && (!k || k.due <= t); }); };
function skills() {
  const ex = S.exams.filter((x) => x.pts);
  const bestEx = (k) => (ex.length ? Math.max(...ex.map((x) => x.pts[k] || 0)) / 12 : null);
  const mix = (practice, k) => { const b = bestEx(k); return b === null ? practice : (practice + b) / 2; };
  return {
    Escuta: mix(avg(AUDIOS.map((x) => S.audio[x.id] || 0)), "a"),
    Leitura: mix(avg([...READINGS.map((x) => S.reading[x.id] || 0), avg(UNITS.filter((u) => u.lv === "B1" && !u.extra).map((u) => best(u.id)))]), "l"),
    Escrita: mix(avg(WRITINGS.map((x) => (S.writing[x.id] || 0) / 12)), "w"),
    Fala: mix((SPEAK.filter((x) => S.speak[x.id]).length / SPEAK.length + Math.min(1, Object.keys(S.pron).length / 15)) / 2, "o"),
  };
}

/* ============================== MOLDURA ============================== */
const NAV = [["inicio", "Início", "home"], ["lezioni", "Lições", "book"], ["pratica", "Praticar", "target"], ["simulado", "Simulado", "clip"], ["prova", "A prova", "flag"]];
const SECTION = { inicio: "inicio", lezioni: "lezioni", lezione: "lezioni", conta: "inicio", pratica: "pratica", vocaboli: "pratica", pronuncia: "pratica", ascolto: "pratica", lettura: "pratica", scrittura: "pratica", parlato: "pratica", simulado: "simulado", esame: "simulado", ufficiale: "simulado", prova: "prova" };
function renderBar() {
  const s = $("#streak"), x = $("#xp");
  if (s) s.innerHTML = I("fire") + (S.streak || 0);
  if (x) x.innerHTML = I("star") + (S.xp || 0);
  const u = $("#acct");
  if (u) { const me = currentUser(); u.hidden = !authEnabled; u.innerHTML = me ? `<span class="avatar">${esc(((me.user_metadata || {}).name || me.email || "?").trim()[0].toUpperCase())}</span>` : I("user") + "Entrar"; u.setAttribute("aria-label", me ? "Minha conta" : "Entrar"); }
}
function route() {
  stopAudio(); clearInterval(timerId); document.body.classList.remove("focus");
  const [name, arg] = (location.hash || "#inicio").slice(1).split("--");
  const key = VIEWS[name] ? name : "inicio";
  const sec = SECTION[key] || "inicio";
  $("#nav").innerHTML = NAV.map(([k, l, ic]) => `<a href="#${k}" ${k === sec ? 'aria-current="page"' : ""}><span class="pill">${I(ic)}</span>${l}</a>`).join("");
  const v = $("#view"); v.innerHTML = "";
  VIEWS[key](v, arg);
  renderBar();
}
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
const back = (href, label) => `<a href="${href}" class="row small" style="text-decoration:none;color:var(--muted);gap:4px">${I("back")}${label}</a>`;
const ring = (v, max) => { const r = 36, c = 2 * Math.PI * r, f = Math.min(1, v / max); return `<div class="ring"><svg viewBox="0 0 84 84"><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="8"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--verde)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c * f} ${c}"/></svg><div><b>${v}</b><small>de ${max} XP</small></div></div>`; };

/* ============================== PERGUNTAS (uma por vez) ==============================
   items: {s, o?, a?, f?, x?, tr?, say?}. Ao final chama onDone(acertos/total). */
function stepQuiz(v, items, { title, onDone, onExit }) {
  let i = 0, right = 0;
  document.body.classList.add("focus");
  const order = items.map((it) => (it.o ? shuffle(it.o.map((_, k) => k)) : null));
  function show() {
    stopAudio();
    const it = items[i];
    const stem = esc(it.s).replace("___", '<span class="gap"></span>');
    const label = it.say ? "Ouça e escolha" : it.f ? "Escreva a palavra que falta" : it.s.includes("___") ? "Complete a frase" : "Escolha a resposta";
    v.innerHTML = `
      <div class="lesson-top"><button class="icon-btn" id="quit" type="button" aria-label="Sair">${I("x")}</button><div class="bar"><i style="width:${(i / items.length) * 100}%"></i></div><span class="small muted">${i + 1}/${items.length}</span></div>
      <p class="qlabel">${label}</p>
      ${it.say ? `<div>${playBtn('id="say"', "Ouvir", "big")}</div>` : ""}
      <p class="qstem">${stem}</p>
      ${it.tr ? `<button class="play slow" type="button" id="trb">Ver tradução</button><p class="tr" id="tr" hidden>${esc(it.tr)}</p>` : ""}
      ${it.o ? `<div class="opts">${order[i].map((k, n) => `<button class="opt" type="button" data-k="${k}"><span class="k">${ABC[n]}</span>${esc(it.o[k])}</button>`).join("")}</div>`
             : `<input class="text-in" id="fill" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Digite aqui" aria-label="Resposta">`}
      <div class="dock" id="dock"><div class="dock-in"><button class="btn block" id="check" type="button" disabled>Verificar</button></div></div>`;
    $("#quit").onclick = () => { document.body.classList.remove("focus"); onExit(); };
    if (it.say) { $("#say").onclick = (e) => say(it.say, "f", { btn: e.currentTarget, rate: 0.9 }); setTimeout(() => say(it.say, "f", { btn: $("#say") }), 250); }
    if (it.tr) $("#trb").onclick = () => { $("#tr").hidden = !$("#tr").hidden; };
    let sel = null;
    if (it.o) $$(".opt", v).forEach((b) => (b.onclick = () => { $$(".opt", v).forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); sel = +b.dataset.k; $("#check").disabled = false; }));
    else { const inp = $("#fill"); inp.oninput = () => ($("#check").disabled = !inp.value.trim()); inp.onkeydown = (e) => { if (e.key === "Enter" && inp.value.trim()) $("#check").click(); }; setTimeout(() => inp.focus(), 50); }
    $("#check").onclick = () => {
      let good, note = it.x || "";
      if (it.o) {
        good = sel === it.a;
        $$(".opt", v).forEach((b) => { b.disabled = true; const k = +b.dataset.k; if (k === it.a) b.classList.add("right"); else if (k === sel) b.classList.add("wrong"); });
      } else {
        const val = norm($("#fill").value);
        const exact = it.f.some((f) => norm(f) === val), loose = it.f.some((f) => strip(f) === strip(val));
        good = exact || loose; $("#fill").disabled = true;
        if (!exact && loose) note = "Atenção ao acento: " + it.f[0] + ". " + note;
        if (!good) note = "Resposta: " + it.f[0] + ". " + note;
      }
      if (good) right++;
      const full = fullSentence(it);
      const dock = $("#dock"); dock.className = "dock " + (good ? "ok" : "ko");
      dock.innerHTML = `<div class="dock-in"><h3>${good ? I("check") + "Giusto!" : I("x") + "Quasi!"}</h3><p>${esc(note)}</p>
        <div class="row">${full ? playBtn('id="hear"', "Ouvir a frase") : ""}</div>
        <button class="btn block ${good ? "" : "red"}" id="next" type="button">Continuar</button></div>`;
      if (full) { $("#hear").onclick = (e) => say(full, "f", { btn: e.currentTarget }); say(full, "f", { btn: $("#hear") }); }
      $("#next").onclick = () => { i++; if (i < items.length) { show(); window.scrollTo(0, 0); } else { document.body.classList.remove("focus"); onDone(right / items.length); } };
      $("#next").focus();
    };
  }
  show();
}
function doneScreen(v, score, xp, { title, again, next, nextLabel }) {
  const ok = score >= 0.8;
  v.innerHTML = `<div class="done-hero"><div class="stamp ${ok ? "ok" : ""}"><div><b>${pct(score)}</b><span>${ok ? "Bravo!" : "Riprova"}</span></div></div>
    <h2>${ok ? "Ottimo lavoro!" : "Quase lá!"}</h2><p class="muted">${esc(title)}</p><span class="pill-tag ok">${I("star")} +${xp} XP</span>
    <p class="note">${ok ? "Você pode seguir para a próxima unidade." : "Acerte 80% ou mais para concluir. Revise a explicação e tente de novo."}</p></div>
    <div class="stack">${next ? `<a class="btn block" href="${next}">${nextLabel || "Continuar"} ${I("arrow")}</a>` : ""}<button class="btn ghost block" id="again" type="button">Refazer</button><a class="btn ghost block" href="#inicio">Voltar ao início</a></div>`;
  $("#again").onclick = again;
}

/* ============================== TELAS ============================== */
let timerId = null;
const VIEWS = {
 inicio(v) {
  if (!S.level) return welcome(v);
  const nu = nextUnit(), st = stage(), due = dueCards().length, sk = skills();
  const h = new Date().getHours(), hi = h < 13 ? "Buongiorno!" : h < 18 ? "Buon pomeriggio!" : "Buonasera!";
  const view = window._pathLv || st;
  const list = UNITS.filter((u) => u.lv === view);
  v.innerHTML = `
  <section class="hero"><div class="stack"><span class="eyebrow">${S.streak > 1 ? S.streak + " dias seguidos" : "Seu italiano de hoje"}</span><h1>${hi}</h1>
    <p class="muted">${todayXP() >= GOAL ? "Meta do dia cumprida. Bravissimo!" : `Faltam ${GOAL - todayXP()} XP para a meta de hoje.`}</p></div>${ring(todayXP(), GOAL)}</section>
  ${authEnabled && !currentUser() ? `<a class="card" href="#conta" style="text-decoration:none;color:inherit;grid-template-columns:auto 1fr;align-items:center"><span class="avatar big" style="background:var(--rosso)">${I("user")}</span><div><b>Crie sua conta grátis</b><p class="small muted">Salve o progresso e continue em qualquer celular ou computador.</p></div></a>` : ""}
  <a class="cta" href="#lezione--${nu.id}"><span class="eyebrow">Continuar · ${nu.lv} ${LV[nu.lv].n}</span><h2>${esc(nu.t)}</h2><div class="bar"><i style="width:${pct(best(nu.id))}"></i></div><span class="go">${I("play")} Começar lição</span></a>
  <div class="section-title"><h2>Il tuo percorso</h2><span class="small muted">${pct(lvProgress(view))}</span></div>
  <div class="seg" role="group" aria-label="Etapa">${["A1", "A2", "B1"].map((l) => `<button type="button" data-lv="${l}" aria-pressed="${l === view}">${l} · ${LV[l].n}</button>`).join("")}</div>
  <div class="path">${list.map((u) => { const b = best(u.id), cls = b >= 0.8 ? "done" : u === nu ? "now" : ""; return `<a class="node ${cls}" href="#lezione--${u.id}"><span class="dot">${b >= 0.8 ? I("check") : u === nu ? I("play") : UNITS.indexOf(u) + 1}</span><div><b>${esc(u.t)}</b><span>${u.extra ? "Extra · não cai na prova" : b ? "Melhor: " + pct(b) : "6 exercícios"}</span></div></a>`; }).join("")}</div>
  <div class="section-title"><h2>Pratica</h2></div>
  <div class="tiles">
    <a class="tile" href="#vocaboli"><span class="ic">${I("cards")}</span><b>Vocabulário</b><span>${due} para revisar</span></a>
    <a class="tile r" href="#pronuncia"><span class="ic">${I("mic")}</span><b>Pronúncia</b><span>Ouça e repita</span></a>
    <a class="tile" href="#ascolto"><span class="ic">${I("head")}</span><b>Escuta</b><span>Diálogos reais</span></a>
  </div>
  <section class="card"><div class="row"><h3 style="flex:1">Preparo para a prova</h3><a class="btn sm" href="#simulado">Simulado</a></div>
    <div class="skills">${Object.entries(sk).map(([k, x]) => `<div class="skill"><span>${k}</span><div class="bar"><i style="width:${pct(x)}"></i></div><span class="n">${pct(x)}</span></div>`).join("")}</div>
    <p class="note">A prova tem 4 partes e é preciso passar em todas. Treine as quatro.</p>
    <button class="small muted" id="relevel" type="button" style="justify-self:start;text-decoration:underline">Mudar nível inicial</button></section>`;
  $$(".seg button", v).forEach((b) => (b.onclick = () => { window._pathLv = b.dataset.lv; route(); }));
  $("#relevel").onclick = () => { S.level = null; window._pathLv = null; save(); route(); };
 },

 lezioni(v) {
  v.innerHTML = `<div class="stack"><span class="eyebrow">Grammatica</span><h1>Lições</h1><p class="muted">${UNITS.length} unidades do zero ao B1. Cada uma tem explicação em português, áudio e 6 exercícios.</p></div>
  ${["A1", "A2", "B1"].map((lv) => `<section class="card"><div class="row"><h3 style="flex:1">${lv} · ${LV[lv].n}</h3><span class="pill-tag">${pct(lvProgress(lv))}</span></div><p class="small muted">${LV[lv].d}</p>
    <div class="path">${UNITS.filter((u) => u.lv === lv).map((u) => { const b = best(u.id); return `<a class="node ${b >= 0.8 ? "done" : u === nextUnit() ? "now" : ""}" href="#lezione--${u.id}" style="margin-left:0"><span class="dot">${b >= 0.8 ? I("check") : UNITS.indexOf(u) + 1}</span><div><b>${esc(u.t)}</b><span>${u.extra ? "Extra · não cai no B1 Cittadinanza" : b ? "Melhor: " + pct(b) : "Não iniciada"}</span></div></a>`; }).join("")}</div></section>`).join("")}`;
 },

 lezione(v, id) {
  const u = UNITS.find((x) => x.id === id); if (!u) return (location.hash = "#lezioni");
  const idx = UNITS.indexOf(u), nx = UNITS[idx + 1];
  v.innerHTML = `${back("#lezioni", "Lições")}<div class="stack"><span class="eyebrow">Unità ${idx + 1} · ${u.lv} ${LV[u.lv].n}</span><h1>${esc(u.t)}</h1>
    ${u.extra ? `<p class="banner">Este tema não faz parte do programa oficial do B1 Cittadinanza. Ele ajuda a entender textos, mas não é cobrado na prova.</p>` : ""}</div>
    <section class="card"><div class="prose">${u.e}</div><p class="note">Toque nas palavras em verde para ouvir a pronúncia.</p></section>
    <div class="dock"><div class="dock-in"><button class="btn block" id="go" type="button">Começar exercícios ${I("arrow")}</button></div></div>`;
  document.body.classList.add("focus");
  $$(".table-wrap", v); $$(".prose table", v).forEach((t) => { const w = document.createElement("div"); w.className = "table-wrap"; t.replaceWith(w); w.appendChild(t); });
  $("#go").onclick = () => { window.scrollTo(0, 0); stepQuiz(v, u.q, { title: u.t, onExit: () => route(), onDone: (sc) => {
    const L = S.lessons[u.id] || {}; L.best = Math.max(L.best || 0, sc); S.lessons[u.id] = L; const xp = 5 + Math.round(sc * 15); touch(xp);
    doneScreen(v, sc, xp, { title: u.t, again: () => route(), next: nx && sc >= 0.8 ? "#lezione--" + nx.id : null, nextLabel: "Próxima unidade" });
  } }); };
 },

 pratica(v) {
  const due = dueCards().length;
  const tiles = [["vocaboli", "cards", "Vocabulário", `${due} cartões para hoje`, ""], ["pronuncia", "mic", "Pronúncia", "Ouça, repita e grave", "r"], ["ascolto", "head", "Escuta", `${AUDIOS.length} áudios`, ""], ["lettura", "open", "Leitura", `${READINGS.length} textos`, ""], ["scrittura", "pen", "Escrita", "Temas da prova", "r"], ["parlato", "chat", "Fala", "Conversa com cronômetro", ""]];
  v.innerHTML = `<div class="stack"><span class="eyebrow">Pratica</span><h1>Praticar</h1><p class="muted">Treine cada habilidade da prova separadamente.</p></div>
  <div class="tiles">${tiles.map(([h, ic, t, d, c]) => `<a class="tile ${c}" href="#${h}"><span class="ic">${I(ic)}</span><b>${t}</b><span>${d}</span></a>`).join("")}</div>
  <section class="card"><h3>Usar sem internet</h3><p class="small muted">As lições já funcionam offline. Baixe também os áudios (cerca de 8 MB) para ouvir sem conexão. Melhor fazer isso no Wi-Fi.</p>
    <div class="row"><button class="btn sm" id="dl" type="button">Baixar áudios</button><span class="small muted" id="dlp"></span></div></section>`;
  $("#dl").onclick = async () => {
    const b = $("#dl"), p = $("#dlp"); b.disabled = true;
    try {
      const m = manifest && Object.keys(manifest).length ? manifest : await (await fetch("./audio/manifest.json")).json();
      const files = [...new Set(Object.values(m))]; let n = 0;
      for (let k = 0; k < files.length; k += 6) {
        await Promise.all(files.slice(k, k + 6).map((f) => fetch("./audio/" + f).catch(() => {})));
        n = Math.min(files.length, k + 6); p.textContent = `${n} de ${files.length}`;
      }
      p.textContent = "Pronto: áudios salvos neste aparelho."; S.audioOffline = true; save();
    } catch (e) { p.textContent = "Não consegui baixar agora. Tente de novo no Wi-Fi."; b.disabled = false; }
  };
 },

 vocaboli(v) {
  const on = activeDecks(), pool = ALLCARDS.filter((c) => on.includes(c.deck));
  const due = shuffle(dueCards()).slice(0, 15);
  const boxes = [0, 1, 2, 3, 4, 5, 6].map((b) => pool.filter((c) => ((S.cards[c.id] || {}).box || 0) === b).length);
  v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Lessico</span><h1>Vocabulário</h1>
    <p class="muted">Ouça a palavra, tente lembrar o significado e toque no cartão. Se acertar, ele volta daqui a alguns dias. Se errar, volta hoje.</p></div>
    <section id="study" class="stack"></section>
    <section class="card"><span class="eyebrow">Temas ativos</span><div class="chips">${DECKS.map((d) => `<button class="tog" type="button" data-deck="${d.id}" aria-pressed="${on.includes(d.id)}">${esc(d.t)} · ${d.lv}</button>`).join("")}</div>
    <span class="eyebrow">Cartões por caixa de revisão</span><div class="boxes">${boxes.map((n, i) => `<span>C${i}<br>${n}</span>`).join("")}</div></section>`;
  $$("[data-deck]", v).forEach((b) => (b.onclick = () => { let a = activeDecks().slice(); const id = b.dataset.deck; a = a.includes(id) ? a.filter((x) => x !== id) : a.concat(id); if (!a.length) return; S.decks = a; save(); route(); }));
  const st = $("#study"); let i = 0, ok = 0;
  function show() {
    if (!due.length) { st.innerHTML = `<section class="card"><h3>Nenhum cartão para hoje.</h3><p class="muted">Volte amanhã ou ative mais temas acima.</p></section>`; return; }
    if (i >= due.length) { touch(ok * 2); st.innerHTML = `<section class="card"><h3>Sessão concluída: ${ok} de ${due.length}</h3><span class="pill-tag ok">${I("star")} +${ok * 2} XP</span><button class="btn" id="more" type="button">Nova sessão</button></section>`; $("#more").onclick = () => route(); return; }
    const c = due[i]; let flipped = false;
    st.innerHTML = `<div class="row"><span class="small muted" style="flex:1">Cartão ${i + 1} de ${due.length}</span>${playBtn('id="say"')}${playBtn('id="slow"', "0,7×", "slow")}</div>
      <div class="flash" id="card" role="button" tabindex="0" aria-label="Virar cartão"><div class="stack" style="justify-items:center"><div class="word">${esc(c.it)}</div>${c.pr ? `<div class="pron">${esc(c.pr)}</div>` : ""}<p class="muted" id="back">Toque para ver a tradução</p></div></div>
      <div class="row" id="grade" hidden><button class="btn red" id="no" type="button" style="flex:1">Não sabia</button><button class="btn" id="yes" type="button" style="flex:1">Sabia</button></div>`;
    const flip = () => { if (flipped) return; flipped = true; $("#back").outerHTML = `<b style="font-size:1.25rem">${esc(c.pt)}</b>`; $("#grade").hidden = false; };
    $("#card").onclick = flip; $("#card").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
    $("#say").onclick = (e) => say(c.it, "f", { btn: e.currentTarget }); $("#slow").onclick = (e) => say(c.it, "f", { btn: e.currentTarget, rate: 0.7 });
    setTimeout(() => say(c.it, "f", { btn: $("#say") }), 200);
    const grade = (good) => { const k = S.cards[c.id] || { box: 0 }; k.box = good ? Math.min(6, (k.box || 0) + 1) : 0; k.due = dayNum(today()) + (good ? INTERVALS[k.box] : 0); S.cards[c.id] = k; if (good) ok++; else due.push(c); save(); i++; show(); };
    $("#yes").onclick = () => grade(true); $("#no").onclick = () => grade(false);
  }
  show();
 },

 pronuncia(v) {
  const lv = window._pronLv || (stage() === "A1" ? "A1" : stage());
  v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Pronuncia</span><h1>Pronúncia</h1>
    <p class="muted">Ouça a voz italiana, leia a pronúncia figurada e repita em voz alta. ${SR ? "Toque em <b>Falar</b>: o app escuta você e mostra as palavras que entendeu." : "Grave sua voz e compare com o modelo."}</p></div>
    <section class="card"><h3>Como ler a pronúncia figurada</h3><p class="small"><span class="pron">buon-DJOR-no</span>: a sílaba em <b>MAIÚSCULAS</b> é a forte. <b>É, Ó</b> = vogal aberta (como em "café", "avó"). <b>Ê, Ô</b> = vogal fechada (como em "você", "avô").</p>
      <p class="small muted">As regras de leitura estão na unidade <a href="#lezione--pron">Pronúncia: ler como se escreve</a>.</p></section>
    <section class="card"><h3>Consoantes dobradas</h3><p class="small muted">Em italiano, a consoante dupla é mais longa e muda o sentido. Toque para comparar.</p>
      <div class="stack">${PAIRS.map((p) => `<div class="pair"><button type="button" data-say="${esc(p[0])}"><b>${esc(p[0])}</b><span>${esc(p[1])}</span></button><button type="button" data-say="${esc(p[2])}"><b>${esc(p[2])}</b><span>${esc(p[3])}</span></button></div>`).join("")}</div></section>
    <div class="seg" role="group" aria-label="Nível">${["A1", "A2", "B1"].map((l) => `<button type="button" data-lv="${l}" aria-pressed="${l === lv}">${l}</button>`).join("")}</div>
    <section class="card">${PHRASES.filter((p) => p.lv === lv).map((p, n) => `<div class="phrase" data-i="${PHRASES.indexOf(p)}">
      <p class="it">${esc(p.it)}</p><p class="pron">${esc(p.pr)}</p><p class="small muted">${esc(p.pt)}</p>
      <div class="row">${playBtn('data-act="play"')}${playBtn('data-act="slow"', "0,7×", "slow")}${SR ? `<button class="play mic" type="button" data-act="listen">${I("mic")}Falar</button>` : ""}${canRec ? `<button class="play mic" type="button" data-act="rec">${I("mic")}Gravar</button>` : ""}${S.pron[PHRASES.indexOf(p)] ? `<span class="pill-tag ok">${pct(S.pron[PHRASES.indexOf(p)])}</span>` : ""}</div>
      <div data-out></div></div>`).join("")}</section>`;
  $$("[data-say]", v).forEach((b) => (b.onclick = () => say(b.dataset.say, "f", { btn: b })));
  $$(".seg button", v).forEach((b) => (b.onclick = () => { window._pronLv = b.dataset.lv; route(); }));
  $$(".phrase", v).forEach((row) => {
    const p = PHRASES[+row.dataset.i], out = $("[data-out]", row), idx = +row.dataset.i;
    row.onclick = async (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const act = b.dataset.act;
      if (act === "play") say(p.it, "f", { btn: b });
      if (act === "slow") say(p.it, "f", { btn: b, rate: 0.7 });
      if (act === "rec") toggleRecord(b, out);
      if (act === "listen") {
        stopAudio(); b.classList.add("rec"); out.innerHTML = `<p class="small muted">Pode falar…</p>`;
        try {
          const r = await listen(p.it); b.classList.remove("rec");
          if (!r) { out.innerHTML = `<p class="small muted">Não ouvi nada. Toque em Falar e diga a frase.</p>`; return; }
          const first = !S.pron[idx]; S.pron[idx] = Math.max(S.pron[idx] || 0, r.score); touch(first ? 5 : 1);
          out.innerHTML = `<div class="heard"><p>${r.tw.map((w, k) => `<span class="${r.marks[k] ? "w-ok" : "w-ko"}">${esc(w)}</span>`).join(" ")}</p><p class="small muted">Entendi: “${esc(r.heard)}” · ${pct(r.score)} das palavras</p></div>`;
        } catch (err) { b.classList.remove("rec"); out.innerHTML = `<p class="banner">Não consegui usar o reconhecimento de voz. Permita o microfone ou use Gravar.</p>`; }
      }
    };
  });
 },

 ascolto(v, arg) {
  const a = AUDIOS.find((x) => x.id === arg);
  if (!a) {
    v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Ascolto</span><h1>Escuta</h1><p class="muted">Ouça sem ler e depois responda. Na prova, cada áudio toca duas vezes.</p></div>
    ${["A1", "B1"].map((lv) => `<section class="card"><h3>${lv} · ${LV[lv].n}</h3>${AUDIOS.filter((x) => x.lv === lv).map((x) => `<a class="link-row" href="#ascolto--${x.id}">${I("head")}<div><b>${esc(x.t)}</b><br><span class="small muted">${x.lvl}</span></div>${S.audio[x.id] != null ? `<span class="pill-tag ${S.audio[x.id] >= 0.67 ? "ok" : ""}">${pct(S.audio[x.id])}</span>` : ""}</a>`).join("")}</section>`).join("")}
    <a class="tile" href="#simulado"><span class="ic">${I("clip")}</span><b>Escuta no formato da prova</b><span>Nos simulados: 6 diálogos e 2 textos com vero/falso</span></a>`;
    return;
  }
  v.innerHTML = `${back("#ascolto", "Escuta")}<div class="stack"><span class="eyebrow">${a.lv} · ${a.lvl}</span><h1>${esc(a.t)}</h1></div>
   <section class="card"><div class="row">${playBtn('id="play"', "Ouvir", "big")}${playBtn('id="slow"', "Devagar", "slow")}</div>
   <div class="row"><button class="play slow" type="button" id="showtx">Mostrar texto</button>${a.pt ? '<button class="play slow" type="button" id="showpt">Mostrar tradução</button>' : ""}</div>
   <div class="transcript" id="tx" hidden>${esc(a.tx)}</div>${a.pt ? `<div class="transcript tr" id="pt" hidden>${esc(a.pt)}</div>` : ""}</section>
   <div class="row"><button class="btn block" id="go" type="button">Responder ${a.q.length} perguntas ${I("arrow")}</button></div>`;
  const rate = a.lv === "A1" ? 0.9 : 1;
  $("#play").onclick = (e) => sayDialog(a.id, a.tx, { btn: e.currentTarget, rate });
  $("#slow").onclick = (e) => sayDialog(a.id, a.tx, { btn: e.currentTarget, rate: 0.75 });
  $("#showtx").onclick = () => ($("#tx").hidden = !$("#tx").hidden);
  if (a.pt) $("#showpt").onclick = () => ($("#pt").hidden = !$("#pt").hidden);
  $("#go").onclick = () => { stopAudio(); stepQuiz(v, a.q, { title: a.t, onExit: () => route(), onDone: (sc) => { S.audio[a.id] = Math.max(S.audio[a.id] || 0, sc); const xp = Math.round(sc * 15); touch(xp); doneScreen(v, sc, xp, { title: a.t, again: () => route(), next: "#ascolto", nextLabel: "Outro áudio" }); } }); };
 },

 lettura(v, arg) {
  const t = READINGS.find((x) => x.id === arg);
  if (!t) {
    v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Lettura</span><h1>Leitura</h1><p class="muted">Avisos, e-mails e textos sobre a Itália. Procure no texto a prova de cada resposta.</p></div>
    <section class="card">${READINGS.map((x) => `<a class="link-row" href="#lettura--${x.id}">${I("open")}<div><b>${esc(x.t)}</b><br><span class="small muted">${x.lv}</span></div>${S.reading[x.id] != null ? `<span class="pill-tag ${S.reading[x.id] >= 0.67 ? "ok" : ""}">${pct(S.reading[x.id])}</span>` : ""}</a>`).join("")}</section>`;
    return;
  }
  v.innerHTML = `${back("#lettura", "Leitura")}<div class="stack"><span class="eyebrow">${t.lv}</span><h1>${esc(t.t)}</h1></div>
  <section class="card"><div class="reading">${esc(t.tx)}</div><div class="row">${playBtn('id="say"', "Ouvir o texto")}${t.pt ? '<button class="play slow" type="button" id="showpt">Mostrar tradução</button>' : ""}</div>${t.pt ? `<div class="transcript tr" id="pt" hidden>${esc(t.pt)}</div>` : ""}</section>
  <button class="btn block" id="go" type="button">Responder ${t.q.length} perguntas ${I("arrow")}</button>`;
  $("#say").onclick = (e) => say(t.tx.replace(/\n+/g, " "), "f", { btn: e.currentTarget });
  if (t.pt) $("#showpt").onclick = () => ($("#pt").hidden = !$("#pt").hidden);
  $("#go").onclick = () => { stopAudio(); stepQuiz(v, t.q.map((q) => ({ ...q, s: q.s })), { title: t.t, onExit: () => route(), onDone: (sc) => { S.reading[t.id] = Math.max(S.reading[t.id] || 0, sc); const xp = Math.round(sc * 15); touch(xp); doneScreen(v, sc, xp, { title: t.t, again: () => route(), next: "#lettura", nextLabel: "Outro texto" }); } }); };
 },

 scrittura(v, arg) {
  const w = WRITINGS.find((x) => x.id === arg);
  if (!w) {
    v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Produzione scritta</span><h1>Escrita</h1><p class="muted">Na prova você escolhe 1 de 2 temas e escreve de 80 a 120 palavras em 40 minutos. Depois de escrever, avalie seu texto com os critérios oficiais.</p></div>
    <section class="card">${WRITINGS.map((x) => `<a class="link-row" href="#scrittura--${x.id}">${I("pen")}<div><b>${esc(x.t)}</b><br><span class="small muted">${x.min}–${x.max} palavras</span></div>${S.writing[x.id] != null ? `<span class="pill-tag ${S.writing[x.id] >= 7 ? "ok" : ""}">${fmt(S.writing[x.id])}/12</span>` : ""}</a>`).join("")}</section>`;
    return;
  }
  let draft = ""; try { draft = localStorage.getItem(KEY + "-draft-" + w.id) || ""; } catch (e) {}
  v.innerHTML = `${back("#scrittura", "Escrita")}<div class="stack"><span class="eyebrow">${w.min}–${w.max} palavras</span><h1>${esc(w.t)}</h1></div>
   <section class="card"><p class="reading">${esc(w.p)}</p><ul class="clean small muted">${w.tips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>
   <textarea class="text-in" id="txt-${w.id}" spellcheck="false" aria-label="Seu texto" placeholder="Scrivi qui…">${esc(draft)}</textarea>
   <div class="row"><span class="pill-tag" id="wc">0 palavras</span></div>
   <section class="card" id="self"></section>`;
  const ta = $("#txt-" + w.id), wc = $("#wc");
  const count = () => { const n = (ta.value.match(/[A-Za-zÀ-ÿ']+/g) || []).length; wc.textContent = n + " palavras"; wc.className = "pill-tag " + (n >= w.min && n <= w.max + 10 ? "ok" : ""); try { localStorage.setItem(KEY + "-draft-" + w.id, ta.value); } catch (e) {} return n; };
  ta.oninput = count; count();
  selfAssess($("#self"), SCORING.scritta, "Avalie seu texto (critérios oficiais)", (pts) => { S.writing[w.id] = Math.max(S.writing[w.id] || 0, pts); touch(10); });
 },

 parlato(v) {
  v.innerHTML = `${back("#pratica", "Praticar")}<div class="stack"><span class="eyebrow">Produzione orale</span><h1>Fala</h1>
  <p class="muted">A prova oral tem uma apresentação pessoal (cerca de 1 minuto) e uma conversa de 2 a 3 minutos sobre um tema. Fale em voz alta, grave e depois ouça o modelo.</p></div>
  ${SPEAK.map((s) => `<section class="card" data-s="${s.id}"><div class="row"><h3 style="flex:1">${esc(s.t)}</h3>${S.speak[s.id] ? `<span class="pill-tag ok">${I("check")} Praticado</span>` : ""}</div><p>${esc(s.p)}</p>
    <div class="row"><button class="play" type="button" data-act="timer">${I("clock")}2 min</button><span class="timer" data-t>2:00</span>${canRec ? `<button class="play mic" type="button" data-act="rec">${I("mic")}Gravar</button>` : ""}</div><div data-out></div>
    <button class="play slow" type="button" data-act="model">Ver resposta modelo</button>
    <div data-m hidden class="stack"><div class="transcript">${esc(s.m)}</div><div class="row">${playBtn('data-act="say"', "Ouvir modelo")}<button class="btn sm" type="button" data-act="done">Marcar como praticado</button></div></div></section>`).join("")}`;
  let tick = null;
  $$("[data-s]", v).forEach((sec) => {
    const s = SPEAK.find((x) => x.id === sec.dataset.s);
    sec.onclick = (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return; const act = b.dataset.act;
      if (act === "timer") { clearInterval(tick); let left = 120; const t = $("[data-t]", sec); tick = setInterval(() => { left--; t.textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0"); if (left <= 0) { clearInterval(tick); t.textContent = "Fine!"; } }, 1000); timerId = tick; }
      if (act === "rec") toggleRecord(b, $("[data-out]", sec));
      if (act === "model") $("[data-m]", sec).hidden = !$("[data-m]", sec).hidden;
      if (act === "say") say(s.m, "f", { btn: b });
      if (act === "done") { if (!S.speak[s.id]) { S.speak[s.id] = 1; touch(10); } b.textContent = "Praticado"; b.disabled = true; }
    };
  });
 },

 simulado(v) {
  const hist = S.exams.filter((x) => x.pts).slice(-5).reverse();
  v.innerHTML = `<div class="stack"><span class="eyebrow">Prova simulata</span><h1>Simulados</h1>
  <p class="muted">No formato oficial do <b>CILS B1 Cittadinanza</b>, com as mesmas partes, tipos de questão, tempos e pontuação da prova-modelo da Università per Stranieri di Siena.</p></div>
  <section class="card"><h3>Como é a prova</h3><div class="parts">
    <div class="part"><b>Escuta · 30 min</b><span class="pts">12 pts</span><span>6 diálogos curtos (A/B/C) e 2 textos com 12 afirmações vero/falso</span></div>
    <div class="part"><b>Leitura e gramática · 40 min</b><span class="pts">12 pts</span><span>1 texto com 12 vero/falso e 1 texto para completar (6 lacunas)</span></div>
    <div class="part"><b>Escrita · 40 min</b><span class="pts">12 pts</span><span>1 tema à escolha entre 2, de 80 a 120 palavras</span></div>
    <div class="part"><b>Fala · cerca de 5 min</b><span class="pts">12 pts</span><span>Apresentação pessoal e conversa sobre 1 tema</span></div></div>
    <p class="note">Se você não passar em uma das partes, refaz a prova inteira: no B1 Cittadinanza não dá para aproveitar a nota das partes aprovadas.</p></section>
  ${EXAMS.map((e) => `<a class="cta" href="#esame--${e.id}" style="background:${e.id === "sim1" ? "var(--verde)" : "var(--rosso)"};box-shadow:0 4px 0 ${e.id === "sim1" ? "var(--verde-ink)" : "var(--rosso-ink)"}"><span class="eyebrow">Prova completa · cerca de 2 horas</span><h2>${e.t}</h2><span class="go">${I("play")} Começar</span></a>`).join("")}
  <a class="tile" href="#ufficiale"><span class="ic">${I("flag")}</span><b>Prova oficial da CILS</b><span>Abra o caderno e o áudio oficiais e corrija aqui com o gabarito oficial</span></a>
  ${hist.length ? `<section class="card"><h3>Últimos resultados</h3>${hist.map((x) => `<div class="score-row"><span>${esc(x.date)} · ${esc(x.t || "")}</span><span class="small">E ${fmt(x.pts.a)} · L ${fmt(x.pts.l)} · S ${fmt(x.pts.w)} · O ${fmt(x.pts.o)}</span></div>`).join("")}</section>` : ""}`;
 },

 esame(v, id) {
  const e = EXAMS.find((x) => x.id === id); if (!e) return (location.hash = "#simulado");
  runExam(v, e);
 },

 ufficiale(v) {
  const k = OFFICIAL.key;
  const sel = (name, n, opts) => Array.from({ length: n }, (_, i) => `<label class="cell" data-c="${name}${i}"><b>${i + 1}</b><select id="${name}${i}"><option value="">–</option>${opts.map((o) => `<option>${o}</option>`).join("")}</select></label>`).join("");
  v.innerHTML = `${back("#simulado", "Simulados")}<div class="stack"><span class="eyebrow">Prova-modelo oficial</span><h1>Prova oficial da CILS</h1>
  <p class="muted">A Università per Stranieri di Siena publica uma prova completa de exemplo do B1 Cittadinanza. Abra o caderno e o áudio, faça a prova no papel e marque suas respostas aqui: o app corrige com o gabarito oficial.</p></div>
  <section class="card"><h3>Materiais oficiais</h3>${OFFICIAL.files.map(([t, f]) => `<a class="link-row" href="${OFFICIAL.base + encodeURIComponent(f)}" target="_blank" rel="noopener">${I(f.endsWith(".mp3") ? "head" : "open")}<span>${t}</span>${I("ext")}</a>`).join("")}
    <a class="link-row" href="${OFFICIAL.page}" target="_blank" rel="noopener">${I("flag")}<span>Página oficial do B1 Cittadinanza</span>${I("ext")}</a></section>
  <section class="card"><h3>Folha de respostas</h3>
    <p class="eyebrow">Escuta · prova 1</p><div class="sheet-grid">${sel("a1", 6, ["A", "B", "C"])}</div>
    <p class="eyebrow">Escuta · prova 2</p><div class="sheet-grid">${sel("a2", 12, ["V", "F"])}</div>
    <p class="eyebrow">Leitura · prova 1</p><div class="sheet-grid">${sel("l1", 12, ["V", "F"])}</div>
    <p class="eyebrow">Leitura · prova 2</p><div class="sheet-grid">${sel("l2", 6, ["A", "B", "C"])}</div>
    <button class="btn" id="grade" type="button">Corrigir</button><div id="res"></div></section>`;
  $("#grade").onclick = () => {
    let a = 0, l = 0;
    for (const [name, w] of [["a1", 1], ["a2", 0.5], ["l1", 0.5], ["l2", 1]]) [...k[name]].forEach((ans, i) => {
      const val = $("#" + name + i).value, cell = $(`[data-c="${name}${i}"]`); const good = val === ans;
      cell.classList.toggle("ok", good); cell.classList.toggle("ko", !good);
      if (good) { if (name[0] === "a") a += w; else l += w; }
    });
    $("#res").innerHTML = `<div class="score-row"><span>Escuta</span><b>${fmt(a)} / 12</b></div><div class="score-row"><span>Leitura e gramática</span><b>${fmt(l)} / 12</b></div><p class="note">As células vermelhas são as erradas. Confira a resposta certa no gabarito oficial acima.</p>`;
    touch(10);
  };
 },

 prova(v) {
  v.innerHTML = `<div class="stack"><span class="eyebrow">Informazioni</span><h1>A prova B1 para a cidadania</h1></div>
  <section class="card"><div class="prose">
   <p>Desde dezembro de 2018 (lei 132/2018), quem pede a cidadania italiana <b>por casamento</b> ou <b>por residência</b> precisa comprovar italiano no nível <b>B1</b>. Quem pede por descendência (<i>iure sanguinis</i>) não precisa desse certificado. As regras mudaram em 2025, então confirme o seu caso no consulado ou na prefettura.</p>
   <h3>Certificados aceitos</h3>
   <div class="table-wrap"><table><tr><th>Certificado</th><th>Entidade</th></tr><tr><td>CILS</td><td>Università per Stranieri di Siena</td></tr><tr><td>CELI</td><td>Università per Stranieri di Perugia</td></tr><tr><td>PLIDA</td><td>Società Dante Alighieri</td></tr><tr><td>Cert.IT</td><td>Università Roma Tre</td></tr></table></div>
   <p>Os simulados deste app seguem o <b>CILS B1 Cittadinanza</b>. Na página oficial, a taxa informada é de 100 euros. Se você não passar em uma das partes, refaz a prova inteira na sessão seguinte.</p>
  </div></section>
  <section class="card"><h3>O que o programa oficial cobra</h3><div class="prose small">
   <p><b>Cai na prova:</b> artigos; adjetivos, comparativos e superlativos; pronomes pessoais, reflexivos e relativos; possessivos, demonstrativos e interrogativos; indefinidos (<i>ogni, ciascuno, nessuno, qualche</i>); preposições articuladas; presente, passato prossimo, imperfetto, infinito, imperativo e condizionale.</p>
   <p><b>Não cai:</b> congiuntivo e futuro. O app mantém essas duas unidades como extra, porque ajudam a entender textos.</p>
   <p>Os temas são da vida na Itália: repartições, saúde, escola, trabalho, casa, transporte e serviços públicos.</p>
  </div></section>
  <section class="card"><h3>Fontes oficiais</h3>
   <a class="link-row" href="${OFFICIAL.page}" target="_blank" rel="noopener">${I("flag")}<span>CILS B1 Cittadinanza · Università per Stranieri di Siena</span>${I("ext")}</a>
   <a class="link-row" href="${OFFICIAL.base + encodeURIComponent("B1 Cittadinanza_Sillabo.pdf")}" target="_blank" rel="noopener">${I("open")}<span>Programa oficial (sillabo)</span>${I("ext")}</a>
   <a class="link-row" href="https://www.unistrapg.it/it/certificazioni-linguistiche" target="_blank" rel="noopener">${I("flag")}<span>CELI · Università per Stranieri di Perugia</span>${I("ext")}</a>
   <a class="link-row" href="https://plida.it" target="_blank" rel="noopener">${I("flag")}<span>PLIDA · Società Dante Alighieri</span>${I("ext")}</a></section>
  <p class="note">Áudios gerados com vozes italianas neurais (Piper TTS, código aberto).</p>`;
 },
};

/* ============================== CONTA ============================== */
VIEWS.conta = function (v) {
  const me = currentUser();
  const head = `${back("#inicio", "Início")}<div class="stack"><span class="eyebrow">Il tuo account</span><h1>${me ? "Minha conta" : "Entrar"}</h1></div>`;
  if (!authEnabled) { v.innerHTML = head + `<section class="card"><p>O login ainda não foi ativado neste app. Seu progresso está salvo neste aparelho.</p></section>`; return; }
  const show = (t, ok) => { const m = $("#msg"); m.className = "banner" + (ok ? " ok" : ""); m.textContent = t; m.hidden = false; };
  if (inRecovery()) {
    v.innerHTML = head + `<form class="card" id="f"><h3>Crie uma nova senha</h3><label class="small" for="np">Nova senha (mínimo 8 caracteres)</label><input class="text-in" id="np" type="password" autocomplete="new-password" minlength="8" required><p class="banner" id="msg" hidden></p><button class="btn" type="submit">Salvar nova senha</button></form>`;
    $("#f").onsubmit = async (e) => {
      e.preventDefault();
      try { await setNewPassword($("#np").value); show("Senha alterada. Você já está conectado.", true); setTimeout(route, 1200); }
      catch (err) { show(err.message); }
    };
    return;
  }
  if (me) {
    const name = (me.user_metadata || {}).name || "", ls = lastSyncAt();
    v.innerHTML = head + `<section class="card"><div class="row"><span class="avatar big">${esc((name || me.email)[0].toUpperCase())}</span><div style="min-width:0"><b>${esc(name || "Estudante")}</b><p class="small muted" style="overflow-wrap:anywhere">${esc(me.email)}</p></div></div>
      <div class="score-row"><span>Progresso na nuvem</span><span class="pill-tag ${ls ? "ok" : ""}">${ls ? "Salvo às " + ls.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "Sincronizando…"}</span></div>
      <div class="row"><button class="btn sm ghost" id="sync" type="button">${I("sync")}Sincronizar agora</button><button class="btn sm red" id="out" type="button">Sair</button></div>
      <p class="note">Seu progresso é salvo sozinho enquanto você estuda. Entre com o mesmo e-mail em outro aparelho para continuar de onde parou.</p></section>`;
    $("#sync").onclick = async () => { $("#sync").disabled = true; await syncNow(); route(); };
    $("#out").onclick = async () => { $("#out").disabled = true; await signOut(); route(); };
    return;
  }
  const mode = window._authMode || "in";
  v.innerHTML = head + `<div class="seg" style="grid-template-columns:1fr 1fr" role="group" aria-label="Opção"><button type="button" data-m="in" aria-pressed="${mode !== "up"}">Entrar</button><button type="button" data-m="up" aria-pressed="${mode === "up"}">Criar conta</button></div>
   <form class="card" id="f" novalidate>
    ${mode === "reset" ? `<h3>Recuperar senha</h3><p class="small muted">Digite o e-mail da sua conta. Vamos enviar um link para você criar uma senha nova.</p>` : ""}
    ${mode === "up" ? `<label class="small" for="nm">Seu nome</label><input class="text-in" id="nm" type="text" autocomplete="given-name" required>` : ""}
    <label class="small" for="em">E-mail</label><input class="text-in" id="em" type="email" autocomplete="email" inputmode="email" required>
    ${mode !== "reset" ? `<label class="small" for="pw">Senha${mode === "up" ? " (mínimo 8 caracteres)" : ""}</label><input class="text-in" id="pw" type="password" autocomplete="${mode === "up" ? "new-password" : "current-password"}" minlength="8" required>` : ""}
    <p class="banner" id="msg" hidden></p>
    <button class="btn" type="submit" id="go">${mode === "up" ? "Criar conta" : mode === "reset" ? "Enviar link" : "Entrar"}</button>
    ${mode === "in" ? `<button class="small muted" type="button" id="forgot" style="justify-self:start;text-decoration:underline">Esqueci a senha</button>` : mode === "reset" ? `<button class="small muted" type="button" id="backin" style="justify-self:start;text-decoration:underline">Voltar para Entrar</button>` : ""}
   </form>
   <p class="note">Com a conta, o progresso fica salvo na nuvem e aparece em qualquer aparelho. O que você já fez neste celular é mantido e somado à conta.</p>`;
  $$("[data-m]", v).forEach((b) => (b.onclick = () => { window._authMode = b.dataset.m; route(); }));
  if ($("#forgot")) $("#forgot").onclick = () => { window._authMode = "reset"; route(); };
  if ($("#backin")) $("#backin").onclick = () => { window._authMode = "in"; route(); };
  $("#f").onsubmit = async (e) => {
    e.preventDefault();
    const go = $("#go"), em = $("#em").value.trim(), pw = $("#pw") ? $("#pw").value : "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return show("Digite um e-mail válido.");
    if (mode !== "reset" && pw.length < 8) return show("A senha precisa ter pelo menos 8 caracteres.");
    if (mode === "up" && !$("#nm").value.trim()) return show("Digite seu nome.");
    go.disabled = true;
    try {
      if (mode === "up") {
        const r = await signUp(em, pw, $("#nm").value.trim());
        if (r.needsConfirm) show("Conta criada. Enviamos um e-mail para " + em + ". Abra o link para confirmar e depois entre aqui.", true);
        else { window._authMode = null; location.hash = "#inicio"; }
      } else if (mode === "reset") {
        await sendReset(em); show("Se este e-mail tiver conta, você vai receber um link para criar uma senha nova.", true);
      } else { await signIn(em, pw); window._authMode = null; location.hash = "#inicio"; }
    } catch (err) { show(err.message); } finally { go.disabled = false; }
  };
};

/* ============================== BOAS-VINDAS ============================== */
function welcome(v) {
  v.innerHTML = `<div class="welcome"><div class="bigflag" aria-hidden="true"><i></i><i><b>B1</b></i><i></i></div>
  <div class="stack"><h1>Benvenuto in Cittadino!</h1><p class="muted">Vamos te levar do zero ao B1 para o exame de cidadania italiana. Por onde você quer começar?</p></div>
  <div class="stack">
   <button class="choice" data-lv="A1" type="button"><span class="eyebrow">Começar pelo A1</span><h3>Nunca estudei italiano</h3><span class="muted small">Começamos pela pronúncia e pelas primeiras frases.</span></button>
   <button class="choice" data-lv="A2" type="button"><span class="eyebrow">Começar pelo A2</span><h3>Sei o básico</h3><span class="muted small">Me apresento, conto até 100 e uso o presente.</span></button>
   <button class="choice" data-lv="B1" type="button"><span class="eyebrow">Começar pelo B1</span><h3>Já entendo textos simples</h3><span class="muted small">Quero focar no que cai na prova.</span></button>
  </div>
  <section class="card"><ul class="clean small"><li>Explicações em português e áudio com voz italiana em todas as frases.</li><li>Toque nas palavras em <span class="ex-it">verde</span> para ouvir.</li><li>Simulados no formato oficial da prova CILS B1 Cittadinanza.</li></ul></section></div>`;
  $$("[data-lv]", v).forEach((b) => (b.onclick = () => { S.level = b.dataset.lv; S.decks = null; save(); route(); }));
}

/* ============================== AUTOAVALIAÇÃO (critérios oficiais) ============================== */
function selfAssess(el, crit, title, onSave) {
  const sel = crit.map(() => null);
  el.innerHTML = `<h3>${title}</h3><p class="small muted">Releia seu texto e dê uma nota honesta em cada critério. O total vai até 12, como na prova.</p>
   ${crit.map(([t, max], i) => `<div class="crit"><span class="small">${esc(t)} <b>(até ${max})</b></span><div class="lv">${Array.from({ length: max + 1 }, (_, n) => `<button type="button" data-i="${i}" data-n="${n}" aria-pressed="false">${n}</button>`).join("")}</div></div>`).join("")}
   <div class="score-row"><span>Total</span><b id="tot">– / 12</b></div><button class="btn" id="saveself" type="button" disabled>Salvar nota</button>`;
  el.onclick = (e) => {
    const b = e.target.closest("[data-n]");
    if (b) { const i = +b.dataset.i; sel[i] = +b.dataset.n; $$(`[data-i="${i}"]`, el).forEach((x) => x.setAttribute("aria-pressed", x === b)); }
    const done = sel.every((x) => x !== null); const tot = sel.reduce((a, x) => a + (x || 0), 0);
    $("#tot", el).textContent = (done ? tot : "–") + " / 12"; $("#saveself", el).disabled = !done;
    if (e.target.id === "saveself" && done) { onSave(tot); e.target.textContent = "Nota salva"; e.target.disabled = true; }
  };
}

/* ============================== SIMULADO COMPLETO ============================== */
function runExam(v, e) {
  document.body.classList.add("focus");
  const A = { a1: [], a2: [[], []], l1: [], l2: [], w: { topic: null, text: "" }, wPts: null, oPts: null, plays: {} };
  const parts = [["Escuta", 30], ["Leitura e gramática", 40], ["Escrita", 40], ["Fala", 0]];
  let part = 0, left = 0;
  const bar = () => `<div class="exam-bar"><button class="icon-btn" id="quit" type="button" aria-label="Sair">${I("x")}</button><div class="steps">${parts.map((_, i) => `<i class="${i < part ? "done" : i === part ? "on" : ""}"></i>`).join("")}</div>${parts[part][1] ? `<span class="timer" id="clock">${I("clock")}${parts[part][1]}:00</span>` : ""}</div>`;
  function startClock() {
    clearInterval(timerId); left = parts[part][1] * 60; if (!left) return;
    timerId = setInterval(() => { left--; const c = $("#clock"); if (c) { c.innerHTML = I("clock") + Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0"); c.classList.toggle("low", left < 300); } if (left <= 0) { clearInterval(timerId); const b = $("#nextpart"); if (b) { alertBox("Tempo esgotado para esta parte."); b.click(); } } }, 1000);
  }
  const alertBox = (t) => { const d = document.createElement("p"); d.className = "banner"; d.textContent = t; v.prepend(d); };
  const mc = (name, idx, opts, correct) => `<div class="opts">${shuffle(opts.map((_, k) => k)).map((k, n) => `<button class="opt" type="button" data-g="${name}" data-i="${idx}" data-k="${k}"><span class="k">${ABC[n]}</span>${esc(opts[k])}</button>`).join("")}</div>`;
  const vf = (name, idx) => `<div class="vf"><button class="opt" type="button" data-g="${name}" data-i="${idx}" data-k="1">Vero</button><button class="opt" type="button" data-g="${name}" data-i="${idx}" data-k="0">Falso</button></div>`;
  const store = { a1: (i, k) => (A.a1[i] = k), "a2-0": (i, k) => (A.a2[0][i] = k), "a2-1": (i, k) => (A.a2[1][i] = k), l1: (i, k) => (A.l1[i] = k), l2: (i, k) => (A.l2[i] = k) };
  function wireChoices() {
    $$(".opt[data-g]", v).forEach((b) => (b.onclick = () => { $$(`.opt[data-g="${b.dataset.g}"][data-i="${b.dataset.i}"]`, v).forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); store[b.dataset.g](+b.dataset.i, +b.dataset.k); }));
  }
  const playLimited = (btn, id, fn) => { const n = (A.plays[id] = (A.plays[id] || 0) + 1); fn(); const r = 2 - n; btn.lastChild.textContent = r > 0 ? ` Ouvir (${r} restante)` : " Sem reproduções"; if (r <= 0) btn.disabled = true; };
  function render() {
    stopAudio(); window.scrollTo(0, 0);
    let html = bar();
    if (part === 0) {
      html += `<div class="stack"><span class="eyebrow">Parte 1 de 4</span><h2>Escuta</h2><p class="muted small">Cada áudio pode ser ouvido 2 vezes, como na prova. Prova 1: escolha a frase certa. Prova 2: diga se a informação está (vero) ou não está (falso) no texto.</p></div>
      <section class="card"><h3>Prova 1</h3>${e.a1.map((it, i) => `<div class="item"><div class="row"><b>${i + 1}.</b><button class="play" type="button" data-pa="${i}">${I("play")}<span> Ouvir (2 restantes)</span></button></div><p class="qstem" style="font-size:1.1rem">${esc(it.s)}…</p>${mc("a1", i, it.o)}</div>`).join("")}</section>
      ${e.a2.map((t, j) => `<section class="card"><h3>Prova 2 · Texto ${j + 1}</h3><div class="row"><button class="play big" type="button" data-pb="${j}">${I("play")}<span> Ouvir (2 restantes)</span></button></div>${t.q.map((q, i) => `<div class="item"><p>${j * 6 + i + 1}. ${esc(q[0])}</p>${vf("a2-" + j, i)}</div>`).join("")}</section>`).join("")}`;
    } else if (part === 1) {
      html += `<div class="stack"><span class="eyebrow">Parte 2 de 4</span><h2>Leitura e gramática</h2></div>
      <section class="card"><h3>Prova 1 · ${esc(e.l1.t)}</h3><div class="reading">${esc(e.l1.tx)}</div><p class="small muted">Diga se a informação está (vero) ou não está (falso) no texto.</p>${e.l1.q.map((q, i) => `<div class="item"><p>${i + 1}. ${esc(q[0])}</p>${vf("l1", i)}</div>`).join("")}</section>
      <section class="card"><h3>Prova 2 · ${esc(e.l2.t)}</h3><p class="small muted">Complete o texto escolhendo uma das opções. O exemplo (0) já está resolvido: <b>${esc(e.l2.ex[0])}</b>.</p><div class="reading">${esc(e.l2.tx)}</div>${e.l2.q.map((o, i) => `<div class="item"><p><b>(${i + 1})</b></p>${mc("l2", i, o)}</div>`).join("")}</section>`;
    } else if (part === 2) {
      html += `<div class="stack"><span class="eyebrow">Parte 3 de 4</span><h2>Escrita</h2><p class="muted small">Escolha um dos temas e escreva de 80 a 120 palavras.</p></div>
      ${e.w.map((w, i) => `<button class="choice" type="button" data-topic="${i}" style="${A.w.topic === i ? "border-color:var(--verde)" : ""}"><span class="eyebrow">Tema ${i + 1}</span><span>${esc(w.p)}</span></button>`).join("")}
      <textarea class="text-in" id="wtext" spellcheck="false" placeholder="Scegli un tema e scrivi qui…" aria-label="Seu texto">${esc(A.w.text)}</textarea><span class="pill-tag" id="wc">0 palavras</span>`;
    } else if (part === 3) {
      html += `<div class="stack"><span class="eyebrow">Parte 4 de 4</span><h2>Fala</h2><p class="muted small">Responda em voz alta, como se estivesse diante do examinador. Grave para ouvir depois.</p></div>
      <section class="card"><h3>Apresentação pessoal · cerca de 1 minuto</h3>${PRESENTAZIONE.map((q, i) => `<div class="row">${playBtn(`data-q="${i}"`, "")}<span>${esc(q)}</span></div>`).join("")}</section>
      <section class="card"><h3>Conversa · 2 a 3 minutos</h3><p class="small muted">Escolha um tema. O examinador faz a primeira pergunta e continua a conversa a partir das suas respostas.</p>${e.o.map((t, i) => `<div class="row">${playBtn(`data-o="${i}"`, "")}<span>${esc(t)}</span></div>`).join("")}
       ${canRec ? `<div class="row"><button class="play mic big" type="button" id="orec">${I("mic")}Gravar</button></div><div id="oout"></div>` : `<p class="note">Seu navegador não permite gravar. Fale em voz alta mesmo assim.</p>`}</section>`;
    }
    html += `<button class="btn block ${part === 3 ? "red" : ""}" id="nextpart" type="button">${part === 3 ? "Terminar e ver resultado" : "Próxima parte"} ${I("arrow")}</button>`;
    v.innerHTML = html;
    $("#quit").onclick = () => { clearInterval(timerId); location.hash = "#simulado"; };
    wireChoices();
    // restaura escolhas já feitas
    const restore = (g, arr) => arr.forEach((k, i) => { if (k == null) return; const b = $(`.opt[data-g="${g}"][data-i="${i}"][data-k="${k}"]`, v); if (b) b.classList.add("sel"); });
    restore("a1", A.a1); restore("a2-0", A.a2[0]); restore("a2-1", A.a2[1]); restore("l1", A.l1); restore("l2", A.l2);
    $$("[data-pa]", v).forEach((b) => (b.onclick = () => { if (b.disabled) return; const i = +b.dataset.pa; playLimited(b, "a" + i, () => sayDialog(`${e.id}-a1-${i}`, e.a1[i].d.join("\n"), { btn: b })); }));
    $$("[data-pb]", v).forEach((b) => (b.onclick = () => { if (b.disabled) return; const j = +b.dataset.pb; playLimited(b, "b" + j, () => say(e.a2[j].tx, e.a2[j].v, { btn: b })); }));
    $$("[data-q]", v).forEach((b) => (b.onclick = () => say(PRESENTAZIONE[+b.dataset.q], "m", { btn: b })));
    $$("[data-o]", v).forEach((b) => (b.onclick = () => say(e.o[+b.dataset.o], "m", { btn: b })));
    if ($("#orec")) $("#orec").onclick = () => toggleRecord($("#orec"), $("#oout"));
    $$("[data-topic]", v).forEach((b) => (b.onclick = () => { A.w.topic = +b.dataset.topic; A.w.text = $("#wtext").value; render(); }));
    if ($("#wtext")) { const ta = $("#wtext"), wc = $("#wc"); const cnt = () => { A.w.text = ta.value; const n = (ta.value.match(/[A-Za-zÀ-ÿ']+/g) || []).length; wc.textContent = n + " palavras"; wc.className = "pill-tag " + (n >= 80 && n <= 120 ? "ok" : ""); }; ta.oninput = cnt; cnt(); }
    $("#nextpart").onclick = () => { if (part < 3) { part++; render(); startClock(); } else results(); };
  }
  function results() {
    clearInterval(timerId); stopAudio();
    const a = e.a1.reduce((s, it, i) => s + (A.a1[i] === it.a ? 1 : 0), 0) + e.a2.reduce((s, t, j) => s + t.q.reduce((x, q, i) => x + (A.a2[j][i] === (q[1] ? 1 : 0) ? 0.5 : 0), 0), 0);
    const l = e.l1.q.reduce((x, q, i) => x + (A.l1[i] === (q[1] ? 1 : 0) ? 0.5 : 0), 0) + e.l2.q.reduce((x, _, i) => x + (A.l2[i] === 0 ? 1 : 0), 0);
    window.scrollTo(0, 0);
    v.innerHTML = `<div class="done-hero"><div class="stamp"><div><b>${fmt(a + l)}</b><span>de 24 pts</span></div></div><h2>Resultado do ${e.t}</h2><p class="muted">Escuta e leitura já estão corrigidas. Agora avalie sua escrita e sua fala.</p></div>
    <section class="card"><div class="score-row"><span>Escuta</span><b>${fmt(a)} / 12</b></div><div class="score-row"><span>Leitura e gramática</span><b>${fmt(l)} / 12</b></div></section>
    <section class="card"><h3>Gabarito comentado</h3><div class="stack small">
      ${e.a1.map((it, i) => `<p>${A.a1[i] === it.a ? "✓" : "✗"} Escuta 1.${i + 1}: ${esc(it.s)} <b>${esc(it.o[it.a])}</b></p>`).join("")}
      ${e.a2.flatMap((t, j) => t.q.map((q, i) => `<p>${A.a2[j][i] === (q[1] ? 1 : 0) ? "✓" : "✗"} Escuta 2.${j * 6 + i + 1}: ${esc(q[0])} <b>${q[1] ? "Vero" : "Falso"}</b></p>`)).join("")}
      ${e.l1.q.map((q, i) => `<p>${A.l1[i] === (q[1] ? 1 : 0) ? "✓" : "✗"} Leitura 1.${i + 1}: ${esc(q[0])} <b>${q[1] ? "Vero" : "Falso"}</b></p>`).join("")}
      ${e.l2.q.map((o, i) => `<p>${A.l2[i] === 0 ? "✓" : "✗"} Leitura 2.(${i + 1}): <b>${esc(o[0])}</b></p>`).join("")}
      <button class="play slow" type="button" id="tx">Ver transcrição dos áudios</button><div id="txs" hidden class="stack">${e.a1.map((it) => `<div class="transcript">${esc(it.d.join("\n").replace(/^[MF]: /gm, "— "))}</div>`).join("")}${e.a2.map((t) => `<div class="transcript">${esc(t.tx)}</div>`).join("")}</div></div></section>
    ${A.w.text.trim() ? `<section class="card"><h3>Sua escrita</h3><div class="transcript">${esc(A.w.text)}</div>${A.w.topic != null ? `<button class="play slow" type="button" id="model">Ver texto modelo</button><div class="transcript" id="mtx" hidden>${esc(e.w[A.w.topic].m)}</div>` : ""}</section>` : ""}
    <section class="card" id="wself"></section><section class="card" id="oself"></section>
    <section class="card" id="final"></section>`;
    $("#tx").onclick = () => ($("#txs").hidden = !$("#txs").hidden);
    if ($("#model")) $("#model").onclick = () => ($("#mtx").hidden = !$("#mtx").hidden);
    const fin = () => {
      const pts = { a, l, w: A.wPts, o: A.oPts };
      const ready = A.wPts != null && A.oPts != null;
      $("#final").innerHTML = ready ? (() => { const pass = Object.values(pts).every((x) => x >= 7.2); return `<h3>${pass ? "Aprovado no simulado" : "Ainda não: continue treinando"}</h3>${[["Escuta", "a"], ["Leitura", "l"], ["Escrita", "w"], ["Fala", "o"]].map(([t, k2]) => `<div class="score-row"><span>${t}</span><span class="pill-tag ${pts[k2] >= 7.2 ? "ok" : "ko"}">${fmt(pts[k2])} / 12</span></div>`).join("")}<p class="note">O app considera aprovado quem faz pelo menos 60% (7,2 pontos) em cada parte. A nota mínima oficial é definida pela CILS.</p><div class="stack"><a class="btn block" href="#simulado">Voltar aos simulados</a></div>`; })() : `<p class="note">Avalie a escrita e a fala acima para ver o resultado final.</p>`;
      if (ready && !A.saved) { A.saved = true; S.exams.push({ date: new Date().toLocaleDateString("pt-BR"), t: e.t, pts }); touch(40); }
    };
    selfAssess($("#wself"), SCORING.scritta, "Avalie sua escrita", (p) => { A.wPts = p; fin(); });
    selfAssess($("#oself"), SCORING.orale, "Avalie sua fala", (p) => { A.oPts = p; fin(); });
    fin();
  }
  render(); startClock();
}

/* ============================== INÍCIO ============================== */
onAuthChange(() => { renderBar(); const h = (location.hash || "").slice(1).split("--")[0]; if (h === "conta" || h === "inicio" || h === "") route(); });
initAuth(() => S, (m) => { S = Object.assign(blank(), m); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} if (!document.body.classList.contains("focus")) route(); else renderBar(); });
route();
if ("serviceWorker" in navigator && location.protocol !== "file:") window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
let installEvt = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; $("#install").hidden = false; });
$("#install").addEventListener("click", async () => { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice.catch(() => {}); installEvt = null; $("#install").hidden = true; });
