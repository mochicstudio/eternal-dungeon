import { Tile } from '../../enums/tiles.enum';
import Position from '../../models/position.model';
import Item from './item';
import { getRandomNumber } from '../../utils/random-number-generator.util';

export default class Sword extends Item {
  constructor(position: Position) {
    super(position, Tile.itemSword);

    this.weapon = true;
    this.name = 'Sword';
    this.description = 'Basic sword. Causes between 1 and 5 damage';
    this.tile = Tile.itemSword;
  }

  damage = () => getRandomNumber(1, 5);
}