import { Tile } from '../enums/tiles.enum';
import Position from '../models/position.model';
import Entity from './entity';
import { cursors } from './cursors';
import { dungeonManager } from './dungeon-manager';
import { getRandomNumber } from '../utils/random-number-generator.util';
import { ui } from '../scenes/ui.scene';
import Item from './items/item';

export default class Player extends Entity {
  type = 'player';
  uiStatsText!: Phaser.GameObjects.Text;
  uiItems!: Array<Phaser.GameObjects.Rectangle>;
  items: Array<Item>;

  constructor() {
    super(15, 15, 1, Tile.playerTile);
    this.healthPoints = 15;
    this.items = [];
  }

  turn() {
    let nextPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };
    let moved = false;

    if (this.movePoints > 0 && !this.isMoving) {
      if (cursors.cursorKeys?.left.isDown) {
        nextPosition.x -= 1;
        moved = true;
      }
      if (cursors.cursorKeys?.right.isDown) {
        nextPosition.x += 1;
        moved = true;
      }
      if (cursors.cursorKeys?.down.isDown) {
        nextPosition.y += 1;
        moved = true;
      }
      if (cursors.cursorKeys?.up.isDown) {
        nextPosition.y -= 1;
        moved = true;
      }

      if (moved) {
        this.movePoints -= 1;
        if (dungeonManager.isWalkableTile(nextPosition)) {
          const enemy = dungeonManager.entityAtTile(nextPosition);

          if (enemy && this.actionPoints > 0) {
            dungeonManager.attackEntity(this, enemy);
            this.actionPoints -= 1;
            nextPosition = {
              x: this.position.x,
              y: this.position.y
            };
          }

          if (this.position.x !== nextPosition.x || this.position.y !== nextPosition.y) this.moveEntityTo(nextPosition);
        }
      }

      if (this.healthPoints <= 5) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.isMoving = false;
  }

  over(): boolean {
    let isOver = this.movePoints === 0 && !this.isMoving;

    if (isOver && this.uiText) {
      this.uiText.setColor('#CFC6B8');
    } else {
      this.uiText.setColor('#FFF');
    }

    if (this.uiStatsText) {
      this.uiStatsText.setText(`HP: ${this.healthPoints}\nMP: ${this.movePoints}\nAP: ${this.actionPoints}`);
    }

    return isOver;
  }

  refresh() {
    this.movePoints = this.restorePoints;
    this.actionPoints = 1;
  }

  attack() { return getRandomNumber(1, 5); }

  toggleItem(itemKey: number) {
    const item = this.items[itemKey];

    if (item) {
      if (item.weapon) {
        this.items.forEach(i => i.active = i.weapon ? false : i.active);
      }
      item.active = !item.active;
      if (item.active) {
        dungeonManager.log(`${this.type} equips ${item.name} : ${item.description}.`);
        item.equip(itemKey);
      }
    }
  }

  onDestroy() {
    dungeonManager.log('you died');

    if (window.confirm('Do want to play again?')) {
      window.location.reload();
    }
  }

  renderUI(position: Position, width?: number): number {
    let accumulatedHeight = 0;

    this.uiSprite = ui.add.sprite(position.x, position.y, 'world', this.spriteTile).setOrigin(0);
    this.uiText = ui.add.text(position.x + 20, position.y, this.type, { font: '16px Arial', color: '#CFC6B8' });
    this.uiStatsText = ui.add.text(position.x + 20, position.y + 20, `HP: ${this.healthPoints}\nMP: ${this.movePoints}\nAP: ${this.actionPoints}`, { font: '12px Arial', color: '#CFC6B8' });

    accumulatedHeight += this.uiStatsText.height + this.uiSprite.height + 90;

    this.renderItemSlots(position);

    ui.add.line(position.x + 5, position.y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);

    return accumulatedHeight;
  }

  renderItemSlots(position: Position) {
    let itemsPerRow = 5
    let rows = 2
    this.uiItems = []
    for (let row = 1; row <= rows; row++) {
      for (let cell = 1; cell <= itemsPerRow; cell++) {
        let rx = position.x + (25 * cell)
        let ry = position.y + 50 + (25 * row)
        this.uiItems.push(
          ui.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
        );
      }
    }
  }
}