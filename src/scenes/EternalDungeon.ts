import Phaser from 'phaser';
import { Tile } from '../enums/tiles.enum';
import DungeonManager from '../classes/DungeonManager';
import TurnManager from '../classes/TurnManager';
import Cursors from '../classes/Cursors';
import Player from '../classes/Player';

export default class EternalDungeon extends Phaser.Scene {
  private static instance: EternalDungeon;
  private dungeonManager: DungeonManager;
  private turnManager: TurnManager;
  private cursors: Cursors;

  private constructor() {
    super('EternalDungeon');
    this.dungeonManager = DungeonManager.GetInstance();
    this.turnManager = TurnManager.GetInstance();
    this.cursors = Cursors.GetInstance();
  }

  static GetInstance(): EternalDungeon {
    if (!this.instance) {
      this.instance = new EternalDungeon();
    }
    return this.instance;
  }

  preload() {
    this.load.spritesheet('world', 'assets/world.png', {
      frameWidth: Tile.Size,
      frameHeight: Tile.Size,
      spacing: 1
    });
  }

  init() {
    this.cursors.SetCursorKeys(this.input.keyboard.createCursorKeys());
  }

  create() {
    this.dungeonManager.level.SetMap(this.make.tilemap(this.dungeonManager.level.config));
    this.turnManager.AddEntity(new Player());
  }

  update() {
    if (this.turnManager.Over()) {
      this.turnManager.Refresh();
    }
    this.turnManager.Turn();
  }
}