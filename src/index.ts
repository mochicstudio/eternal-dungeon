import Phaser from 'phaser';
import config from './config';
import MochichStudioLogo from './scenes/MochichStudioLogo';

export default class Game extends Phaser.Game {
  private static instance: Game;

  static GetInstance(): Game {
    if (!this.instance) {
      this.instance = new Game(Object.assign(config, {
        scene: [MochichStudioLogo.GetInstance()]
      }));
    }
    return this.instance;
  }
}

Game.GetInstance();