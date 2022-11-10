import { Tile } from '../../../../enums/tiles.enum';
import Position from '../../../../models/position.model';
import Item from '../item';

export default class Gem extends Item {
  constructor(position: Position) {
    super(position, Tile.itemGem);

    this.name = 'Gem';
    this.tile = Tile.itemGem;
  }
}