# Volt Watch — Energy Vampire

> *"Know what's draining you."*

A front-end web prototype that helps everyday Americans see the hidden cost of standby ("vampire") power — and take back control. Built for the fictional **Volt Watch** public energy awareness initiative.

The prototype is a single-page application with three routes: a homepage, an interactive game where users build out a house full of devices, and a tips view for reducing waste.

---

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vuetify 3** with a custom dark `voltWatch` theme
- **Vue Router 4** (lazy routes)
- **Vite 5** + `@vitejs/plugin-vue` + `vite-plugin-vuetify`
- **No backend.** All data is local. Game state persists in `localStorage`.

US-only for the prototype. Electricity rate is fixed at **$0.16 / kWh**.

---

## Project structure

```
energy-vampires/
├── index.html              # Vite entry
├── vite.config.js          # Vite + Vue + Vuetify plugin config
├── package.json
├── brief.md                # Product / content / design brief
├── plan.md                 # Build sequence + component breakdown
└── src/
    ├── main.js             # Mount Vue, register Vuetify + Router
    ├── App.vue             # Shell (AppNav, <router-view>, AppFooter)
    ├── plugins/
    │   ├── vuetify.js      # voltWatch theme tokens
    │   └── router.js       # / , /game , /tips
    ├── data/
    │   └── devices.js      # Device catalog (the "database")
    ├── stores/
    │   └── gameStore.js    # Reactive game state + localStorage persistence
    ├── views/
    │   ├── HomeView.vue    # /
    │   ├── GameView.vue    # /game
    │   └── TipsView.vue    # /tips
    ├── components/
    │   ├── layout/         # AppNav, AppFooter
    │   ├── home/           # StatCarousel, WorldImpactStats
    │   ├── game/           # DevicePanel, HousePanel, RoomZone, DeviceChip,
    │   │                   # RoomDrawer, VampireDisplay, TallyBar, …
    │   └── tips/           # QuickWinCard, DeviceTipAccordion
    └── assets/
        ├── images/         # vampire-1..4.png, house.svg
        └── styles/global.css
```

See [brief.md](brief.md) for product/content/design and [plan.md](plan.md) for the build sequence.

---

## Getting started

Requires Node 18+ and npm.

```bash
npm install
npm run dev      # http://localhost:5173
```

### Build & preview

```bash
npm run build    # outputs to dist/
npm run preview  # serves the production build locally
```

The build is fully static — drop `dist/` on any static host (Netlify, Vercel, S3 + CloudFront, GitHub Pages, etc.).

---

## How the game works

The `/game` route is a drag-and-drop "build your house" interaction:

1. **Energy Vampires** panel lists every device in the catalog. Drag a device card onto a room — or use the bulk-add dialog from inside a room.
2. **Your House** panel renders an upper and ground floor of room drop-zones. Each zone shows its devices as chips and pulses with a color that reflects the room's worst-offender tier (red / orange / yellow). Populated rooms get a green dashed border.
3. **Vampire** illustration in the background morphs through four states as total wasted watts climbs.
4. **Tally bar** along the bottom shows live Devices count, Energy Wasted (kWh/day), Money Lost ($/year), and a CTA to the tips page. Values animate when they change.

Game state is persisted to `localStorage` under `volt-watch:game-state` with a 24-hour TTL.

### Key features
- Drag-and-drop via the native HTML5 DnD API (`text/x-device-id` payload).
- "Example house" seeds ~19 devices for instant demo; "Reset all" clears everything.
- Per-chip toggle to mark a device as unplugged (strike-through).
- Sticky bulk-action bar pinned above the tally that follows the device panel's width.
- Pulsing dashed borders on room zones with `prefers-reduced-motion` fallback.

---

## Design system

Colors, typography, and tier badges are defined in [brief.md §4](brief.md) and implemented in `src/plugins/vuetify.js` + `src/assets/styles/global.css`.

| Token | Value |
|---|---|
| `background` | `#0D0D0D` |
| `surface` | `#1F1F1F` |
| `secondary` | `#2A2A2A` |
| `primary` (CTA) | `#E74C3C` |
| `success` | `#27AE60` |
| `warning` | `#F39C12` |
| Display font | Protest Riot (Google Fonts) |
| UI font | Inter (Google Fonts) |

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check & bundle to `dist/` |
| `npm run preview` | Serve `dist/` for a local production preview |

---

## License

[MIT](LICENSE)

---

*Volt Watch is a fictional brand created for this prototype. It is not affiliated with any utility provider.*
