import Entity from '../entity';
import Item from '../item/item';
import { Tile } from '../../../enums/tiles.enum';
import { EntityType } from '../../../enums/entity-type.enum';
import Actionable from '../../../models/entity/actionable.model';
import Animate from '../../../models/entity/animate.model';
import CanAttack from '../../../models/entity/can-attack.model';
import CanBeDamaed from '../../../models/entity/can-be-damaged.model';
import Destroyable from '../../../models/entity/destroyable.model';
import HasItems from '../../../models/entity/has-items.model';
import HasPosition from '../../../models/entity/has-position.model';
import HasUI from '../../../models/entity/has-ui.model';
import Movable from '../../../models/entity/movable.model';
import { cursors } from '../../cursors';
import { dungeonManager } from '../../dungeon-manager';
import { turnManager } from '../../turn-manager';
import { ui } from '../../../scenes/ui.scene';
import { isEntityAMonster, isEntityAnItem } from '../../../helpers/entity-type.helper';
import { getRandomNumber } from '../../../utils/random-number-generator.util';

export default class Hero extends Entity implements Actionable, Alive, Animate,
  CanAttack, CanBeDamaed, Destroyable, HasItems, HasPosition, HasUI, Movable {
  actionPoints: number;
  restoreActionPoints: number;
  tweens: number;
  healthPoints: number;
  items: Array<Item>;
  position: Position;
  positionInWorld: Position;
  uiSprite!: Phaser.GameObjects.Sprite;
  uiText!: Phaser.GameObjects.Text;
  uiStatsText!: Phaser.GameObjects.Text;
  uiItems!: Array<Phaser.GameObjects.Rectangle>;
  pattern = ['move', 'attack'];
  nextPosition: Position;

  constructor(x: number, y: number) {
    super(Tile.playerTile);

    this.type = EntityType.hero;
    this.actionPoints = 1;
    this.restoreActionPoints = this.actionPoints;
    this.tweens = 1;
    this.healthPoints = 15;
    this.items = [];
    this.position = { x, y };
    this.positionInWorld = {
      x: dungeonManager.level.map?.tileToWorldX(x) as number,
      y: dungeonManager.level.map?.tileToWorldY(y) as number
    };
    this.nextPosition = { x, y };
  }

  turn() {
    if (this.hasRemainingMovePoints() && !this.isMoving) {
      this.checkMoveInput();
      if (this.isMoving) {
        this.spendMovePoint();
        if (dungeonManager.isWalkableTile(this.nextPosition) && this.hasRemainingActionPoints()) {
          const entityAtNextTile = dungeonManager.entityAtTile(this.nextPosition);

          if (entityAtNextTile) {
            if (isEntityAMonster(entityAtNextTile)) {
              this.attack(entityAtNextTile);
              this.spendActionPoint();
              this.resetNextPosition();
            } else if (isEntityAnItem(entityAtNextTile)) {
              this.addItem(entityAtNextTile as Item);
              this.spendActionPoint();
              turnManager.itemPicked(entityAtNextTile as Item);
            }
          }

          if (this.positionsAreDifferent()) this.move();
        }
      }

      if (this.healthPoints <= 5 && this.sprite) this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.resetIsMoving();
    this.refreshUI();
  }

  over(): boolean {
    const isOver = this.movePoints === 0 && !this.isMoving;

    if (isOver && this.uiText) {
      this.uiText.setColor('#CFC6B8');
      this.flushActionPoints();
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

  isAlive(): boolean {
    return this.healthPoints > 0;
  }

  attack(victim: Entity): boolean {
    this.setIsMoving();
    this.tweens = this.tweens || 0;
    this.tweens += 1;
    dungeonManager.attackEntity(this, victim);
    return true;
  }
  
  attackCallback(victim: Entity): boolean {
    if (this.isAlive() && victim.isAlive()) {
      if (this.sprite) {
        this.sprite.x = dungeonManager.level.map?.tileToWorldX(this.position.x) as number;
        this.sprite.y = dungeonManager.level.map?.tileToWorldY(this.position.y) as number;
      }
      this.tweens -= 1;

      const damage = this.getAttackPoints();
      dungeonManager.log(`${this.type} damage done: ${damage} to ${victim.type}`);
      victim.receiveDamage(damage);

      if (!victim.isAlive()) turnManager.removeEntity(victim);
    }
    return true;
  }
  
  getAttackPoints() { return this.equippedItems().reduce((total, item) => total + item.damage(), getRandomNumber(1, 5)); }

  receiveDamage(damage: number) { this.healthPoints -= damage; }

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

  checkMoveInput() {
    if (cursors.cursorKeys?.space.isDown) {
      this.flushMovePoints();
      return;
    }
    if (cursors.cursorKeys?.left.isDown) {
      this.nextPosition.x -= 1;
      this.setIsMoving();
    }
    if (cursors.cursorKeys?.right.isDown) {
      this.nextPosition.x += 1;
      this.setIsMoving();
    }
    if (cursors.cursorKeys?.down.isDown) {
      this.nextPosition.y += 1;
      this.setIsMoving();
    }
    if (cursors.cursorKeys?.up.isDown) {
      this.nextPosition.y -= 1;
      this.setIsMoving();
    }
  }

  checkItemInput(event: KeyboardEvent) {
    if (!this.over()) {
      const eventKey = event.key;
      if (!isNaN(Number(eventKey))) {
        let key = Number(eventKey);
        if (key === 0) key = 10;
        this.toggleItem(key - 1);
      }
    }
  }

  checkRangeAttackInput(event: Phaser.Input.Pointer) {
    if (!this.over()) {
      const position: Position = {
        x: dungeonManager.level.map.worldToTileX(event.worldX),
        y: dungeonManager.level.map.worldToTileY(event.worldY)
      };
      const entity = dungeonManager.entityAtTile(position);
      if (entity && entity.type === EntityType.monster && this.actionPoints) {
        // TODO: Make a range weapon to implement range attack logic
      }
    }
  }

  move() { dungeonManager.moveEntityTo(this, this.nextPosition); }
  positionsAreDifferent(): boolean { return this.position.x !== this.nextPosition.x || this.position.y !== this.nextPosition.y; }
  setIsMoving() { this.isMoving = true; }
  resetIsMoving() { this.isMoving = false; }
  resetNextPosition() { this.nextPosition = { x: this.position.x, y: this.position.y }; }
  hasRemainingMovePoints(): boolean { return this.movePoints > 0; }
  spendMovePoint() { this.movePoints -= 1; }
  flushMovePoints() { this.movePoints = 0; }
  flushActionPoints() { this.actionPoints = 0; }
  hasRemainingActionPoints(): boolean { return this.actionPoints > 0; }
  spendActionPoint() { this.actionPoints -= 1; }
  addItem(item: Item) { this.items.push(item); }
  getCurrentActiveWeapon() { return this.items.filter(item => item.active && item.weapon)[0]; }

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
      this.items.forEach(item => { if (item === specificItem) item.uiSprite.destroy(); });
      this.items = this.items.filter(item => item !== specificItem);
      this.refreshUI();
    }
  }

  removeItemByProperty(property: string, value: any) {
    this.items.filter(item => item[property as keyof typeof item] === value).forEach(item => item.uiSprite.destroy());
    this.items = this.items.filter(item => item[property as keyof typeof item] !== value);
    this.refreshUI();
  }

  getItemByProperty(property: string, value: any) {
    return this.items.filter(item => item[property as keyof typeof item] === value)[0];
  }

  equippedItems() { return this.items.filter(item => item.active); }

  refreshUI() {
    this.items.forEach((item: Item, index) => {
      const MARGIN = 10;

      if (!item.uiSprite) {
        const position: Position = {
          x: this.uiItems[index].x + MARGIN,
          y: this.uiItems[index].y + MARGIN
        };
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
    const itemsPerRow = 5;
    const rows = 2;
    this.uiItems = [];
    for (let row = 1; row <= rows; row++) {
      for (let cell = 1; cell <= itemsPerRow; cell++) {
        const rx = position.x + (25 * cell);
        const ry = position.y + 50 + (25 * row);
        this.uiItems.push(
          ui.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
        );
      }
    }
  }
}
