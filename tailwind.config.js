/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: [
		/* Built from icon.tsx */
		{
			pattern:
				/bg-(black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
		},
		"bg-transparent",
		"bg-black",
		"bg-white",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
