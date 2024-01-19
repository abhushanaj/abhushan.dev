import type { ComponentPropsWithoutRef } from 'react';

type ListTypes = 'ul' | 'ol';

type ListProps = ComponentPropsWithoutRef<'ul'> & {
	as: ListTypes;
};

export function List({ as, children, ...otherProps }: ListProps) {
	const Comp = as || 'ul';

	return (
		<Comp
			className={`mb-6 flex list-outside flex-col gap-2 pl-6 ${as === 'ul' ? 'list-disc' : 'list-decimal'}`}
			{...otherProps}
		>
			{children}
		</Comp>
	);
}
