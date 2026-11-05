// Confere a integridade do conteúdo: respostas válidas, ids únicos, simulados no formato oficial
// e um áudio gravado para cada fala.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { UNITS, DECKS, AUDIOS, READINGS, WRITINGS, SPEAK } from "../src/content.js";
import { EXAMS, OFFICIAL, SCORING } from "../src/exams.js";
import { PHRASES } from "../src/pronuncia.js";
import { allClips } from "../src/audio-keys.js";

const LEVELS = ["A1", "A2", "B1"];

function checkQuestions(owner, qs) {
  assert.ok(qs.length > 0, `${owner} sem perguntas`);
  for (const q of qs) {
    assert.ok(q.s, `${owner}: pergunta sem enunciado`);
    if (q.o) {
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, `${owner}: resposta fora das opções em "${q.s}"`);
      assert.equal(new Set(q.o).size, q.o.length, `${owner}: opções repetidas em "${q.s}"`);
    } else {
      assert.ok(Array.isArray(q.f) && q.f.length > 0, `${owner}: lacuna sem resposta em "${q.s}"`);
    }
  }
}
const unique = (list, what) => assert.equal(new Set(list.map((x) => x.id)).size, list.length, `ids repetidos em ${what}`);

test("unidades de gramática", () => {
  unique(UNITS, "UNITS");
  for (const u of UNITS) { assert.ok(LEVELS.includes(u.lv), `${u.id}: nível inválido`); checkQuestions(u.id, u.q); }
  const order = UNITS.map((u) => LEVELS.indexOf(u.lv));
  assert.deepEqual(order, [...order].sort((a, b) => a - b), "a trilha precisa estar em ordem A1, A2, B1");
});

test("vocabulário com pronúncia", () => {
  unique(DECKS, "DECKS");
  for (const d of DECKS) {
    assert.ok(LEVELS.includes(d.lv));
    for (const w of d.w) { assert.equal(w.length, 3, `${d.id}: cartão incompleto ${w[0]}`); assert.match(w[2], /[A-ZÀ-Ý]/, `${w[0]}: sílaba forte não marcada`); }
  }
});

test("escuta, leitura, escrita, fala e pronúncia", () => {
  unique(AUDIOS, "AUDIOS"); unique(READINGS, "READINGS"); unique(WRITINGS, "WRITINGS"); unique(SPEAK, "SPEAK");
  for (const x of [...AUDIOS, ...READINGS]) { assert.ok(x.tx.length > 50); checkQuestions(x.id, x.q); }
  for (const p of PHRASES) assert.ok(p.it && p.pr && p.pt && LEVELS.includes(p.lv));
});

test("simulados seguem o formato oficial do CILS B1 Cittadinanza", () => {
  for (const e of EXAMS) {
    assert.equal(e.a1.length, 6, `${e.id}: escuta prova 1 tem 6 itens`);
    e.a1.forEach((it) => { assert.equal(it.o.length, 3); assert.equal(it.a, 0); assert.ok(it.d.every((l) => /^[MF]: /.test(l))); });
    assert.equal(e.a2.reduce((n, t) => n + t.q.length, 0), 12, `${e.id}: escuta prova 2 tem 12 vero/falso`);
    assert.equal(e.l1.q.length, 12, `${e.id}: leitura prova 1 tem 12 vero/falso`);
    assert.equal(e.l2.q.length, 6, `${e.id}: leitura prova 2 tem 6 lacunas`);
    e.l2.q.forEach((o) => assert.equal(new Set(o).size, 3));
    for (let i = 0; i <= 6; i++) assert.ok(e.l2.tx.includes(`(${i}) ___`), `${e.id}: lacuna (${i}) no texto`);
    assert.equal(e.w.length, 2, `${e.id}: 2 temas de escrita`);
    e.w.forEach((w) => { const n = w.m.split(/\s+/).length; assert.ok(n >= 80 && n <= 130, `${e.id}: texto modelo com ${n} palavras`); });
    assert.ok(e.o.length >= 2);
  }
  // pontuação oficial: escuta 6 + 12×0,5; leitura 12×0,5 + 6; escrita e fala 12
  for (const k of ["scritta", "orale"]) assert.equal(SCORING[k].reduce((n, c) => n + c[1], 0), 12);
  assert.equal(OFFICIAL.key.a1.length + OFFICIAL.key.a2.length + OFFICIAL.key.l1.length + OFFICIAL.key.l2.length, 36);
});

test("toda fala tem áudio gravado", () => {
  const path = new URL("../public/audio/manifest.json", import.meta.url);
  assert.ok(existsSync(path), "rode scripts/gen-audio.py");
  const man = JSON.parse(readFileSync(path, "utf8"));
  const missing = [...allClips().keys()].filter((k) => !man[k]);
  assert.deepEqual(missing.slice(0, 5), [], `${missing.length} falas sem áudio: rode scripts/gen-audio.py`);
  for (const f of new Set(Object.values(man))) assert.ok(existsSync(new URL("../public/audio/" + f, import.meta.url)), `arquivo ${f} ausente`);
});
