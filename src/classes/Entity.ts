import DungeonManager from './DungeonManager';
import Cursors from './Cursors';
import entity from '../models/entity.model';
import Position from '../models/position.model';
import EternalDungeon from '../scenes/EternalDungeon';
import { Tile } from '../enums/tiles.enum';

export default class Entity implements entity {
  eternalDungeon: EternalDungeon;
  dungeonManager: DungeonManager;
  cursors: Cursors;
  position: Position;
  positionInWorld: any;
  isMoving: boolean;
  movePoints: number;
  restorePoints: number;
  sprite: Phaser.GameObjects.Sprite;

  constructor(positionX: number, positionY: number, movePoints: number, spriteTile: number) {
    this.eternalDungeon = EternalDungeon.GetInstance();
    this.dungeonManager = DungeonManager.GetInstance();
    this.cursors = Cursors.GetInstance();
    this.position = {
      x: positionX,
      y: positionY
    };
    this.positionInWorld = {
      x: this.dungeonManager.level.map?.tileToWorldX(positionX) as number,
      y: this.dungeonManager.level.map?.tileToWorldX(positionY) as number
    };
    this.isMoving = false;
    this.movePoints = movePoints;
    this.restorePoints = movePoints;
    this.sprite = this.eternalDungeon.add.sprite(this.positionInWorld.x, this.positionInWorld.y, 'world', spriteTile);
    this.sprite.setOrigin(0);
  }

  IsWalkableTile(position: Position): boolean {
    return this.dungeonManager.level.config.data ? this.dungeonManager.level.config.data[position.y][position.x] === Tile.Floor : false;
  }

  MoveEntityTo(position: Position) {
    this.isMoving = true;
    this.eternalDungeon.tweens.add({
      targets: this.sprite,
      onComplete: () => {
        this.isMoving = false;
        this.position = {
          x: position.x,
          y: position.y
        }
      },
      x: this.dungeonManager.level.map?.tileToWorldX(position.x),
      y: this.dungeonManager.level.map?.tileToWorldY(position.y),
      ease: 'Power2',
      duration: 200
    });
  }

  Turn() { }
  Over() { }
  Refresh() { }
}