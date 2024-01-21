import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'code'> & { code: string };

export function InlineCode({ code, ...otherProps }: Props) {
	return (
		<code className="rounded-sm bg-ui-neutral-bg px-[8px] py-[2px] font-medium text-text-neutral-hc" {...otherProps}>
			{code}
		</code>
	);
}
