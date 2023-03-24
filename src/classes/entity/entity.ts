import EntityModel from '../../models/entity/entity.model';
import { EntityType } from '../../enums/entity-type.enum';

export default class Entity implements EntityModel {
  type!: EntityType;
  sprite!: Phaser.GameObjects.Sprite;
  spriteTile: number;

  constructor(spriteTile: number) {
    this.spriteTile = spriteTile;
  }

  turn(): void { return; }
  over(): boolean { return false; }
  refresh(): void { return; }
}
