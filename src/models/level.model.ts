import SpritesLevel from './sprites-level.model';

export default interface Level {
  sprites: SpritesLevel;
  config: Phaser.Types.Tilemaps.TilemapConfig;
  map?: Phaser.Tilemaps.Tilemap;
  tileset?: Phaser.Tilemaps.Tileset;
  ground?: Phaser.Tilemaps.TilemapLayer;
}