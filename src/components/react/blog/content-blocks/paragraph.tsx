import type { ComponentProps } from 'react';

type Props = ComponentProps<'p'>;

export function Paragraph({ children, ...otherProps }: Props) {
	return (
		<p className="mb-4" {...otherProps}>
			{children}
		</p>
	);
}
