import { Tile } from '../enums/tiles.enum';
import Position from '../models/position.model';
import Entity from './entity';
import { cursors } from './cursors';
import { dungeonManager } from './dungeon-manager';
import { getRandomNumber } from '../utils/random-number-generator.util';

export default class Player extends Entity {
  type = 'player';

  constructor() {
    super(15, 15, 1, Tile.playerTile);
    this.healthPoints = 15;
  }

  turn() {
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
        if (dungeonManager.isWalkableTile(nextPosition)) {
          const enemy = dungeonManager.entityAtTile(nextPosition);

          if (enemy && this.actionPoints > 0) {
            dungeonManager.attackEntity(this, enemy);
            this.actionPoints -= 1;
            nextPosition = {
              x: this.position.x,
              y: this.position.y
            };
          }

          if (this.position.x !== nextPosition.x || this.position.y !== nextPosition.y) this.moveEntityTo(nextPosition);
        }
      }

      if (this.healthPoints <= 5) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.isMoving = false;
  }

  refresh() {
    this.movePoints = this.restorePoints;
    this.actionPoints = 1;
  }

  attack() { return getRandomNumber(1, 5); }

  onDestroy() {
    dungeonManager.log('you died');

    if (window.confirm('Do want to play again?')) {
      window.location.reload();
    }
  }
}