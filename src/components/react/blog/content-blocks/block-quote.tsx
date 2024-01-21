import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'blockquote'> & {
	cite?: string;
	citationSource?: string;
	content: string;
	symbol?: string;
};

export function BlockQuote({
	cite = 'Anonymous',
	citationSource = undefined,
	content,
	symbol = '‘‘',
	...otherProps
}: Props) {
	return (
		<blockquote
			cite={citationSource}
			className="mb-6 border-l-4 border-ui-neutral-border pb-1 pl-3 pt-6"
			{...otherProps}
		>
			<p className={`before:text-2xl before:content-["${symbol}"]`}>{content}</p>
			<footer className="mt-6 text-sm italic">
				— <cite>{cite}</cite>
			</footer>
		</blockquote>
	);
}

export function BlockQuoteError() {
	throw new Error('Use the <BlockQuote/> implementation directly in MDX content ');
}
