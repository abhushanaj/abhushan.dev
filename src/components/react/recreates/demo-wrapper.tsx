import type { PropsWithChildren } from 'react';

function RecreatesWrapper({ children }: PropsWithChildren) {
	return <div className="border-1 rounded-md border border-ui-neutral-border p-4">{children}</div>;
}

export default RecreatesWrapper;
