import type { PropsWithChildren } from 'react';

function RecreatesWrapper({ children }: PropsWithChildren) {
	return <div className="min-h-[60vh] rounded-md border-2 border-ui-neutral-border p-4">{children}</div>;
}

export default RecreatesWrapper;
