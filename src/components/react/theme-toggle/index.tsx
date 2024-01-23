import { Sun } from 'lucide-react';

export function ThemeToogle() {
	return (
		<button className="focus---page-navbar-height ring-offset-app-bg inline-flex items-center justify-center rounded-md bg-ui-neutral-bg px-2 py-2 outline-none ring-ui-neutral-focus-ring hover:bg-ui-neutral-hovered-bg focus-visible:bg-ui-neutral-focus-ring focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-ui-neutral-active-bg">
			<Sun className="h-[1em] w-[1em]" />
		</button>
	);
}
