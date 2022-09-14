import Entity from '../models/entity.model';
import { dungeonManager } from './dungeon-manager';
import Item from './items/item';

class TurnManager {
  private entities: Set<Entity> = new Set();
  private currentEntityIndex: number = 0;

  addEntity(entity: Entity) {
    this.entities.add(entity);
  }

  removeEntity(entity: Entity) {
    this.entities.delete(entity);
    entity.sprite?.destroy();
    delete entity.sprite;
    entity.onDestroy();
  }

  getEntities() { return this.entities; }
  getEntitiesValues() { return this.entities.values(); }

  itemPicked(entity: Item) {
    entity.sprite?.destroy();
    delete entity.sprite;
  }

  turn() {
    if (this.entities.size > 0) {
      const entities = [...this.entities];
      const entity = entities[this.currentEntityIndex];

      if (entity) {
        if (!entity.over()) {
          entity.turn();
        } else {
          this.currentEntityIndex++;
        }
      }
    }
  }

  over(): boolean { return [...this.entities].every(entity => entity.over()); }

  refresh() {
    this.currentEntityIndex = 0;
    this.entities.forEach(entity => entity.isAlive ? entity.refresh() : null);
  }
}

const turnManager = new TurnManager();
export { turnManager };