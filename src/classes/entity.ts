import EntityModel from '../models/entity.model';
import Position from '../models/position.model';
import { dungeonManager } from './dungeon-manager';
import { eternalDungeon } from '../scenes/eternal-dungeon.scene';
import { EntityType } from '../enums/entity-type.enum';

export default class Entity implements EntityModel {
  position: Position;
  positionInWorld: Position;
  isMoving: boolean;
  movePoints: number;
  restorePoints: number;
  actionPoints: number;
  healthPoints: number;
  spriteTile: number;
  type!: EntityType;
  sprite?: Phaser.GameObjects.Sprite;
  uiSprite!: Phaser.GameObjects.Sprite;
  uiText!: Phaser.GameObjects.Text;

  constructor(positionX: number, positionY: number, movePoints: number, spriteTile: number) {
    this.position = { x: 0, y: 0 };
    this.positionInWorld = { x: 0, y: 0 };
    this.isMoving = false;
    this.actionPoints = 1;
    this.healthPoints = 1;
    this.movePoints = movePoints;
    this.restorePoints = movePoints;
    this.spriteTile = spriteTile;

    if (positionX && positionY) {
      this.position = { x: positionX, y: positionY };
      this.positionInWorld = {
        x: dungeonManager.level.map?.tileToWorldX(positionX) as number,
        y: dungeonManager.level.map?.tileToWorldX(positionY) as number
      };
      this.sprite = eternalDungeon.add.sprite(this.positionInWorld.x, this.positionInWorld.y, 'world', this.spriteTile);
      this.sprite.setOrigin(0);
    }
  }

  moveEntityTo(position: Position) {
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

  turn() { }

  over(): boolean { return this.movePoints === 0 && !this.isMoving; }

  refresh() { }
  attack() { }
  onDestroy() { }

  isAlive(): boolean { return this.healthPoints > 0; }
  renderUI(position: Position, width?: number) { return 0; }
}