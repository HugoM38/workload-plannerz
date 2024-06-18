// src/plugins/vuetify.ts

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#0F8B8D",
          secondary: "#BDEDE0",
          accent: "#1B2F33",
          onAccent: "#FFFFFF",
          surface: "#FFFFFF",
          onPrimary: "#FFFFFF",
        },
      },
    },
  },
});
