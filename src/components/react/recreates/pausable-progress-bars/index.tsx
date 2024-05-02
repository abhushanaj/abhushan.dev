import React from 'react';

import type { ComponentPropsWithoutRef } from 'react';

function ProgressBar({ progress }: { progress: number }) {
	return (
		<div className="h-4 w-full bg-ui-neutral-bg">
			<div className="h-full bg-ui-info-active-bg" style={{ width: `${Math.min(progress, 100)}%` }} />
		</div>
	);
}

function Button({ children, className, ...otherProps }: ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			className={`rounded-md bg-ui-neutral-bg px-2 py-2 text-text-neutral-hc hover:bg-ui-neutral-hovered-bg disabled:cursor-wait disabled:opacity-50 ${className}`}
			{...otherProps}
		>
			{children}
		</button>
	);
}

const INITIAL_PROGRESS = [0];
const MAX_CONCURRENCY = 3;

function PausableProgressBars() {
	const [progress, setProgress] = React.useState(INITIAL_PROGRESS);
	const [isRunning, setIsRunning] = React.useState(false);

	const timerRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);

	const addBar = React.useCallback(() => {
		setProgress((prev) => {
			const updatedProgress = prev.slice(0);
			updatedProgress.push(0);
			return updatedProgress;
		});
	}, []);

	const start = React.useCallback(() => {
		setIsRunning(true);

		timerRef.current = setInterval(() => {
			setProgress((prev) => {
				const mappedProgress = prev.map((p, index) => ({
					progress: p,
					index
				}));

				const filteredProgress = mappedProgress.filter((p) => {
					return p.progress < 100;
				});

				const concurrentBars = filteredProgress.slice(0, MAX_CONCURRENCY);

				const updatedBars = prev.slice(0);

				for (const { index } of concurrentBars) {
					updatedBars[index] = updatedBars[index]! + 0.5;
				}

				return updatedBars;
			});
		}, 20);
	}, []);

	const stop = React.useCallback(() => {
		setIsRunning(false);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const reset = React.useCallback(() => {
		stop();
		setProgress(INITIAL_PROGRESS);
	}, [stop]);

	React.useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	return (
		<div className="flex max-h-96 flex-col gap-5 overflow-auto">
			{/* Progress Controls */}
			<div className="flex gap-4">
				<Button onClick={addBar}>Add</Button>
				<Button onClick={isRunning ? stop : start}>{isRunning ? 'Stop' : 'Start'}</Button>
				<Button onClick={reset}>Reset</Button>
			</div>

			{/* Progress Bars Listing */}
			<div className="flex flex-col gap-4">
				{progress.map((p, index) => (
					<ProgressBar progress={p} key={index} />
				))}
			</div>
		</div>
	);
}

export default PausableProgressBars;
