// Imprime em JSON todas as falas que precisam de áudio (lidas por gen-audio.py).
import { allClips } from "../src/audio-keys.js";
const out = [...allClips()].map(([key, parts]) => ({ key, parts }));
process.stdout.write(JSON.stringify(out));
