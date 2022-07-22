import Phaser from 'phaser';
import { dungeonManager } from '../classes/dungeon-manager';
import { turnManager } from '../classes/turn-manager';
import Entity from '../models/entity.model';
import Position from '../models/position.model';

class UI extends Phaser.Scene {
  private created: boolean;
  private log: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('UI');

    this.created = false;
  }

  create() { this.scene.get('EternalDungeon').events.on('renderUI', () => this.render()); }

  render() {
    const position: Position = {
      x: (80 * 16) - 190,
      y: 10
    };

    for (let entity of turnManager.getEntitiesValues()) {
      entity as Entity;
      if (typeof entity.renderUI === 'function') {
        const height = entity.renderUI(position, 198);
        position.y += height;
      }
    }

    this.add.line(position.x + 5, position.y, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
    this.log = this.add.text(position.x + 10, position.y + 20, '', {
      font: '12px Arial',
      color: '#CFC6B8',
      wordWrap: {
        width: 180
      }
    });

    this.created = true;
  }

  update() {
    if (this.created) {
      const text = dungeonManager.output.join('\n\n');
      this.log?.setText(text);
    }
  }
}

const ui = new UI();
export { ui };