import type { ComponentProps } from 'react';

type Props = ComponentProps<'strong'>;

export function Strong({ children, ...otherProps }: Props) {
	return (
		<strong className="font-medium text-text-neutral-hc" {...otherProps}>
			{children}
		</strong>
	);
}
