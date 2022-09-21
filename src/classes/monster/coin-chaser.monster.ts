import { Tile } from "../../enums/tiles.enum";
import { MonsterType } from "../../enums/monster-type.enum";
import Position from "../../models/position.model";
import Monster from './monster';
import { dungeonManager } from "../dungeon-manager";

export default class CoinChaser extends Monster {
  constructor() {
    super({ x: 18, y: 30 }, 1, Tile.monsterCoinChaser);
    this.monsterType = MonsterType.coinChaser;
  }

  turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.actionPoints > 0 && this.isPlayerReachable()) {
      if (dungeonManager.player.getItemByProperty('isGold', true)) {
        dungeonManager.attackEntity(this, dungeonManager.player);
        dungeonManager.player.removeItemByProperty('isGold', true);
      }
      this.actionPoints = 0;
    }

    if (this.movePoints > 0) {
      if (dungeonManager.player.getItemByProperty('isGold', true)) {
        const path = this.getPath(previousPosition);
        console.log(path.length);
        dungeonManager.moveEntityTo(this, { x: path[3][0], y: path[3][1] });
      }
      this.movePoints -= 1;
    }

    this.isMoving = false;
  }

  attack = (): number => 1;
}