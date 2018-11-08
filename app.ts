window.onload = () => {
  const boardSize = 400;
  const population = 0.03;
  const blockSize = 2;
  const board: boolean[][] = [];

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  initBoard();
  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(drawLoop);

  function initBoard() {
    for (let i: number = 0; i < boardSize; i++) {
      const row: boolean[] = [];
      for (let j: number = 0; j < boardSize; j++) {
        if (Math.random() < population) row.push(true);
        else row.push(false);
      }
      board.push(row);
    }
  }

  function drawLoop() {

    calculateAlive();

    ctx.clearRect(0, 0, boardSize*blockSize, boardSize*blockSize);
    for (let curRow: number = 0; curRow < boardSize; curRow++) {
      for (let curCol: number = 0; curCol < boardSize; curCol++) {
        if (board[curRow][curCol]==true) ctx.fillRect(curCol * blockSize, curRow * blockSize, blockSize, blockSize);
      }
    }
    window.requestAnimationFrame(drawLoop);
  }

  function calculateAlive(){
    for (let curRow = 0; curRow < boardSize; curRow++) {
      for (let curCol = 0; curCol < boardSize; curCol++) {
        if (!board[curRow][curCol] && countNeighbours(curRow, curCol) === 3) board[curRow][curCol] = true;
        else if (board[curRow][curCol] && (countNeighbours(curRow, curCol) < 2 || countNeighbours(curRow, curCol) > 3)) board[curRow][curCol] = false;
      }
    }
  }

  function countNeighbours(row: number, col: number): number {
    let neighbours: number = 0;
    for (let curRow = (row > 0) ? (row - 1) : row; curRow <= ((row < (boardSize - 1)) ? (row + 1) : row); curRow++) {
      for (let curCol = (col > 0) ? (col - 1) : col; curCol <= ((col < (boardSize - 1)) ? (col + 1) : col); curCol++) {
        if (board[curRow][curCol]) neighbours++;
      }
    }
    return neighbours;
  }
};