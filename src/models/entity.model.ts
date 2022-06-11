export default interface Entity {
  position: { x: number, y: number },
  movePoints: number,
  restorePoints: number,
  actionPoints: number,
  healthPoints: number,
  type?: string,
  sprite: Phaser.GameObjects.Sprite,
  Turn: Function,
  Over: Function,
  Refresh: Function
}