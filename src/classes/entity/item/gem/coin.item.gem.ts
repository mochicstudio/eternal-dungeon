import { Tile } from '../../../../enums/tiles.enum';
import Position from '../../../../models/position.model';
import Item from '../item';

export default class CoinGem extends Item {
  readonly isGold = true;

  constructor(position: Position) {
    super(position, Tile.itemCoinGem);

    this.name = 'Coin Gem';
    this.tile = Tile.itemCoinGem;
  }
}