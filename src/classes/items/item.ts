import Position from '../../models/position.model';

export default class Item {
  active: boolean;
  type: string;
  weapon: boolean;
  name: string;
  description: string;
  position!: Position;

  constructor(position: Position) {
    this.active = false;
    this.type = 'item';
    this.weapon = false;
    this.name = 'no name';
    this.description = 'no description';

    if (position) {
      this.position = {
        x: position.x,
        y: position.y
      };
    }
  }

  damage() { return 0; }
  turn() { }
  equip() { }
  unequip() { }
  refresh() { }
  over() { return true; }
  renderUI() { return 0; }
}