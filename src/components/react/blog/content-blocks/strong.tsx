import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'strong'>;

export function Strong({ children, ...otherProps }: Props) {
	return (
		<strong className="font-medium text-text-neutral-hc" {...otherProps}>
			{children}
		</strong>
	);
}
