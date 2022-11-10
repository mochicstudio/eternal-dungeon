import { Tile } from '../../../../enums/tiles.enum';
import Position from '../../../../models/position.model';
import { dungeonManager } from '../../../dungeon-manager';
import Item from '../item';

export default class AttackBusterPotion extends Item {
  private readonly MAX_TURNS_ALIVE = 3;
  private turnsBeingAlive = 1;
  private itemSlot = 0;

  constructor(position: Position) {
    super(position, Tile.itemAttackBusterPotion);

    this.name = 'Attack Buster Potion';
    this.description = 'A potion that gives extra attack points';
    this.tile = Tile.itemAttackBusterPotion;
    this.actionPoints = 1;
  }

  turn = () => {
    if (dungeonManager.player.items.includes(this) && this.active) {
      if (this.turnsBeingAlive <= this.MAX_TURNS_ALIVE) this.turnsBeingAlive += 1;
      else dungeonManager.player.removeItem(this.itemSlot);
    }

    this.actionPoints = 0;
  };

  equip(itemKey: number) {
    dungeonManager.log('A blessing passes through your body and gives you strength');
    this.active = true;
    this.itemSlot = itemKey;
  }

  damage = () => 2;
  refresh = () => this.actionPoints = 1;
  over = () => this.actionPoints === 0;
}