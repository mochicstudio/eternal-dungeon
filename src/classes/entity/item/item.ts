import { EntityType } from '../../../enums/entity-type.enum';
import Position from '../../../models/position.model';
import Entity from '../entity';

export default class Item extends Entity {
  active: boolean;
  weapon: boolean;
  name: string;
  description: string;
  tile!: number;

  constructor(position: Position, spriteTile: number) {
    super(position.x, position.y, 0, spriteTile);

    this.type = EntityType.item;
    this.active = false;
    this.weapon = false;
    this.name = 'no name';
    this.description = 'no description';
  }

  turn() { return; }
  over() { return true; }
  refresh() { return; }
  renderUI = () => 0;
  damage = () => 0;
  proection = () => 0;
  range = () => 0;
  equip = (_itemKey: number) => { return; };
  unequip = () => { return; };
}