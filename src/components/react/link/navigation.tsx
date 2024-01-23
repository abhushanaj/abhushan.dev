import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'a'> & {
	title: string;
	active?: boolean;
};

export function NavLink({ title, children, href, active = false, ...otherProps }: Props) {
	if (!title || !title.trim().length) {
		throw new Error('Add a title attribute on the <InternalLink title="" />');
	}

	const activeClassName = 'text-text-neutral-hc underline decoration-ui-seperator-neutral-hc';
	const inActiveClassName = 'text-text-neutral-lc decoration-ui-seperator-neutral-lc ';

	return (
		<a
			href={href}
			title={title}
			className={`ring-offset-app-bg underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ui-neutral-focus-ring focus-visible:ring-offset-2 ${active ? activeClassName : inActiveClassName} `}
			{...otherProps}
		>
			{children}
		</a>
	);
}
