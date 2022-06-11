import Entity from './Entity';
import Position from '../models/position.model';
import { cursors } from './Cursors';

export default class Player extends Entity {
  constructor() {
    super(15, 15, 1, 25);
  }

  Turn() {
    let nextPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };
    let moved = false;

    if (this.movePoints > 0 && !this.isMoving) {
      if (cursors.cursorKeys?.left.isDown) {
        nextPosition.x -= 1;
        moved = true;
      }
      if (cursors.cursorKeys?.right.isDown) {
        nextPosition.x += 1;
        moved = true;
      }
      if (cursors.cursorKeys?.down.isDown) {
        nextPosition.y += 1;
        moved = true;
      }
      if (cursors.cursorKeys?.up.isDown) {
        nextPosition.y -= 1;
        moved = true;
      }

      if (moved) {
        this.movePoints -= 1;
        if (this.IsWalkableTile(nextPosition)) {
          this.MoveEntityTo(nextPosition);
        }
      }
    }
  }

  Over(): boolean {
    return this.movePoints === 0 && !this.isMoving;
  }

  Refresh() {
    this.movePoints = this.restorePoints;
    this.actionPoints = 1;
  }
}