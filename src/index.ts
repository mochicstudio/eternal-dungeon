import Phaser from 'phaser';
import config from './config';
import MochichStudioLogo from './scenes/MochichStudioLogo';

new Phaser.Game(
	Object.assign(config, {
		scene: [MochichStudioLogo]
	})
);
