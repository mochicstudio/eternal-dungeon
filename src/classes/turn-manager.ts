import Entity from '../models/entity.model';

class TurnManager {
  private entities: Set<Entity> = new Set();
  private currentEntityIndex: number = 0;

  addEntity(entity: Entity) {
    this.entities.add(entity);
  }

  removeEntity(entity: Entity) {
    this.entities.delete(entity);
    entity.sprite.destroy();
    entity.onDestroy();
  }

  getEntities() { return this.entities; }

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

  over(): boolean { return [...this.entities].every((entity) => entity.over()); }

  refresh() {
    this.currentEntityIndex = 0;
    this.entities.forEach((entity) => entity.isAlive ? entity.refresh() : null);
  }
}

const turnManager = new TurnManager();
export { turnManager };