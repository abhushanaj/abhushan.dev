import { ExternalLink } from '@/components/react/link/external';
import { InternalLink } from '@/components/react/link/internal';

import { Paragraph } from './paragraph';
import { Strong } from './strong';

export const components = {
	p: Paragraph,
	b: Strong,
	strong: Strong,
	a: InternalLink,
	InternalLink,
	ExternalLink
};
