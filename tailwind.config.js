/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)'
			},
			fontFamily: {
				montserrat: ['var(--font-montserrat)'],
				antonio: ['var(--font-antonio)']
			}
		}
	},
	plugins: []
};
