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
			wall: 826,
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

		level.config.data = level.config.data?.map(r => r.map(t => t == 1 ? level.wall : level.floor));
		level.map = this.make.tilemap(level.config);
		level.tileset = level.map.addTilesetImage('tiles', 'world', level.config.tileWidth, level.config.tileHeight, 0, 1);
		level.ground = level.map.createLayer(0, level.tileset, 0, 0);

		console.info(level);
	}
}