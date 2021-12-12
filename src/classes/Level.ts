import { Tile } from '../enums/Tiles';
import level from '../models/level.model';
import SpritesLevel from '../models/sprites-level.model';

export default class Level implements level {
	readonly sprites: SpritesLevel;
	readonly config: Phaser.Types.Tilemaps.TilemapConfig;
	map: Phaser.Tilemaps.Tilemap | undefined;
	tileset: Phaser.Tilemaps.Tileset | undefined;
	ground: Phaser.Tilemaps.TilemapLayer | undefined;

	constructor(config: Phaser.Types.Tilemaps.TilemapConfig) {
		this.sprites = {
			wall: Tile.WallTile,
			floor: Tile.Floor
		};
		this.config = config;
		this.Remap();
	}

	private Remap() {
		this.config.data = this.config.data?.map(r => r.map(t => t == 1 ? this.sprites.wall : this.sprites.floor));
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