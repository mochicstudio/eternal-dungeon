import DungeonManager from './DungeonManager';
import Cursors from './Cursors';
import entity from '../models/entity.model';
import { Tile } from '../enums/tiles.enum';

export default class Entity implements entity {
	private dungeonManager: DungeonManager;
	private cursors: Cursors;
	position;
	previousPosition;
	movePoints: number;
	restorePoints: number;
	sprite: number;

	constructor(positionX: number, positionY: number, movePoints: number, sprite: number) {
		this.dungeonManager = DungeonManager.GetInstance();
		this.cursors = Cursors.GetInstance();
		this.position = { x: positionX, y: positionY };
		this.previousPosition = { x: positionX, y: positionY };
		this.movePoints = movePoints;
		this.restorePoints = movePoints;
		this.sprite = sprite;
		this.dungeonManager.level.map?.putTileAt(this.sprite, this.position.x, this.position.y);
	}

	Turn() {
		let moved = false;

		if (this.movePoints > 0) {
			if (this.cursors.cursorKeys?.left.isDown) {
				this.position.x -= 1;
				moved = true;
			}
			if (this.cursors.cursorKeys?.right.isDown) {
				this.position.x += 1;
				moved = true;
			}
			if (this.cursors.cursorKeys?.down.isDown) {
				this.position.y += 1;
				moved = true;
			}
			if (this.cursors.cursorKeys?.up.isDown) {
				this.position.y -= 1;
				moved = true;
			}

			if (moved) {
				this.movePoints -= 1;
			}
		}

		if (this.dungeonManager.level.map?.getTileAt(this.position.x, this.position.y).index === Tile.Wall) {
			this.position = this.previousPosition;
		}

		if (this.position.x !== this.previousPosition.x || this.position.y !== this.previousPosition.y) {
			this.dungeonManager.level.map?.putTileAt(this.sprite, this.position.x, this.position.y);
			this.dungeonManager.level.map?.putTileAt(Tile.Floor, this.previousPosition.x, this.previousPosition.y);
		}
	}

	Over(): boolean {
		return this.movePoints === 0;
	}

	Refresh() {
		this.movePoints = this.restorePoints;
	}
}