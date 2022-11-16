import EntityModel from '../../models/entity.model';
import Position from '../../models/position.model';
import { dungeonManager } from '../dungeon-manager';
import { eternalDungeon } from '../../scenes/eternal-dungeon.scene';
import { EntityType } from '../../enums/entity-type.enum';
import Item from './item/item';

export default class Entity implements EntityModel {
  readonly position: Position;
  readonly positionInWorld: Position;
  readonly items!: Array<Item>;
  type!: EntityType;
  sprite!: Phaser.GameObjects.Sprite;
  uiSprite!: Phaser.GameObjects.Sprite;
  uiText!: Phaser.GameObjects.Text;
  movePoints: number;
  restorePoints: number;
  actionPoints: number;
  healthPoints: number;
  spriteTile: number;
  tweens: number;
  isMoving: boolean;

  constructor(positionX: number, positionY: number, movePoints: number, spriteTile: number) {
    this.position = { x: 0, y: 0 };
    this.positionInWorld = { x: 0, y: 0 };
    this.isMoving = false;
    this.actionPoints = 1;
    this.healthPoints = 1;
    this.movePoints = movePoints;
    this.restorePoints = movePoints;
    this.spriteTile = spriteTile;
    this.tweens = 0;

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

  turn() { return; }
  over(): boolean { return this.movePoints === 0 && !this.isMoving; }
  refresh() { return; }
  attack(_victim: EntityModel) { return; }
  attackCallback(_victim: EntityModel) { return; }
  getAttackPoints() { return 0; }
  receiveDamage(damage: number) { this.healthPoints -= damage; }
  onDestroy() { return; }
  isAlive(): boolean { return this.healthPoints > 0; }
  renderUI(_position: Position, _width?: number) { return 0; }
}