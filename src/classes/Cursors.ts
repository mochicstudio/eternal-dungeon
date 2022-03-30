export default class Cursors {
  private static instance: Cursors;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() { }

  static GetInstance(): Cursors {
    if (Cursors.instance) {
      return this.instance;
    }
    this.instance = new Cursors();
    return this.instance;
  }

  SetCursorKeys(cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.cursorKeys = cursorKeys;
  }
}