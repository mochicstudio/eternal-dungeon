import { EntityType } from '../enums/entity-type.enum';
import Item from '../classes/items/item';

export default interface Entity {
  position: { x: number, y: number },
  isMoving: boolean;
  movePoints: number,
  restorePoints: number,
  actionPoints: number,
  healthPoints: number,
  type: EntityType,
  items?: Array<Item>,
  spriteTile: number,
  sprite?: Phaser.GameObjects.Sprite,
  tweens?: any,
  uiSprite: Phaser.GameObjects.Sprite,
  uiText: Phaser.GameObjects.Text,
  turn: Function,
  over: Function,
  refresh: Function
  attack: Function,
  onDestroy: Function,
  isAlive: Function,
  renderUI: Function
}