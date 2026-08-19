/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        paper: 'var(--paper)',
        card: 'var(--card)',
        line: 'var(--line)',
        muted: 'var(--muted)',
        amber: 'var(--amber)',
        'amber-dark': 'var(--amber-dark)',
        green: 'var(--green)',
        'green-dark': 'var(--green-dark)',
        red: 'var(--red)',
        'red-dark': 'var(--red-dark)',
      }
    },
  },
  plugins: [],
}
