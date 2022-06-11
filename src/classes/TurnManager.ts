import Entity from '../models/entity.model';

class TurnManager {
  private entities: Set<Entity> = new Set();
  private currentEntityIndex: number = 0;

  AddEntity(entity: Entity) {
    this.entities.add(entity);
  }

  RemoveEntity(entity: Entity) {
    this.entities.delete(entity);
  }

  Turn() {
    if (this.entities.size > 0) {
      const entities = [...this.entities];
      const entity = entities[this.currentEntityIndex];

      if (entity) {
        if (!entity.Over()) {
          entity.Turn();
        } else {
          this.currentEntityIndex++;
        }
      }
    }
  }

  Over(): boolean {
    return [...this.entities].every((entity) => entity.Over());
  }

  Refresh() {
    this.currentEntityIndex = 0;
    this.entities.forEach((entity) => entity.Refresh());
  }
}

const turnManager = new TurnManager();
export { turnManager };