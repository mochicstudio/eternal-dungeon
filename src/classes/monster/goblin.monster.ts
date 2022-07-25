import Monster from './monster';
import { Tile } from "../../enums/tiles.enum";
import { MonsterType } from "../../enums/monster-type.enum";

export default class Goblin extends Monster {
  type: MonsterType;

  constructor() {
    super({ x: 70, y: 8 }, 1, Tile.monsterGoblinTile);
    this.type = MonsterType.goblin;
  }
}