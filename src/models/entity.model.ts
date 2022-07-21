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
  turn: Function,
  over: Function,
  refresh: Function
  attack: Function,
  onDestroy: Function
  isAlive: Function,
}