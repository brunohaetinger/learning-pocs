console.log("Hello Sudoku")
type RowCol = [row: number, col: number];

const simple4x4 = [
  [1, 0, 3, 0], 
  [0, 0, 2, 1], 
  [0, 1, 0, 2], 
  [2, 4, 0, 0]
];

const NUMS_AVAILABLE = 4; // TODO: SUBGRID_SIZE => NUMS_AVAILABLE = SUBGRID_SIZE * SUBGRID_SIZE

let grid = simple4x4;

const solveSudoku = (): boolean => {
  let unassignedLocation = findUnassignedLocation()
  if(unassignedLocation === null) return true;

  const [row, col] = unassignedLocation;
  
  for(let num = 1; num <= NUMS_AVAILABLE; num++){
    if(isSafe(num, row, col)){
      grid[row][col] = num;
      if(solveSudoku()) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

const findUnassignedLocation = (): RowCol | null => {
  for(let i=0; i < NUMS_AVAILABLE; i++){
    for(let j=0; j < NUMS_AVAILABLE; j++){

      if(grid[i][j] === 0){
        return [i, j];
      }
    }
  }
  return null;
}

const isSafe = (num: number, row: number, col: number): boolean => {
  for(let j=0; j < NUMS_AVAILABLE; j++){
    if(grid[row][j] === num){
      return false;
    }
  }

  // is col safe:
  for(let i=0; i < NUMS_AVAILABLE; i++){
    if(grid[i][col] === num){
      return false;
    }
  }

  // is subgrid safe
  if(getSubgridNumbers(row, col)?.includes(num)) return false;

  return true;
}

const getSubgridNumbers = (row: number, col: number): number[] | null => {
  const gridFlat = grid.flat();
  const indexFlat = (row * NUMS_AVAILABLE) + col;

  
  // Flat indexes for 4x4 grid:
  // TODO: calculate for generic grid sizes
  const s0 = [0, 1, 4, 5]
  if(s0.includes(indexFlat)) return s0.map(subGridIndex => gridFlat[subGridIndex]);
  const s1 = [2, 3, 6, 7]
  if(s1.includes(indexFlat)) return s1.map(subGridIndex => gridFlat[subGridIndex]);
  const s2 = [8, 9, 12, 13]
  if(s2.includes(indexFlat)) return s2.map(subGridIndex => gridFlat[subGridIndex]);
  const s3 = [10, 11, 14, 15]
  if(s3.includes(indexFlat)) return s3.map(subGridIndex => gridFlat[subGridIndex]);

  return null;
}

// --- run
console.log("Before:");
grid.forEach(row => console.log(row.join(" | ")))
solveSudoku();
console.log("\nAfter:");
grid.forEach(row => console.log(row.join(" | ")))