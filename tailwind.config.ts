import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
    require("daisyui"),
    "tailwindcss",
    "autoprefixer",
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
}
export default config
