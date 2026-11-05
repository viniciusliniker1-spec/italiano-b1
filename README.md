# Cittadinanza B1

App para aprender italiano **do zero ao nível B1** e passar no exame de língua exigido para a cidadania italiana (CILS, CELI, PLIDA ou Cert.IT).

<img src="docs/tela-inicial.png" alt="Tela inicial do app" width="300">

## O que tem

- **Trilha em 3 etapas**: Base (A1), Ponte (A2) e Nível da prova (B1). São 24 unidades de gramática com explicação em português.
- **Áudio em italiano** em todas as palavras destacadas e nas frases dos exercícios, com a voz do próprio aparelho.
- **Tradução** nos exercícios das etapas iniciais.
- **Vocabulário** com repetição espaçada: 9 temas e 122 cartões.
- **Escuta, leitura, escrita e fala** com situações reais: Comune, médico, estação, trabalho.
- **Simulado cronometrado** de 40 minutos no formato da prova.
- **Funciona sem internet** depois do primeiro acesso e pode ser instalado na tela inicial do celular (PWA).

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

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Faça um push na branch `main`. O workflow `.github/workflows/deploy.yml` testa, compila e publica.
4. O endereço fica assim: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Instalar no celular

- **Android (Chrome)**: abra o endereço e toque em **Instalar app**, no topo da página, ou em **⋮ → Adicionar à tela inicial**.
- **iPhone (Safari)**: toque em **Compartilhar → Adicionar à Tela de Início**.

Se a voz soar estrangeira, instale uma voz italiana nas configurações de fala do aparelho:
- **Android**: Configurações → Acessibilidade → Saída de texto para fala.
- **iPhone**: Ajustes → Acessibilidade → Conteúdo Falado → Vozes.

## Estrutura

```
index.html            página base e metadados do app
src/content.js        todo o conteúdo do curso (lições, cartões, áudios, textos)
src/main.js           telas, exercícios, repetição espaçada, simulado
src/styles.css        visual (tema claro e escuro)
public/sw.js          service worker (modo offline)
public/manifest.webmanifest, public/icons/   dados para instalação
tests/                testes de integridade do conteúdo
```

Para acrescentar uma lição, adicione um objeto em `UNITS` dentro de `src/content.js` com `id`, `lv` (A1, A2 ou B1), `t` (título), `e` (explicação em HTML) e `q` (perguntas). O `npm test` avisa se alguma resposta estiver errada ou faltando.

## Próximos passos

- **Correção de textos por IA**: precisa de um pequeno servidor (por exemplo, um Cloudflare Worker) que guarde a chave da IA fora do app, como o Professor Noah do Bibliolingo.
- **App Android (Play Store)**: versão em Expo/React Native reaproveitando `src/content.js`, como a pasta `mobile/` do Bibliolingo.
- **Conta e sincronização** entre aparelhos.
