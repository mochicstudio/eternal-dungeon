import SpritesLevel from './SpritesLevel';

export default interface Level {
	sprites: SpritesLevel;
	config: Phaser.Types.Tilemaps.TilemapConfig;
	map?: Phaser.Tilemaps.Tilemap;
	tileset?: Phaser.Tilemaps.Tileset;
	ground?: Phaser.Tilemaps.TilemapLayer;
}