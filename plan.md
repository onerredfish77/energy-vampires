# 🧛 Energy Vampire: Is There One in Your House?
## Technical Build Brief — Copilot Working Document (Vue.js + Vuetify + Material Design)

---

## HOW TO USE THIS BRIEF

Each section below represents a discrete building block of the project. Work through them **in order** — later steps depend on earlier ones being in place. Each step is written as a **Copilot-ready instruction** you can paste or paraphrase directly into the chat. Complete and verify each step before moving to the next.

---

## TECHNOLOGY STACK

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | Vue.js 3 (Composition API) | Reactive component-based architecture |
| **Component Library** | Vuetify 3 | Pre-built Material Design components |
| **Design Language** | Material Design 3 | Visual system, spacing, elevation, motion |
| **State Management** | Vue `reactive` / `ref` (built-in) | Game state — no external library needed |
| **Routing** | Vue Router 4 | Navigation between the three pages |
| **Build Tool** | Vite | Fast local dev server and build |
| **Styling** | Vuetify theming + scoped CSS | Custom theme layered on top of Vuetify |
| **Drag and Drop** | Native HTML5 DnD API | No extra library needed |
| **Data** | Local JS data file | No API, no CMS, no backend |

---

## FILE STRUCTURE

```
/energy-vampire/
│
├── index.html                  ← Vite entry point
├── vite.config.js              ← Vite + Vue plugin config
├── package.json                ← Dependencies
│
├── /src/
│   │
│   ├── main.js                 ← App entry — mounts Vue, registers Vuetify, Router
│   ├── App.vue                 ← Root component — contains <router-view>
│   │
│   ├── /plugins/
│   │   ├── vuetify.js          ← Vuetify instance + custom theme definition
│   │   └── router.js           ← Vue Router route definitions
│   │
│   ├── /data/
│   │   └── devices.js          ← Device data array — the "database"
│   │
│   ├── /stores/
│   │   └── gameStore.js        ← Reactive game state (devices in house, tallies)
│   │
│   ├── /views/
│   │   ├── HomeView.vue        ← Page 1: Homepage
│   │   ├── GameView.vue        ← Page 2: The Game
│   │   └── TipsView.vue        ← Page 3: Ward Off Your Vampire
│   │
│   ├── /components/
│   │   ├── /layout/
│   │   │   ├── AppNav.vue      ← Shared navigation bar
│   │   │   └── AppFooter.vue   ← Shared footer
│   │   │
│   │   ├── /home/
│   │   │   ├── StatCarousel.vue       ← Hero stat carousel
│   │   │   └── WorldImpactStats.vue   ← 4-block world impact section
│   │   │
│   │   ├── /game/
│   │   │   ├── DevicePanel.vue        ← Left panel — device list
│   │   │   ├── DeviceCategory.vue     ← Collapsible category section
│   │   │   ├── DeviceRow.vue          ← Individual device row
│   │   │   ├── HousePanel.vue         ← Center panel — house outline
│   │   │   ├── RoomZone.vue           ← Individual room drop zone
│   │   │   ├── DeviceChip.vue         ← Device chip inside a room
│   │   │   ├── RoomDrawer.vue         ← Room detail slide-in drawer
│   │   │   ├── VampireDisplay.vue     ← Vampire illustration + transformation
│   │   │   └── TallyBar.vue           ← Sticky bottom tally bar
│   │   │
│   │   └── /tips/
│   │       ├── QuickWinCard.vue       ← Individual quick win card
│   │       └── DeviceTipAccordion.vue ← Device-specific tips accordion
│   │
│   └── /assets/
│       ├── /images/
│       │   ├── vampire-1.png
│       │   ├── vampire-2.png
│       │   ├── vampire-3.png
│       │   ├── vampire-4.png
│       │   └── house.svg
│       └── /styles/
│           └── global.css      ← Global overrides on top of Vuetify theme
```

---

## VUETIFY THEME DEFINITION

The custom Volt Watch theme is defined once in `vuetify.js` and applied globally. All components inherit from it automatically.

| Role | Token Name | Value |
|---|---|---|
| Primary (CTA, accent) | `primary` | `#E74C3C` |
| Secondary (panels, nav) | `secondary` | `#0F3460` |
| Background | `background` | `#1A1A2E` |
| Surface (cards, drawers) | `surface` | `#16213E` |
| Success (savings, unplugged) | `success` | `#27AE60` |
| Warning (moderate tier) | `warning` | `#F39C12` |
| Error (high tier) | `error` | `#E74C3C` |
| Info (low tier) | `info` | `#F1C40F` |
| On-background text | `on-background` | `#ECF0F1` |
| On-surface text | `on-surface` | `#ECF0F1` |

**Typography:**
- Headlines: Playfair Display (loaded via Google Fonts, mapped to Vuetify's `display` and `headline` type roles)
- Body / UI: Inter (mapped to Vuetify's `body` and `button` type roles)

**Material Design Elevation:**
- Use Vuetify's built-in elevation system (`elevation` prop) on cards, drawers, and the tally bar
- Nav bar: `elevation-4`
- Game panels: `elevation-2`
- Tally bar: `elevation-8` (highest — it sits above everything)
- Cards: `elevation-1` default, `elevation-4` on hover

---

## GAME STATE — `gameStore.js`

All game state lives in a single reactive store using Vue's `reactive()`. No Pinia or Vuex needed for this scope.

**State shape:**

| Property | Type | Description |
|---|---|---|
| `housedDevices` | Array | All device instances currently placed in the house |
| `totalWatts` | Number | Computed — sum of all plugged-in device watts × quantity |
| `vampireState` | Number (1–4) | Computed — derived from totalWatts thresholds |
| `tallyDaily` | Object | Computed — `{ kwh, cost }` for daily totals |
| `tallyWeekly` | Object | Computed — `{ kwh, cost }` for weekly totals |
| `tallyYearly` | Object | Computed — `{ kwh, cost }` for yearly totals |
| `deviceCounts` | Object | Computed — `{ total, high, moderate, low }` |
| `lastSaving` | Number | Annual saving from the most recent unplug toggle — drives toast |

**Each item in `housedDevices`:**

| Property | Type | Description |
|---|---|---|
| `instanceId` | String | Unique ID for this specific placed instance |
| `deviceId` | String | Reference back to the source device in `devices.js` |
| `room` | String | Which room this instance lives in |
| `quantity` | Number | 1–10 |
| `pluggedIn` | Boolean | True = counts toward tally; False = excluded |

---

## PHASE 1 — PROJECT FOUNDATION

---

### STEP 1 — Scaffold the Vite + Vue 3 Project

Initialize a new Vite project with the Vue 3 template. Install Vuetify 3, Vue Router 4, and the Vuetify Vite plugin. Confirm the dev server runs and displays the default Vue welcome screen before proceeding.

---

### STEP 2 — Configure Vuetify

Create the Vuetify plugin file. Define the custom Volt Watch dark theme using the color tokens defined in the theme table above. Set the default theme to the custom theme. Register the Google Fonts import for Playfair Display and Inter. Register the Vuetify plugin in `main.js`.

---

### STEP 3 — Configure Vue Router

Create the router plugin file. Define three routes: `/` mapping to `HomeView`, `/game` mapping to `GameView`, and `/tips` mapping to `TipsView`. Register the router in `main.js`. Add `<router-view>` to `App.vue`.

---

### STEP 4 — Build the App Shell (`App.vue`)

Set up `App.vue` as the root layout using Vuetify's `v-app` wrapper. Include `AppNav` at the top, `<router-view>` in the main content area, and `AppFooter` at the bottom. Apply the global background color from the theme.

---

### STEP 5 — Build the Shared Navigation (`AppNav.vue`)

Build the navigation bar using Vuetify's `v-app-bar` component. Place the Volt Watch name and lightning bolt icon on the left using `v-toolbar-title`. Place navigation links on the right using `v-btn` components with `variant="text"` and `router-link` directives pointing to the three routes. Apply `elevation-4` and the secondary theme color as the bar background.

---

### STEP 6 — Build the Shared Footer (`AppFooter.vue`)

Build the footer using Vuetify's `v-footer` component. Include the Volt Watch copyright line and repeated navigation links as `v-btn` text buttons. Center the content and apply the surface theme color as the background.

---

## PHASE 2 — DEVICE DATA & GAME STATE

---

### STEP 7 — Create the Device Data File

Create `devices.js` in `/src/data/` as an exported JavaScript array of objects. Each object represents one device with the fields: `id`, `name`, `category`, `categoryLabel`, `tier`, `wattsMin`, `wattsMax`, `wattsDefault`, `icon`, `funFact`, and `tip`. Populate all devices across all tiers and categories as defined in the project brief. Export the array as the default export.

---

### STEP 8 — Create the Game Store

Create `gameStore.js` in `/src/stores/` using Vue's `reactive()`. Define the `housedDevices` array and all computed properties for `totalWatts`, `vampireState`, `tallyDaily`, `tallyWeekly`, `tallyYearly`, `deviceCounts`, and `lastSaving` using Vue's `computed()`. Export the store as a composable function (`useGameStore`) so any component can import and use it. Include the fixed electricity rate constant (`$0.16/kWh`) in this file.

---

### STEP 9 — Validate the Data and Store

Import the devices array and the game store into the browser console temporarily. Confirm all 55 device objects have every required field. Add one test device to `housedDevices` manually and confirm all computed tally values update correctly. Remove the test data before proceeding.

---

## PHASE 3 — HOMEPAGE

---

### STEP 10 — Build the Homepage View Shell (`HomeView.vue`)

Create the `HomeView.vue` file. Use Vuetify's `v-container` and `v-row` / `v-col` layout system to define the three sections: hero carousel, world impact stats, and CTAs. Import and place the `StatCarousel` and `WorldImpactStats` child components as placeholders. Apply the primary background color to the full view.

---

### STEP 11 — Build the Stat Carousel (`StatCarousel.vue`)

Build the hero carousel component. Define the five stat cards as a local data array within the component. Use a `v-window` component (Vuetify's built-in carousel/slider primitive) to display one card at a time with smooth transitions. Each card should display the headline number, descriptor, and subtext using Vuetify typography classes (`text-h1`, `text-h5`, `text-body-1`). Add previous/next `v-btn` icon buttons and `v-window-item` dot indicators. Implement auto-advance using a `setInterval` in the component's `onMounted` lifecycle hook, with pause on hover.

---

### STEP 12 — Build the World Impact Stats (`WorldImpactStats.vue`)

Build the world impact section using a Vuetify `v-row` with four `v-col` columns. Each column contains a `v-card` with the icon, bold stat figure, and context copy. Use `v-card-title` and `v-card-text` for structure. Apply a lighter surface color to the cards to visually separate this section from the dark hero above. Use `elevation-2` on the cards.

---

### STEP 13 — Build the Homepage CTAs

Add the two CTA blocks to `HomeView.vue` below the world impact stats. The primary CTA should use a full-width `v-card` or `v-sheet` with the primary theme color, a large headline using `text-h3`, sub-line text, and a `v-btn` with `size="x-large"` and `color="primary"` linking to `/game` via `router-link`. The secondary CTA should use a `v-btn` with `variant="outlined"` linking to `/tips`.

---

## PHASE 4 — GAME PAGE LAYOUT

---

### STEP 14 — Build the Game View Shell (`GameView.vue`)

Create `GameView.vue`. Set up the overall page layout using a `v-container fluid` with a `v-row` that has three columns matching the panel widths (left ~25%, center ~45%, right ~30%). Import and place `DevicePanel`, `HousePanel`, and `VampireDisplay` as column children. Place `TallyBar` outside the row at the bottom. Import and use the game store. Apply `position: relative` to the game area to support the vampire background layer.

---

### STEP 15 — Build the Vampire Background Layer (`VampireDisplay.vue`)

Build the vampire display component. Load all four vampire images. Stack them using absolute positioning so they occupy the same space. Only the image matching the current `vampireState` from the game store should have `opacity: 1`; all others should have `opacity: 0`. Apply a CSS `transition` on opacity for the crossfade effect. Display the caption text below the character that updates with each state. This component sits in the right column but its image spans behind the panels via absolute/fixed positioning and z-index layering.

---

### STEP 16 — Build the Device Panel Shell (`DevicePanel.vue`)

Build the left panel as a `v-card` with a fixed height and `overflow-y: auto` for independent scrolling. Import the devices data array. Group devices by category. Render a `DeviceCategory` component for each category group, passing the category name, icon, and its list of devices as props. Add the floating bulk-add action bar at the bottom of the panel — hidden by default, visible when one or more devices are checked.

---

### STEP 17 — Build the Device Category (`DeviceCategory.vue`)

Build the collapsible category component using Vuetify's `v-expansion-panels` and `v-expansion-panel`. The panel header should show the category icon, category name, and a `v-badge` with the device count. The panel body should render a `DeviceRow` component for each device in the category. All panels start collapsed.

---

### STEP 18 — Build the Device Row (`DeviceRow.vue`)

Build the individual device row component. Accept a device object as a prop. Display a `v-checkbox`, the device emoji icon, device name, idle wattage as secondary text, and a tier `v-chip` with the appropriate color. Add a drag handle icon on the right. Set the row element as `draggable="true"` and attach `dragstart` event handling that stores the device ID. Emit a `checked` event to the parent when the checkbox state changes.

---

### STEP 19 — Build the House Panel Shell (`HousePanel.vue`)

Build the center panel as a `v-card` containing the house SVG or image. Use absolute positioning to overlay `RoomZone` components on top of the house image, one per room. Pass each room's name, icon, and current devices (filtered from the game store) as props to each `RoomZone`. Attach click handlers to each zone that open the `RoomDrawer` for that room.

---

### STEP 20 — Build the Room Zone (`RoomZone.vue`)

Build the individual room drop zone component. Accept room name, icon, and housed devices list as props. Display the room label and an empty-state prompt when no devices are present. Render a `DeviceChip` for each device in the room (with overflow handling for many devices). Attach `dragover` and `drop` event handlers — `dragover` should highlight the zone and `drop` should emit an event to the parent with the device ID and room name. Apply a color glow based on the highest-tier device currently in the room.

---

### STEP 21 — Build the Device Chip (`DeviceChip.vue`)

Build the device chip component that appears inside a room zone. Accept a housed device instance as a prop. Display the device icon and short name. Include a `v-select` for quantity (1–10) and a `v-switch` for plug status (Always Plugged In / Unplugged When Idle). Include a remove `v-btn` icon button. Emit events to the game store when quantity changes, plug status toggles, or the device is removed. Use a `v-tooltip` to show the full device name and fun fact on hover.

---

### STEP 22 — Build the Room Detail Drawer (`RoomDrawer.vue`)

Build the room detail drawer using Vuetify's `v-navigation-drawer` with `location="right"` and `temporary` mode. It should open when triggered from `HousePanel` and receive the selected room name as a prop. Display the full list of device chips for that room using the `DeviceChip` component in an expanded list view. Include the device fun fact and tip below each chip. Close cleanly via a close button or clicking outside without losing any state.

---

### STEP 23 — Build the Tally Bar (`TallyBar.vue`)

Build the sticky tally bar using a `v-footer` with `app` and `elevation-8` props so it stays fixed at the bottom of the viewport above all other content. Divide it into three zones using `v-row` and `v-col`. Left zone: total device count and tier breakdown using `v-chip` components for each tier. Center zone: two rows of energy and money figures using large `text-h5` or `text-h4` typography for the yearly values and smaller text for daily and weekly. Right zone: a `v-btn` with `color="primary"` linking to `/tips`. All values are bound reactively to the game store's computed tally properties.

---

## PHASE 5 — GAME INTERACTIVITY

---

### STEP 24 — Wire Up Drag and Drop

Complete the drag and drop flow end to end. In `DeviceRow`, the `dragstart` handler should store the dragged device's ID in the drag event's data transfer object. In `RoomZone`, the `drop` handler should read the device ID from the data transfer, call the game store's add-device action with the device ID and room name, and clear the drag highlight state. Confirm a device dragged from the left panel appears as a chip in the correct room.

---

### STEP 25 — Wire Up Checkbox Bulk Add

Complete the bulk add flow. `DeviceRow` emits its checked state up through `DeviceCategory` to `DevicePanel`. `DevicePanel` tracks all checked device IDs in a local reactive array. When the array is non-empty, show the floating action bar with the count and add button. Clicking the button opens a `v-dialog` with a `v-select` listing all rooms. On confirm, call the game store's add-device action for each checked device ID with the selected room, then clear all checkboxes.

---

### STEP 26 — Wire Up the Game Store Actions

Implement the four core game store actions that all components call: `addDevice(deviceId, room)` — creates a new housed device instance and pushes it to `housedDevices`; `removeDevice(instanceId)` — removes the instance from `housedDevices`; `updateQuantity(instanceId, quantity)` — updates the quantity on the matching instance; `togglePlugStatus(instanceId)` — flips the `pluggedIn` boolean and updates `lastSaving`. All computed tally values should update automatically via Vue's reactivity when `housedDevices` changes.

---

### STEP 27 — Animate the Tally Numbers

Add animated number transitions to the tally bar values. Use a watcher on each computed tally value that runs a short count-up or count-down animation when the value changes. The animation should complete in under 600ms. Vuetify's built-in transition utilities or a simple `requestAnimationFrame` loop are both appropriate here.

---

### STEP 28 — Build the Toast Notification

Use Vuetify's `v-snackbar` component to display the savings toast. Watch the `lastSaving` value in the game store. When it changes to a non-zero value (triggered by a device being toggled to unplugged), display the snackbar with the message *"You just saved $[X]/year! ✅"*. Set the snackbar timeout to 3000ms and position it above the tally bar. Use `color="success"` for the snackbar.

---

### STEP 29 — Build the Room Energy Indicators

After each tally recalculation, evaluate each room's energy contribution in the game store. Expose a computed property that returns the highest tier present in each room. In `RoomZone`, bind a dynamic CSS class or Vuetify `color` prop based on the room's highest tier — red for high, orange for moderate, yellow for low, neutral for empty or all-unplugged. This should update reactively without any manual DOM manipulation.

---

### STEP 30 — Wire Up the Vampire Transformation

Confirm the `vampireState` computed property in the game store is correctly deriving state 1–4 from the `totalWatts` value using the defined thresholds (0–50W, 51–150W, 151–300W, 301W+). In `VampireDisplay`, bind the active image and caption text to `vampireState` reactively. Confirm the CSS crossfade transition fires correctly when the state changes. Test by adding and removing devices to verify all four states are reachable and reversible.

---

## PHASE 6 — TIPS PAGE

---

### STEP 31 — Build the Tips View Shell (`TipsView.vue`)

Create `TipsView.vue`. Use Vuetify's `v-container` and layout system to define the four sections: hero, quick wins, device tips accordion, long-term habits, and play again CTA. Import and place `QuickWinCard` and `DeviceTipAccordion` child components as placeholders.

---

### STEP 32 — Build the Tips Page Hero

Add the hero section to `TipsView.vue` using a `v-sheet` or `v-card` with a full-width dark background. Display the headline using `text-h2` and the sub-headline using `text-h6`. Apply consistent dark theme styling.

---

### STEP 33 — Build the Quick Win Cards (`QuickWinCard.vue`)

Build the quick win card component using a Vuetify `v-card`. Accept icon, title, body, and savings amount as props. Display the icon prominently at the top, title as `v-card-title`, body as `v-card-text`, and savings as a `v-chip` with `color="success"`. Apply `elevation-2` default and `elevation-6` on hover using Vuetify's hover state. Render six instances in a `v-row` with `v-col` using the quick win content from the project brief.

---

### STEP 34 — Build the Device Tips Accordion (`DeviceTipAccordion.vue`)

Build the device tips accordion using Vuetify's `v-expansion-panels` component. Each `v-expansion-panel` represents one device category. The panel header shows the category icon and name. The panel body contains a `v-list` of tips, a tier `v-chip` with wattage context, and a `router-link` back to `/game`. Set `accordion` mode so only one panel is open at a time. All panels start collapsed.

---

### STEP 35 — Build the Long-Term Habits Section

Add the long-term habits section to `TipsView.vue`. Use a `v-row` with three `v-col` columns on desktop. Each habit item uses a `v-card` with an icon, bold title via `v-card-title`, and descriptive paragraph via `v-card-text`. Apply `elevation-1` to the cards.

---

### STEP 36 — Build the Play Again CTA

Add the closing CTA section to the bottom of `TipsView.vue`. Use a full-width `v-sheet` with a dark background, a centered headline, body text, and a `v-btn` with `color="primary"` and `size="x-large"` using `router-link` to navigate back to `/game`.

---

## PHASE 7 — RESPONSIVE DESIGN

---

### STEP 37 — Make the Homepage Responsive

Use Vuetify's responsive column props (`cols`, `sm`, `md`, `lg`) on the world impact stats grid to collapse from 4 columns to 2 on tablet and 1 on mobile. Reduce carousel headline font sizes on smaller screens using Vuetify's display utility classes. Ensure CTA buttons are full-width on mobile.

---

### STEP 38 — Make the Game Page Responsive

On tablet breakpoint, move the device panel into a `v-navigation-drawer` triggered by a `v-btn` toggle button. On mobile, stack all panels vertically using Vuetify's column breakpoint props. Render the vampire image as a fixed-height banner at the top of the mobile layout rather than a full-height background. The tally bar should remain sticky and visible at all breakpoints.

---

### STEP 39 — Make the Tips Page Responsive

Use Vuetify's responsive column props on the quick wins grid (3 cols desktop → 2 cols tablet → 1 col mobile) and the long-term habits grid (3 cols → 1 col). Ensure accordion items are full-width at all sizes. Confirm all cards have appropriate padding on small screens.

---

## PHASE 8 — FINAL POLISH & TESTING

---

### STEP 40 — Audit All Routing and Navigation

Confirm all `router-link` directives and programmatic `router.push()` calls navigate to the correct routes. Test the full user journey in both directions: Home → Game → Tips → Game. Confirm the browser back button works correctly with Vue Router's history mode.

---

### STEP 41 — Audit the Game Store and Tally Calculations

Manually add a known set of devices with specific quantities and plug states. Verify the tally bar values match hand-calculated expected figures. Toggle devices in and out and confirm the store updates correctly in both directions. Confirm `vampireState` transitions at the correct wattage thresholds.

---

### STEP 42 — Audit Component Reactivity

Confirm that all components that consume the game store are updating reactively without requiring manual refresh. Check that adding a device in the left panel immediately updates the house, the tally bar, and the vampire state. Check that toggling a device chip immediately updates the tally and triggers the toast.

---

### STEP 43 — Cross-Browser Check

Open the built prototype in Chrome, Firefox, Safari, and Edge. Check for layout issues, font rendering differences, drag and drop behavior, CSS transition smoothness, and any Vue or Vuetify console warnings. Pay particular attention to the vampire crossfade and tally animation across browsers.

---

### STEP 44 — Final Visual Pass

Review all three views against the Vuetify theme definition. Confirm consistent use of elevation, color tokens, typography scale, spacing, tier badge colors, button variants, and hover states. Confirm the dark theme is applied uniformly and no default light-mode Vuetify styles are bleeding through.

---

### STEP 45 — Remove Development Artifacts

Remove the Step 9 data validation console checks. Remove any test data, `console.log` statements, commented-out code, and placeholder content. Run `vite build` to confirm the project compiles cleanly with no errors or warnings before the final prototype review.

---

*Technical Brief v2.0 | Volt Watch Initiative*
*Vue 3 + Vuetify 3 + Material Design | 45 steps — build in order, test as you go.*