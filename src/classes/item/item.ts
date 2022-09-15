import { EntityType } from '../../enums/entity-type.enum';
import Position from '../../models/position.model';
import Entity from '../entity';

export default class Item extends Entity {
  active: boolean;
  weapon: boolean;
  name: string;
  description: string;
  tile!: number;

  constructor(position: Position, spriteTile: number) {
    super(position.x, position.y, 0, spriteTile);

    this.active = false;
    this.type = EntityType.item;
    this.weapon = false;
    this.name = 'no name';
    this.description = 'no description';
  }

  damage = () => 0;
  turn() { }
  equip(itemKey: number) { }
  unequip() { }
  refresh() { }
  over = () => true;
  renderUI = () => 0;
}