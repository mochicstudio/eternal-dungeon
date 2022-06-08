import Entity from '../models/entity.model';

export default class TurnManager {
  private static instance: TurnManager;
  private readonly interval: number;
  private lastCall: number;
  private entities: Set<Entity>;

  constructor() {
    this.interval = 150;
    this.lastCall = Date.now();
    this.entities = new Set();
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
    const now = Date.now();
    const limit = this.lastCall + this.interval;

    if (now > limit) {
      for (let entity of this.entities) {
        if (!entity.Over()) {
          entity.Turn();
          break;
        }
      }
      this.lastCall = Date.now();
    }
  }

  Over(): boolean {
    return [...this.entities].every((entity) => entity.Over())
  }

  Refresh() {
    this.entities.forEach((entity) => entity.Refresh());
  }
}