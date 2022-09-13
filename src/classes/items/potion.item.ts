import { Tile } from '../../enums/tiles.enum';
import Position from '../../models/position.model';
import { dungeonManager } from '../dungeon-manager';
import Item from './item';

export default class Potion extends Item {
  constructor(position: Position) {
    super(position, Tile.itemPotion);

    this.name = 'Potion';
    this.description = 'A potion that removes cursed items when equipped';
    this.tile = Tile.itemPotion;
  }

  equip(itemKey: number) {
    dungeonManager.log('A blessing passes through your body and removes all cursed items');
    dungeonManager.player.removeItemByProperty('cursed', true);
    dungeonManager.player.removeItem(itemKey);
  }
}