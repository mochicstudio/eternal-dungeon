import { EntityType } from '../../src/enums/entity-type.enum';
import Entity from '../../src/models/entity.model';
import Monster from '../../src/classes/entity/monster/monster';
import Item from '../../src/classes/entity/item/item';
import Hero from '../../src/classes/entity/hero/hero';
import { isEntityAHero, isEntityAMonster, isEntityAnItem } from '../../src/helpers/entity-type.helper';

describe('Entity Type Helper Test', () => {
  test('isEntityAHero should return true is the given entity is a hero', async () => {
    const hero: Partial<Hero> = { type: EntityType.hero };
    expect(isEntityAHero(hero as Entity)).toBe(true);
  });

  test('isEntityAMonster should return true is the given entity is a monster', async () => {
    const monster: Partial<Monster> = { type: EntityType.monster };
    expect(isEntityAMonster(monster as Entity)).toBe(true);
  });

  test('isEntityAnItem should return true is the given entity is an item', async () => {
    const item: Partial<Item> = { type: EntityType.item };
    expect(isEntityAnItem(item as Entity)).toBe(true);
  });
});