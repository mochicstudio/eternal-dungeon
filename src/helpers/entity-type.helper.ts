import { EntityType } from '../enums/entity-type.enum';
import Entity from '../models/entity.model';

const isEntityAMonster = (entity: Entity): boolean => entity.type === EntityType.monster;
const isEntityAnItem = (entity: Entity): boolean => entity.type === EntityType.item;

export { isEntityAMonster, isEntityAnItem };