import type { ComponentProps } from 'react';

import { ExternalLink } from '@/components/react/link/external';
import { InternalLink } from '@/components/react/link/internal';

import { BlockQuote, BlockQuoteError } from './block-quote';
import { Heading } from './heading';
import { InlineCode } from './inline-code';
import { Paragraph } from './paragraph';
import { Strong } from './strong';

type PolymorphicHeadingProps = Omit<ComponentProps<typeof Heading>, 'as'>;

export const components = {
	h2: (props: PolymorphicHeadingProps) => <Heading as="h2" {...props} />,
	h3: (props: PolymorphicHeadingProps) => <Heading as="h3" {...props} />,
	h4: (props: PolymorphicHeadingProps) => <Heading as="h4" {...props} />,
	h5: (props: PolymorphicHeadingProps) => <Heading as="h5" {...props} />,
	p: Paragraph,
	b: Strong,
	strong: Strong,
	blockquote: BlockQuoteError,
	BlockQuote,
	a: InternalLink,
	InternalLink,
	ExternalLink,
	InlineCode
};
