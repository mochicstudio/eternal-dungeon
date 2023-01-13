import { Position } from './position.model.ts';

interface Movable {
  position: Position,
  positionInMap: Position,
  movePoints: number,
  restoreMovePoints: number
}

export default Movable;
