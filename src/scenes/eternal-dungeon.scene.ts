import Phaser from 'phaser';
import { Tile } from '../enums/tiles.enum';
import { dungeonManager } from '../classes/dungeon-manager';
import { turnManager } from '../classes/turn-manager';
import { cursors } from '../classes/cursors';
import Goblin from '../classes/entity/monster/goblin.monster';
import Skeleton from '../classes/entity/monster/skeleton.monster';
import Golem from '../classes/entity/monster/golem.monster';
import CoinChaser from '../classes/entity/monster/coin-chaser.monster';
import Sword from '../classes/entity/item/weapon/sword.item.weapon';
import Gem from '../classes/entity/item/gem/gem.item';
import CoinGem from '../classes/entity/item/gem/coin.item.gem';
import CursedGem from '../classes/entity/item/gem/cursed.item.gem';
import UncursedPotion from '../classes/entity/item/potion/uncursed.item.potion';
import HealthPotion from '../classes/entity/item/potion/health-buster.item.potion';
import AttackBusterPotion from '../classes/entity/item/potion/attack-buster.item.potion';
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
    turnManager.addEntity(new CoinChaser());
    turnManager.addEntity(new Sword({
      x: dungeonManager.player.position.x + 1,
      y: dungeonManager.player.position.y
    }));
    turnManager.addEntity(new CoinGem({
      x: dungeonManager.player.position.x + 2,
      y: dungeonManager.player.position.y + 2
    }));
    turnManager.addEntity(new Gem({
      x: dungeonManager.player.position.x + 1,
      y: dungeonManager.player.position.y + 2
    }));
    turnManager.addEntity(new CursedGem({
      x: dungeonManager.player.position.x - 3,
      y: dungeonManager.player.position.y - 5
    }));
    turnManager.addEntity(new UncursedPotion({
      x: dungeonManager.player.position.x - 3,
      y: dungeonManager.player.position.y - 6
    }));
    turnManager.addEntity(new HealthPotion({
      x: dungeonManager.player.position.x + 6,
      y: dungeonManager.player.position.y - 4
    }));
    turnManager.addEntity(new AttackBusterPotion({
      x: dungeonManager.player.position.x + 8,
      y: dungeonManager.player.position.y - 1
    }));

    const camera = this.cameras.main;
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
};

const eternalDungeon = new EternalDungeon();
export { eternalDungeon };