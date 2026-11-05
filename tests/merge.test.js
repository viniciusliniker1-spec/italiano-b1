// A junção do progresso local com o da nuvem nunca pode perder avanço.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeProgress } from "../src/auth.js";

test("fica com o melhor de cada lado", () => {
  const local = { level: "A1", xp: 120, streak: 3, lastDay: "2026-11-05", today: { day: "2026-11-05", xp: 20 },
    lessons: { pron: { best: 1 }, sal: { best: 0.5 } }, cards: { pw0: { box: 3, due: 10 } }, audio: { a0: 1 },
    exams: [{ date: "05/11/2026", t: "Simulado 1", pts: { a: 9, l: 8, w: 7, o: 8 } }] };
  const cloud = { level: "A2", xp: 300, streak: 9, lastDay: "2026-11-03", today: { day: "2026-11-03", xp: 40 },
    lessons: { sal: { best: 0.83 }, art: { best: 1 } }, cards: { pw0: { box: 1, due: 2 }, pw1: { box: 2, due: 5 } }, audio: { a0: 0.5, a1: 1 },
    exams: [{ date: "01/11/2026", t: "Simulado 2", pts: { a: 6, l: 7, w: 6, o: 7 } }] };
  const m = mergeProgress(local, cloud);
  assert.equal(m.level, "A1");
  assert.equal(m.xp, 300);
  assert.equal(m.lastDay, "2026-11-05");
  assert.equal(m.streak, 3);
  assert.deepEqual(m.today, { day: "2026-11-05", xp: 20 });
  assert.deepEqual(m.lessons, { pron: { best: 1 }, sal: { best: 0.83 }, art: { best: 1 } });
  assert.deepEqual(m.cards, { pw0: { box: 3, due: 10 }, pw1: { box: 2, due: 5 } });
  assert.deepEqual(m.audio, { a0: 1, a1: 1 });
  assert.equal(m.exams.length, 2);
});

test("juntar duas vezes dá o mesmo resultado", () => {
  const a = { xp: 10, exams: [{ t: "x" }], lessons: { a: { best: 0.5 } } };
  const once = mergeProgress(a, a);
  assert.deepEqual(mergeProgress(once, a).exams, [{ t: "x" }]);
  assert.equal(once.xp, 10);
});

test("conta nova na nuvem recebe o progresso do aparelho", () => {
  const m = mergeProgress({ level: "B1", xp: 50, lessons: { rel: { best: 1 } } }, {});
  assert.equal(m.level, "B1");
  assert.equal(m.xp, 50);
  assert.deepEqual(m.lessons, { rel: { best: 1 } });
});
