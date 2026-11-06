// Service worker: guarda o app no aparelho para funcionar sem internet.
// Páginas: rede primeiro (pega atualizações), cache se estiver offline.
// Áudios: guardados inteiros na primeira vez que tocam (ou pelo botão "Baixar áudios").
// Outros arquivos (JS, CSS, fontes, ícones): cache primeiro, atualizando em segundo plano.
const CACHE = "italiano-b1-v3";
const AUDIO = "italiano-b1-audio-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./audio/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== AUDIO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;

  if (sameOrigin && url.pathname.endsWith(".mp3")) {
    // Ignora o cabeçalho Range: guarda e devolve o arquivo inteiro.
    e.respondWith(
      caches.open(AUDIO).then((c) =>
        c.match(url.href).then((hit) => hit || fetch(url.href).then((res) => { if (res.status === 200) c.put(url.href, res.clone()); return res; }))
      )
    );
    return;
  }

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {}); } return res; })
        .catch(() => hit);
      return hit || net;
    })
  );
});
