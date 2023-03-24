import { EntityType } from '../../enums/entity-type.enum';

type TurnFunction = () => void;
type OverFunction = () => boolean;
type RefreshFunction = () => void;

interface Entity {
  type: EntityType,
  sprite: Phaser.GameObjects.Sprite,
  spriteTile: number,
  turn: TurnFunction,
  over: OverFunction,
  refresh: RefreshFunction,
}

export default Entity; 
