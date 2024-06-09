import React from 'react';

import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import type { CellPosition, Maze, MazeItem } from './utils';

import { CSS_VARIABLES, generateMaze, getSourcePosition, PATH_DIRECTIONS } from './utils';

type Props = ComponentPropsWithoutRef<'button'>;

function Button({ children, className, ...otherProps }: Props) {
	return (
		<button
			className={`rounded-md bg-ui-neutral-bg px-2 py-2 text-text-neutral-hc hover:bg-ui-neutral-hovered-bg disabled:cursor-wait disabled:opacity-50 ${className}`}
			{...otherProps}
		>
			{children}
		</button>
	);
}

const mazeCellBgColorMap: Record<MazeItem, string> = {
	source: 'green',
	path: '#fff',
	target: 'red',
	wall: '#000',
	visited: 'cyan',
	reached: 'pink'
} as const;

function PathFinderVisualizer() {
	const [maze, setMaze] = React.useState<Maze>(() => generateMaze(15, 20));
	const [isRunning, setIsRunning] = React.useState(false);

	const totalRows = maze.length;
	const totalCols = maze[0]?.length || 0;

	const timerIdsRef = React.useRef<Array<ReturnType<typeof setTimeout>>>([]);

	const resetAllTimers = React.useCallback(() => {
		timerIdsRef.current.forEach((timerId) => {
			clearTimeout(timerId);
		});
	}, []);

	const randomizeMaze = React.useCallback(() => {
		resetAllTimers();
		setMaze(generateMaze(15, 20));
		setIsRunning(false);
	}, [resetAllTimers]);

	const executePathFinder = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;

		const pathFinderAlgorithm = target.getAttribute('data-algorithm');

		if (!pathFinderAlgorithm) {
			return;
		}

		resetAllTimers();

		setIsRunning(true);

		function traverse(point: CellPosition) {
			const queue = [point];
			const stack = [point];

			const visited = new Set(`${point.rowIndex},${point.colIndex}`);

			function visitCell(x: number, y: number) {
				visited.add(`${x},${y}`);

				if (maze[x]![y] === 'target') {
					maze[x]![y] = 'reached';
					setMaze(structuredClone(maze));
					setIsRunning(false);
					return true;
				}

				maze[x]![y] = 'visited';

				setMaze(structuredClone(maze));

				return false;
			}

			function process() {
				if (pathFinderAlgorithm === 'bfs' && !queue.length) {
					return;
				}

				if (pathFinderAlgorithm === 'dfs' && !stack.length) {
					return;
				}

				const toProcessPoint = pathFinderAlgorithm === 'bfs' ? queue.shift()! : stack.pop()!;

				for (const { dx, dy } of PATH_DIRECTIONS) {
					const nx = toProcessPoint.rowIndex + dx;
					const ny = toProcessPoint.colIndex + dy;

					const isValidNeighbour = nx >= 0 && ny >= 0 && nx < totalRows && ny < totalCols;

					const hasVisitedDoneBefore = visited.has(`${nx},${ny}`);

					if (isValidNeighbour && !hasVisitedDoneBefore) {
						if (maze[nx]![ny] === 'target' || maze[nx]![ny] === 'path') {
							const foundTarget = visitCell(nx, ny);

							if (foundTarget) {
								return;
							}

							if (pathFinderAlgorithm === 'bfs') {
								queue.push({
									rowIndex: nx,
									colIndex: ny
								});
							} else {
								stack.push({
									rowIndex: nx,
									colIndex: ny
								});
							}
						}
					}
				}

				const timerId = setTimeout(() => {
					process();
					timerIdsRef.current = timerIdsRef.current.filter((id) => id !== timerId);
				}, 100);

				timerIdsRef.current.push(timerId);
			}

			process();
		}

		// start traversing from source
		traverse(getSourcePosition());
	};

	return (
		<div>
			<div className="flex flex-col items-center justify-center gap-5 border-b border-ui-neutral-border pb-4">
				{/* Actions */}
				<div className="flex items-center justify-center gap-4">
					<Button onClick={randomizeMaze}>{isRunning ? 'Reset' : 'Randomize Maze'}</Button>
					<Button data-algorithm="bfs" onClick={executePathFinder} disabled={isRunning}>
						Run BFS
					</Button>
					<Button data-algorithm="dfs" onClick={executePathFinder} disabled={isRunning}>
						Run DFS
					</Button>
				</div>

				{/* Legends */}
				<div className="flex flex-wrap gap-4">
					{(Object.keys(mazeCellBgColorMap) as Array<keyof typeof mazeCellBgColorMap>).map((cellType) => (
						<div className="flex items-center justify-center gap-1" key={cellType}>
							<div
								className="aspect-square w-[14px] rounded-sm border border-ui-neutral-border"
								style={{ background: mazeCellBgColorMap[cellType] }}
							/>
							<small className="text-xs uppercase">: {cellType}</small>
						</div>
					))}
				</div>
			</div>

			<div
				style={{
					[CSS_VARIABLES.cols]: totalCols,
					[CSS_VARIABLES.rows]: totalRows,
					display: 'grid',
					gridTemplateColumns: `repeat(var(--cols), 1fr)`,
					gap: '8px'
				}}
				className="pt-4"
			>
				{maze.flat(1).map((mazeItem, index) => (
					<div
						style={{
							[CSS_VARIABLES.cellBg]: mazeCellBgColorMap[mazeItem]
						}}
						key={index}
						className="flex aspect-square items-center justify-center rounded-md border border-ui-neutral-border bg-[var(--cell-bg)]"
					/>
				))}
			</div>
		</div>
	);
}

export default PathFinderVisualizer;
