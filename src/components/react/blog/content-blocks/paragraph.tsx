import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'p'>;

export function Paragraph({ children, ...otherProps }: Props) {
	return (
		<p className="mb-4" {...otherProps}>
			{children}
		</p>
	);
}
