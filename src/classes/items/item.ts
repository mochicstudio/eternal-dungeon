import Position from '../../models/position.model';
import Entity from '../entity';

export default class Item extends Entity {
  active: boolean;
  type: string;
  weapon: boolean;
  name: string;
  description: string;
  tile!: number;

  constructor(position: Position) {
    super(position.x, position.y, 0, 0);

    this.active = false;
    this.type = 'item';
    this.weapon = false;
    this.name = 'no name';
    this.description = 'no description';
  }

  damage = () => 0;
  turn() { }
  equip(itemKey: number) { }
  unequip() { }
  refresh() { }
  over() { return true; }
  renderUI() { return 0; }
}