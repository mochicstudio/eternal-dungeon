import Phaser from 'phaser';
import config from './config';
import { ui } from './scenes/ui.scene';
import { mochicStudioLogo } from './scenes/mochic-studio.scene';
import { eternalDungeon } from './scenes/eternal-dungeon.scene';

new Phaser.Game(Object.assign(config, {
  scene: [mochicStudioLogo, eternalDungeon, ui]
}));