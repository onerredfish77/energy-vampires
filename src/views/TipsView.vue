<template>
  <div class="tips-view">
    <!-- Hero -->
    <section class="tips-hero">
      <v-container class="text-center">
        <h1 class="tips-headline">Time to Slay Your Energy Vampire</h1>
        <p class="tips-subhead">Small changes. Real savings. Here's exactly what to do.</p>
      </v-container>
    </section>

    <!-- Section A — Quick Wins -->
    <section class="tips-section">
      <v-container>
        <h2 class="section-title">Slay Your Vampire Today</h2>
        <p class="section-sub">Six things you can do in the next ten minutes.</p>
        <v-row>
          <v-col
            v-for="(win, i) in quickWins"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <QuickWinCard v-bind="win" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section B — Device-Specific Tips -->
    <section class="tips-section tips-section--alt">
      <v-container>
        <h2 class="section-title">Dig Deeper: Tips by Device</h2>
        <p class="section-sub">Expand a category to see the specific moves that matter most.</p>
        <DeviceTipAccordion :categories="deviceTipCategories" />
      </v-container>
    </section>

    <!-- Section C — Long-term habits -->
    <section class="tips-section">
      <v-container>
        <h2 class="section-title">Smarter Long-Term Habits</h2>
        <p class="section-sub">Five habits that compound over time.</p>
        <v-row>
          <v-col
            v-for="(habit, i) in habits"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="habit-card" color="surface" :elevation="1" height="100%">
              <div class="habit-icon">{{ habit.icon }}</div>
              <v-card-title class="habit-title">{{ habit.title }}</v-card-title>
              <v-card-text class="habit-body">{{ habit.body }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section D — Play again CTA -->
    <section class="tips-cta">
      <v-container class="text-center">
        <h2 class="cta-headline">Ready to see how haunted your house really is?</h2>
        <p class="cta-body">
          Go back and add more devices — or start unplugging a few and watch your vampire shrink.
        </p>
        <v-btn
          to="/game"
          color="primary"
          size="x-large"
          :elevation="6"
        >
          <v-icon icon="mdi-arrow-left" start />
          Play the Game
        </v-btn>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import QuickWinCard from '@/components/tips/QuickWinCard.vue'
import DeviceTipAccordion from '@/components/tips/DeviceTipAccordion.vue'

const quickWins = [
  {
    icon: '🔌',
    title: 'Unplug Chargers When Not in Use',
    body: 'Phone, tablet, and laptop chargers draw power even with nothing attached. A small habit with a real payoff.',
    savings: '$20/yr'
  },
  {
    icon: '🔌',
    title: 'Use a Smart Power Strip',
    body: 'One switch cuts power to your entire entertainment center — TV, cable box, console, and soundbar all at once.',
    savings: '$50/yr'
  },
  {
    icon: '⚙️',
    title: 'Enable Sleep Mode on Your Computer',
    body: "Reduces your computer's idle draw from 30W down to under 5W. Takes 30 seconds in your system settings.",
    savings: '$25/yr'
  },
  {
    icon: '📺',
    title: 'Turn Off "Quick Start" on Your TV',
    body: "This feature keeps your TV warm 24/7 so it turns on a few seconds faster. It's not worth the cost.",
    savings: '$15/yr'
  },
  {
    icon: '🎮',
    title: "Change Your Console's Power Mode",
    body: 'Switch from "Instant On" to "Energy Saving" in your console settings. You\'ll barely notice the difference.',
    savings: '$30/yr'
  },
  {
    icon: '🧊',
    title: 'Unplug Your Second Refrigerator',
    body: 'If your garage or basement fridge is mostly empty, it could be costing you $100+ per year for almost nothing.',
    savings: '$100/yr'
  }
]

const deviceTipCategories = [
  {
    id: 'tv',
    icon: '📺',
    name: 'TVs & Streaming Devices',
    tier: 'High / Moderate',
    wattsHint: '5–22W idle',
    tips: [
      'Disable Quick Start or Instant On in settings',
      'Use a smart plug on a schedule',
      'OLED and LED TVs are far better than older plasma models',
      'Streaming sticks use less power than full set-top boxes'
    ]
  },
  {
    id: 'gaming',
    icon: '🎮',
    name: 'Gaming Consoles & Entertainment',
    tier: 'High',
    wattsHint: '15–40W idle',
    tips: [
      'Switch power mode from "Instant On" to "Energy Saving"',
      'Unplug when going on vacation — consoles draw 15–40W even idle',
      'A smart power strip covers your whole entertainment setup at once'
    ]
  },
  {
    id: 'computers',
    icon: '💻',
    name: 'Computers & Printers',
    tier: 'High / Moderate',
    wattsHint: '10–30W idle',
    tips: [
      'Enable sleep or hibernate mode',
      'Shut down fully at night rather than leaving on sleep',
      'Laser printers should be unplugged when not in regular use — the fuser stays warm constantly'
    ]
  },
  {
    id: 'kitchen',
    icon: '🍳',
    name: 'Kitchen Appliances',
    tier: 'Moderate / Low',
    wattsHint: '1–7W idle',
    tips: [
      'Unplug toaster ovens, coffee makers, and microwaves when not in use — they all have always-on clocks and displays',
      'Keep-warm features on kettles and rice cookers are silent energy drains'
    ]
  },
  {
    id: 'network',
    icon: '🌐',
    name: 'Networking & Smart Home',
    tier: 'Moderate / Low',
    wattsHint: '1–10W idle',
    tips: [
      'Your router and modem need to stay on — but audit your smart plugs, switches, and speakers',
      'Each smart device draws power around the clock just to listen or stay connected'
    ]
  },
  {
    id: 'laundry',
    icon: '🧺',
    name: 'Laundry & Large Appliances',
    tier: 'Moderate',
    wattsHint: '10–20W idle',
    tips: [
      'Enable eco or smart modes',
      'Older machines (pre-2010) draw significantly more standby power — worth factoring in when considering an upgrade'
    ]
  },
  {
    id: 'outdoor',
    icon: '🏡',
    name: 'Garage & Outdoor',
    tier: 'High',
    wattsHint: '10–300W idle',
    tips: [
      'Hot tubs and pool pumps are among the biggest vampires in any home — use programmable timers',
      'An older garage refrigerator that\'s mostly empty is rarely worth the cost'
    ]
  }
]

const habits = [
  {
    icon: '🛒',
    title: 'Shop ENERGY STAR',
    body: 'When replacing any appliance or device, look for the ENERGY STAR label. These products use 10–50% less standby power than standard models.'
  },
  {
    icon: '🔌',
    title: 'Build a Charging Station',
    body: 'Consolidate all your chargers — phone, tablet, laptop, earbuds — onto one power strip. Turn it off at night. One habit handles dozens of devices automatically.'
  },
  {
    icon: '🧾',
    title: 'Read Your Electricity Bill',
    body: 'Most bills show your kWh usage month over month. Watch for spikes without an obvious reason — that\'s your vampire growing quietly in the background.'
  },
  {
    icon: '⏱️',
    title: 'Use Outlet Timers',
    body: 'A $10 mechanical outlet timer can automatically cut power to your entertainment center, home office setup, or garage equipment on a daily schedule.'
  },
  {
    icon: '🔍',
    title: 'Do a Home Energy Audit',
    body: 'Walk every room. Note every device with a light, a display, or warmth when it\'s "off." Each one is a vampire. The act of noticing is the first step to changing.'
  }
]
</script>

<style scoped>
.tips-view {
  background: #0D0D0D;
}
.tips-hero {
  padding: 5rem 0 4rem;
  background: linear-gradient(135deg, #0D0D0D 0%, #1F1F1F 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.tips-headline {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 900;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  color: #ECF0F1;
  margin: 0 0 1rem;
  line-height: 1.1;
}
.tips-subhead {
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  color: #95A5A6;
  margin: 0;
  font-style: italic;
}
.tips-section {
  padding: 4rem 0;
}
.tips-section--alt {
  background: rgba(42, 42, 42, 0.15);
}
.section-title {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: #ECF0F1;
  text-align: center;
  margin: 0 0 0.5rem;
}
.section-sub {
  text-align: center;
  color: #95A5A6;
  font-size: 1rem;
  margin: 0 0 2.5rem;
  font-style: italic;
}
.habit-card {
  padding: 1.5rem 1rem;
  text-align: center;
}
.habit-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.habit-title {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-size: 1.15rem;
  font-weight: 700;
  white-space: normal;
  line-height: 1.3;
}
.habit-body {
  color: #95A5A6;
  font-size: 0.9rem;
  line-height: 1.5;
}
.tips-cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.08) 0%, rgba(42, 42, 42, 0.2) 100%);
  border-top: 1px solid rgba(231, 76, 60, 0.2);
}
.cta-headline {
  font-family: 'Protest Riot', Impact, Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: #ECF0F1;
  margin: 0 0 1rem;
}
.cta-body {
  color: #95A5A6;
  font-size: 1.05rem;
  margin: 0 0 2rem;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}
</style>
