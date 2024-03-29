import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
	theme: {
		colors: {
			currentColor: 'currentColor',
			transparent: 'transparent',
			'app-bg': 'var(--app-bg)',

			'text-neutral-lc': 'var(--text-neutral-lc)',
			'text-neutral-hc': 'var(--text-neutral-hc)',

			'text-info-lc': 'var(--text-info-lc)',
			'text-info-hc': 'var(--text-info-hc)',

			'ui-neutral-bg': 'var(--ui-neutral-bg)',
			'ui-neutral-hovered-bg': 'var(--ui-neutral-hovered-bg)',
			'ui-neutral-active-bg': 'var(--ui-neutral-active-bg)',
			'ui-neutral-focus-ring': 'var(--ui-neutral-focus-ring)',
			'ui-neutral-border': 'var(--ui-neutral-border)',
			'ui-neutral-hovered-border': 'var(--ui-neutral-hovered-border)',

			'ui-info-bg': 'var(--ui-info-bg)',
			'ui-info-hovered-bg': 'var(--ui-info-hovered-bg)',
			'ui-info-active-bg': 'var(--ui-info-active-bg)',
			'ui-info-focus-ring': 'var(--ui-info-focus-ring)',
			'ui-info-border': 'var(--ui-info-border)',
			'ui-info-hovered-border': 'var(--ui-info-hovered-border)',

			'ui-seperator-neutral-lc': 'var(--ui-seperator-neutral-lc)',
			'ui-seperator-neutral-hc': 'var(--ui-seperator-neutral-hc)'
		},
		fontWeight: {
			light: 'var(--font-light)',
			medium: 'var(--font-medium)',
			bold: 'var(--font-bold)',

			'mono-medium': 'var(--font-mono-medium)'
		},
		fontFamily: {
			sans: defaultTheme.fontFamily.sans,
			mono: ['var(--font-mono)', 'var(--font-mono-fallback)', ...defaultTheme.fontFamily.mono]
		},
		extend: {
			spacing: {
				'page-content-width': 'var(--page-content-width)',
				'primary-content-width': 'var(--primary-content-width)',
				'page-top': 'var(--page-top)',
				'body-space-left': 'var(--body-space-left)',
				'body-space-right': 'var(--body-space-right)'
			},
			height: {
				footer: 'var(--page-footer-height)',
				navbar: 'var(--page-navbar-height)'
			}
		}
	},
	plugins: []
};

export default config;
