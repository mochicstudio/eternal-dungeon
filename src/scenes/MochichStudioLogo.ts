import Phaser from 'phaser';
import EternalDungeon from './EternalDungeon';

export default class MochichStudioLogo extends Phaser.Scene {
	constructor() {
		super('MochichStudioLogo');
	}

	preload(): void {
		this.load.image('logo', 'assets/mochicstudio.png');
		this.scene.add(EternalDungeon.name, EternalDungeon);
	}

	create(): void {
		const logo = this.add.image(400, 180, 'logo');

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

	onCompleteHandler(): void {
		console.info('onCompleteHandler');
		this.scene.start(EternalDungeon.name);
	}
}
