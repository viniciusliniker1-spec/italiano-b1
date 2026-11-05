# Cittadinanza B1

App para aprender italiano **do zero ao nível B1** e passar no exame de língua exigido para a cidadania italiana (CILS, CELI, PLIDA ou Cert.IT).

<img src="docs/tela-inicial.png" alt="Tela inicial do app" width="300">

## O que tem

- **Trilha do zero ao B1** em 3 etapas: Base (A1), Ponte (A2) e Prova (B1). São 26 unidades seguindo o programa oficial do B1 Cittadinanza. Congiuntivo e futuro ficam como extra, porque não são cobrados.
- **Lições passo a passo**: uma pergunta por vez, com correção na hora e a frase completa em áudio.
- **Áudio com voz italiana nativa** em todas as frases (454 falas), gravado com vozes neurais do [Piper TTS](https://github.com/rhasspy/piper). Funciona em qualquer celular e também offline.
- **Pronúncia**: pronúncia figurada nos cartões e nas frases (ex.: `buon-DJOR-no`), pares de consoantes dobradas e prática com microfone. O app reconhece a sua fala e mostra quais palavras entendeu.
- **Vocabulário** com repetição espaçada: 9 temas e 122 cartões.
- **Simulados no formato oficial do CILS B1 Cittadinanza**: escuta (6 diálogos + 12 vero/falso), leitura (12 vero/falso + texto para completar), escrita (80 a 120 palavras) e fala, com os tempos e a pontuação oficiais.
- **Prova-modelo oficial**: links para o caderno, o áudio e o gabarito publicados pela Università per Stranieri di Siena, e uma folha de respostas que corrige com o gabarito oficial.
- **Instalável (PWA)** e com tema claro e escuro.

O progresso fica salvo no próprio aparelho.

## Rodar no computador

Requer Node.js 22.

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm test         # confere o conteúdo (respostas válidas, ids únicos)
npm run build    # gera a versão final em dist/
```

## Publicar de graça no GitHub Pages

A cada push na branch `main`, o workflow `.github/workflows/deploy.yml` testa, compila e envia o app pronto para a branch `gh-pages`.

O endereço é `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Se o site não aparecer, abra **Settings → Pages** e confira:
- **Source**: **Deploy from a branch**.
- **Branch**: `gh-pages`, pasta `/ (root)`.

## Instalar no celular

- **Android (Chrome)**: abra o endereço e toque em **Instalar app**, no topo da página, ou em **⋮ → Adicionar à tela inicial**.
- **iPhone (Safari)**: toque em **Compartilhar → Adicionar à Tela de Início**.

Se a voz soar estrangeira, instale uma voz italiana nas configurações de fala do aparelho:
- **Android**: Configurações → Acessibilidade → Saída de texto para fala.
- **iPhone**: Ajustes → Acessibilidade → Conteúdo Falado → Vozes.

## Estrutura

```
index.html            página base e metadados do app
src/content.js        lições, cartões (com pronúncia), áudios e textos
src/exams.js          simulados no formato oficial e dados da prova-modelo CILS
src/pronuncia.js      frases para prática de pronúncia
src/audio-keys.js     lista de todas as falas que têm áudio
scripts/gen-audio.py  gera os MP3 com vozes italianas (Piper TTS)
public/audio/         áudios gerados e manifest.json
src/main.js           telas, exercícios, repetição espaçada, simulado
src/styles.css        visual (tema claro e escuro)
public/sw.js          service worker (modo offline)
public/manifest.webmanifest, public/icons/   dados para instalação
tests/                testes de integridade do conteúdo
```

Para acrescentar uma lição, adicione um objeto em `UNITS` dentro de `src/content.js` com `id`, `lv` (A1, A2 ou B1), `t` (título), `e` (explicação em HTML) e `q` (perguntas). O `npm test` avisa se alguma resposta estiver errada ou faltando.

## Gerar os áudios

Depois de mudar ou acrescentar frases italianas, gere os áudios novos:

```bash
pip install piper-tts        # precisa também do ffmpeg
python3 scripts/gen-audio.py --voices PASTA_COM_AS_VOZES
```

As vozes `it_IT-serena-high` e `it_IT-paola-medium` ficam em [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT). O script só gera o que falta. O `npm test` avisa se alguma fala ficou sem áudio.

## Próximos passos

- **Correção de textos por IA**: precisa de um pequeno servidor (por exemplo, um Cloudflare Worker) que guarde a chave da IA fora do app, como o Professor Noah do Bibliolingo.
- **App Android (Play Store)**: versão em Expo/React Native reaproveitando `src/content.js`, como a pasta `mobile/` do Bibliolingo.
- **Conta e sincronização** entre aparelhos.
