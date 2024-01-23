import { Sun } from 'lucide-react';

import type { MouseEvent } from 'react';

export function ThemeToogle() {
	function setThemeTo(mode: 'light' | 'dark') {
		const htmlDocument = document.documentElement;

		htmlDocument.setAttribute('data-theme', mode);
		localStorage.setItem('abhushan.dev:theme', mode);
	}

	function toggleTheme(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		try {
			const currentTheme = localStorage.getItem('abhushan.dev:theme');
			// existed in local storage
			if (currentTheme !== null) {
				setThemeTo(currentTheme === 'dark' ? 'light' : 'dark');
			}
			// never existed in storage
			else {
				setThemeTo('dark');
			}
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<button
			className="focus---page-navbar-height ring-offset-app-bg inline-flex items-center justify-center rounded-md bg-ui-neutral-bg px-2 py-2 outline-none ring-ui-neutral-focus-ring hover:bg-ui-neutral-hovered-bg focus-visible:bg-ui-neutral-focus-ring focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-ui-neutral-active-bg"
			onClick={toggleTheme}
		>
			<Sun className="h-[1em] w-[1em]" />
		</button>
	);
}
