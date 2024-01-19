import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
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
			medium: 'var(--font-medium)',
			bold: 'var(--font-bold)',

			'mono-light': 'var(--font-light)',
			'mono-medium': 'var(--font-medium)'
		},
		fontFamily: {
			sans: ['var(--font-sans)', 'var(--font-sans-fallback)', ...defaultTheme.fontFamily.sans],
			mono: ['var(--font-mono)', 'var(--font-mono-fallback)', ...defaultTheme.fontFamily.mono]
		}
	},
	plugins: []
};

export default config;
