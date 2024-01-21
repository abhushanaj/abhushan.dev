import { Link } from 'lucide-react';

import type { ComponentPropsWithoutRef } from 'react';

type HeadingLevels = 'h2' | 'h3' | 'h4' | 'h5';

type Props = ComponentPropsWithoutRef<HeadingLevels> & {
	as: HeadingLevels;
};

export function Heading({ as, id, children, ...otherProps }: Props) {
	const Comp = as;

	const headingStylesMap: Record<HeadingLevels, string> = {
		h2: 'text-2xl',
		h3: 'text-xl',
		h4: 'text-lg',
		h5: 'text-base'
	};

	return (
		<Comp
			id={id}
			{...otherProps}
			className={`group relative mb-2 mt-4 cursor-pointer decoration-ui-seperator-neutral-lc decoration-1 underline-offset-4 hover:underline ${headingStylesMap[as]}`}
		>
			<a href={`#${id}`} className="inline-flex items-center gap-1">
				{children}

				<Link className="mt-1 h-[18px] w-[18px] text-text-neutral-lc opacity-0 group-hover:opacity-100" />
			</a>
		</Comp>
	);
}
