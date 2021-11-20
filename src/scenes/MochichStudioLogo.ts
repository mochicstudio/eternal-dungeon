import Phaser from 'phaser';
import EternalDungeon from './EternalDungeon';

export default class MochichStudioLogo extends Phaser.Scene {
	private static instance: MochichStudioLogo;

	private constructor() {
		super('MochichStudioLogo');
	}

	static GetInstance() {
		if (MochichStudioLogo.instance) {
			return this.instance;
		}
		this.instance = new MochichStudioLogo();
		return this.instance;
	}

	preload(): void {
		this.load.image('logo', 'assets/mochicstudio.png');
		this.scene.add(EternalDungeon.name, EternalDungeon.GetInstance());
	}

	create(): void {
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

	onCompleteHandler(): void {
		this.scene.start(EternalDungeon.name);
	}
}
