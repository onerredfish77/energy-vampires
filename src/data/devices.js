/**
 * Device catalog — the single source of truth for everything the game
 * renders and calculates. All wattage values are idle / standby draw.
 *
 * Categories map to rooms in the house (see brief §6.4). Outdoor devices
 * (hot tub, pool pump) are filed under "garage" to match available rooms.
 */

export const DEVICES = [
  // ─── TIER 1 — HIGH DRAIN (10W+ idle) ────────────────────────────────────
  {
    id: 'cable-box-dvr',
    name: 'Cable / Satellite Box (DVR)',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'high',
    wattsMin: 15, wattsMax: 30, wattsDefault: 22,
    icon: '📺',
    funFact: 'Your DVR uses as much energy as a new refrigerator — even when you\'re not watching.',
    tip: 'Consider switching to a streaming service and eliminating the box entirely.'
  },
  {
    id: 'gaming-console',
    name: 'Gaming Console',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'high',
    wattsMin: 15, wattsMax: 40, wattsDefault: 28,
    icon: '🎮',
    funFact: 'A console in "Instant On" mode costs more per year than a month of your streaming subscription.',
    tip: 'Switch to "Energy Saving" mode in your console settings.'
  },
  {
    id: 'desktop-computer',
    name: 'Desktop Computer',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'high',
    wattsMin: 10, wattsMax: 30, wattsDefault: 20,
    icon: '💻',
    funFact: 'Even in sleep mode, a desktop PC draws enough power to run a small LED bulb all day.',
    tip: 'Enable hibernate mode or shut down fully at night.'
  },
  {
    id: 'gaming-pc',
    name: 'Gaming PC',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'high',
    wattsMin: 20, wattsMax: 40, wattsDefault: 30,
    icon: '🖥️',
    funFact: 'A gaming PC\'s power supply draws significant current even when the machine is idle.',
    tip: 'Use a smart plug to fully cut power when not in use.'
  },
  {
    id: 'home-theater-receiver',
    name: 'Home Theater Receiver / Amplifier',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'high',
    wattsMin: 15, wattsMax: 30, wattsDefault: 22,
    icon: '🎚️',
    funFact: 'Many receivers have no true "off" state — they\'re always listening for a remote signal.',
    tip: 'Plug into a smart power strip that cuts with your TV.'
  },
  {
    id: 'laser-printer',
    name: 'Laser Printer',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'high',
    wattsMin: 15, wattsMax: 35, wattsDefault: 25,
    icon: '🖨️',
    funFact: 'The fuser element in a laser printer stays warm around the clock — like a small space heater that never turns off.',
    tip: 'Unplug when not in regular use; it takes under a minute to warm up.'
  },
  {
    id: 'inkjet-printer',
    name: 'Inkjet Printer',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'high',
    wattsMin: 10, wattsMax: 20, wattsDefault: 15,
    icon: '🖨️',
    funFact: 'Inkjet printers run maintenance cycles automatically — even at 3am — to keep the ink from drying.',
    tip: 'Unplug when not needed; plug back in a few minutes before printing.'
  },
  {
    id: 'old-refrigerator',
    name: 'Secondary / Garage Refrigerator (older)',
    category: 'garage',
    categoryLabel: 'Garage',
    tier: 'high',
    wattsMin: 10, wattsMax: 40, wattsDefault: 25,
    icon: '🧊',
    funFact: 'An old garage fridge running mostly empty can cost $100–$150/year in standby energy alone.',
    tip: 'If it\'s mostly empty, unplug it — the savings are immediate and significant.'
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    category: 'laundry-room',
    categoryLabel: 'Laundry Room',
    tier: 'high',
    wattsMin: 10, wattsMax: 20, wattsDefault: 15,
    icon: '🧺',
    funFact: 'Your washing machine\'s control panel stays active and ready 24/7, even between laundry days.',
    tip: 'Unplug between uses or use a smart plug on a schedule.'
  },
  {
    id: 'electric-dryer',
    name: 'Electric Clothes Dryer',
    category: 'laundry-room',
    categoryLabel: 'Laundry Room',
    tier: 'high',
    wattsMin: 10, wattsMax: 20, wattsDefault: 15,
    icon: '🌀',
    funFact: 'The control electronics in modern dryers draw continuous power even when the drum isn\'t turning.',
    tip: 'Unplug between uses — dryers are rarely needed more than a few times a week.'
  },
  {
    id: 'hot-tub',
    name: 'Hot Tub / Spa',
    category: 'garage',
    categoryLabel: 'Garage & Outdoor',
    tier: 'high',
    wattsMin: 100, wattsMax: 300, wattsDefault: 200,
    icon: '♨️',
    funFact: 'A hot tub left on standby year-round can cost $400+ annually just to maintain its temperature.',
    tip: 'Use a programmable timer to heat only before planned use.'
  },
  {
    id: 'pool-pump',
    name: 'Pool Pump',
    category: 'garage',
    categoryLabel: 'Garage & Outdoor',
    tier: 'high',
    wattsMin: 10, wattsMax: 50, wattsDefault: 30,
    icon: '🏊',
    funFact: 'Pool pump control boards stay energized around the clock, even when the pump itself isn\'t running.',
    tip: 'Use a timer to run the pump only during necessary filtration hours.'
  },
  {
    id: 'central-ac-unit',
    name: 'Central AC Unit (control board)',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'high',
    wattsMin: 10, wattsMax: 50, wattsDefault: 30,
    icon: '❄️',
    funFact: 'Your AC\'s control board and thermostat interface draw power continuously, even in winter.',
    tip: 'A smart thermostat can optimize this, but the base draw is unavoidable.'
  },
  {
    id: 'electric-oven-range',
    name: 'Electric Oven / Range',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'high',
    wattsMin: 10, wattsMax: 48, wattsDefault: 29,
    icon: '🍳',
    funFact: 'The clock, display, and control board on your oven never sleep — even if you cook once a week.',
    tip: 'Unplug if your oven is freestanding and not used daily.'
  },

  // ─── TIER 2 — MODERATE DRAIN (3W–10W idle) ──────────────────────────────
  {
    id: 'smart-tv-large',
    name: 'Smart TV (50"+)',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 10, wattsDefault: 7,
    icon: '📺',
    funFact: '"Quick Start" mode keeps your TV in a semi-awake state 24/7 so it boots 2 seconds faster.',
    tip: 'Disable Quick Start in your TV\'s settings — it\'s almost always buried in the power menu.'
  },
  {
    id: 'smart-tv-small',
    name: 'Smart TV (32"–49")',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 8, wattsDefault: 5,
    icon: '📺',
    funFact: 'Even a bedroom TV draws power all night while you sleep just a few feet away.',
    tip: 'Plug into a smart strip or simply unplug at bedtime.'
  },
  {
    id: 'streaming-device',
    name: 'Streaming Device (Roku / Fire Stick / Apple TV)',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'moderate',
    wattsMin: 2, wattsMax: 8, wattsDefault: 5,
    icon: '📡',
    funFact: 'Streaming sticks and boxes are designed to always be "on" — constantly checking for updates.',
    tip: 'Apple TV 4K draws notably more than a basic stick; unplug when the TV is off.'
  },
  {
    id: 'cable-modem',
    name: 'Cable Modem',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 8, wattsDefault: 6,
    icon: '📶',
    funFact: 'Your modem runs 24/7 by design — but it\'s one of the few devices that genuinely needs to.',
    tip: 'This one earns its keep; focus energy savings elsewhere.'
  },
  {
    id: 'wifi-router',
    name: 'Wi-Fi Router',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 10, wattsDefault: 7,
    icon: '🛜',
    funFact: 'A mesh network with 3 nodes draws 3× the power of a single router — all day, every day.',
    tip: 'Necessary to keep on, but worth knowing it\'s always drawing power.'
  },
  {
    id: 'smart-speaker-standard',
    name: 'Smart Speaker (Echo / Google Home)',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 7, wattsDefault: 5,
    icon: '🔈',
    funFact: 'Your smart speaker is always listening — which means it\'s always drawing power, day and night.',
    tip: 'Unplug when you\'re away for extended periods; it reconnects instantly.'
  },
  {
    id: 'smart-speaker-mini',
    name: 'Smart Speaker (Mini)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'moderate',
    wattsMin: 2, wattsMax: 4, wattsDefault: 3,
    icon: '🔉',
    funFact: 'Even the smallest smart speakers draw power continuously to maintain their always-on listening state.',
    tip: 'Group all smart speakers on one strip you can switch off at night.'
  },
  {
    id: 'microwave',
    name: 'Microwave Oven',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 7, wattsDefault: 5,
    icon: '🍿',
    funFact: 'The clock on your microwave uses more energy over a year than the microwave uses actually cooking.',
    tip: 'Unplug if you use it rarely; the clock is the only thing running.'
  },
  {
    id: 'coffee-maker-smart',
    name: 'Coffee Maker (programmable / smart)',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'moderate',
    wattsMin: 2, wattsMax: 8, wattsDefault: 5,
    icon: '☕',
    funFact: 'A programmable coffee maker stays alert all night waiting for its scheduled brew time.',
    tip: 'Use the timer feature — but unplug after your morning brew if you won\'t use it again.'
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 7, wattsDefault: 5,
    icon: '🍽️',
    funFact: 'Your dishwasher\'s control panel stays active between every wash cycle, waiting for input.',
    tip: 'Unplug between uses or run it on a schedule with a smart plug.'
  },
  {
    id: 'toaster-oven',
    name: 'Toaster Oven',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 5, wattsDefault: 4,
    icon: '🍞',
    funFact: 'Toaster ovens with digital displays draw power continuously to keep the clock and controls ready.',
    tip: 'Unplug after use — it takes no time to plug back in.'
  },
  {
    id: 'garage-door-opener',
    name: 'Garage Door Opener',
    category: 'garage',
    categoryLabel: 'Garage',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 8, wattsDefault: 6,
    icon: '🚪',
    funFact: 'Your garage door opener\'s radio receiver is always on, listening for your remote signal.',
    tip: 'This is a low-priority unplug — but worth knowing it never truly rests.'
  },
  {
    id: 'security-system',
    name: 'Home Security System Panel',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 10, wattsDefault: 6,
    icon: '🛡️',
    funFact: 'Your security panel draws power constantly to maintain its always-ready armed/disarmed state.',
    tip: 'This one should stay plugged in — but it\'s worth factoring into your total.'
  },
  {
    id: 'baby-monitor-video',
    name: 'Baby Monitor (video)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 7, wattsDefault: 5,
    icon: '👶',
    funFact: 'A video baby monitor draws significantly more power than an audio-only model due to its camera and screen.',
    tip: 'Switch to audio-only when video isn\'t needed; unplug the parent unit when not in use.'
  },
  {
    id: 'cordless-phone-base',
    name: 'Cordless Phone Base Station',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 5, wattsDefault: 4,
    icon: '☎️',
    funFact: 'The base station for a cordless phone charges the handset and maintains a radio signal 24/7.',
    tip: 'Consider whether you still need a landline — many households have eliminated this entirely.'
  },
  {
    id: 'smart-thermostat',
    name: 'Smart Thermostat',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 5, wattsDefault: 4,
    icon: '🌡️',
    funFact: 'Your smart thermostat draws power continuously to display the temperature and stay connected to Wi-Fi.',
    tip: 'This one earns its keep — but it\'s a real and constant draw.'
  },
  {
    id: 'ceiling-fan-smart',
    name: 'Ceiling Fan (with remote / smart receiver)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'moderate',
    wattsMin: 3, wattsMax: 5, wattsDefault: 4,
    icon: '💨',
    funFact: 'The wireless receiver module inside a smart or remote-controlled ceiling fan draws power even when the fan is off.',
    tip: 'A small but real draw — multiplied across every fan in the house.'
  },
  {
    id: 'electric-blanket',
    name: 'Electric Blanket / Heating Pad',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 10, wattsDefault: 7,
    icon: '🛌',
    funFact: 'The control unit on an electric blanket draws power even when the heat setting is at zero.',
    tip: 'Unplug after use — the control unit has no reason to stay energized.'
  },
  {
    id: 'treadmill',
    name: 'Treadmill / Smart Exercise Equipment',
    category: 'garage',
    categoryLabel: 'Garage',
    tier: 'moderate',
    wattsMin: 5, wattsMax: 10, wattsDefault: 7,
    icon: '🏃',
    funFact: 'Smart treadmills and exercise bikes maintain a Wi-Fi connection and display standby 24/7.',
    tip: 'Unplug after workouts — the equipment will reconnect when you power it back on.'
  },

  // ─── TIER 3 — LOW DRAIN (0.5W–3W idle) ──────────────────────────────────
  {
    id: 'phone-charger',
    name: 'Smartphone Charger (idle, no phone)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 0.5, wattsMax: 2, wattsDefault: 1,
    icon: '📱',
    funFact: 'A charger left plugged in with no phone attached still draws power — it\'s just wasting it into heat.',
    tip: 'Unplug chargers when not actively charging; it\'s the easiest win in the house.'
  },
  {
    id: 'tablet-charger',
    name: 'Tablet Charger (idle)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '📲',
    funFact: 'Tablet chargers draw slightly more than phone chargers when idle — and most households have several.',
    tip: 'Consolidate all chargers onto one strip you can switch off overnight.'
  },
  {
    id: 'laptop-charger',
    name: 'Laptop Charger (idle, no laptop)',
    category: 'home-office',
    categoryLabel: 'Home Office',
    tier: 'low',
    wattsMin: 2, wattsMax: 4, wattsDefault: 3,
    icon: '🔋',
    funFact: 'The brick on your laptop charger stays warm when plugged in — that warmth is wasted electricity.',
    tip: 'Unplug the charger from the wall when your laptop is fully charged or not in use.'
  },
  {
    id: 'usb-wall-adapter',
    name: 'USB Wall Adapter / Charging Block',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 0.5, wattsMax: 2, wattsDefault: 1,
    icon: '🔌',
    funFact: 'Most homes have 10–15 USB adapters plugged into walls throughout the house — the collective draw adds up.',
    tip: 'Do a room-by-room sweep and unplug any adapter that isn\'t actively charging something.'
  },
  {
    id: 'dvd-bluray-player',
    name: 'DVD / Blu-ray Player',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'low',
    wattsMin: 1, wattsMax: 5, wattsDefault: 3,
    icon: '💿',
    funFact: 'Blu-ray players maintain a standby state to respond instantly to a remote — even if you haven\'t used them in months.',
    tip: 'Plug into your entertainment smart strip so it cuts power with everything else.'
  },
  {
    id: 'soundbar',
    name: 'Soundbar',
    category: 'living-room',
    categoryLabel: 'Living Room',
    tier: 'low',
    wattsMin: 1, wattsMax: 5, wattsDefault: 3,
    icon: '🔊',
    funFact: 'Soundbars with HDMI ARC stay in a listening state waiting for a signal from your TV at all times.',
    tip: 'Include in your entertainment center smart strip.'
  },
  {
    id: 'smart-plug',
    name: 'Smart Plug / Smart Outlet',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '🔌',
    funFact: 'Smart plugs draw a small amount of power themselves to stay connected to Wi-Fi — the irony is real.',
    tip: 'Use them strategically on high-drain devices; don\'t put a smart plug on a low-drain device.'
  },
  {
    id: 'smart-doorbell',
    name: 'Smart Video Doorbell',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 2, wattsMax: 5, wattsDefault: 3,
    icon: '🔔',
    funFact: 'Your smart doorbell is always recording motion, always connected, and always drawing power.',
    tip: 'Hardwired models are more efficient than battery models that constantly recharge.'
  },
  {
    id: 'smart-light-switch',
    name: 'Smart Light Switch',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '💡',
    funFact: 'Every smart switch in your home draws a small amount of power to stay connected — multiply by 10–20 switches.',
    tip: 'A necessary trade-off for smart home convenience, but worth knowing the cost.'
  },
  {
    id: 'air-purifier',
    name: 'Air Purifier (standby)',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '🌬️',
    funFact: 'Air purifiers with displays and sensors draw power even in standby to monitor air quality.',
    tip: 'Run on a schedule using a timer plug rather than leaving it in permanent standby.'
  },
  {
    id: 'humidifier',
    name: 'Humidifier / Dehumidifier',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '💧',
    funFact: 'The control panel and humidity sensor on smart models stay active between cycles.',
    tip: 'Unplug when the season changes and you no longer need it.'
  },
  {
    id: 'clock-radio',
    name: 'Clock Radio / Alarm Clock',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '⏰',
    funFact: 'Your clock radio draws power 24/7 — it\'s one of the few devices that genuinely needs to stay on.',
    tip: 'Use your phone as an alarm instead and unplug the clock radio entirely.'
  },
  {
    id: 'electric-razor-charger',
    name: 'Electric Razor Charger',
    category: 'bathroom',
    categoryLabel: 'Bathroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '🪒',
    funFact: 'Electric razor chargers draw power even when the razor is fully charged and sitting in the dock.',
    tip: 'Unplug after charging is complete — razors only need charging every few days.'
  },
  {
    id: 'electric-toothbrush-charger',
    name: 'Electric Toothbrush Charger',
    category: 'bathroom',
    categoryLabel: 'Bathroom',
    tier: 'low',
    wattsMin: 3, wattsMax: 5, wattsDefault: 4,
    icon: '🪥',
    funFact: 'Electric toothbrush charging bases draw power continuously, even when the brush is fully charged.',
    tip: 'Unplug the base between charges — your toothbrush only needs charging every few days.'
  },
  {
    id: 'electric-kettle-keepwarm',
    name: 'Electric Kettle (with keep-warm)',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '🫖',
    funFact: 'The keep-warm feature on electric kettles cycles power continuously to maintain temperature.',
    tip: 'Boil only what you need and unplug immediately after — skip the keep-warm feature.'
  },
  {
    id: 'instant-pot',
    name: 'Slow Cooker / Instant Pot',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '🍲',
    funFact: 'The display and keep-warm mode on a multi-cooker draw power even hours after cooking is done.',
    tip: 'Unplug as soon as you\'ve served your meal.'
  },
  {
    id: 'rice-cooker',
    name: 'Rice Cooker (with keep-warm)',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '🍚',
    funFact: 'Keep-warm mode on rice cookers can run for hours after cooking, drawing constant low-level power.',
    tip: 'Unplug after serving — reheating rice takes only minutes if needed later.'
  },
  {
    id: 'smart-blender',
    name: 'Blender (smart / with display)',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '🥤',
    funFact: 'Smart blenders with digital displays draw standby power to keep their controls ready.',
    tip: 'Unplug after use — basic blenders draw near zero, but smart models are different.'
  },
  {
    id: 'power-strip-surge',
    name: 'Power Strip (with surge protection)',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '🔌',
    funFact: 'The surge protection circuitry in a power strip draws a small but constant amount of power.',
    tip: 'Use smart power strips where possible so you can cut the whole strip at once.'
  },
  {
    id: 'smoke-detector-plugin',
    name: 'Smoke Detector (plug-in)',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '🚨',
    funFact: 'Plug-in smoke detectors draw continuous power to maintain their always-ready detection state.',
    tip: 'This one should stay plugged in — safety first.'
  },
  {
    id: 'co-detector-plugin',
    name: 'Carbon Monoxide Detector (plug-in)',
    category: 'whole-home',
    categoryLabel: 'Whole Home',
    tier: 'low',
    wattsMin: 1, wattsMax: 2, wattsDefault: 1.5,
    icon: '⚠️',
    funFact: 'Like smoke detectors, CO detectors draw power around the clock — and they should.',
    tip: 'Keep this one plugged in always — it\'s one of the most important devices in your home.'
  },
  {
    id: 'hair-dryer-smart',
    name: 'Hair Dryer (smart / ionic)',
    category: 'bathroom',
    categoryLabel: 'Bathroom',
    tier: 'low',
    wattsMin: 1, wattsMax: 3, wattsDefault: 2,
    icon: '💇',
    funFact: 'Smart hair dryers with heat sensors and digital controls maintain a standby circuit when plugged in.',
    tip: 'Unplug after every use — there\'s no reason for a hair dryer to stay connected.'
  }
]

/**
 * Categories used across the device catalog and the house layout.
 * Order here is the order they render in the device panel.
 */
export const CATEGORIES = [
  { id: 'living-room',  label: 'Living Room',  icon: '🛋️' },
  { id: 'kitchen',      label: 'Kitchen',      icon: '🍳' },
  { id: 'bedroom',      label: 'Bedroom',      icon: '🛏️' },
  { id: 'home-office',  label: 'Home Office',  icon: '🏠' },
  { id: 'bathroom',     label: 'Bathroom',     icon: '🚿' },
  { id: 'laundry-room', label: 'Laundry Room', icon: '🧺' },
  { id: 'garage',       label: 'Garage & Outdoor', icon: '🏡' },
  { id: 'whole-home',   label: 'Whole Home',   icon: '🌐' }
]

export default DEVICES
