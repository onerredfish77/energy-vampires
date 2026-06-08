# 🧛 Energy Vampire: Is There One in Your House?
## Project Brief — Prototype v1.0

---

## 1. PROJECT SNAPSHOT

| Field | Details |
|---|---|
| **Project Name** | Energy Vampire: Is There One in Your House? |
| **Fictional Sponsor** | **Volt Watch** — *A Public Energy Awareness Initiative* |
| **Tagline** | *"Know what's draining you."* |
| **Type** | Front-end web prototype (single-page app) |
| **Builder** | VS Code + GitHub Copilot |
| **Stack** | Vue 3 (Composition API) + Vuetify 3 + Vue Router 4, built with Vite. No backend, no API, no CMS. |
| **Hosting** | Local Vite dev server (`npm run dev`); ships as a static build (`npm run build`) deployable to any static host |
| **Scope** | 3 routes/views, fully self-contained, all data lives in a local JS file |
| **Target Audience** | US audiences only — electricity rate fixed at **$0.16/kWh** |
| **Launch** | This week — prototype quality |

> **Note:** This brief defines product, content, and design. The build sequence, component breakdown, and Vuetify theme mapping live in [plan.md](plan.md).

---

## 2. FICTIONAL BRAND: VOLT WATCH

| Element | Detail |
|---|---|
| **Organization Name** | Volt Watch |
| **Subtitle** | *A National Energy Awareness Initiative* |
| **Mission Line** | *"Volt Watch exists to help everyday Americans understand the hidden cost of standby power — and take back control of their energy use."* |
| **Logo Concept** | A lightning bolt icon with a subtle drip (like a vampire fang drip) — text-based is fine for prototype |
| **Footer Copy** | *"© 2025 Volt Watch Initiative. A nonprofit public awareness project. Not affiliated with any utility provider."* |

---

## 3. FILE STRUCTURE

The app is a Vite + Vue 3 single-page application. The three "pages" are Vue Router routes, not separate HTML files. See [plan.md](plan.md) for the full component-level breakdown.

```
/energy-vampire/
│
├── index.html                  ← Vite entry point (single HTML shell)
├── vite.config.js              ← Vite + Vue plugin config
├── package.json                ← Dependencies (vue, vuetify, vue-router, vite)
│
└── /src/
    │
    ├── main.js                 ← Mounts Vue, registers Vuetify + Router
    ├── App.vue                 ← Root component — contains <router-view>
    │
    ├── /plugins/
    │   ├── vuetify.js          ← Vuetify instance + Volt Watch theme
    │   └── router.js           ← Route definitions (/, /game, /tips)
    │
    ├── /data/
    │   └── devices.js          ← Device data array — the "database"
    │
    ├── /stores/
    │   └── gameStore.js        ← Reactive game state (devices, tallies)
    │
    ├── /views/                 ← One file per route
    │   ├── HomeView.vue        ← Route: /        (Homepage)
    │   ├── GameView.vue        ← Route: /game    (The Game)
    │   └── TipsView.vue        ← Route: /tips    (Ward Off Your Vampire)
    │
    ├── /components/            ← Reusable components, grouped by feature
    │   ├── /layout/            ← AppNav, AppFooter
    │   ├── /home/              ← StatCarousel, WorldImpactStats
    │   ├── /game/              ← DevicePanel, HousePanel, RoomZone, DeviceChip,
    │   │                         RoomDrawer, VampireDisplay, TallyBar, ...
    │   └── /tips/              ← QuickWinCard, DeviceTipAccordion
    │
    └── /assets/
        ├── /images/
        │   ├── vampire-1.png   ← Innocent person (State 1)
        │   ├── vampire-2.png   ← Getting suspicious (State 2)
        │   ├── vampire-3.png   ← Emerging vampire (State 3)
        │   ├── vampire-4.png   ← Full vampire (State 4)
        │   └── house.svg       ← House outline illustration
        └── /styles/
            └── global.css      ← Global overrides on top of the Vuetify theme
```

**Styling:** Vuetify's theming system carries the design tokens defined in Section 4; per-component styling lives in `<style scoped>` blocks. Device icons remain emoji for the prototype — no icon library required.

---

## 4. GLOBAL DESIGN SYSTEM

### 4.1 Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary Background | Near-black | `#0D0D0D` |
| Secondary Background | Dark grey | `#1F1F1F` |
| Panel Background | Medium dark grey | `#2A2A2A` |
| Accent / CTA | Crimson red | `#E74C3C` |
| Accent Hover | Darker red | `#C0392B` |
| Success / Savings | Emerald green | `#27AE60` |
| Warning | Amber | `#F39C12` |
| Tier — High | Red | `#E74C3C` |
| Tier — Moderate | Orange | `#F39C12` |
| Tier — Low | Yellow | `#F1C40F` |
| Primary Text | Off-white | `#ECF0F1` |
| Secondary Text | Muted gray | `#95A5A6` |
| Borders | Subtle white | `rgba(255,255,255,0.1)` |

### 4.2 Typography

| Role | Font | Style |
|---|---|---|
| Headlines | Protest Riot | Single weight — loaded from Google Fonts |
| Body & UI | Inter | Regular / Medium / SemiBold — loaded from Google Fonts |

### 4.3 Tier Badge System
Used consistently across all pages and components:

| Tier | Label | Color |
|---|---|---|
| 🔴 High | "High Drain" | Red `#E74C3C` |
| 🟠 Moderate | "Moderate" | Orange `#F39C12` |
| 🟡 Low | "Low Drain" | Yellow `#F1C40F` |

### 4.4 Animation Principles
- **Purposeful** — every animation communicates a change or reward
- **Subtle** — nothing jarring or distracting
- **Performant** — CSS transitions preferred; minimal JavaScript animation
- Key moments that get animation treatment:
  - Vampire state crossfade when wattage thresholds are crossed
  - Tally numbers counting up/down when devices are added or toggled
  - Device drop confirmation (brief highlight/pulse on the room)
  - Savings toast notification when a device is toggled to "unplugged"

### 4.5 Shared Navigation
All three pages share the same sticky navigation bar:
- **Left:** Volt Watch name/logo with lightning bolt
- **Right:** Text links — Home | Play the Game | Ward Off Your Vampire
- Dark background, thin bottom border, stays fixed at top of viewport on scroll

---

## 5. PAGE 1 — HOMEPAGE (`index.html`)

### 5.1 Page Layout (top to bottom)

```
┌─────────────────────────────────────────────────┐
│  NAV BAR                                        │
├─────────────────────────────────────────────────┤
│  SECTION 1: Hero Stat Carousel                  │
├─────────────────────────────────────────────────┤
│  SECTION 2: How This Affects the World          │
├─────────────────────────────────────────────────┤
│  SECTION 3: CTAs                                │
├─────────────────────────────────────────────────┤
│  FOOTER                                         │
└─────────────────────────────────────────────────┘
```

---

### 5.2 Section 1 — Hero Stat Carousel

**Purpose:** Immediately establish the scale of the problem with dramatic, high-impact statistics. One stat at a time commands full attention.

**Layout & Design:**
- Full-width, full-viewport-height section
- Dark dramatic background — deep charcoal with subtle atmospheric texture (fog, faint gothic pattern, or soft vignette)
- One stat card visible at a time, centered on screen
- Each card has three text elements stacked vertically:
  - **Headline Number** — very large, bold, accent color (the "wow" moment)
  - **Descriptor Line** — medium size, primary text color, 1–2 sentences
  - **Subtext Line** — smaller, secondary text color, adds emotional context
- Navigation controls sit below the card:
  - Left and right arrow buttons to manually cycle
  - Dot indicators showing which slide is active (one dot per stat, filled dot = current)
- Auto-advances every 6 seconds; pauses when user hovers over the carousel
- Transition between cards: smooth fade (opacity transition, ~400ms)

**The 5 Stat Cards:**

| # | Headline Number | Descriptor | Subtext |
|---|---|---|---|
| 1 | **$200** | The average American household wastes up to $200/year on energy they never use | Your devices are silently draining power while you sleep |
| 2 | **40+** | The average home has over 40 devices drawing phantom power right now | Even when they're "off" — they're never truly off |
| 3 | **10%** | Up to 10% of your electricity bill comes from devices doing absolutely nothing | You're paying for power you're not using — every single month |
| 4 | **$19 Billion** | Vampire power costs consumers $19 billion globally every year | A problem hiding in plain sight — in every home, in every outlet |
| 5 | **24/7** | Your cable box works as hard while you sleep as when you're watching | Some devices never rest — and your wallet feels every second of it |

---

### 5.3 Section 2 — How This Affects the World

**Purpose:** Zoom out from the personal to the global — make the user feel the collective weight of the problem.

**Layout & Design:**
- Lighter background than the hero section — warm off-white or soft gray — to create clear visual separation
- Section header: *"This Isn't Just Your Problem"*
- Four stat blocks arranged in a horizontal row (2×2 grid on tablet, single column on mobile)
- Each block contains: a large icon, a bold stat figure, and 2–3 sentences of context copy

**The 4 World Impact Blocks:**

| Icon | Stat | Context |
|---|---|---|
| 🌍 | **1% of global CO₂** | Standby power accounts for roughly 1% of worldwide carbon dioxide emissions — equivalent to the domestic flight emissions of an entire country. |
| ⚡ | **400 TWh wasted/year** | The world wastes over 400 terawatt-hours annually to standby power alone — enough electricity to power the entire state of California for a year. |
| 🏭 | **50 power plants** | The US Department of Energy estimates that standby power in America requires the equivalent output of 50 large power plants running around the clock — just to power things that are "off." |
| 🌡️ | **44 million tons of CO₂** | Phantom loads in the US generate over 44 million tons of CO₂ every year — the same as adding 9 million cars to the road. |

---

### 5.4 Section 3 — CTAs

**Purpose:** Convert the user's awareness into action — either play the game or go straight to the tips.

**Layout & Design:**
- Sits directly below the world stats, full width
- Two CTAs stacked vertically, clearly differentiated by visual weight

**CTA 1 — Primary (most prominent):**
- Large, bold button with a subtle pulse or glow animation to draw the eye
- Accent color background (crimson red)
- Headline above the button: *"Is there an energy vampire in your house?"*
- Sub-line below the headline: *"It only takes 2 minutes. The results might surprise you."*
- Button text: **"Find Out Now →"**
- Links to `game.html`

**CTA 2 — Secondary:**
- Visually subordinate — outlined button style or styled text link
- Small lead-in text: *"Already know you have a problem?"*
- Button/link text: **"Learn How to Ward Off Your Energy Vampire →"**
- Links to `tips.html`

---

### 5.5 Footer
- Dark background, centered text
- Volt Watch name + tagline
- Copyright line: *"© 2025 Volt Watch Initiative. A nonprofit public awareness project. Not affiliated with any utility provider."*
- Nav links repeated: Home | Play the Game | Ward Off Your Vampire

---

## 6. PAGE 2 — THE GAME (`game.html`)

### 6.1 Overall Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  NAV BAR                                                         │
├──────────────────────────────────────────────────────────────────┤
│  GAME HEADER: Title + instruction line                           │
├────────────────┬─────────────────────┬───────────────────────────┤
│                │                     │                           │
│  LEFT PANEL    │   CENTER PANEL      │   RIGHT SIDE              │
│  Device List   │   House Outline     │   [Vampire illustration   │
│  ~25% width    │   ~45% width        │    visible here]          │
│  (scrollable)  │                     │   ~30% width              │
│                │                     │                           │
├────────────────┴─────────────────────┴───────────────────────────┤
│  BOTTOM TALLY BAR (sticky)                                       │
└──────────────────────────────────────────────────────────────────┘
```

**Critical layout note — Vampire as full-width background:**
- The vampire illustration is positioned as a **full-width background layer** behind the entire game area
- All four vampire state images are stacked in the same position; only the active one is visible at any time
- The left and center panels sit on top of this background with their own opaque or semi-transparent backgrounds
- The right ~30% of the page is intentionally left free of UI panels so the vampire character is always fully visible
- The character figure lives on the right side of each illustration; the left portion of the illustration is atmospheric background (fog, dark sky, gothic scenery) that naturally blends behind the panels
- A short caption label sits beneath the character on the right side, updating with each transformation state

---

### 6.2 Game Header

Sits above the three-panel area, full width:
- Page title: **"Is There an Energy Vampire in Your House?"**
- Instruction line: *"Add devices to your house, then mark which ones stay plugged in when not in use. Watch what happens..."*

---

### 6.3 Left Panel — Device List

**Purpose:** The browsable catalog of all energy vampire devices, organized by room/category.

**Overall behavior:**
- Fixed-height panel, scrollable independently of the rest of the page
- Organized into collapsible category sections
- All categories start collapsed; user expands to browse
- A floating "Add Selected" button appears at the bottom of the panel when one or more devices are checked

**Category Header (per category):**
- Room icon + room name
- A small badge showing how many devices are in that category
- A collapse/expand arrow
- Clicking the header toggles the category open or closed

**Device Row (per device, inside an expanded category):**
- Checkbox on the left for multi-select
- Device icon (emoji for prototype)
- Device name
- Idle wattage shown as secondary text (e.g., *"~22W idle"*)
- Tier badge (High / Moderate / Low)
- Drag handle icon on the right edge

**Interaction — Two ways to add devices to the house:**
1. **Drag and Drop:** User grabs the drag handle and drags the device row directly onto a room in the house. The target room highlights as the device hovers over it.
2. **Checkbox + Bulk Add:** User checks one or more devices across any categories, then clicks the floating "Add Selected to House →" button. A small prompt appears asking which room to place them in (simple dropdown or room picker).

**Hovering a device row** highlights the corresponding room bucket in the house center panel to help orient the user.

**Device Categories in the Left Panel:**

| Category | Icon |
|---|---|
| Living Room | 🛋️ |
| Kitchen | 🍳 |
| Bedroom | 🛏️ |
| Home Office | 🏠 |
| Bathroom | 🚿 |
| Laundry Room | 🧺 |
| Garage & Outdoor | 🏡 |
| Whole Home | 🌐 |

---

### 6.4 Center Panel — House Outline

**Purpose:** A visual representation of the user's home where devices are placed and managed.

**Design:**
- A clean architectural cross-section illustration of a two-story house (front-facing view)
- Rooms are clearly delineated with labels
- Each room is a **drop zone** — a defined area that accepts dragged devices

**Room Drop Zone Behavior:**
- Empty rooms display a dashed outline with a faint *"+ Add devices"* prompt
- When a device is dragged over a room, the room glows or pulses to indicate it's a valid drop target
- Once a device is dropped, it appears inside the room as a small **device chip** (icon + short name)
- If a room fills up with many devices, chips stack and show a *"+N more"* overflow indicator
- Clicking anywhere inside a room opens the **Room Detail Drawer** for that room

**Room Energy Indicator:**
- Each room displays a small visual indicator (color bar or glow) reflecting its relative energy contribution
- High-tier devices cause the room to glow red; moderate = orange; low = yellow
- This updates in real time as devices are added, removed, or toggled

**Rooms in the House:**

| Room | Location in House |
|---|---|
| 🛋️ Living Room | Ground floor, main area |
| 🍳 Kitchen | Ground floor, side |
| 🛏️ Bedroom 1 | Upper floor |
| 🛏️ Bedroom 2 | Upper floor |
| 🏠 Home Office | Upper floor or ground |
| 🚿 Bathroom | Upper floor |
| 🧺 Laundry Room | Ground floor / lower level |
| 🏡 Garage | Ground floor, far side |
| 🌐 Whole Home | Special zone at base of house |

---

### 6.5 Room Detail Drawer

**Purpose:** Where the user manages the specific devices they've added to a room — quantities and plug status.

**Triggered by:** Clicking on any room in the house

**Opens as:** A slide-in drawer or modal overlay

**Contents:**
- Room name and icon as the drawer header
- A list of every device added to that room
- Per device in the drawer:
  - Device icon + name
  - **Quantity dropdown** (1–10) — *"How many do you have?"* — allows the user to account for multiple of the same device (e.g., 3 TVs)
  - **Plug status toggle** — switches between two states:
    - 🔌 **Always Plugged In** — device counts toward the energy tally
    - ✅ **Unplugged When Idle** — device is excluded from the tally; shown in a grayed-out/success state
  - Per-device energy cost shown in real time, updating as quantity and toggle change
  - A small fun fact or tip specific to that device
  - A remove (×) button to delete the device from the room
- Closing the drawer returns the user to the full house view; all changes are reflected immediately

---

### 6.6 Right Side — Vampire Transformation

**Purpose:** The emotional and visual centerpiece of the game — a character that reacts to the user's energy choices in real time.

**How it works:**
- Four versions of the illustration exist, all loaded on the page simultaneously
- Only one is visible at a time; transitions between states are smooth crossfades (~800ms)
- The active state is determined by the **total wattage of all "Always Plugged In" devices** across the entire house
- As the user adds plugged-in devices, the wattage climbs and the character transforms
- As the user toggles devices to "Unplugged," the wattage drops and the character can revert

**The 4 Transformation States:**

| State | Wattage Threshold | Character Description | Caption |
|---|---|---|---|
| **State 1** | 0 – 50W | Normal person, casual clothes, no vampire features | *"Looks harmless enough..."* |
| **State 2** | 51 – 150W | Subtle changes — pale skin, dramatic collar, tired eyes | *"Something seems... off."* |
| **State 3** | 151 – 300W | Clearly becoming a vampire — cape emerging, fangs hinting, dramatic shadows | *"Your house is feeding the vampire."* |
| **State 4** | 301W+ | Full vampire — cape, fangs, dramatic lighting, fully transformed | *"YOUR HOUSE IS FULLY HAUNTED. 🧛"* |

**Wattage thresholds** are based on realistic household standby averages and can be adjusted during development if the experience feels too easy or too hard to trigger transformations.

---

### 6.7 Bottom Tally Bar

**Purpose:** A persistent, always-visible summary of the user's energy impact — the core feedback loop of the game.

**Design:**
- Sticky bar fixed to the bottom of the viewport at all times during the game
- Dark background consistent with the overall theme
- Divided into three horizontal zones:

**Zone 1 — Device Count (left):**
- Total number of devices currently in the house (counting quantities)
- Breakdown by tier:
  - 🔴 High: [count]
  - 🟠 Moderate: [count]
  - 🟡 Low: [count]

**Zone 2 — Energy & Money (center, largest text):**
- Two rows:
  - ⚡ **Energy Wasted:** Daily / Weekly / Yearly in kWh
  - 💸 **Money Lost:** Daily / Weekly / Yearly in USD
- These are the most prominent numbers on the bar — large, bold font
- All six values update in real time as devices are added, removed, or toggled

**Zone 3 — CTA (right):**
- Button: **"Learn How to Save Energy →"**
- Links to `tips.html`

**Tally Behavior:**
- Only devices toggled to **"Always Plugged In"** count toward the tally
- Devices toggled to **"Unplugged When Idle"** are excluded — this is the core behavior-change mechanic
- When a device is toggled to unplugged, a brief **toast notification** appears above the tally bar: *"You just saved $[X]/year! ✅"*
- All numbers animate (count up or down) when values change, adding satisfying feedback
- **Calculation logic:**
  - Daily kWh per device = (idle watts × 24) ÷ 1000
  - Daily cost = daily kWh × $0.16
  - Weekly and yearly values are simple multiples of the daily figure
  - All device quantities are factored in (e.g., 3 TVs = 3× the wattage)

---

## 7. PAGE 3 — WARD OFF YOUR VAMPIRE (`tips.html`)

### 7.1 Page Purpose & Tone

This page is the **behavior change engine** of the experience. The tone shifts from playful/spooky to empowering and informative — still warm and approachable, but focused on giving users **specific, actionable steps** they can take today, this week, and long-term. The goal is to leave the user feeling capable, not guilty.

### 7.2 Page Layout (top to bottom)

```
┌──────────────────────────────────────────────────┐
│  NAV BAR                                         │
├──────────────────────────────────────────────────┤
│  HERO: "Time to Slay Your Energy Vampire"        │
├──────────────────────────────────────────────────┤
│  SECTION A: Quick Wins                           │
├──────────────────────────────────────────────────┤
│  SECTION B: Device-Specific Tips (accordions)    │
├──────────────────────────────────────────────────┤
│  SECTION C: Smarter Long-Term Habits             │
├──────────────────────────────────────────────────┤
│  SECTION D: Play Again CTA                       │
├──────────────────────────────────────────────────┤
│  FOOTER                                          │
└──────────────────────────────────────────────────┘
```

---

### 7.3 Hero

- Full-width banner, dark background consistent with the overall theme
- Headline: **"Time to Slay Your Energy Vampire"**
- Sub-headline: *"Small changes. Real savings. Here's exactly what to do."*
- Optional: a subtle atmospheric illustration or the State 1 (innocent person) vampire image used decoratively

---

### 7.4 Section A — Quick Wins: "Slay Your Vampire Today"

**Purpose:** Immediate, low-effort actions the user can take right now.

**Layout:** 6-card grid (3×2 on desktop, 2×3 on tablet, 1-col on mobile)

**Each card contains:**
- A large icon
- A bold action title
- 1–2 sentences of explanation
- A green savings callout: *"Saves up to $X/year"*

| Icon | Title | Body | Savings |
|---|---|---|---|
| 🔌 | Unplug Chargers When Not in Use | Phone, tablet, and laptop chargers draw power even with nothing attached. A small habit with a real payoff. | Up to $20/yr |
| 🔌 | Use a Smart Power Strip | One switch cuts power to your entire entertainment center — TV, cable box, console, and soundbar all at once. | Up to $50/yr |
| ⚙️ | Enable Sleep Mode on Your Computer | Reduces your computer's idle draw from 30W down to under 5W. Takes 30 seconds to set up in your system settings. | Up to $25/yr |
| 📺 | Turn Off "Quick Start" on Your TV | This feature keeps your TV warm 24/7 so it turns on a few seconds faster. It's not worth the cost. Find it in your TV's settings menu. | Up to $15/yr |
| 🎮 | Change Your Console's Power Mode | Switch from "Instant On" to "Energy Saving" in your console settings. You'll barely notice the difference at startup. | Up to $30/yr |
| 🧊 | Unplug Your Second Refrigerator | If your garage or basement fridge is mostly empty, it could be costing you $100+ per year for almost nothing. | Up to $100/yr |

---

### 7.5 Section B — Device-Specific Tips

**Purpose:** Deeper guidance organized by device category — for users who want to go further.

**Layout:** Accordion-style — each category is a collapsible row. All start collapsed. User expands the ones relevant to them.

**Each accordion section contains:**
- Category icon + name as the header
- Tier badge and average idle wattage as context
- A bulleted list of 3–5 specific tips for that device type
- A subtle link back to the game: *"See how this device affects your house →"*

| Category | Tier | Tips |
|---|---|---|
| 📺 TVs & Streaming Devices | High / Moderate | Disable Quick Start or Instant On in settings; use a smart plug on a schedule; OLED and LED TVs are far better than older plasma models; streaming sticks use less power than full set-top boxes |
| 🎮 Gaming Consoles & Entertainment | High | Switch power mode from "Instant On" to "Energy Saving"; unplug when going on vacation — consoles draw 15–40W even idle; a smart power strip covers your whole entertainment setup at once |
| 💻 Computers & Printers | High / Moderate | Enable sleep or hibernate mode; shut down fully at night rather than leaving on sleep; laser printers should be unplugged when not in regular use — the fuser element stays warm constantly |
| 🍳 Kitchen Appliances | Moderate / Low | Unplug toaster ovens, coffee makers, and microwaves when not in use — they all have always-on clocks and displays; keep-warm features on kettles and rice cookers are silent energy drains |
| 🌐 Networking & Smart Home | Moderate / Low | Your router and modem need to stay on — but audit your smart plugs, smart switches, and smart speakers; each one draws power around the clock just to listen or stay connected |
| 🧺 Laundry & Large Appliances | Moderate | Enable eco or smart modes; older machines (pre-2010) draw significantly more standby power — worth factoring in when considering an upgrade |
| 🏡 Garage & Outdoor | High | Hot tubs and pool pumps are among the biggest vampires in any home — use programmable timers to limit their run time; an older garage refrigerator that's mostly empty is rarely worth the cost |

---

### 7.6 Section C — Smarter Long-Term Habits

**Purpose:** Equip users with habits and knowledge that compound over time.

**Layout:** 3-column editorial grid on desktop, single column on mobile. Each item has a bold title, an icon, and a short paragraph.

| Icon | Habit | Detail |
|---|---|---|
| 🛒 | Shop ENERGY STAR | When replacing any appliance or device, look for the ENERGY STAR label. These products use 10–50% less standby power than standard models and are tested to meet strict efficiency guidelines. |
| 🔌 | Build a Charging Station | Consolidate all your chargers — phone, tablet, laptop, earbuds — onto one power strip. Turn it off at night. One habit handles dozens of devices automatically. |
| 🧾 | Read Your Electricity Bill | Most bills show your kWh usage month over month. Watch for months when usage spikes without an obvious reason — that's your vampire growing quietly in the background. |
| ⏱️ | Use Outlet Timers | A $10 mechanical outlet timer can automatically cut power to your entertainment center, home office setup, or garage equipment on a daily schedule — no smart home required. |
| 🔍 | Do a Home Energy Audit | Walk every room and make note of every device that has a light, a display, or feels warm when it's supposed to be "off." Each one is a vampire. The act of noticing is the first step to changing. |

---

### 7.7 Section D — Play Again CTA

**Purpose:** Close the loop — invite the user back into the game to apply what they've learned.

**Layout:** Centered, full-width section with dark background

- Headline: *"Ready to see how haunted your house really is?"*
- Body: *"Go back and add more devices — or start unplugging a few and watch your vampire shrink."*
- Button: **"← Play the Game"** — links to `game.html`

---

## 8. DEVICE DATA

### 8.1 Structure
All device data lives in a single JavaScript file (`/src/data/devices.js`) as a plain array of objects, exported as the default export. There is no database, no API, and no external dependency. This file is the single source of truth for everything the game renders and calculates.

**Total device count: 55** (14 High + 19 Moderate + 22 Low).

**Each device object contains:**

| Field | Description |
|---|---|
| `id` | Unique string identifier (e.g., `"cable-box-dvr"`) |
| `name` | Display name shown in the UI |
| `category` | Which room/category it belongs to (e.g., `"living-room"`) |
| `categoryLabel` | Human-readable category name (e.g., `"Living Room"`) |
| `tier` | `"high"`, `"moderate"`, or `"low"` |
| `wattsMin` | Low end of idle wattage range |
| `wattsMax` | High end of idle wattage range |
| `wattsDefault` | The single value used in all tally calculations |
| `icon` | Emoji used as the device icon throughout the UI |
| `funFact` | An engaging, surprising fact shown in the Room Detail Drawer |
| `tip` | A short actionable tip shown alongside the device in the drawer |

### 8.2 Full Device List

**Electricity rate constant:** `$0.16/kWh` (US average, fixed — defined once in `game.js`)

---

#### 🔴 TIER 1 — HIGH DRAIN DEVICES (10W+ idle)

| ID | Device Name | Category | Watts (Min–Max) | Default Watts | Fun Fact | Tip |
|---|---|---|---|---|---|---|
| `cable-box-dvr` | Cable / Satellite Box (DVR) | Living Room | 15–30W | 22W | Your DVR uses as much energy as a new refrigerator — even when you're not watching | Consider switching to a streaming service and eliminating the box entirely |
| `gaming-console` | Gaming Console | Living Room | 15–40W | 28W | A console in "Instant On" mode costs more per year than a month of your streaming subscription | Switch to "Energy Saving" mode in your console settings |
| `desktop-computer` | Desktop Computer | Home Office | 10–30W | 20W | Even in sleep mode, a desktop PC draws enough power to run a small LED bulb all day | Enable hibernate mode or shut down fully at night |
| `gaming-pc` | Gaming PC | Home Office | 20–40W | 30W | A gaming PC's power supply draws significant current even when the machine is idle | Use a smart plug to fully cut power when not in use |
| `home-theater-receiver` | Home Theater Receiver / Amplifier | Living Room | 15–30W | 22W | Many receivers have no true "off" state — they're always listening for a remote signal | Plug into a smart power strip that cuts with your TV |
| `laser-printer` | Laser Printer | Home Office | 15–35W | 25W | The fuser element in a laser printer stays warm around the clock — like a small space heater that never turns off | Unplug when not in regular use; it takes under a minute to warm up |
| `inkjet-printer` | Inkjet Printer | Home Office | 10–20W | 15W | Inkjet printers run maintenance cycles automatically — even at 3am — to keep the ink from drying | Unplug when not needed; plug back in a few minutes before printing |
| `old-refrigerator` | Secondary / Garage Refrigerator (older) | Garage | 10–40W | 25W | An old garage fridge running mostly empty can cost $100–$150/year in standby energy alone | If it's mostly empty, unplug it — the savings are immediate and significant |
| `washing-machine` | Washing Machine | Laundry Room | 10–20W | 15W | Your washing machine's control panel stays active and ready 24/7, even between laundry days | Unplug between uses or use a smart plug on a schedule |
| `electric-dryer` | Electric Clothes Dryer | Laundry Room | 10–20W | 15W | The control electronics in modern dryers draw continuous power even when the drum isn't turning | Unplug between uses — dryers are rarely needed more than a few times a week |
| `hot-tub` | Hot Tub / Spa | Outdoor | 100–300W | 200W | A hot tub left on standby year-round can cost $400+ annually just to maintain its temperature | Use a programmable timer to heat only before planned use |
| `pool-pump` | Pool Pump | Outdoor | 10–50W | 30W | Pool pump control boards stay energized around the clock, even when the pump itself isn't running | Use a timer to run the pump only during necessary filtration hours |
| `central-ac-unit` | Central AC Unit (control board) | Whole Home | 10–50W | 30W | Your AC's control board and thermostat interface draw power continuously, even in winter | A smart thermostat can optimize this, but the base draw is unavoidable |
| `electric-oven-range` | Electric Oven / Range | Kitchen | 10–48W | 29W | The clock, display, and control board on your oven never sleep — even if you cook once a week | Unplug if your oven is freestanding and not used daily |

---

#### 🟠 TIER 2 — MODERATE DRAIN DEVICES (3W–10W idle)

| ID | Device Name | Category | Watts (Min–Max) | Default Watts | Fun Fact | Tip |
|---|---|---|---|---|---|---|
| `smart-tv-large` | Smart TV (50"+) | Living Room | 5–10W | 7W | "Quick Start" mode keeps your TV in a semi-awake state 24/7 so it boots 2 seconds faster | Disable Quick Start in your TV's settings — it's almost always buried in the power menu |
| `smart-tv-small` | Smart TV (32"–49") | Bedroom | 3–8W | 5W | Even a bedroom TV draws power all night while you sleep just a few feet away | Plug into a smart strip or simply unplug at bedtime |
| `streaming-device` | Streaming Device (Roku / Fire Stick / Apple TV) | Living Room | 2–8W | 5W | Streaming sticks and boxes are designed to always be "on" — constantly checking for updates | Apple TV 4K draws notably more than a basic stick; unplug when the TV is off |
| `cable-modem` | Cable Modem | Whole Home | 5–8W | 6W | Your modem runs 24/7 by design — but it's one of the few devices that genuinely needs to | This one earns its keep; focus energy savings elsewhere |
| `wifi-router` | Wi-Fi Router | Whole Home | 5–10W | 7W | A mesh network with 3 nodes draws 3× the power of a single router — all day, every day | Necessary to keep on, but worth knowing it's always drawing power |
| `smart-speaker-standard` | Smart Speaker (Echo / Google Home) | Living Room | 3–7W | 5W | Your smart speaker is always listening — which means it's always drawing power, day and night | Unplug when you're away for extended periods; it reconnects instantly |
| `smart-speaker-mini` | Smart Speaker (Mini) | Bedroom | 2–4W | 3W | Even the smallest smart speakers draw power continuously to maintain their always-on listening state | Group all smart speakers on one strip you can switch off at night |
| `microwave` | Microwave Oven | Kitchen | 3–7W | 5W | The clock on your microwave uses more energy over a year than the microwave uses actually cooking | Unplug if you use it rarely; the clock is the only thing running |
| `coffee-maker-smart` | Coffee Maker (programmable / smart) | Kitchen | 2–8W | 5W | A programmable coffee maker stays alert all night waiting for its scheduled brew time | Use the timer feature — but unplug after your morning brew if you won't use it again |
| `dishwasher` | Dishwasher | Kitchen | 3–7W | 5W | Your dishwasher's control panel stays active between every wash cycle, waiting for input | Unplug between uses or run it on a schedule with a smart plug |
| `toaster-oven` | Toaster Oven | Kitchen | 3–5W | 4W | Toaster ovens with digital displays draw power continuously to keep the clock and controls ready | Unplug after use — it takes no time to plug back in |
| `garage-door-opener` | Garage Door Opener | Garage | 5–8W | 6W | Your garage door opener's radio receiver is always on, listening for your remote signal | This is a low-priority unplug — but worth knowing it never truly rests |
| `security-system` | Home Security System Panel | Whole Home | 3–10W | 6W | Your security panel draws power constantly to maintain its always-ready armed/disarmed state | This one should stay plugged in — but it's worth factoring into your total |
| `baby-monitor-video` | Baby Monitor (video) | Bedroom | 3–7W | 5W | A video baby monitor draws significantly more power than an audio-only model due to its camera and screen | Switch to audio-only when video isn't needed; unplug the parent unit when not in use |
| `cordless-phone-base` | Cordless Phone Base Station | Home Office | 3–5W | 4W | The base station for a cordless phone charges the handset and maintains a radio signal 24/7 | Consider whether you still need a landline — many households have eliminated this entirely |
| `smart-thermostat` | Smart Thermostat | Whole Home | 3–5W | 4W | Your smart thermostat draws power continuously to display the temperature and stay connected to Wi-Fi | This one earns its keep — but it's a real and constant draw |
| `ceiling-fan-smart` | Ceiling Fan (with remote / smart receiver) | Bedroom | 3–5W | 4W | The wireless receiver module inside a smart or remote-controlled ceiling fan draws power even when the fan is off | A small but real draw — multiplied across every fan in the house |
| `electric-blanket` | Electric Blanket / Heating Pad | Bedroom | 5–10W | 7W | The control unit on an electric blanket draws power even when the heat setting is at zero | Unplug after use — the control unit has no reason to stay energized |
| `treadmill` | Treadmill / Smart Exercise Equipment | Garage | 5–10W | 7W | Smart treadmills and exercise bikes maintain a Wi-Fi connection and display standby 24/7 | Unplug after workouts — the equipment will reconnect when you power it back on |

---

#### 🟡 TIER 3 — LOW DRAIN DEVICES (0.5W–3W idle)

| ID | Device Name | Category | Watts (Min–Max) | Default Watts | Fun Fact | Tip |
|---|---|---|---|---|---|---|
| `phone-charger` | Smartphone Charger (idle, no phone) | Bedroom | 0.5–2W | 1W | A charger left plugged in with no phone attached still draws power — it's just wasting it into heat | Unplug chargers when not actively charging; it's the easiest win in the house |
| `tablet-charger` | Tablet Charger (idle) | Bedroom | 1–3W | 2W | Tablet chargers draw slightly more than phone chargers when idle — and most households have several | Consolidate all chargers onto one strip you can switch off overnight |
| `laptop-charger` | Laptop Charger (idle, no laptop) | Home Office | 2–4W | 3W | The brick on your laptop charger stays warm when plugged in — that warmth is wasted electricity | Unplug the charger from the wall when your laptop is fully charged or not in use |
| `usb-wall-adapter` | USB Wall Adapter / Charging Block | Bedroom | 0.5–2W | 1W | Most homes have 10–15 USB adapters plugged into walls throughout the house — the collective draw adds up | Do a room-by-room sweep and unplug any adapter that isn't actively charging something |
| `dvd-bluray-player` | DVD / Blu-ray Player | Living Room | 1–5W | 3W | Blu-ray players maintain a standby state to respond instantly to a remote — even if you haven't used them in months | Plug into your entertainment smart strip so it cuts power with everything else |
| `soundbar` | Soundbar | Living Room | 1–5W | 3W | Soundbars with HDMI ARC stay in a listening state waiting for a signal from your TV at all times | Include in your entertainment center smart strip |
| `smart-plug` | Smart Plug / Smart Outlet | Whole Home | 1–2W | 1.5W | Smart plugs draw a small amount of power themselves to stay connected to Wi-Fi — the irony is real | Use them strategically on high-drain devices; don't put a smart plug on a low-drain device |
| `smart-doorbell` | Smart Video Doorbell | Whole Home | 2–5W | 3W | Your smart doorbell is always recording motion, always connected, and always drawing power | Hardwired models are more efficient than battery models that constantly recharge |
| `smart-light-switch` | Smart Light Switch | Whole Home | 1–2W | 1.5W | Every smart switch in your home draws a small amount of power to stay connected — multiply by 10–20 switches | A necessary trade-off for smart home convenience, but worth knowing the cost |
| `air-purifier` | Air Purifier (standby) | Bedroom | 1–3W | 2W | Air purifiers with displays and sensors draw power even in standby to monitor air quality | Run on a schedule using a timer plug rather than leaving it in permanent standby |
| `humidifier` | Humidifier / Dehumidifier | Bedroom | 1–3W | 2W | The control panel and humidity sensor on smart models stay active between cycles | Unplug when the season changes and you no longer need it |
| `clock-radio` | Clock Radio / Alarm Clock | Bedroom | 1–3W | 2W | Your clock radio draws power 24/7 — it's one of the few devices that genuinely needs to stay on | Use your phone as an alarm instead and unplug the clock radio entirely |
| `electric-razor-charger` | Electric Razor Charger | Bathroom | 1–3W | 2W | Electric razor chargers draw power even when the razor is fully charged and sitting in the dock | Unplug after charging is complete — razors only need charging every few days |
| `electric-toothbrush-charger` | Electric Toothbrush Charger | Bathroom | 3–5W | 4W | Electric toothbrush charging bases draw power continuously, even when the brush is fully charged | Unplug the base between charges — your toothbrush only needs charging every few days |
| `electric-kettle-keepwarm` | Electric Kettle (with keep-warm) | Kitchen | 1–3W | 2W | The keep-warm feature on electric kettles cycles power continuously to maintain temperature | Boil only what you need and unplug immediately after — skip the keep-warm feature |
| `instant-pot` | Slow Cooker / Instant Pot | Kitchen | 1–3W | 2W | The display and keep-warm mode on a multi-cooker draw power even hours after cooking is done | Unplug as soon as you've served your meal |
| `rice-cooker` | Rice Cooker (with keep-warm) | Kitchen | 1–3W | 2W | Keep-warm mode on rice cookers can run for hours after cooking, drawing constant low-level power | Unplug after serving — reheating rice takes only minutes if needed later |
| `smart-blender` | Blender (smart / with display) | Kitchen | 1–2W | 1.5W | Smart blenders with digital displays draw standby power to keep their controls ready | Unplug after use — basic blenders draw near zero, but smart models are different |
| `power-strip-surge` | Power Strip (with surge protection) | Whole Home | 1–2W | 1.5W | The surge protection circuitry in a power strip draws a small but constant amount of power | Use smart power strips where possible so you can cut the whole strip at once |
| `smoke-detector-plugin` | Smoke Detector (plug-in) | Whole Home | 1–2W | 1.5W | Plug-in smoke detectors draw continuous power to maintain their always-ready detection state | This one should stay plugged in — safety first |
| `co-detector-plugin` | Carbon Monoxide Detector (plug-in) | Whole Home | 1–2W | 1.5W | Like smoke detectors, CO detectors draw power around the clock — and they should | Keep this one plugged in always — it's one of the most important devices in your home |
| `hair-dryer-smart` | Hair Dryer (smart / ionic) | Bathroom | 1–3W | 2W | Smart hair dryers with heat sensors and digital controls maintain a standby circuit when plugged in | Unplug after every use — there's no reason for a hair dryer to stay connected |

---

## 9. GAME LOGIC SUMMARY

All game state lives in a single reactive store (`/src/stores/gameStore.js`) built with Vue 3's `reactive()` and `computed()` — no Pinia or Vuex. Components consume the store via a `useGameStore()` composable. Here is a plain-language description of how each system works:

### 9.1 Device Rendering
On load, `DevicePanel` imports the devices array from `/src/data/devices.js` and groups it by category. The Vuetify `v-expansion-panels` render one category section per group, and each expanded panel renders a `DeviceRow` per device. Adding or editing a device only ever requires changing `devices.js`.

### 9.2 Drag and Drop
Built using the browser's native HTML5 Drag and Drop API — no libraries needed. `DeviceRow`'s `dragstart` handler stores the device ID in the drag event's data transfer. `RoomZone`'s `drop` handler reads the ID and calls the store's `addDevice(deviceId, room)` action, which appends a new housed-device instance. Room zones highlight via Vue class bindings on `dragover`.

### 9.3 Checkbox / Bulk Add
Each `DeviceRow` emits checkbox state up to `DevicePanel`, which tracks all selected IDs in a local `reactive` array. When non-empty, a floating Vuetify action bar appears with the count and an "Add Selected" button. Clicking it opens a `v-dialog` with a room picker; on confirm, the store's `addDevice` action runs once per selected ID with the chosen room, then the selection clears.

### 9.4 Room Detail Drawer
Clicking a room emits an event up to `HousePanel`, which opens a Vuetify `v-navigation-drawer` (`RoomDrawer`) with the selected room name. The drawer filters `housedDevices` for that room and renders a `DeviceChip` per instance. Quantity changes, plug-status toggles, and removals call store actions (`updateQuantity`, `togglePlugStatus`, `removeDevice`) that mutate the store; Vue's reactivity recomputes the tallies automatically.

### 9.5 Tally Calculation
All tally values are `computed()` properties on the store. They iterate `housedDevices`, skip any instance where `pluggedIn === false`, sum `wattsDefault × quantity`, then derive daily, weekly, and yearly kWh and cost figures using the fixed `$0.16/kWh` rate constant. Because they're computed, every component bound to them updates automatically when `housedDevices` changes — no manual recalculation calls.

### 9.6 Vampire Transformation
`vampireState` is a `computed()` property that returns `1`, `2`, `3`, or `4` based on `totalWatts` and the four threshold ranges. `VampireDisplay` renders all four images stacked with absolute positioning; only the image matching `vampireState` has `opacity: 1`, the rest have `opacity: 0`. A CSS `transition` on opacity produces the crossfade — no JS animation library. The caption text is bound to the same state.

### 9.7 Toast Notifications
When `togglePlugStatus` flips an instance from plugged in to unplugged, the store writes that instance's annual savings to `lastSaving`. A Vuetify `v-snackbar` watches `lastSaving` and displays the message *"You just saved $18.40/year! ✅"* with `color="success"`, a 3-second timeout, and positioning above the tally bar.

---

## 10. OPEN ITEMS YOU CONTROL

| Item | Status | Notes |
|---|---|---|
| Vampire illustrations (4 states) | ✅ You have these | Name files `vampire-1.png` through `vampire-4.png` and place in `/assets/images/` |
| House outline illustration | ✅ Confirm you have this | SVG preferred so room zones can be overlaid precisely; PNG works too |
| Volt Watch logo / wordmark | 🔲 Simple to create | Text + ⚡ emoji works perfectly for a prototype |
| Device icons | 🔲 Optional | Emoji fallbacks work great at prototype speed — no icon library needed |
| Vampire wattage thresholds | 🔲 Tune during build | The 4 state thresholds (50W / 150W / 300W) may need adjusting once you see real interaction |

---

## 11. BUILD SEQUENCE (THIS WEEK)

High-level milestones below; the granular 45-step build order lives in [plan.md](plan.md).

| Day | Focus | Deliverable |
|---|---|---|
| **Day 1** | Foundation | Scaffold Vite + Vue 3, install Vuetify 3 + Vue Router 4, define the Volt Watch theme, build `App.vue` shell with shared `AppNav` and `AppFooter`, wire all three routes. |
| **Day 1** | Data | Complete `/src/data/devices.js` with all 55 devices — use Copilot to generate from the table above. |
| **Day 2** | Homepage | `HomeView` with `StatCarousel` (auto-advance + dot nav via `v-window`), `WorldImpactStats`, both CTAs. |
| **Day 3** | Game layout | `GameView` 3-column layout, `DevicePanel` rendering from data, `HousePanel` with `RoomZone`s, `VampireDisplay` background layer, `TallyBar` shell. |
| **Day 4** | Game logic | `gameStore.js` with all reactive state and actions, native HTML5 drag and drop, bulk-add dialog, `RoomDrawer`, tally `computed`s, vampire crossfade, savings `v-snackbar`. |
| **Day 5** | Tips page + Polish | `TipsView` with `QuickWinCard` grid, `DeviceTipAccordion`, long-term habits, replay CTA, responsive breakpoints, final visual pass, `vite build` clean. |

---

*Project Brief v1.0 — Prototype Edition | Volt Watch Initiative*
*"Know what's draining you."*

---
