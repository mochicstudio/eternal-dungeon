export default interface Entity {
  position: { x: number, y: number },
  movePoints: number,
  restorePoints: number,
  sprite: Phaser.GameObjects.Sprite,
  Turn: Function,
  Over: Function,
  Refresh: Function
}