import { Tile } from '../enums/tiles.enum';
import { EntityType } from '../enums/entity-type.enum';
import Position from '../models/position.model';
import Entity from './entity';
import Item from './items/item';
import { cursors } from './cursors';
import { dungeonManager } from './dungeon-manager';
import { turnManager } from './turn-manager';
import { ui } from '../scenes/ui.scene';
import { getRandomNumber } from '../utils/random-number-generator.util';

export default class Player extends Entity {
  uiStatsText!: Phaser.GameObjects.Text;
  uiItems!: Array<Phaser.GameObjects.Rectangle>;
  items: Array<Item>;

  constructor() {
    super(15, 15, 1, Tile.playerTile);
    this.type = EntityType.player;
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
          const entity = dungeonManager.entityAtTile(nextPosition);

          if (entity && entity.type === 'monster' && this.actionPoints > 0) {
            dungeonManager.attackEntity(this, entity);
            this.actionPoints -= 1;
            nextPosition = {
              x: this.position.x,
              y: this.position.y
            };
          }

          if (entity && entity.type === 'item' && this.actionPoints > 0) {
            this.items.push(entity as Item);
            this.actionPoints -= 1;
            turnManager.itemPicked(entity as Item);
          }

          if (this.position.x !== nextPosition.x || this.position.y !== nextPosition.y) this.moveEntityTo(nextPosition);
        }
      }

      if (this.healthPoints <= 5 && this.sprite) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.isMoving = false;
    this.refreshUI();
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

  attack() {
    const items = this.equippedItems();
    return items.reduce((total, item) => total + item.damage(), getRandomNumber(1, 5));
  }

  receiveDamage(damage: number) {
    this.healthPoints -= damage;
  }

  toggleItem(slot: number) {
    const item = this.items[slot];

    if (item) {
      if (item.weapon) {
        this.items.forEach(i => i.active = i.weapon ? false : i.active);
      }
      item.active = !item.active;
      if (item.active) {
        dungeonManager.log(`${this.type} equips ${item.name} : ${item.description}.`);
        item.equip(slot);
      }
    }
  }

  removeItem(slot: number) {
    const specificItem = this.items[slot];

    if (specificItem) {
      this.items.forEach(item => item.uiSprite.destroy());
      this.items = this.items.filter(itemAgain => itemAgain !== specificItem);
      this.refreshUI();
    }
  }

  removeItemByProperty(property: string, value: any) {
    this.items.forEach(item => item.uiSprite.destroy());
    this.items = this.items.filter(itemAgain => itemAgain[property as keyof typeof itemAgain] !== value);
    this.refreshUI();
  }

  equippedItems = () => this.items.filter(item => item.active);

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

  refreshUI() {
    this.items.forEach((item: Item, index) => {
      const MARGIN = 10;

      if (!item.uiSprite) {
        let position: Position = {
          x: this.uiItems[index].x + MARGIN,
          y: this.uiItems[index].y + MARGIN
        }
        item.uiSprite = ui.add.sprite(position.x, position.y, 'world', item.tile);
      }

      if (item.active) {
        item.uiSprite.setAlpha(0.5);
        this.uiItems[index].setStrokeStyle();
      } else {
        item.uiSprite.setAlpha(1);
        this.uiItems[index].setStrokeStyle(1, 0xffffff);
      }
    });
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