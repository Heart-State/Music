/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "side": {
          "0%": {
            left: "-84vw"
          },
          "100%": {
            left: "0"
          }
        }, 
        "timing": {
          "0%": {
            bottom: "-45vh"
          },
          "100%": {
            bottom: "0"
          }
        },
        "mask": {
          "0%": {
            opacity: "0"
          },
          "100%": {

            opacity: "0.6"
          }
        }
      }
    },
  },
  plugins: [require("daisyui")],
}

