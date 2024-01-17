/** @type {import("prettier").Config} */
export default {
	// due to pnpm issues, plugin does not read from her for astro and needs to be passed as CLI option
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

	// General
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	printWidth: 120,
	trailingComma: 'none',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',

	// jsx specific
	quoteProps: 'as-needed',
	jsxSingleQuote: false,

	// tailwind specific
	tailwindAttributes: ['class:list'],
	tailwindFunctions: ['cn', 'clsx', 'cls'],

	// Astro specific
	astroAllowShorthand: false,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	]
};
