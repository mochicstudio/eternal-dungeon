import Monster from "../monster";
import { dungeonManager } from "../dungeon-manager";
import Position from "../../models/position.model";
import { Tile } from "../../enums/tiles.enum";
import { MonsterType } from "../../enums/monster-type.enum";

export default class Skeleton extends Monster {
  type: MonsterType;

  constructor() {
    super({ x: 60, y: 5 }, 3, Tile.monsterSkeletonTile);
    this.type = MonsterType.skeleton;
  }

  turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.getPath(previousPosition);
      if (path.length > 2) {
        this.moveEntityTo({ x: path[2][0], y: path[2][1] });
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
    return 1;
  }
}