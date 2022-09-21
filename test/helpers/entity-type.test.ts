import { EntityType } from '../../src/enums/entity-type.enum';
import Entity from '../../src/models/entity.model';
import Monster from '../../src/classes/monster/monster';
import Item from '../../src/classes/item/item';
import { isEntityAMonster, isEntityAnItem } from '../../src/helpers/entity-type.helper';

describe('Entity Type Helper Test', () => {
  test('isEntityAMonster should return true is the given entity is a monster', async () => {
    const monster: Partial<Monster> = { type: EntityType.monster };
    expect(isEntityAMonster(monster as Entity)).toBe(true);
  });

  test('isEntityAnItem should return true is the given entity is an item', async () => {
    const monster: Partial<Item> = { type: EntityType.item };
    expect(isEntityAnItem(monster as Entity)).toBe(true);
  });
});