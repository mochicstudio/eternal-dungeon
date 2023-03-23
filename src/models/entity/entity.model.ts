import { EntityType } from '../enums/entity-type.enum';
import Position from './position.model';
import Item from '../classes/entity/item/item';

type TurnFunction = () => void;
type OverFunction = () => boolean;
type RefreshFunction = () => void;
type AttackFunction = (victim: Entity) => void;
type AttackCallbackFunction = (victim: Entity) => void;
type GetAttackPointsFunction = () => number;
type ReceiveDamageFunction = (damage: number) => void;
type OnDestroyFunction = () => void;
type RenderUIFunction = (position: Position, width: number) => number;

interface Entity {
  position: Position,
  positionInWorld: Position;
  items: Array<Item>,
  type: EntityType,
  sprite: Phaser.GameObjects.Sprite,
  uiSprite: Phaser.GameObjects.Sprite,
  uiText: Phaser.GameObjects.Text,
  movePoints: number,
  restorePoints: number,
  actionPoints: number,
  healthPoints: number,
  spriteTile: number,
  tweens: number,
  isMoving: boolean;
  turn: TurnFunction,
  over: OverFunction,
  refresh: RefreshFunction,
  attack: AttackFunction,
  attackCallback: AttackCallbackFunction,
  getAttackPoints: GetAttackPointsFunction,
  receiveDamage: ReceiveDamageFunction,
  onDestroy: OnDestroyFunction,
  renderUI: RenderUIFunction
}

export default Entity; 
