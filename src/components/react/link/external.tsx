import { ArrowUpRight } from 'lucide-react';

import type { ComponentProps } from 'react';

import { InternalLink } from './internal.tsx';

type Props = ComponentProps<typeof InternalLink>;

export function ExternalLink({ children, href, title, ...otherProps }: Props) {
	if (!title || !title.trim().length) {
		throw new Error('Add a title attribute on the <ExternalLink title="" />');
	}

	return (
		<InternalLink href={href} title={title} target="_blank" rel="nopener noreferrer" {...otherProps}>
			<ArrowUpRight className="mt-[1px] h-[1.2em] w-[1.2em]" />
			<span className="text-inherit">{children}</span>
		</InternalLink>
	);
}
