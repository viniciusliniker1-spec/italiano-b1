#!/usr/bin/env python3
"""Monta src/vocab-data.js com as palavras do Nuovo Vocabolario di Base (De Mauro, 2016).

Entrada: data/nvdb-pt.tsv  (palavra \t nível FO/AU \t tradução), em ordem de frequência.
Saída:   src/vocab-data.js  (palavra, tradução, pronúncia figurada, baralho)

A pronúncia figurada vem da fonética do italiano (espeak-ng, via Piper) convertida para uma
escrita que um brasileiro lê sem esforço: sílaba forte em MAIÚSCULAS, É/Ó abertos, Ê/Ô fechados.

Uso: pip install piper-tts && python3 scripts/build-vocab.py --voice PASTA/it_IT-serena-high.onnx
"""
import argparse, json, os, re
from piper import PiperVoice

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOWELS = set("aeiouɛɔʊɪ")


def tokens(ipa):
    """Divide o IPA em fonemas: [(som, tônico?, longo?)]."""
    ipa = ipa.replace("ʲ", "").replace("ɡ", "g").replace("ɾ", "r")
    out, i, stress = [], 0, False
    multi = ("tʃ", "dʒ", "ts", "dz")
    while i < len(ipa):
        c = ipa[i]
        if c == "ˈ":
            stress = True; i += 1; continue
        if c in "ˌ. -":
            i += 1; continue
        if c == "ː":
            if out: out[-1][2] = True
            i += 1; continue
        ph = ipa[i:i + 2] if ipa[i:i + 2] in multi else c
        out.append([ph, False, False])
        if stress and ph[0] in VOWELS:
            out[-1][1] = True; stress = False
        i += len(ph)
    return out


SPELL = {"tʃ": "tch", "dʒ": "dj", "ʃ": "ch", "ʎ": "lh", "ɲ": "nh", "k": "k", "ts": "ts", "dz": "dz", "j": "i", "w": "u", "ʊ": "u", "ɪ": "i", "ŋ": "n"}
LIQ = set("rl")
OBST = set("pbtdkgfv")


def respell(ipa):
    ph = tokens(ipa)
    # semivogais: i/u átonos antes de vogal viram glides do ataque
    for n, p in enumerate(ph):
        if p[0] in ("ʊ", "ɪ", "i", "u") and not p[1] and n + 1 < len(ph) and ph[n + 1][0][0] in VOWELS - {"ʊ", "ɪ"}:
            p[0] = "w" if p[0] in ("ʊ", "u") else "j"
    vid = [n for n, p in enumerate(ph) if p[0][0] in VOWELS]
    if not vid:
        return None
    sylls, start = [], 0
    for a, b in zip(vid, vid[1:]):
        cl = list(range(a + 1, b))  # consoantes entre as vogais
        if cl and ph[cl[0]][2]:
            # consoante longa (geminada): aparece no fim de uma sílaba e no começo da outra
            sylls.append(ph[start:cl[0] + 1]); start = cl[0]; continue
        if not cl:
            cut = b
        elif len(cl) == 1:
            cut = cl[0]
        else:
            first, second = ph[cl[0]][0], ph[cl[1]][0]
            if first in OBST and second in LIQ and len(cl) == 2:
                cut = cl[0]
            elif second in ("j", "w") and len(cl) == 2:
                cut = cl[0]
            else:
                cut = cl[0] + 1
        sylls.append(ph[start:cut]); start = cut
    sylls.append(ph[start:])
    parts = []
    for s in sylls:
        stressed = any(p[1] for p in s)
        txt = ""
        for k, (p, st, long_) in enumerate(s):
            if p in ("ɛ", "ɔ", "e", "o") and stressed:
                t = {"ɛ": "é", "ɔ": "ó", "e": "ê", "o": "ô"}[p]
            elif p in ("ɛ", "e"):
                t = "e"
            elif p in ("ɔ", "o"):
                t = "o"
            elif p == "g":
                nxt = s[k + 1][0] if k + 1 < len(s) else ""
                t = "gu" if nxt[:1] in ("e", "ɛ", "i", "j") else "g"
            else:
                t = SPELL.get(p, p)
            txt += t
        parts.append(txt.upper() if stressed else txt)
    res = "-".join(parts)
    # geminadas de dígrafos: at-TCHO, ad-DJO, pit-TSA; ch/lh/nh não se dobram (BA-nho)
    def gem(m):
        a, b = m.group(1), m.group(2)
        if a.lower() != b.lower():
            return m.group(0)
        return (a[0] if a.lower() in ("tch", "dj", "ts", "dz") else "") + "-" + b
    res = re.sub(r"(tch|TCH|dj|DJ|ts|TS|dz|DZ|ch|CH|lh|LH|nh|NH)-(tch|TCH|dj|DJ|ts|TS|dz|DZ|ch|CH|lh|LH|nh|NH)", gem, res)
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", required=True)
    a = ap.parse_args()
    v = PiperVoice.load(a.voice)
    rows = [l.split("\t") for l in open(os.path.join(ROOT, "data", "nvdb-pt.tsv"), encoding="utf8").read().splitlines() if l.strip()]
    fo = [r for r in rows if r[1] == "FO"]
    au = [r for r in rows if r[1] == "AU"]
    out = []
    for group, name, size in ((fo, "f", 250), (au, "u", 250)):
        for i, (w, lvl, pt) in enumerate(group):
            ipa = "".join("".join(s) for s in v.phonemize(w))
            pr = respell(ipa) or w
            if "-" not in pr and pr.islower():  # monossílabo: é a própria sílaba forte
                pr = pr.upper()
            out.append([w, pt, pr, name + str(i // size + 1)])
    js = ("/* Gerado por scripts/build-vocab.py a partir do Nuovo Vocabolario di Base della lingua italiana\n"
          "   (T. De Mauro, I. Chiari, F. Ferrucci, 2016; lista em texto: github.com/pettarin/nvdb, CC BY 4.0).\n"
          "   Cada item: [palavra, tradução, pronúncia figurada, baralho]. Baralhos f1…: fundamentais; u1…: alto uso. */\n"
          "export const VOCAB = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
    open(os.path.join(ROOT, "src", "vocab-data.js"), "w", encoding="utf8").write(js)
    print(len(out), "palavras;", len({x[3] for x in out}), "baralhos")


if __name__ == "__main__":
    main()
