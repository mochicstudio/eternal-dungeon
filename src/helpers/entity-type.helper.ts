import { EntityType } from '../enums/entity-type.enum';
import Entity from '../models/entity.model';

const isEntityAHero = (entity: Entity): boolean => entity.type === EntityType.hero;
const isEntityAMonster = (entity: Entity): boolean => entity.type === EntityType.monster;
const isEntityAnItem = (entity: Entity): boolean => entity.type === EntityType.item;

export { isEntityAHero, isEntityAMonster, isEntityAnItem };