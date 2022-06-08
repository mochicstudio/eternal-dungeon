import Entity from './Entity';
import { Tile } from '../enums/tiles.enum';
import Position from '../models/position.model';

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
      if (this.cursors.cursorKeys?.left.isDown) {
        nextPosition.x -= 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.right.isDown) {
        nextPosition.x += 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.down.isDown) {
        nextPosition.y += 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.up.isDown) {
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
  }
}