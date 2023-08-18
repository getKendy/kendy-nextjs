import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    // themes: true,
    themes: [
      {
        mytheme: {
          "primary": "#91a510",
          "secondary": "#f9da7c",
          "accent": "#82b4d8",
          "neutral": "#24282D",
          "base-100": "#4A325D",
          "info": "#599AE3",
          "success": "#13A476",
          "warning": "#C59116",
          "error": "#FA4273",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    // darkTheme: "travelDark",
  },
} satisfies Config;
