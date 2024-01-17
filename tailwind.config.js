/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
	theme: {
		colors: {
			currentColor: 'currentColor',
			transparent: 'transparent',
			'text-neutral-lc': 'var(--text-neutral-lc)',
			'text-neutral-hc': 'var(--text-neutral-hc)',

			'ui-neutral-bg': 'var(--ui-neutral-bg)',
			'ui-neutral-hovered-bg': 'var(--ui-neutral-hovered-bg)',
			'ui-neutral-active-bg': 'var(--ui-neutral-active-bg)',
			'ui-neutral-focus-ring': 'var(--ui-neutral-focus-ring)',
			'ui-neutral-border': 'var(--ui-neutral-border)',
			'ui-neutral-hovered-border': 'var(--ui-neutral-hovered-border)',

			'ui-seperator-neutral-lc': 'var(--ui-seperator-neutral-lc)',
			'ui-seperator-neutral-hc': 'var(--ui-seperator-neutral-hc)'
		},
		fontWeight: {
			light: 'var(--font-light)',
			regular: 'var(--font-regular)',
			medium: 'var(--font-medium)',
			semibold: 'var(--font-semibold)',
			bold: 'var(--font-bold)'
		}
	},
	plugins: []
};
