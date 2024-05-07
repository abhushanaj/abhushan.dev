import React, { useRef } from 'react';

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
const INITIAL_CONCURRENCY_COUNT = 3;
const INITIAL_DURATION = 1000;

function PausableProgressBars() {
	const [progress, setProgress] = React.useState(INITIAL_PROGRESS);
	const [isRunning, setIsRunning] = React.useState(false);

	const timerRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);

	const concurrencyInputRef = useRef<HTMLInputElement>(null);
	const durationInputRef = useRef<HTMLInputElement>(null);

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

				let concurrencyCount = INITIAL_CONCURRENCY_COUNT;

				if (concurrencyInputRef.current) {
					concurrencyCount = concurrencyInputRef.current.valueAsNumber;
				}
				const concurrentBars = filteredProgress.slice(0, concurrencyCount);

				const updatedBars = prev.slice(0);

				let duration = INITIAL_DURATION;

				if (durationInputRef.current) {
					duration = durationInputRef.current.valueAsNumber;
				}

				const incrementBy = (100 / duration) * 20;

				for (const { index } of concurrentBars) {
					updatedBars[index] = updatedBars[index]! + incrementBy;
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
		if (concurrencyInputRef.current) {
			concurrencyInputRef.current.value = INITIAL_CONCURRENCY_COUNT.toString();
		}

		if (durationInputRef.current) {
			durationInputRef.current.value = INITIAL_DURATION.toString();
		}
	}, [stop]);

	React.useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	return (
		<div className="flex  flex-col gap-5 ">
			{/* Progress Controls */}
			<div className="flex gap-4">
				<Button onClick={addBar}>Add</Button>
				<Button onClick={isRunning ? stop : start}>{isRunning ? 'Stop' : 'Start'}</Button>
				<Button onClick={reset}>Reset</Button>
			</div>

			{/* Progress bars controls */}
			<div className="flex gap-7">
				<fieldset className="flex flex-1 flex-col items-center gap-2">
					<label className="text-text-neutral-hc" htmlFor="concurrencyCount">
						Concurrency
					</label>
					<input
						ref={concurrencyInputRef}
						type="range"
						name="concurrencyCount"
						id="concurrencyCount"
						defaultValue={INITIAL_CONCURRENCY_COUNT}
						min={1}
						max={10}
						step={1}
					/>
					<p>Range:(1-10) - Step of 1</p>
				</fieldset>

				<fieldset className="flex flex-1 flex-col items-center gap-2">
					<label className="text-text-neutral-hc" htmlFor="durationCount">
						Duration:
					</label>
					<input
						ref={durationInputRef}
						type="range"
						name="durationCount"
						id="durationCount"
						defaultValue={INITIAL_DURATION}
						min={500}
						max={3000}
						step={100}
					/>
					<span>Range:(500ms-3000ms) - Step of 100ms</span>
				</fieldset>
			</div>

			{/* Progress Bars Listing */}
			<div className="max-h-96 overflow-auto">
				<div className="flex  flex-col gap-4 ">
					{progress.map((p, index) => (
						<ProgressBar progress={p} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}

export default PausableProgressBars;
