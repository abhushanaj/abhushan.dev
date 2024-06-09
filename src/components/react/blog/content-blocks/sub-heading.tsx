import type { ComponentProps } from 'react';

type Props = ComponentProps<'span'>;

export function SubHeading({ children, ...otherProps }: Props) {
	return (
		<span
			{...otherProps}
			className="mt-8 block text-sm font-bold uppercase text-text-info-lc selection:bg-ui-info-active-bg selection:text-text-info-hc"
		>
			{children}
		</span>
	);
}
