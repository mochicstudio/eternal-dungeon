class Cursors {
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  SetCursorKeys(cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.cursorKeys = cursorKeys;
  }
}

const cursors = new Cursors();
export { cursors };