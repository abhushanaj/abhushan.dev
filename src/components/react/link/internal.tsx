import type { ComponentPropsWithoutRef } from 'react';

type LinkVariants = 'lowContrast' | 'highContrast';

type Props = ComponentPropsWithoutRef<'a'> & {
	title: string;
	variant?: LinkVariants;
};

const linkVariantClassMap: Record<LinkVariants, string> = {
	lowContrast:
		'text-text-neutral-lc hover:text-text-neutral-hc underline underline-offset-4 decoration-ui-seperator-neutral-lc',
	highContrast:
		'text-text-neutral-hc underline underline-offset-4 decoration-ui-seperator-neutral-lc hover:decoration-ui-seperator-neutral-hc'
};

export function InternalLink({ href, children, title, variant = 'lowContrast', className = '', ...otherProps }: Props) {
	if (!title || !title.trim().length) {
		throw new Error('Add a title attribute on the <InternalLink title="" />');
	}

	const variantClassNames = linkVariantClassMap[variant];

	return (
		<a
			href={href}
			title={title}
			className={`text-inherit inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-ui-neutral-focus-ring focus-visible:ring-offset-2 ${variantClassNames} ${className}`}
			{...otherProps}
		>
			{children}
		</a>
	);
}
