import { Tile } from '../../enums/tiles.enum';
import Position from '../../models/position.model';
import Item from './item';
import { getRandomNumber } from '../../utils/random-number-generator.util';

export default class LongSword extends Item {
  constructor(position: Position) {
    super(position, Tile.itemLongSword);

    this.weapon = true;
    this.name = 'Long Sword';
    this.description = 'Long sword. Causes between 4 and 8 damage';
    this.tile = Tile.itemLongSword;
  }

  damage = () => getRandomNumber(4, 8);
}