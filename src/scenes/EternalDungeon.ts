import Phaser from 'phaser';
import { Tile } from '../enums/tiles.enum';
import { dungeonManager } from '../classes/DungeonManager';
import { turnManager } from '../classes/TurnManager';
import { cursors } from '../classes/Cursors';
import Monster from '../classes/Monster';

class EternalDungeon extends Phaser.Scene {
  constructor() {
    super('EternalDungeon');
  }

  preload() {
    this.load.spritesheet('world', 'assets/world.png', {
      frameWidth: Tile.Size,
      frameHeight: Tile.Size,
      spacing: 1
    });
  }

  init() {
    cursors.SetCursorKeys(this.input.keyboard.createCursorKeys());
  }

  create() {
    dungeonManager.level.SetMap(this.make.tilemap(dungeonManager.level.config));
    dungeonManager.AddPlayer();
    turnManager.AddEntity(dungeonManager.player);
    turnManager.AddEntity(new Monster());
  }

  update() {
    if (turnManager.Over()) {
      turnManager.Refresh();
    }
    turnManager.Turn();
  }
}

const eternalDungeon = new EternalDungeon();
export { eternalDungeon };