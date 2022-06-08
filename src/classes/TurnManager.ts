import Entity from '../models/entity.model';

export default class TurnManager {
  private static instance: TurnManager;
  private entities: Set<Entity>;
  private currentEntityIndex: number;

  constructor() {
    this.entities = new Set();
    this.currentEntityIndex = 0;
  }

  static GetInstance(): TurnManager {
    if (!this.instance) {
      this.instance = new TurnManager();
    }
    return this.instance;
  }

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

      if (!entity.Over()) {
        entity.Turn();
      } else {
        this.currentEntityIndex++;
      }
    }
  }

  Over(): boolean {
    return [...this.entities].every((entity) => entity.Over())
  }

  Refresh() {
    this.entities.forEach((entity) => entity.Refresh());
  }
}