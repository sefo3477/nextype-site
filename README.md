# nextype.bg

Astro сайт на Nextype. Структурата и анимациите са от v5, шрифтът е Exo 2.

## Команди
```bash
npm install
npm run dev      # http://localhost:4322
npm run deploy   # build + качване в клона gh-pages → nextype.bg
```
Node 22 е в `~/.local/node22/bin`.

## Къде е какво
- `src/components/` – секциите на страницата (Hero, Clients, System, Cases, Services, Process, Faq, Contact).
- `src/styles/v5.css` – оформлението от v5; `src/styles/brand.css` – шрифт, тегла, размери и подобрения.
- `public/site.js` – менюто, табовете, анимациите и формата (Web3Forms).
- `public/img/` – логото и логата на клиентите.
- Секцията Proof се добавя в `src/pages/index.astro` (има коментар).
