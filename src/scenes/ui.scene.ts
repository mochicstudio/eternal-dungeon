import Phaser from 'phaser';
import { turnManager } from '../classes/turn-manager';

class UI extends Phaser.Scene {
  private created: boolean;

  constructor() {
    super('UI');

    this.created = false;
  }

  create() {
    this.scene.get('EternalDungeon').events.on('renderUI', () => this.render());
  }

  update() { }

  render() { }
}

const ui = new UI();
export { ui };