import Phaser from 'phaser';
import { Tile } from '../enums/tiles.enum';
import { dungeonManager } from '../classes/dungeon-manager';
import { turnManager } from '../classes/turn-manager';
import { cursors } from '../classes/cursors';
import Goblin from '../classes/monster/goblin.monster';
import Skeleton from '../classes/monster/skeleton.monster';
import Golem from '../classes/monster/golem.monster';

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
    turnManager.AddEntity(new Goblin());
    turnManager.AddEntity(new Skeleton());
    turnManager.AddEntity(new Golem());

    const camera = this.cameras.main
    camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
    camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
    camera.startFollow(dungeonManager.player.sprite);
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