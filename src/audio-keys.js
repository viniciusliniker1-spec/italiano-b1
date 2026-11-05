/* Lista todas as falas do app que têm áudio gravado.
   Usado pelo app (para achar o arquivo) e por scripts/gen-audio.py (para gerar os áudios). */
import { UNITS, DECKS, AUDIOS, READINGS, SPEAK } from "./content.js";
import { EXAMS, PRESENTAZIONE } from "./exams.js";
import { PHRASES, PAIRS } from "./pronuncia.js";

export const norm = (t) => String(t).replace(/\s+/g, " ").trim();
export const keyOf = (text, voice = "f") => voice + "|" + norm(text);

/* Frase completa de um exercício de lacuna, para ouvir depois de responder. */
export function fullSentence(q) {
  if (!q.s.includes("___")) return null;
  const tail = q.s.split("—").pop();
  const base = tail.includes("___") ? tail : q.s;
  const ans = q.o ? q.o[q.a] : (q.f || [""])[0];
  return norm(base.replace(/\([^)]*\)/g, "").replace("___", ans).replace(/\s+([.,!?])/g, "$1"));
}

export const exItTexts = (html) =>
  [...html.matchAll(/<span class="ex-it">([\s\S]*?)<\/span>/g)].map((m) => norm(m[1].replace(/<[^>]+>/g, "")));

/* Diálogo "Nome: fala" → partes com voz. vmap: {Nome:"m"|"f", _: voz padrão}. */
export function dialogParts(tx, vmap = {}) {
  return tx.split("\n").filter((l) => l.trim()).map((line) => {
    const m = line.match(/^([^:]{1,20}):\s*(.*)$/);
    if (m && (vmap[m[1]] || m[1] === "M" || m[1] === "F")) {
      const v = vmap[m[1]] || (m[1] === "M" ? "m" : "f");
      return { voice: v, text: norm(m[2]) };
    }
    return { voice: vmap._ || "f", text: norm(m && !vmap._ ? m[2] : line) };
  });
}

export function allClips() {
  const clips = new Map();
  const add = (key, parts) => { if (!clips.has(key) && parts.every((p) => p.text)) clips.set(key, parts); };
  const one = (text, voice = "f") => add(keyOf(text, voice), [{ voice, text: norm(text) }]);

  for (const u of UNITS) {
    exItTexts(u.e).forEach((t) => one(t));
    for (const q of u.q) { const f = fullSentence(q); if (f) one(f); if (q.say) one(q.say); }
  }
  for (const d of DECKS) d.w.forEach((w) => one(w[0]));
  for (const a of AUDIOS) add("d|" + a.id, dialogParts(a.tx, a.v));
  for (const r of READINGS) one(r.tx.replace(/\n+/g, " "));
  for (const s of SPEAK) one(s.m);
  for (const p of PHRASES) one(p.it);
  for (const p of PAIRS) { one(p[0]); one(p[2]); }
  for (const q of PRESENTAZIONE) one(q, "m");
  for (const e of EXAMS) {
    e.a1.forEach((it, i) => add(`d|${e.id}-a1-${i}`, dialogParts(it.d.join("\n"))));
    e.a2.forEach((it) => one(it.tx, it.v));
    e.o.forEach((t) => one(t, "m"));
  }
  return clips;
}
