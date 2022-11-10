import { Tile } from '../../../enums/tiles.enum';
import { MonsterType } from '../../../enums/monster-type.enum';
import Monster from './monster';

export default class Goblin extends Monster {
  constructor() {
    super({ x: 70, y: 8 }, 1, Tile.monsterGoblinTile);
    this.monsterType = MonsterType.goblin;
  }
}