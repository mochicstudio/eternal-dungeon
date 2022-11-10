import SpritesLevel from './sprites-level.model';

interface Level {
  sprites: SpritesLevel;
  config: Phaser.Types.Tilemaps.TilemapConfig;
  map?: Phaser.Tilemaps.Tilemap;
  tileset?: Phaser.Tilemaps.Tileset;
  ground?: Phaser.Tilemaps.TilemapLayer;
}

export default Level;