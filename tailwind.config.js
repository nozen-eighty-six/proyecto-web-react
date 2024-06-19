/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx, ts, tsx}"],
  theme: {
    extend: {},
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hyphens-auto": {
          hyphens: "auto",
          "-webkit-hyphens": "auto",
          "-ms-hyphens": "auto",
        },
        ".min-h-75": {
          minHeight: "75vh",
        },
        ".min-h-70": {
          minHeight: "60vh",
        },

        ".min-vh-50": {
          height: "50vh",
        },
        ".min-vh-60": {
          height: "60vh",
        },
        ".min-vh-70": {
          height: "75vh",
        },
        ".min-vh-80": {
          height: "80vh",
        },

        ".w-90": {
          width: "90%",
        },
        ".h-90": {
          height: "45%",
        },
        ".mb-18": {
          marginBottom: "4.5rem",
        },
        ".top-vh-15": {
          top: "15vh",
        },
        ".left-63": {
          left: "250px",
        },
        ".m-l-63": {
          marginLeft: "250px",
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
