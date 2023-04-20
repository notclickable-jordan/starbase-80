/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: [
		/* Built from icon.tsx */
		"bg-blue-300",
		"bg-rose-300",
		"bg-green-300",
		"bg-red-300",
		"bg-yellow-300",
		"bg-cyan-300",
		"bg-pink-300",
		"bg-orange-300",
		"bg-sky-300",
		"bg-slate-300",
		"bg-emerald-300",
		"bg-zinc-300",
		"bg-neutral-300",
		"bg-amber-300",
		"bg-violet-300",
	],
	theme: {
		extend: {
			colors: {
				bg: "#f8fafc",
				border: "#336699",
			},
		},
	},
	plugins: [],
};
