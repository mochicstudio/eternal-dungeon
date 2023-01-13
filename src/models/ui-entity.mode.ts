import { Position } from './position.model.ts';

type RenderUIFunction = (position: Position, width: number) => number;

interface UIEntity {
  sprite: Phaser.GameObjects.Sprite,
  uiSprite: Phaser.GameObjects.Sprite,
  uiText: Phaser.GameObjects.uiText,
  renderUI: RenderUIFunction
}

export default UIEntity;
