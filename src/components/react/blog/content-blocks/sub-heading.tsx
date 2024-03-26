import type { ComponentProps } from 'react';

type Props = ComponentProps<'span'>;

export function SubHeading({ children, ...otherProps }: Props) {
	return (
		<span
			{...otherProps}
			className="text-text-info-lc selection:text-text-info-hc selection:bg-ui-info-active-bg mt-8 block text-sm font-bold uppercase"
		>
			{children}
		</span>
	);
}
