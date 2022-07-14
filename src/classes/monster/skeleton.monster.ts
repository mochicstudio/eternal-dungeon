import Monster from "../monster";
import { dungeonManager } from "../dungeon-manager";
import Position from "../../models/position.model";
import { Tile } from "../../enums/tiles.enum";
import { MonsterType } from "../../enums/monster-type.enum";

export default class Skeleton extends Monster {
  type: MonsterType;

  constructor() {
    super({ x: 60, y: 5 }, 3, Tile.MonsterSkeletonTile);
    this.type = MonsterType.skeleton;
  }

  Turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.GetPath(previousPosition);
      if (path.length > 2) {
        this.MoveEntityTo({ x: path[2][0], y: path[2][1] });
      }
      this.movePoints -= 1;
    }

    if (this.actionPoints > 0 && this.IsPlayerReachable()) {
      dungeonManager.AttackEntity(this, dungeonManager.player);
      this.actionPoints = 0;
    }

    this.isMoving = false;
  }

  Attack(): number {
    return 1;
  }
}