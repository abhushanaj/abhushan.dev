export type MazeItem = 'path' | 'wall' | 'source' | 'target' | 'visited' | 'reached';
export type Maze = Array<Array<MazeItem>>;

export const CSS_VARIABLES = {
	rows: '--rows',
	cols: '--cols',
	cellBg: '--cell-bg'
};

export const PATH_DIRECTIONS = [
	{ dx: 0, dy: 1 },
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
	{ dx: 0, dy: -1 }
] as const;

export type CellPosition = {
	rowIndex: number;
	colIndex: number;
};

export const getSourcePosition = (): CellPosition => ({
	rowIndex: 1,
	colIndex: 0
});

const getTargetPosition = (rows: number, cols: number): CellPosition => ({
	rowIndex: rows - 2,
	colIndex: cols - 2
});

export function generateMaze(rows: number, cols: number) {
	const newMaze: Array<Array<MazeItem>> = [];

	for (let i = 0; i < rows; i++) {
		const row: Array<MazeItem> = [];

		for (let j = 0; j < cols; j++) {
			// we set every item in maze as well
			row.push('wall');
		}
		newMaze.push(row);
	}

	// Function to check if a cell is valid for creating a path
	function isCellValid(x: number, y: number) {
		return y >= 0 && x >= 0 && x < rows && y < cols && newMaze[x]![y] === 'wall';
	}

	// Function to carve a path on the maze
	function cavePath(x: number, y: number) {
		newMaze[x]![y] = 'path';
		const randomPathDirections = [...PATH_DIRECTIONS].sort(() => Math.random() - 0.5);

		for (const { dx, dy } of randomPathDirections) {
			const nx = dx + x;
			const ny = dy + y;

			// future node of the present node
			const n2x = dx * 2 + x;
			const n2y = dy * 2 + y;

			if (isCellValid(n2x, n2y)) {
				newMaze[nx]![ny] = 'path';
				cavePath(n2x, n2y);
			}
		}
	}

	const targetPosition = getTargetPosition(rows, cols);
	const sourcePosition = getSourcePosition();

	// start carving a path from right side of source
	cavePath(sourcePosition.rowIndex, sourcePosition.colIndex + 1);

	// we fix the source and target path
	newMaze[sourcePosition.rowIndex]![sourcePosition.colIndex] = 'source';
	newMaze[targetPosition.rowIndex]![targetPosition.colIndex] = 'target';

	return newMaze;
}
