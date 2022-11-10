import Phaser from 'phaser';
import { eternalDungeon } from './eternal-dungeon.scene';

class MochichStudioLogo extends Phaser.Scene {
  constructor() {
    super('MochichStudioLogo');
  }

  preload() {
    setBootingBackground();
    this.load.image('logo', 'assets/mochicstudio.png');
    this.scene.add('EternalDungeon', eternalDungeon);
  }

  create() {
    const logo = this.add.image(
      this.sys.game.canvas.width / 2,
      180,
      'logo'
    );

    this.tweens.add({
      targets: logo,
      y: 400,
      duration: 1500,
      ease: Phaser.Math.Easing.Sine.InOut,
      yoyo: true,
      repeat: 0,
      onComplete: this.onCompleteHandler,
      onCompleteScope: this
    });
  }

  onCompleteHandler() { this.scene.start(eternalDungeon); }
}

const setBootingBackground = () => { document.getElementById('html')?.classList.add('booting-screen'); };

const mochicStudioLogo = new MochichStudioLogo();
export { mochicStudioLogo };