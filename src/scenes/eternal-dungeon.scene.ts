import Phaser from 'phaser';
import { Tile } from '../enums/tiles.enum';
import { dungeonManager } from '../classes/dungeon-manager';
import { turnManager } from '../classes/turn-manager';
import { cursors } from '../classes/cursors';
import Goblin from '../classes/monster/goblin.monster';
import Skeleton from '../classes/monster/skeleton.monster';
import Golem from '../classes/monster/golem.monster';
import { ui } from './ui.scene';

class EternalDungeon extends Phaser.Scene {
  constructor() {
    super('EternalDungeon');
  }

  preload() {
    setInGameBackground();
    this.load.spritesheet('world', 'assets/world.png', {
      frameWidth: Tile.size,
      frameHeight: Tile.size,
      spacing: 1
    });
    this.scene.add('UI', ui, true);
  }

  init() {
    cursors.setCursorKeys(this.input.keyboard.createCursorKeys());

    this.input.keyboard.on('keyup', (event: any) => {
      let key = event.key;

      if (!isNaN(Number(key))) {
        if (key === 0) key = 10;
        dungeonManager.player.toggleItem(key - 1);
      }
    });
  }

  create() {
    dungeonManager.level.setMap(this.make.tilemap(dungeonManager.level.config));
    dungeonManager.addPlayer();
    turnManager.addEntity(dungeonManager.player);
    turnManager.addEntity(new Goblin());
    turnManager.addEntity(new Skeleton());
    turnManager.addEntity(new Golem());

    const camera = this.cameras.main
    camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
    camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
    camera.startFollow(dungeonManager.player.sprite);

    this.events.emit('renderUI');
  }

  update() {
    if (turnManager.over()) {
      turnManager.refresh();
    }
    turnManager.turn();
  }
}

const setInGameBackground = () => {
  document.getElementById('html')?.classList.remove('booting-screen');
  document.getElementById('html')?.classList.add('in-game-screen');
}

const eternalDungeon = new EternalDungeon();
export { eternalDungeon };