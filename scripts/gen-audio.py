#!/usr/bin/env python3
"""Gera os áudios do app com vozes italianas neurais (Piper TTS, código aberto).

Uso:
  pip install piper-tts            # e ffmpeg instalado no sistema
  python3 scripts/gen-audio.py --voices PASTA_DAS_VOZES

Vozes (baixe de https://huggingface.co/rhasspy/piper-voices, pasta it/it_IT):
  it_IT-serena-high.onnx (+ .onnx.json)   -> voz feminina "f"
  it_IT-paola-medium.onnx (+ .onnx.json)  -> voz masculina "m" (tom rebaixado; a voz
                                             masculina do Piper, riccardo-x_low, é pouco clara)

Gera public/audio/<hash>.mp3 e public/audio/manifest.json. Só cria o que ainda não existe,
então rodar de novo depois de mudar o conteúdo gera apenas as falas novas."""
import argparse, hashlib, io, json, os, subprocess, sys, wave
from piper import PiperVoice, SynthesisConfig

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "audio")
VOICES = {"f": "it_IT-serena-high.onnx", "m": "it_IT-paola-medium.onnx"}
# Rebaixa o tom em ~3 semitons sem mudar a velocidade, para a voz soar masculina.
PITCH = {"f": "", "m": "asetrate={rate}*0.84,aresample={rate},atempo=1.19,"}
PAUSE_S = 0.55
RATE = 22050


def synth(voice, text, cfg):
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        voice.synthesize_wav(text, w, syn_config=cfg)
    buf.seek(0)
    with wave.open(buf, "rb") as r:
        return r.getframerate(), r.readframes(r.getnframes())


def to_mp3(chunks, path):
    """chunks: lista de (taxa, pcm16 mono, voz). Reamostra tudo para 22050 Hz, junta com pausas e grava MP3."""
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    inputs, filt = [], []
    tmp = []
    for i, (rate, pcm, v) in enumerate(chunks):
        f = path + f".{i}.raw"
        open(f, "wb").write(pcm)
        tmp.append(f)
        args += ["-f", "s16le", "-ar", str(rate), "-ac", "1", "-i", f]
        filt.append(f"[{i}:a]{PITCH[v].format(rate=rate)}aresample={RATE},apad=pad_dur={PAUSE_S if i < len(chunks) - 1 else 0}[a{i}]")
    n = len(chunks)
    filt.append("".join(f"[a{i}]" for i in range(n)) + f"concat=n={n}:v=0:a=1[out]")
    args += ["-filter_complex", ";".join(filt), "-map", "[out]", "-ac", "1", "-ar", str(RATE), "-b:a", "48k", path]
    try:
        subprocess.run(args, check=True)
    finally:
        for f in tmp:
            os.remove(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voices", required=True, help="pasta com os arquivos .onnx das vozes")
    a = ap.parse_args()
    clips = json.loads(subprocess.run(["node", os.path.join(ROOT, "scripts", "audio-list.mjs")],
                                      check=True, capture_output=True, text=True).stdout)
    voices = {k: PiperVoice.load(os.path.join(a.voices, v)) for k, v in VOICES.items()}
    # Um pouco mais lento que o normal, para quem está aprendendo.
    cfg = {"f": SynthesisConfig(length_scale=1.1), "m": SynthesisConfig(length_scale=1.08)}
    os.makedirs(OUT, exist_ok=True)
    manifest, made = {}, 0
    for c in clips:
        name = hashlib.sha1(c["key"].encode()).hexdigest()[:12] + ".mp3"
        manifest[c["key"]] = name
        path = os.path.join(OUT, name)
        if os.path.exists(path):
            continue
        chunks = [(*synth(voices[p["voice"]], p["text"], cfg[p["voice"]]), p["voice"]) for p in c["parts"]]
        to_mp3(chunks, path)
        made += 1
        if made % 50 == 0:
            print(f"{made} áudios gerados…", flush=True)
    keep = set(manifest.values()) | {"manifest.json"}
    for f in os.listdir(OUT):
        if f not in keep:
            os.remove(os.path.join(OUT, f))
    json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"Pronto: {made} novos, {len(manifest)} no total.")


if __name__ == "__main__":
    sys.exit(main())
