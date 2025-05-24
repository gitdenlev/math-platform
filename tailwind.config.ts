import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        emerald: {
          600: "#16A34A", // Main website color
        },
      },
    },
  },
  plugins: [],
};
