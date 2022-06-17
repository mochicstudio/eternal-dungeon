export default interface Entity {
  position: { x: number, y: number },
  isMoving: boolean;
  movePoints: number,
  restorePoints: number,
  actionPoints: number,
  healthPoints: number,
  type?: string,
  sprite: Phaser.GameObjects.Sprite,
  tweens?: any,
  Turn: Function,
  Over: Function,
  Refresh: Function
  Attack: Function,
  OnDestroy: Function
}