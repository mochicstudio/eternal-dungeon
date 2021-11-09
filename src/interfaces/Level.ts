export default interface Level {
	wall: number;
	floor: number;
	config: Phaser.Types.Tilemaps.TilemapConfig;
	map?: Phaser.Tilemaps.Tilemap;
	tileset?: Phaser.Tilemaps.Tileset;
	ground?: Phaser.Tilemaps.TilemapLayer;
}