import Phaser from 'phaser';
import { Tile } from '../enums/Tiles';
import DungeonManager from '../classes/DungeonManager';

export default class EternalDungeon extends Phaser.Scene {
	private static instance: EternalDungeon;
	private dungeonManager: DungeonManager;

	private constructor() {
		super('EternalDungeon');
		this.dungeonManager = DungeonManager.GetInstance();
	}

	static GetInstance() {
		if (EternalDungeon.instance) {
			return this.instance;
		}
		this.instance = new EternalDungeon();
		return this.instance;
	}

	preload(): void {
		this.load.spritesheet('world', 'assets/world.png', {
			frameWidth: Tile.Size,
			frameHeight: Tile.Size,
			spacing: 1
		});
	}

	create(): void {
		this.dungeonManager.level.SetMap(this.make.tilemap(this.dungeonManager.level.config));
		console.info(this.dungeonManager.level);
	}
}