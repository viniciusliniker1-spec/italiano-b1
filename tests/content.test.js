// Confere a integridade do conteúdo: cada pergunta tem resposta válida e ids não se repetem.
import { test } from "node:test";
import assert from "node:assert/strict";
import { UNITS, DECKS, AUDIOS, READINGS, WRITINGS, SPEAK } from "../src/content.js";

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
  for (const u of UNITS) {
    assert.ok(LEVELS.includes(u.lv), `${u.id}: nível inválido`);
    checkQuestions(u.id, u.q);
  }
  // a trilha precisa estar em ordem: A1, depois A2, depois B1
  const order = UNITS.map((u) => LEVELS.indexOf(u.lv));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test("vocabulário", () => {
  unique(DECKS, "DECKS");
  for (const d of DECKS) {
    assert.ok(LEVELS.includes(d.lv));
    for (const w of d.w) assert.equal(w.length, 2, `${d.id}: cartão incompleto`);
  }
});

test("escuta e leitura", () => {
  unique(AUDIOS, "AUDIOS");
  unique(READINGS, "READINGS");
  for (const x of [...AUDIOS, ...READINGS]) {
    assert.ok(x.tx.length > 50, `${x.id}: texto curto demais`);
    checkQuestions(x.id, x.q);
  }
});

test("escrita e fala", () => {
  unique(WRITINGS, "WRITINGS");
  unique(SPEAK, "SPEAK");
  for (const w of WRITINGS) assert.ok(w.min < w.max, `${w.id}: limites de palavras`);
  for (const s of SPEAK) assert.ok(s.m.length > 20, `${s.id}: resposta modelo vazia`);
});
