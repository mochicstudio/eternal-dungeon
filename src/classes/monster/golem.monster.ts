import Monster from "../monster";
import { dungeonManager } from "../dungeon-manager";
import Position from "../../models/position.model";
import { Tile } from "../../enums/tiles.enum";
import { MonsterType } from "../../enums/monster-type.enum";

export default class Golem extends Monster {
  type: MonsterType;

  constructor() {
    super({ x: 75, y: 10 }, 1, Tile.MonsterGolemTile);
    this.type = MonsterType.golem;
  }

  Turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.GetPath(previousPosition);
      if (path.length < 15) {
        this.MoveEntityTo({ x: path[1][0], y: path[1][1] });
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
    return 5;
  }
}