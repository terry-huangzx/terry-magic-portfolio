# Terry Huang — Personal Portfolio

A magic-themed personal website built with **Vite + React**. Cards fan out, cards
flip, and confetti bursts every time you draw one.

## Stack
- React 18 (no UI framework — hand-rolled CSS)
- Vite for dev/build
- Pure Canvas 2D for the sparkle / confetti layers
- CSS 3D transforms for the card flip
- Fonts: Fraunces (serif), Geist (sans), Caveat (script), JetBrains Mono

## Run locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

Or, on Windows, just double-click `dev.cmd`.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves the build
```

## Layout

| # | Section | What's inside |
|---|---------|---------------|
| — | Hero | Name, intro, magician card |
| i. | Acts | 5 fanned cards — every job I've held |
| ii. | Tricks | 7 fanned cards — every project I've shipped |
| iii. | Library | Skills shelf |
| iv. | Stage | University of Toronto playbill |
| v. | Encore | Contact links |

Click any card to flip it open with confetti. Use the side dock (right edge) or
press the keyboard shortcuts in the deck chooser to navigate.

— Terry
