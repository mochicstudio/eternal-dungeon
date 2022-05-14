import Entity from './Entity';
import { Tile } from '../enums/tiles.enum';
import Position from '../models/position.model';

export default class Player extends Entity {

  constructor() {
    super(15, 15, 1, 25);
  }

  Turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };
    let moved = false;

    if (this.movePoints > 0) {
      if (this.cursors.cursorKeys?.left.isDown) {
        this.position.x -= 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.right.isDown) {
        this.position.x += 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.down.isDown) {
        this.position.y += 1;
        moved = true;
      }
      if (this.cursors.cursorKeys?.up.isDown) {
        this.position.y -= 1;
        moved = true;
      }

      if (moved) {
        this.movePoints -= 1;
      }
    }

    if (this.dungeonManager.level.map?.getTileAt(this.position.x, this.position.y)?.index === Tile.Wall) {
      this.position = {
        x: previousPosition.x,
        y: previousPosition.y
      };
    }

    if (this.position.x !== previousPosition.x || this.position.y !== previousPosition.y) {
      this.dungeonManager.level.map?.putTileAt(this.sprite, this.position.x, this.position.y);
      this.dungeonManager.level.map?.putTileAt(Tile.Floor, previousPosition.x, previousPosition.y);
    }
  }

  Over(): boolean {
    return this.movePoints === 0;
  }

  Refresh() {
    this.movePoints = this.restorePoints;
  }
}