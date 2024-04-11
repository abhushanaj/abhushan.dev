import React from 'react';

type Props = {
	angle: number;
	width: number;
	height: number;
};

function ClockHand({ angle, width, height }: Props) {
	return (
		<div
			aria-hidden="true"
			className="absolute left-[50%] top-[50%] h-44 bg-ui-neutral-active-bg"
			style={{
				transform: `rotate(${angle}deg) scaleY(${height})`,
				width: `${width}px`,
				transformOrigin: 'top center'
			}}
			suppressHydrationWarning
		/>
	);
}

function AnalogClock() {
	const [date, setCurrentDate] = React.useState<Date>(new Date());

	React.useEffect(() => {
		let id: number;

		const onTick = () => {
			setCurrentDate(new Date());

			id = requestAnimationFrame(onTick);
		};

		onTick();

		return () => {
			if (id) {
				cancelAnimationFrame(id);
			}
		};
	}, []);

	const hours = date.getHours() % 12;
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const secondsProgress = seconds / 60;
	const minutesProgress = (secondsProgress + minutes) / 60;
	const hoursProgress = (minutesProgress + hours) / 12;

	return (
		<div className="flex items-center justify-center">
			<time
				dateTime={date.toISOString()}
				style={{
					transform: 'rotate(180deg)'
				}}
				className="relative block aspect-square w-96 rounded-full border-4 border-ui-neutral-border"
				suppressHydrationWarning
			>
				{/* Seconds Hand */}
				<ClockHand width={2} angle={secondsProgress * 360} height={1} />
				{/* Minutes Hand */}
				<ClockHand width={3} angle={minutesProgress * 360} height={0.9} />
				{/* Hour Hand */}
				<ClockHand width={4} angle={hoursProgress * 360} height={0.8} />
			</time>
		</div>
	);
}

export default AnalogClock;
