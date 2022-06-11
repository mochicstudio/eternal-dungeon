import { Tile } from '../enums/tiles.enum';
import entity from '../models/entity.model';
import Position from '../models/position.model';
import { dungeonManager } from './DungeonManager';
import { eternalDungeon } from '../scenes/EternalDungeon';

export default class Entity implements entity {
  position: Position;
  positionInWorld: any;
  isMoving: boolean;
  movePoints: number;
  restorePoints: number;
  actionPoints: number;
  healthPoints: number;
  sprite: Phaser.GameObjects.Sprite;

  constructor(positionX: number, positionY: number, movePoints: number, spriteTile: number) {
    this.position = {
      x: positionX,
      y: positionY
    };
    this.positionInWorld = {
      x: dungeonManager.level.map?.tileToWorldX(positionX) as number,
      y: dungeonManager.level.map?.tileToWorldX(positionY) as number
    };
    this.isMoving = false;
    this.movePoints = movePoints;
    this.restorePoints = movePoints;
    this.actionPoints = 1;
    this.healthPoints = 1;
    this.sprite = eternalDungeon.add.sprite(this.positionInWorld.x, this.positionInWorld.y, 'world', spriteTile);
    this.sprite.setOrigin(0);
  }

  IsWalkableTile(position: Position): boolean {
    return dungeonManager.level.config.data ? dungeonManager.level.config.data[position.y][position.x] === Tile.Floor : false;
  }

  MoveEntityTo(position: Position) {
    this.isMoving = true;
    eternalDungeon.tweens.add({
      targets: this.sprite,
      onComplete: () => {
        this.isMoving = false;
        this.position = {
          x: position.x,
          y: position.y
        }
      },
      x: dungeonManager.level.map?.tileToWorldX(position.x),
      y: dungeonManager.level.map?.tileToWorldY(position.y),
      ease: 'Power2',
      duration: 200
    });
  }

  Turn() { }
  Over() { }
  Refresh() { }
}