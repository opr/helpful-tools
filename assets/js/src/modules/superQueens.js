export const superQueens = () => {
  if(!document.getElementById('super-queens')) {
    return;
  }

  console.log('--- SUPER QUEENS ---');
  let board = [...Array(12)].map((y, yIndex) => [...Array(12)].map((x, xIndex) => xIndex === 0 ? 1 : 0 ));

  let currentY = 0;
  let currentX = 0;

  while(currentY !== 11 && currentX !== 11) {
    shuffleAndTest(currentX, currentY, board);
  }

  console.log(board);
};

const shuffleAndTest = (currentX, currentY, board) => {
  board.forEach(y => )
};

const canAQueenBeTaken = (board) => {

};
