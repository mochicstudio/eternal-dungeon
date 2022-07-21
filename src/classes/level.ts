import { Tile } from '../enums/tiles.enum';
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
      wall: Tile.wallTile,
      floor: Tile.floor
    };
    this.config = config;
    this.remap();
  }

  private remap() {
    this.config.data = this.config.data?.map(tileRow => tileRow.map(tile => tile == 1 ? this.sprites.wall : this.sprites.floor));
  }

  private setTileset() {
    this.tileset = this.map?.addTilesetImage('tiles', 'world', this.config.tileWidth, this.config.tileHeight, 0, 1);
  }

  private setGround() {
    this.ground = this.map?.createLayer(0, this.tileset ?? '', 0, 0);
  }

  public setMap(map: Phaser.Tilemaps.Tilemap) {
    this.map = map;
    this.setTileset();
    this.setGround();
  }
}