import { keepTheme } from "keep-react/keepTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3FA2F6",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default keepTheme(config);
