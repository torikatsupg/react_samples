let knightPosition = [1, 7];
let observer: ((arg0: number[]) => void) | null = null;

function emitChange() {
  observer!(knightPosition);
}

export function observe (o: any): void {
  if (observer) {
    throw new Error("observer have already exited");
  }

  observer = o;
  emitChange();
};

export function moveKnight(toX: number, toY: number) {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX: number, toY: number) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}