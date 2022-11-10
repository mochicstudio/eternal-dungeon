import { EntityType } from '../enums/entity-type.enum';
import Item from '../classes/entity/item/item';
import Position from './position.model';

type TurnFunction = () => void;
type OverFunction = () => boolean;
type RefreshFunction = () => void;
type AttackFunction = (_victim: Entity) => void;
type AttackCallbackFunction = (_victim: Entity) => void;
type GetAttackPointsFunction = () => number;
type ReceiveDamageFunction = (_damage: number) => void;
type OnDestroyFunction = () => void;
type IsAliveFunction = () => boolean;
type RenderUIFunction = (_position: Position, _width: number) => number;

interface Entity {
  position: { x: number, y: number },
  isMoving: boolean;
  movePoints: number,
  restorePoints: number,
  positionInWorld: Position;
  actionPoints: number,
  healthPoints: number,
  type: EntityType,
  items?: Array<Item>,
  spriteTile: number,
  sprite?: Phaser.GameObjects.Sprite,
  tweens: number,
  uiSprite: Phaser.GameObjects.Sprite,
  uiText: Phaser.GameObjects.Text,
  turn: TurnFunction,
  over: OverFunction,
  refresh: RefreshFunction,
  attack: AttackFunction,
  attackCallback: AttackCallbackFunction,
  getAttackPoints: GetAttackPointsFunction,
  receiveDamage: ReceiveDamageFunction,
  onDestroy: OnDestroyFunction,
  isAlive: IsAliveFunction,
  renderUI: RenderUIFunction
}

export default Entity; 