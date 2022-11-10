import { Tile } from '../../../../enums/tiles.enum';
import Position from '../../../../models/position.model';
import { dungeonManager } from '../../../dungeon-manager';
import Item from '../item';

export default class HealthPotion extends Item {
  constructor(position: Position) {
    super(position, Tile.itemHealthPotion);

    this.name = 'Health Potion';
    this.description = 'A potion that gives extra health';
    this.tile = Tile.itemHealthPotion;

    if (this.sprite) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
  }

  equip(itemKey: number) {
    dungeonManager.log('A blessing passes through your body and gives you extra health');
    dungeonManager.player.removeItem(itemKey);
    dungeonManager.player.healthPoints += 5;
  }
}