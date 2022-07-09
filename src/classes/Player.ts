import Entity from './Entity';
import Position from '../models/position.model';
import { cursors } from './Cursors';
import { dungeonManager } from './DungeonManager';

export default class Player extends Entity {
  constructor() {
    super(15, 15, 1, 25);

    this.healthPoints = 15;
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
        if (dungeonManager.IsWalkableTile(nextPosition)) {
          const enemy = dungeonManager.EntityAtTile(nextPosition);

          if (enemy && this.actionPoints > 0) {
            dungeonManager.AttackEntity(this, enemy);
            this.actionPoints -= 1;
            nextPosition = {
              x: this.position.x,
              y: this.position.y
            };
          }

          if (this.position.x !== nextPosition.x || this.position.y !== nextPosition.y) this.MoveEntityTo(nextPosition);
        }
      }

      if (this.healthPoints <= 5) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.isMoving = false;
  }

  Over(): boolean {
    return this.movePoints === 0 && !this.isMoving;
  }

  Refresh() {
    this.movePoints = this.restorePoints;
    this.actionPoints = 1;
  }

  Attack() {
    return 1;
  }

  OnDestroy() {
    console.log('you died', this);
    window.location.reload();
  }
}