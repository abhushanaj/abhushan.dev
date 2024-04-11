import { ArrowLeft } from 'lucide-react';

import type { ComponentProps } from 'react';

import { InternalLink } from '@/components/react/link/internal';

type Props = ComponentProps<typeof InternalLink>;

export function BackAction({ href, title, children, ...otherPropps }: Props) {
	return (
		<InternalLink href={href} title={title} {...otherPropps}>
			<ArrowLeft className="h-[1em] w-[1em]" />
			<span className="text-inherit">{children}</span>
		</InternalLink>
	);
}
