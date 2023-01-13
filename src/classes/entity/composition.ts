import Position from '../../models/position.model';
import { EntityType } from './../../enums/entity-type.enum';
import Item from './item/item';

function Entity(type: EntityType, spriteTile: number) {
  return class Entity {
    type: EntityType;
    spriteTile: number;

    constructor() {
      this.type = type;
      this.spriteTile = spriteTile;
    }

    turn() { return; }
    over(): boolean { return true; }
    refresh() { return; }
    onDestroy() { return; }
  };
}

function Movable(type: EntityType, spriteTile: number) {
  return class Movable extends Entity(type, spriteTile) {
    isMoving: boolean = false;
    movePoints: number = 1;
    actionPoints: number = 1;
    restoreMovePoints: number = 1;
    restoreActionPoints: number = 1;
    tweens: number = 0;
    position: Position = { x: 0, y: 0 };
    positionInWorld: Position = { x: 0, y: 0 };
    items: Array<Item> = [];

    restorePoints() {
      this.movePoints = this.restoreMovePoints;
      this.actionPoints = this.restoreActionPoints;
    }
  };
}

function Living(type: EntityType, spriteTile: number) {
  return class Living extends Entity(type, spriteTile) {
    healthPoints: number = 1;

    isAlive() {
      this.healthPoints > 0;
    }
  };
}


// TODO movable -> 
// position, positionInWorld, isMoving, movePoints, actionPoints, 
// restorePoints, items, tweens, uiSprite, uiText
// attack, attackCallback
// TODO usable/equipable ->
// getAttackPoints
// TODO living -> healthPoints
// isAlive, receiveDamage
// TODO hero (is movable, is living) -> heroType
// TODO monster (is movable, is living) -> monsterType, lootPosibilities
// TODO item (is usable/equipable) -> itemType