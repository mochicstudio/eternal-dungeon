import PF from 'pathfinding';
import { EntityType } from './../../../enums/entity-type.enum';
import { MonsterType } from '../../../enums/monster-type.enum';
import Position from '../../../models/position.model';
import Entity from '../entity';
import Gem from '../item/gem/gem.item';
import CursedGem from '../item/gem/cursed.item.gem';
import LongSword from '../item/weapon/long-sword.item.weapon';
import { dungeonManager } from '../../dungeon-manager';
import { ui } from '../../../scenes/ui.scene';
import { getRandomNumber } from '../../../utils/random-number-generator.util';
import { turnManager } from '../../turn-manager';

export default class Monster extends Entity {
  readonly lootPosibilities = [null, null, Gem, CursedGem, LongSword];
  monsterType!: MonsterType;

  constructor(position: Position, movePoints: number, tile: number) {
    super(position.x, position.y, movePoints, tile);
    this.type = EntityType.monster;
  }

  turn() {
    const previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.getPath(previousPosition);
      if (path.length > 2) {
        dungeonManager.moveEntityTo(this, { x: path[1][0], y: path[1][1] });
      }
      this.movePoints -= 1;
    }

    if (this.actionPoints > 0 && this.isPlayerReachable()) {
      this.attack(dungeonManager.player);
      this.actionPoints = 0;
    }

    this.isMoving = false;
  }

  over() {
    const isOver = this.movePoints === 0 && !this.isMoving;

    if (isOver && this.uiText) {
      this.uiText.setColor('#CFC6B8');
    } else {
      this.uiText.setColor('#FFF');
    }

    return isOver;
  }

  refresh() {
    this.movePoints = 1;
    this.actionPoints = 1;
  }

  attack(victim: Entity) {
    console.log('attack');
    this.isMoving = true;
    this.tweens = this.tweens || 0;
    this.tweens += 1;
    dungeonManager.attackEntity(this, victim);
  }

  attackCallback(victim: Entity) {
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
  }

  getAttackPoints(): number { return getRandomNumber(0, 1); }

  onDestroy() {
    dungeonManager.log('monster killed');
    this.uiSprite.setAlpha(0.2);
    this.uiText.setAlpha(0.2);
    this.spawnLoot();
  }

  spawnLoot() {
    const lootIndex = getRandomNumber(0, this.lootPosibilities.length - 1);
    const item = this.lootPosibilities[lootIndex];

    if (item) {
      turnManager.addEntity(new item({ x: this.position.x, y: this.position.y }));
      dungeonManager.log(`${this.monsterType} drops ${item.name}`);
    }
  }

  getPath(position: Position): number[][] | any {
    const grid = new PF.Grid(dungeonManager.level.config.data ? dungeonManager.level.config.data : []);
    const finder = new PF.AStarFinder();
    return finder.findPath(position.x, position.y, dungeonManager.player.position.x, dungeonManager.player.position.y, grid);
  }

  isPlayerReachable(): boolean { return dungeonManager.distanceBetweenEntities(this, dungeonManager.player) <= 2; }

  renderUI(position: Position): number {
    this.uiSprite = ui.add.sprite(position.x + 5, position.y, 'world', this.spriteTile);
    this.uiText = ui.add.text(position.x + 20, position.y - 7, 'entity', { font: '14px Arial', color: '#CFC6B8' });
    return 30;
  }
}