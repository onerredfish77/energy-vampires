import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const voltWatchTheme = {
  dark: true,
  colors: {
    background: '#0D0D0D',
    surface: '#1F1F1F',
    primary: '#E74C3C',
    secondary: '#2A2A2A',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#F1C40F',
    'on-background': '#ECF0F1',
    'on-surface': '#ECF0F1'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'voltWatch',
    themes: { voltWatch: voltWatchTheme }
  },
  defaults: {
    VBtn: { style: 'text-transform: none; letter-spacing: 0;' }
  }
})
