type RenderUIFunction = (position: Position, width: number) => number;

interface HasUI {
  uiSprite: Phaser.GameObjects.Sprite,
  uiText: Phaser.GameObjects.Text,
  renderUI: RenderUIFunction
}

export default HasUI;
