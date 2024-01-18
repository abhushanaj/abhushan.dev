import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'a'> & {
	title: string;
};

export function InternalLink({ href, children, title, className, ...otherProps }: Props) {
	if (!title || !title.trim().length) {
		throw new Error('Add a title attribute on the <InternalLink title="" />');
	}

	return (
		<a
			href={href}
			title={title}
			className={`text-inherit inline-flex items-center gap-1 rounded-sm underline decoration-ui-seperator-neutral-lc underline-offset-4 hover:text-text-neutral-hc focus-visible:ring-2 focus-visible:ring-ui-neutral-focus-ring focus-visible:ring-offset-2 ${className}`}
			{...otherProps}
		>
			{children}
		</a>
	);
}
