import { Tile } from '../../../enums/tiles.enum';
import Position from '../../../models/position.model';
import Item from '../item';
import { turnManager } from '../../turn-manager';
import { dungeonManager } from '../../dungeon-manager';

export default class CursedGem extends Item {
  cursed: boolean;

  constructor(position: Position) {
    super(position, Tile.itemCursedGem);

    this.name = 'Cursed Gem';
    this.description = 'A cursed gem is now stuck at your hand';
    this.tile = Tile.itemCursedGem;
    this.actionPoints = 1;
    this.cursed = true;
  }

  turn = () => {
    if (dungeonManager.player.items.includes(this)) {
      this.active = true;
      dungeonManager.log('Cursed gem gives 1 damage per turn');
      dungeonManager.player.receiveDamage(this.attack());
    }
    this.actionPoints = 0;

    if (!dungeonManager.player.isAlive()) turnManager.removeEntity(dungeonManager.player);
  }

  refresh = () => this.actionPoints = 1;
  over = () => this.actionPoints === 0;
  attack = () => 1;
}