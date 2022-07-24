export default interface Entity {
  position: { x: number, y: number },
  isMoving: boolean;
  movePoints: number,
  restorePoints: number,
  actionPoints: number,
  healthPoints: number,
  type?: string,
  spriteTile: number,
  sprite: Phaser.GameObjects.Sprite,
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