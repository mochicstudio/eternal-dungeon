import { Tile } from '../enums/Tiles';
import level from '../interfaces/Level';

export default class Level implements level {
	readonly wall: number;
	readonly floor: number;
	readonly config: Phaser.Types.Tilemaps.TilemapConfig;
	map: Phaser.Tilemaps.Tilemap | undefined;
	tileset: Phaser.Tilemaps.Tileset | undefined;
	ground: Phaser.Tilemaps.TilemapLayer | undefined;

	constructor(config: Phaser.Types.Tilemaps.TilemapConfig) {
		this.wall = Tile.Floor;
		this.floor = Tile.WallTile;
		this.config = config;
		this.SetConfig();
	}

	private SetConfig() {
		this.config.data = this.config.data?.map(r => r.map(t => t == 1 ? this.wall : this.floor));
	}

	private SetTileset() {
		this.tileset = this.map?.addTilesetImage('tiles', 'world', this.config.tileWidth, this.config.tileHeight, 0, 1);
	}

	private SetGround() {
		this.ground = this.map?.createLayer(0, this.tileset ? this.tileset : '', 0, 0);
	}

	public SetMap(map: Phaser.Tilemaps.Tilemap) {
		this.map = map;
		this.SetTileset();
		this.SetGround();
	}
}