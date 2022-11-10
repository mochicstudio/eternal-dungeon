import { Tile } from '../../../enums/tiles.enum';
import { MonsterType } from '../../../enums/monster-type.enum';
import Position from '../../../models/position.model';
import Monster from './monster';
import { dungeonManager } from '../../dungeon-manager';

export default class Golem extends Monster {
  constructor() {
    super({ x: 75, y: 10 }, 1, Tile.monsterGolemTile);
    this.monsterType = MonsterType.golem;
  }

  turn() {
    const previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.getPath(previousPosition);
      if (path.length < 15) {
        dungeonManager.moveEntityTo(this, { x: path[1][0], y: path[1][1] });
      }
      this.movePoints -= 1;
    }

    if (this.actionPoints > 0 && this.isPlayerReachable()) {
      dungeonManager.attackEntity(this, dungeonManager.player);
      this.actionPoints = 0;
    }

    this.isMoving = false;
  }

  attack(): number {
    return 5;
  }
}