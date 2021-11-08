import Phaser from 'phaser';
import { Tile } from '../enums/Tiles';
import Level from '../interfaces/Level';

export default class EternalDungeon extends Phaser.Scene {
	constructor() {
		super('EternalDungeon');
	}

	preload(): void {
		this.load.spritesheet('world', 'assets/world.png', {
			frameWidth: Tile.Size,
			frameHeight: Tile.Size,
			spacing: 1
		});
	}

	create(): void {
		const level: Level = {
			floor: 0,
			wall: 554,
			config: {
				data: [
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				],
				tileWidth: Tile.Size,
				tileHeight: Tile.Size
			}
		};

		level.config.data = level.config.data.map(r => r.map(t => t == 1 ? level.wall : level.floor));
		console.info(level.config);
	}
}