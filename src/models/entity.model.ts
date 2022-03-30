export default interface Entity {
  position: { x: number, y: number },
  movePoints: number,
  restorePoints: number,
  sprite: number,
  Turn: Function,
  Over: Function,
  Refresh: Function
}