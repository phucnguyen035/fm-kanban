import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.tsx"],
	darkMode: "selector",
	theme: {
		colors: {
			black: "hsl(237, 100%, 4%)",
			white: "hsl(0, 0%, 100%)",
			primary: {
				DEFAULT: "hsl(242, 48%, 58%)",
				light: "hsl(243, 100%, 82%)",
			},
			gray: {
				darker: "hsl(235, 16%, 15%)",
				dark: "hsl(235, 12%, 19%)",
				medium: "hsl(216, 15%, 57%)",
				light: "hsl(220, 69%, 97%)",
			},
			danger: {
				DEFAULT: "hsl(0, 78%, 63%)",
				light: "hsl(0, 100%, 80%)",
			},
			lines: {
				light: "hsl(221, 69%, 94%)",
				dark: "hsl(236, 11%, 27%)",
			},
		},
		fontSize: {
			headingXL: [
				"1.5rem",
				{
					fontWeight: 700,
					lineHeight: "1.875rem",
				},
			],
			headingL: [
				"1.125rem",
				{
					fontWeight: 700,
					lineHeight: "1.4375rem",
				},
			],
			headingM: [
				"0.9375rem",
				{
					fontWeight: 700,
					lineHeight: "1.1875rem",
				},
			],
			headingS: [
				"0.75rem",
				{
					fontWeight: 700,
					lineHeight: "1rem",
					letterSpacing: "0.15rem",
				},
			],
			bodyL: [
				"0.8125rem",
				{
					fontWeight: 500,
					lineHeight: "1.4375rem",
				},
			],
			bodyM: [
				"0.75rem",
				{
					fontWeight: 700,
					lineHeight: "0.9375rem",
				},
			],
		},
		extend: {
			spacing: {
				"4.5": "1.125rem",
			},
		},
	},
} satisfies Config;
